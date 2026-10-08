import Link from 'next/link';
import { Lines } from '@/components/Lines';
import { CTA } from '@/components/Arrow';
import { LightBars } from '@/components/LightBars';
import { EXPERTISES, METHOD, PILLARS, TRANSFORMATIONS } from '@/content/data';

const VISUALS = ['v1', 'v2', 'v3'];
const CARDS = ['g1', 'g2', 'g3'];

export default function Home() {
  return (
    <>
      {/* 01 — La question */}
      <section className="sec hero">
        <LightBars />
        <div>
          <span className="tag dot sky" data-fade>Duquenne &amp; Dramet Consulting</span>
          <Lines as="h1" className="h-hero mt-m" lines={['Et si nous', 'changions', 'le sport ?']} />
        </div>
        <div className="hero-foot">
          <p className="lead" data-fade style={{ maxWidth: '34ch', color: 'rgba(255,255,255,.82)' }}>
            Un cabinet de conseil, d’innovation et de transformation dédié au sport.
          </p>
          <a href="#contexte" className="scroll-cue small" style={{ color: 'var(--white)' }}>
            Faites défiler <span className="circle" aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      {/* 02 — Le contexte */}
      <section className="sec full on-blue" id="contexte" style={{ justifyContent: 'center' }}>
        <div className="center" style={{ maxWidth: 1100 }}>
          <span className="tag dot">Le contexte</span>
          <Lines className="h-lg w-l mt-l" lines={['Le sport change.', 'Les usages changent.', 'Les technologies changent.', 'Les attentes changent.']} />
          <Lines className="h-xl w-l mt-l" lines={['Alors pourquoi', 'continuer à faire', 'comme avant ?']} />
        </div>
      </section>

      {/* 03 — D&D */}
      <section className="sec full halo" style={{ justifyContent: 'space-between' }}>
        <div className="hero-foot" data-fade>
          <span className="tag dot sky">Qui nous sommes</span>
          <span className="small">Conseil · Innovation · Transformation</span>
        </div>
        <div>
          <Lines as="h2" className="dd-word" lines={['D&D']} />
          <p className="h-md w-l center mt-m" data-fade>Duquenne &amp; Dramet <span className="ghost">Consulting</span></p>
        </div>
        <div className="hero-foot" data-fade>
          <span className="small" style={{ color: 'var(--white)', fontWeight: 500 }}>Un cabinet de conseil conçu comme un studio.</span>
          <CTA href="/expertises" variant="dark">Nos expertises</CTA>
        </div>
      </section>

      {/* 04 — Manifeste */}
      <section className="sec light">
        <span className="tag dot">Manifeste</span>
        <Lines className="h-xl mt-m" lines={['Nous croyons que', 'le sport peut être', 'plus vivant.']} />
        <div className="split mt-l">
          <div className="visual" data-fade style={{ aspectRatio: '4 / 3' }}><div className="v2" /></div>
          <div className="stack" style={{ '--gap': '28px' } as React.CSSProperties}>
            <p className="h-md w-l" data-fade>
              <span className="chev">»</span>Plus innovant. Plus humain. Plus ambitieux. <span className="em-blue">Plus mémorable.</span>
            </p>
            <p className="lead" data-fade>Nous cherchons ce qui doit changer. Puis nous construisons ce qui vient après.</p>
            <ul className="bars-list" data-fade>
              <li>Nous voulons contribuer à transformer le sport.</li>
              <li>Pas seulement l’accompagner.</li>
              <li>Le transformer, de l’intérieur et sur le terrain.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 05 — Les trois piliers */}
      <section className="sec light" style={{ paddingTop: 0 }}>
        <div className="split" style={{ alignItems: 'end' }}>
          <Lines className="h-lg" lines={['Trois piliers,', 'une conviction.']} />
          <p className="lead" data-fade>Émotion, innovation, engagement : ce qui fait vivre un sport est aussi ce qui le fait avancer.</p>
        </div>
        <div className="grid-3 mt-l">
          {PILLARS.map((p, i) => (
            <article key={p.name} className={`gcard ${CARDS[i]}`} data-fade>
              <span className="num">0{i + 1}</span>
              <div>
                <h3 className="h-lg">{p.name}</h3>
                <p className="mt-s" style={{ margin: '12px 0 0', color: 'rgba(255,255,255,.8)' }}>{p.line}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 06 — Méthode */}
      <section className="sec mist">
        <span className="tag dot">Méthode</span>
        <Lines className="h-xl mt-m" lines={['Une idée ne devient', 'jamais une transformation', 'par hasard.']} />
        <div className="mt-l">
          {METHOD.map((m) => (
            <div className="step" key={m.n} data-fade>
              <span className="n">{m.n}</span>
              <h3 className="h-lg">{m.name}</h3>
              <div className="verbs">{m.verbs.map((v) => <span key={v}>{v}</span>)}</div>
            </div>
          ))}
        </div>
        <p className="h-md w-l mt-l" data-fade>De l’intuition <span className="em-blue">au mouvement.</span></p>
      </section>

      {/* 07 — Expertises + panneau chiffres */}
      <section className="sec light">
        <div className="panel" data-fade>
          <div className="split" style={{ alignItems: 'end' }}>
            <div>
              <p className="small" style={{ color: '#3a3d4d', margin: 0 }}>Ce que nous savons faire</p>
              <div className="stat mt-s">6<span style={{ fontSize: '.35em', letterSpacing: '-.02em', marginLeft: '.3em' }}>expertises</span></div>
              <p className="lead mt-m" style={{ color: '#3a3d4d' }}>Une seule équipe pour relier stratégie, création, technologie et terrain.</p>
            </div>
            <div className="stat-card" style={{ justifySelf: 'end' }}>
              <div className="stat">4<span className="ghost">×</span></div>
              <p className="h-sm mt-s">Déceler, défier, dessiner, déclencher.</p>
              <p className="small" style={{ margin: '6px 0 0' }}>Une méthode en quatre temps</p>
            </div>
          </div>
        </div>

        <Lines className="h-lg mt-xl" lines={['Ce que nous savons faire.']} />
        <div className="grid-3 mt-l">
          {EXPERTISES.map((e) => (
            <Link key={e.slug} href={`/expertises#${e.slug}`} className="xcard" data-cursor="VIEW">
              <span className="label">{e.name}</span>
              <span className="go circle" aria-hidden="true">↗</span>
              <p>{e.line}</p>
            </Link>
          ))}
        </div>
        <div className="mt-l"><CTA href="/expertises" variant="dark">Découvrir nos expertises</CTA></div>
      </section>

      {/* 08 — Transformations */}
      <section className="sec">
        <div className="split" style={{ alignItems: 'end' }}>
          <Lines className="h-xl" lines={['Ce que nous', 'changeons.']} />
          <p className="lead" data-fade>Chaque projet commence par une question, et se termine par un mouvement.</p>
        </div>
        <div className="mt-l">
          {TRANSFORMATIONS.map((t, i) => (
            <Link key={t.slug} href={`/transformations/${t.slug}`} className="trow" data-cursor="VIEW">
              <span className="small">{t.sector}</span>
              <div className="thumb"><div className={VISUALS[i % 3]} /></div>
              <div>
                <p className="h-md title" style={{ margin: 0 }}>{t.punchline}</p>
                <p className="small" style={{ margin: '10px 0 0' }}>{t.project} · {t.expertises.join(' · ')}</p>
              </div>
              <span className="circle" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
        <div className="mt-l"><CTA href="/transformations" variant="line">Voir les transformations</CTA></div>
      </section>

      {/* 09 — Engagement */}
      <section className="sec full rings" style={{ justifyContent: 'center' }}>
        <div className="center" style={{ maxWidth: 1100 }}>
          <span className="tag dot sky">Engagement</span>
          <Lines className="h-xl mt-m" lines={['Nous ne voulons pas', 'seulement travailler', 'pour le sport.']} />
          <Lines className="h-lg mt-m grad-text" lines={['Nous voulons aussi agir pour lui.']} />
        </div>
        <div className="grid-2 mt-xl" style={{ maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
          <Link href="/engagement#observatoire" className="glass" data-fade data-cursor="OPEN">
            <span className="tag">Observatoire du judo</span>
            <p className="h-md w-l mt-m">Observer le judo pour imaginer celui de demain.</p>
          </Link>
          <Link href="/engagement#programme-jeunes" className="glass" data-fade data-cursor="OPEN">
            <span className="tag">Programme jeunes</span>
            <p className="h-md w-l mt-m">Former aujourd’hui les sportifs de demain.</p>
          </Link>
        </div>
        <div className="center mt-l"><CTA href="/engagement" variant="line">Découvrir notre engagement</CTA></div>
      </section>

      {/* 10 — Conversation */}
      <section className="sec full sky" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <Lines as="h2" className="h-hero w-xl" lines={['Et vous ?']} />
        <Lines className="h-lg w-l mt-m" lines={['Qu’aimeriez-vous changer ?']} />
        <div className="mt-l" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }} data-fade>
          <CTA href="/parlons-nous" variant="dark">Lancer une conversation</CTA>
          <CTA href="/transformations" variant="white">Nos transformations</CTA>
        </div>
      </section>
    </>
  );
}
