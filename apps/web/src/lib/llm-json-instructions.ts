export const LLM_JSON_INSTRUCTIONS = `# SubVime checklist JSON format

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

export const LLM_JSON_PROMPT_TEMPLATE = `Break down "{{GOAL}}" into a nested checklist using the SubVime JSON format.

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
