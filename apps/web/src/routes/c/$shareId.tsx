import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ChecklistPreviewShell } from "@/components/subvime/checklist-preview-shell";
import { Badge } from "@/components/ui";
import { cloneChecklistFromTemplate, countChecklistSteps } from "@/lib/checklist-utils";
import {
  ensureFirebaseUser,
  isFirebaseConfigured,
  saveChecklist,
} from "@/lib/firebase";
import { getSharedChecklist, type SharedChecklistRecord } from "@/lib/shared-checklists";
import type { ChecklistStep } from "@/types/checklist";

const loadSharedChecklist = createServerFn({ method: "GET" })
  .inputValidator((shareId: string) => shareId)
  .handler(async ({ data: shareId }) => {
    const record = await getSharedChecklist(shareId);
    if (!record) throw notFound();
    return record;
  });

export const Route = createFileRoute("/c/$shareId")({
  head: ({ loaderData }) => {
    const title = loaderData?.title ?? "Checklist";
    const description =
      loaderData?.description ??
      "Interactive nested checklist preview on SubVime.";

    return {
      meta: [
        { title: `${title} — SubVime Checklist` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} — SubVime Checklist` },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: `${title} — SubVime Checklist` },
        { name: "twitter:description", content: description },
      ],
    };
  },
  loader: ({ params }) => loadSharedChecklist({ data: params.shareId }),
  component: SharedChecklistPage,
});

function SharedChecklistPage() {
  const record = Route.useLoaderData() as SharedChecklistRecord;
  const navigate = useNavigate();
  const [steps, setSteps] = useState<ChecklistStep[]>(() => record.steps);
  const [saving, setSaving] = useState(false);
  const stepCount = countChecklistSteps(steps);

  const handleSave = async () => {
    setSaving(true);
    try {
      const userId = isFirebaseConfigured ? await ensureFirebaseUser() : "local-user";
      const checklist = cloneChecklistFromTemplate(
        {
          title: record.title,
          description: record.description,
          steps,
        },
        userId,
        { preserveCompletion: true },
      );
      await saveChecklist(checklist);
      navigate({ to: "/app/$checklistId", params: { checklistId: checklist.id } });
    } finally {
      setSaving(false);
    }
  };

  return (
    <ChecklistPreviewShell
      backHref="/app"
      metaRight={<span>{stepCount} steps</span>}
      badges={
        <>
          <Badge variant="accent" size="sm">
            AI preview
          </Badge>
        </>
      }
      title={record.title}
      description={record.description}
      subtitle={
        <p className="mt-1 text-xs text-white/30">
          Try the checklist below, then save it to keep your progress.
        </p>
      }
      steps={steps}
      onStepsChange={setSteps}
      primaryActionLabel="Save to my checklists"
      onPrimaryAction={handleSave}
      primaryActionLoading={saving}
    />
  );
}
