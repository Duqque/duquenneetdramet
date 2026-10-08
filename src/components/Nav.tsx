'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV } from '@/lib/site';
import { Mark } from './Mark';

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const cur = (href: string) => (path === href || path.startsWith(href + '/') ? 'page' : undefined);

  return (
    <>
      <header className={`nav${scrolled && !open ? ' scrolled' : ''}`}>
        <Link href="/" className="logo" aria-label="D&D Consulting — accueil"><Mark /> D&amp;D Consulting</Link>
        <nav aria-label="Navigation principale">
          <ul className="nav-links">
            {NAV.map((n) => <li key={n.href}><Link href={n.href} aria-current={cur(n.href)}>{n.label}</Link></li>)}
          </ul>
        </nav>
        <div className="nav-right">
          <Link href="/parlons-nous" className="nav-cta" aria-current={cur('/parlons-nous')}>Parlons-nous <span className="ne" aria-hidden="true">↗</span></Link>
          <button className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? 'Fermer' : 'Menu'}</button>
        </div>
      </header>
      {open && (
        <div className="mobile-menu" id="mobile-menu">
          {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          <Link href="/parlons-nous" className="grad-text">Parlons-nous ↗</Link>
        </div>
      )}
    </>
  );
}
