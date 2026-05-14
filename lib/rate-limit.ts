type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

let lastPruned = Date.now();

function pruneExpired() {
  const now = Date.now();
  if (now - lastPruned < 60_000) return;
  lastPruned = now;
  for (const [k, v] of store) {
    if (now > v.resetAt) store.delete(k);
  }
}

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  pruneExpired();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= limit) return true;
  entry.count++;
  return false;
}
