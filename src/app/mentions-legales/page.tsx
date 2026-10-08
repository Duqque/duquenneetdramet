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
    <section className="sec light" style={{ paddingTop: 'clamp(140px, 22vh, 220px)' }}>
      <h1 className="h-xl">Mentions légales</h1>
      <div className="split mt-l">
        <p className="small">Éditeur</p>
        <p className="lead">{SITE.legal} — informations légales à compléter (forme sociale, siège, SIREN, directeur de la publication, hébergeur).</p>
      </div>
      <hr className="hr mt-l" />
      <div className="split mt-l" id="confidentialite">
        <p className="small">Confidentialité</p>
        <p className="lead">Politique de confidentialité à compléter : données collectées via la prise de rendez-vous, finalités, durées de conservation, droits RGPD et contact.</p>
      </div>
    </section>
  );
}
