import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { N as Navbar, F as Footer } from "./Footer-Nu2zCevV.mjs";
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
import "../_libs/lucide-react.mjs";
const __vite_import_meta_env__ = {};
function PricingPage() {
  const coffeeUrl = __vite_import_meta_env__?.VITE_BUY_ME_COFFEE_URL ?? "https://buymeacoffee.com/";
  const jollofUrl = __vite_import_meta_env__?.VITE_BUY_ME_JOLLOF_URL ?? "https://buymeacoffee.com/";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-white selection:bg-accent/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-7xl px-6 pb-24 pt-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm uppercase tracking-[0.2em] text-accent", children: "Pricing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold md:text-4xl", children: "Free, open-source, and built to last." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-white/60", children: "SubVime is free to use. If it saves you time, you can support development below." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: coffeeUrl, target: "_blank", rel: "noreferrer", className: "rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/25", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold", children: "Buy me coffee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-white/50", children: "A small tip to keep the lights on." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: jollofUrl, target: "_blank", rel: "noreferrer", className: "rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/25", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold", children: "Buy me jollof" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-white/50", children: "A bigger thank-you for bigger wins." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/55", children: [
        "Prefer the product?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", className: "text-white underline underline-offset-4 hover:text-accent", children: "Get started" }),
        " ",
        "in the app."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  PricingPage as component
};
