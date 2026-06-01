import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { N as Navbar, F as Footer } from "./Footer-Bg8VSKcz.mjs";
import { C as ChecklistViewer } from "./checklist-viewer-DqUAIPVa.mjs";
import { j as exportChecklistLlmJson } from "./shared-checklists-BJQo8yU4.mjs";
import { i as isFirebaseConfigured, e as ensureFirebaseUser, b as subscribeToChecklist, a as saveChecklist } from "./firebase-CNUkDlD_.mjs";
import { a as Route$3 } from "./router-LHZOSFRh.mjs";
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
import "../_chunks/_libs/@firebase/auth.mjs";
import "../_chunks/_libs/@firebase/app.mjs";
import "../_chunks/_libs/@firebase/component.mjs";
import "../_chunks/_libs/@firebase/util.mjs";
import "../_chunks/_libs/@firebase/logger.mjs";
import "../_libs/idb.mjs";
import "../_chunks/_libs/@firebase/firestore.mjs";
import "../_chunks/_libs/@firebase/webchannel-wrapper.mjs";
import "./index.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function ChecklistPage() {
  const {
    checklistId
  } = Route$3.useParams();
  const [checklist, setChecklist] = reactExports.useState(null);
  const [saveState, setSaveState] = reactExports.useState("idle");
  const saveTimer = reactExports.useRef(null);
  const latestUpdatedAt = reactExports.useRef(0);
  const skipNextSave = reactExports.useRef(true);
  const checklistRef = reactExports.useRef(null);
  checklistRef.current = checklist;
  reactExports.useEffect(() => {
    let unsubscribe = () => {
    };
    (async () => {
      if (isFirebaseConfigured) {
        await ensureFirebaseUser();
      }
      unsubscribe = subscribeToChecklist(checklistId, (remote) => {
        if (!remote) {
          setChecklist(null);
          return;
        }
        if (remote.updatedAt < latestUpdatedAt.current) return;
        latestUpdatedAt.current = remote.updatedAt;
        skipNextSave.current = true;
        setChecklist(remote);
      });
    })();
    return () => unsubscribe();
  }, [checklistId]);
  reactExports.useEffect(() => {
    if (!checklist) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(async () => {
      const snapshot = checklistRef.current;
      if (!snapshot) return;
      setSaveState("saving");
      await saveChecklist(snapshot);
      latestUpdatedAt.current = snapshot.updatedAt;
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 1200);
    }, 400);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [checklist]);
  const handleStepsChange = reactExports.useCallback((steps) => {
    setChecklist((current) => {
      if (!current) return current;
      const next = {
        ...current,
        steps,
        updatedAt: Date.now()
      };
      latestUpdatedAt.current = next.updatedAt;
      return next;
    });
  }, []);
  if (!checklist) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-xl px-6 py-32 text-center text-sm text-white/40", children: "Loading..." })
    ] });
  }
  const handleExport = () => {
    const blob = new Blob([exportChecklistLlmJson(checklist)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${checklist.title.replace(/\s+/g, "-").toLowerCase()}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-xl px-6 pb-24 pt-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between text-xs text-white/35", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", className: "hover:text-white/60", children: "← Back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            saveState === "saving" && "Saving…",
            saveState === "saved" && "Saved"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleExport, className: "hover:text-white/60", children: "Export" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-1 text-lg font-medium text-white", children: checklist.title }),
      checklist.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 text-sm text-white/40", children: checklist.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChecklistViewer, { steps: checklist.steps, onChange: handleStepsChange })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ChecklistPage as component
};
