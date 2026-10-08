import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Btn } from '@/components/Arrow';
import { CASES, rotationOrder } from '@/content/cases';
import { getCases } from '@/lib/cases';

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return CASES.filter((c) => c.active).map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const c = (await getCases()).find((x) => x.id === id);
  if (!c) return {};
  return { title: `${c.title} — Case Intelligence`, description: c.problem, alternates: { canonical: `/veille/${c.id}` } };
}

export default async function CasePage({ params }: Props) {
  const { id } = await params;
  const seq = rotationOrder(await getCases());
  const k = seq.findIndex((x) => x.id === id);
  if (k < 0) notFound();
  const c = seq[k];
  const prev = seq[(k - 1 + seq.length) % seq.length];
  const next = seq[(k + 1) % seq.length];
  const tags = [c.category, ...c.secondary_categories].slice(0, 3);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="ci" data-tone="light">
      <section className="ed ci-hero ci-case">
        <div className="in">
          <p className="ci-kick" data-fade><Link href="/veille">Case Intelligence</Link> · {pad(k + 1)} / {pad(seq.length)} · {c.category} · {c.year}</p>
          <h1 className="ci-h1" data-fade>{c.title}</h1>
          <p className="ci-org" data-fade>{c.organization}</p>
        </div>
      </section>

      <section className="ed ci-detail">
        <div className="in">
          <div className="ci-block" data-fade><h2 className="ci-lbl">Problématique</h2><p className="ci-big">{c.problem}</p></div>
          <div className="ci-block" data-fade><h2 className="ci-lbl">Réponse</h2><p>{c.solution}</p></div>
          <div className="ci-block" data-fade><h2 className="ci-lbl">Impact</h2><p>{c.impact}</p></div>
          <div className="ci-block ci-lensb" data-fade><h2 className="ci-lbl">D&amp;D Lens</h2><p className="ci-big">{c.dd_lens}</p></div>
          <div className="ci-block" data-fade>
            <h2 className="ci-lbl">Sources</h2>
            <ul className="ci-src">
              <li><a href={c.source_url} target="_blank" rel="noopener noreferrer">{c.source_name} ↗</a></li>
              {c.more_sources?.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.name} ↗</a></li>)}
            </ul>
            <p className="ci-tags">{tags.join(' · ')}</p>
          </div>
        </div>
      </section>

      <section className="ed ci-nav">
        <div className="in">
          <Link href={`/veille/${prev.id}`} className="ci-pn"><span className="ci-lbl">← Précédent</span><span>{prev.title}</span></Link>
          <Link href={`/veille/${next.id}`} className="ci-pn ci-pn-r"><span className="ci-lbl">Suivant →</span><span>{next.title}</span></Link>
        </div>
      </section>

      <section className="ed ci-end">
        <div className="in">
          <h2 className="ci-h1" data-fade>À vous de jouer.</h2>
          <p className="ci-lead" data-fade>Le problème était sportif.<br />La réponse ne l’était pas.</p>
          <div data-fade style={{ marginTop: 32 }}><Btn href="/parlons-nous" variant="violet">Parlons de votre problème</Btn></div>
        </div>
      </section>
    </div>
  );
}
