const hits = new Map<string, number[]>();

/** Rate limiting en mémoire (par instance). À remplacer par un store partagé / le WAF en production multi-instances. */
export function limited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return arr.length > max;
}

export function clientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
}
