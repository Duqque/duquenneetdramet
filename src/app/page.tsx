import { Lines } from '@/components/Lines';
import { CTA } from '@/components/Arrow';
import Link from 'next/link';
import { EXPERTISES, PILLARS, METHOD, TRANSFORMATIONS } from '@/content/data';

export default function Home() {
  return (
    <>
      {/* 01 — Question */}
      <section className="section" aria-labelledby="q">
        <Lines as="h1" className="display mega" lines={['Et si nous', 'changions', 'le sport ?']} />
        <span id="q" className="hp">Et si nous changions le sport ?</span>
        <p className="eyebrow" data-fade style={{ marginTop: '6vh' }}>Faites défiler ↓</p>
      </section>

      {/* 02 — Contexte */}
      <section className="section">
        <div className="offset">
          <Lines className="display lg sentence" lines={['Le sport change.', 'Les usages changent.', 'Les technologies changent.', 'Les attentes changent.']} />
          <Lines className="display xl" lines={['Alors pourquoi', 'continuer à faire', 'comme avant ?']} />
        </div>
      </section>

      {/* 03 — D&D */}
      <section className="section">
        <Lines as="h2" className="display mega acid" lines={['D&D']} />
        <p className="lead" data-fade style={{ marginTop: '4vh', fontSize: 'clamp(1.2rem,2.4vw,2.2rem)', maxWidth: 'none', color: 'var(--paper)' }}>Duquenne &amp; Dramet Consulting</p>
        <p className="eyebrow" data-fade>Conseil · Innovation · Transformation</p>
      </section>

      {/* 04 — Manifeste */}
      <section className="section light">
        <p className="eyebrow">Manifeste</p>
        <Lines className="display xl sentence" lines={['Nous croyons que le sport', 'peut être plus vivant.']} />
        <div className="offset">
          <Lines className="display lg" lines={['Plus innovant.', 'Plus humain.', 'Plus ambitieux.', 'Plus mémorable.']} />
          <p className="lead" data-fade style={{ marginTop: '5vh' }}>Nous voulons contribuer à le transformer.</p>
        </div>
      </section>

      {/* 05 — Piliers */}
      <section className="section">
        <p className="eyebrow">Trois piliers</p>
        {PILLARS.map((p) => (
          <div className="pillar" key={p.name}>
            <Lines className="display xl" lines={[p.name]} />
            <p className="lead" data-fade>{p.line}</p>
          </div>
        ))}
      </section>

      {/* 06 — Méthode */}
      <section className="section light">
        <Lines className="display lg sentence" lines={['Une idée ne devient jamais', 'une transformation par hasard.']} />
        <div className="steps">
          {METHOD.map((m) => (
            <div className="step" key={m.n} data-fade>
              <span className="num">{m.n}</span>
              <h3 className="display lg">{m.name}</h3>
              <ul>{m.verbs.map((v) => <li key={v}>{v}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="display md sentence" style={{ marginTop: '8vh' }} data-fade>De l’intuition au mouvement.</p>
      </section>

      {/* 07 — Expertises */}
      <section className="section">
        <Lines className="display lg sentence" lines={['Ce que nous savons faire.']} />
        <div style={{ margin: '8vh 0' }}>
          {EXPERTISES.map((e) => (
            <Link key={e.slug} href="/expertises" className="exp" data-cursor="VIEW">
              <span className="display lg">{e.name}</span>
              <span className="desc">{e.line}</span>
            </Link>
          ))}
        </div>
        <div><CTA href="/expertises">Découvrir nos expertises</CTA></div>
      </section>

      {/* 08 — Transformations */}
      <section className="section">
        <Lines className="display lg sentence" lines={['Ce que nous changeons.']} />
        <div style={{ margin: '6vh 0' }}>
          {TRANSFORMATIONS.map((t) => (
            <Link key={t.slug} href={`/transformations/${t.slug}`} className="tcard" data-cursor="VIEW">
              <div className="meta">
                <span className="tag">{t.sector}</span>
                {t.expertises.map((x) => <span className="tag" key={x}>{x}</span>)}
              </div>
              <h3 className="display xl sentence">{t.punchline}</h3>
              <p className="eyebrow" style={{ marginTop: 16 }}>{t.project} — {t.client}</p>
            </Link>
          ))}
        </div>
        <div><CTA href="/transformations">Voir les transformations</CTA></div>
      </section>

      {/* 09 — Engagement */}
      <section className="section light">
        <Lines className="display lg sentence" lines={['Nous ne voulons pas seulement', 'travailler pour le sport.']} />
        <Lines className="display lg sentence" lines={['Nous voulons aussi', 'agir pour lui.']} />
        <div className="grid2" style={{ margin: '8vh 0' }}>
          <div data-fade>
            <h3 className="display lg">Observatoire du judo</h3>
            <p className="lead" style={{ marginTop: 12 }}>Observer le judo pour imaginer celui de demain.</p>
          </div>
          <div data-fade>
            <h3 className="display lg">Programme jeunes</h3>
            <p className="lead" style={{ marginTop: 12 }}>Former aujourd’hui les sportifs de demain.</p>
          </div>
        </div>
        <div><CTA href="/engagement">Découvrir notre engagement</CTA></div>
      </section>

      {/* 10 — Conversation */}
      <section className="section">
        <Lines as="h2" className="display mega" lines={['Et vous ?']} />
        <Lines className="display lg acid" lines={['Qu’aimeriez-vous changer ?']} />
        <div style={{ marginTop: '8vh' }}><CTA href="/parlons-nous" solid>Lancer une conversation</CTA></div>
      </section>
    </>
  );
}
