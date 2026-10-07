export const TZ = 'Europe/Paris';

/** Décalage (ms) de Europe/Paris par rapport à UTC à l'instant donné. */
function offsetMs(at: Date): number {
  const p = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(at);
  const g = (t: string) => Number(p.find((x) => x.type === t)!.value);
  return Date.UTC(g('year'), g('month') - 1, g('day'), g('hour'), g('minute'), g('second')) - at.getTime();
}

/** 'YYYY-MM-DD' + 'HH:MM' (heure de Paris) -> instant UTC. */
export function parisToUtc(date: string, hhmm: string): Date {
  const [y, m, d] = date.split('-').map(Number);
  const [h, mi] = hhmm.split(':').map(Number);
  const guess = new Date(Date.UTC(y, m - 1, d, h, mi));
  return new Date(guess.getTime() - offsetMs(new Date(guess.getTime() - offsetMs(guess))));
}

/** Jour de semaine ISO (1 = lundi … 7 = dimanche) d'une date calendaire. */
export function isoWeekday(date: string): number {
  const [y, m, d] = date.split('-').map(Number);
  return ((new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7) + 1;
}

export function addDays(date: string, n: number): string {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

export function todayParis(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(now);
}
