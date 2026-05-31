import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/shared";
import { ChecklistViewer } from "@/components/subvime/checklist-viewer";
import { Badge, Button } from "@/components/ui";
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

export const Route = createFileRoute("/app/featured/$featuredId")({
  head: () => ({
    meta: [{ title: "SubVime — Featured checklist" }],
  }),
  component: FeaturedPreviewPage,
});

function FeaturedPreviewPage() {
  const { featuredId } = Route.useParams();
  const navigate = useNavigate();
  const featured = getFeaturedChecklist(featuredId);
  const [adding, setAdding] = useState(false);

  if (!featured) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="mx-auto max-w-xl px-6 py-32 text-center text-sm text-white/40">
          Checklist not found.{" "}
          <Link to="/app" className="text-accent hover:underline">
            Go back
          </Link>
        </main>
      </div>
    );
  }

  const steps = featuredToSteps(featured);
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
      );
      await saveChecklist(checklist);
      navigate({ to: "/app/$checklistId", params: { checklistId: checklist.id } });
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="mx-auto max-w-xl px-6 pb-24 pt-28">
        <div className="mb-6 flex items-center justify-between text-xs text-white/35">
          <Link to="/app" className="hover:text-white/60">
            ← Back
          </Link>
          <span>{stepCount} steps</span>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="accent" size="sm">
              Featured
            </Badge>
            <Badge variant="default" size="sm">
              {featured.category}
            </Badge>
          </div>
          <h1 className="text-lg font-medium text-white">{featured.title}</h1>
          <p className="mt-2 text-sm text-white/45">{featured.description}</p>
          <p className="mt-1 text-xs text-white/30">by {featured.author}</p>
        </div>

        <div className="mb-6 rounded-2xl border border-white/5 bg-white/2 p-1">
          <ChecklistViewer steps={steps} readOnly />
        </div>

        <Button fullWidth onClick={() => void handleUse()} isLoading={adding}>
          Add to my checklists
        </Button>
      </main>
      <Footer />
    </div>
  );
}
