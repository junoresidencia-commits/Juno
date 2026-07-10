/** Segundos mínimos na questão antes de liberar alternativas (leitura) */
export const MIN_READING_SECONDS = 10;

/** Resposta mais rápida que isso: acerto vale, mas sem bônus de velocidade (anti-chute) */
export const MIN_ANSWER_SECONDS = 8;

const QUESTION_BASE_POINTS = 1000;
const QUESTION_MAX_SPEED_BONUS = 150;

export function getQuestionTimeLimitSeconds(durationMinutes: number, totalQuestions: number): number {
  const pooled = Math.floor((durationMinutes * 60) / Math.max(totalQuestions, 1));
  return Math.min(90, Math.max(60, pooled));
}

export function scoreQuestionAnswer(
  isCorrect: boolean,
  timeSpentSeconds: number,
  questionLimitSeconds: number
): number {
  if (!isCorrect) return 0;

  const clamped = Math.min(Math.max(timeSpentSeconds, 1), questionLimitSeconds);
  const speedRatio = 1 - clamped / questionLimitSeconds;
  let speedBonus = Math.round(speedRatio * QUESTION_MAX_SPEED_BONUS);

  if (timeSpentSeconds < MIN_ANSWER_SECONDS) {
    speedBonus = 0;
  }

  return QUESTION_BASE_POINTS + speedBonus;
}

export function calculateExamScoreFromAnswers(
  results: { isCorrect: boolean; timeSpentSeconds: number }[],
  questionLimitSeconds: number
): number {
  return results.reduce(
    (sum, row) => sum + scoreQuestionAnswer(row.isCorrect, row.timeSpentSeconds, questionLimitSeconds),
    0
  );
}

export function formatRankingScoreExplanation(): string {
  return 'Cada acerto vale pontos; quem responde certo mais rápido ganha bônus. Erro ou questão em branco = 0. Resposta instantânea não ganha bônus de velocidade.';
}
