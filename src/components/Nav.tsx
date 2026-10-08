'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NAV } from '@/lib/site';

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<'dark' | 'light'>('dark');
  const [solid, setSolid] = useState(false);
  const raf = useRef(0);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    // La navigation s'éclaircit au-dessus des zones sombres ([data-tone="light"]).
    const check = () => {
      raf.current = 0;
      const y = 36;
      let light = false;
      document.querySelectorAll<HTMLElement>('[data-tone="light"]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom >= y) light = true;
      });
      setTone(light ? 'light' : 'dark');
      setSolid(window.scrollY > 10);
    };
    const on = () => { if (!raf.current) raf.current = requestAnimationFrame(check); };
    check();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, [path]);

  const cur = (href: string) => (path === href || path.startsWith(href + '/') ? 'page' : undefined);

  return (
    <>
      <header className={`nav${solid ? ' solid' : ''}`} data-tone={open ? 'dark' : tone}>
        <Link href="/" className="logo" aria-label="D&D Consulting — accueil">D&amp;D</Link>
        <nav aria-label="Navigation principale">
          <ul className="nav-links">
            <li><Link href="/" aria-current={path === '/' ? 'page' : undefined}>Accueil</Link></li>
            {NAV.map((n) => <li key={n.href}><Link href={n.href} aria-current={cur(n.href)}>{n.label}</Link></li>)}
          </ul>
        </nav>
        <div className="nav-r">
          <Link href="/parlons-nous" className="btn btn-dark">Parlons-nous</Link>
          <button className="menu-btn" aria-expanded={open} aria-controls="m-menu" onClick={() => setOpen(!open)}>{open ? 'Fermer' : 'Menu'}</button>
        </div>
      </header>
      {open && (
        <div className="m-menu" id="m-menu">
          <Link href="/">Accueil</Link>
          {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          <Link href="/parlons-nous" className="btn btn-violet">Lancer une conversation</Link>
        </div>
      )}
    </>
  );
}
