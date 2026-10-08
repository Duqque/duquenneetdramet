/** Fond « barres de lumière » : colonnes en dégradé bleu, hauteurs ondulantes. */
export function LightBars({ count = 28, seed = 0 }: { count?: number; seed?: number }) {
  return (
    <div className="bars" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const h = 46 + 30 * Math.sin((i + seed) * 0.55) + 14 * Math.cos((i + seed) * 1.7);
        return <i key={i} style={{ '--h': `${h.toFixed(1)}%`, '--d': `${(-i * 0.37).toFixed(2)}s` } as React.CSSProperties} />;
      })}
    </div>
  );
}
