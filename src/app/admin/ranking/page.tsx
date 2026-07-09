import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { formatDateBR, formatPercent } from '@/lib/format';

export default async function AdminRankingPage() {
  await requireRole('admin');
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];

  const { data: rankings } = await supabase
    .from('rankings')
    .select('*, profiles(name)')
    .eq('period_type', 'daily')
    .eq('period_start', today)
    .order('position', { ascending: true });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
      <h1 className="mt-4 text-2xl font-bold">Ranking — {formatDateBR(today)}</h1>

      <ol className="mt-6 space-y-2">
        {(rankings ?? []).length === 0 ? (
          <li className="text-slate-500">Nenhum aluno finalizou a prova de hoje.</li>
        ) : (
          rankings!.map((r) => {
            const profileData = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
            const name = (profileData as { name?: string } | null)?.name ?? 'Aluno';
            return (
              <li key={r.id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <span className="flex items-center gap-3">
                  <span className="text-lg font-bold w-8">
                    {r.position === 1 ? '🥇' : r.position === 2 ? '🥈' : r.position === 3 ? '🥉' : `${r.position}º`}
                  </span>
                  <span>{name}</span>
                </span>
                <span className="text-sm text-slate-600">
                  {r.total_correct} acertos · {formatPercent(r.average_percentage)} · {r.total_score} pts
                </span>
              </li>
            );
          })
        )}
      </ol>
    </div>
  );
}
