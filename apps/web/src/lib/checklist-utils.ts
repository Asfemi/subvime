import type { Checklist, ChecklistExport, ChecklistStep } from "@/types/checklist";

export function createStepId(): string {
  return crypto.randomUUID();
}

export function createChecklistId(): string {
  return crypto.randomUUID();
}

export function createEmptyStep(title = "New step", order = 0): ChecklistStep {
  return {
    id: createStepId(),
    title,
    notes: "",
    children: [],
    order,
  };
}

/** Turn multiline task input into a nested outline (one level per indented/new line). */
export function generateStepsFromTaskInput(raw: string): ChecklistStep[] {
  const lines = raw
   .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return [
      createEmptyStep("Define the goal", 0),
      createEmptyStep("Break into phases", 1),
      createEmptyStep("Add actionable sub-steps", 2),
    ];
  }

  return lines.map((line, index) => createEmptyStep(line, index));
}

export function exportChecklistJson(
  checklist: Pick<Checklist, "title" | "description" | "steps">,
): string {
  const payload: ChecklistExport = {
    version: 1,
    title: checklist.title,
    description: checklist.description,
    steps: checklist.steps,
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(payload, null, 2);
}

export function parseChecklistImport(raw: string): Pick<Checklist, "title" | "description" | "steps"> {
  const parsed = JSON.parse(raw) as Record<string, unknown>;

  const title =
    typeof parsed.title === "string"
      ? parsed.title
      : typeof parsed.name === "string"
        ? parsed.name
        : null;

  const rootSteps = parsed.steps ?? parsed.tasks;
  if (!title || !Array.isArray(rootSteps)) {
    throw new Error(
      "Invalid checklist JSON. Expected title and a steps or tasks array.",
    );
  }

  return {
    title,
    description:
      typeof parsed.description === "string" ? parsed.description : undefined,
    steps: normalizeImportedSteps(rootSteps),
  };
}

type ImportedStep = {
  id?: string;
  title?: string;
  notes?: string | string[];
  completed?: boolean;
  steps?: ImportedStep[];
  children?: ImportedStep[];
  riskChecklist?: string[];
  order?: number;
};

function formatNotes(notes: unknown, riskChecklist?: string[]): string {
  const parts: string[] = [];

  if (typeof notes === "string" && notes.trim()) {
    parts.push(notes.trim());
  } else if (Array.isArray(notes)) {
    const lines = notes.filter((n): n is string => typeof n === "string" && n.trim());
    if (lines.length) parts.push(lines.map((line) => `- ${line}`).join("\n"));
  }

  if (Array.isArray(riskChecklist) && riskChecklist.length) {
    parts.push(
      riskChecklist
        .filter((item): item is string => typeof item === "string" && item.trim())
        .map((item) => `- ${item}`)
        .join("\n"),
    );
  }

  return parts.join("\n\n");
}

function normalizeImportedSteps(steps: unknown[], depth = 0): ChecklistStep[] {
  return steps
    .filter((step): step is ImportedStep => !!step && typeof step === "object")
    .map((step, index) => {
      const nested = step.children ?? step.tasks ?? [];
      return {
        id: typeof step.id === "string" && step.id ? step.id : createStepId(),
        title:
          typeof step.title === "string" && step.title.trim()
            ? step.title.trim()
            : `Step ${index + 1}`,
        notes: formatNotes(step.notes, step.riskChecklist),
        completed: step.completed === true,
        order: typeof step.order === "number" ? step.order : index,
        children: Array.isArray(nested)
          ? normalizeImportedSteps(nested, depth + 1)
          : [],
      };
    });
}

export function updateStepInTree(
  steps: ChecklistStep[],
  stepId: string,
  updater: (step: ChecklistStep) => ChecklistStep,
): ChecklistStep[] {
  return steps.map((step) => {
    if (step.id === stepId) {
      return updater(step);
    }
    if (step.children.length > 0) {
      return {
        ...step,
        children: updateStepInTree(step.children, stepId, updater),
      };
    }
    return step;
  });
}

export function addChildStep(
  steps: ChecklistStep[],
  parentId: string | null,
  child: ChecklistStep,
): ChecklistStep[] {
  if (parentId === null) {
    return [...steps, { ...child, order: steps.length }];
  }

  return steps.map((step) => {
    if (step.id === parentId) {
      return {
        ...step,
        children: [...step.children, { ...child, order: step.children.length }],
      };
    }
    if (step.children.length > 0) {
      return {
        ...step,
        children: addChildStep(step.children, parentId, child),
      };
    }
    return step;
  });
}

export function removeStepFromTree(
  steps: ChecklistStep[],
  stepId: string,
): ChecklistStep[] {
  return steps
    .filter((step) => step.id !== stepId)
    .map((step) => ({
      ...step,
      children: removeStepFromTree(step.children, stepId),
    }));
}

export function moveStepInSiblings(
  steps: ChecklistStep[],
  stepId: string,
  direction: "up" | "down",
): ChecklistStep[] {
  const index = steps.findIndex((s) => s.id === stepId);
  if (index !== -1) {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= steps.length) return steps;
    const next = [...steps];
    [next[index], next[target]] = [next[target], next[index]];
    return next.map((step, i) => ({ ...step, order: i }));
  }

  return steps.map((step) => ({
    ...step,
    children: moveStepInSiblings(step.children, stepId, direction),
  }));
}

export function getStepProgress(step: ChecklistStep): {
  completed: number;
  total: number;
} {
  if (step.children.length === 0) {
    return { completed: step.completed ? 1 : 0, total: 1 };
  }

  return step.children.reduce(
    (acc, child) => {
      const childProgress = getStepProgress(child);
      return {
        completed: acc.completed + childProgress.completed,
        total: acc.total + childProgress.total,
      };
    },
    { completed: 0, total: 0 },
  );
}

export function toggleStepCompleted(
  steps: ChecklistStep[],
  stepId: string,
): ChecklistStep[] {
  return updateStepInTree(steps, stepId, (step) => {
    if (step.children.length > 0) return step;
    return { ...step, completed: !step.completed };
  });
}
