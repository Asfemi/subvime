import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navbar, F as Footer } from "./Footer-Nu2zCevV.mjs";
import { L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { B as Button } from "./input-CSALrFrJ.mjs";
import { B as Badge } from "./badge-CBjMOr_d.mjs";
import { d as countChecklistSteps } from "./shared-checklists-COUZ3Sy7.mjs";
import { F as FEATURED_CHECKLISTS, f as featuredToSteps } from "./router-CatMXH2H.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { A as ArrowRight, L as Laptop, S as ShieldCheck, N as Network, G as Globe, C as CircleCheck, Z as Zap, T as Terminal, a as CodeXml, b as Activity, c as Github, U as Users, d as Server, H as Heart } from "../_libs/lucide-react.mjs";
import "../_chunks/_libs/@grpc/grpc-js.mjs";
import "process";
import "tls";
import "fs";
import "os";
import "net";
import "events";
import "stream";
import "../_chunks/_libs/@grpc/proto-loader.mjs";
import "../_libs/lodash.camelcase.mjs";
import "../_libs/protobufjs.mjs";
import "../_chunks/_libs/@protobufjs/aspromise.mjs";
import "../_chunks/_libs/@protobufjs/base64.mjs";
import "../_chunks/_libs/@protobufjs/eventemitter.mjs";
import "../_chunks/_libs/@protobufjs/float.mjs";
import "../_chunks/_libs/@protobufjs/inquire.mjs";
import "../_chunks/_libs/@protobufjs/utf8.mjs";
import "../_chunks/_libs/@protobufjs/pool.mjs";
import "../_libs/long.mjs";
import "../_chunks/_libs/@protobufjs/codegen.mjs";
import "../_chunks/_libs/@protobufjs/fetch.mjs";
import "../_chunks/_libs/@protobufjs/path.mjs";
import "path";
import "http2";
import "http";
import "url";
import "dns";
import "util";
import "zlib";
import "../_chunks/_libs/@tanstack/router-core.mjs";
import "../_chunks/_libs/@tanstack/history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_chunks/_libs/react-dom.mjs";
import "crypto";
import "async_hooks";
import "../_libs/isbot.mjs";
import "../_chunks/_libs/ioredis.mjs";
import "../_chunks/_libs/@ioredis/commands.mjs";
import "../_libs/standard-as-callback.mjs";
import "../_chunks/_libs/redis-errors.mjs";
import "assert";
import "../_libs/cluster-key-slot.mjs";
import "../_chunks/_libs/debug.mjs";
import "../_libs/ms.mjs";
import "tty";
import "buffer";
import "../_libs/denque.mjs";
import "../_chunks/_libs/redis-parser.mjs";
import "string_decoder";
import "./index.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const Hero = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(131,103,199,0.15),_transparent_50%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 flex flex-col items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.h1,
          {
            className: "text-center text-5xl font-bold md:text-7xl",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.1 },
            children: [
              "Break complex tasks into",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "simple subsets" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            className: "max-w-2xl text-center text-xl leading-relaxed text-white/60 md:text-2xl",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            children: "Turn big goals like YouTube automation into nested checklists you can import, export, share, and track."
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex w-full flex-col items-center justify-center gap-4 sm:flex-row",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.3 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/app",
                className: "group flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:bg-gray-200 sm:w-auto",
                children: [
                  "Start a checklist",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 20, className: "transition-transform group-hover:translate-x-1" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/app",
                className: "w-full rounded-full border border-white/10 bg-white/5 px-8 py-4 text-center font-medium text-white/80 transition-all hover:border-accent/40 hover:bg-white/10 hover:text-white sm:w-auto",
                children: "Import JSON outline"
              }
            )
          ]
        }
      )
    ] })
  ] });
};
function Card({
  children,
  padding = true,
  className = "",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `bg-white/2 border border-white/5 rounded-2xl overflow-hidden ${className}`,
      ...props,
      children: padding ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children }) : children
    }
  );
}
function CardHeader({
  icon,
  iconClassName = "bg-blue-500/10 text-blue-400",
  title,
  description,
  action,
  className = "",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `p-4 sm:p-6 border-b border-white/5 ${className}`,
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-lg shrink-0 ${iconClassName}`, children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base sm:text-lg font-medium text-white", children: title }),
            description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-gray-500", children: description })
          ] })
        ] }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: action })
      ] })
    }
  );
}
function CardContent({
  children,
  className = "",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-6 ${className}`, ...props, children });
}
function SubVimeFeatures() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-500/25 via-violet-500/20 to-amber-500/20 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-5xl font-bold italic tracking-tight md:text-7xl", children: "It just works" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-4 right-4 top-[3.35rem] hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative border-t border-white/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute left-0 top-0 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.8)]",
            animate: { x: ["0%", "100%"] },
            transition: { duration: 3.2, ease: "easeInOut", repeat: Infinity }
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-3 text-amber-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Laptop, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-4 text-2xl font-semibold", children: "Your Checklist" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/50", children: "Your task or goal running on your workflow." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-amber-300", children: "subvime://plan/start" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-3 text-emerald-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-4 text-2xl font-semibold", children: "Secure Flow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/50", children: "Establishes a secure, persistent structure." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-3 text-violet-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-4 text-2xl font-semibold", children: "SubVime Core" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/50", children: "Routes tasks from idea to executable nested steps." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-3 text-blue-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-4 text-2xl font-semibold", children: "Shared Access" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/50", children: "Accessible anywhere through your shared checklist link." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-blue-300", children: "(subdomain).subvime.app" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-4xl font-bold tracking-tight md:text-6xl", children: "Unlimited nested lists" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/55 md:text-lg", children: "Break any goal into layers of actionable steps. Keep nesting until every task is clear, small, and executable." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-white/10 bg-white/[0.02] p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-xl bg-blue-500/10 p-2 text-blue-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-semibold", children: "Deep hierarchy support" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/50", children: "Create parent tasks, sub-lists, and sub-sub-lists without limits." })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-white/10 bg-white/[0.02] p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-xl bg-emerald-500/10 p-2 text-emerald-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-semibold", children: "Trusted structure" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/50", children: "Keep context intact as every child task inherits its parent goal." })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-white/10 bg-white/[0.02] p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-xl bg-cyan-500/10 p-2 text-cyan-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-semibold", children: "Zero friction editing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/50", children: "Quickly move, expand, and refine nodes as your execution evolves." })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-white/10 bg-[#06080f] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-white/10 px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[#ff5f57]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[#febc2e]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[#28c840]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-3 text-xs text-white/40", children: "Nested List Preview" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-white/[0.02] p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80", children: "1. Launch marketing site" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-2 border-l border-white/10 pl-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/65", children: "1.1 Define messaging" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/65", children: "1.2 Design sections" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 border-l border-white/10 pl-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/55", children: "1.2.1 Hero + CTA" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/55", children: "1.2.2 Social proof" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/55", children: "1.2.3 Pricing blocks" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/65", children: "1.3 QA and publish" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white/60", children: '$ subvime nest --depth unlimited --from "Launch marketing site"' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-cyan-300", children: "Nested plan ready: /app/launch-marketing-site" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "max-w-2xl text-4xl font-bold tracking-tight md:text-6xl", children: [
        "First-class",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "developer experience"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid gap-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-white/10 bg-white/[0.02] p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-xl bg-indigo-500/10 p-2 text-indigo-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-semibold text-white", children: "Online in one line" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base text-white/50", children: "One command, your checklist workflow is live. Seriously, try it yourself." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/85", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "$" }),
              " subvime start"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-white/10 bg-white/[0.02] p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-xl bg-blue-500/10 p-2 text-blue-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-semibold text-white", children: "Don’t fw setup pain" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base text-white/50", children: "Start creating nested checklists immediately with no heavy onboarding or friction." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] via-indigo-500/[0.04] to-black p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-xl bg-violet-500/10 p-2 text-violet-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-semibold text-white", children: "Instant observability" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base text-white/50", children: "See the state of your workflow instantly as tasks evolve from top-level goals to nested completion." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-3 rounded-2xl border border-white/10 bg-black/35 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-300", children: "Step error" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: "Fix dependency chain" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "2 mins" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-300", children: "200 OK" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: "Define parent checklist" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "1 min" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-300", children: "JSON OK" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: "Import outline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "just now" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-violet-300", children: "Share ready" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: "Publish preview link" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "just now" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-10 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-4xl font-bold tracking-tight md:text-5xl", children: "100% Open Source" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-xl text-sm leading-relaxed text-white/55 md:text-base", children: "We believe in transparency and community. SubVime is built in the open, so you can inspect the code, contribute features, or self-host the platform on your own infrastructure." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://github.com/Asfemi/subvime", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "primary",
              size: "md",
              leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "h-4 w-4" }),
              className: "rounded-full",
              children: "Star on GitHub"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "https://github.com/Asfemi/subvime/discussions",
              target: "_blank",
              rel: "noreferrer",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "secondary",
                  size: "md",
                  leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
                  className: "rounded-full",
                  children: "Join Community"
                }
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-white/10 bg-white/[0.02] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-black/30 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 inline-flex rounded-xl bg-blue-500/10 p-2 text-blue-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-white", children: "Auditable Security" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-relaxed text-white/50", children: "Verify our claims by inspecting the source code yourself." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-black/30 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 inline-flex rounded-xl bg-purple-500/10 p-2 text-purple-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-white", children: "Community Driven" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-relaxed text-white/50", children: "Built with feedback and contributions from developers like you." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-black/30 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 inline-flex rounded-xl bg-emerald-500/10 p-2 text-emerald-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-white", children: "Self-Hostable" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-relaxed text-white/50", children: "Run the entire stack on your own servers. No vendor lock-in." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-black/30 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 inline-flex rounded-xl bg-rose-500/10 p-2 text-rose-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-white", children: "Free Forever" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-relaxed text-white/50", children: "The core experience stays free and open source." })
        ] })
      ] }) })
    ] }) })
  ] });
}
function FeaturedChecklistsSection({
  onUse,
  usingId,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: className ?? "mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-white", children: "Featured checklists" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-white/40", children: "Community templates with nested steps — preview or add to yours." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: FEATURED_CHECKLISTS.map((featured) => {
      const stepCount = countChecklistSteps(featuredToSteps(featured));
      const topLevelCount = featured.tasks.length;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: false, className: "flex h-full flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CardHeader,
          {
            className: "p-3 sm:p-4",
            title: featured.title,
            description: featured.description,
            iconClassName: "bg-accent/10 text-accent"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "mt-auto flex flex-col gap-3 border-t border-white/5 p-3 sm:p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "accent", size: "sm", children: featured.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-white/35", children: [
              topLevelCount,
              " phases · ",
              stepCount,
              " steps"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-white/30", children: [
              "by ",
              featured.author
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/app/featured/$featuredId",
                params: { featuredId: featured.id },
                className: "text-xs text-white/45 hover:text-white/70",
                children: "Preview"
              }
            ),
            onUse ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                disabled: usingId === featured.id,
                onClick: () => onUse(featured),
                className: "ml-auto inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-white disabled:opacity-50",
                children: [
                  usingId === featured.id ? "Adding…" : "Use checklist",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12 })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/app",
                className: "ml-auto inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-white",
                children: [
                  "Start here",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12 })
                ]
              }
            )
          ] })
        ] })
      ] }, featured.id);
    }) })
  ] });
}
const Landing = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-white selection:bg-accent/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedChecklistsSection, { className: "mb-0" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubVimeFeatures, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
};
const SplitComponent = Landing;
export {
  SplitComponent as component
};
