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
  const [refresh, setRefresh] = useState(0);

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
  }, [date, duration, refresh]);

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
    else if (res?.status === 409) { setState('taken'); setRefresh((n) => n + 1); }
    else setState('error');
  }

  if (state === 'done') {
    return (
      <div className="glass" aria-live="polite" style={{ padding: 'clamp(32px, 6vw, 72px)' }}>
        <span className="pill">Confirmé</span>
        <h2 className="h1" style={{ marginTop: 24 }}>C’est noté.<br /><em style={{ textTransform: 'none' }}>{longDate(slot)}</em></h2>
        <p className="micro" style={{ marginTop: 20 }}>Une confirmation vous est envoyée par e-mail.</p>
      </div>
    );
  }

  const Title = ({ n, children }: { n: string; children: React.ReactNode }) => (
    <p className="step-title"><b>{n}</b><span className="h-sm">{children}</span></p>
  );

  return (
    <form className="book" onSubmit={submit} noValidate>
      <fieldset className="glass" style={{ margin: 0 }}>
        <legend className="sr-only">Motif</legend>
        <Title n="01">De quoi voulez-vous parler ?</Title>
        <div className="choices">
          {BOOKING_REASONS.map((r) => <button type="button" className="chip" key={r} aria-pressed={reason === r} onClick={() => setReason(r)}>{r}</button>)}
        </div>
      </fieldset>

      <fieldset className="glass" style={{ margin: 0 }}>
        <legend className="sr-only">Durée</legend>
        <Title n="02">Combien de temps ?</Title>
        <div className="choices">
          {BOOKING_DURATIONS.map((d) => <button type="button" className="chip" key={d} aria-pressed={duration === d} onClick={() => { setDuration(d); setDate(''); setSlots([]); setSlot(''); }}>{d} min</button>)}
        </div>
      </fieldset>

      {duration > 0 && (
        <div className="glass grid-2">
          <div>
            <Title n="03">Quel jour ?</Title>
            <div className="cal-head">
              <button type="button" className="chip" aria-label="Mois précédent" onClick={() => setCursor(({ y, m }) => (m ? { y, m: m - 1 } : { y: y - 1, m: 11 }))}>←</button>
              <span className="h-sm">{new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(new Date(cursor.y, cursor.m, 1))}</span>
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
            <Title n="04">À quelle heure ?</Title>
            <p className="small" style={{ marginTop: -12, marginBottom: 14 }}>Heure de Paris</p>
            {state === 'taken' && <p className="err" aria-live="polite">Ce créneau vient d’être pris. Choisissez-en un autre.</p>}
            {!date ? <p className="lead">Choisissez d’abord un jour.</p> : slots.length === 0 ? <p className="lead">Aucun créneau ce jour-là.</p> : (
              <div className="slots">
                {slots.map((s) => <button type="button" className="chip" key={s} aria-pressed={slot === s} onClick={() => { setSlot(s); if (state === 'taken') setState('idle'); }}>{hhmm(s)}</button>)}
              </div>
            )}
          </div>
        </div>
      )}

      {slot && (
        <div className="glass">
          <Title n="05">Et vous, qui êtes-vous ?</Title>
          <div className="grid-2" style={{ gap: '0 4vw' }}>
            <div className="field"><label htmlFor="fn">Prénom</label><input id="fn" required autoComplete="given-name" value={form.firstName} onChange={set('firstName')} /></div>
            <div className="field"><label htmlFor="ln">Nom</label><input id="ln" required autoComplete="family-name" value={form.lastName} onChange={set('lastName')} /></div>
            <div className="field"><label htmlFor="em">E-mail</label><input id="em" type="email" required autoComplete="email" value={form.email} onChange={set('email')} /></div>
            <div className="field"><label htmlFor="co">Organisation</label><input id="co" autoComplete="organization" value={form.company} onChange={set('company')} /></div>
            <div className="field"><label htmlFor="ph">Téléphone</label><input id="ph" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} /></div>
          </div>
          <div className="field"><label htmlFor="ms">Qu’aimeriez-vous changer ?</label><textarea id="ms" rows={3} value={form.message} onChange={set('message')} /></div>
          <div className="hp" aria-hidden="true"><label>Ne pas remplir<input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></label></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <p className="small" style={{ margin: 0, textTransform: 'capitalize' }}>{longDate(slot)} · {duration} min · {reason}</p>
            <button className="btn btn-violet" disabled={!ready || state === 'sending'}>{state === 'sending' ? 'Envoi…' : 'Confirmer'} <span className="arr" aria-hidden="true">→</span></button>
          </div>
          <div aria-live="polite" style={{ marginTop: 16 }}>
            {state === 'error' && <p className="err">Un problème est survenu. Réessayez dans un instant.</p>}
          </div>
        </div>
      )}
    </form>
  );
}
