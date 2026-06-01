import{j as e,r as c,F as N,c as y,f as k,L as w,u as j,a as S,g as C,b,p as T}from"./index-BKCU_6Np.js";import{N as O,F as I}from"./Footer-t2HsajMP.js";import{I as A,B as E}from"./input-Bz9a7fgn.js";import{B as L}from"./badge-zeGvcrKZ.js";import{A as P}from"./arrow-right-B3riuN1Q.js";import{i as J,e as R,s as F,a as m}from"./firebase-CX-Wjuoo.js";function U({children:r,padding:i=!0,className:t="",...n}){return e.jsx("div",{className:`bg-white/2 border border-white/5 rounded-2xl overflow-hidden ${t}`,...n,children:i?e.jsx("div",{className:"p-6",children:r}):r})}function G({icon:r,iconClassName:i="bg-blue-500/10 text-blue-400",title:t,description:n,action:l,className:d="",...o}){return e.jsx("div",{className:`p-4 sm:p-6 border-b border-white/5 ${d}`,...o,children:e.jsxs("div",{className:"flex items-start sm:items-center justify-between gap-4",children:[e.jsxs("div",{className:"flex items-center gap-3 min-w-0",children:[r&&e.jsx("div",{className:`p-2 rounded-lg shrink-0 ${i}`,children:r}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("h3",{className:"text-base sm:text-lg font-medium text-white",children:t}),n&&e.jsx("p",{className:"text-xs sm:text-sm text-gray-500",children:n})]})]}),l&&e.jsx("div",{className:"shrink-0",children:l})]})})}function _({children:r,className:i="",...t}){return e.jsx("div",{className:`p-6 ${i}`,...t,children:r})}function M({onSubmit:r,isLoading:i}){const[t,n]=c.useState(""),[l,d]=c.useState("");return e.jsxs("form",{className:"space-y-3 border-b border-white/5 pb-4",onSubmit:o=>{o.preventDefault(),t.trim()&&(r({title:t.trim(),description:"",outline:l}),n(""),d(""))},children:[e.jsx(A,{value:t,onChange:o=>n(o.target.value),placeholder:"Task name",required:!0}),e.jsx("textarea",{value:l,onChange:o=>d(o.target.value),placeholder:"Steps (one per line, optional)",rows:3,className:"w-full resize-none border-0 border-b border-white/10 bg-transparent px-0 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/25 focus:outline-none"}),e.jsx(E,{type:"submit",variant:"ghost",size:"sm",isLoading:i,children:"Add checklist"})]})}function V({onUse:r,usingId:i}){return e.jsxs("section",{className:"mb-6",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("h2",{className:"text-sm font-medium text-white",children:"Featured checklists"}),e.jsx("p",{className:"mt-0.5 text-xs text-white/40",children:"Community templates with nested steps — preview or add to yours."})]}),e.jsx("div",{className:"grid gap-3 sm:grid-cols-2",children:N.map(t=>{const n=y(k(t)),l=t.tasks.length;return e.jsxs(U,{padding:!1,className:"flex h-full flex-col",children:[e.jsx(G,{className:"p-3 sm:p-4",title:t.title,description:t.description,iconClassName:"bg-accent/10 text-accent"}),e.jsxs(_,{className:"mt-auto flex flex-col gap-3 border-t border-white/5 p-3 sm:p-4",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx(L,{variant:"accent",size:"sm",children:t.category}),e.jsxs("span",{className:"text-xs text-white/35",children:[l," phases · ",n," steps"]}),e.jsxs("span",{className:"text-xs text-white/30",children:["by ",t.author]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(w,{to:"/app/featured/$featuredId",params:{featuredId:t.id},className:"text-xs text-white/45 hover:text-white/70",children:"Preview"}),e.jsxs("button",{type:"button",disabled:i===t.id,onClick:()=>r(t),className:"ml-auto inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-white disabled:opacity-50",children:[i===t.id?"Adding…":"Use checklist",e.jsx(P,{size:12})]})]})]})]},t.id)})})]})}const B=`# SubVime checklist JSON format

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
`,D=`# SubVime AI agent — create shareable checklist links

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
`,H=`Break down "{{GOAL}}" into a nested checklist using the SubVime JSON format.

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
}`,q=`The user wants help with: {{GOAL}}

1. Create a detailed nested SubVime checklist JSON (title, description, tasks with 2–3+ levels).
2. POST it to https://subvima.dev/api/checklists/share with Content-Type application/json.
3. Reply with the url from the API response so they can open an interactive preview on SubVime.`;function $(){const[r,i]=c.useState(!1),[t,n]=c.useState(null),l=typeof window<"u"?`${window.location.origin}/api/checklists/share`:"/api/checklists/share",d=D.replace(/https:\/\/subvima\.dev/g,typeof window<"u"?window.location.origin:"https://subvima.dev"),o=async(h,p)=>{await navigator.clipboard.writeText(h),n(p),setTimeout(()=>n(null),2e3)};return e.jsxs("div",{className:"border-b border-white/5 pb-4",children:[e.jsxs("button",{type:"button",onClick:()=>i(h=>!h),className:"flex w-full items-center justify-between py-2 text-left text-sm text-white/70 hover:text-white",children:[e.jsx("span",{children:"LLM JSON instructions"}),e.jsx("span",{className:"text-white/30",children:r?"−":"+"})]}),r&&e.jsxs("div",{className:"mt-3 space-y-3",children:[e.jsxs("p",{className:"text-xs leading-relaxed text-white/40",children:["Copy these instructions so ChatGPT, Claude, Gemini, or DeepSeek return nested checklists SubVime can import — or publish a live preview link via"," ",e.jsx("code",{className:"text-white/55",children:l}),"."]}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx("button",{type:"button",onClick:()=>{o(d,"agent")},className:"rounded border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs text-white/80 hover:border-accent/40 hover:text-white",children:t==="agent"?"Copied":"Copy AI agent guide"}),e.jsx("button",{type:"button",onClick:()=>{o(B,"full")},className:"rounded border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-white/20 hover:text-white",children:t==="full"?"Copied":"Copy JSON format"}),e.jsx("button",{type:"button",onClick:()=>{o(H.replace("{{GOAL}}","build a house"),"prompt")},className:"rounded border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-white/20 hover:text-white",children:t==="prompt"?"Copied":"Copy example prompt"}),e.jsx("button",{type:"button",onClick:()=>{o(q.replace("{{GOAL}}","start YouTube automation"),"agent-prompt")},className:"rounded border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-white/20 hover:text-white",children:t==="agent-prompt"?"Copied":"Copy agent prompt"})]}),e.jsx("pre",{className:"max-h-48 overflow-auto rounded border border-white/5 bg-white/[0.02] p-3 text-[11px] leading-relaxed text-white/45 whitespace-pre-wrap",children:`{
  "id": "unique-id",
  "title": "Task title",
  "completed": false,
  "tasks": [ /* same shape, nested */ ]
}`})]})]})}function Z(){const r=j(),[i,t]=c.useState(null),[n,l]=c.useState([]),[d,o]=c.useState(!1),[h,p]=c.useState(null),[u,x]=c.useState(null);c.useEffect(()=>{let s=()=>{};return(async()=>{const a=J?await R():"local-user";t(a),s=F(a,l)})(),()=>s()},[]);const v=async s=>{if(i){o(!0);try{const a={id:b(),title:s.title,description:s.description||void 0,steps:C(s.outline),createdAt:Date.now(),updatedAt:Date.now(),userId:i};await m(a)}finally{o(!1)}}},g=async s=>{if(i){x(null);try{const a=T(await s.text());await m({id:b(),title:a.title,description:a.description,steps:a.steps,createdAt:Date.now(),updatedAt:Date.now(),userId:i})}catch(a){x(a instanceof Error?a.message:"Import failed")}}},f=async s=>{if(i){p(s.id);try{const a=S({title:s.title,description:s.description,steps:k(s)},i);await m(a),r({to:"/app/$checklistId",params:{checklistId:a.id}})}finally{p(null)}}};return e.jsxs("div",{className:"min-h-screen bg-black text-white",children:[e.jsx(O,{}),e.jsxs("main",{className:"mx-auto max-w-6xl px-4 pb-12 pt-20 sm:px-5",children:[e.jsx("h1",{className:"mb-4 text-lg font-medium",children:"Checklists"}),e.jsx(V,{onUse:f,usingId:h}),e.jsxs("div",{className:"mb-6 grid gap-6 border-t border-white/5 pt-6 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"text-sm font-medium text-white/80",children:"New checklist"}),e.jsx($,{}),e.jsx(M,{onSubmit:v,isLoading:d}),e.jsxs("label",{className:"block cursor-pointer py-1 text-center text-xs text-white/40 hover:text-white/60",children:["Import JSON",e.jsx("input",{type:"file",accept:"application/json,.json",className:"hidden",onChange:s=>{const a=s.target.files?.[0];a&&g(a),s.target.value=""}})]}),u&&e.jsx("p",{className:"text-xs text-red-400",children:u})]}),e.jsxs("div",{children:[e.jsx("h2",{className:"mb-3 text-sm font-medium text-white/80",children:"Your checklists"}),n.length===0?e.jsx("p",{className:"py-2 text-sm text-white/35",children:"No personal checklists yet."}):e.jsx("ul",{className:"grid gap-2 sm:grid-cols-2 xl:grid-cols-3",children:n.map(s=>e.jsx("li",{children:e.jsx(w,{to:"/app/$checklistId",params:{checklistId:s.id},className:"block rounded-xl border border-white/5 bg-white/2 px-3 py-2.5 text-sm text-white/80 transition-colors hover:border-white/10 hover:bg-white/4 hover:text-white",children:s.title})},s.id))})]})]})]}),e.jsx(I,{})]})}export{Z as component};
