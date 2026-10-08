export const SITE = {
  name: 'D&D Consulting',
  legal: 'Duquenne & Dramet Consulting',
  tagline: 'Conseil · Innovation · Transformation',
  url: process.env.SITE_URL ?? 'http://localhost:3000',
  // À confirmer : adresse publique affichée dans le footer.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contact@dd-consulting.fr',
};
export const NAV = [
  { href: '/expertises', label: 'Expertises' },
  { href: '/transformations', label: 'Transformations' },
  { href: '/engagement', label: 'Engagement' },
];
