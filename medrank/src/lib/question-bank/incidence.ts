import type { Question } from '@/types/database';

export interface TopicIncidence {
  specialty: string;
  topic: string;
  count: number;
  share: number;
  difficulties: Record<string, number>;
  sources: Record<string, number>;
  styleBanks: Record<string, number>;
}

export interface BankIncidenceReport {
  total: number;
  generatedAt: string;
  bySpecialty: { specialty: string; count: number; share: number }[];
  byTopic: TopicIncidence[];
  bySource: { source: string; count: number }[];
  byStyle: { style: string; count: number }[];
  hotTopics: TopicIncidence[];
}

function bump(map: Record<string, number>, key: string, n = 1) {
  map[key] = (map[key] ?? 0) + n;
}

export function computeBankIncidence(questions: Question[]): BankIncidenceReport {
  const specialtyMap: Record<string, number> = {};
  const sourceMap: Record<string, number> = {};
  const styleMap: Record<string, number> = {};
  const topicMap = new Map<string, TopicIncidence>();

  for (const q of questions) {
    const specialty = q.specialty?.trim() || 'Não classificado';
    const topic = q.topic?.trim() || specialty;
    const key = `${specialty}::${topic}`;
    bump(specialtyMap, specialty);
    if (q.source) bump(sourceMap, q.source);

    for (const tag of q.tags ?? []) {
      if (tag.startsWith('estilo-')) bump(styleMap, tag.replace('estilo-', ''));
    }

    const current = topicMap.get(key) ?? {
      specialty,
      topic,
      count: 0,
      share: 0,
      difficulties: {},
      sources: {},
      styleBanks: {},
    };
    current.count += 1;
    bump(current.difficulties, q.difficulty || 'medio');
    if (q.source) bump(current.sources, q.source);
    for (const tag of q.tags ?? []) {
      if (tag.startsWith('estilo-')) bump(current.styleBanks, tag.replace('estilo-', ''));
    }
    topicMap.set(key, current);
  }

  const total = Math.max(questions.length, 1);
  const byTopic = [...topicMap.values()]
    .map((row) => ({ ...row, share: Number(((row.count / total) * 100).toFixed(2)) }))
    .sort((a, b) => b.count - a.count);

  const bySpecialty = Object.entries(specialtyMap)
    .map(([specialty, count]) => ({
      specialty,
      count,
      share: Number(((count / total) * 100).toFixed(2)),
    }))
    .sort((a, b) => b.count - a.count);

  return {
    total: questions.length,
    generatedAt: new Date().toISOString(),
    bySpecialty,
    byTopic,
    bySource: Object.entries(sourceMap)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count),
    byStyle: Object.entries(styleMap)
      .map(([style, count]) => ({ style, count }))
      .sort((a, b) => b.count - a.count),
    hotTopics: byTopic.slice(0, 40),
  };
}
