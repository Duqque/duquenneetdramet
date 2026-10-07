export const EXPERTISES = [
  { slug: 'strategie', name: 'Stratégie', line: 'Comprendre où vous êtes pour savoir où aller.' },
  { slug: 'innovation', name: 'Innovation', line: 'Imaginer ce qui n’existe pas encore.' },
  { slug: 'experience', name: 'Expérience', line: 'Créer ce que l’on ressent.' },
  { slug: 'marque', name: 'Marque', line: 'Donner une identité à ce qui mérite d’être reconnu.' },
  { slug: 'transformation', name: 'Transformation', line: 'Faire évoluer les organisations.' },
  { slug: 'performance', name: 'Performance', line: 'Transformer les données en décisions.' },
] as const;

export const PILLARS = [
  { name: 'Émotion', line: 'Créer ce que l’on ressent.' },
  { name: 'Innovation', line: 'Imaginer ce qui n’existe pas encore.' },
  { name: 'Engagement', line: 'Transformer les idées en mouvement.' },
];

export const METHOD = [
  { n: '01', name: 'Déceler', verbs: ['Observer.', 'Écouter.', 'Comprendre.'] },
  { n: '02', name: 'Défier', verbs: ['Questionner.', 'Remettre en cause.', 'Explorer.'] },
  { n: '03', name: 'Dessiner', verbs: ['Imaginer.', 'Concevoir.', 'Expérimenter.'] },
  { n: '04', name: 'Déclencher', verbs: ['Déployer.', 'Mesurer.', 'Transformer.'] },
];

export const STORY_STEPS = [
  { key: 'question', title: 'La question', prompt: 'Quel problème devait être résolu ?' },
  { key: 'context', title: 'Le contexte', prompt: 'Pourquoi cette question existait-elle ?' },
  { key: 'discovery', title: 'La découverte', prompt: 'Qu’avons-nous compris ?' },
  { key: 'idea', title: 'L’idée', prompt: 'Quelle intuition a changé la trajectoire ?' },
  { key: 'transformation', title: 'La transformation', prompt: 'Qu’avons-nous conçu ?' },
  { key: 'impact', title: 'L’impact', prompt: 'Qu’est-ce qui a changé ?' },
] as const;

export type Transformation = {
  slug: string;
  project: string;
  client: string;
  sector: string;
  expertises: string[];
  punchline: string;
  impact: { value: string; label: string };
  story: Record<(typeof STORY_STEPS)[number]['key'], string>;
};

/**
 * CONTENU D'EXEMPLE — à remplacer par les vraies transformations (futur CMS).
 * Aucune donnée client réelle ici.
 */
export const TRANSFORMATIONS: Transformation[] = [
  {
    slug: 'exemple-stade-vivant',
    project: 'Projet exemple A',
    client: 'Client à renseigner',
    sector: 'Événementiel sportif',
    expertises: ['Expérience', 'Innovation'],
    punchline: 'Faire du jour de match un récit, pas un rendez-vous.',
    impact: { value: '00', label: 'Indicateur à renseigner' },
    story: {
      question: 'Contenu à rédiger.',
      context: 'Contenu à rédiger.',
      discovery: 'Contenu à rédiger.',
      idea: 'Contenu à rédiger.',
      transformation: 'Contenu à rédiger.',
      impact: 'Contenu à rédiger.',
    },
  },
  {
    slug: 'exemple-federation-en-mouvement',
    project: 'Projet exemple B',
    client: 'Client à renseigner',
    sector: 'Fédération',
    expertises: ['Stratégie', 'Transformation'],
    punchline: 'Déplacer les lignes d’une organisation sans perdre son âme.',
    impact: { value: '00', label: 'Indicateur à renseigner' },
    story: {
      question: 'Contenu à rédiger.',
      context: 'Contenu à rédiger.',
      discovery: 'Contenu à rédiger.',
      idea: 'Contenu à rédiger.',
      transformation: 'Contenu à rédiger.',
      impact: 'Contenu à rédiger.',
    },
  },
  {
    slug: 'exemple-data-decision',
    project: 'Projet exemple C',
    client: 'Client à renseigner',
    sector: 'Performance',
    expertises: ['Performance', 'Marque'],
    punchline: 'Des données qui décident, des humains qui choisissent.',
    impact: { value: '00', label: 'Indicateur à renseigner' },
    story: {
      question: 'Contenu à rédiger.',
      context: 'Contenu à rédiger.',
      discovery: 'Contenu à rédiger.',
      idea: 'Contenu à rédiger.',
      transformation: 'Contenu à rédiger.',
      impact: 'Contenu à rédiger.',
    },
  },
];

export const OBSERVATORY_THEMES = [
  'Performance', 'Clubs', 'Fédérations', 'Professionnalisation', 'Communication', 'Sponsoring',
  'Expérience spectateur', 'Innovation', 'Technologie', 'Intelligence artificielle', 'Économie', 'Internationalisation',
];

export const YOUTH_AXES = [
  'Performance', 'Analyse vidéo', 'Préparation', 'Objectifs', 'Progression', 'Technique',
  'Compétition', 'Autonomie', 'Développement humain', 'Projet sportif', 'Utilisation de l’IA',
];

export const BOOKING_REASONS = ['Premier échange', 'Projet', 'Innovation', 'Transformation', 'Partenariat', 'Autre'] as const;
export const BOOKING_DURATIONS = [30, 60, 90] as const;
