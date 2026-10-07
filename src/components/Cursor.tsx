'use client';
import { useEffect, useRef } from 'react';

/** Curseur minimal (desktop uniquement). Libellé via data-cursor="VIEW" sur n'importe quel élément. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.body.classList.add('has-cursor');
    const el = ref.current!;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor], a, button');
      const label = t?.dataset.cursor ?? (t ? '→' : '');
      el.textContent = label;
      el.classList.toggle('big', Boolean(t) && label.length > 0);
    };
    const tick = () => {
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', move);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
      document.body.classList.remove('has-cursor');
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
