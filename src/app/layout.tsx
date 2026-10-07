import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Cursor } from '@/components/Cursor';
import { Motion } from '@/components/Motion';
import { SITE } from '@/lib/site';

const geomini = localFont({
  src: [
    { path: './fonts/geomini-latin-500-normal.woff2', weight: '500' },
    { path: './fonts/geomini-latin-700-normal.woff2', weight: '700' },
    { path: './fonts/geomini-latin-800-normal.woff2', weight: '800' },
  ],
  variable: '--f-geomini',
  display: 'swap',
});
const gothic = localFont({
  src: [
    { path: './fonts/special-gothic-latin-400-normal.woff2', weight: '400' },
    { path: './fonts/special-gothic-latin-600-normal.woff2', weight: '600' },
  ],
  variable: '--f-gothic',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'D&D Consulting — Changer le sport', template: '%s — D&D Consulting' },
  description: 'Cabinet de conseil, d’innovation et de transformation dédié au sport. Par l’émotion. Par l’innovation. Par l’engagement.',
  openGraph: { siteName: SITE.name, locale: 'fr_FR', type: 'website' },
  alternates: { canonical: '/' },
};
export const viewport: Viewport = { themeColor: '#000000' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.legal,
    alternateName: SITE.name,
    url: SITE.url,
    slogan: 'Changer le sport.',
  };
  return (
    <html lang="fr" className={`${geomini.variable} ${gothic.variable}`}>
      <body>
        <a href="#main" className="hp" style={{ position: 'absolute' }}>Aller au contenu</a>
        <Nav />
        <main id="main" className="page">{children}</main>
        <Footer />
        <Cursor />
        <Motion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </body>
    </html>
  );
}
