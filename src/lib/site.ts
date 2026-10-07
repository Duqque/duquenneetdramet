export const SITE = {
  name: 'D&D Consulting',
  legal: 'Duquenne & Dramet Consulting',
  tagline: 'Conseil · Innovation · Transformation',
  url: process.env.SITE_URL ?? 'http://localhost:3000',
};
export const NAV = [
  { href: '/expertises', label: 'Expertises' },
  { href: '/transformations', label: 'Transformations' },
  { href: '/engagement', label: 'Engagement' },
];
