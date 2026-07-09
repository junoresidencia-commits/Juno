import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { formatPercent } from '@/lib/format';

export default async function RankingAlunoPage() {
  const { userId } = await requireAuth();
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];

  const periods = [
    { type: 'daily' as const, label: 'Hoje', start: today },
    { type: 'general' as const, label: 'Geral', start: '2000-01-01' },
  ];

  const rankingsData = await Promise.all(
    periods.map(async (p) => {
      const query = supabase
        .from('rankings')
        .select('user_id, position, total_score, total_correct, average_percentage, profiles(name)')
        .eq('period_type', p.type)
        .order('position', { ascending: true })
        .limit(10);

      if (p.type === 'daily') {
        query.eq('period_start', p.start);
      }

      const { data } = await query;
      return { ...p, data: data ?? [] };
    })
  );

  const { data: myRanking } = await supabase
    .from('rankings')
    .select('position, total_score')
    .eq('user_id', userId)
    .eq('period_type', 'daily')
    .eq('period_start', today)
    .maybeSingle();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/aluno" className="text-sm text-emerald-700 hover:underline">
        ← Voltar
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Ranking</h1>

      {myRanking && (
        <div className="mt-4 rounded-xl bg-emerald-50 p-4">
          <p className="font-semibold text-emerald-800">
            Sua posição hoje: {myRanking.position}º · {myRanking.total_score} pts
          </p>
        </div>
      )}

      {rankingsData.map((section) => (
        <section key={section.type} className="mt-8">
          <h2 className="text-lg font-semibold">{section.label}</h2>
          <ol className="mt-4 space-y-2">
            {section.data.length === 0 ? (
              <li className="text-sm text-slate-500">Sem dados.</li>
            ) : (
              section.data.map((r) => {
                const profileData = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
                const name = (profileData as { name?: string } | null)?.name ?? 'Aluno';
                const isMe = r.user_id === userId;
                return (
                  <li
                    key={`${section.type}-${r.position}`}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 ${
                      isMe ? 'bg-emerald-50 ring-1 ring-emerald-200' : 'bg-white ring-1 ring-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-8 text-lg font-bold text-slate-400">
                        {r.position === 1 ? '🥇' : r.position === 2 ? '🥈' : r.position === 3 ? '🥉' : `${r.position}º`}
                      </span>
                      <span className={r.position && r.position <= 3 ? 'font-semibold' : ''}>
                        {name}{isMe ? ' (você)' : ''}
                      </span>
                    </span>
                    <span className="text-sm text-slate-600">
                      {r.total_correct} acertos · {formatPercent(r.average_percentage)}
                    </span>
                  </li>
                );
              })
            )}
          </ol>
        </section>
      ))}
    </div>
  );
}
