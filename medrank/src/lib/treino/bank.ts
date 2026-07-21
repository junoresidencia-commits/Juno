import 'server-only';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Question } from '@/types/database';
import {
  TRACK_CONFIG,
  type TreinoTrack,
} from '@/lib/treino/config';

export {
  TRACK_CONFIG,
  NEFROPEDIATRIA_TRACK,
  NEFROLOGIA_AVANCADA_TRACK,
  TREINO_SIZE_OPTIONS,
  durationForCount,
  SRS_INTERVALS_DAYS,
  shufflePick,
  stripAnswerFields,
  leagueTopicBias,
  type TreinoTrack,
  type TreinoSize,
} from '@/lib/treino/config';

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
