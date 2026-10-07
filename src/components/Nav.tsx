'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV } from '@/lib/site';

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const cur = (href: string) => (path === href || path.startsWith(href + '/') ? 'page' : undefined);

  return (
    <>
      <header className="nav">
        <Link href="/" className="logo" aria-label="D&D Consulting — accueil">D&amp;D</Link>
        <nav aria-label="Navigation principale">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}><Link href={n.href} aria-current={cur(n.href)}>{n.label}</Link></li>
            ))}
            <li><Link href="/parlons-nous" className="cta" aria-current={cur('/parlons-nous')}>Parlons-nous</Link></li>
            <li><button className="menu-btn" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Fermer' : 'Menu'}</button></li>
          </ul>
        </nav>
      </header>
      {open && (
        <div className="mobile-menu">
          {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          <Link href="/parlons-nous" className="acid">Parlons-nous</Link>
        </div>
      )}
    </>
  );
}
