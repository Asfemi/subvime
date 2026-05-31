import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/shared";
import { ChecklistViewer } from "@/components/subvime/checklist-viewer";
import { exportChecklistLlmJson } from "@/lib/checklist-utils";
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
        <main className="mx-auto max-w-xl px-6 py-32 text-center text-sm text-white/40">
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

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="mx-auto max-w-xl px-6 pb-24 pt-28">
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

        <ChecklistViewer steps={checklist.steps} onChange={handleStepsChange} />
      </main>
      <Footer />
    </div>
  );
}
