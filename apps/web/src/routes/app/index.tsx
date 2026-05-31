import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/shared";
import { TaskInputForm } from "@/components/subvime/checklist-editor";
import { FeaturedChecklistsSection } from "@/components/subvime/featured-checklists-section";
import { LlmInstructionsPanel } from "@/components/subvime/llm-instructions-panel";
import {
  cloneChecklistFromTemplate,
  createChecklistId,
  generateStepsFromTaskInput,
  parseChecklistImport,
} from "@/lib/checklist-utils";
import {
  featuredToSteps,
  type FeaturedChecklist,
} from "@/data/featured-checklists";
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
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [creating, setCreating] = useState(false);
  const [usingFeaturedId, setUsingFeaturedId] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

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

  const handleUseFeatured = async (featured: FeaturedChecklist) => {
    if (!userId) return;
    setUsingFeaturedId(featured.id);
    try {
      const checklist = cloneChecklistFromTemplate(
        {
          title: featured.title,
          description: featured.description,
          steps: featuredToSteps(featured),
        },
        userId,
      );
      await saveChecklist(checklist);
      navigate({ to: "/app/$checklistId", params: { checklistId: checklist.id } });
    } finally {
      setUsingFeaturedId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="mx-auto max-w-xl px-6 pb-24 pt-28">
        <h1 className="mb-6 text-lg font-medium">Checklists</h1>

        <FeaturedChecklistsSection onUse={handleUseFeatured} usingId={usingFeaturedId} />

        <div className="mb-8 space-y-3 border-t border-white/5 pt-8">
          <h2 className="text-sm font-medium text-white/80">Your checklists</h2>
          <LlmInstructionsPanel />
          <TaskInputForm onSubmit={handleCreate} isLoading={creating} />
          <label className="block cursor-pointer py-2 text-center text-xs text-white/40 hover:text-white/60">
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

        {checklists.length === 0 ? (
          <p className="py-4 text-center text-sm text-white/35">No personal checklists yet.</p>
        ) : (
          <ul className="divide-y divide-white/5 border-t border-white/5">
            {checklists.map((checklist) => (
              <li key={checklist.id}>
                <Link
                  to="/app/$checklistId"
                  params={{ checklistId: checklist.id }}
                  className="block py-3 text-sm text-white/80 hover:text-white"
                >
                  {checklist.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}
