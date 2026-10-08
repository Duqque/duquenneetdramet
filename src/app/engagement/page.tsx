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
      <section className="sec full rings" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <span className="tag dot sky center" data-fade>Engagement · Judo</span>
        <Lines as="h1" className="h-xl mt-m" lines={['Certains projets méritent', 'd’exister avant même', 'qu’on nous les demande.']} />
      </section>

      <section className="sec light" id="observatoire">
        <div className="split">
          <div>
            <span className="tag dot">Observatoire du judo</span>
            <Lines className="h-xl mt-m" lines={['Observer le judo', 'pour imaginer', 'celui de demain.']} />
          </div>
          <div className="stack" style={{ alignSelf: 'end' }}>
            <p className="lead" data-fade>Une plateforme éditoriale : analyses, données et regards croisés sur le judo. Les premières publications arrivent.</p>
            <ul className="chips mt-m" data-fade>{OBSERVATORY_THEMES.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>
        <div className="grid-3 mt-xl">
          {['g1', 'g2', 'g3'].map((g, i) => (
            <article key={g} className={`gcard ${g}`} data-fade>
              <span className="num">Analyse 0{i + 1}</span>
              <p className="h-md w-l" style={{ margin: 0 }}>Publication à venir</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sec on-blue" id="programme-jeunes">
        <div className="split">
          <div>
            <span className="tag dot">Programme jeunes</span>
            <Lines className="h-xl mt-m" lines={['Former aujourd’hui', 'les sportifs', 'de demain.']} />
          </div>
          <div style={{ alignSelf: 'end' }}>
            <ul className="chips" data-fade>{YOUTH_AXES.map((a) => <li key={a}>{a}</li>)}</ul>
            <p className="lead mt-m" data-fade style={{ color: 'rgba(255,255,255,.85)' }}>Les données individuelles des jeunes sportifs sont strictement privées : elles ne sont jamais publiées.</p>
          </div>
        </div>
      </section>

      <section className="sec full sky" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <Lines className="h-xl w-l" lines={['Construisons-le', 'ensemble.']} />
        <div className="mt-l" data-fade><CTA href="/parlons-nous" variant="dark">Lancer une conversation</CTA></div>
      </section>
    </>
  );
}
