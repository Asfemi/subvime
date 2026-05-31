import { useState } from "react";
import { Check } from "lucide-react";
import type { ChecklistStep } from "@/types/checklist";
import { getStepProgress, toggleStepCompleted } from "@/lib/checklist-utils";

interface ChecklistViewerProps {
  steps: ChecklistStep[];
  onChange: (steps: ChecklistStep[]) => void;
}

export function ChecklistViewer({ steps, onChange }: ChecklistViewerProps) {
  if (steps.length === 0) {
    return <p className="py-8 text-center text-sm text-white/40">No items yet.</p>;
  }

  return (
    <ul className="divide-y divide-white/5">
      {steps.map((step) => (
        <ChecklistItem
          key={step.id}
          step={step}
          depth={0}
          onToggle={(stepId) => onChange(toggleStepCompleted(steps, stepId))}
        />
      ))}
    </ul>
  );
}

interface ChecklistItemProps {
  step: ChecklistStep;
  depth: number;
  onToggle: (stepId: string) => void;
}

function ChecklistItem({ step, depth, onToggle }: ChecklistItemProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = step.children.length > 0;
  const progress = getStepProgress(step);
  const allDone = hasChildren && progress.completed === progress.total;

  if (!hasChildren) {
    return (
      <li>
        <ChecklistRow
          depth={depth}
          title={step.title}
          notes={step.notes}
          checked={!!step.completed}
          onCheck={() => onToggle(step.id)}
        />
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 py-3 text-left transition-colors hover:bg-white/[0.02]"
        style={{ paddingLeft: `${depth * 16 + 12}px`, paddingRight: 12 }}
      >
        <span
          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
            allDone
              ? "border-accent bg-accent text-white"
              : "border-white/25 bg-transparent"
          }`}
        >
          {allDone && <Check size={10} strokeWidth={3} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className={`text-sm ${allDone ? "text-white/40 line-through" : "text-white/90"}`}>
            {step.title}
          </span>
          {step.notes && (
            <span className="mt-1 block whitespace-pre-wrap text-xs text-white/35">
              {step.notes}
            </span>
          )}
        </span>
        <span className="mt-0.5 shrink-0 text-xs text-white/30">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <ul className="divide-y divide-white/5 border-t border-white/5">
          {step.children.map((child) => (
            <ChecklistItem
              key={child.id}
              step={child}
              depth={depth + 1}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function ChecklistRow({
  depth,
  title,
  notes,
  checked,
  onCheck,
}: {
  depth: number;
  title: string;
  notes?: string;
  checked: boolean;
  onCheck: () => void;
}) {
  return (
    <label
      className="flex cursor-pointer items-start gap-3 py-3 transition-colors hover:bg-white/[0.02]"
      style={{ paddingLeft: `${depth * 16 + 12}px`, paddingRight: 12 }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onCheck();
        }}
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
          checked
            ? "border-accent bg-accent text-white"
            : "border-white/25 bg-transparent hover:border-white/40"
        }`}
      >
        {checked && <Check size={10} strokeWidth={3} />}
      </button>
      <span className="min-w-0 flex-1">
        <span className={`text-sm ${checked ? "text-white/40 line-through" : "text-white/90"}`}>
          {title}
        </span>
        {notes && (
          <span className="mt-1 block whitespace-pre-wrap text-xs text-white/35">{notes}</span>
        )}
      </span>
    </label>
  );
}
