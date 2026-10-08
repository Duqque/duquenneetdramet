import Link from 'next/link';

type Variant = 'dark' | 'violet' | 'light' | 'line' | 'ghost';

export function Btn({ href, children, variant = 'dark' }: { href: string; children: React.ReactNode; variant?: Variant }) {
  return <Link href={href} className={`btn btn-${variant}`}>{children}</Link>;
}
