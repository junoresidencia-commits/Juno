import type { OptionLetter, Question } from '@/types/database';

export type OfficialValidationError = {
  code: string;
  message: string;
};

/** Validação automática antes de publicar no banco principal. */
export function validateOfficialQuestion(q: {
  statement?: string | null;
  option_a?: string | null;
  option_b?: string | null;
  option_c?: string | null;
  option_d?: string | null;
  option_e?: string | null;
  correct_option?: string | null;
  source?: string | null;
  institution?: string | null;
  year?: number | null;
  source_url?: string | null;
  question_origin?: string | null;
  reproduction_allowed?: boolean | null;
  official_answer?: string | null;
  image_url?: string | null;
  statement_requires_image?: boolean;
}): OfficialValidationError[] {
  const errors: OfficialValidationError[] = [];
  const stem = String(q.statement || '').trim();
  if (stem.length < 40) {
    errors.push({ code: 'stem', message: 'Enunciado incompleto' });
  }

  const opts = {
    A: String(q.option_a || '').trim(),
    B: String(q.option_b || '').trim(),
    C: String(q.option_c || '').trim(),
    D: String(q.option_d || '').trim(),
    E: String(q.option_e || '').trim(),
  };
  for (const L of ['A', 'B', 'C', 'D', 'E'] as const) {
    if (!opts[L]) errors.push({ code: 'option', message: `Falta alternativa ${L}` });
  }

  const correct = String(q.correct_option || q.official_answer || '')
    .toUpperCase()
    .slice(0, 1) as OptionLetter;
  if (!['A', 'B', 'C', 'D', 'E'].includes(correct)) {
    errors.push({ code: 'gabarito', message: 'Gabarito oficial ausente ou inválido' });
  } else if (!opts[correct]) {
    errors.push({ code: 'gabarito', message: 'Gabarito sem texto na alternativa' });
  }

  const year = q.year == null ? null : Number(q.year);
  if (year == null || year < 2020 || year > 2026) {
    errors.push({ code: 'year', message: 'Ano deve estar entre 2020 e 2026' });
  }

  const institution = String(q.institution || q.source || '').trim();
  if (!institution) {
    errors.push({ code: 'institution', message: 'Instituição obrigatória' });
  }

  if (!String(q.source_url || '').trim() && !String(q.source || '').trim()) {
    errors.push({ code: 'source', message: 'Fonte original obrigatória' });
  }

  if (q.reproduction_allowed !== true && q.question_origin !== 'official') {
    errors.push({
      code: 'license',
      message: 'Somente questões com uso permitido (official + reproduction_allowed)',
    });
  }

  // Imagem indispensável sem arquivo → não publicar
  if (q.statement_requires_image && !q.image_url) {
    errors.push({
      code: 'image',
      message: 'Questão depende de imagem/tabela indisponível — não publicar incompleta',
    });
  }

  const blob = `${stem}\n${Object.values(opts).join('\n')}`;
  if (
    /\(figura|\(imagem|\(radiograf|\(eletrocardi|vide\s+a\s+figura|observe a figura|a seguir\)/i.test(
      blob
    ) && !q.image_url
  ) {
    errors.push({
      code: 'image',
      message: 'Enunciado referencia figura/imagem sem arquivo anexado',
    });
  }

  return errors;
}

export function formatOriginalAttribution(q: Pick<Question, 'institution' | 'source' | 'year' | 'exam_name'>): string {
  const inst = String(q.institution || q.source || 'Instituição').trim();
  const year = q.year ? String(q.year) : 's/ ano';
  return `Questão original — ${inst} — ${year}`;
}
