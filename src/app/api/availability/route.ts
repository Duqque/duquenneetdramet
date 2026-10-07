import { NextResponse } from 'next/server';
import { z } from 'zod';
import { daysWithSlots, slotsFor, validDate } from '@/lib/booking';
import { clientIp, limited } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

const q = z.object({
  duration: z.coerce.number().refine((n) => [30, 60, 90].includes(n)),
  date: z.string().refine(validDate).optional(),
  month: z.string().regex(/^\d{4}-\d{2}$/).optional(),
});

export async function GET(req: Request) {
  if (limited(`avail:${clientIp(req)}`, 120, 60_000)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  const parsed = q.safeParse(Object.fromEntries(new URL(req.url).searchParams));
  if (!parsed.success || (!parsed.data.date && !parsed.data.month)) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  const { duration, date, month } = parsed.data;
  // Seules des disponibilités sont exposées — jamais d'information sur les rendez-vous existants.
  if (date) return NextResponse.json({ slots: await slotsFor(date, duration) });
  return NextResponse.json({ days: await daysWithSlots(month!, duration) });
}
