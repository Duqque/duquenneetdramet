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
    { path: './fonts/geomini/Geomini-ExtraLight.woff2', weight: '200' },
    { path: './fonts/geomini/Geomini-Light.woff2', weight: '300' },
    { path: './fonts/geomini/Geomini-Regular.woff2', weight: '400' },
    { path: './fonts/geomini/Geomini-Medium.woff2', weight: '500' },
    { path: './fonts/geomini/Geomini-SemiBold.woff2', weight: '600' },
  ],
  variable: '--f-geomini',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'D&D Consulting — Changer le sport', template: '%s — D&D Consulting' },
  description: 'Cabinet de conseil, d’innovation et de transformation dédié au sport. Par l’émotion. Par l’innovation. Par l’engagement.',
  openGraph: { siteName: SITE.name, locale: 'fr_FR', type: 'website' },
  alternates: { canonical: '/' },
};
export const viewport: Viewport = { themeColor: '#04050d' };

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
    <html lang="fr" className={geomini.variable}>
      <body>
        <a href="#main" className="skip">Aller au contenu</a>
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
