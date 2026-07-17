import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Question } from '@/types/database';

export type TreinoTrack = 'nefropediatria' | 'nefrologia-avancada';

export const TRACK_CONFIG: Record<
  TreinoTrack,
  {
    label: string;
    file: string;
    tag: string;
    sizes: readonly number[];
    ligas: readonly string[];
    href: string;
  }
> = {
  nefropediatria: {
    label: 'Nefrologia Pediátrica',
    file: 'nefropediatria-questions.json',
    tag: 'nefropediatria',
    sizes: [20, 30, 60],
    ligas: ['Prova de Título Pediátrica'],
    href: '/aluno/treino/nefropediatria',
  },
  'nefrologia-avancada': {
    label: 'Nefrologia Avançada',
    file: 'nefrologia-avancada-questions.json',
    tag: 'nefrologia-avancada',
    sizes: [20, 30, 60, 100],
    ligas: [
      'Liga dos Nefrologistas',
      'Plantão',
      'R+ Nefrologia',
      'Prova de Título',
      'Hospital',
    ],
    href: '/aluno/treino/nefrologia',
  },
};

export const NEFROPEDIATRIA_TRACK = 'nefropediatria';
export const NEFROLOGIA_AVANCADA_TRACK = 'nefrologia-avancada';

export const TREINO_SIZE_OPTIONS = [20, 30, 60, 100] as const;
export type TreinoSize = (typeof TREINO_SIZE_OPTIONS)[number];

export function durationForCount(count: number): number {
  return Math.max(30, count * 3);
}

export const SRS_INTERVALS_DAYS = [1, 7, 15, 30, 90] as const;

const cacheByTrack: Partial<Record<TreinoTrack, Question[]>> = {};
const topicsByTrack: Partial<Record<TreinoTrack, string[]>> = {};

export function getTrackQuestionsFromFile(track: TreinoTrack): Question[] {
  if (cacheByTrack[track]) return cacheByTrack[track]!;

  const file = TRACK_CONFIG[track].file;
  const path = join(process.cwd(), 'data', file);
  if (!existsSync(path)) {
    cacheByTrack[track] = [];
    return cacheByTrack[track]!;
  }

  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { questions?: Question[] } | Question[];
  cacheByTrack[track] = Array.isArray(raw) ? raw : (raw.questions ?? []);
  return cacheByTrack[track]!;
}

export function getNefropediatriaQuestionsFromFile(): Question[] {
  return getTrackQuestionsFromFile('nefropediatria');
}

export function getNefrologiaAvancadaQuestionsFromFile(): Question[] {
  return getTrackQuestionsFromFile('nefrologia-avancada');
}

export function listTrackTopics(track: TreinoTrack): string[] {
  if (topicsByTrack[track]) return topicsByTrack[track]!;
  const set = new Set<string>();
  for (const q of getTrackQuestionsFromFile(track)) {
    if (q.topic) set.add(q.topic);
  }
  topicsByTrack[track] = [...set].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  return topicsByTrack[track]!;
}

export function listNefropediatriaTopics(): string[] {
  return listTrackTopics('nefropediatria');
}

export function shufflePick<T>(items: T[], count: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

export function stripAnswerFields(question: Question): Question {
  return {
    ...question,
    correct_option: 'A',
    explanation: null,
  };
}

/** Peso de temas por liga (Plantão → UTI/IRA; Título → mistura ampla) */
export function leagueTopicBias(liga: string | null | undefined): string[] | null {
  if (!liga) return null;
  const l = liga.toLowerCase();
  if (l.includes('plantão')) {
    return ['IRA', 'CRRT', 'SLED', 'UTI', 'Sepse', 'Hipercalemia', 'Gasometria', 'POCUS', 'VExUS'];
  }
  if (l.includes('hospital')) {
    return ['DRC', 'IRA', 'Transplante renal', 'Hemodiálise', 'Diálise peritoneal', 'Infectologia'];
  }
  if (l.includes('r+')) {
    return ['Glomerulopatias', 'Lúpus', 'Vasculites ANCA', 'DRC', 'IRA', 'Transplante renal'];
  }
  return null;
}
