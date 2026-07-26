import type { Exam } from '@/types/database';
import {
  EXAM_WINDOW_END_HOUR,
  EXAM_WINDOW_END_MINUTE,
  EXAM_WINDOW_START_HOUR,
  EXAM_WINDOW_START_MINUTE,
  boundsFromExamHours,
  formatExamWindowLabel,
  formatExamWindowShort,
  getExamWindowPhase,
  todayDateStringBrazil,
  type ExamWindowBounds,
} from '@/lib/exams/window';

export const MAX_ADMINS = 7;

export {
  formatExamWindowLabel,
  formatExamWindowShort,
  EXAM_WINDOW_START_HOUR,
  EXAM_WINDOW_END_HOUR,
  EXAM_WINDOW_START_MINUTE,
  EXAM_WINDOW_END_MINUTE,
} from '@/lib/exams/window';

function examWindowBounds(
  exam: Pick<Exam, 'window_start_hour' | 'window_end_hour'> | Exam
): ExamWindowBounds {
  return boundsFromExamHours(exam.window_start_hour, exam.window_end_hour);
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
  const b = examWindowBounds(exam);
  return (
    getExamWindowPhase(
      exam.date_available,
      now,
      b.startHour,
      b.endHour,
      b.startMinute,
      b.endMinute
    ) === 'open'
  );
}

export function canStartExam(exam: Exam, now = new Date()): boolean {
  return isExamOpen(exam, now);
}

export function isExamWindowClosed(exam: Exam, now = new Date()): boolean {
  const b = examWindowBounds(exam);
  const phase = getExamWindowPhase(
    exam.date_available,
    now,
    b.startHour,
    b.endHour,
    b.startMinute,
    b.endMinute
  );
  return phase === 'after' || phase === 'wrong_day';
}

export function getExamWindowStatus(exam: Exam, now = new Date()) {
  const b = examWindowBounds(exam);
  return getExamWindowPhase(
    exam.date_available,
    now,
    b.startHour,
    b.endHour,
    b.startMinute,
    b.endMinute
  );
}

export function formatExamWindowForExam(exam: Pick<Exam, 'window_start_hour' | 'window_end_hour'>) {
  const b = examWindowBounds(exam);
  return formatExamWindowShort(b.startHour, b.endHour, b.startMinute, b.endMinute);
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
