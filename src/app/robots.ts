import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

// Rappel : robots.txt n'est PAS une mesure de sécurité. Les espaces privés sont protégés par authentification.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
