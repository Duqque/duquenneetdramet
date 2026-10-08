/**
 * D&D CASE INTELLIGENCE — bibliothèque de cas réels.
 *
 * Règles éditoriales :
 * - uniquement des cas réels, vérifiables, avec une source publique (source_name + source_url),
 *   de préférence francophone ;
 * - les chiffres d'impact sont ceux publiés par la source ; s'ils viennent de l'organisation elle-même,
 *   le texte le dit (« selon… ») ;
 * - `dd_lens` est le regard de D&D (opinion assumée), jamais présenté comme un fait.
 *
 * Ajouter un cas = ajouter un objet ici (ou une ligne dans la table `cases`, voir db/schema.sql).
 * Le front-end n'a pas à changer : ordre de rotation, compteur et pages sont calculés.
 */

export const DOMAINS = [
  'SPONSORING',
  'DESIGN',
  'PERFORMANCE',
  'MARKETING',
  'ÉVÉNEMENTIEL',
  'DÉVELOPPEMENT',
  'STRATÉGIE',
  'COMMUNICATION',
  'CONCEPT CRÉATIF',
  'AUDIT',
  'CONSEILS',
] as const;

export type Domain = (typeof DOMAINS)[number];

export type Case = {
  id: string;
  title: string;
  organization: string;
  year: number;
  category: Domain;
  secondary_categories: Domain[];
  problem: string;
  solution: string;
  impact: string;
  dd_lens: string;
  image?: string | null;
  source_name: string;
  source_url: string;
  /** Sources complémentaires (optionnel). */
  more_sources?: { name: string; url: string }[];
  order: number;
  active: boolean;
};

export const CASES: Case[] = [
  // ——— SPONSORING ———
  {
    id: 'spotify-fc-barcelona',
    title: 'Spotify × FC Barcelona',
    organization: 'FC Barcelona, Spotify',
    year: 2022,
    category: 'SPONSORING',
    secondary_categories: ['MARKETING', 'CONCEPT CRÉATIF'],
    problem: 'Comment transformer un sponsor maillot en véritable acteur de l’expérience du club ?',
    solution: 'Dans le cadre de leur partenariat, Spotify cède la face avant du maillot à un artiste lors de certains Clásicos : le logo d’OVO, la marque de Drake, en octobre 2022, puis d’autres artistes lors des Clásicos suivants.',
    impact: 'Le maillot devient un support culturel événementiel : chaque match désigné crée un objet unique et un moment média au-delà du football.',
    dd_lens: 'Le partenaire ne finance plus seulement le club. Il participe à son produit.',
    source_name: 'Goal France',
    source_url: 'https://www.goal.com/fr/news/le-barca-portera-un-maillot-hommage-a-drake-lors-du-clasico/blt5d1816df4c4f07a5',
    more_sources: [{ name: 'ESPN', url: 'https://global.espn.com/football/story/_/id/45149025/barcelona-fc-spotify-kit-artist-round-drake-travis-scott-rosalia-karol-g-coldplay-rolling-stones' }],
    order: 1,
    active: true,
  },
  {
    id: 'visit-rwanda-arsenal',
    title: 'Visit Rwanda × Arsenal',
    organization: 'Rwanda Development Board, Arsenal FC',
    year: 2018,
    category: 'SPONSORING',
    secondary_categories: ['MARKETING', 'STRATÉGIE'],
    problem: 'Comment un pays peut-il se faire connaître comme destination auprès d’une audience mondiale ?',
    solution: 'Le Rwanda appose « Visit Rwanda » sur la manche des équipes d’Arsenal à partir de 2018 : le sponsoring sportif devient un outil de promotion touristique.',
    impact: 'Huit ans de partenariat, qui prend fin en juin 2026 : le club estime avoir dépassé les objectifs initiaux, sur fond de critiques liées au contexte politique régional.',
    dd_lens: 'Un club peut devenir la vitrine d’un territoire entier — avec les responsabilités que cela implique.',
    source_name: 'allAfrica',
    source_url: 'https://fr.allafrica.com/stories/202511190581.html',
    order: 2,
    active: true,
  },

  // ——— DESIGN ———
  {
    id: 'juventus-identite-2017',
    title: 'Juventus — nouvelle identité',
    organization: 'Juventus FC, Interbrand',
    year: 2017,
    category: 'DESIGN',
    secondary_categories: ['STRATÉGIE', 'MARKETING'],
    problem: 'Comment un club peut-il exister au-delà du football, sur des marchés et des usages lifestyle ?',
    solution: 'Avec Interbrand, la Juventus abandonne son blason traditionnel pour un « J » stylisé, dévoilé à Milan sous la bannière « Black and White and More ».',
    impact: 'L’écusson ovale historique disparaît au profit d’un « J » au trait doublé, pensé pour le numérique et le merchandising — malgré un accueil d’abord hostile d’une partie des supporters.',
    dd_lens: 'Un logo n’est pas un dessin : c’est une décision stratégique sur ce que le club veut devenir.',
    source_name: 'Le Temps',
    source_url: 'https://www.letemps.ch/sport/nouveaux-logos-clubs-droit-but',
    more_sources: [{ name: 'Dezeen', url: 'https://www.dezeen.com/2017/01/17/juventus-football-club-faces-fan-uprising-after-minimalist-new-logo-graphics-design/amp/' }],
    order: 1,
    active: true,
  },
  {
    id: 'tottenham-stadium-nfl',
    title: 'Tottenham Hotspur Stadium',
    organization: 'Tottenham Hotspur, Populous, NFL',
    year: 2019,
    category: 'DESIGN',
    secondary_categories: ['ÉVÉNEMENTIEL', 'STRATÉGIE'],
    problem: 'Comment rentabiliser un stade de football au-delà des jours de match ?',
    solution: 'La pelouse naturelle se divise en trois plateaux d’acier qui glissent sous la tribune sud et révèlent une surface synthétique dédiée à la NFL.',
    impact: 'Le même stade accueille les matchs de Tottenham et des matchs de NFL, ainsi que des concerts, sans abîmer la pelouse de football.',
    dd_lens: 'L’architecture devient un modèle économique.',
    source_name: 'Structurae',
    source_url: 'https://structurae.net/fr/ouvrages/tottenham-hotspur-stadium',
    more_sources: [{ name: 'Populous', url: 'https://www.populous.com/project/tottenham-hotspur-stadium' }],
    order: 2,
    active: true,
  },
  {
    id: 'paris-2024-medailles',
    title: 'Paris 2024 — les médailles',
    organization: 'Paris 2024, Chaumet',
    year: 2024,
    category: 'DESIGN',
    secondary_categories: ['CONCEPT CRÉATIF', 'ÉVÉNEMENTIEL'],
    problem: 'Comment faire d’une médaille un objet chargé de l’identité d’une ville hôte ?',
    solution: 'Dessinées avec la maison Chaumet, les médailles olympiques et paralympiques sertissent un hexagone de fer d’origine de la tour Eiffel, retiré lors de rénovations au XXe siècle.',
    impact: 'Chaque athlète médaillé repart avec un fragment de monument : l’objet raconte Paris avant même de raconter la victoire.',
    dd_lens: 'Le design donne une mémoire physique à l’émotion.',
    source_name: 'LVMH',
    source_url: 'https://www.lvmh.com/fr/publications/lvmh-devoile-les-medailles-des-jeux-olympiques-et-paralympiques-de-paris-2024',
    more_sources: [{ name: 'Olympics.com', url: 'https://olympics.com/en/olympic-games/paris-2024/medal-design' }],
    order: 3,
    active: true,
  },

  // ——— PERFORMANCE ———
  {
    id: 'liverpool-touches',
    title: 'Liverpool FC — les touches',
    organization: 'Liverpool FC',
    year: 2018,
    category: 'PERFORMANCE',
    secondary_categories: ['CONSEILS'],
    problem: 'Comment progresser sur une phase de jeu où l’équipe est parmi les plus faibles du championnat ?',
    solution: 'En 2018, Jürgen Klopp fait appel à Thomas Grønnemark, spécialiste danois des rentrées de touche, alors que Liverpool est 18e sur 20 de Premier League sur ce critère.',
    impact: 'Grønnemark travaille avec le club de 2018 à 2023. Selon lui, Liverpool passe de la 18e à la 1re place pour la conservation du ballon sur touche sous pression.',
    dd_lens: 'La performance se cache souvent là où personne ne regarde.',
    source_name: 'Liverpool FC (site officiel, FR)',
    source_url: 'https://www.liverpoolfc.com/fr/news/23-stories-show-jurgen-klopps-genius-compassion-and-humour',
    more_sources: [{ name: 'Liverpool FC (interview)', url: 'https://www.liverpoolfc.com/news/features/439915-thomas-gronnemark-interview-jurgen-s-call-was-the-most-important-of-my-life' }],
    order: 1,
    active: true,
  },
  {
    id: 'brentford-data',
    title: 'Brentford FC — le modèle data',
    organization: 'Brentford FC',
    year: 2021,
    category: 'PERFORMANCE',
    secondary_categories: ['STRATÉGIE'],
    problem: 'Comment rivaliser avec des clubs beaucoup plus riches ?',
    solution: 'En 2012, Matthew Benham, ancien analyste financier passé par les paris sportifs, rachète le club en troisième division et place la donnée au cœur du recrutement, plutôt que de dépenser massivement en transferts.',
    impact: 'Habitué aux seconds rôles depuis l’après-guerre, Brentford retrouve l’élite anglaise en 2021.',
    dd_lens: 'Quand on ne peut pas dépenser plus, il faut voir plus juste.',
    source_name: 'Business Cool',
    source_url: 'https://business-cool.com/decryptage/sport-business/histoire-brentford-fc-et-matthew-benham/',
    more_sources: [{ name: 'Sports Illustrated', url: 'https://www.si.com/soccer/how-brentford-data-revolution-turned-premier-league-upside-down-digital-cover' }],
    order: 2,
    active: true,
  },

  // ——— MARKETING ———
  {
    id: 'psg-jordan',
    title: 'PSG × Jordan Brand',
    organization: 'Paris Saint-Germain, Jordan Brand',
    year: 2018,
    category: 'MARKETING',
    secondary_categories: ['SPONSORING', 'DESIGN'],
    problem: 'Comment un club de football peut-il parler à une audience lifestyle mondiale, au-delà des fans de foot ?',
    solution: 'En septembre 2018, le PSG devient le premier club de football à travailler avec Jordan Brand : deux maillots portant le Jumpman sont créés pour la Ligue des champions.',
    impact: 'Le club entre dans la culture basket et streetwear, et ses produits se vendent bien au-delà du stade.',
    dd_lens: 'Un maillot peut ouvrir un marché que le terrain n’atteint pas.',
    source_name: 'Maxifoot',
    source_url: 'https://m.maxifoot.fr/breve-290812_13/09.htm',
    more_sources: [{ name: 'SportBusiness', url: 'https://sponsorship.sportbusiness.com/news/champions-league-first-then-the-world-for-psg-and-jordan-brand' }],
    order: 1,
    active: true,
  },
  {
    id: 'wrexham-afc',
    title: 'Wrexham AFC',
    organization: 'Wrexham AFC',
    year: 2021,
    category: 'MARKETING',
    secondary_categories: ['COMMUNICATION', 'STRATÉGIE'],
    problem: 'Comment un club de cinquième division peut-il se construire une audience mondiale ?',
    solution: 'Racheté en 2021 par Ryan Reynolds et Rob McElhenney, le club est suivi par la série documentaire « Welcome to Wrexham » (FX, Disney+) depuis 2022.',
    impact: 'Trois promotions consécutives, jusqu’au Championship en 2025 ; la série a remporté plusieurs Emmy Awards.',
    dd_lens: 'Le récit attire le public. La performance le retient.',
    source_name: 'NBC News',
    source_url: 'https://www.nbcnews.com/sports/soccer/wrexham-promoted-ryan-reynolds-rob-mcelhenney-club-near-premier-league-rcna203168',
    order: 2,
    active: true,
  },

  // ——— ÉVÉNEMENTIEL ———
  {
    id: 'paris-2024-ceremonie-seine',
    title: 'Paris 2024 — la cérémonie sur la Seine',
    organization: 'Paris 2024, CIO',
    year: 2024,
    category: 'ÉVÉNEMENTIEL',
    secondary_categories: ['CONCEPT CRÉATIF'],
    problem: 'Comment ouvrir des Jeux autrement que dans un stade ?',
    solution: 'Le 26 juillet 2024, les délégations défilent en bateau sur près de 6 km de Seine, du pont d’Austerlitz au pont d’Iéna, avant un final au Trocadéro.',
    impact: 'Première cérémonie d’ouverture de Jeux d’été organisée hors d’un stade.',
    dd_lens: 'La ville n’accueille plus l’événement : elle devient l’événement.',
    source_name: 'Orange Sports',
    source_url: 'https://sports.orange.fr/plus-de-sport/article/paris-2024-les-chiffres-cles-de-la-ceremonie-d-ouverture-exclu-CNT000002eyJfS.html',
    more_sources: [{ name: 'Olympics.com', url: 'https://olympics.com/en/news/paris-2024-olympic-opening-ceremony-seine' }],
    order: 1,
    active: true,
  },
  {
    id: 'barca-femeni-camp-nou',
    title: 'Barça Femení au Camp Nou',
    organization: 'FC Barcelona',
    year: 2022,
    category: 'ÉVÉNEMENTIEL',
    secondary_categories: ['MARKETING'],
    problem: 'Comment prouver la valeur du football féminin auprès du grand public ?',
    solution: 'Le club programme ses matchs de Ligue des champions féminine au Camp Nou, avec une vraie mise en événement et une billetterie grand public.',
    impact: '91 553 spectateurs face au Real Madrid le 30 mars 2022, puis 91 648 face à Wolfsburg le 22 avril : record du monde d’affluence pour un match de football féminin.',
    dd_lens: 'Le public suit quand l’institution décide d’y croire.',
    source_name: 'Guinness World Records',
    source_url: 'https://www.guinnessworldrecords.com/world-records/702274-largest-attendance-at-a-womens-football-soccer-match',
    more_sources: [{ name: 'Catalan News', url: 'https://catalannews.com/sports/item/barca-femeni-set-new-world-record-attendance-in-emphatic-champions-league-semi-final-win' }],
    order: 2,
    active: true,
  },

  // ——— DÉVELOPPEMENT ———
  {
    id: 'ligue-1-plus',
    title: 'Ligue 1+',
    organization: 'LFP Media',
    year: 2025,
    category: 'DÉVELOPPEMENT',
    secondary_categories: ['STRATÉGIE'],
    problem: 'Comment une ligue peut-elle garder la maîtrise de la diffusion de son championnat ?',
    solution: 'Après la fin anticipée du contrat avec DAZN, la LFP lance sa propre chaîne, Ligue 1+, à l’été 2025 : huit matchs sur neuf par journée, distribuée par les opérateurs télécoms.',
    impact: 'La LFP annonce avoir dépassé le million d’abonnés un mois après le lancement — son objectif pour la fin de saison.',
    dd_lens: 'Posséder son canal, c’est posséder sa relation au public.',
    source_name: 'Puremédias (ozap)',
    source_url: 'https://www.ozap.com/actu/un-mois-apres-son-lancement-ligue-1-annonce-avoir-depasse-le-million-dabonnes-son-objectif-pour-la-fin-de-saison-20252026/651629',
    order: 1,
    active: true,
  },
  {
    id: 'bundesliga-match-facts',
    title: 'Bundesliga Match Facts × AWS',
    organization: 'DFL, Amazon Web Services',
    year: 2020,
    category: 'DÉVELOPPEMENT',
    secondary_categories: ['PERFORMANCE', 'MARKETING'],
    problem: 'Comment rendre lisible, en direct, ce que les données disent d’un match ?',
    solution: 'En mai 2020, la DFL et AWS lancent les « Bundesliga Match Facts » : des statistiques avancées calculées en temps réel par apprentissage automatique, à commencer par les xGoals et les positions moyennes.',
    impact: 'La donnée de performance devient un contenu pour le spectateur, enrichi saison après saison de nouveaux indicateurs.',
    dd_lens: 'La donnée devient intéressante quand elle devient une histoire.',
    source_name: 'Business Wire (communiqué FR)',
    source_url: 'https://www.businesswire.com/news/home/20200527005336/fr',
    more_sources: [{ name: 'About Amazon', url: 'https://www.aboutamazon.eu/news/amazon-web-services/new-bundesliga-match-fact-will-showcase-the-speed-on-the-pitch' }],
    order: 2,
    active: true,
  },

  // ——— STRATÉGIE ———
  {
    id: 'forest-green-rovers',
    title: 'Forest Green Rovers',
    organization: 'Forest Green Rovers',
    year: 2018,
    category: 'STRATÉGIE',
    secondary_categories: ['COMMUNICATION', 'MARKETING'],
    problem: 'Comment un petit club peut-il se différencier dans un football saturé ?',
    solution: 'Sous l’impulsion de son président Dale Vince, le club fait de l’écologie son identité : énergie 100 % verte, alimentation végane pour joueurs et supporters.',
    impact: 'En 2018, il devient le premier club de football certifié neutre en carbone par l’ONU (programme Climate Neutral Now).',
    dd_lens: 'Une conviction assumée vaut mieux qu’un positionnement générique.',
    source_name: 'Paris Match Belgique',
    source_url: 'https://www.parismatch.be/actualites/sport/2018/09/06/forest-green-rovers-le-club-de-foot-le-plus-vert-certifie-par-lonu-CTNXW7PQZJCP3BCXHRWO6DMMZ4/',
    more_sources: [{ name: 'World Economic Forum', url: 'https://www.weforum.org/stories/2018/12/this-is-the-worlds-greenest-football-club-and-youve-probably-never-even-heard-of-it/' }],
    order: 1,
    active: true,
  },
  {
    id: 'the-hundred',
    title: 'The Hundred',
    organization: 'England and Wales Cricket Board',
    year: 2021,
    category: 'STRATÉGIE',
    secondary_categories: ['ÉVÉNEMENTIEL', 'MARKETING'],
    problem: 'Comment attirer un public plus jeune et plus large vers un sport perçu comme long et traditionnel ?',
    solution: 'L’ECB crée un format de 100 balles par équipe, avec compétitions masculine et féminine jouées en parallèle et une forte présence télévisée.',
    impact: 'Selon l’ECB, 55 % des acheteurs de billets n’avaient jamais acheté de billet de cricket, et 267 000 spectateurs ont assisté aux matchs féminins en 2021.',
    dd_lens: 'Parfois, il ne faut pas changer le sport. Il faut changer son format.',
    source_name: 'ECB',
    source_url: 'https://www.ecb.co.uk/news/2230059/more-than-16m-tune-in-to-the-hundred-as-competition-welcomes-new-fans-to-cricket',
    order: 2,
    active: true,
  },

  // ——— COMMUNICATION ———
  {
    id: 'f1-drive-to-survive',
    title: 'Formula 1 × Netflix',
    organization: 'Formula 1, Netflix',
    year: 2019,
    category: 'COMMUNICATION',
    secondary_categories: ['MARKETING'],
    problem: 'Comment rendre un sport technique et européen accessible au public américain ?',
    solution: 'La F1 ouvre ses coulisses à la série « Drive to Survive » : rivalités, pilotes et patrons d’écurie racontés comme des personnages.',
    impact: 'Selon Nielsen, plus de 360 000 téléspectateurs américains qui n’avaient pas suivi la fin de saison 2021 ont regardé la F1 en 2022 après avoir vu la série.',
    dd_lens: 'On ne s’attache pas à des voitures. On s’attache à des personnages.',
    source_name: 'Nielsen (FR)',
    source_url: 'https://www.nielsen.com/fr/insights/2022/driven-to-watch-how-a-sports-docuseries-drove-u-s-fans-to-formula-1/',
    more_sources: [{ name: 'Axios', url: 'https://www.axios.com/2021/10/25/formula-1-united-states-fans-ratings' }],
    order: 1,
    active: true,
  },
  {
    id: 'nike-dream-crazy',
    title: 'Nike — « Dream Crazy »',
    organization: 'Nike, Wieden+Kennedy',
    year: 2018,
    category: 'COMMUNICATION',
    secondary_categories: ['CONCEPT CRÉATIF', 'MARKETING'],
    problem: 'Comment célébrer les 30 ans de « Just Do It » sans tomber dans la nostalgie ?',
    solution: 'Nike place Colin Kaepernick au cœur de la campagne « Dream Crazy », réalisée avec Wieden+Kennedy, et assume une prise de position clivante.',
    impact: 'La campagne remporte l’Emmy Award de la meilleure publicité en 2019, malgré de vives critiques à son lancement.',
    dd_lens: 'Une marque forte ne cherche pas à plaire à tout le monde.',
    source_name: 'CBS News',
    source_url: 'https://www.cbsnews.com/amp/sanfrancisco/news/kaepernicks-nike-ad-wins-emmy-for-outstanding-commercial',
    order: 2,
    active: true,
  },

  // ——— CONCEPT CRÉATIF ———
  {
    id: 'kings-league',
    title: 'Kings League',
    organization: 'Kosmos, Gerard Piqué',
    year: 2023,
    category: 'CONCEPT CRÉATIF',
    secondary_categories: ['ÉVÉNEMENTIEL', 'DÉVELOPPEMENT'],
    problem: 'Comment intéresser au football une génération qui le regarde surtout sur Twitch et les réseaux sociaux ?',
    solution: 'Gerard Piqué et le streamer Ibai Llanos lancent en 2023 une ligue à 7 contre 7 : douze équipes présidées par des streamers et d’anciens joueurs, des règles co-construites avec les fans, une diffusion en streaming.',
    impact: 'Un nouveau format de compétition pensé d’abord pour le numérique, qui s’exporte ensuite dans d’autres pays.',
    dd_lens: 'Inventer un sport, c’est d’abord inventer une façon de le regarder.',
    source_name: 'ESPN',
    source_url: 'https://global.espn.com/football/story/_/id/37635207/chicharito-golden-cards-twitch-streaming-piques-kings-league',
    order: 1,
    active: true,
  },
  {
    id: 'red-bull-stratos',
    title: 'Red Bull Stratos',
    organization: 'Red Bull',
    year: 2012,
    category: 'CONCEPT CRÉATIF',
    secondary_categories: ['MARKETING', 'ÉVÉNEMENTIEL'],
    problem: 'Comment une marque peut-elle créer un moment que le monde entier regarde en direct ?',
    solution: 'Le 14 octobre 2012, Red Bull produit et diffuse en direct le saut de Felix Baumgartner depuis la stratosphère.',
    impact: 'Plus de 8 millions de flux simultanés sur YouTube : un record pour un événement en direct sur la plateforme.',
    dd_lens: 'La marque ne sponsorise pas l’exploit. Elle le rend possible.',
    source_name: 'Guinness World Records',
    source_url: 'https://www.guinnessworldrecords.com/world-records/105276-most-concurrent-views-for-a-live-event-on-youtube',
    order: 2,
    active: true,
  },
  {
    id: 'on-roger-federer',
    title: 'On × Roger Federer',
    organization: 'On, Roger Federer',
    year: 2019,
    category: 'CONCEPT CRÉATIF',
    secondary_categories: ['SPONSORING', 'DESIGN'],
    problem: 'Comment dépasser le simple contrat d’égérie entre une marque et un athlète ?',
    solution: 'Fin 2019, Roger Federer entre au capital de On pour une somme non publiée et devient partenaire de la marque, au-delà d’un contrat d’égérie.',
    impact: 'En juillet 2020 sort THE ROGER Centre Court, première chaussure co-créée, suivie d’une ligne tennis de performance.',
    dd_lens: 'L’athlète n’est plus un visage. Il devient co-auteur.',
    source_name: 'Le Temps',
    source_url: 'https://www.letemps.ch/economie/sosie-economique-federer-on-running-serait-point-dentrer-bourse',
    more_sources: [{ name: 'FashionUnited', url: 'https://fashionunited.uk/news/fashion/roger-federer-and-on-launches-its-first-tennis-inspired-sneaker/2020070649707' }],
    order: 3,
    active: true,
  },

  // ——— AUDIT ———
  {
    id: 'fan-led-review',
    title: 'Fan-Led Review of Football Governance',
    organization: 'Gouvernement britannique, Tracey Crouch',
    year: 2021,
    category: 'AUDIT',
    secondary_categories: ['STRATÉGIE', 'CONSEILS'],
    problem: 'Comment protéger les clubs face aux faillites et aux dérives de propriété ?',
    solution: 'Une revue indépendante, menée par la députée Tracey Crouch et nourrie par les supporters, analyse la gouvernance, la propriété et la santé financière du football anglais.',
    impact: 'Publié en novembre 2021, le rapport recommande un régulateur indépendant ; le gouvernement en approuve le principe.',
    dd_lens: 'Avant de transformer, il faut oser regarder.',
    source_name: 'La Libre Belgique',
    source_url: 'https://www.lalibre.be/economie/conjoncture/2022/04/25/bientot-un-regulateur-independant-pour-controler-les-finances-de-la-premier-league-CXU4WO2ECNB6LDZUJHOSHD4NFE/',
    more_sources: [{ name: 'GOV.UK', url: 'https://www.gov.uk/government/publications/fan-led-review-of-football-governance-securing-the-games-future' }],
    order: 1,
    active: true,
  },
  {
    id: 'icec-cricket',
    title: 'Commission pour l’équité dans le cricket',
    organization: 'England and Wales Cricket Board',
    year: 2023,
    category: 'AUDIT',
    secondary_categories: ['COMMUNICATION', 'STRATÉGIE'],
    problem: 'Comment mesurer réellement les discriminations au sein d’un sport ?',
    solution: 'L’ECB commande une commission indépendante qui recueille plus de 4 000 témoignages et formule 44 recommandations.',
    impact: 'Le rapport de juin 2023 conclut que le racisme, le sexisme et les discriminations de classe sont répandus ; l’ECB présente des excuses publiques et s’engage à réformer.',
    dd_lens: 'Un diagnostic honnête est déjà une première transformation.',
    source_name: 'ECB (communiqué)',
    source_url: 'https://www.mynewsdesk.com/uk/england-and-wales-cricket-board/pressreleases/ecb-responds-to-icec-report-on-equity-in-cricket-which-finds-evidence-of-discrimination-across-the-game-3261498',
    order: 2,
    active: true,
  },

  // ——— CONSEILS ———
  {
    id: 'ifab-var',
    title: 'IFAB — l’arbitrage vidéo',
    organization: 'IFAB, FIFA',
    year: 2018,
    category: 'CONSEILS',
    secondary_categories: ['DÉVELOPPEMENT', 'PERFORMANCE'],
    problem: 'Comment intégrer la vidéo à l’arbitrage sans dénaturer le jeu ?',
    solution: 'Après deux ans d’expérimentation dans plus de 20 compétitions et plus de 800 matchs, analysés par l’université KU Leuven, l’IFAB approuve à l’unanimité l’assistance vidéo à l’arbitrage le 3 mars 2018.',
    impact: 'L’arbitrage vidéo entre dans les Lois du jeu 2018-19, avec un protocole commun, juste avant la Coupe du monde en Russie.',
    dd_lens: 'Une bonne décision s’appuie sur l’expérimentation, pas sur l’intuition seule.',
    source_name: 'FIFA (FR)',
    source_url: 'https://inside.fifa.com/fr/news/sat-3-march-am-la-conference-de-presse-de-lifab-en-direct-et-en-streamin-2931551',
    more_sources: [{ name: 'ESPN', url: 'https://www.espn.com/soccer/blog-fifa/story/3403889/var-unanimously-approved-by-ifab-and-set-to-be-used-at-world-cup-finals' }],
    order: 1,
    active: true,
  },
  {
    id: 'oakland-moneyball',
    title: 'Oakland Athletics — « Moneyball »',
    organization: 'Oakland Athletics',
    year: 2002,
    category: 'CONSEILS',
    secondary_categories: ['PERFORMANCE', 'STRATÉGIE'],
    problem: 'Comment construire une équipe compétitive avec l’une des plus petites masses salariales de la ligue ?',
    solution: 'Billy Beane et son adjoint Paul DePodesta recrutent selon l’analyse statistique (sabermétrie), en privilégiant des indicateurs sous-évalués comme le pourcentage de présence sur base.',
    impact: 'En 2002, les A’s signent une série record de 20 victoires consécutives en Ligue américaine et remportent 103 matchs.',
    dd_lens: 'La bonne question vaut plus qu’un gros budget.',
    source_name: 'CBS News',
    source_url: 'https://www.cbsnews.com/newyork/news/by-the-numbers-taking-a-swing-at-moneyball/',
    order: 2,
    active: true,
  },
];

/**
 * Ordre de rotation éditorial : on alterne les domaines (jamais deux fois le même d'affilée
 * tant que d'autres domaines ont encore des cas), dans l'ordre de DOMAINS, puis on recommence.
 */
export function rotationOrder(cases: Case[]): Case[] {
  const byDomain = new Map<Domain, Case[]>();
  for (const d of DOMAINS) byDomain.set(d, []);
  for (const c of cases.filter((x) => x.active)) byDomain.get(c.category)?.push(c);
  for (const list of byDomain.values()) list.sort((a, b) => a.order - b.order);
  const out: Case[] = [];
  for (let round = 0; ; round++) {
    let added = false;
    for (const d of DOMAINS) {
      const c = byDomain.get(d)![round];
      if (c) { out.push(c); added = true; }
    }
    if (!added) break;
  }
  return out;
}
