import type { Exam } from '@/types/database';

export const MAX_STUDENTS = 15;
export const MAX_ADMINS = 7;

export function addDays(dateStr: string, days: number): string {
  const date = new Date(`${dateStr}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

export function todayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export function applyReleaseWindow(exam: Exam, releaseDays: 1 | 2, startDate?: string): Exam {
  const available = startDate ?? todayDateString();
  return {
    ...exam,
    status: 'published',
    date_available: available,
    release_days: releaseDays,
    date_closes: addDays(available, releaseDays - 1),
    show_answers_after_submit: true,
    show_answers_when_all_done: false,
    ranking_visible_to_students: false,
    ranking_release: 'after_all_done',
  };
}

export function isExamOpen(exam: Exam, onDate = todayDateString()): boolean {
  if (exam.status !== 'published') return false;
  return onDate >= exam.date_available && onDate <= exam.date_closes;
}

export function isExamWindowClosed(exam: Exam, onDate = todayDateString()): boolean {
  return onDate > exam.date_closes;
}

export function getActivePublishedExam(exams: Exam[], onDate = todayDateString()): Exam | null {
  return exams.find((exam) => isExamOpen(exam, onDate)) ?? null;
}

export function formatReleaseWindow(exam: Exam): string {
  if (exam.date_available === exam.date_closes) {
    return `${exam.date_available} (1 dia)`;
  }
  return `${exam.date_available} a ${exam.date_closes} (${exam.release_days} dias)`;
}

export function defaultExamReleaseFields(dateAvailable: string): Pick<
  Exam,
  'date_closes' | 'release_days' | 'ranking_visible_to_students' | 'ranking_release'
> {
  return {
    date_closes: dateAvailable,
    release_days: 1,
    ranking_visible_to_students: false,
    ranking_release: 'after_all_done',
  };
}
