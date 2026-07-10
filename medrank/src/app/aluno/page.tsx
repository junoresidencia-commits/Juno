import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getSessionProfile } from '@/lib/auth';
import { fetchUserChallengeProgress } from '@/lib/challenges-progress';
import { WeeklyChallengesCard } from '@/components/aluno/WeeklyChallengesCard';
import { isSkipAuth } from '@/lib/skip-auth';
import { getDemoDashboardData } from '@/lib/demo/presenters';

export default async function AlunoDashboard() {
  const session = await getSessionProfile();
  if (!session) redirect('/login');
  if (!session.profile.active) redirect('/login?blocked=1');

  if (isSkipAuth()) {
    const { userId } = session;
    const { todayExam, attempt, rankings, streak, challenges } = getDemoDashboardData(userId);
    const canStart = todayExam && !attempt;
    const inProgress = todayExam && attempt && !attempt.finished_at;
    const completed = todayExam && attempt?.finished_at;

    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Bem-vindo(a)</p>
            <h1 className="text-2xl font-bold">{session.profile.name}</h1>
            <p className="text-sm text-orange-600">🔥 {streak.current_streak} dias seguidos estudando</p>
          </div>
        </header>

        <WeeklyChallengesCard challenges={challenges} />

        <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Prova do dia</h2>
          {todayExam ? (
            <div className="mt-4">
              <p className="font-medium">{todayExam.title}</p>
              <p className="mt-1 text-sm text-slate-600">
                {todayExam.total_questions} questões · {todayExam.duration_minutes} minutos
              </p>
              <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                Prova válida só hoje. Mesma prova para todos. Se não fizer hoje, você perde os pontos do dia.
              </p>
              <div className="mt-4">
                {canStart && <Link href={`/aluno/prova/${todayExam.id}`} className="inline-block rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">Iniciar prova</Link>}
                {inProgress && <Link href={`/aluno/prova/${todayExam.id}`} className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Continuar prova</Link>}
                {completed && <Link href={`/aluno/resultado/${attempt!.id}`} className="inline-block rounded-lg bg-slate-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">Ver resultado</Link>}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-slate-600">Nenhuma prova programada para hoje.</p>
          )}
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold">Ranking de hoje</h2>
            <ol className="mt-4 space-y-2">
              {rankings.map((r) => (
                <li key={r.id} className="flex justify-between text-sm">
                  <span>
                    {r.position === 1 ? '🥇' : r.position === 2 ? '🥈' : r.position === 3 ? '🥉' : `${r.position}º`}
                    {' '}{(r as { profiles?: { name?: string } }).profiles?.name ?? 'Aluno'}
                    {r.user_id === userId ? ' (você)' : ''}
                  </span>
                  <span className="font-medium">{r.total_score} pts</span>
                </li>
              ))}
            </ol>
            <Link href="/aluno/ranking" className="mt-4 block text-sm text-emerald-700 hover:underline">
              Ver ranking completo →
            </Link>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold">Prática e desempenho</h2>
            <div className="mt-4 space-y-2 text-sm">
              <Link href="/aluno/simulados" className="block font-medium text-emerald-700 hover:underline">Simulados aleatórios (20 questões) →</Link>
              <Link href="/aluno/banco" className="block text-emerald-700 hover:underline">Banco de questões →</Link>
              <Link href="/aluno/historico" className="block text-emerald-700 hover:underline">Histórico de provas →</Link>
              <Link href="/aluno/desempenho" className="block text-emerald-700 hover:underline">Desempenho por tema →</Link>
              <Link href="/aluno/desafios" className="block text-emerald-700 hover:underline">Desafios e gamificação →</Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const userId = session.userId;
  const profile = session.profile;

  const today = new Date().toISOString().split('T')[0];
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

  const { data: rankings } = await supabase
    .from('rankings')
    .select('position, total_score, user_id, profiles(name)')
    .eq('period_type', 'daily')
    .eq('period_start', today)
    .order('position', { ascending: true })
    .limit(15);

  const { data: streak } = await supabase
    .from('user_streaks')
    .select('current_streak')
    .eq('user_id', userId)
    .maybeSingle();

  const challenges = await fetchUserChallengeProgress(supabase, userId);

  const canStart = todayExam && !attempt;
  const inProgress = todayExam && attempt && !attempt.finished_at;
  const completed = todayExam && attempt?.finished_at;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Bem-vindo(a)</p>
          <h1 className="text-2xl font-bold">{profile.name ?? 'Aluno'}</h1>
          {streak && streak.current_streak > 0 && (
            <p className="text-sm text-orange-600">🔥 {streak.current_streak} dias seguidos estudando</p>
          )}
        </div>
        <form action="/api/auth/logout" method="post">
          <button type="submit" className="text-sm text-slate-500 hover:text-slate-700">
            Sair
          </button>
        </form>
      </header>

      <WeeklyChallengesCard challenges={challenges} />

      <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">Prova do dia</h2>
        {todayExam ? (
          <div className="mt-4">
            <p className="font-medium">{todayExam.title}</p>
            <p className="mt-1 text-sm text-slate-600">
              {todayExam.total_questions} questões · {todayExam.duration_minutes} minutos
            </p>
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Prova válida só hoje. Se não fizer hoje, você perde os pontos do dia.
            </p>
            <div className="mt-4">
              {canStart && (
                <Link
                  href={`/aluno/prova/${todayExam.id}`}
                  className="inline-block rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Iniciar prova
                </Link>
              )}
              {inProgress && (
                <Link
                  href={`/aluno/prova/${todayExam.id}`}
                  className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Continuar prova
                </Link>
              )}
              {completed && (
                <Link
                  href={`/aluno/resultado/${attempt!.id}`}
                  className="inline-block rounded-lg bg-slate-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Ver resultado
                </Link>
              )}
            </div>
          </div>
        ) : (
          <p className="mt-4 text-slate-600">Nenhuma prova programada para hoje.</p>
        )}
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Ranking de hoje</h2>
          <ol className="mt-4 space-y-2">
            {(rankings ?? []).length === 0 ? (
              <li className="text-sm text-slate-500">Sem dados ainda.</li>
            ) : (
              rankings!.map((r) => {
                const profileData = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
                const name = (profileData as { name?: string } | null)?.name ?? 'Aluno';
                const isMe = r.user_id === userId;
                return (
                  <li key={r.position} className="flex justify-between text-sm">
                    <span>
                      {r.position === 1 ? '🥇' : r.position === 2 ? '🥈' : r.position === 3 ? '🥉' : `${r.position}º`}
                      {' '}{name}{isMe ? ' (você)' : ''}
                    </span>
                    <span className="font-medium">{r.total_score} pts</span>
                  </li>
                );
              })
            )}
          </ol>
          <Link href="/aluno/ranking" className="mt-4 block text-sm text-emerald-700 hover:underline">
            Ver ranking completo →
          </Link>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Prática e desempenho</h2>
          <div className="mt-4 space-y-2 text-sm">
            <Link href="/aluno/historico" className="block text-emerald-700 hover:underline">
              Histórico de provas →
            </Link>
            <Link href="/aluno/desempenho" className="block text-emerald-700 hover:underline">
              Desempenho por tema →
            </Link>
            <Link href="/aluno/ranking" className="block text-emerald-700 hover:underline">
              Ranking geral →
            </Link>
            <Link href="/aluno/desafios" className="block text-emerald-700 hover:underline">
              Desafios e gamificação →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
