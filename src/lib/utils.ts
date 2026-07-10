import type { ImportQuestionRow } from '@/types/database';
import { getSecondsUntilWindowClose } from '@/lib/exams/window';

const DIFFICULTY_MAP: Record<string, 'facil' | 'medio' | 'dificil'> = {
  facil: 'facil',
  fácil: 'facil',
  easy: 'facil',
  medio: 'medio',
  médio: 'medio',
  medium: 'medio',
  dificil: 'dificil',
  difícil: 'dificil',
  hard: 'dificil',
};

export function parseImportRow(row: ImportQuestionRow) {
  const correct = row.correta?.trim().toUpperCase();
  if (!['A', 'B', 'C', 'D', 'E'].includes(correct)) {
    throw new Error(`Alternativa correta inválida: ${row.correta}`);
  }

  const difficultyKey = row.dificuldade?.toLowerCase().trim() ?? '';
  const difficulty = DIFFICULTY_MAP[difficultyKey] ?? null;

  return {
    statement: row.enunciado?.trim(),
    option_a: row.alternativa_a?.trim(),
    option_b: row.alternativa_b?.trim(),
    option_c: row.alternativa_c?.trim(),
    option_d: row.alternativa_d?.trim(),
    option_e: row.alternativa_e?.trim(),
    correct_option: correct as 'A' | 'B' | 'C' | 'D' | 'E',
    explanation: row.comentario?.trim() || null,
    source: row.origem?.trim() || null,
    year: row.ano ? Number(row.ano) : null,
    specialty: row.especialidade?.trim() || null,
    topic: row.tema?.trim() || null,
    subtopic: row.subtema?.trim() || null,
    difficulty,
    tags: row.tags
      ? row.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [],
  };
}

export function calculateRankingScore(
  totalCorrect: number,
  totalQuestions: number,
  durationSeconds: number
): number {
  // Mais acertos = mais pontos; em empate, quem foi mais rápido ganha
  const accuracyPoints = totalCorrect * 1000;
  const maxDuration = Math.max(totalQuestions * 90, 60);
  const clampedDuration = Math.min(Math.max(durationSeconds, 1), maxDuration);
  const speedPoints = Math.round((1 - clampedDuration / maxDuration) * totalQuestions * 10);
  return accuracyPoints + speedPoints;
}

export function formatRankingScoreExplanation(): string {
  return 'Pontuação: mais acertos valem mais; em empate, quem termina mais rápido ganha.';
}

export function compareRankings(
  a: { total_correct: number; total_time_seconds: number; streak_days: number },
  b: { total_correct: number; total_time_seconds: number; streak_days: number }
): number {
  if (b.total_correct !== a.total_correct) return b.total_correct - a.total_correct;
  if (a.total_time_seconds !== b.total_time_seconds) return a.total_time_seconds - b.total_time_seconds;
  return b.streak_days - a.streak_days;
}

export function getExamExpiresAt(startedAt: string, durationMinutes: number): Date {
  return new Date(new Date(startedAt).getTime() + durationMinutes * 60 * 1000);
}

export function getRemainingSeconds(startedAt: string, durationMinutes: number): number {
  const expires = getExamExpiresAt(startedAt, durationMinutes);
  return Math.max(0, Math.floor((expires.getTime() - Date.now()) / 1000));
}

export function getEffectiveExamRemainingSeconds(
  startedAt: string,
  durationMinutes: number,
  now = new Date()
): number {
  return Math.min(
    getRemainingSeconds(startedAt, durationMinutes),
    getSecondsUntilWindowClose(now)
  );
}
