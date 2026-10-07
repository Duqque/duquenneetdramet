import Link from 'next/link';
import { SITE } from '@/lib/site';

export function Footer() {
  return (
    <footer className="footer">
      <span>{SITE.legal} — {SITE.tagline}</span>
      <span>Changer le sport. <span className="acid">De l’intuition au mouvement.</span></span>
      <Link href="/parlons-nous">Lancer une conversation →</Link>
    </footer>
  );
}
