import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/shared";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [{ title: "SubVime — Docs" }],
  }),
  component: DocsPage,
});

function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent/30">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-28">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-accent">Docs</p>
          <h1 className="text-3xl font-bold md:text-4xl">Documentation</h1>
          <p className="mt-4 text-white/60">
            Everything you need to create, share, and reuse nested checklists.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/60">
            For now, the docs are intentionally minimal. If you want to jump in:{" "}
            <Link to="/app" className="text-white underline underline-offset-4 hover:text-accent">
              open the app
            </Link>{" "}
            and start a checklist.
          </div>

          <section id="share" className="mt-10">
            <h2 className="text-xl font-semibold">Sharing</h2>
            <p className="mt-3 text-sm text-white/60">
              You can generate shareable previews for checklists and send them to anyone.
            </p>
          </section>

          <section id="import-export" className="mt-10">
            <h2 className="text-xl font-semibold">Import & export</h2>
            <p className="mt-3 text-sm text-white/60">
              SubVime supports importing and exporting JSON outlines so your structure stays portable.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

