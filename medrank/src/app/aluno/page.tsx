import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoDashboardData } from '@/lib/demo/presenters';
import { ensureDemoSeedUsers } from '@/lib/demo/seed-users';
import { forfeitAbandonedDemoAttempt } from '@/lib/demo/runtime';
import { mapRankingPreviewRows } from '@/components/ranking/RankingPreviewList';
import { AlunoHomeSimple } from '@/components/aluno/AlunoHomeSimple';
import {
  canStudentSeeTodayRanking,
  getTodayRankingDate,
} from '@/lib/exams/ranking-visibility';
import { getExamWindowStatus } from '@/lib/exams/release';
import { todayDateStringBrazil } from '@/lib/exams/window';

export default async function AlunoDashboard() {
  const session = await requireAuth();
  if (!session.profile.active) redirect('/login?blocked=1');

  if (usesDemoStore()) {
    ensureDemoSeedUsers();
    const { userId } = session;
    let { todayExam, attempt, todayRankings, windowPhase, showRanking, rankingDate } =
      getDemoDashboardData(userId);

    if (todayExam && attempt && !attempt.finished_at) {
      forfeitAbandonedDemoAttempt(todayExam.id, userId);
      const refreshed = getDemoDashboardData(userId);
      attempt = refreshed.attempt;
      todayRankings = refreshed.todayRankings;
      showRanking = refreshed.showRanking;
    }

    const canStart = Boolean(todayExam && windowPhase === 'open' && !attempt);
    const completed = Boolean(todayExam && attempt?.finished_at);
    const forfeitedToday = Boolean(todayExam && attempt?.finished_at && attempt.forfeited);
    const missedToday = Boolean(todayExam && windowPhase === 'after' && !attempt?.finished_at);

    return (
      <AlunoHomeSimple
        name={session.profile.name}
        userId={userId}
        todayExam={todayExam}
        windowPhase={windowPhase}
        canStart={canStart}
        completed={completed}
        forfeitedToday={forfeitedToday}
        missedToday={missedToday}
        attemptId={attempt?.id}
        showRanking={showRanking}
        todayRankings={todayRankings}
        rankingDate={rankingDate}
      />
    );
  }

  const supabase = await createClient();
  const userId = session.userId;
  const profile = session.profile;
  const today = todayDateStringBrazil();

  const { data: todayExam } = await supabase
    .from('exams')
    .select('*')
    .eq('date_available', today)
    .eq('status', 'published')
    .maybeSingle();

  const { data: attempt } = todayExam
    ? await supabase
        .from('attempts')
        .select('id, finished_at, submitted_automatically')
        .eq('exam_id', todayExam.id)
        .eq('user_id', userId)
        .maybeSingle()
    : { data: null };

  if (attempt && !attempt.finished_at) {
    await supabase.rpc('submit_attempt', {
      p_attempt_id: attempt.id,
      p_auto: true,
    });
  }

  const forfeitedOnLoad = Boolean(attempt && !attempt.finished_at);

  const { data: finalAttempt } = todayExam
    ? await supabase
        .from('attempts')
        .select('id, finished_at, submitted_automatically')
        .eq('exam_id', todayExam.id)
        .eq('user_id', userId)
        .maybeSingle()
    : { data: null };

  const hasFinished = Boolean(finalAttempt?.finished_at);
  const showRanking = canStudentSeeTodayRanking(todayExam, hasFinished);
  const rankingDate = getTodayRankingDate();

  const { data: todayRankings } = showRanking
    ? await supabase
        .from('rankings')
        .select('id, position, total_score, user_id, profiles(name)')
        .eq('period_type', 'daily')
        .eq('period_start', rankingDate)
        .order('position', { ascending: true })
        .limit(15)
    : { data: null };

  const windowPhase = todayExam ? getExamWindowStatus(todayExam) : null;
  const canStart = Boolean(todayExam && windowPhase === 'open' && !finalAttempt);
  const completed = Boolean(todayExam && finalAttempt?.finished_at);
  const forfeitedToday = forfeitedOnLoad;
  const missedToday = Boolean(todayExam && windowPhase === 'after' && !finalAttempt?.finished_at);

  return (
    <AlunoHomeSimple
      name={profile.name ?? 'Aluno'}
      userId={userId}
      todayExam={todayExam}
      windowPhase={windowPhase}
      canStart={canStart}
      completed={completed}
      forfeitedToday={forfeitedToday}
      missedToday={missedToday}
      attemptId={finalAttempt?.id}
      showRanking={showRanking}
      todayRankings={mapRankingPreviewRows(todayRankings)}
      rankingDate={rankingDate}
    />
  );
}
