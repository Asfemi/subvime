import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/shared";
import { ChecklistViewer } from "@/components/subvime/checklist-viewer";
import { exportChecklistLlmJson, importTaskTree, updateStepInTree } from "@/lib/checklist-utils";
import { FEATURED_CHECKLISTS } from "@/data/featured-checklists";
import { LLM_JSON_INSTRUCTIONS } from "@/lib/llm-json-instructions";
import {
  ensureFirebaseUser,
  isFirebaseConfigured,
  saveChecklist,
  subscribeToChecklist,
} from "@/lib/firebase";
import type { Checklist } from "@/types/checklist";

export const Route = createFileRoute("/app/$checklistId")({
  head: () => ({
    meta: [{ title: "SubVime — Checklist" }],
  }),
  component: ChecklistPage,
});

function ChecklistPage() {
  const { checklistId } = Route.useParams();
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const saveTimer = useRef<number | null>(null);
  const latestUpdatedAt = useRef(0);
  const skipNextSave = useRef(true);
  const checklistRef = useRef<Checklist | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<{
    stepId: string;
    title: string;
    path: string[];
  } | null>(null);
  const [branchJson, setBranchJson] = useState("");
  const [branchStatus, setBranchStatus] = useState<string | null>(null);
  const [branchModalOpen, setBranchModalOpen] = useState(false);

  checklistRef.current = checklist;

  useEffect(() => {
    let unsubscribe = () => {};

    (async () => {
      if (isFirebaseConfigured) {
        await ensureFirebaseUser();
      }
      unsubscribe = subscribeToChecklist(checklistId, (remote) => {
        if (!remote) {
          setChecklist(null);
          return;
        }
        // Ignore stale remote snapshots that would undo local edits.
        if (remote.updatedAt < latestUpdatedAt.current) return;
        latestUpdatedAt.current = remote.updatedAt;
        skipNextSave.current = true;
        setChecklist(remote);
      });
    })();

    return () => unsubscribe();
  }, [checklistId]);

  useEffect(() => {
    if (!checklist) return;

    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(async () => {
      const snapshot = checklistRef.current;
      if (!snapshot) return;
      setSaveState("saving");
      await saveChecklist(snapshot);
      latestUpdatedAt.current = snapshot.updatedAt;
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 1200);
    }, 400);

    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [checklist]);

  const handleStepsChange = useCallback((steps: Checklist["steps"]) => {
    setChecklist((current) => {
      if (!current) return current;
      const next = { ...current, steps, updatedAt: Date.now() };
      latestUpdatedAt.current = next.updatedAt;
      return next;
    });
  }, []);

  if (!checklist) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-32 text-center text-sm text-white/40">
          Loading...
        </main>
      </div>
    );
  }

  const handleExport = () => {
    const blob = new Blob([exportChecklistLlmJson(checklist)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${checklist.title.replace(/\s+/g, "-").toLowerCase()}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyTaskPrompt = async (stepId: string, taskTitle: string, path: string[]) => {
    const parentChain = path.length > 1 ? path.slice(0, -1).join(" -> ") : "Top level task";
    const fullPath = path.join(" -> ");
    const prompt = `Main goal: ${checklist.title}
Goal description: ${checklist.description ?? "No description provided."}

Selected task: ${taskTitle}
Parent chain: ${parentChain}
Full path: ${fullPath}

Please help me understand "${taskTitle}" in depth.
Generate additional checklists (nested where necessary) that break this task down into clear, practical, beginner-friendly steps.
Include key concepts, pitfalls to avoid, and an execution sequence I can follow.

IMPORTANT:
- Return JSON for THIS BRANCH ONLY (do not rewrite unrelated checklist branches).
- Return only nested items for "${taskTitle}".
- Keep output strictly machine-parseable.

Return ONLY valid JSON that follows the SubVime format below.

${LLM_JSON_INSTRUCTIONS}`;

    await navigator.clipboard.writeText(prompt);
  };

  const handleSelectTask = (stepId: string, taskTitle: string, path: string[]) => {
    setSelectedBranch({ stepId, title: taskTitle, path });
    setBranchStatus(null);
    setBranchModalOpen(true);
  };

  const handleApplyBranchJson = () => {
    if (!selectedBranch || !branchJson.trim()) return;

    try {
      const parsed = JSON.parse(branchJson) as Record<string, unknown> | unknown[];
      let branchStepsInput: unknown[] | null = null;

      if (Array.isArray(parsed)) {
        branchStepsInput = parsed;
      } else if (parsed && typeof parsed === "object") {
        const maybeTasks = (parsed as Record<string, unknown>).tasks;
        const maybeSteps = (parsed as Record<string, unknown>).steps;
        if (Array.isArray(maybeTasks)) {
          branchStepsInput = maybeTasks;
        } else if (Array.isArray(maybeSteps)) {
          branchStepsInput = maybeSteps;
        }
      }

      if (!branchStepsInput) {
        throw new Error("Expected JSON with tasks/steps array (or root array).");
      }

      const branchChildren = importTaskTree(branchStepsInput);
      setChecklist((current) => {
        if (!current) return current;
        const nextSteps = updateStepInTree(current.steps, selectedBranch.stepId, (step) => ({
          ...step,
          children: branchChildren,
          completed: false,
        }));

        const next = { ...current, steps: nextSteps, updatedAt: Date.now() };
        latestUpdatedAt.current = next.updatedAt;
        return next;
      });

      setBranchStatus("Branch updated.");
      setBranchJson("");
    } catch (error) {
      setBranchStatus(
        error instanceof Error
          ? `Could not apply JSON: ${error.message}`
          : "Could not apply JSON.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-28">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <div className="mb-6 flex items-center justify-between text-xs text-white/35">
              <Link to="/app" className="hover:text-white/60">
                ← Back
              </Link>
              <div className="flex items-center gap-3">
                <span>
                  {saveState === "saving" && "Saving…"}
                  {saveState === "saved" && "Saved"}
                </span>
                <button type="button" onClick={handleExport} className="hover:text-white/60">
                  Export
                </button>
              </div>
            </div>

            <h1 className="mb-1 text-lg font-medium text-white">{checklist.title}</h1>
            {checklist.description && (
              <p className="mb-6 text-sm text-white/40">{checklist.description}</p>
            )}

            <div className="max-w-3xl">
              <ChecklistViewer
                steps={checklist.steps}
                onChange={handleStepsChange}
                onCopyPrompt={(step, path) =>
                  void handleCopyTaskPrompt(step.id, step.title, path)
                }
                onSelectTask={(step, path) => handleSelectTask(step.id, step.title, path)}
              />
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <h2 className="text-sm font-medium text-white/85">Recommended lists</h2>
            <p className="mt-1 text-xs text-white/45">
              Explore more checklists you can preview or add.
            </p>
            <ul className="mt-4 space-y-2">
              {FEATURED_CHECKLISTS.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <Link
                    to="/app/featured/$featuredId"
                    params={{ featuredId: item.id }}
                    className="block rounded-xl border border-white/5 bg-black/20 p-3 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
                  >
                    <p className="text-sm font-medium text-white/90">{item.title}</p>
                    <p className="mt-1 text-xs text-white/45">{item.category}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>
      <Footer />

      {branchModalOpen && selectedBranch && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setBranchModalOpen(false)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl border border-white/10 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="text-base font-semibold text-white">Expand selected subtask</h2>
              <button
                type="button"
                onClick={() => setBranchModalOpen(false)}
                className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close branch expansion modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[80vh] overflow-y-auto p-5">
              <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                <p className="text-xs text-white/60">
                  Target: <span className="text-white/85">{selectedBranch.title}</span>
                </p>
                <p className="mt-1 text-[11px] text-white/45">
                  Path: {selectedBranch.path.join(" -> ")}
                </p>
                <p className="mt-2 text-xs text-white/45">
                  Copy prompt from the task row, generate JSON with your LLM, then paste it below.
                </p>
                <textarea
                  value={branchJson}
                  onChange={(e) => {
                    setBranchJson(e.target.value);
                    setBranchStatus(null);
                  }}
                  rows={9}
                  placeholder='Paste generated JSON branch here (tasks/steps array or root array).'
                  className="mt-3 w-full resize-y rounded-lg border border-white/10 bg-black/40 p-2 text-xs text-white/85 placeholder:text-white/35 focus:border-white/25 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyBranchJson}
                  disabled={!branchJson.trim()}
                  className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/85 transition-colors hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Apply JSON to selected branch
                </button>
                {branchStatus && <p className="mt-2 text-xs text-white/55">{branchStatus}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
