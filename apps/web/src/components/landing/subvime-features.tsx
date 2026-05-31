import { Layers, ListTree, RefreshCw, Upload } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui";

const features = [
  {
    icon: ListTree,
    title: "Break tasks into subsets",
    description:
      "Start with one big goal and split it into nested sub-lists until every step feels simple.",
  },
  {
    icon: Upload,
    title: "Import & export JSON",
    description:
      "Bring your own structured outlines or export checklists to share, backup, or reuse.",
  },
  {
    icon: RefreshCw,
    title: "Real-time sync",
    description:
      "Edits save automatically and sync through Firebase so your lists stay up to date.",
  },
  {
    icon: Layers,
    title: "Reorder and annotate",
    description:
      "Move steps up or down, add notes, and refine the plan as you learn more.",
  },
];

export function SubVimeFeatures() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-accent">How it works</p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Complex work, broken into clear subsets
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/60">
          SubVime combines &quot;sub&quot; and the Greek &quot;vime&quot; (a set of things) —
          a checklist system for turning overwhelming tasks into manageable steps.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/20"
          >
            <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
              <Icon size={22} />
            </div>
            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
            <p className="text-white/60">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link to="/app">
          <Button size="lg">Open SubVime</Button>
        </Link>
      </div>
    </section>
  );
}
