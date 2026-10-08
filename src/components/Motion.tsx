'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

declare global { interface Window { __lenis?: Lenis } }

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Défilement doux (Lenis) + animations d'entrée discrètes (opacité, 24 px, zoom 1.04 → 1, parallax ≤ 40 px). */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reduced()) return;
    const lenis = new Lenis({ lerp: 0.11 });
    window.__lenis = lenis;
    if (document.documentElement.classList.contains('intro-on')) lenis.stop();
    const resume = () => lenis.start();
    window.addEventListener('dd:intro-done', resume);
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      window.removeEventListener('dd:intro-done', resume);
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    if (reduced()) return;
    window.__lenis?.scrollTo(0, { immediate: true });
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('[data-fade]', {
        start: 'top 90%',
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.85, ease: 'expo.out', stagger: 0.09 }),
      });
      gsap.utils.toArray<HTMLElement>('[data-img]').forEach((el) => {
        const target = el.querySelector('.scene-in') ?? el.querySelector('.athlete');
        if (!target) return;
        gsap.to(target, { scale: 1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.fromTo(el, { y: -20 }, { y: 20, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { cancelAnimationFrame(id); ctx.revert(); };
  }, [pathname]);

  return null;
}
