import type { ElementType } from 'react';

/** Titre découpé en lignes, révélées au scroll (voir Motion). */
export function Lines({
  lines,
  as: Tag = 'h2',
  className = '',
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag className={className} data-reveal aria-label={lines.join(' ')}>
      {lines.map((l, i) => (
        <span className="line" key={i} aria-hidden="true">
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
