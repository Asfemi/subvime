import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { N as Navbar, F as Footer } from "./Footer-Nu2zCevV.mjs";
import { C as ChecklistViewer } from "./checklist-viewer-CouMPSBx.mjs";
import { j as exportChecklistLlmJson, i as importTaskTree, u as updateStepInTree } from "./shared-checklists-BBYnUnnc.mjs";
import { a as Route$3, F as FEATURED_CHECKLISTS } from "./router-BqhhCnjO.mjs";
import { a as LLM_JSON_INSTRUCTIONS } from "./llm-json-instructions-BUY7hxsb.mjs";
import { i as isFirebaseConfigured, e as ensureFirebaseUser, b as subscribeToChecklist, a as saveChecklist } from "./firebase-CNUkDlD_.mjs";
import { X } from "../_libs/lucide-react.mjs";
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
import "../_chunks/_libs/@firebase/auth.mjs";
import "../_chunks/_libs/@firebase/app.mjs";
import "../_chunks/_libs/@firebase/component.mjs";
import "../_chunks/_libs/@firebase/util.mjs";
import "../_chunks/_libs/@firebase/logger.mjs";
import "../_libs/idb.mjs";
import "../_chunks/_libs/@firebase/firestore.mjs";
import "../_chunks/_libs/@firebase/webchannel-wrapper.mjs";
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
  const [selectedBranch, setSelectedBranch] = reactExports.useState(null);
  const [branchJson, setBranchJson] = reactExports.useState("");
  const [branchStatus, setBranchStatus] = reactExports.useState(null);
  const [branchModalOpen, setBranchModalOpen] = reactExports.useState(false);
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-7xl px-6 py-32 text-center text-sm text-white/40", children: "Loading..." })
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
  const handleCopyTaskPrompt = async (stepId, taskTitle, path) => {
    const parentChain = path.length > 1 ? path.slice(0, -1).join(" -> ") : "Top level task";
    const fullPath = path.join(" -> ");
    const prompt = `Main goal: ${checklist.title}
Goal description: ${checklist.description ?? "No description provided."}

Selected task: ${taskTitle}
Parent chain: ${parentChain}
Full path: ${fullPath}

Please help me understand "${taskTitle}" in depth.
Generate additional checklists (nested where necessary) that break this task down into clear, practical, beginner-friendly steps.
Include key concepts, pitfalls to avoid, and an execution sequence I can follow.

IMPORTANT:
- Return JSON for THIS BRANCH ONLY (do not rewrite unrelated checklist branches).
- Return only nested items for "${taskTitle}".
- Keep output strictly machine-parseable.

Return ONLY valid JSON that follows the SubVime format below.

${LLM_JSON_INSTRUCTIONS}`;
    await navigator.clipboard.writeText(prompt);
  };
  const handleSelectTask = (stepId, taskTitle, path) => {
    setSelectedBranch({
      stepId,
      title: taskTitle,
      path
    });
    setBranchStatus(null);
    setBranchModalOpen(true);
  };
  const handleApplyBranchJson = () => {
    if (!selectedBranch || !branchJson.trim()) return;
    try {
      const parsed = JSON.parse(branchJson);
      let branchStepsInput = null;
      if (Array.isArray(parsed)) {
        branchStepsInput = parsed;
      } else if (parsed && typeof parsed === "object") {
        const maybeTasks = parsed.tasks;
        const maybeSteps = parsed.steps;
        if (Array.isArray(maybeTasks)) {
          branchStepsInput = maybeTasks;
        } else if (Array.isArray(maybeSteps)) {
          branchStepsInput = maybeSteps;
        }
      }
      if (!branchStepsInput) {
        throw new Error("Expected JSON with tasks/steps array (or root array).");
      }
      const branchChildren = importTaskTree(branchStepsInput);
      setChecklist((current) => {
        if (!current) return current;
        const nextSteps = updateStepInTree(current.steps, selectedBranch.stepId, (step) => ({
          ...step,
          children: branchChildren,
          completed: false
        }));
        const next = {
          ...current,
          steps: nextSteps,
          updatedAt: Date.now()
        };
        latestUpdatedAt.current = next.updatedAt;
        return next;
      });
      setBranchStatus("Branch updated.");
      setBranchJson("");
    } catch (error) {
      setBranchStatus(error instanceof Error ? `Could not apply JSON: ${error.message}` : "Could not apply JSON.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-7xl px-6 pb-24 pt-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChecklistViewer, { steps: checklist.steps, onChange: handleStepsChange, onCopyPrompt: (step, path) => void handleCopyTaskPrompt(step.id, step.title, path), onSelectTask: (step, path) => handleSelectTask(step.id, step.title, path) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-2xl border border-white/10 bg-white/[0.02] p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-white/85", children: "Recommended lists" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-white/45", children: "Explore more checklists you can preview or add." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2", children: FEATURED_CHECKLISTS.slice(0, 6).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/featured/$featuredId", params: {
          featuredId: item.id
        }, className: "block rounded-xl border border-white/5 bg-black/20 p-3 transition-colors hover:border-white/10 hover:bg-white/[0.04]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-white/90", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-white/45", children: item.category })
        ] }) }, item.id)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    branchModalOpen && selectedBranch && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm", onClick: () => setBranchModalOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-3xl rounded-2xl border border-white/10 bg-black shadow-2xl", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-white/10 px-5 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-white", children: "Expand selected subtask" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setBranchModalOpen(false), className: "rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white", "aria-label": "Close branch expansion modal", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[80vh] overflow-y-auto p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-black/30 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/60", children: [
          "Target: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/85", children: selectedBranch.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[11px] text-white/45", children: [
          "Path: ",
          selectedBranch.path.join(" -> ")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-white/45", children: "Copy prompt from the task row, generate JSON with your LLM, then paste it below." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: branchJson, onChange: (e) => {
          setBranchJson(e.target.value);
          setBranchStatus(null);
        }, rows: 9, placeholder: "Paste generated JSON branch here (tasks/steps array or root array).", className: "mt-3 w-full resize-y rounded-lg border border-white/10 bg-black/40 p-2 text-xs text-white/85 placeholder:text-white/35 focus:border-white/25 focus:outline-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleApplyBranchJson, disabled: !branchJson.trim(), className: "mt-3 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/85 transition-colors hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50", children: "Apply JSON to selected branch" }),
        branchStatus && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-white/55", children: branchStatus })
      ] }) })
    ] }) })
  ] });
}
export {
  ChecklistPage as component
};
