import { randomBytes } from "crypto";
import { R as Redis } from "../_chunks/_libs/ioredis.mjs";
function getAppBaseUrl() {
  return process.env.APP_URL || process.env.BETTER_AUTH_URL || "https://subvima.dev";
}
function createStepId() {
  return crypto.randomUUID();
}
function createChecklistId() {
  return crypto.randomUUID();
}
function createEmptyStep(title = "New step", order = 0) {
  return {
    id: createStepId(),
    title,
    notes: "",
    children: [],
    order
  };
}
function generateStepsFromTaskInput(raw) {
  const lines = raw.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) {
    return [
      createEmptyStep("Define the goal", 0),
      createEmptyStep("Break into phases", 1),
      createEmptyStep("Add actionable sub-steps", 2)
    ];
  }
  return lines.map((line, index) => createEmptyStep(line, index));
}
function parseChecklistImport(raw) {
  const parsed = JSON.parse(raw);
  const title = typeof parsed.title === "string" ? parsed.title : typeof parsed.name === "string" ? parsed.name : null;
  const rootSteps = parsed.steps ?? parsed.tasks;
  if (!title || !Array.isArray(rootSteps)) {
    throw new Error(
      "Invalid checklist JSON. Expected title and a steps or tasks array."
    );
  }
  return {
    title,
    description: typeof parsed.description === "string" ? parsed.description : void 0,
    steps: normalizeImportedSteps(rootSteps)
  };
}
function formatNotes(notes, riskChecklist) {
  const parts = [];
  if (typeof notes === "string" && notes.trim()) {
    parts.push(notes.trim());
  } else if (Array.isArray(notes)) {
    const lines = notes.filter((n) => typeof n === "string" && n.trim());
    if (lines.length) parts.push(lines.map((line) => `- ${line}`).join("\n"));
  }
  if (Array.isArray(riskChecklist) && riskChecklist.length) {
    parts.push(
      riskChecklist.filter((item) => typeof item === "string" && item.trim()).map((item) => `- ${item}`).join("\n")
    );
  }
  return parts.join("\n\n");
}
function normalizeImportedSteps(steps, depth = 0) {
  return steps.filter((step) => !!step && typeof step === "object").map((step, index) => {
    const nested = step.children ?? step.tasks ?? [];
    return {
      id: typeof step.id === "string" && step.id ? step.id : createStepId(),
      title: typeof step.title === "string" && step.title.trim() ? step.title.trim() : `Step ${index + 1}`,
      notes: formatNotes(step.notes, step.riskChecklist),
      completed: step.completed === true,
      order: typeof step.order === "number" ? step.order : index,
      children: Array.isArray(nested) ? normalizeImportedSteps(nested, depth + 1) : []
    };
  });
}
function importTaskTree(tasks) {
  return normalizeImportedSteps(tasks);
}
function countChecklistSteps(steps) {
  return steps.reduce(
    (count, step) => count + 1 + countChecklistSteps(step.children),
    0
  );
}
function cloneChecklistFromTemplate(template, userId, options) {
  const preserveCompletion = options?.preserveCompletion ?? false;
  const cloneSteps = (items) => items.map((step, index) => ({
    ...step,
    id: createStepId(),
    completed: preserveCompletion ? !!step.completed : false,
    order: index,
    children: cloneSteps(step.children)
  }));
  return {
    id: createChecklistId(),
    title: template.title,
    description: template.description,
    steps: cloneSteps(template.steps),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    userId
  };
}
function updateStepInTree(steps, stepId, updater) {
  return steps.map((step) => {
    if (step.id === stepId) {
      return updater(step);
    }
    if (step.children.length > 0) {
      return {
        ...step,
        children: updateStepInTree(step.children, stepId, updater)
      };
    }
    return step;
  });
}
function toggleStepCompleted(steps, stepId) {
  return updateStepInTree(steps, stepId, (step) => {
    const nextCompleted = !isStepChecked(step);
    return setStepCompletedRecursive(step, nextCompleted);
  });
}
function isStepChecked(step) {
  if (step.children.length === 0) return !!step.completed;
  return !!step.completed;
}
function setStepCompletedRecursive(step, completed) {
  return {
    ...step,
    completed,
    children: step.children.map((child) => setStepCompletedRecursive(child, completed))
  };
}
function exportChecklistLlmJson(checklist) {
  const toLlmTask = (step) => ({
    id: step.id,
    title: step.title,
    completed: !!step.completed,
    ...step.notes ? { notes: step.notes } : {},
    tasks: step.children.map(toLlmTask)
  });
  return JSON.stringify(
    {
      id: checklist.id,
      title: checklist.title,
      ...checklist.description ? { description: checklist.description } : {},
      version: "1.0",
      tasks: checklist.steps.map(toLlmTask)
    },
    null,
    2
  );
}
const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const redis = new Redis(redisUrl, {
  lazyConnect: true
});
redis.on("error", (error) => {
  console.error("Redis connection error", error);
});
const REDIS_PREFIX = "subvime:share:";
const TTL_SECONDS = 60 * 60 * 24 * 90;
const MAX_BODY_BYTES = 256 * 1024;
const MAX_STEPS = 500;
const memoryStore = /* @__PURE__ */ new Map();
function createShareId() {
  return randomBytes(9).toString("base64url");
}
function buildShareUrl(shareId) {
  return `${getAppBaseUrl()}/c/${shareId}`;
}
function parseSharePayload(raw) {
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
async function writeRecord(record) {
  const payload = JSON.stringify(record);
  try {
    await redis.setex(`${REDIS_PREFIX}${record.id}`, TTL_SECONDS, payload);
  } catch (error) {
    console.error("Redis share write failed, using memory fallback:", error);
    memoryStore.set(record.id, {
      payload,
      expiresAt: Date.now() + TTL_SECONDS * 1e3
    });
  }
}
async function readRecord(shareId) {
  try {
    const raw = await redis.get(`${REDIS_PREFIX}${shareId}`);
    if (raw) return JSON.parse(raw);
  } catch (error) {
    console.error("Redis share read failed, trying memory fallback:", error);
  }
  const cached = memoryStore.get(shareId);
  if (!cached) return null;
  if (cached.expiresAt < Date.now()) {
    memoryStore.delete(shareId);
    return null;
  }
  return JSON.parse(cached.payload);
}
async function createSharedChecklist(input) {
  const record = {
    id: createShareId(),
    title: input.title,
    description: input.description,
    steps: input.steps,
    createdAt: Date.now()
  };
  await writeRecord(record);
  return record;
}
async function getSharedChecklist(shareId) {
  if (!shareId || shareId.length > 64) return null;
  return readRecord(shareId);
}
async function createSharedChecklistFromRequestBody(body) {
  if (body.length > MAX_BODY_BYTES) {
    throw new Error("Request body is too large.");
  }
  const parsed = parseSharePayload(body);
  const record = await createSharedChecklist(parsed);
  return {
    record,
    stepCount: countChecklistSteps(record.steps)
  };
}
export {
  getAppBaseUrl as a,
  buildShareUrl as b,
  createSharedChecklistFromRequestBody as c,
  countChecklistSteps as d,
  cloneChecklistFromTemplate as e,
  generateStepsFromTaskInput as f,
  getSharedChecklist as g,
  createChecklistId as h,
  importTaskTree as i,
  exportChecklistLlmJson as j,
  isStepChecked as k,
  parseChecklistImport as p,
  redis as r,
  toggleStepCompleted as t
};
