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
  onUse?: (featured: FeaturedChecklist) => void;
  usingId?: string | null;
  className?: string;
}

export function FeaturedChecklistsSection({
  onUse,
  usingId,
  className,
}: FeaturedChecklistsSectionProps) {
  return (
    <section className={className ?? "mb-6"}>
      <div className="mb-3">
        <h2 className="text-sm font-medium text-white">Featured checklists</h2>
        <p className="mt-0.5 text-xs text-white/40">
          Community templates with nested steps — preview or add to yours.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {FEATURED_CHECKLISTS.map((featured) => {
          const stepCount = countChecklistSteps(featuredToSteps(featured));
          const topLevelCount = featured.tasks.length;

          return (
            <Card key={featured.id} padding={false} className="flex h-full flex-col">
              <CardHeader
                className="p-3 sm:p-4"
                title={featured.title}
                description={featured.description}
                iconClassName="bg-accent/10 text-accent"
              />
              <CardContent className="mt-auto flex flex-col gap-3 border-t border-white/5 p-3 sm:p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="accent" size="sm">
                    {featured.category}
                  </Badge>
                  <span className="text-xs text-white/35">
                    {topLevelCount} phases · {stepCount} steps
                  </span>
                  <span className="text-xs text-white/30">by {featured.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to="/app/featured/$featuredId"
                    params={{ featuredId: featured.id }}
                    className="text-xs text-white/45 hover:text-white/70"
                  >
                    Preview
                  </Link>
                  {onUse ? (
                    <button
                      type="button"
                      disabled={usingId === featured.id}
                      onClick={() => onUse(featured)}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-white disabled:opacity-50"
                    >
                      {usingId === featured.id ? "Adding…" : "Use checklist"}
                      <ArrowRight size={12} />
                    </button>
                  ) : (
                    <Link
                      to="/app"
                      className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-white"
                    >
                      Start here
                      <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
