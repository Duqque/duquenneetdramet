# D&D Consulting — site V1

Next.js 15 · React 19 · TypeScript · GSAP · MySQL (mysql2). Aucun CMS ni service de réservation tiers.

## Lancer

```bash
cp .env.example .env      # renseigner DATABASE_URL (facultatif en dev)
npm install
npm run dev               # http://localhost:3000
npm run db:migrate        # applique db/schema.sql sur DATABASE_URL
```

Sans `DATABASE_URL`, les réservations utilisent un stockage mémoire (développement uniquement ; refusé en production).

## Ce qui est livré (V1 publique)

- Pages : `/` (10 sections du parcours QUESTION → CONVERSATION), `/expertises`, `/transformations`, `/transformations/[slug]` (6 temps : question → impact), `/engagement` (Observatoire du judo + Programme jeunes), `/parlons-nous`.
- Design system : noir `#000`, off-white `#FAFAF7`, vert acide `#D9FF3D` (signal uniquement) ; Geomini (titres) + Special Gothic (texte), auto-hébergées dans `src/app/fonts` (licences incluses), aucune 3ᵉ famille.
- Motion : révélation de titres ligne par ligne et blocs au scroll (GSAP ScrollTrigger), curseur personnalisé desktop (`data-cursor="VIEW"`), transition de page, `prefers-reduced-motion` respecté.
- Réservation propriétaire : motif → durée (30/60/90) → calendrier → créneau → infos → confirmation. API `/api/availability` et `/api/appointments` (validation zod, honeypot, rate limiting, contrôle d'origine, verrou par jour anti double-réservation, créneaux revalidés côté serveur, fuseau Europe/Paris, délai minimum 24 h, horizon 60 j, 4 RDV/jour max). L'API publique n'expose que des disponibilités, jamais de données de RDV.
- E-mails : gabarits D&D (confirmation + notification admin) mis en file dans `email_logs`.
- Base : `db/schema.sql` couvre toutes les tables de la section 44.
- Sécurité : CSP, HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy dans `next.config.mjs`. `robots.txt` n'est pas une mesure de sécurité.
- SEO : title / description / canonical par page, JSON-LD Organization, `sitemap.xml`, `robots.txt`.

## Pas encore fait (phases suivantes)

- **Admin / CMS / CRM** (auth propriétaire, MFA, rôles, éditeur de blocs, médiathèque, automatisations, audit) : seul le schéma SQL existe.
- **Worker d'envoi d'e-mails** (SMTP), rappels J-1 / H-1, annulation / reprogrammation, suivi post-RDV.
- **Disponibilités éditables** : règles par défaut dans `src/lib/booking.ts` (`RULES`) ; les tables `availability` / `blocked_periods` sont lues pour les blocages seulement.
- **Contenus réels** : les 3 transformations sont des **exemples** (`src/content/data.ts`) ; photos et vidéos à fournir (visuels actuellement typographiques).
- Analytics avec consentement, rate limiting partagé (Redis/WAF), sauvegardes, environnements staging/prod, audit WCAG complet, Three.js (non nécessaire pour l'instant).
- phpMyAdmin reste hors de l'application, derrière un accès sécurisé séparé.
