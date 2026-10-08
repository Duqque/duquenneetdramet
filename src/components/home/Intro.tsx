'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Athlete } from '@/components/Athlete';

/** Introduction facultative : « ENTREZ. » → une ligne → une silhouette → le logo. Une fois par session. */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains('no-intro')) return;
    html.classList.add('intro-on');
    const el = root.current!;
    const q = gsap.utils.selector(el);
    const done = () => {
      try { sessionStorage.setItem('dd-intro', '1'); } catch {}
      html.classList.remove('intro-on');
      html.classList.add('no-intro');
      window.dispatchEvent(new Event('dd:intro-done'));
    };
    tl.current = gsap.timeline({ paused: true, onComplete: done })
      .to(q('.seed'), { scale: 0, duration: 0.35, ease: 'expo.in' })
      .to(q('.enter'), { opacity: 0, duration: 0.3 }, '<')
      .to(q('.rule'), { scaleX: 1, duration: 0.8, ease: 'expo.inOut' })
      .to(q('.athlete'), { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'expo.out' }, '-=0.15')
      .to(q('.rule'), { opacity: 0, duration: 0.4 }, '<')
      .to(q('.mark span'), { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.08 }, '-=0.6')
      .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 1.05, ease: 'expo.inOut' }, '+=0.35');
    const auto = window.setTimeout(() => tl.current?.play(), 1600);
    return () => { window.clearTimeout(auto); tl.current?.kill(); };
  }, []);

  return (
    <div ref={root} className="intro" role="dialog" aria-label="Introduction">
      <span className="rule" />
      <Athlete active={0} />
      <span className="mark" aria-hidden="true"><span>D</span><span>&amp;</span><span>D</span></span>
      <span className="seed" />
      <button className="enter" onClick={() => tl.current?.play()}>ENTREZ.</button>
      <button className="skip-btn" onClick={() => tl.current?.progress(1)}>PASSER →</button>
    </div>
  );
}
