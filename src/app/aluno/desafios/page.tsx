import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { fetchUserChallengeProgress } from '@/lib/challenges-progress';
import { getWeekEnd, getWeekStart } from '@/lib/periods';
import { formatDateBR } from '@/lib/format';
import { isSkipAuth } from '@/lib/skip-auth';
import { getDemoDashboardData } from '@/lib/demo/presenters';

export default async function DesafiosAlunoPage() {
  const { userId } = await requireAuth();

  if (isSkipAuth()) {
    const { challenges, streak } = getDemoDashboardData();
    const weekStart = getWeekStart();
    const weekEnd = getWeekEnd();
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link href="/aluno" className="text-sm text-emerald-700 hover:underline">← Voltar</Link>
        <h1 className="mt-4 text-2xl font-bold">Desafios e gamificação</h1>
        <p className="text-sm text-slate-600">Semana de {formatDateBR(weekStart)} a {formatDateBR(weekEnd)}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-orange-50 p-4 ring-1 ring-orange-200"><p className="text-sm text-orange-800">Sequência atual</p><p className="text-2xl font-bold text-orange-900">🔥 {streak.current_streak} dias</p></div>
          <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200"><p className="text-sm text-slate-500">Maior sequência</p><p className="text-2xl font-bold">14 dias</p></div>
        </div>
        <div className="mt-8 space-y-4">
          {challenges.map(({ challenge, currentValue, completed, description }) => (
            <div key={challenge.id} className={`rounded-xl p-5 ring-1 ${completed ? 'bg-emerald-50 ring-emerald-200' : 'bg-white ring-slate-200'}`}>
              <div className="flex items-start justify-between"><div><h2 className="font-semibold">{challenge.title}</h2><p className="mt-1 text-sm text-slate-600">{description}</p></div>{completed && <span className="text-2xl">🏆</span>}</div>
              <div className="mt-4"><div className="flex justify-between text-sm"><span>Progresso</span><span>{currentValue} / {challenge.target_value}</span></div><div className="mt-2 h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-emerald-500" style={{ width: `${Math.min(100, (currentValue / challenge.target_value) * 100)}%` }} /></div><p className="mt-2 text-xs text-slate-500">Recompensa: +{challenge.bonus_points} pontos</p></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const supabase = await createClient();

  const challenges = await fetchUserChallengeProgress(supabase, userId);
  const weekStart = getWeekStart();
  const weekEnd = getWeekEnd();

  const { data: streak } = await supabase
    .from('user_streaks')
    .select('current_streak, longest_streak')
    .eq('user_id', userId)
    .maybeSingle();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/aluno" className="text-sm text-emerald-700 hover:underline">← Voltar</Link>
      <h1 className="mt-4 text-2xl font-bold">Desafios e gamificação</h1>
      <p className="text-sm text-slate-600">
        Semana de {formatDateBR(weekStart)} a {formatDateBR(weekEnd)}
      </p>

      {streak && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-orange-50 p-4 ring-1 ring-orange-200">
            <p className="text-sm text-orange-800">Sequência atual</p>
            <p className="text-2xl font-bold text-orange-900">🔥 {streak.current_streak} dias</p>
          </div>
          <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Maior sequência</p>
            <p className="text-2xl font-bold">{streak.longest_streak} dias</p>
          </div>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {challenges.length === 0 ? (
          <p className="text-slate-500">Nenhum desafio ativo esta semana.</p>
        ) : (
          challenges.map(({ challenge, currentValue, completed, description }) => (
            <div
              key={challenge.id}
              className={`rounded-xl p-5 ring-1 ${
                completed ? 'bg-emerald-50 ring-emerald-200' : 'bg-white ring-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold">{challenge.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">{description}</p>
                </div>
                {completed && (
                  <span className="text-2xl">🏆</span>
                )}
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>{currentValue} / {challenge.target_value}</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-emerald-500"
                    style={{
                      width: `${Math.min(100, (currentValue / challenge.target_value) * 100)}%`,
                    }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">Recompensa: +{challenge.bonus_points} pontos</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
