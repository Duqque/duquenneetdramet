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
- Direction artistique (v3) :
  - **Hero** : aplat bleu `#0000EE`, silhouette noire d'athlète, mot-signe « D&D » géant. Le hero est épinglé : l'athlète ne bouge pas et change de tenue au scroll (12 disciplines : judo, football, rugby, basket, football américain, cyclisme, escrime, boxe, natation, tennis, ski, athlétisme). Le hero utilise des photos (même personne, même pose, même cadrage) listées dans `src/content/hero.ts` et rangées dans `public/athlete/` ; ajouter une discipline = une image + une ligne. Les silhouettes SVG (`src/components/Athlete.tsx`) restent utilisées dans le reste du site.
  - **Intro** « ENTREZ. » (une fois par session, bouton PASSER →).
  - **Reste du site** : « Premium Future Tech Editorial ». Fond `#F7F7F5`, titres compacts, micro-textes, accent violet `#4C22FF` (règle 70 / 20 / 10), visuels sombres en contre-jour violet (`src/components/Frame.tsx`, à remplacer par des photos), CTA final avec halo violet qui se fond dans un footer `#030305`.
  - Typographie : Geomini (titres, 5 graisses) + Special Gothic (textes), auto-hébergées dans `src/app/fonts` (licence OFL).
  - Animations sobres : Lenis (défilement doux), entrées en fondu + 24 px, zoom d'image 1.04 → 1, parallax ≤ 40 px ; `prefers-reduced-motion` respecté. Curseur natif.
- Réservation propriétaire : motif → durée (30/60/90) → calendrier → créneau → infos → confirmation. API `/api/availability` et `/api/appointments` (validation zod, honeypot, rate limiting, contrôle d'origine, verrou par jour anti double-réservation, créneaux revalidés côté serveur, fuseau Europe/Paris, délai minimum 24 h, horizon 60 j, 4 RDV/jour max). L'API publique n'expose que des disponibilités, jamais de données de RDV.
- E-mails : gabarits D&D (confirmation + notification admin) mis en file dans `email_logs`.
- Base : `db/schema.sql` couvre toutes les tables de la section 44.
- Sécurité : CSP, HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy dans `next.config.mjs`. `robots.txt` n'est pas une mesure de sécurité.
- SEO : title / description / canonical par page, JSON-LD Organization, `sitemap.xml`, `robots.txt`.

## D&D Case Intelligence

- Carte flottante (coin inférieur droit, compacte sur mobile) qui fait défiler des cas réels du sport toutes les 9,5 s : pause au survol, au focus ou via le bouton, navigation ← →, réduction en pastille, progression conservée pendant la session. Masquée pendant le hero et sur les pages `/veille`.
- Rotation éditoriale : les 11 domaines alternent (Sponsoring → Design → Performance → Marketing → Événementiel → Développement → Stratégie → Communication → Concept créatif → Audit → Conseils), puis on recommence avec les cas suivants.
- Bibliothèque : `src/content/cases.ts` (24 cas vérifiés, sources de préférence francophones) ou table `cases` (db/schema.sql) si une base est configurée. Ajouter un cas ne demande aucune modification du front-end.
- Pages : `/veille` (bibliothèque par domaine) et `/veille/[id]` (problématique, réponse, impact, D&D Lens, sources).

## Pas encore fait (phases suivantes)

- **Case Intelligence** : 24 cas vérifiés sur les ~110 visés ; images des cas à fournir (champ `image`).

- **Admin / CMS / CRM** (auth propriétaire, MFA, rôles, éditeur de blocs, médiathèque, automatisations, audit) : seul le schéma SQL existe.
- **Worker d'envoi d'e-mails** (SMTP), rappels J-1 / H-1, annulation / reprogrammation, suivi post-RDV.
- **Disponibilités éditables** : règles par défaut dans `src/lib/booking.ts` (`RULES`) ; les tables `availability` / `blocked_periods` sont lues pour les blocages seulement.
- **Adresse e-mail du footer** : `contact@dd-consulting.fr` est provisoire (`NEXT_PUBLIC_CONTACT_EMAIL`).
- **Mentions légales** : page créée, contenu à compléter.
- **Contenus réels** : les 3 transformations sont des **exemples** (`src/content/data.ts`) ; photos et vidéos à fournir (visuels actuellement en dégradés génératifs).
- Analytics avec consentement, rate limiting partagé (Redis/WAF), sauvegardes, environnements staging/prod, audit WCAG complet, Three.js (non nécessaire pour l'instant).
- phpMyAdmin reste hors de l'application, derrière un accès sécurisé séparé.
