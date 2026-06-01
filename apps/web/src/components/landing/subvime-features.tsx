import {
  Activity,
  CheckCircle2,
  Code2,
  Globe,
  Laptop,
  Github,
  Heart,
  Network,
  ShieldCheck,
  Server,
  Terminal,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui";

export function SubVimeFeatures() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-500/25 via-violet-500/20 to-amber-500/20 blur-3xl" />
            <h3 className="text-5xl font-bold italic tracking-tight md:text-7xl">It just works</h3>
          </div>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-4 right-4 top-[3.35rem] hidden md:block">
            <div className="relative border-t border-white/15">
              <motion.div
                className="absolute left-0 top-0 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.8)]"
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <div>
              <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-3 text-amber-300">
                <Laptop className="h-5 w-5" />
              </div>
              <h4 className="mt-4 text-2xl font-semibold">Your Checklist</h4>
              <p className="mt-2 text-sm text-white/50">
                Your task or goal running on your workflow.
              </p>
              <p className="mt-1 text-sm text-amber-300">subvime://plan/start</p>
            </div>

            <div>
              <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-3 text-emerald-300">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="mt-4 text-2xl font-semibold">Secure Flow</h4>
              <p className="mt-2 text-sm text-white/50">
                Establishes a secure, persistent structure.
              </p>
            </div>

            <div>
              <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-3 text-violet-300">
                <Network className="h-5 w-5" />
              </div>
              <h4 className="mt-4 text-2xl font-semibold">SubVime Core</h4>
              <p className="mt-2 text-sm text-white/50">
                Routes tasks from idea to executable nested steps.
              </p>
            </div>

            <div>
              <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-3 text-blue-300">
                <Globe className="h-5 w-5" />
              </div>
              <h4 className="mt-4 text-2xl font-semibold">Shared Access</h4>
              <p className="mt-2 text-sm text-white/50">
                Accessible anywhere through your shared checklist link.
              </p>
              <p className="mt-1 text-sm text-blue-300">(subdomain).subvime.app</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-4xl font-bold tracking-tight md:text-6xl">
            Unlimited nested lists
          </h3>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/55 md:text-lg">
            Break any goal into layers of actionable steps. Keep nesting until every task is clear,
            small, and executable.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-start gap-3">
                <span className="inline-flex rounded-xl bg-blue-500/10 p-2 text-blue-300">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-lg font-semibold">Deep hierarchy support</h4>
                  <p className="mt-1 text-sm text-white/50">
                    Create parent tasks, sub-lists, and sub-sub-lists without limits.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-start gap-3">
                <span className="inline-flex rounded-xl bg-emerald-500/10 p-2 text-emerald-300">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-lg font-semibold">Trusted structure</h4>
                  <p className="mt-1 text-sm text-white/50">
                    Keep context intact as every child task inherits its parent goal.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-start gap-3">
                <span className="inline-flex rounded-xl bg-cyan-500/10 p-2 text-cyan-300">
                  <Zap className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-lg font-semibold">Zero friction editing</h4>
                  <p className="mt-1 text-sm text-white/50">
                    Quickly move, expand, and refine nodes as your execution evolves.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#06080f] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <div className="ml-3 text-xs text-white/40">Nested List Preview</div>
            </div>

            <div className="space-y-3 p-5 text-sm">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="text-white/80">1. Launch marketing site</div>
                <div className="mt-2 space-y-2 border-l border-white/10 pl-3">
                  <div className="text-white/65">1.1 Define messaging</div>
                  <div className="text-white/65">1.2 Design sections</div>
                  <div className="space-y-1 border-l border-white/10 pl-3">
                    <div className="text-white/55">1.2.1 Hero + CTA</div>
                    <div className="text-white/55">1.2.2 Social proof</div>
                    <div className="text-white/55">1.2.3 Pricing blocks</div>
                  </div>
                  <div className="text-white/65">1.3 QA and publish</div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white/60">
                $ subvime nest --depth unlimited --from "Launch marketing site"
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-cyan-300">
                Nested plan ready: /app/launch-marketing-site
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <h3 className="max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
          First-class
          <br />
          developer experience
        </h3>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex rounded-xl bg-indigo-500/10 p-2 text-indigo-300">
                  <Terminal className="h-4 w-4" />
                </span>
                <span className="text-2xl font-semibold text-white">Online in one line</span>
              </div>
              <p className="mt-5 text-base text-white/50">
                One command, your checklist workflow is live. Seriously, try it yourself.
              </p>
              <div className="mt-6 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/85">
                <span className="text-accent">$</span> subvime start
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex rounded-xl bg-blue-500/10 p-2 text-blue-300">
                  <Code2 className="h-4 w-4" />
                </span>
                <span className="text-2xl font-semibold text-white">Don’t fw setup pain</span>
              </div>
              <p className="mt-5 text-base text-white/50">
                Start creating nested checklists immediately with no heavy onboarding or friction.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] via-indigo-500/[0.04] to-black p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex rounded-xl bg-violet-500/10 p-2 text-violet-300">
                <Activity className="h-4 w-4" />
              </span>
              <span className="text-2xl font-semibold text-white">Instant observability</span>
            </div>
            <p className="mt-5 text-base text-white/50">
              See the state of your workflow instantly as tasks evolve from top-level goals to
              nested completion.
            </p>

            <div className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-black/35 p-4">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm">
                <span className="text-rose-300">Step error</span>
                <span className="text-white/80">Fix dependency chain</span>
                <span className="text-white/40">2 mins</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm">
                <span className="text-emerald-300">200 OK</span>
                <span className="text-white/80">Define parent checklist</span>
                <span className="text-white/40">1 min</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm">
                <span className="text-blue-300">JSON OK</span>
                <span className="text-white/80">Import outline</span>
                <span className="text-white/40">just now</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm">
                <span className="text-violet-300">Share ready</span>
                <span className="text-white/80">Publish preview link</span>
                <span className="text-white/40">just now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final section before footer: Open Source */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-4xl font-bold tracking-tight md:text-5xl">100% Open Source</h3>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
              We believe in transparency and community. SubVime is built in the open, so you can
              inspect the code, contribute features, or self-host the platform on your own
              infrastructure.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="https://github.com/Asfemi/subvime" target="_blank" rel="noreferrer">
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<Github className="h-4 w-4" />}
                  className="rounded-full"
                >
                  Star on GitHub
                </Button>
              </a>
              <a
                href="https://github.com/Asfemi/subvime/discussions"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="secondary"
                  size="md"
                  leftIcon={<Users className="h-4 w-4" />}
                  className="rounded-full"
                >
                  Join Community
                </Button>
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="mb-3 inline-flex rounded-xl bg-blue-500/10 p-2 text-blue-300">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold text-white">Auditable Security</div>
                <p className="mt-1 text-xs leading-relaxed text-white/50">
                  Verify our claims by inspecting the source code yourself.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="mb-3 inline-flex rounded-xl bg-purple-500/10 p-2 text-purple-300">
                  <Users className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold text-white">Community Driven</div>
                <p className="mt-1 text-xs leading-relaxed text-white/50">
                  Built with feedback and contributions from developers like you.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="mb-3 inline-flex rounded-xl bg-emerald-500/10 p-2 text-emerald-300">
                  <Server className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold text-white">Self-Hostable</div>
                <p className="mt-1 text-xs leading-relaxed text-white/50">
                  Run the entire stack on your own servers. No vendor lock-in.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="mb-3 inline-flex rounded-xl bg-rose-500/10 p-2 text-rose-300">
                  <Heart className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold text-white">Free Forever</div>
                <p className="mt-1 text-xs leading-relaxed text-white/50">
                  The core experience stays free and open source.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
