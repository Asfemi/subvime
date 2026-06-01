import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navbar, F as Footer } from "./Footer-Bg8VSKcz.mjs";
import { L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { B as Button } from "./input-CSALrFrJ.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { A as ArrowRight, L as ListTree, U as Upload, R as RefreshCw, a as Layers } from "../_libs/lucide-react.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const Hero = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(131,103,199,0.15),_transparent_50%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 flex flex-col items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            className: "text-sm uppercase tracking-[0.25em] text-accent",
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: "Sub + vime (a set of things)"
          }
        ),
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
const features = [
  {
    icon: ListTree,
    title: "Break tasks into subsets",
    description: "Start with one big goal and split it into nested sub-lists until every step feels simple."
  },
  {
    icon: Upload,
    title: "Import & export JSON",
    description: "Bring your own structured outlines or export checklists to share, backup, or reuse."
  },
  {
    icon: RefreshCw,
    title: "Real-time sync",
    description: "Edits save automatically and sync through Firebase so your lists stay up to date."
  },
  {
    icon: Layers,
    title: "Reorder and annotate",
    description: "Move steps up or down, add notes, and refine the plan as you learn more."
  }
];
function SubVimeFeatures() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm uppercase tracking-[0.2em] text-accent", children: "How it works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold md:text-4xl", children: "Complex work, broken into clear subsets" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-2xl text-white/60", children: 'SubVime combines "sub" and the Greek "vime" (a set of things) — a checklist system for turning overwhelming tasks into manageable steps.' })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2", children: features.map(({ icon: Icon, title, description }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/20",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 22 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-xl font-semibold", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60", children: description })
        ]
      },
      title
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", children: "Open SubVime" }) }) })
  ] });
}
const Landing = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-white selection:bg-accent/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubVimeFeatures, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
};
const SplitComponent = Landing;
export {
  SplitComponent as component
};
