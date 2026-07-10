import type { Question } from '@/types/database';
import { AREA_KEYWORDS, RESIDENCY_AREAS, type ResidencyArea } from '@/lib/question-bank/areas';

function haystack(question: Question): string {
  return [
    question.statement,
    question.specialty,
    question.topic,
    question.subtopic,
    ...(question.tags ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

const SPECIALTY_TO_AREA: Record<string, ResidencyArea> = {
  'clínica médica': 'Clínica Médica',
  'clinica medica': 'Clínica Médica',
  cirurgia: 'Cirurgia Geral',
  pediatria: 'Pediatria',
  'ginecologia e obstetrícia': 'Ginecologia e Obstetrícia',
  'medicina preventiva': 'Medicina Preventiva e Saúde Coletiva',
  go: 'Ginecologia e Obstetrícia',
};

export function classifyQuestionArea(question: Question): ResidencyArea {
  const text = haystack(question);

  for (const area of RESIDENCY_AREAS) {
    if (AREA_KEYWORDS[area].some((kw) => text.includes(kw))) {
      return area;
    }
  }

  const specialty = question.specialty?.toLowerCase().trim() ?? '';
  if (SPECIALTY_TO_AREA[specialty]) {
    return SPECIALTY_TO_AREA[specialty];
  }

  const topic = question.topic?.toLowerCase().trim() ?? '';
  if (SPECIALTY_TO_AREA[topic]) {
    return SPECIALTY_TO_AREA[topic];
  }

  return 'Clínica Médica';
}

export function isUspStyleQuestion(question: Question): boolean {
  const source = (question.source ?? '').toLowerCase();
  const tags = (question.tags ?? []).map((t) => t.toLowerCase());
  return source.includes('usp') || tags.some((t) => t.includes('usp') || t.includes('fuvest'));
}

export function isEnareStyleQuestion(question: Question): boolean {
  const source = (question.source ?? '').toLowerCase();
  const tags = (question.tags ?? []).map((t) => t.toLowerCase());
  return source.includes('enare') || tags.some((t) => t.includes('enare'));
}
