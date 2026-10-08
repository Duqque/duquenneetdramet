import type { Metadata } from 'next';
import { Frame } from '@/components/Frame';
import { TRANSFORMATIONS } from '@/content/data';

export const metadata: Metadata = {
  title: 'Transformations',
  description: 'Chaque transformation commence par une question. Découvrez ce que nous avons changé.',
  alternates: { canonical: '/transformations' },
};

const OUT = [5, 6, 4];

export default function Transformations() {
  const [first, ...rest] = TRANSFORMATIONS;
  return (
    <>
      <section className="ed p-head">
        <div className="in intro-ed">
          <p className="micro lbl" data-fade>Transformations ↘</p>
          <h1 className="h1" data-fade>Chaque transformation<br /><em>commence par une question.</em></h1>
          <p className="micro side" data-fade>Projets présentés à titre d’exemple — les études de cas réelles arrivent.</p>
        </div>
      </section>

      <section className="vis-wrap" style={{ paddingBottom: 'var(--section)' }} data-tone="light">
        <div className="gal">
          <Frame className="wide" outfit={OUT[0]} href={`/transformations/${first.slug}`} label={first.project} parallax pose={{ right: '14%', height: '104%' }}>
            <div className="cap"><p className="h3" style={{ color: '#fff', maxWidth: '18ch' }}>{first.punchline}</p><span className="micro">{first.sector} · {first.expertises.join(' · ')} ↗</span></div>
          </Frame>
          <div className="gal-2">
            {rest.map((t, k) => (
              <Frame key={t.slug} outfit={OUT[k + 1]} href={`/transformations/${t.slug}`} label={t.project} pose={{ right: k ? '10%' : '-6%', height: k ? '112%' : '118%' }}>
                <div className="cap"><p className="h4">{t.punchline}</p><span className="micro">{t.sector} ↗</span></div>
              </Frame>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
