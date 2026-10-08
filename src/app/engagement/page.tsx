import type { Metadata } from 'next';
import { Frame } from '@/components/Frame';
import { Btn } from '@/components/Arrow';
import { OBSERVATORY_THEMES, YOUTH_AXES } from '@/content/data';

export const metadata: Metadata = {
  title: 'Engagement',
  description: 'Observatoire du judo et Programme jeunes : agir pour le sport, pas seulement travailler pour lui.',
  alternates: { canonical: '/engagement' },
};

export default function Engagement() {
  return (
    <>
      <section className="ed p-head">
        <div className="in intro-ed">
          <p className="micro lbl" data-fade>Engagement · Judo ↘</p>
          <h1 className="h1" data-fade>Certains projets méritent d’exister<br /><em>avant même qu’on nous les demande.</em></h1>
          <p className="micro side" data-fade>Nous ne voulons pas seulement travailler pour le sport. Nous voulons aussi agir pour lui.</p>
        </div>
      </section>

      <section className="vis-wrap" data-tone="light">
        <Frame className="brand" outfit={0} parallax pose={{ right: '6%', height: '100%' }}
          lights={[{ x: '78%', y: '20%', s: '50%', c: 'rgba(102, 56, 255, 0.8)' }]}>
          <span className="micro kick-top">Engagement</span>
          <span className="logo-xl" style={{ fontSize: 'clamp(70px, 12vw, 190px)' }}>Judo</span>
        </Frame>
      </section>

      <section className="ed sec" id="observatoire" style={{ scrollMarginTop: 80 }}>
        <div className="in mag">
          <span className="num-id">01</span>
          <div className="wide-col">
            <p className="micro" data-fade>Observatoire du judo</p>
            <h2 className="h2" data-fade style={{ marginTop: 16 }}>Observer le judo<br /><em>pour imaginer celui de demain.</em></h2>
            <p className="micro" data-fade style={{ marginTop: 24, maxWidth: 360 }}>Une plateforme éditoriale : analyses, données et regards croisés sur le judo. Les premières publications arrivent.</p>
            <ul className="tags" data-fade style={{ marginTop: 40 }}>{OBSERVATORY_THEMES.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="vis-wrap" data-tone="light">
        <div className="gal-2">
          <Frame outfit={0} pose={{ right: '-10%', height: '120%' }} lights={[{ x: '70%', y: '30%', s: '70%', c: 'rgba(96, 54, 255, 0.75)' }]}>
            <div className="cap"><p className="h4">Analyses à venir</p><span className="micro">Observatoire</span></div>
          </Frame>
          <Frame outfit={0} pose={{ right: '20%', height: '108%' }} lights={[{ x: '30%', y: '40%', s: '60%', c: 'rgba(50, 59, 255, 0.7)' }]}>
            <div className="cap"><p className="h4">Former les sportifs de demain</p><span className="micro">Programme jeunes</span></div>
          </Frame>
        </div>
      </section>

      <section className="ed sec" id="programme-jeunes" style={{ scrollMarginTop: 80 }}>
        <div className="in mag">
          <span className="num-id">02</span>
          <div className="wide-col">
            <p className="micro" data-fade>Programme jeunes</p>
            <h2 className="h2" data-fade style={{ marginTop: 16 }}>Former aujourd’hui<br /><em>les sportifs de demain.</em></h2>
            <ul className="tags" data-fade style={{ marginTop: 40 }}>{YOUTH_AXES.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className="micro" data-fade style={{ marginTop: 24, maxWidth: 360 }}>Les données individuelles des jeunes sportifs sont strictement privées : elles ne sont jamais publiées.</p>
            <div data-fade style={{ marginTop: 40 }}><Btn href="/parlons-nous" variant="violet">Lancer une conversation</Btn></div>
          </div>
        </div>
      </section>
    </>
  );
}
