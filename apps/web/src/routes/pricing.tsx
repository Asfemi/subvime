import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/shared";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [{ title: "SubVime — Pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  const coffeeUrl =
    (import.meta as any).env?.VITE_BUY_ME_COFFEE_URL ?? "https://buymeacoffee.com/";
  const jollofUrl =
    (import.meta as any).env?.VITE_BUY_ME_JOLLOF_URL ?? "https://buymeacoffee.com/";

  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent/30">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-28">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-accent">Pricing</p>
          <h1 className="text-3xl font-bold md:text-4xl">Free, open-source, and built to last.</h1>
          <p className="mt-4 text-white/60">
            SubVime is free to use. If it saves you time, you can support development below.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <a
              href={coffeeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/25"
            >
              <div className="text-lg font-semibold">Buy me coffee</div>
              <div className="mt-2 text-sm text-white/50">A small tip to keep the lights on.</div>
            </a>

            <a
              href={jollofUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/25"
            >
              <div className="text-lg font-semibold">Buy me jollof</div>
              <div className="mt-2 text-sm text-white/50">A bigger thank-you for bigger wins.</div>
            </a>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/55">
            Prefer the product?{" "}
            <Link to="/app" className="text-white underline underline-offset-4 hover:text-accent">
              Get started
            </Link>{" "}
            in the app.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

