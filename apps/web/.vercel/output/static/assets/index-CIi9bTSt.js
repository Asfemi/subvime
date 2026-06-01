import{r as o,j as e,L as f,p as v,a as x,g}from"./index-DNWdbUgz.js";import{N as y,F as N,X as j}from"./Footer-B1UFPnG1.js";import{I as S,B as k}from"./input-3q8c14nr.js";import{i as C,e as O,s as T,a as b}from"./firebase-CX-Wjuoo.js";function I({onSubmit:n,isLoading:h}){const[i,r]=o.useState(""),[c,l]=o.useState("");return e.jsxs("form",{className:"space-y-3 pb-4",onSubmit:a=>{a.preventDefault(),i.trim()&&(n({title:i.trim(),description:"",outline:c}),r(""),l(""))},children:[e.jsx(S,{value:i,onChange:a=>r(a.target.value),placeholder:"Task name",required:!0}),e.jsx("textarea",{value:c,onChange:a=>l(a.target.value),placeholder:"Steps (one per line, optional)",rows:3,className:"w-full resize-none border-0 bg-transparent px-0 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none"}),e.jsx(k,{type:"submit",variant:"ghost",size:"sm",isLoading:h,children:"Add checklist"})]})}const A=`# SubVime checklist JSON format

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
`,E=`# SubVime AI agent — create shareable checklist links

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
`,L=`Break down "{{GOAL}}" into a nested checklist using the SubVime JSON format.

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
}`,J=`The user wants help with: {{GOAL}}

1. Create a detailed nested SubVime checklist JSON (title, description, tasks with 2–3+ levels).
2. POST it to https://subvima.dev/api/checklists/share with Content-Type application/json.
3. Reply with the url from the API response so they can open an interactive preview on SubVime.`;function P(){const[n,h]=o.useState(!1),[i,r]=o.useState(null),c=typeof window<"u"?`${window.location.origin}/api/checklists/share`:"/api/checklists/share",l=E.replace(/https:\/\/subvima\.dev/g,typeof window<"u"?window.location.origin:"https://subvima.dev"),a=async(d,u)=>{await navigator.clipboard.writeText(d),r(u),setTimeout(()=>r(null),2e3)};return e.jsxs("div",{className:"pb-4",children:[e.jsxs("button",{type:"button",onClick:()=>h(d=>!d),className:"flex w-full items-center justify-between py-2 text-left text-sm text-white/70 hover:text-white",children:[e.jsx("span",{children:"LLM JSON instructions"}),e.jsx("span",{className:"text-white/30",children:n?"−":"+"})]}),n&&e.jsxs("div",{className:"mt-3 space-y-3",children:[e.jsxs("p",{className:"text-xs leading-relaxed text-white/40",children:["Copy these instructions so ChatGPT, Claude, Gemini, or DeepSeek return nested checklists SubVime can import — or publish a live preview link via"," ",e.jsx("code",{className:"text-white/55",children:c}),"."]}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx("button",{type:"button",onClick:()=>{a(l,"agent")},className:"rounded border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs text-white/80 hover:border-accent/40 hover:text-white",children:i==="agent"?"Copied":"Copy AI agent guide"}),e.jsx("button",{type:"button",onClick:()=>{a(A,"full")},className:"rounded border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-white/20 hover:text-white",children:i==="full"?"Copied":"Copy JSON format"}),e.jsx("button",{type:"button",onClick:()=>{a(L.replace("{{GOAL}}","build a house"),"prompt")},className:"rounded border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-white/20 hover:text-white",children:i==="prompt"?"Copied":"Copy example prompt"}),e.jsx("button",{type:"button",onClick:()=>{a(J.replace("{{GOAL}}","start YouTube automation"),"agent-prompt")},className:"rounded border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-white/20 hover:text-white",children:i==="agent-prompt"?"Copied":"Copy agent prompt"})]}),e.jsx("pre",{className:"max-h-48 overflow-auto rounded border border-white/5 bg-white/[0.02] p-3 text-[11px] leading-relaxed text-white/45 whitespace-pre-wrap",children:`{
  "id": "unique-id",
  "title": "Task title",
  "completed": false,
  "tasks": [ /* same shape, nested */ ]
}`})]})]})}function V(){const[n,h]=o.useState(null),[i,r]=o.useState([]),[c,l]=o.useState(!1),[a,d]=o.useState(null),[u,p]=o.useState(!1);o.useEffect(()=>{let t=()=>{};return(async()=>{const s=C?await O():"local-user";h(s),t=T(s,r)})(),()=>t()},[]);const w=async t=>{if(n){l(!0);try{const s={id:x(),title:t.title,description:t.description||void 0,steps:g(t.outline),createdAt:Date.now(),updatedAt:Date.now(),userId:n};await b(s)}finally{l(!1)}}},m=async t=>{if(n){d(null);try{const s=v(await t.text());await b({id:x(),title:s.title,description:s.description,steps:s.steps,createdAt:Date.now(),updatedAt:Date.now(),userId:n})}catch(s){d(s instanceof Error?s.message:"Import failed")}}};return e.jsxs("div",{className:"min-h-screen bg-black text-white",children:[e.jsx(y,{}),e.jsxs("main",{className:"mx-auto max-w-7xl px-6 pb-12 pt-20",children:[e.jsx("h1",{className:"mb-4 text-lg font-medium",children:"Checklists"}),e.jsxs("section",{className:"mb-8 rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5",children:[e.jsxs("div",{className:"flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-sm font-medium text-white/80",children:"New checklist"}),e.jsx("p",{className:"mt-1 text-sm text-white/50",children:"Create a checklist in a focused composer modal."})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("label",{className:"cursor-pointer text-sm text-white/50 transition-colors hover:text-white/75",children:["Import JSON",e.jsx("input",{type:"file",accept:"application/json,.json",className:"hidden",onChange:t=>{const s=t.target.files?.[0];s&&m(s),t.target.value=""}})]}),e.jsx(k,{onClick:()=>p(!0),children:"Start a checklist"})]})]}),a&&e.jsx("p",{className:"mt-3 text-xs text-red-400",children:a})]}),e.jsxs("section",{className:"mb-6 rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5",children:[e.jsx("h2",{className:"mb-3 text-sm font-medium text-white/80",children:"Your checklists"}),i.length===0?e.jsx("p",{className:"py-2 text-sm text-white/35",children:"No personal checklists yet."}):e.jsx("ul",{className:"grid gap-2 sm:grid-cols-2 xl:grid-cols-3",children:i.map(t=>e.jsx("li",{children:e.jsx(f,{to:"/app/$checklistId",params:{checklistId:t.id},className:"block rounded-xl border border-white/5 bg-white/2 px-3 py-2.5 text-sm text-white/80 transition-colors hover:border-white/10 hover:bg-white/4 hover:text-white",children:t.title})},t.id))})]})]}),e.jsx(N,{}),u&&e.jsx("div",{className:"fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm",onClick:()=>p(!1),children:e.jsxs("div",{className:"w-full max-w-3xl rounded-2xl border border-white/10 bg-black shadow-2xl",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-white/10 px-5 py-4",children:[e.jsx("h2",{className:"text-base font-semibold text-white",children:"Create new checklist"}),e.jsx("button",{type:"button",onClick:()=>p(!1),className:"rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white","aria-label":"Close checklist composer",children:e.jsx(j,{className:"h-5 w-5"})})]}),e.jsx("div",{className:"max-h-[80vh] overflow-y-auto p-5",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(P,{}),e.jsx(I,{onSubmit:async t=>{await w(t),p(!1)},isLoading:c}),e.jsxs("label",{className:"block cursor-pointer py-1 text-center text-xs text-white/40 hover:text-white/60",children:["Import JSON",e.jsx("input",{type:"file",accept:"application/json,.json",className:"hidden",onChange:t=>{const s=t.target.files?.[0];s&&m(s),t.target.value=""}})]}),a&&e.jsx("p",{className:"text-xs text-red-400",children:a})]})})]})})]})}export{V as component};
