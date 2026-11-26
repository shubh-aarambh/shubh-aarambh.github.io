export type DimensionMode = 'tech' | 'entertainment' | 'dual';

export interface CinemaItem {
  id: string;
  title: string;
  year: string;
  director: string;
  genre: string;
  rating: string;
  tagline: string;
  aiInsight: string;
  posterBg: string;
  accentColor: string;
  iconType: 'sci-fi' | 'drama' | 'tech' | 'cyberpunk';
}

export interface CreativePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  metrics: string;
  badge: string;
}

export const ENTERTAINMENT_PROFILE = {
  brandHeadline: 'The Creative Technologist & Media Visionary',
  stageName: 'Shubh // The Creator',
  tagline: 'Engineering is the engine. Storytelling & Entertainment is the fuel.',
  manifesto:
    'I believe code without storytelling is just cold electricity. Beyond building 10k req/s distributed architectures, I craft cinematic web experiences, synthesize reactive soundscapes, design compelling visual identities, and translate complex deep-tech into charismatic stage performances.',
  creativeRoles: [
    'Cinematic AI Architect',
    'Creative Director & Producer',
    'Audio Synthesizer & Sound Designer',
    'Stage Keynote Storyteller',
    'Media & Film Curator',
  ],
  stats: {
    cinemaReviewed: 140,
    audioTracksSynthesized: 18,
    hackathonKeynotes: 6,
    creativeUIsShipped: 12,
  },
};

export const CINEMA_VAULT: CinemaItem[] = [
  {
    id: 'interstellar',
    title: 'Interstellar',
    year: '2014',
    director: 'Christopher Nolan',
    genre: 'Hard Sci-Fi · Quantum Mechanics',
    rating: '8.7 / 10',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    aiInsight:
      'Masterclass in gravitational time dilation and emotional resonance. Inspired the visual pacing of my distributed system telemetries.',
    posterBg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #431407 100%)',
    accentColor: '#f59e0b',
    iconType: 'sci-fi',
  },
  {
    id: 'blade-runner-2049',
    title: 'Blade Runner 2049',
    year: '2017',
    director: 'Denis Villeneuve',
    genre: 'Cyberpunk Neo-Noir · AGI Ethics',
    rating: '8.0 / 10',
    tagline: 'The key to the future is finally unearthed.',
    aiInsight:
      'Definitive aesthetic blueprint for dark obsidian UI design, brutalist framing, and volumetric lighting.',
    posterBg: 'linear-gradient(135deg, #18181b 0%, #701a75 50%, #f43f5e 100%)',
    accentColor: '#f43f5e',
    iconType: 'cyberpunk',
  },
  {
    id: 'social-network',
    title: 'The Social Network',
    year: '2010',
    director: 'David Fincher',
    genre: 'Drama · Silicon Valley Origins',
    rating: '8.1 / 10',
    tagline: 'You don\'t get to 500 million friends without making a few enemies.',
    aiInsight:
      'Relentless rhythmic pacing and rapid-fire Sorkin dialogue that drives high-conviction product execution.',
    posterBg: 'linear-gradient(135deg, #020617 0%, #172554 50%, #0369a1 100%)',
    accentColor: '#38bdf8',
    iconType: 'tech',
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    year: '2023',
    director: 'Christopher Nolan',
    genre: 'Biographical Drama · Theoretical Physics',
    rating: '8.9 / 10',
    tagline: 'Now I am become Death, the destroyer of worlds.',
    aiInsight:
      'A study in theoretical systems, high-stakes leadership, and auditory dread. Showcases how sound design carries narrative weight.',
    posterBg: 'linear-gradient(135deg, #18181b 0%, #7c2d12 50%, #ea580c 100%)',
    accentColor: '#fb923c',
    iconType: 'drama',
  },
];

export const CREATIVE_PILLARS: CreativePillar[] = [
  {
    id: 'cinematic-ai',
    title: 'Cinematic AI & Media Engines',
    subtitle: 'ScreenTop AI & Multimodal Intelligence',
    description:
      'Combining Google Gemini 1.5 with OMDB and real-time streaming APIs to analyze film scripts, predict cinematic audience sentiments, and deliver intelligent movie curation.',
    iconName: 'Clapperboard',
    metrics: 'ScreenTop AI Live on Vercel',
    badge: 'Media + AI',
  },
  {
    id: 'audio-synthesis',
    title: 'Web Audio & Sonic Branding',
    subtitle: 'Micro-synthesizers & Reactive Soundscapes',
    description:
      'Synthesizing tactile UI micro-frequencies and melodic ambient stems natively using the Web Audio API without bulky external audio MP3 bloat.',
    iconName: 'Disc',
    metrics: '<15KB Pure Code Audio Engine',
    badge: 'Synthesizers',
  },
  {
    id: 'stage-presence',
    title: 'Keynote Charisma & Storytelling',
    subtitle: 'Translating Deep-Tech into Human Emotion',
    description:
      'Turning distributed Kubernetes pipelines and Go engines into high-energy live demos, hackathon pitch decks, and captivating technical narratives.',
    iconName: 'Mic',
    metrics: 'Winner & Finalist Presentations',
    badge: 'Live Keynotes',
  },
  {
    id: 'visual-direction',
    title: 'Creative Direction & Kinetic UI',
    subtitle: 'Awwwards-Level Design Craft',
    description:
      'Moving past generic dashboard boilerplate with bespoke 3D tilt cards, spatial canvas graphs, magnetic cursors, and cinematic glassmorphism.',
    iconName: 'Sparkles',
    metrics: '100% Bespoke Craft',
    badge: 'Visual Identity',
  },
];

export const SYNTH_TRACKS = [
  {
    id: 'track-cyberpunk',
    name: 'Neon Grid Pulse',
    bpm: 124,
    genre: 'Cyberpunk Arp',
    notes: [220, 261.63, 329.63, 392, 440, 523.25, 440, 329.63],
    color: '#f43f5e',
  },
  {
    id: 'track-lofi',
    name: 'Bengaluru Midnight Hack',
    bpm: 84,
    genre: 'Lo-Fi Chillhop Stem',
    notes: [174.61, 220, 261.63, 329.63, 261.63, 220],
    color: '#a78bfa',
  },
  {
    id: 'track-cinema',
    name: 'Interstellar Sub-Bass Horizon',
    bpm: 65,
    genre: 'Cinematic Drone',
    notes: [110, 130.81, 164.81, 220],
    color: '#f59e0b',
  },
];
