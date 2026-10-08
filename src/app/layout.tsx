import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Motion } from '@/components/Motion';
import { CaseCard } from '@/components/CaseCard';
import { getCases } from '@/lib/cases';
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
const gothic = localFont({
  src: [
    { path: './fonts/special-gothic/special-gothic-latin-400-normal.woff2', weight: '400' },
    { path: './fonts/special-gothic/special-gothic-latin-500-normal.woff2', weight: '500' },
    { path: './fonts/special-gothic/special-gothic-latin-600-normal.woff2', weight: '600' },
  ],
  variable: '--f-gothic',
  display: 'swap',
});

// Avant le premier rendu : active les animations (sauf mouvement réduit) et masque l'intro si déjà vue.
const BOOT = "try{var d=document.documentElement,r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r)d.classList.add('js');if(r||sessionStorage.getItem('dd-intro'))d.classList.add('no-intro')}catch(e){document.documentElement.classList.add('no-intro')}";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'D&D Consulting — Changer le sport', template: '%s — D&D Consulting' },
  description: 'Cabinet de conseil, d’innovation et de transformation dédié au sport. Par l’émotion. Par l’innovation. Par l’engagement.',
  openGraph: { siteName: SITE.name, locale: 'fr_FR', type: 'website' },
  alternates: { canonical: '/' },
};
export const viewport: Viewport = { themeColor: '#0000ee' };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cases = await getCases();
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.legal,
    alternateName: SITE.name,
    url: SITE.url,
    slogan: 'Changer le sport.',
  };
  return (
    <html lang="fr" className={`${geomini.variable} ${gothic.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: BOOT }} /></head>
      <body>
        <a href="#main" className="skip">Aller au contenu</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <CaseCard cases={cases} />
        <Motion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </body>
    </html>
  );
}
