import { useState, type CSSProperties } from "react";
import { Check, Copy, Crosshair } from "lucide-react";
import type { ChecklistStep } from "@/types/checklist";
import { isStepChecked, toggleStepCompleted } from "@/lib/checklist-utils";

interface ChecklistViewerProps {
  steps: ChecklistStep[];
  onChange?: (steps: ChecklistStep[]) => void;
  readOnly?: boolean;
  onCopyPrompt?: (step: ChecklistStep, path: string[]) => void;
  onSelectTask?: (step: ChecklistStep, path: string[]) => void;
}

export function ChecklistViewer({
  steps,
  onChange,
  readOnly = false,
  onCopyPrompt,
  onSelectTask,
}: ChecklistViewerProps) {
  if (steps.length === 0) {
    return <p className="py-8 text-center text-sm text-white/40">No items yet.</p>;
  }

  const toggle = (stepId: string) => {
    if (readOnly || !onChange) return;
    onChange(toggleStepCompleted(steps, stepId));
  };

  return (
    <ul className="divide-y divide-white/5">
      {steps.map((step) => (
        <ChecklistItem
          key={step.id}
          step={step}
          depth={0}
          ancestry={[]}
          readOnly={readOnly}
          onToggle={toggle}
          onCopyPrompt={onCopyPrompt}
          onSelectTask={onSelectTask}
        />
      ))}
    </ul>
  );
}

interface ChecklistItemProps {
  step: ChecklistStep;
  depth: number;
  ancestry: string[];
  readOnly: boolean;
  onToggle: (stepId: string) => void;
  onCopyPrompt?: (step: ChecklistStep, path: string[]) => void;
  onSelectTask?: (step: ChecklistStep, path: string[]) => void;
}

function ChecklistItem({
  step,
  depth,
  ancestry,
  readOnly,
  onToggle,
  onCopyPrompt,
  onSelectTask,
}: ChecklistItemProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = step.children.length > 0;
  const checked = readOnly ? false : isStepChecked(step);
  const pad = { paddingLeft: `${depth * 16 + 12}px`, paddingRight: 12 };
  const currentPath = [...ancestry, step.title];

  if (!hasChildren) {
    return (
      <li>
        <ChecklistRow
          style={pad}
          step={step}
          path={currentPath}
          title={step.title}
          notes={step.notes}
          checked={checked}
          readOnly={readOnly}
          onCheck={() => onToggle(step.id)}
          onCopyPrompt={onCopyPrompt}
          onSelectTask={onSelectTask}
        />
      </li>
    );
  }

  return (
    <li>
      <div
        className="group flex items-start gap-3 py-3 transition-colors hover:bg-white/2"
        style={pad}
      >
        <ChecklistCheckbox
          checked={checked}
          readOnly={readOnly}
          onClick={() => onToggle(step.id)}
        />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="min-w-0 flex-1 text-left"
        >
          <span className={`text-sm ${checked ? "text-white/40 line-through" : "text-white/90"}`}>
            {step.title}
          </span>
          {step.notes && (
            <span className="mt-1 block whitespace-pre-wrap text-xs text-white/35">
              {step.notes}
            </span>
          )}
        </button>

        {onCopyPrompt && (
          <button
            type="button"
            onClick={() => onCopyPrompt(step, currentPath)}
            className="mt-0.5 shrink-0 rounded border border-white/10 p-1.5 text-white/45 opacity-0 transition-all hover:border-white/20 hover:text-white/80 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
            aria-label="Copy task prompt"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        )}
        {onSelectTask && (
          <button
            type="button"
            onClick={() => onSelectTask(step, currentPath)}
            className="mt-0.5 shrink-0 rounded border border-white/10 p-1.5 text-white/45 opacity-0 transition-all hover:border-white/20 hover:text-white/80 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
            aria-label="Select task for branch expansion"
          >
            <Crosshair className="h-3.5 w-3.5" />
          </button>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Collapse sub-tasks" : "Expand sub-tasks"}
          className="mt-0.5 shrink-0 px-1 text-xs text-white/30 hover:text-white/60"
        >
          {open ? "−" : "+"}
        </button>
      </div>

      {open && (
        <ul className="divide-y divide-white/5 border-t border-white/5">
          {step.children.map((child) => (
            <ChecklistItem
              key={child.id}
              step={child}
              depth={depth + 1}
              ancestry={currentPath}
              readOnly={readOnly}
              onToggle={onToggle}
              onCopyPrompt={onCopyPrompt}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function ChecklistCheckbox({
  checked,
  readOnly,
  onClick,
}: {
  checked: boolean;
  readOnly: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={readOnly ? undefined : onClick}
      disabled={readOnly}
      aria-label={checked ? "Completed" : "Not completed"}
      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
        readOnly
          ? "cursor-default border-white/15 bg-transparent"
          : checked
            ? "border-accent bg-accent text-white"
            : "border-white/25 bg-transparent hover:border-white/40"
      }`}
    >
      {!readOnly && checked && <Check size={10} strokeWidth={3} />}
    </button>
  );
}

function ChecklistRow({
  style,
  step,
  path,
  title,
  notes,
  checked,
  readOnly,
  onCheck,
  onCopyPrompt,
  onSelectTask,
}: {
  style: CSSProperties;
  step: ChecklistStep;
  path: string[];
  title: string;
  notes?: string;
  checked: boolean;
  readOnly: boolean;
  onCheck: () => void;
  onCopyPrompt?: (step: ChecklistStep, path: string[]) => void;
  onSelectTask?: (step: ChecklistStep, path: string[]) => void;
}) {
  return (
    <div
      className="group flex items-start gap-3 py-3 transition-colors hover:bg-white/2"
      style={style}
    >
      <ChecklistCheckbox checked={checked} readOnly={readOnly} onClick={onCheck} />
      <span className="min-w-0 flex-1">
        <span className={`text-sm ${checked ? "text-white/40 line-through" : "text-white/90"}`}>
          {title}
        </span>
        {notes && (
          <span className="mt-1 block whitespace-pre-wrap text-xs text-white/35">{notes}</span>
        )}
      </span>
      {onCopyPrompt && (
        <button
          type="button"
          onClick={() => onCopyPrompt(step, path)}
          className="mt-0.5 shrink-0 rounded border border-white/10 p-1.5 text-white/45 opacity-0 transition-all hover:border-white/20 hover:text-white/80 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
          aria-label="Copy task prompt"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      )}
      {onSelectTask && (
        <button
          type="button"
          onClick={() => onSelectTask(step, path)}
          className="mt-0.5 shrink-0 rounded border border-white/10 p-1.5 text-white/45 opacity-0 transition-all hover:border-white/20 hover:text-white/80 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
          aria-label="Select task for branch expansion"
        >
          <Crosshair className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
