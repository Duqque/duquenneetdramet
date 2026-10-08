import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { TRANSFORMATIONS } from '@/content/data';
import { CASES } from '@/content/cases';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/expertises', '/transformations', '/engagement', '/parlons-nous', '/veille'];
  return [
    ...pages.map((p) => ({ url: SITE.url + p })),
    ...TRANSFORMATIONS.map((t) => ({ url: `${SITE.url}/transformations/${t.slug}` })),
    ...CASES.filter((c) => c.active).map((c) => ({ url: `${SITE.url}/veille/${c.id}` })),
  ];
}
