import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/shared";
import { ChecklistViewer } from "@/components/subvime/checklist-viewer";
import { exportChecklistLlmJson } from "@/lib/checklist-utils";
import { FEATURED_CHECKLISTS } from "@/data/featured-checklists";
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
    </div>
  );
}
