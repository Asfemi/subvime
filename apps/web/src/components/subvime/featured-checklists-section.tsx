import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import { countChecklistSteps } from "@/lib/checklist-utils";
import {
  FEATURED_CHECKLISTS,
  featuredToSteps,
  type FeaturedChecklist,
} from "@/data/featured-checklists";

interface FeaturedChecklistsSectionProps {
  onUse: (featured: FeaturedChecklist) => void;
  usingId?: string | null;
}

export function FeaturedChecklistsSection({ onUse, usingId }: FeaturedChecklistsSectionProps) {
  return (
    <section className="mb-10">
      <div className="mb-4">
        <h2 className="text-sm font-medium text-white">Featured checklists</h2>
        <p className="mt-1 text-xs text-white/40">
          Community templates with nested steps — preview or add to yours.
        </p>
      </div>

      <div className="space-y-3">
        {FEATURED_CHECKLISTS.map((featured) => {
          const stepCount = countChecklistSteps(featuredToSteps(featured));
          const topLevelCount = featured.tasks.length;

          return (
            <Card key={featured.id} padding={false}>
              <CardHeader
                title={featured.title}
                description={featured.description}
                iconClassName="bg-accent/10 text-accent"
                action={
                  <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                    <Link
                      to="/app/featured/$featuredId"
                      params={{ featuredId: featured.id }}
                      className="text-xs text-white/45 hover:text-white/70"
                    >
                      Preview
                    </Link>
                    <button
                      type="button"
                      disabled={usingId === featured.id}
                      onClick={() => onUse(featured)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-white disabled:opacity-50"
                    >
                      {usingId === featured.id ? "Adding…" : "Use checklist"}
                      <ArrowRight size={12} />
                    </button>
                  </div>
                }
              />
              <CardContent className="flex flex-wrap items-center gap-2 border-t border-white/5 py-3">
                <Badge variant="accent" size="sm">
                  {featured.category}
                </Badge>
                <span className="text-xs text-white/35">
                  {topLevelCount} phases · {stepCount} steps
                </span>
                <span className="text-xs text-white/30">by {featured.author}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
