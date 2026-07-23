import type { OptionLetter, Question } from '@/types/database';
import { auditQuestion, type QuestionAuditIssue } from '@/lib/question-bank/audit';

export type ReviewSeverity = 'ok' | 'warning' | 'error';

export type AiQuestionScores = {
  specialty: string;
  difficulty: 'facil' | 'medio' | 'dificil' | string;
  stemQuality: number; // 0-100
  gabaritoConfidence: number; // 0-100
  ambiguity: 'ausente' | 'leve' | 'grave' | string;
  alternativesQuality: number; // 0-100
  scientificCurrency: number; // 0-100
  overallQuality: number; // 0-100
  singleCorrect: boolean;
  hasJustification: boolean;
  vignetteComplete: boolean;
  askType:
    | 'conduta'
    | 'diagnostico'
    | 'tratamento'
    | 'proximo_passo'
    | 'interpretacao'
    | 'complicacao_prognostico'
    | 'outro'
    | string;
};

export type QuestionReviewResult = {
  questionId: string;
  severity: ReviewSeverity;
  codes: string[];
  message: string;
  aiNotes?: string;
  issues: QuestionAuditIssue[];
  scores?: AiQuestionScores;
  approved: boolean;
};

export type ExamReviewResult = {
  status: 'passed' | 'warning' | 'blocked';
  summary: string;
  reviews: QuestionReviewResult[];
  errorCount: number;
  warningCount: number;
  approvedCount: number;
  secondPassNotes?: string;
};

/** Limiares obrigatórios para liberar questão na disputa (spec MedRank). */
export const REVIEW_THRESHOLDS = {
  overallQualityMin: 85,
  gabaritoConfidenceMin: 90,
  alternativesQualityMin: 85,
  ambiguityMustBe: 'ausente' as const,
};

export function requireOpenAiKey(): string {
  const raw = process.env.OPENAI_API_KEY?.trim() || '';
  // Remove BOM / reticências / espaços invisíveis que quebram headers HTTP (ByteString)
  const key = raw.replace(/^\uFEFF/, '').replace(/[^\x21-\x7E]/g, '').trim();
  if (!key) {
    throw new Error(
      'OPENAI_API_KEY obrigatoria para gerar/publicar a disputa. Configure na Vercel (e localmente) — sem ela a prova nao e publicada.'
    );
  }
  if (key.length < 20 || !/^sk-/.test(key)) {
    throw new Error(
      'OPENAI_API_KEY parece invalida. Na Vercel, cole apenas a chave (comeca com sk-), sem texto extra nem reticencias.'
    );
  }
  return key;
}

function optionsOf(q: Question): Record<string, string> {
  return {
    A: String(q.option_a || '').trim(),
    B: String(q.option_b || '').trim(),
    C: String(q.option_c || '').trim(),
    D: String(q.option_d || '').trim(),
    E: String(q.option_e || '').trim(),
  };
}

function structuralGate(q: Question): QuestionAuditIssue[] {
  return auditQuestion(q);
}

function passesThresholds(scores: AiQuestionScores, hasExplanation: boolean): {
  ok: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];
  if (scores.overallQuality < REVIEW_THRESHOLDS.overallQualityMin) {
    reasons.push(`qualidade geral ${scores.overallQuality}% < ${REVIEW_THRESHOLDS.overallQualityMin}%`);
  }
  if (scores.gabaritoConfidence < REVIEW_THRESHOLDS.gabaritoConfidenceMin) {
    reasons.push(
      `confiança no gabarito ${scores.gabaritoConfidence}% < ${REVIEW_THRESHOLDS.gabaritoConfidenceMin}%`
    );
  }
  if (scores.alternativesQuality < REVIEW_THRESHOLDS.alternativesQualityMin) {
    reasons.push(
      `qualidade das alternativas ${scores.alternativesQuality}% < ${REVIEW_THRESHOLDS.alternativesQualityMin}%`
    );
  }
  if (String(scores.ambiguity).toLowerCase() !== REVIEW_THRESHOLDS.ambiguityMustBe) {
    reasons.push(`ambiguidade="${scores.ambiguity}" (exige ausente)`);
  }
  if (!scores.singleCorrect) reasons.push('não há uma única resposta inequívoca');
  if (!hasExplanation || !scores.hasJustification) reasons.push('justificativa ausente/insuficiente');
  if (!scores.vignetteComplete) {
    reasons.push('vinheta incompleta (idade/história/exame/labs)');
  }
  return { ok: reasons.length === 0, reasons };
}

async function callOpenAiJson(prompt: string): Promise<Record<string, unknown>> {
  // Undici/fetch exige ByteString (Latin-1) em headers. Chave colada com
  // caracteres como "…" (U+2026) gera: "Cannot convert argument to a ByteString".
  const key = requireOpenAiKey().replace(/[^\x21-\x7E]/g, '').trim();
  if (key.length < 20) {
    throw new Error(
      'OPENAI_API_KEY invalida na Vercel (caracteres estranhos ou chave incompleta). Gere de novo em platform.openai.com e cole so a chave sk-...'
    );
  }

  const headers = new Headers();
  headers.set('Authorization', `Bearer ${key}`);
  headers.set('Content-Type', 'application/json');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: (process.env.OPENAI_REVIEW_MODEL || 'gpt-4o-mini').replace(/[^\x21-\x7E]/g, ''),
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'Voce e revisor senior de questoes de prova de titulo (SBN), residencia medica e NRE. Seja rigoroso. Responda so JSON valido.',
        },
        { role: 'user', content: prompt },
      ],
    }),
    signal: AbortSignal.timeout(45000),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const safe = text.replace(/[^\x20-\x7E\n]/g, '?').slice(0, 200);
    throw new Error(`Falha OpenAI (${res.status}): ${safe}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const raw = data.choices?.[0]?.message?.content || '{}';
  return JSON.parse(raw) as Record<string, unknown>;
}

/**
 * Revisão clínica obrigatória via OpenAI.
 * Questão só é aprovada se passar nos limiares de qualidade.
 */
export async function reviewQuestionMandatoryAi(q: Question): Promise<QuestionReviewResult> {
  const { evaluateQuestionQualityLocal } = await import(
    '@/lib/question-bank/quality-review'
  );
  const localQuality = evaluateQuestionQualityLocal(q);
  const structural = structuralGate(q);
  const codes = new Set(structural.map((i) => i.code));
  const hasExplanation = String(q.explanation || '').trim().length >= 80;

  // Falha dura local: só vazamentos/absurdos/tamanho óbvio — o resto a IA decide.
  const hardFail =
    structural.some((i) => i.severity === 'error') ||
    !localQuality.noAnswerExplanationInsideOptions ||
    !localQuality.noAbsurdDistractors ||
    !localQuality.correctAnswerNotObviousByLength ||
    localQuality.qualityScore < 50;

  if (hardFail) {
    return {
      questionId: q.id,
      severity: 'error',
      codes: [...codes, 'structural_fail', 'local_quality_fail'],
      message: [
        ...structural.filter((i) => i.severity === 'error').map((i) => i.message),
        ...localQuality.rejectionReasons,
      ]
        .slice(0, 5)
        .join('; '),
      issues: structural,
      approved: false,
      scores: {
        specialty: String(q.specialty || q.topic || 'Geral'),
        difficulty: String(q.difficulty || 'medio'),
        stemQuality: localQuality.qualityScore,
        gabaritoConfidence: localQuality.correctAnswerNotObviousByLength ? 80 : 40,
        ambiguity: localQuality.ambiguityDetected ? 'grave' : 'ausente',
        alternativesQuality: localQuality.optionsHaveSimilarLength ? 80 : 40,
        scientificCurrency: 70,
        overallQuality: localQuality.qualityScore,
        singleCorrect: localQuality.hasSingleBestAnswer,
        hasJustification: localQuality.answerMatchesExplanation,
        vignetteComplete: localQuality.stemContainsRequiredInformation,
        askType: 'outro',
      },
    };
  }

  const prompt = `Você é revisor sênior de provas USP, ENARE, ENARI, federais, residência e título (SBN/nefrologia).
Revise esta questão para disputa diária. Se falhar em QUALQUER critério crítico, approved=false.

A questão DEVE exigir raciocínio clínico verdadeiro (não memorização óbvia).

APROVAÇÃO (todos obrigatórios):
1. Vinheta com dados que PERMITEM diferenciar hipóteses/condutas (idade, clínica, labs relevantes).
2. Pergunta de melhor conduta / diagnóstico mais provável / próximo passo / modalidade / timing.
3. Cinco alternativas A–E do MESMO domínio clínico, tamanho e estrutura SEMELHANTES.
4. Distratores = erros clínicos reais (dx diferencial próximo; conduta correta em outro contexto; momento errado; dose; contraindicação; modalidade inadequada à estabilidade).
5. UMA única melhor resposta; gabarito coerente com a explanation.
6. NÃO é possível acertar só pelo tamanho/detalhe da alternativa correta.
7. Nenhuma alternativa contém justificativa, meta-texto ou frases que denunciam o erro.
8. Nível comparável a USP/ENARE/título — NÃO fácil/previsível.

REPROVE se:
- correta é um "mini-aula" e erradas são curtas/absurdas (Litíase, Enurese, Pneumonia viral genérica);
- frases como "Esta abordagem atrasa…", "sem excluir contraindicações", "iniciar empiricamente…";
- enunciado já entrega o diagnóstico/conduta sem exigir interpretação;
- não há dúvida real entre 2–3 opções plausíveis;
- palavra gabarito / USP-5 / ENARE / MedRank / "estilo banca" no texto do aluno;
- ambiguidade; mais de uma resposta defensável; desatualização.

Responda JSON:
{
  "approved": boolean,
  "requiresClinicalReasoning": boolean,
  "specialty": string,
  "difficulty": "facil"|"medio"|"dificil",
  "stemQuality": 0-100,
  "gabaritoConfidence": 0-100,
  "ambiguity": "ausente"|"leve"|"grave",
  "alternativesQuality": 0-100,
  "scientificCurrency": 0-100,
  "overallQuality": 0-100,
  "singleCorrect": boolean,
  "hasJustification": boolean,
  "vignetteComplete": boolean,
  "distractorsOnTopic": boolean,
  "distractorsPlausible": boolean,
  "correctNotObviousByLength": boolean,
  "noMetaLabels": boolean,
  "askType": "conduta"|"diagnostico"|"tratamento"|"proximo_passo"|"interpretacao"|"complicacao_prognostico"|"outro",
  "problems": string[],
  "note": string
}

Questão:
${JSON.stringify({
  id: q.id,
  statement: q.statement,
  options: optionsOf(q),
  correct_option: q.correct_option,
  explanation: (q.explanation || '').slice(0, 1200),
  specialty: q.specialty,
  topic: q.topic,
  subtopic: q.subtopic,
  source: q.source,
  tags: q.tags,
  localQualityScore: localQuality.qualityScore,
})}`;

  const parsed = await callOpenAiJson(prompt);

  const scores: AiQuestionScores = {
    specialty: String(parsed.specialty || q.specialty || q.topic || 'Geral'),
    difficulty: String(parsed.difficulty || q.difficulty || 'medio'),
    stemQuality: Number(parsed.stemQuality ?? 0),
    gabaritoConfidence: Number(parsed.gabaritoConfidence ?? 0),
    ambiguity: String(parsed.ambiguity || 'grave'),
    alternativesQuality: Number(parsed.alternativesQuality ?? 0),
    scientificCurrency: Number(parsed.scientificCurrency ?? 0),
    overallQuality: Number(parsed.overallQuality ?? 0),
    singleCorrect: Boolean(parsed.singleCorrect),
    hasJustification: Boolean(parsed.hasJustification) && hasExplanation,
    vignetteComplete: Boolean(parsed.vignetteComplete),
    askType: String(parsed.askType || 'outro'),
  };

  const threshold = passesThresholds(scores, hasExplanation);
  const distractorsOk =
    parsed.distractorsOnTopic !== false && parsed.distractorsPlausible !== false;
  const noMeta = parsed.noMetaLabels !== false;
  const lengthOk = parsed.correctNotObviousByLength !== false;
  const reasoningOk = parsed.requiresClinicalReasoning !== false;
  const aiApproved =
    parsed.approved === true &&
    threshold.ok &&
    distractorsOk &&
    noMeta &&
    lengthOk &&
    reasoningOk;
  const problems = [
    ...(Array.isArray(parsed.problems) ? parsed.problems.map(String) : []),
    ...threshold.reasons,
    ...(!distractorsOk ? ['distratores não plausíveis / fora do caso'] : []),
    ...(!noMeta ? ['meta-texto ou pista de gabarito'] : []),
    ...(!lengthOk ? ['gabarito óbvio por tamanho'] : []),
    ...(!reasoningOk ? ['não exige raciocínio clínico'] : []),
  ];

  if (!aiApproved) {
    for (const p of problems) codes.add(`ai:${p.slice(0, 40)}`);
    codes.add('ai_reject');
  }

  const severity: ReviewSeverity = aiApproved
    ? structural.some((i) => i.severity === 'warning')
      ? 'warning'
      : 'ok'
    : 'error';

  return {
    questionId: q.id,
    severity,
    codes: [...codes],
    message: aiApproved
      ? String(parsed.note || 'Aprovada pela revisão IA')
      : problems.slice(0, 4).join('; ') || String(parsed.note || 'Reprovada pela IA'),
    aiNotes: String(parsed.note || ''),
    issues: structural,
    scores,
    approved: aiApproved,
  };
}

/** Segunda passagem: conjunto completo (duplicatas, nível, coerência). */
export async function reviewExamSetSecondPass(questions: Question[]): Promise<{
  approved: boolean;
  notes: string;
  rejectIds: string[];
}> {
  requireOpenAiKey();
  const compact = questions.map((q, i) => ({
    order: i + 1,
    id: q.id,
    stem: String(q.statement || '').slice(0, 280),
    correct: q.correct_option,
    topic: q.topic,
    specialty: q.specialty,
  }));

  const parsed = await callOpenAiJson(`Segunda revisão do CONJUNTO de ${questions.length} questões da disputa diária.
Padrão: residência USP/ENARE (geral) ou título/nefrologista (nefro) — estilo real, não rótulo no texto.

Reprove e liste rejectIds se houver:
- repetição de raciocínio/alternativas;
- meta-texto (USP-5, ENARE, MedRank, banca, gabarito nas opções);
- distratores desconectados do caso;
- nível fácil/amador demais no lote;
- enunciados artificiais curtos.

Só aprove o lote se TODOS estiverem aptos (estilo verdadeiro USP/ENARE ou título).

JSON:
{
  "approved": boolean,
  "notes": string,
  "rejectIds": string[]
}

Lote:
${JSON.stringify(compact)}`);

  return {
    approved: parsed.approved === true && (!Array.isArray(parsed.rejectIds) || parsed.rejectIds.length === 0),
    notes: String(parsed.notes || ''),
    rejectIds: Array.isArray(parsed.rejectIds) ? parsed.rejectIds.map(String) : [],
  };
}

export function summarizeExamReviews(reviews: QuestionReviewResult[]): ExamReviewResult {
  const approvedCount = reviews.filter((r) => r.approved).length;
  const errorCount = reviews.filter((r) => !r.approved || r.severity === 'error').length;
  const warningCount = reviews.filter((r) => r.approved && r.severity === 'warning').length;
  const allApproved = reviews.length > 0 && approvedCount === reviews.length && errorCount === 0;

  const status: ExamReviewResult['status'] = allApproved
    ? warningCount > 0
      ? 'warning'
      : 'passed'
    : 'blocked';

  const summary = allApproved
    ? `Lote aprovado: ${approvedCount}/${reviews.length} questões passaram na revisão IA (qualidade≥${REVIEW_THRESHOLDS.overallQualityMin}%, gabarito≥${REVIEW_THRESHOLDS.gabaritoConfidenceMin}%).`
    : `Lote NÃO publicado: ${approvedCount}/${reviews.length} aprovadas · ${errorCount} reprovadas. A disputa só libera com 20/20.`;

  return { status, summary, reviews, errorCount, warningCount, approvedCount };
}

/** Compat: filtros locais rápidos antes de gastar tokens. */
export function reviewQuestionDeep(q: Question): QuestionReviewResult {
  const issues = structuralGate(q);
  const hasError = issues.some((i) => i.severity === 'error');
  return {
    questionId: q.id,
    severity: hasError ? 'error' : issues.length ? 'warning' : 'ok',
    codes: issues.map((i) => i.code),
    message: hasError ? issues.map((i) => i.message).join('; ') : 'Pré-filtro ok',
    issues,
    approved: !hasError,
  };
}

export function filterReviewReady(pool: Question[]): Question[] {
  return pool.filter((q) => reviewQuestionDeep(q).approved);
}

/** @deprecated use reviewQuestionMandatoryAi */
export async function reviewQuestionWithOptionalAi(q: Question): Promise<QuestionReviewResult> {
  return reviewQuestionMandatoryAi(q);
}
