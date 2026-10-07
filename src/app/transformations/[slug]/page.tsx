import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Lines } from '@/components/Lines';
import { CTA } from '@/components/Arrow';
import { STORY_STEPS, TRANSFORMATIONS } from '@/content/data';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TRANSFORMATIONS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = TRANSFORMATIONS.find((x) => x.slug === slug);
  if (!t) return {};
  return { title: t.project, description: t.punchline, alternates: { canonical: `/transformations/${t.slug}` } };
}

export default async function Transformation({ params }: Props) {
  const { slug } = await params;
  const t = TRANSFORMATIONS.find((x) => x.slug === slug);
  if (!t) notFound();
  const idx = TRANSFORMATIONS.indexOf(t);
  const next = TRANSFORMATIONS[(idx + 1) % TRANSFORMATIONS.length];

  return (
    <>
      <section className="section">
        <div className="meta tcard" style={{ border: 0, padding: 0 }}>
          <div className="meta">
            <span className="tag">{t.sector}</span>
            {t.expertises.map((x) => <span className="tag" key={x}>{x}</span>)}
          </div>
        </div>
        <Lines as="h1" className="display xl sentence" lines={[t.punchline]} />
        <p className="eyebrow" style={{ marginTop: 24 }}>{t.project} — {t.client}</p>
        <div className="visual" aria-hidden="true"><span>{t.impact.value}</span></div>
      </section>

      {STORY_STEPS.map((s, i) => (
        <section className={`section tight${i % 2 ? '' : ' light'}`} key={s.key}>
          <div className="grid2">
            <div>
              <p className="eyebrow">0{i + 1}</p>
              <Lines className="display lg" lines={[s.title]} />
              <p className="eyebrow" style={{ marginTop: 12 }}>{s.prompt}</p>
            </div>
            <p className="lead" data-fade style={{ maxWidth: '52ch' }}>{t.story[s.key]}</p>
          </div>
          {s.key === 'impact' && (
            <div style={{ marginTop: '6vh' }}>
              <div className="stat" style={{ color: 'var(--black)' }}>{t.impact.value}</div>
              <p className="eyebrow">{t.impact.label}</p>
            </div>
          )}
        </section>
      ))}

      <section className="section tight">
        <p className="eyebrow">Transformation suivante</p>
        <Link href={`/transformations/${next.slug}`} className="display xl sentence" data-cursor="VIEW">{next.punchline}</Link>
        <div style={{ marginTop: '6vh' }}><CTA href="/parlons-nous" solid>Lancer une conversation</CTA></div>
      </section>
    </>
  );
}
