import type { Metadata } from 'next';
import { Lines } from '@/components/Lines';
import { CTA } from '@/components/Arrow';
import { OBSERVATORY_THEMES, YOUTH_AXES } from '@/content/data';

export const metadata: Metadata = {
  title: 'Engagement',
  description: 'Observatoire du judo et Programme jeunes : agir pour le sport, pas seulement travailler pour lui.',
  alternates: { canonical: '/engagement' },
};

export default function Engagement() {
  return (
    <>
      <section className="section">
        <Lines as="h1" className="display xl sentence" lines={['Certains projets', 'méritent d’exister', 'avant même qu’on', 'nous les demande.']} />
      </section>

      <section className="section light" id="observatoire">
        <p className="eyebrow">Observatoire du judo</p>
        <Lines className="display lg sentence" lines={['Observer le judo', 'pour imaginer', 'celui de demain.']} />
        <div className="choices" style={{ marginTop: '8vh' }} data-fade>
          {OBSERVATORY_THEMES.map((t) => <span className="tag" style={{ borderColor: 'rgba(0,0,0,.3)', fontSize: '.9rem', padding: '8px 16px' }} key={t}>{t}</span>)}
        </div>
        <p className="lead" style={{ marginTop: '6vh' }} data-fade>Une plateforme éditoriale : analyses, données et regards croisés sur le judo. Les premières publications arrivent.</p>
      </section>

      <section className="section" id="programme-jeunes">
        <p className="eyebrow">Programme jeunes</p>
        <Lines className="display lg sentence" lines={['Former aujourd’hui', 'les sportifs de demain.']} />
        <ul className="choices" style={{ marginTop: '8vh', padding: 0, listStyle: 'none' }} data-fade>
          {YOUTH_AXES.map((a) => <li className="tag" style={{ fontSize: '.9rem', padding: '8px 16px' }} key={a}>{a}</li>)}
        </ul>
        <p className="lead" style={{ marginTop: '6vh' }} data-fade>Les données individuelles des jeunes sportifs sont strictement privées : elles ne sont jamais publiées.</p>
        <div style={{ marginTop: '8vh' }}><CTA href="/parlons-nous" solid>Lancer une conversation</CTA></div>
      </section>
    </>
  );
}
