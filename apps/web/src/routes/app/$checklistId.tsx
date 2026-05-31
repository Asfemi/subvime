import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/shared";
import { ChecklistViewer } from "@/components/subvime/checklist-viewer";
import { exportChecklistJson } from "@/lib/checklist-utils";
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

  useEffect(() => {
    let unsubscribe = () => {};

    (async () => {
      if (isFirebaseConfigured) {
        await ensureFirebaseUser();
      }
      unsubscribe = subscribeToChecklist(checklistId, setChecklist);
    })();

    return () => unsubscribe();
  }, [checklistId]);

  useEffect(() => {
    if (!checklist) return;

    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(async () => {
      setSaveState("saving");
      await saveChecklist(checklist);
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 1200);
    }, 600);

    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [checklist]);

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
    const blob = new Blob([exportChecklistJson(checklist)], { type: "application/json" });
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

        <ChecklistViewer
          steps={checklist.steps}
          onChange={(steps) =>
            setChecklist({ ...checklist, steps, updatedAt: Date.now() })
          }
        />
      </main>
      <Footer />
    </div>
  );
}
