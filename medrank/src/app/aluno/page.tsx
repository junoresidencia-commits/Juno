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
import { ensureBothDailyExams } from '@/lib/exams/ensure-daily';
import { audienceLabel, resolveUserExamAudience } from '@/lib/exams/audience';
import { shortTrackLabel, trackForDate } from '@/lib/exams/daily-schedule';

export default async function AlunoDashboard() {
  const session = await requireAuth();
  if (!session.profile.active) redirect('/login?blocked=1');

  const today = todayDateStringBrazil();
  const ctx = await resolveUserExamAudience(session.userId);
  const trackLabel =
    ctx.audience === 'nephrology'
      ? shortTrackLabel(trackForDate(today))
      : 'Residência (disputa geral)';
  const leagueLabel =
    ctx.audience === 'nephrology'
      ? ctx.leagueName ?? audienceLabel('nephrology')
      : null;

  if (usesDemoStore()) {
    ensureDemoSeedUsers();
    const { userId } = session;
    const { todayExam, attempt, todayRankings, windowPhase, showRanking, rankingDate, finishedToday, streakDays } =
      getDemoDashboardData(userId);

    const canContinue = Boolean(todayExam && windowPhase === 'open' && attempt && !attempt.finished_at);
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
        trackLabel={trackLabel}
        leagueLabel={leagueLabel ?? undefined}
      />
    );
  }

  const supabase = await createClient();
  const userId = session.userId;
  const profile = session.profile;

  // Garante as duas disputas do dia; o aluno só vê a da sua liga
  await ensureBothDailyExams(today);

  const { data: todayExam } = await supabase
    .from('exams')
    .select('*')
    .eq('date_available', today)
    .eq('audience', ctx.audience)
    .eq('status', 'published')
    .maybeSingle();

  const windowPhase = todayExam ? getExamWindowStatus(todayExam) : null;

  let { data: attempt } = todayExam
    ? await supabase
        .from('attempts')
        .select('id, finished_at, submitted_automatically, forfeited')
        .eq('exam_id', todayExam.id)
        .eq('user_id', userId)
        .maybeSingle()
    : { data: null };

  // Saiu da prova / aba abandonada → forfeit (antifraude)
  if (attempt && !attempt.finished_at && windowPhase === 'open') {
    const { createAdminClient } = await import('@/lib/supabase/admin');
    const admin = createAdminClient();
    await (admin ?? supabase).rpc('forfeit_attempt', {
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
      .select('id, finished_at, submitted_automatically, forfeited')
      .eq('id', attempt.id)
      .single();
    attempt = refreshed;
  } else if (attempt && !attempt.finished_at && windowPhase === 'after') {
    await supabase.rpc('submit_attempt', {
      p_attempt_id: attempt.id,
      p_auto: true,
    });
    const { data: refreshed } = await supabase
      .from('attempts')
      .select('id, finished_at, submitted_automatically, forfeited')
      .eq('id', attempt.id)
      .single();
    attempt = refreshed;
  }

  const hasFinished = Boolean(attempt?.finished_at);
  const showRanking = canStudentSeeTodayRanking(todayExam, hasFinished);
  const rankingDate = getTodayRankingDate();

  // Ranking da Liga de Nefrologia vs ranking global (disputa geral)
  let todayRankings = null;
  if (showRanking) {
    if (ctx.audience === 'nephrology' && ctx.leagueId) {
      const { data } = await supabase
        .from('study_group_rankings')
        .select('id, position, total_score, user_id, profiles(name)')
        .eq('group_id', ctx.leagueId)
        .eq('period_type', 'daily')
        .eq('period_start', rankingDate)
        .order('position', { ascending: true })
        .limit(15);
      todayRankings = data;
    } else {
      const { data } = await supabase
        .from('rankings')
        .select('id, position, total_score, user_id, profiles(name)')
        .eq('period_type', 'daily')
        .eq('period_start', rankingDate)
        .order('position', { ascending: true })
        .limit(15);
      todayRankings = data;
    }
  }

  const canContinue = false; // antifraude: não há retomada
  const canStart = Boolean(todayExam && windowPhase === 'open' && !attempt);
  const completed = Boolean(todayExam && attempt?.finished_at && !attempt?.forfeited);
  const forfeitedToday = Boolean(todayExam && attempt?.forfeited);
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
      trackLabel={trackLabel}
      leagueLabel={leagueLabel ?? undefined}
      qualityStatus={(todayExam as { quality_status?: string } | null)?.quality_status ?? null}
      qualitySummary={(todayExam as { quality_summary?: string } | null)?.quality_summary ?? null}
    />
  );
}
