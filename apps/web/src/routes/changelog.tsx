import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/shared";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [{ title: "SubVime — Changelog" }],
  }),
  component: ChangelogPage,
});

const entries: Array<{
  version: string;
  date: string;
  items: string[];
}> = [
  {
    version: "1.0",
    date: "2026",
    items: [
      "Nested checklist editor with reordering and notes.",
      "Import/export JSON outlines.",
      "Shareable checklist previews.",
    ],
  },
];

function ChangelogPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent/30">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-28">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-accent">Changelog</p>
          <h1 className="text-3xl font-bold md:text-4xl">What’s new in SubVime</h1>
          <p className="mt-4 text-white/60">
            A running list of notable improvements as SubVime gets sharper and faster.
          </p>

          <div className="mt-10 space-y-6">
            {entries.map((entry) => (
              <section
                key={entry.version}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-lg font-semibold">v{entry.version}</h2>
                  <span className="text-xs text-white/40">{entry.date}</span>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/60">
                  {entry.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-10 text-sm text-white/55">
            Want to try it?{" "}
            <Link to="/app" className="text-white underline underline-offset-4 hover:text-accent">
              Get started
            </Link>
            .
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

