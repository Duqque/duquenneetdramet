import Link from 'next/link';
import { NAV, SITE } from '@/lib/site';

export function Footer() {
  return (
    <footer className="foot">
      <div className="foot-card">
        <div className="foot-top">
          <div>
            <p className="small" style={{ margin: '0 0 14px', color: 'rgba(255,255,255,.72)' }}>Changer le sport.</p>
            <a className="foot-mail" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <ul className="foot-nav">
              {NAV.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}
              <li><Link href="/parlons-nous">Parlons-nous</Link></li>
            </ul>
          </div>
          <div className="foot-cta">
            <p className="h-sm">Qu’aimeriez-vous changer&nbsp;?</p>
            <p>Choisissez un sujet, une durée, un créneau. Nous ouvrons la conversation.</p>
            <Link href="/parlons-nous" className="btn btn-white">Lancer une conversation</Link>
          </div>
        </div>

        <div className="foot-row">
          <span>Par l’émotion</span>
          <span>Par l’innovation</span>
          <span>Par l’engagement</span>
          <span>De l’intuition au mouvement</span>
        </div>
        <hr className="hr" style={{ background: 'rgba(255,255,255,.22)' }} />
        <span className="foot-word" aria-hidden="true">D&amp;D Consulting</span>

        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} {SITE.legal}. Tous droits réservés.</span>
          <nav aria-label="Informations légales">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/mentions-legales#confidentialite">Confidentialité</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
