const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 12;
export const MAX_MESSAGES_PER_CONVERSATION = 30;
export const MAX_INPUT_CHARS = 1500;

type Bucket = { count: number; windowStart: number };

/** In-memory per-IP token bucket. Resets per serverless instance — good enough to deter casual abuse, not a determined attacker. */
const buckets = new Map<string, Bucket>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now });
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_REQUESTS_PER_WINDOW;
}
