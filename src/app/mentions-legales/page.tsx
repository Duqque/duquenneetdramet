import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales et politique de confidentialité de D&D Consulting.',
  alternates: { canonical: '/mentions-legales' },
  robots: { index: false },
};

export default function Legal() {
  return (
    <>
      <section className="ed p-head">
        <div className="in intro-ed">
          <p className="micro lbl">Informations ↘</p>
          <h1 className="h1">Mentions légales</h1>
          <p className="micro side">Contenu à compléter.</p>
        </div>
      </section>
      <section className="ed" style={{ paddingBottom: 'var(--section)' }}>
        <div className="in">
          <div className="story"><span className="num-id">01</span><h2 className="h3">Éditeur</h2><p className="p">{SITE.legal} — forme sociale, siège, SIREN, directeur de la publication et hébergeur à compléter.</p></div>
          <div className="story" id="confidentialite"><span className="num-id">02</span><h2 className="h3">Confidentialité</h2><p className="p">Données collectées via la prise de rendez-vous, finalités, durées de conservation, droits RGPD et contact : à compléter.</p></div>
        </div>
      </section>
    </>
  );
}
