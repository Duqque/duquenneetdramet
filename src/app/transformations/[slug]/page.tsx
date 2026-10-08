import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Frame } from '@/components/Frame';
import { Btn } from '@/components/Arrow';
import { STORY_STEPS, TRANSFORMATIONS } from '@/content/data';

type Props = { params: Promise<{ slug: string }> };
const OUT = [5, 6, 4];

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
      <section className="ed p-head">
        <div className="in intro-ed">
          <p className="micro lbl" data-fade>{t.project} ↘</p>
          <h1 className="h1" data-fade>{t.punchline}</h1>
          <div className="side" data-fade>
            <ul className="tags"><li>{t.sector}</li>{t.expertises.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className="micro" style={{ marginTop: 12 }}>{t.client}</p>
          </div>
        </div>
      </section>

      <section className="vis-wrap" data-tone="light">
        <Frame className="wide" outfit={OUT[idx % 3]} parallax pose={{ right: '14%', height: '104%' }} />
      </section>

      <section className="ed sec">
        <div className="in">
          {STORY_STEPS.map((s, k) => (
            <div key={s.key} className="story" data-fade>
              <span className="num-id">0{k + 1}</span>
              <div><h2 className="h3">{s.title}</h2><p className="micro" style={{ marginTop: 8 }}>{s.prompt}</p></div>
              <p className="p">{t.story[s.key]}</p>
            </div>
          ))}
          <div className="stats" data-fade style={{ gridTemplateColumns: '1fr auto' }}>
            <div><p className="micro">L’impact</p><p className="big-num" style={{ marginTop: 20 }}>{t.impact.value}</p></div>
            <p className="micro" style={{ alignSelf: 'end' }}>{t.impact.label}</p>
          </div>
        </div>
      </section>

      <section className="ed" style={{ paddingBottom: 'var(--section)' }}>
        <div className="in">
          <Link href={`/transformations/${next.slug}`} className="list-row" data-fade>
            <span className="num-id">Suivant</span>
            <span className="h3">{next.punchline}</span>
            <span className="micro">{next.sector}</span>
            <span className="arrow" aria-hidden="true">↗</span>
          </Link>
          <div className="mt-l" data-fade style={{ marginTop: 48 }}><Btn href="/parlons-nous" variant="violet">Lancer une conversation</Btn></div>
        </div>
      </section>
    </>
  );
}
