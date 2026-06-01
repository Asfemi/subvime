import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, O as Outlet, S as Scripts } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./index.mjs";
import { a as getAppBaseUrl, c as createSharedChecklistFromRequestBody, b as buildShareUrl, g as getSharedChecklist, d as countChecklistSteps, r as redis, i as importTaskTree } from "./shared-checklists-BBYnUnnc.mjs";
import "../_chunks/_libs/@tanstack/router-core.mjs";
import "../_chunks/_libs/@tanstack/history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_chunks/_libs/react-dom.mjs";
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
import "crypto";
import "async_hooks";
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
const appCss = "/assets/index-CmPu6Imo.css";
const Route$a = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SubVime — Break complex tasks into simple subsets" },
      {
        name: "description",
        content: "Nested checklists for big goals. Import, export, share, and track progress."
      }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] })
});
const $$splitComponentImporter$7 = () => import("./pricing-C5GTDHRK.mjs");
const Route$9 = createFileRoute("/pricing")({
  head: () => ({
    meta: [{
      title: "SubVime — Pricing"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./docs-CpVujQf9.mjs");
const Route$8 = createFileRoute("/docs")({
  head: () => ({
    meta: [{
      title: "SubVime — Docs"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./changelog-BvD4ArwZ.mjs");
const Route$7 = createFileRoute("/changelog")({
  head: () => ({
    meta: [{
      title: "SubVime — Changelog"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-bLMh312N.mjs");
const Route$6 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "SubVime — Break complex tasks into simple subsets"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-DFVXn73A.mjs");
const Route$5 = createFileRoute("/app/")({
  head: () => ({
    meta: [{
      title: "SubVime — Your checklists"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const $$splitComponentImporter$2 = () => import("./_shareId-C9HVyuAh.mjs");
const loadSharedChecklist = createServerFn({
  method: "GET"
}).inputValidator((shareId) => shareId).handler(createSsrRpc("417dfdc82c6abd96da65bb8d9bf9b610ec5cbb2c68e139242b562aaf83b39e0b"));
const Route$4 = createFileRoute("/c/$shareId")({
  head: ({
    loaderData
  }) => {
    const title = loaderData?.title ?? "Checklist";
    const description = loaderData?.description ?? "Interactive nested checklist preview on SubVime.";
    return {
      meta: [{
        title: `${title} — SubVime Checklist`
      }, {
        name: "description",
        content: description
      }, {
        property: "og:title",
        content: `${title} — SubVime Checklist`
      }, {
        property: "og:description",
        content: description
      }, {
        property: "og:type",
        content: "website"
      }, {
        name: "twitter:card",
        content: "summary"
      }, {
        name: "twitter:title",
        content: `${title} — SubVime Checklist`
      }, {
        name: "twitter:description",
        content: description
      }]
    };
  },
  loader: ({
    params
  }) => loadSharedChecklist({
    data: params.shareId
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./_checklistId-J3AZh9mT.mjs");
const Route$3 = createFileRoute("/app/$checklistId")({
  head: () => ({
    meta: [{
      title: "SubVime — Checklist"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const FEATURED_CHECKLISTS = [
  {
    id: "youtube-automation",
    title: "YouTube Automation",
    description: "Launch and automate a YouTube channel from niche research to publishing.",
    category: "Creator",
    author: "SubVime",
    tasks: [
      {
        id: "strategy",
        title: "Define niche and strategy",
        completed: false,
        tasks: [
          {
            id: "research",
            title: "Research competitors and content gaps",
            completed: false,
            tasks: []
          },
          {
            id: "audience",
            title: "Define target audience and value proposition",
            completed: false,
            tasks: []
          },
          {
            id: "content-pillars",
            title: "Pick 3–5 content pillars",
            completed: false,
            tasks: []
          }
        ]
      },
      {
        id: "setup",
        title: "Channel setup",
        completed: false,
        tasks: [
          {
            id: "branding",
            title: "Create channel name, logo, and banner",
            completed: false,
            tasks: []
          },
          {
            id: "tools",
            title: "Set up editing and scheduling tools",
            completed: false,
            tasks: []
          }
        ]
      },
      {
        id: "production",
        title: "Content production pipeline",
        completed: false,
        tasks: [
          {
            id: "script-template",
            title: "Build a reusable script template",
            completed: false,
            tasks: []
          },
          {
            id: "batch-record",
            title: "Batch record first 5 videos",
            completed: false,
            tasks: []
          },
          {
            id: "publish-schedule",
            title: "Schedule uploads and Shorts cadence",
            completed: false,
            tasks: []
          }
        ]
      }
    ]
  },
  {
    id: "build-house",
    title: "Build a House",
    description: "End-to-end construction checklist from permits to finishing.",
    category: "Project",
    author: "SubVime",
    tasks: [
      {
        id: "planning",
        title: "Planning & permits",
        completed: false,
        tasks: [
          {
            id: "survey",
            title: "Survey the lot",
            completed: false,
            tasks: []
          },
          {
            id: "permits",
            title: "Submit building permits",
            completed: false,
            tasks: []
          },
          {
            id: "budget",
            title: "Finalize budget and contractor bids",
            completed: false,
            tasks: []
          }
        ]
      },
      {
        id: "foundation",
        title: "Foundation",
        completed: false,
        tasks: [
          {
            id: "excavate",
            title: "Excavate and pour footings",
            completed: false,
            tasks: []
          },
          {
            id: "slab",
            title: "Pour foundation slab",
            completed: false,
            tasks: []
          }
        ]
      },
      {
        id: "framing",
        title: "Framing & roof",
        completed: false,
        tasks: [
          {
            id: "frame-walls",
            title: "Frame exterior and interior walls",
            completed: false,
            tasks: []
          },
          {
            id: "roof",
            title: "Install roof trusses and sheathing",
            completed: false,
            tasks: []
          }
        ]
      },
      {
        id: "finishing",
        title: "Systems & finishing",
        completed: false,
        tasks: [
          {
            id: "electrical-plumbing",
            title: "Rough-in electrical and plumbing",
            completed: false,
            tasks: []
          },
          {
            id: "inspection",
            title: "Pass final inspections",
            completed: false,
            tasks: []
          },
          {
            id: "interior",
            title: "Drywall, paint, and fixtures",
            completed: false,
            tasks: []
          }
        ]
      }
    ]
  }
];
function getFeaturedChecklist(id) {
  return FEATURED_CHECKLISTS.find((featured) => featured.id === id);
}
function featuredToSteps(featured) {
  return importTaskTree(featured.tasks);
}
const $$splitComponentImporter = () => import("./_featuredId-CRBhfd_7.mjs");
const Route$2 = createFileRoute("/app/featured/$featuredId")({
  head: ({
    params
  }) => {
    const featured = getFeaturedChecklist(params.featuredId);
    const title = featured?.title ?? "Featured checklist";
    const description = featured?.description ?? "Community checklist template on SubVime.";
    return {
      meta: [{
        title: `${title} — SubVime`
      }, {
        name: "description",
        content: description
      }, {
        property: "og:title",
        content: `${title} — SubVime`
      }, {
        property: "og:description",
        content: description
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const RATE_LIMIT_SCRIPT = `
local key = KEYS[1]
local now = tonumber(ARGV[1])
local windowStart = tonumber(ARGV[2])
local maxRequests = tonumber(ARGV[3])
local windowSeconds = tonumber(ARGV[4])
local requestId = ARGV[5]
redis.call('ZREMRANGEBYSCORE', key, 0, windowStart)
local currentCount = redis.call('ZCARD', key)
local allowed = 0
if currentCount < maxRequests then
  redis.call('ZADD', key, now, requestId)
  allowed = 1
  currentCount = currentCount + 1
end
redis.call('EXPIRE', key, windowSeconds + 1)
return {allowed, currentCount}
`;
async function rateLimit(key, config) {
  const now = Date.now();
  const windowMs = config.windowSeconds * 1e3;
  const windowStart = now - windowMs;
  const redisKey = `ratelimit:${config.identifier}:${key}`;
  const requestId = `${now}-${Math.random().toString(36).substring(2)}`;
  try {
    const result = await redis.eval(
      RATE_LIMIT_SCRIPT,
      1,
      redisKey,
      now.toString(),
      windowStart.toString(),
      config.maxRequests.toString(),
      config.windowSeconds.toString(),
      requestId
    );
    const [allowed, currentCount] = result;
    return {
      allowed: allowed === 1,
      current: currentCount,
      limit: config.maxRequests,
      resetIn: config.windowSeconds,
      remaining: Math.max(0, config.maxRequests - currentCount)
    };
  } catch (error) {
    console.error("Rate limit error:", error);
    return {
      allowed: true,
      current: 0,
      limit: config.maxRequests,
      resetIn: config.windowSeconds,
      remaining: config.maxRequests
    };
  }
}
function getClientIdentifier(request) {
  const vercelIp = request.headers.get("x-vercel-forwarded-for");
  if (vercelIp) return vercelIp.split(",")[0].trim().slice(0, 100);
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim().slice(0, 100);
  return "unidentified";
}
function createRateLimitResponse(result) {
  return new Response(
    JSON.stringify({ error: "Too many requests", retryAfter: result.resetIn }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": result.resetIn.toString()
      }
    }
  );
}
const rateLimiters = {
  checklistShare: (key) => rateLimit(key, { identifier: "checklist-share", maxRequests: 30, windowSeconds: 60 })
};
const corsHeaders$1 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
const Route$1 = createFileRoute("/api/checklists/share")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, {
        status: 204,
        headers: corsHeaders$1
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
              instructions: "Share this URL with the user. They can preview the nested checklist and save it to their SubVime account."
            },
            {
              headers: {
                ...corsHeaders$1,
                "Content-Type": "application/json"
              }
            }
          );
        } catch (error) {
          const message = error instanceof Error ? error.message : "Failed to create shared checklist";
          const status = message.includes("Invalid") || message.includes("must") ? 400 : 500;
          return Response.json(
            { error: message },
            {
              status,
              headers: {
                ...corsHeaders$1,
                "Content-Type": "application/json"
              }
            }
          );
        }
      },
      GET: async () => Response.json(
        {
          name: "SubVime Checklist Share API",
          baseUrl: getAppBaseUrl(),
          endpoints: {
            create: {
              method: "POST",
              path: "/api/checklists/share",
              description: "Create a shareable checklist preview from nested JSON. Returns a public URL.",
              body: {
                title: "string (required)",
                description: "string (optional)",
                tasks: "array of recursive task objects (required)"
              },
              taskShape: {
                id: "string",
                title: "string",
                completed: "boolean",
                tasks: "array"
              },
              response: {
                shareId: "string",
                url: "string — send this link to the user",
                previewUrl: "string",
                title: "string",
                stepCount: "number"
              }
            },
            get: {
              method: "GET",
              path: "/api/checklists/share/:shareId"
            },
            preview: {
              method: "GET",
              path: "/c/:shareId",
              description: "Human-readable interactive checklist preview"
            }
          }
        },
        {
          headers: {
            ...corsHeaders$1,
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Content-Type": "application/json"
          }
        }
      )
    }
  }
});
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};
const Route = createFileRoute("/api/checklists/share/$shareId")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, {
        status: 204,
        headers: corsHeaders
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
                "Content-Type": "application/json"
              }
            }
          );
        }
        return Response.json(
          {
            shareId: record.id,
            title: record.title,
            description: record.description,
            stepCount: countChecklistSteps(record.steps),
            createdAt: new Date(record.createdAt).toISOString(),
            tasks: record.steps.map(toLlmTask)
          },
          {
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json"
            }
          }
        );
      }
    }
  }
});
function toLlmTask(step) {
  return {
    id: step.id,
    title: step.title,
    completed: !!step.completed,
    ...step.notes ? { notes: step.notes } : {},
    tasks: step.children.map(toLlmTask)
  };
}
const PricingRoute = Route$9.update({
  id: "/pricing",
  path: "/pricing",
  getParentRoute: () => Route$a
});
const DocsRoute = Route$8.update({
  id: "/docs",
  path: "/docs",
  getParentRoute: () => Route$a
});
const ChangelogRoute = Route$7.update({
  id: "/changelog",
  path: "/changelog",
  getParentRoute: () => Route$a
});
const IndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const AppIndexRoute = Route$5.update({
  id: "/app/",
  path: "/app/",
  getParentRoute: () => Route$a
});
const CShareIdRoute = Route$4.update({
  id: "/c/$shareId",
  path: "/c/$shareId",
  getParentRoute: () => Route$a
});
const AppChecklistIdRoute = Route$3.update({
  id: "/app/$checklistId",
  path: "/app/$checklistId",
  getParentRoute: () => Route$a
});
const AppFeaturedFeaturedIdRoute = Route$2.update({
  id: "/app/featured/$featuredId",
  path: "/app/featured/$featuredId",
  getParentRoute: () => Route$a
});
const ApiChecklistsShareRoute = Route$1.update({
  id: "/api/checklists/share",
  path: "/api/checklists/share",
  getParentRoute: () => Route$a
});
const ApiChecklistsShareShareIdRoute = Route.update({
  id: "/$shareId",
  path: "/$shareId",
  getParentRoute: () => ApiChecklistsShareRoute
});
const ApiChecklistsShareRouteChildren = {
  ApiChecklistsShareShareIdRoute
};
const ApiChecklistsShareRouteWithChildren = ApiChecklistsShareRoute._addFileChildren(ApiChecklistsShareRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  ChangelogRoute,
  DocsRoute,
  PricingRoute,
  AppChecklistIdRoute,
  CShareIdRoute,
  AppIndexRoute,
  ApiChecklistsShareRoute: ApiChecklistsShareRouteWithChildren,
  AppFeaturedFeaturedIdRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  FEATURED_CHECKLISTS as F,
  Route$4 as R,
  Route$3 as a,
  Route$2 as b,
  featuredToSteps as f,
  getFeaturedChecklist as g,
  router as r
};
