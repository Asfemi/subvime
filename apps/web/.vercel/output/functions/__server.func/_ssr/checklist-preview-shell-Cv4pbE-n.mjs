import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { N as Navbar, F as Footer } from "./Footer-Nu2zCevV.mjs";
import { C as ChecklistViewer } from "./checklist-viewer-CkZPjK-8.mjs";
import { B as Button } from "./input-CSALrFrJ.mjs";
function ChecklistPreviewShell({
  backHref = "/app",
  backLabel = "← Back",
  metaRight,
  badges,
  title,
  description,
  subtitle,
  steps,
  onStepsChange,
  readOnly = false,
  primaryActionLabel,
  onPrimaryAction,
  primaryActionLoading = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-3xl px-6 pb-12 pt-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between text-xs text-white/35", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: backHref, className: "hover:text-white/60", children: backLabel }),
        metaRight
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        badges && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 flex flex-wrap items-center gap-2", children: badges }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-medium text-white", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/45", children: description }),
        subtitle
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 rounded-2xl border border-white/5 bg-white/2 p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ChecklistViewer,
        {
          steps,
          readOnly,
          onChange: onStepsChange
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { fullWidth: true, onClick: () => void onPrimaryAction(), isLoading: primaryActionLoading, children: primaryActionLabel })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ChecklistPreviewShell as C
};
