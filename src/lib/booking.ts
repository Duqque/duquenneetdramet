import type { RowDataPacket } from 'mysql2/promise';
import { getPool } from './db';
import { addDays, isoWeekday, parisToUtc, todayParis } from './time';

/** Règles par défaut. Surchargeables via les tables `availability` / `blocked_periods` (admin, phase 2). */
export const RULES = {
  weekdays: [1, 2, 3, 4, 5],
  windows: [['09:30', '12:30'], ['14:00', '18:00']] as [string, string][],
  stepMinutes: 30,
  minNoticeHours: 24,
  horizonDays: 60,
  maxPerDay: 4,
};

type Busy = { start: number; end: number };

// Stockage mémoire — uniquement quand DATABASE_URL est absent (développement).
type MemAppt = { startsAt: Date; duration: number; status: string };
const g = globalThis as unknown as { __ddMemory?: MemAppt[] };
const memory: MemAppt[] = (g.__ddMemory ??= []);

async function loadBusy(date: string): Promise<{ busy: Busy[]; count: number }> {
  const from = parisToUtc(date, '00:00');
  const to = parisToUtc(addDays(date, 1), '00:00');
  const pool = getPool();
  if (!pool) {
    const rows = memory.filter((a) => a.status !== 'cancelled' && a.startsAt >= from && a.startsAt < to);
    return { busy: rows.map((a) => ({ start: +a.startsAt, end: +a.startsAt + a.duration * 60000 })), count: rows.length };
  }
  const [appts] = await pool.query<RowDataPacket[]>(
    `SELECT starts_at, duration_min FROM appointments WHERE status <> 'cancelled' AND starts_at >= ? AND starts_at < ?`, [from, to]);
  const [blocked] = await pool.query<RowDataPacket[]>(
    `SELECT starts_at, ends_at FROM blocked_periods WHERE ends_at > ? AND starts_at < ?`, [from, to]);
  return {
    busy: [
      ...appts.map((a) => ({ start: +new Date(a.starts_at), end: +new Date(a.starts_at) + a.duration_min * 60000 })),
      ...blocked.map((b) => ({ start: +new Date(b.starts_at), end: +new Date(b.ends_at) })),
    ],
    count: appts.length,
  };
}

export function validDate(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
}

/** Créneaux libres d'une journée (ISO UTC), pour une durée donnée. */
export async function slotsFor(date: string, duration: number, now = new Date()): Promise<string[]> {
  const today = todayParis(now);
  if (date < today || date > addDays(today, RULES.horizonDays)) return [];
  if (!RULES.weekdays.includes(isoWeekday(date))) return [];

  const { busy, count } = await loadBusy(date);
  if (count >= RULES.maxPerDay) return [];
  const earliest = +now + RULES.minNoticeHours * 3600000;
  const out: string[] = [];

  for (const [from, to] of RULES.windows) {
    const end = +parisToUtc(date, to);
    for (let t = +parisToUtc(date, from); t + duration * 60000 <= end; t += RULES.stepMinutes * 60000) {
      const e = t + duration * 60000;
      if (t < earliest) continue;
      if (busy.some((b) => t < b.end && e > b.start)) continue;
      out.push(new Date(t).toISOString());
    }
  }
  return out;
}

export async function daysWithSlots(month: string, duration: number): Promise<string[]> {
  const [y, m] = month.split('-').map(Number);
  const days: string[] = [];
  for (let d = 1; d <= 31; d++) {
    const date = new Date(Date.UTC(y, m - 1, d));
    if (date.getUTCMonth() !== m - 1) break;
    const iso = date.toISOString().slice(0, 10);
    if ((await slotsFor(iso, duration)).length) days.push(iso);
  }
  return days;
}

export type NewBooking = {
  startsAt: string; duration: number; reason: string;
  firstName: string; lastName: string; email: string; company?: string; phone?: string; message?: string;
};

export class SlotTakenError extends Error {}

/** Crée contact + rendez-vous + e-mails en file, de façon atomique. Revalide le créneau côté serveur. */
export async function createBooking(b: NewBooking): Promise<void> {
  const start = new Date(b.startsAt);
  const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(start);
  const pool = getPool();

  if (!pool) {
    if (process.env.NODE_ENV === 'production') throw new Error('DATABASE_URL manquant');
    const ok = (await slotsFor(date, b.duration)).includes(start.toISOString());
    if (!ok) throw new SlotTakenError();
    memory.push({ startsAt: start, duration: b.duration, status: 'confirmed' });
    return;
  }

  const conn = await pool.getConnection();
  const lock = `booking:${date}`;
  let locked = false;
  try {
    // Verrou applicatif : sérialise les réservations concurrentes du même jour (libéré après commit).
    const [l] = await conn.query<RowDataPacket[]>(`SELECT GET_LOCK(?, 5) AS ok`, [lock]);
    if (l[0].ok !== 1) throw new Error('lock timeout');
    locked = true;
    await conn.beginTransaction();
    const ok = (await slotsFor(date, b.duration)).includes(start.toISOString());
    if (!ok) throw new SlotTakenError();

    const [c] = await conn.query<RowDataPacket[]>(`SELECT id FROM contacts WHERE email = ? LIMIT 1`, [b.email]);
    let contactId: number;
    if (c.length) contactId = c[0].id;
    else {
      const [r] = await conn.query<any>(
        `INSERT INTO contacts (first_name, last_name, email, phone, company_name, source, pipeline_stage) VALUES (?,?,?,?,?,'booking','rendez-vous')`,
        [b.firstName, b.lastName, b.email, b.phone ?? null, b.company ?? null]);
      contactId = r.insertId;
    }
    const [a] = await conn.query<any>(
      `INSERT INTO appointments (contact_id, reason, starts_at, duration_min, status, message) VALUES (?,?,?,?, 'confirmed', ?)`,
      [contactId, b.reason, start, b.duration, b.message ?? null]);

    const { confirmationEmail, adminNotificationEmail } = await import('./email');
    for (const m of [confirmationEmail(b), adminNotificationEmail(b)]) {
      await conn.query(
        `INSERT INTO email_logs (appointment_id, template, to_email, subject, html, status) VALUES (?,?,?,?,?, 'queued')`,
        [a.insertId, m.template, m.to, m.subject, m.html]);
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    if (locked) await conn.query(`SELECT RELEASE_LOCK(?)`, [lock]).catch(() => undefined);
    conn.release();
  }
}
