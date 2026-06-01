import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { N as Navbar, F as Footer } from "./Footer-Nu2zCevV.mjs";
import { C as ChecklistPreviewShell } from "./checklist-preview-shell-CNvmfokM.mjs";
import { B as Badge } from "./badge-CBjMOr_d.mjs";
import { d as countChecklistSteps, h as cloneChecklistFromTemplate } from "./shared-checklists-BBYnUnnc.mjs";
import { b as Route$2, g as getFeaturedChecklist, f as featuredToSteps } from "./router-BqhhCnjO.mjs";
import { i as isFirebaseConfigured, e as ensureFirebaseUser, a as saveChecklist } from "./firebase-CNUkDlD_.mjs";
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
import "./checklist-viewer-CouMPSBx.mjs";
import "./input-CSALrFrJ.mjs";
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
import "../_chunks/_libs/@firebase/auth.mjs";
import "../_chunks/_libs/@firebase/app.mjs";
import "../_chunks/_libs/@firebase/component.mjs";
import "../_chunks/_libs/@firebase/util.mjs";
import "../_chunks/_libs/@firebase/logger.mjs";
import "../_libs/idb.mjs";
import "../_chunks/_libs/@firebase/firestore.mjs";
import "../_chunks/_libs/@firebase/webchannel-wrapper.mjs";
function FeaturedPreviewPage() {
  const {
    featuredId
  } = Route$2.useParams();
  const navigate = useNavigate();
  const featured = getFeaturedChecklist(featuredId);
  const [steps, setSteps] = reactExports.useState(() => featured ? featuredToSteps(featured) : []);
  const [adding, setAdding] = reactExports.useState(false);
  if (!featured) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-3xl px-6 py-32 text-center text-sm text-white/40", children: [
        "Checklist not found.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", className: "text-accent hover:underline", children: "Go back" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  const stepCount = countChecklistSteps(steps);
  const handleUse = async () => {
    setAdding(true);
    try {
      const userId = isFirebaseConfigured ? await ensureFirebaseUser() : "local-user";
      const checklist = cloneChecklistFromTemplate({
        title: featured.title,
        description: featured.description,
        steps
      }, userId, {
        preserveCompletion: true
      });
      await saveChecklist(checklist);
      navigate({
        to: "/app/$checklistId",
        params: {
          checklistId: checklist.id
        }
      });
    } finally {
      setAdding(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ChecklistPreviewShell, { backHref: "/app", metaRight: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
    stepCount,
    " steps"
  ] }), badges: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "accent", size: "sm", children: "Featured" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", size: "sm", children: featured.category })
  ] }), title: featured.title, description: featured.description, subtitle: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-white/30", children: [
    "by ",
    featured.author
  ] }), steps, onStepsChange: setSteps, primaryActionLabel: "Add to my checklists", onPrimaryAction: handleUse, primaryActionLoading: adding });
}
export {
  FeaturedPreviewPage as component
};
