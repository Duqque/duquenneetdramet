import type { Metadata } from 'next';
import Link from 'next/link';
import { Lines } from '@/components/Lines';
import { TRANSFORMATIONS } from '@/content/data';

export const metadata: Metadata = {
  title: 'Transformations',
  description: 'Chaque transformation commence par une question. Découvrez ce que nous avons changé.',
  alternates: { canonical: '/transformations' },
};

export default function Transformations() {
  return (
    <>
      <section className="section">
        <Lines as="h1" className="display xl sentence" lines={['Chaque transformation', 'commence par', 'une question.']} />
      </section>
      <section className="section tight">
        {TRANSFORMATIONS.map((t, i) => (
          <Link key={t.slug} href={`/transformations/${t.slug}`} className="tcard" data-cursor="VIEW">
            <div className="meta">
              <span className="tag">0{i + 1}</span>
              <span className="tag">{t.sector}</span>
              {t.expertises.map((x) => <span className="tag" key={x}>{x}</span>)}
            </div>
            <h2 className="display xl sentence">{t.punchline}</h2>
            <div className="visual" aria-hidden="true"><span>{t.impact.value}</span></div>
            <p className="eyebrow">{t.project} — {t.client}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
