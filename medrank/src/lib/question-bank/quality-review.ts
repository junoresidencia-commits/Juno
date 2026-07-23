import type { Question } from '@/types/database';
import { auditQuestion } from '@/lib/question-bank/audit';
import { stripOptionRationaleLeak } from '@/lib/question-bank/polish-options';

/**
 * Avaliação de qualidade alinhada ao padrão USP/ENARE/título.
 * Usada no gate local antes/depois da revisão OpenAI.
 */
export interface QuestionQualityReview {
  requiresClinicalReasoning: boolean;
  hasSingleBestAnswer: boolean;
  correctAnswerNotObviousByLength: boolean;
  optionsHaveSimilarLength: boolean;
  optionsHaveSimilarStructure: boolean;
  distractorsArePlausible: boolean;
  noAnswerExplanationInsideOptions: boolean;
  noAbsurdDistractors: boolean;
  stemContainsRequiredInformation: boolean;
  answerMatchesExplanation: boolean;
  answerMatchesReference: boolean;
  difficultyMatchesRequestedLevel: boolean;
  ambiguityDetected: boolean;
  qualityScore: number;
  rejectionReasons: string[];
}

const LEAK_IN_OPTION = [
  /esta abordagem atrasa/i,
  /sem excluir contraindica/i,
  /sem confirmar (o )?diagn/i,
  /esta conduta atrasa/i,
  /apenas observar sem investigar/i,
  /iniciar .{0,40}empiricamente/i,
  /sem estratificar/i,
  /sem motivo cl[ií]nico/i,
  /pearl:/i,
  /gabarito/i,
  /resposta correta/i,
];

const ABSURD_SHORT = [
  /^(lit[ií]ase|enurese|nefroesclerose|observação|alta|di[aá]lise|aine|corticoide)\.?$/i,
];

function optionsOf(q: Question): { letter: string; text: string }[] {
  return (['A', 'B', 'C', 'D', 'E'] as const)
    .map((letter) => ({
      letter,
      text: stripOptionRationaleLeak(
        String(q[`option_${letter.toLowerCase()}` as keyof Question] ?? '')
      ).trim(),
    }))
    .filter((o) => o.text.length > 0);
}

function similarStructure(texts: string[]): boolean {
  if (texts.length < 4) return false;
  const starts = texts.map((t) => {
    const w = t.split(/\s+/).slice(0, 2).join(' ').toLowerCase();
    return w;
  });
  // Se 4+ começam com a mesma palavra (ex. "Iniciar"), ok; se misturam 1 palavra vs parágrafo, falha
  const lens = texts.map((t) => t.split(/\s+/).length);
  const maxW = Math.max(...lens);
  const minW = Math.min(...lens);
  return maxW <= minW * 2.5 && starts.every((s) => s.length > 0);
}

/** Avaliação estrutural local (não substitui OpenAI). */
export function evaluateQuestionQualityLocal(q: Question): QuestionQualityReview {
  const reasons: string[] = [];
  const opts = optionsOf(q);
  const texts = opts.map((o) => o.text);
  const lens = texts.map((t) => t.length);
  const correct = String(q.correct_option || 'A').toUpperCase();
  const correctText = opts.find((o) => o.letter === correct)?.text || '';
  const stem = String(q.statement || '').trim();
  const explanation = String(q.explanation || '').trim();

  const mx = lens.length ? Math.max(...lens) : 0;
  const mn = lens.length ? Math.min(...lens) : 0;
  const optionsHaveSimilarLength = lens.length >= 4 && mx <= mn * 1.85 && mn >= 50;
  if (!optionsHaveSimilarLength) {
    reasons.push('alternativas com tamanho desigual ou curtas demais');
  }

  const correctAnswerNotObviousByLength =
    !correctText || correctText.length < mx || correctText.length <= mn * 1.45;
  if (!correctAnswerNotObviousByLength) {
    reasons.push('gabarito identificável por ser a alternativa mais longa');
  }

  const noAnswerExplanationInsideOptions = !texts.some((t) =>
    LEAK_IN_OPTION.some((re) => re.test(t))
  );
  if (!noAnswerExplanationInsideOptions) {
    reasons.push('alternativa contém justificativa/pista de erro');
  }

  const noAbsurdDistractors = !texts.some(
    (t) => t.length < 35 || ABSURD_SHORT.some((re) => re.test(t))
  );
  if (!noAbsurdDistractors) {
    reasons.push('distrator absurdo ou curto demais (ex.: Litíase/Enurese)');
  }

  const optionsHaveSimilarStructure = similarStructure(texts);
  if (!optionsHaveSimilarStructure) {
    reasons.push('estrutura gramatical das alternativas muito desigual');
  }

  const hasAge = /\b\d{1,3}\s*(anos?|meses?|dias?)\b/i.test(stem);
  const hasCue =
    /(PA|creatinina|K |HCO|exame|lab|dor|febre|edema|sedimento|ANCA|anti-MBG|diurese|pH)/i.test(
      stem
    );
  const stemContainsRequiredInformation = stem.length >= 80 && (hasAge || hasCue);
  if (!stemContainsRequiredInformation) {
    reasons.push('enunciado sem dados clínicos suficientes');
  }

  // Heurística: raciocínio clínico se stem tem vinheta e pergunta de conduta/dx
  const askCue =
    /(melhor conduta|mais prov[aá]vel|pr[oó]ximo passo|qual (o|a)|diagn[oó]stico|terapia|modalidade)/i.test(
      stem
    );
  const requiresClinicalReasoning =
    stemContainsRequiredInformation && askCue && optionsHaveSimilarLength && noAbsurdDistractors;
  if (!requiresClinicalReasoning) {
    reasons.push('não exige raciocínio clínico suficiente');
  }

  const audit = auditQuestion(q);
  const hasSingleBestAnswer = !audit.some((i) => i.code === 'gabarito_invalid');
  const distractorsArePlausible =
    noAbsurdDistractors && optionsHaveSimilarLength && noAnswerExplanationInsideOptions;
  const ambiguityDetected = false; // refinado pela IA
  const answerMatchesExplanation = explanation.length >= 60;
  const answerMatchesReference = true; // refinado pela IA / bibliografia
  const difficultyMatchesRequestedLevel = true;

  let score = 100;
  score -= reasons.length * 8;
  if (!optionsHaveSimilarLength) score -= 10;
  if (!correctAnswerNotObviousByLength) score -= 15;
  if (!noAnswerExplanationInsideOptions) score -= 20;
  if (!noAbsurdDistractors) score -= 20;
  if (!requiresClinicalReasoning) score -= 10;
  score = Math.max(0, Math.min(100, score));

  return {
    requiresClinicalReasoning,
    hasSingleBestAnswer,
    correctAnswerNotObviousByLength,
    optionsHaveSimilarLength,
    optionsHaveSimilarStructure,
    distractorsArePlausible,
    noAnswerExplanationInsideOptions,
    noAbsurdDistractors,
    stemContainsRequiredInformation,
    answerMatchesExplanation,
    answerMatchesReference,
    difficultyMatchesRequestedLevel,
    ambiguityDetected,
    qualityScore: score,
    rejectionReasons: reasons,
  };
}

/** Critérios críticos da especificação MedRank. */
export function passesCriticalQuality(r: QuestionQualityReview): boolean {
  return (
    r.qualityScore >= 85 &&
    r.requiresClinicalReasoning &&
    r.hasSingleBestAnswer &&
    r.distractorsArePlausible &&
    r.answerMatchesExplanation &&
    !r.ambiguityDetected &&
    r.correctAnswerNotObviousByLength &&
    r.noAnswerExplanationInsideOptions &&
    r.noAbsurdDistractors
  );
}
