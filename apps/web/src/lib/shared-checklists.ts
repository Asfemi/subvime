import { randomBytes } from "crypto";
import type { ChecklistStep } from "@/types/checklist";
import { getAppBaseUrl } from "@/lib/app-url";
import { countChecklistSteps, parseChecklistImport } from "@/lib/checklist-utils";
import { redis } from "@/lib/redis";

const REDIS_PREFIX = "subvime:share:";
const TTL_SECONDS = 60 * 60 * 24 * 90; // 90 days
const MAX_BODY_BYTES = 256 * 1024;
const MAX_STEPS = 500;

export interface SharedChecklistRecord {
  id: string;
  title: string;
  description?: string;
  steps: ChecklistStep[];
  createdAt: number;
}

const memoryStore = new Map<string, { payload: string; expiresAt: number }>();

export { getAppBaseUrl } from "@/lib/app-url";

export function createShareId(): string {
  return randomBytes(9).toString("base64url");
}

export function buildShareUrl(shareId: string): string {
  return `${getAppBaseUrl()}/c/${shareId}`;
}

export function parseSharePayload(raw: string): Pick<SharedChecklistRecord, "title" | "description" | "steps"> {
  const parsed = parseChecklistImport(raw);
  const stepCount = countChecklistSteps(parsed.steps);

  if (stepCount === 0) {
    throw new Error("Checklist must include at least one step.");
  }

  if (stepCount > MAX_STEPS) {
    throw new Error(`Checklist exceeds the ${MAX_STEPS} step limit.`);
  }

  return parsed;
}

async function writeRecord(record: SharedChecklistRecord): Promise<void> {
  const payload = JSON.stringify(record);

  try {
    await redis.setex(`${REDIS_PREFIX}${record.id}`, TTL_SECONDS, payload);
  } catch (error) {
    console.error("Redis share write failed, using memory fallback:", error);
    memoryStore.set(record.id, {
      payload,
      expiresAt: Date.now() + TTL_SECONDS * 1000,
    });
  }
}

async function readRecord(shareId: string): Promise<SharedChecklistRecord | null> {
  try {
    const raw = await redis.get(`${REDIS_PREFIX}${shareId}`);
    if (raw) return JSON.parse(raw) as SharedChecklistRecord;
  } catch (error) {
    console.error("Redis share read failed, trying memory fallback:", error);
  }

  const cached = memoryStore.get(shareId);
  if (!cached) return null;
  if (cached.expiresAt < Date.now()) {
    memoryStore.delete(shareId);
    return null;
  }

  return JSON.parse(cached.payload) as SharedChecklistRecord;
}

export async function createSharedChecklist(
  input: Pick<SharedChecklistRecord, "title" | "description" | "steps">,
): Promise<SharedChecklistRecord> {
  const record: SharedChecklistRecord = {
    id: createShareId(),
    title: input.title,
    description: input.description,
    steps: input.steps,
    createdAt: Date.now(),
  };

  await writeRecord(record);
  return record;
}

export async function getSharedChecklist(shareId: string): Promise<SharedChecklistRecord | null> {
  if (!shareId || shareId.length > 64) return null;
  return readRecord(shareId);
}

export async function createSharedChecklistFromRequestBody(
  body: string,
): Promise<{
  record: SharedChecklistRecord;
  stepCount: number;
}> {
  if (body.length > MAX_BODY_BYTES) {
    throw new Error("Request body is too large.");
  }

  const parsed = parseSharePayload(body);
  const record = await createSharedChecklist(parsed);

  return {
    record,
    stepCount: countChecklistSteps(record.steps),
  };
}

export const SHARE_API_DOCS = {
  create: "POST /api/checklists/share",
  get: "GET /api/checklists/share/:shareId",
  previewPath: "/c/:shareId",
};
