import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoDashboardData } from '@/lib/demo/presenters';
import { ensureDemoSeedUsers } from '@/lib/demo/seed-users';
import { mapRankingPreviewRows } from '@/components/ranking/RankingPreviewList';
import { AlunoHomeSimple, type HomeDisputeCard } from '@/components/aluno/AlunoHomeSimple';
import {
  canStudentSeeTodayRanking,
  getTodayRankingDate,
} from '@/lib/exams/ranking-visibility';
import { getExamWindowStatus } from '@/lib/exams/release';
import { todayDateStringBrazil } from '@/lib/exams/window';
import { audienceLabel, resolveUserExamAudience, type ExamAudience } from '@/lib/exams/audience';
import { shortTrackLabel, trackForDate } from '@/lib/exams/daily-schedule';
import { canAccessNephrologyTreino } from '@/lib/treino/access';
import type { Exam } from '@/types/database';

async function loadDisputeCard(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  today: string,
  audience: ExamAudience
): Promise<HomeDisputeCard> {
  const { data: todayExam } = await supabase
    .from('exams')
    .select('*')
    .eq('date_available', today)
    .eq('audience', audience)
    .eq('status', 'published')
    .maybeSingle();

  const exam = (todayExam as Exam | null) ?? null;
  const windowPhase = exam ? getExamWindowStatus(exam) : null;

  let { data: attempt } = exam
    ? await supabase
        .from('attempts')
        .select('id, finished_at, submitted_automatically, forfeited')
        .eq('exam_id', exam.id)
        .eq('user_id', userId)
        .maybeSingle()
    : { data: null };

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

  const trackLabel =
    audience === 'nephrology'
      ? shortTrackLabel(trackForDate(today))
      : 'Residência (USP/ENARE)';

  return {
    key: audience,
    exam,
    trackLabel,
    leagueLabel: audienceLabel(audience),
    windowPhase,
    canStart: Boolean(exam && windowPhase === 'open' && !attempt),
    completed: Boolean(exam && attempt?.finished_at && !attempt?.forfeited),
    forfeitedToday: Boolean(exam && attempt?.forfeited),
    missedToday: Boolean(exam && windowPhase === 'after' && !attempt?.finished_at),
    attemptId: attempt?.id,
    qualityStatus: (exam as { quality_status?: string } | null)?.quality_status ?? null,
    qualitySummary: (exam as { quality_summary?: string } | null)?.quality_summary ?? null,
  };
}

export default async function AlunoDashboard() {
  const session = await requireAuth();
  if (!session.profile.active) redirect('/login?blocked=1');

  const today = todayDateStringBrazil();
  const ctx = await resolveUserExamAudience(session.userId);
  const showNephrologyTreino = await canAccessNephrologyTreino(
    session.userId,
    session.profile
  );

  if (usesDemoStore()) {
    ensureDemoSeedUsers();
    const { userId } = session;
    const { todayExam, attempt, todayRankings, windowPhase, showRanking, rankingDate, finishedToday, streakDays } =
      getDemoDashboardData(userId);

    const canStart = Boolean(todayExam && windowPhase === 'open' && !attempt);
    const completed = Boolean(todayExam && attempt?.finished_at);
    const forfeitedToday = Boolean(todayExam && attempt?.finished_at && attempt.forfeited);
    const missedToday = Boolean(todayExam && windowPhase === 'after' && !attempt?.finished_at);

    return (
      <AlunoHomeSimple
        name={session.profile.name}
        userId={userId}
        disputes={[
          {
            key: ctx.audience,
            exam: todayExam,
            trackLabel:
              ctx.audience === 'nephrology'
                ? shortTrackLabel(trackForDate(today))
                : 'Residência (USP/ENARE)',
            leagueLabel: ctx.leagueName ?? audienceLabel(ctx.audience),
            windowPhase,
            canStart,
            completed,
            forfeitedToday,
            missedToday,
            attemptId: attempt?.id,
          },
        ]}
        showRanking={showRanking}
        todayRankings={todayRankings}
        rankingDate={rankingDate}
        finishedToday={finishedToday}
        streakDays={streakDays}
        rankingGroupName={ctx.rankingGroupName ?? undefined}
        showNephrologyTreino={showNephrologyTreino}
      />
    );
  }

  const supabase = await createClient();
  const userId = session.userId;

  const disputes: HomeDisputeCard[] = [];
  for (const audience of ctx.audiences) {
    disputes.push(await loadDisputeCard(supabase, userId, today, audience));
  }

  const rankingDate = getTodayRankingDate();
  const primary = disputes[0] ?? null;
  const hasFinishedAny = disputes.some((d) => d.completed || d.forfeitedToday);
  const showRanking =
    Boolean(primary?.exam) &&
    canStudentSeeTodayRanking(primary?.exam ?? null, hasFinishedAny) &&
    Boolean(ctx.rankingGroupId);

  let todayRankings = null;
  if (showRanking && ctx.rankingGroupId) {
    const { data } = await supabase
      .from('study_group_rankings')
      .select('id, position, total_score, user_id, profiles(name)')
      .eq('group_id', ctx.rankingGroupId)
      .eq('period_type', 'daily')
      .eq('period_start', rankingDate)
      .order('position', { ascending: true })
      .limit(15);
    todayRankings = data;
  }

  return (
    <AlunoHomeSimple
      name={session.profile.name ?? 'Aluno'}
      userId={userId}
      disputes={disputes}
      showRanking={showRanking}
      todayRankings={mapRankingPreviewRows(todayRankings)}
      rankingDate={rankingDate}
      rankingGroupName={ctx.rankingGroupName ?? undefined}
      showNephrologyTreino={showNephrologyTreino}
    />
  );
}
