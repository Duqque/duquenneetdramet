import Link from 'next/link';

type Variant = 'white' | 'dark' | 'blue' | 'line';

export function CTA({ href, children, variant = 'white' }: { href: string; children: React.ReactNode; variant?: Variant }) {
  return (
    <Link href={href} className={`btn btn-${variant}`}>
      {children} <span className="arr" aria-hidden="true">→</span>
    </Link>
  );
}
