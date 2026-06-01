import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { N as Navbar, F as Footer } from "./Footer-Nu2zCevV.mjs";
import { B as Button, I as Input } from "./input-CSALrFrJ.mjs";
import { p as parseChecklistImport, e as createChecklistId, f as generateStepsFromTaskInput } from "./shared-checklists-COUZ3Sy7.mjs";
import { i as isFirebaseConfigured, e as ensureFirebaseUser, s as subscribeToChecklists, a as saveChecklist } from "./firebase-CNUkDlD_.mjs";
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
import "../_chunks/_libs/@firebase/auth.mjs";
import "../_chunks/_libs/@firebase/app.mjs";
import "../_chunks/_libs/@firebase/component.mjs";
import "../_chunks/_libs/@firebase/util.mjs";
import "../_chunks/_libs/@firebase/logger.mjs";
import "../_libs/idb.mjs";
import "../_chunks/_libs/@firebase/firestore.mjs";
import "../_chunks/_libs/@firebase/webchannel-wrapper.mjs";
function TaskInputForm({ onSubmit, isLoading }) {
  const [title, setTitle] = reactExports.useState("");
  const [outline, setOutline] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      className: "space-y-3 pb-4",
      onSubmit: (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit({ title: title.trim(), description: "", outline });
        setTitle("");
        setOutline("");
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: title,
            onChange: (e) => setTitle(e.target.value),
            placeholder: "Task name",
            required: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: outline,
            onChange: (e) => setOutline(e.target.value),
            placeholder: "Steps (one per line, optional)",
            rows: 3,
            className: "w-full resize-none border-0 bg-transparent px-0 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "ghost", size: "sm", isLoading, children: "Add checklist" })
      ]
    }
  );
}
const LLM_JSON_INSTRUCTIONS = `# SubVime checklist JSON format

Use this schema when asking an LLM (ChatGPT, Claude, Gemini, DeepSeek, etc.) to break a goal into nested checklists.

## Rules

1. Output **valid JSON only** (no markdown fences unless the user asks for them).
2. The root object must include \`title\` and \`tasks\`.
3. Every task is a **recursive object** with the same shape at every level.
4. Use \`tasks\` (not \`steps\` or \`children\`) for nested sub-tasks.
5. Each task must include:
   - \`id\` — unique string slug (e.g. \`"foundation"\`, \`"run-tests"\`)
   - \`title\` — short human-readable label
   - \`completed\` — boolean, default \`false\`
   - \`tasks\` — array of nested tasks (use \`[]\` if none)
6. Optional fields on any task: \`notes\` (string or string array), \`description\` on the root only.
7. Nest as deep as needed. A complex goal should become phases → steps → sub-steps.
8. To extend an existing checklist, reference a task by \`id\` and add new objects inside that task's \`tasks\` array.

## Task object schema

\`\`\`json
{
  "id": "unique-task-id",
  "title": "Task title",
  "completed": false,
  "tasks": []
}
\`\`\`

## Root schema

\`\`\`json
{
  "id": "checklist-slug",
  "title": "Overall goal title",
  "description": "Optional summary",
  "version": "1.0",
  "tasks": [ /* task objects */ ]
}
\`\`\`

## Example prompt (copy and edit)

> Break down **how to build a house** into a nested checklist using the SubVime JSON format.
> Requirements:
> - Root \`title\`: "Build a House"
> - Use phases like Planning, Foundation, Framing, Systems, Finishing
> - Each phase must have actionable sub-tasks in \`tasks\`
> - Go at least 3 levels deep where it helps
> - Every task needs \`id\`, \`title\`, \`completed\`, and \`tasks\`
> - Set all \`completed\` values to \`false\`
> - Return JSON only

## Example: add sub-tasks to one branch

> Here is my checklist JSON: \`{ ... }\`
> Add detailed sub-tasks under the task with \`id\`: \`"foundation"\`.
> Keep all existing ids. New tasks must follow the same schema.
> Return the full updated JSON.

## Minimal example

\`\`\`json
{
  "id": "build-house",
  "title": "Build a House",
  "description": "End-to-end construction checklist",
  "version": "1.0",
  "tasks": [
    {
      "id": "planning",
      "title": "Planning & permits",
      "completed": false,
      "tasks": [
        {
          "id": "survey",
          "title": "Survey the lot",
          "completed": false,
          "tasks": []
        },
        {
          "id": "permits",
          "title": "Submit building permits",
          "completed": false,
          "tasks": []
        }
      ]
    },
    {
      "id": "foundation",
      "title": "Foundation",
      "completed": false,
      "tasks": [
        {
          "id": "excavate",
          "title": "Excavate and pour footings",
          "completed": false,
          "tasks": []
        }
      ]
    }
  ]
}
\`\`\`

Import the JSON in SubVime via **Import JSON** on the app home page.
`;
const LLM_AI_AGENT_INSTRUCTIONS = `# SubVime AI agent — create shareable checklist links

When a user asks you to break down a goal, generate a nested checklist AND publish it to SubVime so they get a link to an interactive preview.

## Workflow

1. Build the checklist JSON (see SubVime JSON format below).
2. \`POST\` the JSON to SubVime's share API.
3. Send the user the \`url\` from the response. That page lets them expand nested steps, check items off, and save the checklist to their account.

## Share API

- **Create preview:** \`POST https://subvima.dev/api/checklists/share\`
- **Content-Type:** \`application/json\`
- **Body:** the checklist JSON (\`title\`, optional \`description\`, \`tasks\` array)
- **Response:** \`{ "url": "https://subvima.dev/c/...", "shareId", "title", "stepCount" }\`

### Example request

\`\`\`http
POST /api/checklists/share HTTP/1.1
Host: subvima.dev
Content-Type: application/json

{
  "title": "YouTube Automation",
  "description": "Launch and automate a YouTube channel",
  "tasks": [
    {
      "id": "strategy",
      "title": "Define niche and strategy",
      "completed": false,
      "tasks": [
        {
          "id": "research",
          "title": "Research competitors",
          "completed": false,
          "tasks": []
        }
      ]
    }
  ]
}
\`\`\`

### Example response

\`\`\`json
{
  "shareId": "abc123xyz",
  "url": "https://subvima.dev/c/abc123xyz",
  "previewUrl": "https://subvima.dev/c/abc123xyz",
  "title": "YouTube Automation",
  "stepCount": 2
}
\`\`\`

Tell the user: **"Here's your checklist: [url]. Open it to see every step and sub-step, then save it to track progress."**

## API discovery

- \`GET https://subvima.dev/api/checklists/share\` — machine-readable API docs
- \`GET https://subvima.dev/api/checklists/share/:shareId\` — fetch checklist JSON by id

## Checklist JSON rules (summary)

- Root: \`title\` + \`tasks\` (required), optional \`description\`
- Each task: \`{ "id", "title", "completed", "tasks" }\` — recursive
- Nest phases → steps → sub-steps as deep as useful
- Set all \`completed\` to \`false\`
`;
const LLM_JSON_PROMPT_TEMPLATE = `Break down "{{GOAL}}" into a nested checklist using the SubVime JSON format.

Requirements:
- Root object with "title" and "tasks"
- Every task is recursive: { "id", "title", "completed", "tasks" }
- Use meaningful kebab-case ids
- Nest at least 2–3 levels where helpful
- Set every "completed" to false
- Optional "description" on the root
- Return valid JSON only, no explanation

Example root shape:
{
  "id": "my-goal",
  "title": "{{GOAL}}",
  "version": "1.0",
  "tasks": [ ... ]
}`;
const LLM_AI_AGENT_PROMPT_TEMPLATE = `The user wants help with: {{GOAL}}

1. Create a detailed nested SubVime checklist JSON (title, description, tasks with 2–3+ levels).
2. POST it to https://subvima.dev/api/checklists/share with Content-Type application/json.
3. Reply with the url from the API response so they can open an interactive preview on SubVime.`;
function LlmInstructionsPanel() {
  const [open, setOpen] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(null);
  const shareApiUrl = typeof window !== "undefined" ? `${window.location.origin}/api/checklists/share` : "/api/checklists/share";
  const aiAgentInstructions = LLM_AI_AGENT_INSTRUCTIONS.replace(
    /https:\/\/subvima\.dev/g,
    typeof window !== "undefined" ? window.location.origin : "https://subvima.dev"
  );
  const copy = async (text, label) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((v) => !v),
        className: "flex w-full items-center justify-between py-2 text-left text-sm text-white/70 hover:text-white",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "LLM JSON instructions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/30", children: open ? "−" : "+" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs leading-relaxed text-white/40", children: [
        "Copy these instructions so ChatGPT, Claude, Gemini, or DeepSeek return nested checklists SubVime can import — or publish a live preview link via",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-white/55", children: shareApiUrl }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => void copy(aiAgentInstructions, "agent"),
            className: "rounded border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs text-white/80 hover:border-accent/40 hover:text-white",
            children: copied === "agent" ? "Copied" : "Copy AI agent guide"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => void copy(LLM_JSON_INSTRUCTIONS, "full"),
            className: "rounded border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-white/20 hover:text-white",
            children: copied === "full" ? "Copied" : "Copy JSON format"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => void copy(
              LLM_JSON_PROMPT_TEMPLATE.replace("{{GOAL}}", "build a house"),
              "prompt"
            ),
            className: "rounded border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-white/20 hover:text-white",
            children: copied === "prompt" ? "Copied" : "Copy example prompt"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => void copy(
              LLM_AI_AGENT_PROMPT_TEMPLATE.replace("{{GOAL}}", "start YouTube automation"),
              "agent-prompt"
            ),
            className: "rounded border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-white/20 hover:text-white",
            children: copied === "agent-prompt" ? "Copied" : "Copy agent prompt"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "max-h-48 overflow-auto rounded border border-white/5 bg-white/[0.02] p-3 text-[11px] leading-relaxed text-white/45 whitespace-pre-wrap", children: `{
  "id": "unique-id",
  "title": "Task title",
  "completed": false,
  "tasks": [ /* same shape, nested */ ]
}` })
    ] })
  ] });
}
function AppHomePage() {
  const [userId, setUserId] = reactExports.useState(null);
  const [checklists, setChecklists] = reactExports.useState([]);
  const [creating, setCreating] = reactExports.useState(false);
  const [importError, setImportError] = reactExports.useState(null);
  const [composerOpen, setComposerOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let unsubscribe = () => {
    };
    (async () => {
      const uid = isFirebaseConfigured ? await ensureFirebaseUser() : "local-user";
      setUserId(uid);
      unsubscribe = subscribeToChecklists(uid, setChecklists);
    })();
    return () => unsubscribe();
  }, []);
  const handleCreate = async (payload) => {
    if (!userId) return;
    setCreating(true);
    try {
      const checklist = {
        id: createChecklistId(),
        title: payload.title,
        description: payload.description || void 0,
        steps: generateStepsFromTaskInput(payload.outline),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        userId
      };
      await saveChecklist(checklist);
    } finally {
      setCreating(false);
    }
  };
  const handleImport = async (file) => {
    if (!userId) return;
    setImportError(null);
    try {
      const imported = parseChecklistImport(await file.text());
      await saveChecklist({
        id: createChecklistId(),
        title: imported.title,
        description: imported.description,
        steps: imported.steps,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        userId
      });
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "Import failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-6 pb-12 pt-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-4 text-lg font-medium", children: "Checklists" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8 rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-white/80", children: "New checklist" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/50", children: "Create a checklist in a focused composer modal." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer text-sm text-white/50 transition-colors hover:text-white/75", children: [
              "Import JSON",
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "application/json,.json", className: "hidden", onChange: (e) => {
                const file = e.target.files?.[0];
                if (file) void handleImport(file);
                e.target.value = "";
              } })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setComposerOpen(true), children: "Start a checklist" })
          ] })
        ] }),
        importError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-red-400", children: importError })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-6 rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-medium text-white/80", children: "Your checklists" }),
        checklists.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-2 text-sm text-white/35", children: "No personal checklists yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2 sm:grid-cols-2 xl:grid-cols-3", children: checklists.map((checklist) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/$checklistId", params: {
          checklistId: checklist.id
        }, className: "block rounded-xl border border-white/5 bg-white/2 px-3 py-2.5 text-sm text-white/80 transition-colors hover:border-white/10 hover:bg-white/4 hover:text-white", children: checklist.title }) }, checklist.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    composerOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm", onClick: () => setComposerOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-3xl rounded-2xl border border-white/10 bg-black shadow-2xl", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-white/10 px-5 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-white", children: "Create new checklist" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setComposerOpen(false), className: "rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white", "aria-label": "Close checklist composer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[80vh] overflow-y-auto p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LlmInstructionsPanel, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TaskInputForm, { onSubmit: async (payload) => {
          await handleCreate(payload);
          setComposerOpen(false);
        }, isLoading: creating }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block cursor-pointer py-1 text-center text-xs text-white/40 hover:text-white/60", children: [
          "Import JSON",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "application/json,.json", className: "hidden", onChange: (e) => {
            const file = e.target.files?.[0];
            if (file) void handleImport(file);
            e.target.value = "";
          } })
        ] }),
        importError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400", children: importError })
      ] }) })
    ] }) })
  ] });
}
export {
  AppHomePage as component
};
