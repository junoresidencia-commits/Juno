/** Resposta mais rápida que isso: acerto vale, mas sem bônus de velocidade (anti-chute) */
export const MIN_ANSWER_SECONDS = 8;

/** Pontos base por acerto (sem bônus de velocidade) */
export const QUESTION_BASE_POINTS = 85;
/** Bônus máximo por velocidade em cada questão */
export const QUESTION_MAX_SPEED_BONUS = 15;
/** Máximo por questão: 0–100 */
export const QUESTION_MAX_POINTS = QUESTION_BASE_POINTS + QUESTION_MAX_SPEED_BONUS;

export function getExamMaxScore(totalQuestions: number): number {
  return totalQuestions * QUESTION_MAX_POINTS;
}

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

export function formatRankingScoreExplanation(totalQuestions = 20): string {
  const maxScore = getExamMaxScore(totalQuestions);
  return `Cada acerto vale até ${QUESTION_MAX_POINTS} pts (${QUESTION_BASE_POINTS} base + até ${QUESTION_MAX_SPEED_BONUS} de bônus por velocidade). Prova de ${totalQuestions} questões: máximo ${maxScore.toLocaleString('pt-BR')} pts. Erro ou em branco = 0. Resposta em menos de ${MIN_ANSWER_SECONDS} s não ganha bônus.`;
}
