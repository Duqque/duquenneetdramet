import Link from 'next/link';
import { Athlete } from './Athlete';

/**
 * Visuel « photographique » sombre : l'athlète en contre-jour, éclairé en violet / bleu électrique.
 * Remplace les photos tant qu'elles ne sont pas fournies (la lumière est dans la scène, pas un filtre).
 */
export type Light = { x: string; y: string; s: string; c: string };

const DEFAULT_LIGHTS: Light[] = [
  { x: '62%', y: '30%', s: '55%', c: 'rgba(102, 56, 255, 0.75)' },
  { x: '20%', y: '95%', s: '45%', c: 'rgba(50, 59, 255, 0.45)' },
];

export function Frame({
  outfit = 0,
  className = '',
  pose,
  lights = DEFAULT_LIGHTS,
  href,
  label,
  parallax,
  children,
}: {
  outfit?: number;
  className?: string;
  pose?: React.CSSProperties;
  lights?: Light[];
  href?: string;
  label?: string;
  parallax?: boolean;
  children?: React.ReactNode;
}) {
  const inner = (
    <>
      <div className="scene" data-parallax={parallax ? '' : undefined}>
        <div className="scene-in" style={{ background: 'radial-gradient(120% 90% at 70% 100%, #18005a 0%, #020323 48%, #02030a 100%)' }}>
          {lights.map((l, i) => (
            <span key={i} className="light" style={{ left: l.x, top: l.y, width: l.s, aspectRatio: '1', background: l.c, transform: 'translate(-50%, -50%)' }} />
          ))}
          <Athlete active={outfit} style={{ right: '8%', height: '96%', ...pose }} />
          <span className="grain" />
        </div>
      </div>
      {children}
    </>
  );
  if (href) {
    return <Link href={href} className={`frame ${className}`} data-img aria-label={label}>{inner}</Link>;
  }
  return <div className={`frame ${className}`} data-img>{inner}</div>;
}
