/**
 * L'athlète D&D : une seule silhouette, toujours dans la même pose, qui change de tenue.
 * Tout est en SVG (aucune photo nécessaire). Pour passer à de vraies photos, renseigner `photo`
 * dans OUTFITS (ex. '/athlete/judo.webp') : l'image remplace alors le dessin de cette tenue.
 * Couleurs pilotées par CSS : --fig (silhouette) et --cut (découpes, = couleur du fond).
 */

export type Outfit = { id: string; label: string; photo?: string };

export const OUTFITS: Outfit[] = [
  { id: 'judo', label: 'Judo' },
  { id: 'football', label: 'Football' },
  { id: 'rugby', label: 'Rugby' },
  { id: 'basket', label: 'Basket' },
  { id: 'football-us', label: 'Football américain' },
  { id: 'cyclisme', label: 'Cyclisme' },
  { id: 'escrime', label: 'Escrime' },
  { id: 'boxe', label: 'Boxe' },
  { id: 'natation', label: 'Natation' },
  { id: 'tennis', label: 'Tennis' },
  { id: 'ski', label: 'Ski' },
  { id: 'athletisme', label: 'Athlétisme' },
];

const F = 'var(--fig)';
const C = 'var(--cut)';
const cut = { fill: 'none', stroke: C, strokeWidth: 7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const thin = { ...cut, strokeWidth: 4 };

const BODY =
  'M420 530 C372 478 342 392 358 306 C374 220 452 156 548 160 C612 163 652 196 668 238 ' +
  'C671 248 672 256 676 264 C690 276 712 286 724 296 C728 300 724 308 714 310 C706 312 700 316 702 322 ' +
  'C704 328 714 332 714 338 C712 344 702 346 704 350 C708 356 712 362 706 370 C698 378 694 384 700 394 ' +
  'C706 406 700 420 684 424 C660 430 636 438 622 452 C612 480 608 540 612 600 C618 650 660 700 712 760 ' +
  'C770 830 800 950 812 1200 L120 1200 C128 1040 150 900 210 800 C260 720 340 680 392 640 C410 610 418 570 420 530 Z';

const TORSO = 'M120 1200 C128 1040 150 900 210 800 C260 720 340 680 392 640 L612 600 C618 650 660 700 712 760 C770 830 800 950 812 1200 Z';

function Num({ x, y, children, size = 210, rotate = 0 }: { x: number; y: number; children: string; size?: number; rotate?: number }) {
  return (
    <text x={x} y={y} fill={C} fontFamily="var(--f-geomini)" fontWeight={500} fontSize={size} letterSpacing={-8} transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}>
      {children}
    </text>
  );
}

const LAYERS: Record<string, React.ReactNode> = {
  judo: (
    <>
      <path d="M392 640 C330 700 250 730 205 805 L180 860 C260 760 340 720 420 700 Z" fill={F} />
      <path d="M398 602 C478 628 578 642 640 692 C690 742 692 900 662 1200" {...cut} />
      <path d="M408 662 C478 676 556 694 600 734 C642 784 632 924 610 1200" {...cut} />
      <path d="M612 600 C640 640 690 700 720 760" {...thin} />
      <path d="M250 1200 C262 1080 262 960 236 860" {...thin} />
    </>
  ),
  football: (
    <>
      <path d="M402 610 C468 652 560 664 626 640" {...cut} />
      <path d="M396 646 C468 690 572 700 646 672" {...thin} />
      <Num x={228} y={1030}>10</Num>
      <path d="M150 1090 C200 1112 262 1118 306 1104" {...cut} />
    </>
  ),
  rugby: (
    <>
      <path d="M352 440 C320 330 352 214 462 168 C560 132 646 176 664 236 L650 250 C620 230 590 240 584 270 C580 310 600 350 590 400 C570 440 520 470 470 480 C420 486 380 470 352 440 Z" fill={F} />
      <path d="M402 214 C452 268 470 350 466 452" {...thin} />
      <path d="M484 168 C536 220 566 270 584 270" {...thin} />
      <path d="M520 470 C574 452 626 446 676 422" {...cut} />
      <clipPath id="ath-torso"><path d={TORSO} /></clipPath>
      <g clipPath="url(#ath-torso)" fill={C}>
        <rect x="0" y="770" width="1000" height="70" />
        <rect x="0" y="910" width="1000" height="70" />
        <rect x="0" y="1050" width="1000" height="70" />
      </g>
      <path d="M612 596 L660 632 L640 664 L606 640 Z" fill={F} />
      <path d="M612 600 L652 634" {...thin} />
    </>
  ),
  basket: (
    <>
      <path d="M356 296 C450 246 560 214 664 226 L674 266 C566 258 456 292 364 344 Z" fill={F} />
      <path d="M356 296 C450 246 560 214 664 226" {...thin} />
      <path d="M364 344 C456 292 566 258 674 266" {...thin} />
      <path d="M352 680 C312 760 300 870 336 960 C366 1004 430 1012 486 990" {...cut} />
      <path d="M612 610 C590 700 560 760 500 800" {...thin} />
      <Num x={560} y={1110} size={190}>23</Num>
    </>
  ),
  'football-us': (
    <>
      <path d="M128 930 C136 770 250 650 400 634 L624 626 C700 646 758 706 772 800 L776 846 C600 806 400 812 128 930 Z" fill={F} />
      <path d="M200 846 C330 760 520 740 760 790" {...thin} />
      <path d="M330 480 C296 360 328 196 474 148 C604 108 712 168 736 270 L748 330 L700 330 L690 410 L708 456 C620 488 520 500 430 500 C390 500 350 492 330 480 Z" fill={F} />
      <path d="M418 172 C520 136 650 160 712 240" {...cut} />
      <circle cx="470" cy="372" r="20" fill={C} />
      <path d="M700 318 L792 322 L800 440 L712 458" fill="none" stroke={F} strokeWidth={16} strokeLinejoin="round" />
      <path d="M712 384 L798 384" fill="none" stroke={F} strokeWidth={14} />
      <path d="M752 322 L756 450" fill="none" stroke={F} strokeWidth={12} />
      <Num x={330} y={1010} size={190}>88</Num>
    </>
  ),
  cyclisme: (
    <>
      <path d="M232 440 C300 320 360 200 488 164 C600 136 690 186 700 256 L612 270 C520 300 400 360 232 440 Z" fill={F} />
      <path d="M330 340 C410 268 500 214 600 196" {...thin} />
      <path d="M380 340 C450 290 540 250 640 236" {...thin} />
      <path d="M636 254 L714 244 C732 250 734 286 712 294 L640 304 Z" fill={F} />
      <path d="M650 268 L706 262" {...thin} />
      <path d="M520 300 C540 360 580 410 620 446" {...thin} />
      <path d="M624 640 C664 760 690 900 694 1200" {...cut} />
    </>
  ),
  escrime: (
    <>
      <path d="M520 164 C610 158 712 206 748 286 C776 352 766 420 716 462 C680 488 640 496 616 490 L612 600 L700 600 C690 540 664 500 640 480 Z" fill={F} />
      <path d="M520 164 C610 158 712 206 748 286 C776 352 766 420 716 462 C680 488 640 496 616 490 L620 260 Z" fill={F} />
      <clipPath id="ath-mask"><path d="M624 200 C690 224 738 270 752 312 C766 370 750 430 708 462 C680 482 650 488 626 486 Z" /></clipPath>
      <g clipPath="url(#ath-mask)" stroke={C} strokeWidth={3} opacity={0.85}>
        {Array.from({ length: 16 }, (_, i) => <line key={`a${i}`} x1={560 + i * 16} y1={160} x2={560 + i * 16} y2={520} />)}
        {Array.from({ length: 22 }, (_, i) => <line key={`b${i}`} x1={560} y1={180 + i * 16} x2={800} y2={180 + i * 16} />)}
      </g>
      <path d="M624 198 C640 300 640 400 626 488" {...cut} />
      <path d="M470 164 C420 260 392 380 404 476" {...thin} />
      <path d="M404 600 C470 640 560 650 640 620" {...cut} />
    </>
  ),
  boxe: (
    <>
      <path d="M340 440 C318 320 370 186 508 160 C596 146 664 186 680 244 L686 270 C640 256 612 280 612 320 C612 368 640 404 690 414 L680 452 C620 476 540 486 470 484 C410 482 364 470 340 440 Z" fill={F} />
      <path d="M680 260 C636 258 612 286 612 322 C612 366 640 398 690 412" {...cut} />
      <path d="M400 230 C470 214 560 212 650 232" {...thin} />
      <path d="M560 290 C540 340 540 400 560 450" {...thin} />
    </>
  ),
  natation: (
    <>
      <path d="M356 400 C344 300 400 196 520 168 C600 152 652 190 668 238 L670 252 C580 262 470 300 372 366 Z" fill={F} />
      <path d="M372 366 C470 300 580 262 670 252" {...cut} />
      <path d="M430 220 C480 196 540 186 592 190" {...thin} />
      <path d="M380 318 C470 290 580 272 672 268" {...thin} />
      <ellipse cx="688" cy="274" rx="26" ry="16" fill={F} />
      <ellipse cx="692" cy="272" rx="12" ry="7" fill={C} />
    </>
  ),
  tennis: (
    <>
      <path d="M592 216 L772 236 C786 242 778 258 762 260 L640 262 Z" fill={F} />
      <path d="M362 356 C440 290 560 246 672 244" {...cut} />
      <circle cx="520" cy="170" r="10" fill={C} />
      <path d="M612 598 L664 628 L652 668 L604 640 Z" fill={F} />
      <path d="M624 640 C640 700 650 740 650 780" {...thin} />
      <circle cx="646" cy="700" r="6" fill={C} />
      <circle cx="650" cy="740" r="6" fill={C} />
    </>
  ),
  ski: (
    <>
      <path d="M338 450 C306 330 350 180 494 152 C616 130 700 186 714 262 L706 290 C600 296 480 330 380 400 Z" fill={F} />
      <path d="M626 244 L742 252 C760 262 760 314 740 322 L630 326 C612 300 612 268 626 244 Z" fill={F} />
      <path d="M646 262 L734 268 L732 304 L648 306 Z" fill={C} opacity={0.9} />
      <path d="M400 330 C470 290 560 262 630 254" {...cut} />
      <path d="M596 440 C640 444 690 432 712 420 L760 520 C720 600 680 640 640 660 L590 640 Z" fill={F} />
      <path d="M690 452 C716 560 720 700 716 760" {...thin} />
      <path d="M400 610 C480 640 560 646 640 640" {...cut} />
    </>
  ),
  athletisme: (
    <>
      <path d="M352 680 C312 760 300 870 336 960 C366 1004 430 1012 486 990" {...cut} />
      <path d="M598 820 L766 860 L786 1048 L616 1022 Z" fill={C} />
      <text x={624} y={980} fill={F} fontFamily="var(--f-geomini)" fontWeight={500} fontSize={92} transform="rotate(8 624 980)">1024</text>
      <circle cx="616" cy="842" r="7" fill={F} />
      <circle cx="760" cy="878" r="7" fill={F} />
    </>
  ),
};

export function Athlete({ active = 0, className = '', crop, style }: { active?: number; className?: string; crop?: string; style?: React.CSSProperties }) {
  return (
    <svg style={style} className={`athlete ${className}`} viewBox={crop ?? '0 0 1000 1200'} preserveAspectRatio="xMidYMax meet" role="img" aria-label={`Silhouette d’athlète — tenue : ${OUTFITS[active]?.label ?? ''}`}>
      <path d={BODY} fill={F} className="athlete-body" />
      <path d="M476 330 C446 342 444 398 476 412" {...thin} className="athlete-ear" />
      {OUTFITS.map((o, i) => (
        <g key={o.id} className="outfit" data-on={i === active ? '' : undefined} data-id={o.id}>
          {o.photo ? <image href={o.photo} x="0" y="0" width="1000" height="1200" /> : LAYERS[o.id]}
        </g>
      ))}
    </svg>
  );
}
