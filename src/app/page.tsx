import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { Intro } from '@/components/home/Intro';
import { Athlete } from '@/components/Athlete';
import { Frame } from '@/components/Frame';
import { Btn } from '@/components/Arrow';
import { EXPERTISES, METHOD, TRANSFORMATIONS } from '@/content/data';

// Chaque expertise est incarnée par une discipline (index de tenue dans OUTFITS).
const SHOW = [
  { slug: 'strategie', outfit: 6 },
  { slug: 'innovation', outfit: 5, cls: 'low' },
  { slug: 'transformation', outfit: 0, main: true },
  { slug: 'experience', outfit: 4, cls: 'tiny' },
  { slug: 'marque', outfit: 1, cls: 'low tiny' },
  { slug: 'performance', outfit: 11 },
];

const BARS = Array.from({ length: 64 }, (_, k) => 30 + 55 * Math.abs(Math.sin(k * 0.37) * Math.cos(k * 0.11)) + (k > 56 ? 15 : 0));

export default function Home() {
  const [t1, t2, t3] = TRANSFORMATIONS;
  return (
    <>
      <Intro />
      <Hero />

      {/* 01 — Intro éditoriale */}
      <section className="ed sec">
        <div className="in intro-ed">
          <p className="micro lbl" data-fade>Duquenne &amp; Dramet Consulting ↘</p>
          <h2 className="h1" data-fade>Le sport change.<br /><em>Nous changeons la manière de le faire.</em></h2>
          <p className="micro side" data-fade>Cabinet de conseil, d’innovation et de transformation dédié au sport. Stratégie, création, technologie et terrain, réunis dans une seule équipe.</p>
        </div>

        {/* 02 — Les expertises, présentées comme une collection */}
        <div className="in">
          <div className="show">
            {SHOW.map((s) => {
              const e = EXPERTISES.find((x) => x.slug === s.slug)!;
              return (
                <Link key={s.slug} href={`/expertises#${s.slug}`} className={`prod${s.main ? ' main' : ''} ${s.cls ?? ''}`} data-fade>
                  <div className="card"><Athlete active={s.outfit} /></div>
                  <div className="lab">
                    <div style={{ display: 'grid', gap: 3 }}>
                      <span className="micro b up">{e.name}</span>
                      <span className="micro dim">{e.line}</span>
                    </div>
                    {s.main && <span className="pill">Signature</span>}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="show-foot"><Link href="/expertises" className="link-arr">Six expertises ↗</Link></div>
        </div>
      </section>

      {/* 03 — Manifeste */}
      <section className="ed" style={{ paddingBottom: 'var(--section)' }}>
        <div className="in man">
          <div><span className="pill-line" data-fade>Manifeste</span></div>
          <div>
            <p className="h-man" data-fade>
              Nous croyons que le sport peut être plus vivant, plus innovant, plus humain. Nous cherchons ce qui doit changer, <em>puis nous construisons ce qui vient après — avec exigence, sur le terrain, jusqu’à ce que chaque idée devienne un mouvement.</em>
            </p>
            <p className="micro" data-fade>Par l’émotion. Par l’innovation. Par l’engagement. Trois convictions qui guident chacune de nos transformations.</p>
          </div>
        </div>
      </section>

      {/* 04 — Immersion */}
      <section className="vis-wrap" data-tone="light">
        <div className="gal-head ed" style={{ padding: 0 }}>
          <span className="micro">Ce que nous changeons</span>
          <Link href="/transformations" className="link-arr">Toutes les transformations ↗</Link>
        </div>
        <div className="gal">
          <Frame className="wide" outfit={5} parallax pose={{ right: '14%', height: '104%' }}
            lights={[{ x: '58%', y: '28%', s: '48%', c: 'rgba(102, 56, 255, 0.8)' }, { x: '82%', y: '90%', s: '40%', c: 'rgba(50, 59, 255, 0.55)' }]}>
            <span className="top">D&amp;D</span>
            <div className="over">
              <p className="t-img">Chaque transformation<br />commence par une question.</p>
              <Btn href={`/transformations/${t1.slug}`} variant="violet">Découvrir</Btn>
            </div>
          </Frame>

          {/* 05 — Grille visuelle */}
          <div className="gal-2">
            <Frame outfit={6} href={`/transformations/${t2.slug}`} label={t2.project} pose={{ right: '-6%', height: '118%' }}
              lights={[{ x: '70%', y: '35%', s: '70%', c: 'rgba(96, 54, 255, 0.75)' }]}>
              <div className="cap"><p className="h4">{t2.punchline}</p><span className="micro">{t2.sector} ↗</span></div>
            </Frame>
            <Frame outfit={4} href={`/transformations/${t3.slug}`} label={t3.project} pose={{ right: '10%', height: '112%' }}
              lights={[{ x: '40%', y: '30%', s: '65%', c: 'rgba(50, 59, 255, 0.7)' }, { x: '90%', y: '80%', s: '40%', c: 'rgba(128, 94, 255, 0.5)' }]}>
              <div className="cap"><p className="h4">{t3.punchline}</p><span className="micro">{t3.sector} ↗</span></div>
            </Frame>
          </div>
        </div>
      </section>

      {/* 06 — Méthode, comme un rapport technique */}
      <section className="ed sec" style={{ paddingTop: 150 }}>
        <div className="in">
          <div className="mag">
            <span className="logo-s" data-fade>D&amp;D</span>
            <div className="wide-col">
              <h2 className="h2" data-fade>Une idée ne devient jamais<br /><span>une transformation par hasard.</span><br /><em>De l’intuition au mouvement, en quatre temps.</em></h2>
              <p className="micro mt-s" data-fade style={{ marginTop: 24, maxWidth: 360 }}>Notre méthode relie l’observation du terrain, la remise en question, la conception et le déploiement mesuré.</p>
            </div>
          </div>

          {/* 07 — Les quatre temps */}
          <div className="feat">
            {METHOD.map((m, k) => (
              <div key={m.n}>
                <Link href="/expertises" className="feat-row" data-fade>
                  <span className="num-id">{m.n}</span>
                  <div className="kick">
                    <span className="micro">Temps {k + 1} sur 4</span>
                    <span className="h4">{m.name}</span>
                  </div>
                  <span className="micro">{m.verbs.join(' ')}</span>
                  <span className="arrow" aria-hidden="true">↗</span>
                </Link>
                {k === 0 && (
                  <div className="stats" data-fade>
                    <div>
                      <div className="mini"><Athlete active={9} /></div>
                      <p className="micro b up" style={{ marginTop: 10 }}>Méthode D&amp;D</p>
                    </div>
                    <div>
                      <p className="micro">Du constat au déploiement</p>
                      <p className="h4" style={{ marginTop: 6 }}>Quatre temps, douze actions</p>
                      <p className="big-num" style={{ marginTop: 28 }}>4<small>/ temps</small></p>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}><span className="micro">Déceler</span><span className="micro">Déclencher</span></div>
                      <div className="bars" aria-hidden="true">{BARS.map((h, j) => <i key={j} className={j > 56 ? 'hi' : ''} style={{ height: `${h}%` }} />)}</div>
                      <div className="meta"><span className="micro" style={{ color: 'var(--text-1)' }}>12 actions</span><Link href="/expertises" className="btn btn-dark" style={{ height: 26, fontSize: 9, padding: '0 12px' }}>Voir</Link></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — Image de marque : l'engagement judo */}
      <section className="vis-wrap" data-tone="light">
        <Frame className="brand" outfit={0} href="/engagement" label="Notre engagement dans le judo" parallax pose={{ right: '6%', height: '100%' }}
          lights={[{ x: '78%', y: '20%', s: '50%', c: 'rgba(102, 56, 255, 0.8)' }, { x: '30%', y: '110%', s: '60%', c: 'rgba(24, 0, 90, 0.9)' }]}>
          <span className="micro kick-top">Observatoire du judo · Programme jeunes</span>
          <span className="logo-xl">D&amp;D</span>
          <span className="micro kick-bot">Nous ne voulons pas seulement travailler pour le sport. Nous voulons aussi agir pour lui.</span>
        </Frame>
      </section>

      {/* 09 — Conversation */}
      <section className="final ed">
        <div className="in">
          <div className="cta-block">
            <h2 className="h1" data-fade>Et vous ?<br /><em>Qu’aimeriez-vous changer ?</em></h2>
            <p className="micro" data-fade style={{ maxWidth: 260 }}>Choisissez un sujet, une durée, un créneau. Nous ouvrons la conversation.</p>
            <div data-fade><Btn href="/parlons-nous" variant="violet">Lancer une conversation</Btn></div>
          </div>
        </div>
      </section>
    </>
  );
}
