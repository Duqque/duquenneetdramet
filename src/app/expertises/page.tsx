import type { Metadata } from 'next';
import { Lines } from '@/components/Lines';
import { CTA } from '@/components/Arrow';
import { EXPERTISES } from '@/content/data';

export const metadata: Metadata = {
  title: 'Expertises',
  description: 'Stratégie, innovation, expérience, marque, transformation, performance : six expertises pour changer le sport.',
  alternates: { canonical: '/expertises' },
};

export default function Expertises() {
  return (
    <>
      <section className="section">
        <Lines as="h1" className="display xl sentence" lines={['Les bonnes questions', 'précèdent toujours', 'les bonnes solutions.']} />
      </section>
      <section className="section tight">
        {EXPERTISES.map((e, i) => (
          <article className="pillar" key={e.slug} id={e.slug} data-cursor="">
            <div>
              <p className="eyebrow">0{i + 1}</p>
              <Lines className="display xl" lines={[e.name]} />
            </div>
            <p className="lead" data-fade>{e.line}</p>
          </article>
        ))}
      </section>
      <section className="section tight"><CTA href="/parlons-nous" solid>Lancer une conversation</CTA></section>
    </>
  );
}
