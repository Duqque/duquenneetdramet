import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createBooking, SlotTakenError } from '@/lib/booking';
import { clientIp, limited } from '@/lib/ratelimit';
import { BOOKING_REASONS } from '@/content/data';

const body = z.object({
  startsAt: z.string().datetime(),
  duration: z.number().refine((n) => [30, 60, 90].includes(n)),
  reason: z.enum(BOOKING_REASONS),
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(190),
  company: z.string().trim().max(160).optional(),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().max(2000).optional(),
  website: z.string().max(0).optional(), // honeypot
});

export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(req.url).host) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  if (limited(`book:${clientIp(req)}`, 5, 10 * 60_000)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  const json = await req.json().catch(() => null);
  const parsed = body.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: 'invalid' }, { status: 400 });
  const { website: _hp, ...data } = parsed.data;

  try {
    await createBooking(data);
    return NextResponse.json({ ok: true, startsAt: data.startsAt });
  } catch (e) {
    if (e instanceof SlotTakenError) return NextResponse.json({ error: 'slot_taken' }, { status: 409 });
    console.error('booking failed', e instanceof Error ? e.message : e);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}
