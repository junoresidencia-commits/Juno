import type { SupabaseClient } from '@supabase/supabase-js';
import type { WeeklyChallenge } from '@/types/database';
import { getWeekEnd, getWeekStart } from '@/lib/periods';
import { getChallengeDescription } from '@/lib/challenges';

export interface ChallengeProgress {
  challenge: WeeklyChallenge;
  currentValue: number;
  completed: boolean;
  description: string;
}

function inWeek(dateStr: string, weekStart: string, weekEnd: string): boolean {
  return dateStr >= weekStart && dateStr <= weekEnd;
}

export async function fetchUserChallengeProgress(
  supabase: SupabaseClient,
  userId: string
): Promise<ChallengeProgress[]> {
  const weekStart = getWeekStart();
  const weekEnd = getWeekEnd();

  const [{ data: challenges }, { data: completions }, { data: attempts }] = await Promise.all([
    supabase
      .from('weekly_challenges')
      .select('*')
      .eq('week_start', weekStart)
      .eq('active', true),
    supabase
      .from('weekly_challenge_completions')
      .select('challenge_id')
      .eq('user_id', userId),
    supabase
      .from('attempts')
      .select('id, percentage, exams(date_available)')
      .eq('user_id', userId)
      .not('finished_at', 'is', null),
  ]);

  const completedIds = new Set((completions ?? []).map((c) => c.challenge_id));

  const weekAttempts = (attempts ?? []).filter((a) => {
    const exam = a.exams as unknown as { date_available: string } | null;
    return exam && inWeek(exam.date_available, weekStart, weekEnd);
  });

  const attemptIds = weekAttempts.map((a) => a.id);

  let topicAnswers: { is_correct: boolean | null; questions: unknown }[] = [];
  if (attemptIds.length > 0) {
    const { data } = await supabase
      .from('attempt_answers')
      .select('is_correct, questions(topic)')
      .in('attempt_id', attemptIds);
    topicAnswers = data ?? [];
  }

  const results: ChallengeProgress[] = [];

  for (const ch of challenges ?? []) {
    let currentValue = 0;

    if (ch.challenge_type === 'min_exams') {
      currentValue = weekAttempts.length;
    } else if (ch.challenge_type === 'min_accuracy') {
      currentValue = weekAttempts.length > 0
        ? Math.round(
            weekAttempts.reduce((s, a) => s + Number(a.percentage ?? 0), 0) / weekAttempts.length * 10
          ) / 10
        : 0;
    } else if (ch.challenge_type === 'topic_accuracy' && ch.topic) {
      const filtered = topicAnswers.filter((a) => {
        const q = a.questions as unknown as { topic: string | null };
        return q?.topic === ch.topic;
      });
      const correct = filtered.filter((a) => a.is_correct).length;
      currentValue = filtered.length > 0
        ? Math.round((correct / filtered.length) * 1000) / 10
        : 0;
    }

    results.push({
      challenge: ch as WeeklyChallenge,
      currentValue,
      completed: completedIds.has(ch.id),
      description: getChallengeDescription(ch.challenge_type, ch.target_value, ch.topic),
    });
  }

  return results;
}
