const e=`# SubVime checklist JSON format

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
`,t=`# SubVime AI agent — create shareable checklist links

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
`,s=`Break down "{{GOAL}}" into a nested checklist using the SubVime JSON format.

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
}`,a=`The user wants help with: {{GOAL}}

1. Create a detailed nested SubVime checklist JSON (title, description, tasks with 2–3+ levels).
2. POST it to https://subvima.dev/api/checklists/share with Content-Type application/json.
3. Reply with the url from the API response so they can open an interactive preview on SubVime.`;export{t as L,e as a,s as b,a as c};
