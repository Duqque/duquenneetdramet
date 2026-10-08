import type { Metadata } from 'next';
import Link from 'next/link';
import { Lines } from '@/components/Lines';
import { TRANSFORMATIONS } from '@/content/data';

export const metadata: Metadata = {
  title: 'Transformations',
  description: 'Chaque transformation commence par une question. Découvrez ce que nous avons changé.',
  alternates: { canonical: '/transformations' },
};

const VISUALS = ['v1', 'v2', 'v3'];

export default function Transformations() {
  return (
    <>
      <section className="sec full halo-soft" style={{ justifyContent: 'flex-end' }}>
        <span className="tag dot sky" data-fade>Transformations</span>
        <Lines as="h1" className="h-hero mt-m" lines={['Chaque transformation', 'commence par', 'une question.']} />
      </section>

      <section className="sec light">
        {TRANSFORMATIONS.map((t, i) => (
          <Link key={t.slug} href={`/transformations/${t.slug}`} className="trow" data-cursor="VIEW">
            <span className="small">0{i + 1} — {t.sector}</span>
            <div className="thumb"><div className={VISUALS[i % 3]} /></div>
            <div>
              <h2 className="h-md title" style={{ margin: 0 }}>{t.punchline}</h2>
              <div className="meta" style={{ marginTop: 14 }}>
                <span className="tag">{t.project}</span>
                {t.expertises.map((x) => <span className="tag" key={x}>{x}</span>)}
              </div>
            </div>
            <span className="circle" aria-hidden="true">→</span>
          </Link>
        ))}
      </section>
    </>
  );
}
