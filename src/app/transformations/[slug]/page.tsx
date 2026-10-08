import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Lines } from '@/components/Lines';
import { CTA } from '@/components/Arrow';
import { STORY_STEPS, TRANSFORMATIONS } from '@/content/data';

type Props = { params: Promise<{ slug: string }> };

const VISUALS = ['v1', 'v2', 'v3'];

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
      <section className="sec full halo-soft" style={{ justifyContent: 'flex-end' }}>
        <div className="meta" data-fade>
          <span className="tag dot sky">{t.sector}</span>
          {t.expertises.map((x) => <span className="tag" key={x}>{x}</span>)}
        </div>
        <Lines as="h1" className="h-xl mt-m" lines={[t.punchline]} />
        <p className="small mt-m">{t.project} — {t.client}</p>
      </section>

      <section className="sec light" style={{ paddingTop: 0, paddingBottom: 0, background: 'linear-gradient(180deg, var(--ink) 50%, var(--white) 50%)' }}>
        <div className="visual" data-fade><div className={VISUALS[idx % 3]} /></div>
      </section>

      <section className="sec light">
        {STORY_STEPS.map((s, i) => (
          <div className="step" key={s.key} data-fade style={{ gridTemplateColumns: undefined }}>
            <span className="n">0{i + 1}</span>
            <div>
              <h2 className="h-lg">{s.title}</h2>
              <p className="small" style={{ margin: '8px 0 0' }}>{s.prompt}</p>
            </div>
            <p className="lead" style={{ maxWidth: '46ch' }}>{t.story[s.key]}</p>
          </div>
        ))}
      </section>

      <section className="sec light" style={{ paddingTop: 0 }}>
        <div className="panel" data-fade>
          <p className="small" style={{ color: '#3a3d4d', margin: 0 }}>L’impact</p>
          <div className="stat mt-s">{t.impact.value}</div>
          <p className="lead mt-s" style={{ color: '#3a3d4d' }}>{t.impact.label}</p>
        </div>
      </section>

      <section className="sec rings full" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <span className="tag dot sky center">Transformation suivante</span>
        <Link href={`/transformations/${next.slug}`} className="h-xl mt-m" style={{ display: 'block' }} data-cursor="VIEW">{next.punchline}</Link>
        <div className="mt-l"><CTA href="/parlons-nous">Lancer une conversation</CTA></div>
      </section>
    </>
  );
}
