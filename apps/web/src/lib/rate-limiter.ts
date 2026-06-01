import { redis } from "./redis";

interface RateLimitConfig {
  identifier: string;
  maxRequests: number;
  windowSeconds: number;
}

interface RateLimitResult {
  allowed: boolean;
  current: number;
  limit: number;
  resetIn: number;
  remaining: number;
}

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

export async function rateLimit(
  key: string,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  const windowStart = now - windowMs;
  const redisKey = `ratelimit:${config.identifier}:${key}`;
  const requestId = `${now}-${Math.random().toString(36).substring(2)}`;

  try {
    const result = (await redis.eval(
      RATE_LIMIT_SCRIPT,
      1,
      redisKey,
      now.toString(),
      windowStart.toString(),
      config.maxRequests.toString(),
      config.windowSeconds.toString(),
      requestId,
    )) as [number, number];

    const [allowed, currentCount] = result;

    return {
      allowed: allowed === 1,
      current: currentCount,
      limit: config.maxRequests,
      resetIn: config.windowSeconds,
      remaining: Math.max(0, config.maxRequests - currentCount),
    };
  } catch (error) {
    console.error("Rate limit error:", error);
    return {
      allowed: true,
      current: 0,
      limit: config.maxRequests,
      resetIn: config.windowSeconds,
      remaining: config.maxRequests,
    };
  }
}

export function getClientIdentifier(request: Request): string {
  const vercelIp = request.headers.get("x-vercel-forwarded-for");
  if (vercelIp) return vercelIp.split(",")[0].trim().slice(0, 100);

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim().slice(0, 100);

  return "unidentified";
}

export function createRateLimitResponse(result: RateLimitResult): Response {
  return new Response(
    JSON.stringify({ error: "Too many requests", retryAfter: result.resetIn }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": result.resetIn.toString(),
      },
    },
  );
}

export const rateLimiters = {
  checklistShare: (key: string) =>
    rateLimit(key, { identifier: "checklist-share", maxRequests: 30, windowSeconds: 60 }),
};
