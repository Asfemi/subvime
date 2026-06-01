import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { C as ChecklistPreviewShell } from "./checklist-preview-shell-CNvmfokM.mjs";
import { B as Badge } from "./badge-CBjMOr_d.mjs";
import { d as countChecklistSteps, h as cloneChecklistFromTemplate } from "./shared-checklists-BBYnUnnc.mjs";
import { i as isFirebaseConfigured, e as ensureFirebaseUser, a as saveChecklist } from "./firebase-CNUkDlD_.mjs";
import { R as Route$4 } from "./router-BqhhCnjO.mjs";
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
import "./Footer-Nu2zCevV.mjs";
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
function SharedChecklistPage() {
  const record = Route$4.useLoaderData();
  const navigate = useNavigate();
  const [steps, setSteps] = reactExports.useState(() => record.steps);
  const [saving, setSaving] = reactExports.useState(false);
  const stepCount = countChecklistSteps(steps);
  const handleSave = async () => {
    setSaving(true);
    try {
      const userId = isFirebaseConfigured ? await ensureFirebaseUser() : "local-user";
      const checklist = cloneChecklistFromTemplate({
        title: record.title,
        description: record.description,
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
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ChecklistPreviewShell, { backHref: "/app", metaRight: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
    stepCount,
    " steps"
  ] }), badges: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "accent", size: "sm", children: "AI preview" }) }), title: record.title, description: record.description, subtitle: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-white/30", children: "Try the checklist below, then save it to keep your progress." }), steps, onStepsChange: setSteps, primaryActionLabel: "Save to my checklists", onPrimaryAction: handleSave, primaryActionLoading: saving });
}
export {
  SharedChecklistPage as component
};
