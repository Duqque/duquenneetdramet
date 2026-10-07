import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { TRANSFORMATIONS } from '@/content/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/expertises', '/transformations', '/engagement', '/parlons-nous'];
  return [
    ...pages.map((p) => ({ url: SITE.url + p })),
    ...TRANSFORMATIONS.map((t) => ({ url: `${SITE.url}/transformations/${t.slug}` })),
  ];
}
