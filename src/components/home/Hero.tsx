'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Athlete, OUTFITS } from '@/components/Athlete';

const N = OUTFITS.length;
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Hero épinglé : l'athlète ne bouge pas, seule sa tenue change au fil du scroll.
 * ~45 % de hauteur d'écran par tenue, puis la page reprend son cours.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const word = useRef<SVGSVGElement>(null);
  const name = useRef<HTMLSpanElement>(null);
  const fig = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = root.current!;
    const length = () => window.innerHeight * 0.45 * N;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: () => `+=${length()}`,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const n = Math.min(N - 1, Math.floor(self.progress * N));
          setI((prev) => (prev === n ? prev : n));
        },
      });
      gsap.to(word.current, { xPercent: -5, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${length()}`, scrub: true } });
      gsap.from(el.querySelectorAll('[data-in]'), { opacity: 0, y: 24, duration: 0.9, ease: 'expo.out', stagger: 0.09, delay: document.documentElement.classList.contains('intro-on') ? 3.6 : 0.2 });
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(name.current, { yPercent: 100 }, { yPercent: 0, duration: 0.5, ease: 'expo.out' });
    gsap.fromTo(fig.current, { scale: 1.012 }, { scale: 1, duration: 0.5, ease: 'expo.out' });
  }, [i]);

  return (
    <section ref={root} className="hero" data-tone="light" aria-label="Et si nous changions le sport ?">
      <div ref={fig} style={{ position: 'absolute', inset: 0, transformOrigin: '50% 100%' }}>
        <Athlete active={i} />
      </div>

      <div className="copy">
        <h1 className="q" data-in>Et si nous changions<br /><em>le sport&nbsp;?</em></h1>
        <p data-in>Duquenne &amp; Dramet Consulting — conseil, innovation et transformation dédiés au sport.</p>
      </div>

      <div className="sport" aria-live="polite">
        <span className="count" data-in>{pad(i + 1)} / {pad(N)}</span>
        <span className="name" data-in><span ref={name}>{OUTFITS[i].label}</span></span>
        <div className="ticks" aria-hidden="true" data-in>
          {OUTFITS.map((o, k) => <i key={o.id} data-on={k === i ? '' : undefined} />)}
        </div>
      </div>

      <div className="word" aria-hidden="true">
        <svg ref={word} viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax meet">
          <text x="500" y="292" textAnchor="middle" fontSize="380">D&amp;D</text>
        </svg>
      </div>
      <span className="scroll-hint" data-in>Faites défiler — {N} disciplines ↓</span>
    </section>
  );
}
