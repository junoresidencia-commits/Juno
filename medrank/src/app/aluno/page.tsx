import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoDashboardData } from '@/lib/demo/presenters';
import { ensureDemoSeedUsers } from '@/lib/demo/seed-users';
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

const EXAM_SELECT =
  'id, title, date_available, duration_minutes, total_questions, status, audience, exam_kind, score_multiplier, quality_status, quality_summary, window_start_hour, window_end_hour, date_closes, ranking_visible_to_students, ranking_release';

async function loadAttemptCard(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  exam: Exam | null,
  card: Pick<HomeDisputeCard, 'key' | 'trackLabel' | 'leagueLabel' | 'variant'>
): Promise<HomeDisputeCard> {
  const windowPhase = exam ? getExamWindowStatus(exam) : null;

  let { data: attempt } = exam
    ? await supabase
        .from('attempts')
        .select('id, finished_at, submitted_automatically, forfeited')
        .eq('exam_id', exam.id)
        .eq('user_id', userId)
        .maybeSingle()
    : { data: null };

  if (attempt && !attempt.finished_at && windowPhase === 'after') {
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

  const inProgress = Boolean(exam && attempt && !attempt.finished_at && windowPhase === 'open');

  return {
    ...card,
    exam,
    windowPhase,
    canStart: Boolean(exam && windowPhase === 'open' && !attempt),
    canContinue: inProgress,
    completed: Boolean(exam && attempt?.finished_at && !attempt?.forfeited),
    forfeitedToday: Boolean(exam && attempt?.forfeited),
    missedToday: Boolean(exam && windowPhase === 'after' && !attempt?.finished_at),
    attemptId: attempt?.id,
    qualityStatus: exam?.quality_status ?? null,
    qualitySummary: exam?.quality_summary ?? null,
  };
}

async function loadDisputeCard(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  today: string,
  audience: ExamAudience
): Promise<HomeDisputeCard> {
  const { data: todayExam } = await supabase
    .from('exams')
    .select(EXAM_SELECT)
    .eq('date_available', today)
    .eq('audience', audience)
    .eq('exam_kind', 'daily')
    .eq('status', 'published')
    .maybeSingle();

  const trackLabel =
    audience === 'nephrology'
      ? shortTrackLabel(trackForDate(today), today)
      : 'Residência Geral';

  return loadAttemptCard(supabase, userId, (todayExam as Exam | null) ?? null, {
    key: audience,
    trackLabel,
    leagueLabel: audienceLabel(audience),
    variant: 'daily',
  });
}

async function loadWeeklyExpertCard(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  today: string
): Promise<HomeDisputeCard | null> {
  const { data: exam } = await supabase
    .from('exams')
    .select(EXAM_SELECT)
    .eq('date_available', today)
    .eq('exam_kind', 'weekly_expert')
    .eq('status', 'published')
    .maybeSingle();

  if (!exam) return null;

  return loadAttemptCard(supabase, userId, exam as Exam, {
    key: 'weekly_expert',
    trackLabel: 'Casos clínicos difíceis',
    leagueLabel: 'Desafio Expert',
    variant: 'expert',
  });
}

export default async function AlunoDashboard() {
  const session = await requireAuth();
  if (!session.profile.active) redirect('/login?blocked=1');

  const today = todayDateStringBrazil();
  // Reusa tracks do profile da sessão — evita query extra
  const ctx = await resolveUserExamAudience(
    session.userId,
    session.profile.enabled_tracks
  );
  const showNephrologyTreino = await canAccessNephrologyTreino(
    session.userId,
    session.profile
  );

  if (usesDemoStore()) {
    ensureDemoSeedUsers();
    const { userId } = session;
    const { todayExam, attempt, windowPhase, showRanking, rankingDate, finishedToday, streakDays } =
      getDemoDashboardData(userId);

    const canStart = Boolean(todayExam && windowPhase === 'open' && !attempt);
    const canContinue = Boolean(
      todayExam && windowPhase === 'open' && attempt && !attempt.finished_at
    );
    const completed = Boolean(todayExam && attempt?.finished_at && !attempt.forfeited);
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
                ? shortTrackLabel(trackForDate(today), today)
                : 'Residência Geral',
            leagueLabel: ctx.leagueName ?? audienceLabel(ctx.audience),
            windowPhase,
            canStart,
            canContinue,
            completed,
            forfeitedToday,
            missedToday,
            attemptId: attempt?.id,
          },
        ]}
        showRanking={showRanking}
        todayRankings={[]}
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

  // Paralelo: disputas diárias + Desafio Expert do dia (se houver)
  const [dailyDisputes, expertCard] = await Promise.all([
    Promise.all(ctx.audiences.map((audience) => loadDisputeCard(supabase, userId, today, audience))),
    loadWeeklyExpertCard(supabase, userId, today),
  ]);
  const disputes = expertCard ? [...dailyDisputes, expertCard] : dailyDisputes;

  const rankingDate = getTodayRankingDate();
  const primary = dailyDisputes[0] ?? null;
  const hasFinishedAny = dailyDisputes.some((d) => d.completed || d.forfeitedToday);
  const showRanking =
    Boolean(primary?.exam) &&
    canStudentSeeTodayRanking(primary?.exam ?? null, hasFinishedAny) &&
    Boolean(ctx.rankingGroupId);

  // Ranking completo fica em /aluno/ranking — home só indica status (menos carga)
  return (
    <AlunoHomeSimple
      name={session.profile.name ?? 'Aluno'}
      userId={userId}
      disputes={disputes}
      showRanking={showRanking}
      todayRankings={[]}
      rankingDate={rankingDate}
      rankingGroupName={ctx.rankingGroupName ?? undefined}
      showNephrologyTreino={showNephrologyTreino}
    />
  );
}
