import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { k as isStepChecked, t as toggleStepCompleted } from "./shared-checklists-COUZ3Sy7.mjs";
import { f as Check } from "../_libs/lucide-react.mjs";
function ChecklistViewer({ steps, onChange, readOnly = false }) {
  if (steps.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-white/40", children: "No items yet." });
  }
  const toggle = (stepId) => {
    if (readOnly || !onChange) return;
    onChange(toggleStepCompleted(steps, stepId));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-white/5", children: steps.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    ChecklistItem,
    {
      step,
      depth: 0,
      readOnly,
      onToggle: toggle
    },
    step.id
  )) });
}
function ChecklistItem({ step, depth, readOnly, onToggle }) {
  const [open, setOpen] = reactExports.useState(false);
  const hasChildren = step.children.length > 0;
  const checked = readOnly ? false : isStepChecked(step);
  const pad = { paddingLeft: `${depth * 16 + 12}px`, paddingRight: 12 };
  if (!hasChildren) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChecklistRow,
      {
        style: pad,
        title: step.title,
        notes: step.notes,
        checked,
        readOnly,
        onCheck: () => onToggle(step.id)
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 py-3 transition-colors hover:bg-white/2",
        style: pad,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChecklistCheckbox,
            {
              checked,
              readOnly,
              onClick: () => onToggle(step.id)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setOpen((v) => !v),
              className: "min-w-0 flex-1 text-left",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm ${checked ? "text-white/40 line-through" : "text-white/90"}`, children: step.title }),
                step.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block whitespace-pre-wrap text-xs text-white/35", children: step.notes })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setOpen((v) => !v),
              "aria-label": open ? "Collapse sub-tasks" : "Expand sub-tasks",
              className: "mt-0.5 shrink-0 px-1 text-xs text-white/30 hover:text-white/60",
              children: open ? "−" : "+"
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-white/5 border-t border-white/5", children: step.children.map((child) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChecklistItem,
      {
        step: child,
        depth: depth + 1,
        readOnly,
        onToggle
      },
      child.id
    )) })
  ] });
}
function ChecklistCheckbox({
  checked,
  readOnly,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: readOnly ? void 0 : onClick,
      disabled: readOnly,
      "aria-label": checked ? "Completed" : "Not completed",
      className: `mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${readOnly ? "cursor-default border-white/15 bg-transparent" : checked ? "border-accent bg-accent text-white" : "border-white/25 bg-transparent hover:border-white/40"}`,
      children: !readOnly && checked && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 10, strokeWidth: 3 })
    }
  );
}
function ChecklistRow({
  style,
  title,
  notes,
  checked,
  readOnly,
  onCheck
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-start gap-3 py-3 transition-colors hover:bg-white/2",
      style,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChecklistCheckbox, { checked, readOnly, onClick: onCheck }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm ${checked ? "text-white/40 line-through" : "text-white/90"}`, children: title }),
          notes && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block whitespace-pre-wrap text-xs text-white/35", children: notes })
        ] })
      ]
    }
  );
}
export {
  ChecklistViewer as C
};
