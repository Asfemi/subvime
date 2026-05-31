import { useState } from "react";
import { LLM_JSON_INSTRUCTIONS, LLM_JSON_PROMPT_TEMPLATE } from "@/lib/llm-json-instructions";

export function LlmInstructionsPanel() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="border-b border-white/5 pb-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-2 text-left text-sm text-white/70 hover:text-white"
      >
        <span>LLM JSON instructions</span>
        <span className="text-white/30">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          <p className="text-xs leading-relaxed text-white/40">
            Copy these instructions so ChatGPT, Claude, Gemini, or DeepSeek return nested
            checklists SubVime can import. Each task uses{" "}
            <code className="text-white/55">id</code>, <code className="text-white/55">title</code>,{" "}
            <code className="text-white/55">completed</code>, and recursive{" "}
            <code className="text-white/55">tasks</code>.
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void copy(LLM_JSON_INSTRUCTIONS, "full")}
              className="rounded border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-white/20 hover:text-white"
            >
              {copied === "full" ? "Copied" : "Copy full guide"}
            </button>
            <button
              type="button"
              onClick={() =>
                void copy(
                  LLM_JSON_PROMPT_TEMPLATE.replace("{{GOAL}}", "build a house"),
                  "prompt",
                )
              }
              className="rounded border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-white/20 hover:text-white"
            >
              {copied === "prompt" ? "Copied" : "Copy example prompt"}
            </button>
          </div>

          <pre className="max-h-48 overflow-auto rounded border border-white/5 bg-white/[0.02] p-3 text-[11px] leading-relaxed text-white/45 whitespace-pre-wrap">
            {`{
  "id": "unique-id",
  "title": "Task title",
  "completed": false,
  "tasks": [ /* same shape, nested */ ]
}`}
          </pre>
        </div>
      )}
    </div>
  );
}
