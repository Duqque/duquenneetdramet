import type { Metadata } from 'next';
import { Lines } from '@/components/Lines';
import { CTA } from '@/components/Arrow';
import { LightBars } from '@/components/LightBars';
import { EXPERTISES } from '@/content/data';

export const metadata: Metadata = {
  title: 'Expertises',
  description: 'Stratégie, innovation, expérience, marque, transformation, performance : six expertises pour changer le sport.',
  alternates: { canonical: '/expertises' },
};

const CARDS = ['g1', 'g2', 'g3', 'g4', 'g3', 'g1'];

export default function Expertises() {
  return (
    <>
      <section className="sec hero">
        <LightBars count={22} seed={4} />
        <div>
          <span className="tag dot sky" data-fade>Expertises</span>
          <Lines as="h1" className="h-xl mt-m" lines={['Les bonnes questions', 'précèdent toujours', 'les bonnes solutions.']} />
        </div>
        <p className="lead" data-fade style={{ color: 'rgba(255,255,255,.82)' }}>Six expertises, une seule équipe, un même objectif : faire avancer votre organisation.</p>
      </section>

      <section className="sec light">
        <div className="grid-3">
          {EXPERTISES.map((e, i) => (
            <article key={e.slug} id={e.slug} className={`gcard ${CARDS[i]}`} data-fade style={{ scrollMarginTop: 100 }}>
              <span className="num">0{i + 1}</span>
              <div>
                <h2 className="h-lg">{e.name}</h2>
                <p style={{ margin: '12px 0 0', color: 'rgba(255,255,255,.82)' }}>{e.line}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sec full sky" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <Lines className="h-xl w-l" lines={['Une question', 'en tête ?']} />
        <div className="mt-l" data-fade><CTA href="/parlons-nous" variant="dark">Lancer une conversation</CTA></div>
      </section>
    </>
  );
}
