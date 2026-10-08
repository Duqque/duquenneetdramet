'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { rotationOrder, type Case } from '@/content/cases';

const DURATION = 9500;
const OUT_MS = 280;
const KEY = 'dd-cases';
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * D&D Case Intelligence — fenêtre éditoriale flottante (coin inférieur droit).
 * Rotation automatique toutes les 9,5 s, pause au survol / au focus, navigation ← →,
 * progression conservée pendant la session.
 */
export function CaseCard({ cases }: { cases: Case[] }) {
  const seq = useMemo(() => rotationOrder(cases), [cases]);
  const total = seq.length;
  const path = usePathname();
  const [i, setI] = useState(0);
  const [out, setOut] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [min, setMin] = useState(false);
  const [live, setLive] = useState(false);
  const [heroDone, setHeroDone] = useState(true);
  const [ready, setReady] = useState(false);
  const elapsed = useRef(0);
  const bar = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);

  // Restauration de la session (index, temps écoulé, état réduit).
  useEffect(() => {
    try {
      const s = JSON.parse(sessionStorage.getItem(KEY) ?? 'null');
      if (s && typeof s.i === 'number') { setI(((s.i % total) + total) % total); elapsed.current = Math.min(s.e ?? 0, DURATION - 500); setMin(Boolean(s.min)); }
    } catch {}
    setReady(true);
  }, [total]);

  const save = useCallback((idx = i) => {
    try { sessionStorage.setItem(KEY, JSON.stringify({ i: idx, e: elapsed.current, min })); } catch {}
  }, [i, min]);
  useEffect(() => { if (ready) save(); }, [i, min, ready, save]);

  const go = useCallback((dir: number, manual = false) => {
    if (busy.current || total < 2) return;
    busy.current = true;
    setLive(manual);
    setOut(true);
    window.setTimeout(() => {
      elapsed.current = 0;
      setI((x) => (x + dir + total) % total);
      setOut(false);
      busy.current = false;
    }, OUT_MS);
  }, [total]);

  // Sur l'accueil, la carte apparaît une fois le hero passé.
  useEffect(() => {
    if (path !== '/') { setHeroDone(true); return; }
    const check = () => {
      const h = document.querySelector('.hero');
      setHeroDone(!h || h.getBoundingClientRect().bottom < window.innerHeight * 0.6);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [path]);

  const hidden = path.startsWith('/veille') || !heroDone;
  const running = ready && !paused && !hover && !min && !hidden && !out;

  // Horloge : progression de la barre et changement de cas.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      if (running && document.visibilityState === 'visible') {
        elapsed.current += dt;
        if (elapsed.current >= DURATION) go(1);
      }
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, elapsed.current / DURATION)})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const persist = () => save();
    window.addEventListener('pagehide', persist);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pagehide', persist); };
  }, [running, go, save]);

  if (!total) return null;
  const c = seq[i];
  const tags = [c.category, ...c.secondary_categories].slice(0, 3);

  if (min) {
    return (
      <button className={`cc-min${hidden ? ' cc-hidden' : ''}`} onClick={() => setMin(false)} aria-label="Afficher D&D Case Intelligence">
        <span className="cc-dot" aria-hidden="true" />
        <span>Case Intelligence</span>
        <b>{pad(i + 1)} / {pad(total)}</b>
        <span aria-hidden="true">↑</span>
      </button>
    );
  }

  return (
    <aside
      className={`cc${out ? ' out' : ''}${hidden ? ' cc-hidden' : ''}`}
      aria-label="D&D Case Intelligence — cas réels du sport"
      aria-roledescription="carrousel"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setHover(false); }}
    >
      <div className="cc-tile cc-head">
        <span className="cc-avatar" aria-hidden="true">D&amp;D</span>
        <div className="cc-id">
          <p className="cc-kicker">Case Intelligence</p>
          <p className="cc-meta">{c.category} <span>· {c.year}</span></p>
        </div>
        <div className="cc-ctrl">
          <span className="cc-count"><b>{pad(i + 1)}</b> / {pad(total)}</span>
          <button className="cc-ic" onClick={() => setPaused(!paused)} aria-label={paused ? 'Reprendre la rotation' : 'Mettre en pause'} aria-pressed={paused}>{paused ? '▶' : '❙❙'}</button>
          <button className="cc-ic" onClick={() => setMin(true)} aria-label="Réduire">–</button>
        </div>
      </div>

      <div className="cc-tile cc-body" aria-live={live ? 'polite' : 'off'}>
        <div className="cc-in" key={c.id}>
          <h3 className="cc-title">{c.title}</h3>
          <p className="cc-lbl">Problématique</p>
          <p className="cc-q">{c.problem}</p>
          <div className="cc-cols">
            <div><p className="cc-lbl">Réponse</p><p className="cc-t">{c.solution}</p></div>
            <div><p className="cc-lbl">Impact</p><p className="cc-t">{c.impact}</p></div>
          </div>
          <p className="cc-lens"><span>D&amp;D Lens</span>{c.dd_lens}</p>
        </div>
      </div>

      <div className="cc-row">
        <Link href={`/veille/${c.id}`} className="cc-cta">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 16h14M4 13V8M7.5 13V4M11 13V9M14.5 13V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          <span>Explorer le cas</span>
          <span className="cc-arr" aria-hidden="true">→</span>
        </Link>
        <button className="cc-sq" onClick={() => go(-1, true)} aria-label="Cas précédent">←</button>
        <button className="cc-sq" onClick={() => go(1, true)} aria-label="Cas suivant">→</button>
      </div>

      <div className="cc-foot">
        <span>{tags.join(' · ')}</span>
        <a href={c.source_url} target="_blank" rel="noopener noreferrer">{c.source_name} ↗</a>
      </div>
      <div className="cc-prog" aria-hidden="true"><span ref={bar} /></div>
    </aside>
  );
}
