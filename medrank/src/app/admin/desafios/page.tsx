import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { getWeekEnd, getWeekStart } from '@/lib/periods';
import { ChallengeManager } from '@/components/admin/ChallengeManager';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoWeeklyChallenges } from '@/lib/demo/content';

export default async function DesafiosPage() {
  await requireRole('admin');
  const weekStart = getWeekStart();
  const weekEnd = getWeekEnd();

  if (usesDemoStore()) {
    const challenges = getDemoWeeklyChallenges().map((challenge) => ({
      ...challenge,
      weekly_challenge_completions: challenge.id === 'demo-ch-1'
        ? [{ user_id: 'r1', profiles: { name: 'Larissa' } }, { user_id: 'r2', profiles: { name: 'Mateus' } }]
        : [],
    }));
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Desafios semanais</h1>
        <p className="text-sm text-slate-600">Metas já criadas para a disputa diária.</p>
        <p className="mt-2 text-sm">
          <Link href="/admin/desafio-expert" className="font-semibold text-teal-800 hover:underline">
            Desafio Expert →
          </Link>
        </p>
        <div className="mt-6">
          <ChallengeManager challenges={challenges} weekStart={weekStart} weekEnd={weekEnd} />
        </div>
      </div>
    );
  }

  const supabase = await createClient();

  const { data: challenges } = await supabase
    .from('weekly_challenges')
    .select('*, weekly_challenge_completions(user_id, profiles(name))')
    .eq('week_start', weekStart)
    .order('created_at', { ascending: false });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Desafios semanais</h1>
      <p className="text-sm text-slate-600">
        Crie metas para motivar os alunos. O progresso é verificado ao finalizar cada prova.
      </p>
      <p className="mt-2 text-sm">
        <Link href="/admin/desafio-expert" className="font-semibold text-teal-800 hover:underline">
          Desafio Expert →
        </Link>{' '}
        <span className="text-slate-600">5 casos · você escolhe o dia · 20h–22h · ×2 pontos</span>
      </p>

      <div className="mt-6">
        <ChallengeManager
          challenges={challenges ?? []}
          weekStart={weekStart}
          weekEnd={weekEnd}
        />
      </div>
    </div>
  );
}
