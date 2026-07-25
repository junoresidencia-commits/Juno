import type { Exam } from '@/types/database';
import {
  EXAM_WINDOW_END_HOUR,
  EXAM_WINDOW_START_HOUR,
  formatExamWindowLabel,
  formatExamWindowShort,
  getExamWindowPhase,
  todayDateStringBrazil,
} from '@/lib/exams/window';

export const MAX_ADMINS = 7;

export { formatExamWindowLabel, formatExamWindowShort, EXAM_WINDOW_START_HOUR, EXAM_WINDOW_END_HOUR } from '@/lib/exams/window';

function examWindowHours(exam: Pick<Exam, 'window_start_hour' | 'window_end_hour'> | Exam) {
  return {
    start: exam.window_start_hour ?? EXAM_WINDOW_START_HOUR,
    end: exam.window_end_hour ?? EXAM_WINDOW_END_HOUR,
  };
}

export function addDays(dateStr: string, days: number): string {
  const date = new Date(`${dateStr}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

export function todayDateString(): string {
  return todayDateStringBrazil();
}

export function applyReleaseWindow(exam: Exam, releaseDays: 1 | 2, startDate?: string): Exam {
  const available = startDate ?? todayDateString();
  return {
    ...exam,
    status: 'published',
    date_available: available,
    release_days: releaseDays,
    date_closes: addDays(available, releaseDays - 1),
    show_answers_after_submit: false,
    show_answers_when_all_done: false,
    ranking_visible_to_students: true,
    ranking_release: 'after_window',
  };
}

export function isExamOpen(exam: Exam, now = new Date()): boolean {
  if (exam.status !== 'published') return false;
  const { start, end } = examWindowHours(exam);
  return getExamWindowPhase(exam.date_available, now, start, end) === 'open';
}

export function canStartExam(exam: Exam, now = new Date()): boolean {
  return isExamOpen(exam, now);
}

export function isExamWindowClosed(exam: Exam, now = new Date()): boolean {
  const { start, end } = examWindowHours(exam);
  const phase = getExamWindowPhase(exam.date_available, now, start, end);
  return phase === 'after' || phase === 'wrong_day';
}

export function getExamWindowStatus(exam: Exam, now = new Date()) {
  const { start, end } = examWindowHours(exam);
  return getExamWindowPhase(exam.date_available, now, start, end);
}

export function formatExamWindowForExam(exam: Pick<Exam, 'window_start_hour' | 'window_end_hour'>) {
  const { start, end } = examWindowHours(exam);
  return formatExamWindowShort(start, end);
}

export function getActivePublishedExam(exams: Exam[], now = new Date()): Exam | null {
  const today = todayDateStringBrazil(now);
  return exams.find((exam) => exam.status === 'published' && exam.date_available === today) ?? null;
}

export function getTodaysExam(exams: Exam[], now = new Date()): Exam | null {
  return getActivePublishedExam(exams, now);
}

export function formatReleaseWindow(_exam: Exam): string {
  return formatExamWindowLabel();
}

export function defaultExamReleaseFields(dateAvailable: string): Pick<
  Exam,
  'date_closes' | 'release_days' | 'ranking_visible_to_students' | 'ranking_release'
> {
  return {
    date_closes: dateAvailable,
    release_days: 1,
    ranking_visible_to_students: true,
    ranking_release: 'after_window',
  };
}
