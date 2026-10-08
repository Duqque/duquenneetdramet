import Link from 'next/link';
import { NAV, SITE } from '@/lib/site';

export function Footer() {
  return (
    <footer className="foot" data-tone="light">
      <div className="in">
        <div className="foot-top">
          <div>
            <p className="logo-f" style={{ margin: 0 }}>D&amp;D</p>
            <p style={{ margin: '14px 0 0', maxWidth: 240, lineHeight: 1.5 }}>Cabinet de conseil, d’innovation et de transformation dédié au sport.</p>
          </div>
          <div>
            <h3>Site</h3>
            <ul>
              <li><Link href="/">Accueil</Link></li>
              {NAV.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3>Engagement</h3>
            <ul>
              <li><Link href="/engagement#observatoire">Observatoire du judo</Link></li>
              <li><Link href="/engagement#programme-jeunes">Programme jeunes</Link></li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li><Link href="/parlons-nous">Prendre rendez-vous</Link></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-mid">
          <span>{SITE.legal}</span>
          <span>Par l’émotion. Par l’innovation. Par l’engagement.</span>
        </div>
        <div className="foot-bot">
          <span>© {new Date().getFullYear()} {SITE.legal}. Tous droits réservés. · <Link href="/mentions-legales">Mentions légales</Link></span>
          <span>Construit pour changer le sport.</span>
        </div>
      </div>
    </footer>
  );
}
