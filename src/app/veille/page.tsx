import type { Metadata } from 'next';
import Link from 'next/link';
import { Btn } from '@/components/Arrow';
import { DOMAINS } from '@/content/cases';
import { getCases } from '@/lib/cases';

export const metadata: Metadata = {
  title: 'Veille — Case Intelligence',
  description: 'Clubs, marques, athlètes, fédérations, ligues : les cas réels qui transforment le sport, analysés par D&D.',
  alternates: { canonical: '/veille' },
};

export default async function Veille() {
  const cases = await getCases();
  const byDomain = DOMAINS.map((d) => ({ d, list: cases.filter((c) => c.category === d).sort((a, b) => a.order - b.order) })).filter((x) => x.list.length);

  return (
    <div className="ci" data-tone="light">
      <section className="ci-hero ed">
        <div className="in">
          <p className="ci-kick" data-fade>D&amp;D Case Intelligence · {cases.length} cas</p>
          <h1 className="ci-h1" data-fade>Le sport change.<br /><span>Nous regardons ceux qui le changent.</span></h1>
          <p className="ci-lead" data-fade>Clubs, marques, athlètes, fédérations, ligues. Nous observons celles et ceux qui déplacent les lignes du sport pour comprendre ce qu’ils peuvent nous apprendre.</p>
          <p className="ci-rule" data-fade>Problème → Réponse → Impact → D&amp;D Lens</p>
        </div>
      </section>

      <section className="ed ci-list">
        <div className="in">
          {byDomain.map(({ d, list }) => (
            <div key={d} className="ci-domain">
              <h2 className="ci-dom" data-fade><span>{pad(DOMAINS.indexOf(d) + 1)}</span>{d}</h2>
              <div>
                {list.map((c) => (
                  <Link key={c.id} href={`/veille/${c.id}`} className="ci-row" data-fade>
                    <span className="ci-year">{c.year}</span>
                    <span className="ci-title">{c.title}</span>
                    <span className="ci-q">{c.problem}</span>
                    <span className="ci-arr" aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
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

function pad(n: number) { return String(n).padStart(2, '0'); }
