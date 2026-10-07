'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Révélations au scroll : lignes de titres + blocs [data-fade]. Respecte prefers-reduced-motion. */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('js');

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.to(el.querySelectorAll('.line > span'), {
          y: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pathname]);

  return null;
}
