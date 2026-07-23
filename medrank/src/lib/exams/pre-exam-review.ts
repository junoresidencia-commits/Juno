import type { OptionLetter, Question } from '@/types/database';
import { auditQuestion, type QuestionAuditIssue } from '@/lib/question-bank/audit';

export type ReviewSeverity = 'ok' | 'warning' | 'error';

export type QuestionReviewResult = {
  questionId: string;
  severity: ReviewSeverity;
  codes: string[];
  message: string;
  aiNotes?: string;
  issues: QuestionAuditIssue[];
};

export type ExamReviewResult = {
  status: 'passed' | 'warning' | 'blocked';
  summary: string;
  reviews: QuestionReviewResult[];
  errorCount: number;
  warningCount: number;
};

const LEAK_DIAGNOSIS =
  /\b(diagn[oó]stico (mais )?prov[aá]vel|trata-se de|compat[ií]vel com|quadro (t[ií]pico|cl[aá]ssico) de)\b/i;

function optionsOf(q: Question): { letter: OptionLetter; text: string }[] {
  const letters: OptionLetter[] = ['A', 'B', 'C', 'D', 'E'];
  return letters
    .map((letter) => ({
      letter,
      text: String(q[`option_${letter.toLowerCase()}` as keyof Question] ?? '').trim(),
    }))
    .filter((o) => o.text.length > 0);
}

/** Revisão profunda (heurística clínica + estrutural) — “IA” local sem API. */
export function reviewQuestionDeep(q: Question): QuestionReviewResult {
  const issues = auditQuestion(q);
  const codes = new Set(issues.map((i) => i.code));
  const opts = optionsOf(q);
  const correct = String(q.correct_option || '').toUpperCase() as OptionLetter;
  const correctText = opts.find((o) => o.letter === correct)?.text ?? '';
  const statement = String(q.statement ?? '');

  // Vazamento de diagnóstico no enunciado
  if (LEAK_DIAGNOSIS.test(statement) && (q.topic || q.subtopic)) {
    issues.push({
      code: 'diagnosis_leak_stem',
      severity: 'warning',
      message: 'Enunciado pode entregar o diagnóstico; revise se a pergunta ainda exige raciocínio',
    });
    codes.add('diagnosis_leak_stem');
  }

  // Gabarito com linguagem de “aula” demais vs distratores telegráficos
  if (correctText.length > 220 && opts.some((o) => o.letter !== correct && o.text.length < 40)) {
    issues.push({
      code: 'textbook_correct',
      severity: 'error',
      message: 'Gabarito em formato de aula e distratores curtos — vazamento visual',
    });
    codes.add('textbook_correct');
  }

  // Alternativas quase iguais
  for (let i = 0; i < opts.length; i++) {
    for (let j = i + 1; j < opts.length; j++) {
      const a = opts[i].text.toLowerCase().slice(0, 80);
      const b = opts[j].text.toLowerCase().slice(0, 80);
      if (a.length > 40 && a === b) {
        issues.push({
          code: 'near_duplicate',
          severity: 'error',
          message: `Alternativas ${opts[i].letter} e ${opts[j].letter} praticamente iguais`,
        });
        codes.add('near_duplicate');
      }
    }
  }

  // Sem opção E em prova adulta de 5 alternativas esperadas (só warning)
  if (opts.length === 4 && /resid|cl[ií]nica|adulto|nefro(?!ped)/i.test(`${q.source} ${q.specialty}`)) {
    issues.push({
      code: 'four_options_only',
      severity: 'warning',
      message: 'Apenas 4 alternativas (comum em pediatria; ok se for o padrão da banca)',
    });
    codes.add('four_options_only');
  }

  // Explicação contradiz gabarito (menção a outra letra como correta)
  const expl = String(q.explanation ?? '');
  const otherLetters = (['A', 'B', 'C', 'D', 'E'] as OptionLetter[]).filter((L) => L !== correct);
  for (const L of otherLetters) {
    const re = new RegExp(`(?:gabarito|correta|resposta)\\s*(?:[ée]|é|:)?\\s*${L}\\b`, 'i');
    if (re.test(expl)) {
      issues.push({
        code: 'explanation_mismatch',
        severity: 'error',
        message: `Explicação parece indicar gabarito ${L}, mas o campo está ${correct}`,
      });
      codes.add('explanation_mismatch');
    }
  }

  const hasError = issues.some((i) => i.severity === 'error');
  const hasWarn = issues.some((i) => i.severity === 'warning');
  const severity: ReviewSeverity = hasError ? 'error' : hasWarn ? 'warning' : 'ok';

  const message =
    severity === 'ok'
      ? 'Ok para disputa'
      : issues
          .slice(0, 3)
          .map((i) => i.message)
          .join('; ');

  return {
    questionId: q.id,
    severity,
    codes: [...codes],
    message,
    issues,
  };
}

/** Opcional: enriquece com LLM se OPENAI_API_KEY estiver configurada. */
export async function reviewQuestionWithOptionalAi(q: Question): Promise<QuestionReviewResult> {
  const base = reviewQuestionDeep(q);
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key || base.severity === 'ok') return base;

  try {
    const prompt = `Você é revisor de questões de prova de residência médica (NRE).
Avalie se a questão está apta: enunciado, alternativas A-E, gabarito, explicação.
Responda JSON: {"apt":true|false,"severity":"ok"|"warning"|"error","note":"..."}.
Critérios de error: gabarito óbvio por tamanho, ambiguidade grave, gabarito provavelmente errado, distratores absurdos.
Questão:
${JSON.stringify({
  statement: q.statement,
  options: {
    A: q.option_a,
    B: q.option_b,
    C: q.option_c,
    D: q.option_d,
    E: q.option_e,
  },
  correct: q.correct_option,
  explanation: (q.explanation || '').slice(0, 400),
})}`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_REVIEW_MODEL || 'gpt-4o-mini',
        temperature: 0,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'Revisor rigoroso de questões de residência. JSON apenas.' },
          { role: 'user', content: prompt },
        ],
      }),
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) return base;
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const raw = data.choices?.[0]?.message?.content || '{}';
    const parsed = JSON.parse(raw) as {
      apt?: boolean;
      severity?: ReviewSeverity;
      note?: string;
    };

    if (parsed.severity === 'error' || parsed.apt === false) {
      return {
        ...base,
        severity: 'error',
        codes: [...new Set([...base.codes, 'ai_reject'])],
        message: parsed.note || base.message,
        aiNotes: parsed.note,
      };
    }
    if (parsed.severity === 'warning') {
      return {
        ...base,
        severity: base.severity === 'error' ? 'error' : 'warning',
        codes: [...new Set([...base.codes, 'ai_warning'])],
        aiNotes: parsed.note,
        message: parsed.note || base.message,
      };
    }
    return { ...base, aiNotes: parsed.note };
  } catch {
    return base;
  }
}

export function summarizeExamReviews(reviews: QuestionReviewResult[]): ExamReviewResult {
  const errorCount = reviews.filter((r) => r.severity === 'error').length;
  const warningCount = reviews.filter((r) => r.severity === 'warning').length;
  const status: ExamReviewResult['status'] =
    errorCount > 0 ? 'blocked' : warningCount > 0 ? 'warning' : 'passed';

  const summary =
    status === 'passed'
      ? `Revisão OK: ${reviews.length} questões aptas para a disputa.`
      : status === 'warning'
        ? `Revisão com avisos: ${warningCount} questão(ões) com alerta — revise antes se possível.`
        : `Revisão bloqueou a prova: ${errorCount} questão(ões) com problema grave. Substitua ou aprove manualmente.`;

  return { status, summary, reviews, errorCount, warningCount };
}

/** Filtra pool removendo questões que a revisão marca como error. */
export function filterReviewReady(pool: Question[]): Question[] {
  return pool.filter((q) => reviewQuestionDeep(q).severity !== 'error');
}
