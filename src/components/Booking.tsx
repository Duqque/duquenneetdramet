'use client';
import { useEffect, useMemo, useState } from 'react';
import { BOOKING_DURATIONS, BOOKING_REASONS } from '@/content/data';

const pad = (n: number) => String(n).padStart(2, '0');
const hhmm = (iso: string) => new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
const longDate = (iso: string) => new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', dateStyle: 'full', timeStyle: 'short' }).format(new Date(iso));

export function Booking() {
  const [reason, setReason] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [cursor, setCursor] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; });
  const [days, setDays] = useState<Set<string>>(new Set());
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState<string[]>([]);
  const [slot, setSlot] = useState('');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', company: '', phone: '', message: '', website: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error' | 'taken'>('idle');

  const month = `${cursor.y}-${pad(cursor.m + 1)}`;

  useEffect(() => {
    if (!duration) return;
    let live = true;
    fetch(`/api/availability?month=${month}&duration=${duration}`).then((r) => r.json()).then((j) => live && setDays(new Set(j.days ?? [])));
    return () => { live = false; };
  }, [month, duration]);

  useEffect(() => {
    if (!date || !duration) return;
    let live = true;
    setSlot('');
    fetch(`/api/availability?date=${date}&duration=${duration}`).then((r) => r.json()).then((j) => live && setSlots(j.slots ?? []));
    return () => { live = false; };
  }, [date, duration]);

  const grid = useMemo(() => {
    const first = new Date(Date.UTC(cursor.y, cursor.m, 1));
    const lead = (first.getUTCDay() + 6) % 7;
    const count = new Date(Date.UTC(cursor.y, cursor.m + 1, 0)).getUTCDate();
    return [...Array(lead).fill(null), ...Array.from({ length: count }, (_, i) => `${month}-${pad(i + 1)}`)] as (string | null)[];
  }, [cursor, month]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });
  const ready = reason && duration && slot && form.firstName && form.lastName && /.+@.+\..+/.test(form.email);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    const res = await fetch('/api/appointments', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startsAt: slot, duration, reason, ...form }),
    }).catch(() => null);
    if (res?.ok) setState('done');
    else if (res?.status === 409) { setState('taken'); setSlot(''); setDate((d) => d); }
    else setState('error');
  }

  if (state === 'done') {
    return (
      <div aria-live="polite">
        <h2 className="display xl">C’est noté.</h2>
        <p className="lead acid" style={{ marginTop: 24 }}>{longDate(slot)}</p>
        <p className="lead" style={{ marginTop: 12 }}>Une confirmation vous est envoyée par e-mail.</p>
      </div>
    );
  }

  return (
    <form className="book" onSubmit={submit} noValidate>
      <fieldset style={{ border: 0, padding: 0, margin: '0 0 8vh' }}>
        <legend className="eyebrow" style={{ marginBottom: 16 }}>01 — De quoi voulez-vous parler ?</legend>
        <div className="choices">
          {BOOKING_REASONS.map((r) => <button type="button" className="chip" key={r} aria-pressed={reason === r} onClick={() => setReason(r)}>{r}</button>)}
        </div>
      </fieldset>

      <fieldset style={{ border: 0, padding: 0, margin: '0 0 8vh' }}>
        <legend className="eyebrow" style={{ marginBottom: 16 }}>02 — Combien de temps ?</legend>
        <div className="choices">
          {BOOKING_DURATIONS.map((d) => <button type="button" className="chip" key={d} aria-pressed={duration === d} onClick={() => { setDuration(d); setDate(''); setSlots([]); setSlot(''); }}>{d} min</button>)}
        </div>
      </fieldset>

      {duration > 0 && (
        <div className="grid2" style={{ marginBottom: '8vh' }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: 16 }}>03 — Quel jour ?</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 460, marginBottom: 12 }}>
              <button type="button" className="chip" aria-label="Mois précédent" onClick={() => setCursor(({ y, m }) => (m ? { y, m: m - 1 } : { y: y - 1, m: 11 }))}>←</button>
              <span className="display md">{new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(new Date(cursor.y, cursor.m, 1))}</span>
              <button type="button" className="chip" aria-label="Mois suivant" onClick={() => setCursor(({ y, m }) => (m < 11 ? { y, m: m + 1 } : { y: y + 1, m: 0 }))}>→</button>
            </div>
            <div className="cal">
              {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => <span className="dow" key={i}>{d}</span>)}
              {grid.map((d, i) => d
                ? <button type="button" key={d} disabled={!days.has(d)} aria-pressed={date === d} onClick={() => setDate(d)}>{Number(d.slice(8))}</button>
                : <span key={`e${i}`} />)}
            </div>
          </div>
          <div>
            <p className="eyebrow" style={{ marginBottom: 16 }}>04 — À quelle heure ? <span style={{ textTransform: 'none' }}>(heure de Paris)</span></p>
            {!date ? <p className="lead">Choisissez d’abord un jour.</p> : slots.length === 0 ? <p className="lead">Aucun créneau ce jour-là.</p> : (
              <div className="slots">
                {slots.map((s) => <button type="button" className="chip" key={s} aria-pressed={slot === s} onClick={() => setSlot(s)}>{hhmm(s)}</button>)}
              </div>
            )}
          </div>
        </div>
      )}

      {slot && (
        <div style={{ maxWidth: 640 }}>
          <p className="eyebrow" style={{ marginBottom: 24 }}>05 — Et vous, qui êtes-vous ?</p>
          <div className="grid2" style={{ gap: '0 4vw' }}>
            <div className="field"><label htmlFor="fn">Prénom</label><input id="fn" required autoComplete="given-name" value={form.firstName} onChange={set('firstName')} /></div>
            <div className="field"><label htmlFor="ln">Nom</label><input id="ln" required autoComplete="family-name" value={form.lastName} onChange={set('lastName')} /></div>
          </div>
          <div className="field"><label htmlFor="em">E-mail</label><input id="em" type="email" required autoComplete="email" value={form.email} onChange={set('email')} /></div>
          <div className="grid2" style={{ gap: '0 4vw' }}>
            <div className="field"><label htmlFor="co">Organisation</label><input id="co" autoComplete="organization" value={form.company} onChange={set('company')} /></div>
            <div className="field"><label htmlFor="ph">Téléphone</label><input id="ph" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} /></div>
          </div>
          <div className="field"><label htmlFor="ms">Qu’aimeriez-vous changer ?</label><textarea id="ms" rows={3} value={form.message} onChange={set('message')} /></div>
          <div className="hp" aria-hidden="true"><label>Ne pas remplir<input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></label></div>
          <p className="eyebrow" style={{ marginBottom: 20 }}>{longDate(slot)} · {duration} min</p>
          <button className="btn solid" disabled={!ready || state === 'sending'}>{state === 'sending' ? 'Envoi…' : 'Confirmer'} <span className="arrow" aria-hidden="true">→</span></button>
          <div aria-live="polite" style={{ marginTop: 16 }}>
            {state === 'taken' && <p className="err">Ce créneau vient d’être pris. Choisissez-en un autre.</p>}
            {state === 'error' && <p className="err">Un problème est survenu. Réessayez dans un instant.</p>}
          </div>
        </div>
      )}
    </form>
  );
}
