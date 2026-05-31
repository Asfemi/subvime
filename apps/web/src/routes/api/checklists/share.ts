import { createFileRoute } from "@tanstack/react-router";
import { getAppBaseUrl } from "@/lib/app-url";
import {
  buildShareUrl,
  createSharedChecklistFromRequestBody,
} from "@/lib/shared-checklists";
import {
  createRateLimitResponse,
  getClientIdentifier,
  rateLimiters,
} from "@/lib/rate-limiter";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const Route = createFileRoute("/api/checklists/share")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: corsHeaders,
        }),

      POST: async ({ request }) => {
        try {
          const clientId = getClientIdentifier(request);
          const rateLimitResult = await rateLimiters.checklistShare(clientId);
          if (!rateLimitResult.allowed) {
            return createRateLimitResponse(rateLimitResult);
          }

          const body = await request.text();
          const { record, stepCount } = await createSharedChecklistFromRequestBody(body);
          const url = buildShareUrl(record.id);

          return Response.json(
            {
              shareId: record.id,
              url,
              previewUrl: url,
              title: record.title,
              description: record.description,
              stepCount,
              createdAt: new Date(record.createdAt).toISOString(),
              instructions:
                "Share this URL with the user. They can preview the nested checklist and save it to their SubVime account.",
            },
            {
              headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
              },
            },
          );
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Failed to create shared checklist";
          const status = message.includes("Invalid") || message.includes("must") ? 400 : 500;

          return Response.json(
            { error: message },
            {
              status,
              headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
              },
            },
          );
        }
      },

      GET: async () =>
        Response.json(
          {
            name: "SubVime Checklist Share API",
            baseUrl: getAppBaseUrl(),
            endpoints: {
              create: {
                method: "POST",
                path: "/api/checklists/share",
                description:
                  "Create a shareable checklist preview from nested JSON. Returns a public URL.",
                body: {
                  title: "string (required)",
                  description: "string (optional)",
                  tasks: "array of recursive task objects (required)",
                },
                taskShape: {
                  id: "string",
                  title: "string",
                  completed: "boolean",
                  tasks: "array",
                },
                response: {
                  shareId: "string",
                  url: "string — send this link to the user",
                  previewUrl: "string",
                  title: "string",
                  stepCount: "number",
                },
              },
              get: {
                method: "GET",
                path: "/api/checklists/share/:shareId",
              },
              preview: {
                method: "GET",
                path: "/c/:shareId",
                description: "Human-readable interactive checklist preview",
              },
            },
          },
          {
            headers: {
              ...corsHeaders,
              "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
              "Content-Type": "application/json",
            },
          },
        ),
    },
  },
});
