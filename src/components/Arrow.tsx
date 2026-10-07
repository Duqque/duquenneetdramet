import Link from 'next/link';

export function CTA({ href, children, solid }: { href: string; children: React.ReactNode; solid?: boolean }) {
  return (
    <Link href={href} className={`btn${solid ? ' solid' : ''}`} data-cursor="OPEN">
      {children} <span className="arrow" aria-hidden="true">→</span>
    </Link>
  );
}
