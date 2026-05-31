import { createFileRoute } from "@tanstack/react-router";
import { getSharedChecklist } from "@/lib/shared-checklists";
import { countChecklistSteps } from "@/lib/checklist-utils";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

export const Route = createFileRoute("/api/checklists/share/$shareId")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: corsHeaders,
        }),

      GET: async ({ params }) => {
        const record = await getSharedChecklist(params.shareId);

        if (!record) {
          return Response.json(
            { error: "Shared checklist not found or expired." },
            {
              status: 404,
              headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
              },
            },
          );
        }

        return Response.json(
          {
            shareId: record.id,
            title: record.title,
            description: record.description,
            stepCount: countChecklistSteps(record.steps),
            createdAt: new Date(record.createdAt).toISOString(),
            tasks: record.steps.map(toLlmTask),
          },
          {
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          },
        );
      },
    },
  },
});

function toLlmTask(step: {
  id: string;
  title: string;
  completed?: boolean;
  notes?: string;
  children: Parameters<typeof toLlmTask>[0][];
}): Record<string, unknown> {
  return {
    id: step.id,
    title: step.title,
    completed: !!step.completed,
    ...(step.notes ? { notes: step.notes } : {}),
    tasks: step.children.map(toLlmTask),
  };
}
