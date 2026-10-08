import type { Metadata } from 'next';
import Link from 'next/link';
import { Athlete } from '@/components/Athlete';
import { Frame } from '@/components/Frame';
import { Btn } from '@/components/Arrow';
import { EXPERTISES, METHOD } from '@/content/data';

export const metadata: Metadata = {
  title: 'Expertises',
  description: 'Stratégie, innovation, expérience, marque, transformation, performance : six expertises pour changer le sport.',
  alternates: { canonical: '/expertises' },
};

const OUTFIT: Record<string, number> = { strategie: 6, innovation: 5, experience: 4, marque: 1, transformation: 0, performance: 11 };

export default function Expertises() {
  return (
    <>
      <section className="ed p-head">
        <div className="in intro-ed">
          <p className="micro lbl" data-fade>Expertises ↘</p>
          <h1 className="h1" data-fade>Les bonnes questions<br /><em>précèdent toujours les bonnes solutions.</em></h1>
          <p className="micro side" data-fade>Six expertises, une seule équipe. Chaque mission les combine selon ce qui doit changer.</p>
        </div>
      </section>

      <section className="ed" style={{ paddingBottom: 'var(--section)' }}>
        <div className="in">
          {EXPERTISES.map((e, k) => (
            <div key={e.slug} id={e.slug} className="list-row" data-fade style={{ scrollMarginTop: 100 }}>
              <span className="num-id">0{k + 1}</span>
              <h2 className="h2">{e.name}</h2>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <p className="p">{e.line}</p>
                <div className="prod" style={{ width: 96, flex: 'none' }}><div className="card"><Athlete active={OUTFIT[e.slug]} /></div></div>
              </div>
              <span className="arrow" aria-hidden="true">↗</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ed" style={{ paddingBottom: 'var(--section)' }}>
        <div className="in mag">
          <span className="logo-s">D&amp;D</span>
          <div className="wide-col">
            <h2 className="h2" data-fade>Une méthode en quatre temps.<br /><em>De l’intuition au mouvement.</em></h2>
            <div className="feat">
              {METHOD.map((m) => (
                <div key={m.n} className="feat-row" data-fade style={{ gridTemplateColumns: '60px 1fr 1fr' }}>
                  <span className="num-id">{m.n}</span>
                  <span className="h4">{m.name}</span>
                  <span className="micro">{m.verbs.join(' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="vis-wrap" style={{ paddingBottom: 'var(--section)' }} data-tone="light">
        <Frame className="wide" outfit={3} parallax pose={{ right: '12%', height: '104%' }}>
          <div className="over">
            <p className="t-img">Une question en tête ?</p>
            <Btn href="/parlons-nous" variant="violet">Lancer une conversation</Btn>
          </div>
        </Frame>
      </section>
    </>
  );
}
