export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute window
  maxRequests: 30,      // max 30 requests per minute
};

const ipRequestMap = new Map<string, number[]>();
let requestCounter = 0;
const SWEEP_INTERVAL = 50;
const MAX_MAP_SIZE = 500;

/**
 * Checks whether an incoming client IP is allowed within the rate limit window.
 */
export function isAllowedRate(ip: string, config: RateLimitConfig = DEFAULT_CONFIG): boolean {
  const now = Date.now();
  requestCounter++;

  // Lazy global cleanup every SWEEP_INTERVAL requests or if map exceeds capacity
  if (requestCounter >= SWEEP_INTERVAL || ipRequestMap.size > MAX_MAP_SIZE) {
    requestCounter = 0;
    for (const [key, timestamps] of ipRequestMap.entries()) {
      if (timestamps.length === 0 || now - timestamps[timestamps.length - 1] >= config.windowMs) {
        ipRequestMap.delete(key);
      }
    }
  }

  const existing = ipRequestMap.get(ip);
  const timestamps = (existing || []).filter((t) => now - t < config.windowMs);

  if (timestamps.length >= config.maxRequests) {
    ipRequestMap.set(ip, timestamps);
    return false;
  }

  timestamps.push(now);
  ipRequestMap.set(ip, timestamps);
  return true;
}

/**
 * Sanitizes input string to prevent denial-of-service / oversized payloads.
 */
export function sanitizeInput(input: unknown, maxLength: number = 800): string {
  if (typeof input !== "string") {
    return "";
  }
  return input.trim().slice(0, maxLength);
}

/**
 * Validates and trims message history array to avoid exceeding context limits.
 */
export function sanitizeMessages(
  messages: unknown[],
  maxTurns: number = 10
): { role: "user" | "assistant"; content: string }[] {
  if (!Array.isArray(messages)) return [];

  const valid = messages
    .filter(
      (m): m is { role: string; content: string } => {
        if (typeof m !== "object" || m === null) return false;
        const rec = m as Record<string, unknown>;
        return typeof rec.role === "string" && typeof rec.content === "string";
      }
    )
    .map((m) => ({
      role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: sanitizeInput(m.content, 600),
    }));

  // Keep latest turns
  return valid.slice(-maxTurns);
}
