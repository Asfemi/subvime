import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/shared";
import { ChecklistPreviewShell } from "@/components/subvime/checklist-preview-shell";
import { Badge } from "@/components/ui";
import {
  cloneChecklistFromTemplate,
  countChecklistSteps,
} from "@/lib/checklist-utils";
import {
  featuredToSteps,
  getFeaturedChecklist,
} from "@/data/featured-checklists";
import {
  ensureFirebaseUser,
  isFirebaseConfigured,
  saveChecklist,
} from "@/lib/firebase";
import type { ChecklistStep } from "@/types/checklist";

export const Route = createFileRoute("/app/featured/$featuredId")({
  head: ({ params }) => {
    const featured = getFeaturedChecklist(params.featuredId);
    const title = featured?.title ?? "Featured checklist";
    const description = featured?.description ?? "Community checklist template on SubVime.";

    return {
      meta: [
        { title: `${title} — SubVime` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} — SubVime` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: FeaturedPreviewPage,
});

function FeaturedPreviewPage() {
  const { featuredId } = Route.useParams();
  const navigate = useNavigate();
  const featured = getFeaturedChecklist(featuredId);
  const [steps, setSteps] = useState<ChecklistStep[]>(() =>
    featured ? featuredToSteps(featured) : [],
  );
  const [adding, setAdding] = useState(false);

  if (!featured) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-32 text-center text-sm text-white/40">
          Checklist not found.{" "}
          <Link to="/app" className="text-accent hover:underline">
            Go back
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const stepCount = countChecklistSteps(steps);

  const handleUse = async () => {
    setAdding(true);
    try {
      const userId = isFirebaseConfigured ? await ensureFirebaseUser() : "local-user";
      const checklist = cloneChecklistFromTemplate(
        {
          title: featured.title,
          description: featured.description,
          steps,
        },
        userId,
        { preserveCompletion: true },
      );
      await saveChecklist(checklist);
      navigate({ to: "/app/$checklistId", params: { checklistId: checklist.id } });
    } finally {
      setAdding(false);
    }
  };

  return (
    <ChecklistPreviewShell
      backHref="/app"
      metaRight={<span>{stepCount} steps</span>}
      badges={
        <>
          <Badge variant="accent" size="sm">
            Featured
          </Badge>
          <Badge variant="default" size="sm">
            {featured.category}
          </Badge>
        </>
      }
      title={featured.title}
      description={featured.description}
      subtitle={<p className="mt-1 text-xs text-white/30">by {featured.author}</p>}
      steps={steps}
      onStepsChange={setSteps}
      primaryActionLabel="Add to my checklists"
      onPrimaryAction={handleUse}
      primaryActionLoading={adding}
    />
  );
}
