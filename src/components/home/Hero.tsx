'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_FRAMES } from '@/content/hero';

const N = HERO_FRAMES.length;
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Hero épinglé : l'athlète reste dans la même pose, seule sa tenue change au fil du scroll
 * (fondu entre des photos au cadrage identique). ~70 % de hauteur d'écran par tenue.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLSpanElement>(null);
  const [i, setI] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = root.current!;
    const length = () => window.innerHeight * 0.7 * N;
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
      gsap.to(word.current, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${length()}`, scrub: true } });
      gsap.from(el.querySelectorAll('[data-in]'), { opacity: 0, y: 24, duration: 0.9, ease: 'expo.out', stagger: 0.09, delay: document.documentElement.classList.contains('intro-on') ? 3.6 : 0.2 });
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(name.current, { yPercent: 100 }, { yPercent: 0, duration: 0.5, ease: 'expo.out' });
  }, [i]);

  return (
    <section ref={root} className="hero photo" data-tone="light" aria-label="Et si nous changions le sport ?">
      <div className="frames">
        {HERO_FRAMES.map((f, k) => (
          <div key={f.id} className="frame-ph" data-on={k === i ? '' : undefined}>
            <Image src={f.src} alt={k === i ? `Athlète en tenue de ${f.label.toLowerCase()}` : ''} fill priority={k === 0} sizes="100vw" quality={88} />
          </div>
        ))}
      </div>

      <div className="copy">
        <h1 className="q" data-in>Et si nous changions<br /><em>le sport&nbsp;?</em></h1>
        <p data-in>Duquenne &amp; Dramet Consulting — conseil, innovation et transformation dédiés au sport.</p>
      </div>

      <div className="sport" aria-live="polite">
        <span className="count" data-in>{pad(i + 1)} / {pad(N)}</span>
        <span className="name" data-in><span ref={name}>{HERO_FRAMES[i].label}</span></span>
        <div className="ticks" aria-hidden="true" data-in>
          {HERO_FRAMES.map((f, k) => <i key={f.id} data-on={k === i ? '' : undefined} />)}
        </div>
      </div>

      <div ref={word} className="word" aria-hidden="true">
        <span className="word-t">D&amp;D</span>
      </div>
      <span className="scroll-hint" data-in>Faites défiler — {N} disciplines ↓</span>
    </section>
  );
}
