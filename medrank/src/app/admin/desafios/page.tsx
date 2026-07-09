import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { getWeekEnd, getWeekStart } from '@/lib/periods';
import { ChallengeManager } from '@/components/admin/ChallengeManager';

export default async function DesafiosPage() {
  await requireRole('admin');
  const supabase = await createClient();
  const weekStart = getWeekStart();
  const weekEnd = getWeekEnd();

  const { data: challenges } = await supabase
    .from('weekly_challenges')
    .select('*, weekly_challenge_completions(user_id, profiles(name))')
    .eq('week_start', weekStart)
    .order('created_at', { ascending: false });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
      <h1 className="mt-4 text-2xl font-bold">Desafios semanais</h1>
      <p className="text-sm text-slate-600">
        Crie metas para motivar os alunos. O progresso é verificado ao finalizar cada prova.
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
