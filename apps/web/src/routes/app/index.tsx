import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/shared";
import { TaskInputForm } from "@/components/subvime/checklist-editor";
import { LlmInstructionsPanel } from "@/components/subvime/llm-instructions-panel";
import { Button } from "@/components/ui";
import {
  createChecklistId,
  generateStepsFromTaskInput,
  parseChecklistImport,
} from "@/lib/checklist-utils";
import {
  ensureFirebaseUser,
  isFirebaseConfigured,
  saveChecklist,
  subscribeToChecklists,
} from "@/lib/firebase";
import type { Checklist } from "@/types/checklist";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [{ title: "SubVime — Your checklists" }],
  }),
  component: AppHomePage,
});

function AppHomePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [creating, setCreating] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [composerOpen, setComposerOpen] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};

    (async () => {
      const uid = isFirebaseConfigured ? await ensureFirebaseUser() : "local-user";
      setUserId(uid);
      unsubscribe = subscribeToChecklists(uid, setChecklists);
    })();

    return () => unsubscribe();
  }, []);

  const handleCreate = async (payload: {
    title: string;
    description: string;
    outline: string;
  }) => {
    if (!userId) return;
    setCreating(true);
    try {
      const checklist: Checklist = {
        id: createChecklistId(),
        title: payload.title,
        description: payload.description || undefined,
        steps: generateStepsFromTaskInput(payload.outline),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        userId,
      };
      await saveChecklist(checklist);
    } finally {
      setCreating(false);
    }
  };

  const handleImport = async (file: File) => {
    if (!userId) return;
    setImportError(null);
    try {
      const imported = parseChecklistImport(await file.text());
      await saveChecklist({
        id: createChecklistId(),
        title: imported.title,
        description: imported.description,
        steps: imported.steps,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        userId,
      });
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "Import failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pb-12 pt-20">
        <h1 className="mb-4 text-lg font-medium">Checklists</h1>

        <section className="mb-8 rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-sm font-medium text-white/80">New checklist</h2>
              <p className="mt-1 text-sm text-white/50">
                Create a checklist in a focused composer modal.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer text-sm text-white/50 transition-colors hover:text-white/75">
                Import JSON
                <input
                  type="file"
                  accept="application/json,.json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleImport(file);
                    e.target.value = "";
                  }}
                />
              </label>
              <Button onClick={() => setComposerOpen(true)}>Start a checklist</Button>
            </div>
          </div>
          {importError && <p className="mt-3 text-xs text-red-400">{importError}</p>}
        </section>

        <section className="mb-6 rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5">
          <h2 className="mb-3 text-sm font-medium text-white/80">Your checklists</h2>
          {checklists.length === 0 ? (
            <p className="py-2 text-sm text-white/35">No personal checklists yet.</p>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {checklists.map((checklist) => (
                <li key={checklist.id}>
                  <Link
                    to="/app/$checklistId"
                    params={{ checklistId: checklist.id }}
                    className="block rounded-xl border border-white/5 bg-white/2 px-3 py-2.5 text-sm text-white/80 transition-colors hover:border-white/10 hover:bg-white/4 hover:text-white"
                  >
                    {checklist.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />

      {composerOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setComposerOpen(false)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl border border-white/10 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="text-base font-semibold text-white">Create new checklist</h2>
              <button
                type="button"
                onClick={() => setComposerOpen(false)}
                className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close checklist composer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[80vh] overflow-y-auto p-5">
              <div className="space-y-4">
                <LlmInstructionsPanel />
                <TaskInputForm
                  onSubmit={async (payload) => {
                    await handleCreate(payload);
                    setComposerOpen(false);
                  }}
                  isLoading={creating}
                />
                <label className="block cursor-pointer py-1 text-center text-xs text-white/40 hover:text-white/60">
                  Import JSON
                  <input
                    type="file"
                    accept="application/json,.json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void handleImport(file);
                      e.target.value = "";
                    }}
                  />
                </label>
                {importError && <p className="text-xs text-red-400">{importError}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
