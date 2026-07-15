import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoDashboardData } from '@/lib/demo/presenters';
import { ensureDemoSeedUsers } from '@/lib/demo/seed-users';
import { mapRankingPreviewRows } from '@/components/ranking/RankingPreviewList';
import { AlunoHomeSimple } from '@/components/aluno/AlunoHomeSimple';
import {
  canStudentSeeTodayRanking,
  getTodayRankingDate,
} from '@/lib/exams/ranking-visibility';
import { getExamWindowStatus } from '@/lib/exams/release';
import { todayDateStringBrazil } from '@/lib/exams/window';
import { forfeitDemoAttempt } from '@/lib/demo/runtime';

export default async function AlunoDashboard() {
  const session = await requireAuth();
  if (!session.profile.active) redirect('/login?blocked=1');

  if (usesDemoStore()) {
    ensureDemoSeedUsers();
    const { userId } = session;
    let { todayExam, attempt, todayRankings, windowPhase, showRanking, rankingDate, finishedToday, streakDays } =
      getDemoDashboardData(userId);

    // Tolerância zero: tentativa abandonada / sem forfeit = anulada
    if (todayExam && attempt && !attempt.finished_at) {
      attempt = forfeitDemoAttempt(attempt.id, { violationType: 'abandoned_session' });
      ({ todayRankings, showRanking, finishedToday, streakDays } = getDemoDashboardData(userId));
      showRanking = canStudentSeeTodayRanking(todayExam, true);
    }

    const canContinue = false;
    const canStart = Boolean(todayExam && windowPhase === 'open' && !attempt);
    const completed = Boolean(todayExam && attempt?.finished_at && !attempt.forfeited);
    const forfeitedToday = Boolean(todayExam && attempt?.finished_at && attempt.forfeited);
    const missedToday = Boolean(todayExam && windowPhase === 'after' && !attempt?.finished_at);

    return (
      <AlunoHomeSimple
        name={session.profile.name}
        userId={userId}
        todayExam={todayExam}
        windowPhase={windowPhase}
        canStart={canStart}
        canContinue={canContinue}
        completed={completed}
        forfeitedToday={forfeitedToday}
        missedToday={missedToday}
        attemptId={attempt?.id}
        showRanking={showRanking}
        todayRankings={todayRankings}
        rankingDate={rankingDate}
        finishedToday={finishedToday}
        streakDays={streakDays}
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

  const windowPhase = todayExam ? getExamWindowStatus(todayExam) : null;

  let { data: attempt } = todayExam
    ? await supabase
        .from('attempts')
        .select('id, finished_at, submitted_automatically, forfeited, forfeit_reason')
        .eq('exam_id', todayExam.id)
        .eq('user_id', userId)
        .maybeSingle()
    : { data: null };

  if (attempt && !attempt.finished_at) {
    // Sessão abandonada (sem Continuar): anula com tolerância zero
    await supabase.rpc('forfeit_attempt', {
      p_attempt_id: attempt.id,
      p_violation_type: 'abandoned_session',
      p_question_id: null,
      p_elapsed_seconds: null,
      p_ip: null,
      p_device: null,
      p_browser: null,
      p_os: null,
      p_user_agent: null,
      p_metadata: { source: 'aluno_home' },
    });
    const { data: refreshed } = await supabase
      .from('attempts')
      .select('id, finished_at, submitted_automatically, forfeited, forfeit_reason')
      .eq('id', attempt.id)
      .single();
    attempt = refreshed;
  }

  const hasFinished = Boolean(attempt?.finished_at && !attempt?.forfeited);
  const showRanking = canStudentSeeTodayRanking(todayExam, hasFinished || Boolean(attempt?.forfeited));
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

  const canContinue = false;
  const canStart = Boolean(todayExam && windowPhase === 'open' && !attempt);
  const completed = Boolean(todayExam && attempt?.finished_at && !attempt.forfeited);
  const forfeitedToday = Boolean(todayExam && attempt?.finished_at && attempt.forfeited);
  const missedToday = Boolean(todayExam && windowPhase === 'after' && !attempt?.finished_at);

  return (
    <AlunoHomeSimple
      name={profile.name ?? 'Aluno'}
      userId={userId}
      todayExam={todayExam}
      windowPhase={windowPhase}
      canStart={canStart}
      canContinue={canContinue}
      completed={completed}
      forfeitedToday={forfeitedToday}
      missedToday={missedToday}
      attemptId={attempt?.id}
      showRanking={showRanking}
      todayRankings={mapRankingPreviewRows(todayRankings)}
      rankingDate={rankingDate}
    />
  );
}
