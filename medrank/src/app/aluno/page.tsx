import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getSessionProfile } from '@/lib/auth';
import { isSkipAuth } from '@/lib/skip-auth';
import { getDemoDashboardData } from '@/lib/demo/presenters';
import { mapRankingPreviewRows } from '@/components/ranking/RankingPreviewList';
import { AlunoHomeSimple } from '@/components/aluno/AlunoHomeSimple';
import { getStudentDailyRankingDate } from '@/lib/exams/ranking-visibility';
import { getExamWindowStatus } from '@/lib/exams/release';
import { todayDateStringBrazil } from '@/lib/exams/window';

export default async function AlunoDashboard() {
  const session = await getSessionProfile();
  if (!session) redirect('/login');
  if (!session.profile.active) redirect('/login?blocked=1');

  const yesterdayDate = getStudentDailyRankingDate();

  if (isSkipAuth()) {
    const { userId } = session;
    const { todayExam, attempt, yesterdayRankings, windowPhase } = getDemoDashboardData(userId);
    const canStart = Boolean(todayExam && windowPhase === 'open' && !attempt);
    const inProgress = Boolean(todayExam && attempt && !attempt.finished_at && windowPhase !== 'after');
    const completed = Boolean(todayExam && attempt?.finished_at);
    const missedToday = Boolean(todayExam && windowPhase === 'after' && !attempt?.finished_at);

    return (
      <AlunoHomeSimple
        name={session.profile.name}
        todayExam={todayExam}
        windowPhase={windowPhase}
        canStart={canStart}
        inProgress={inProgress}
        completed={completed}
        missedToday={missedToday}
        attemptId={attempt?.id}
        yesterdayRankings={yesterdayRankings}
        yesterdayDate={yesterdayDate}
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
        .select('id, finished_at')
        .eq('exam_id', todayExam.id)
        .eq('user_id', userId)
        .maybeSingle()
    : { data: null };

  const { data: yesterdayRankings } = await supabase
    .from('rankings')
    .select('id, position, total_score, user_id, profiles(name)')
    .eq('period_type', 'daily')
    .eq('period_start', yesterdayDate)
    .order('position', { ascending: true })
    .limit(15);

  const windowPhase = todayExam ? getExamWindowStatus(todayExam) : null;
  const canStart = Boolean(todayExam && windowPhase === 'open' && !attempt);
  const inProgress = Boolean(todayExam && attempt && !attempt.finished_at && windowPhase !== 'after');
  const completed = Boolean(todayExam && attempt?.finished_at);
  const missedToday = Boolean(todayExam && windowPhase === 'after' && !attempt?.finished_at);

  return (
    <AlunoHomeSimple
      name={profile.name ?? 'Aluno'}
      todayExam={todayExam}
      windowPhase={windowPhase}
      canStart={canStart}
      inProgress={inProgress}
      completed={completed}
      missedToday={missedToday}
      attemptId={attempt?.id}
      yesterdayRankings={mapRankingPreviewRows(yesterdayRankings)}
      yesterdayDate={yesterdayDate}
      showLogout
    />
  );
}
