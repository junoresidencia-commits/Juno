import Link from 'next/link';
import { requireAuth } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getPeriodBounds } from '@/lib/periods';
import { todayDateStringBrazil } from '@/lib/exams/window';

export default async function RankingEntreGruposPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  await requireAuth();
  const { period: periodParam } = await searchParams;
  const period = periodParam === 'monthly' ? 'monthly' : 'weekly';
  const today = todayDateStringBrazil();
  const bounds = getPeriodBounds(period, new Date(`${today}T12:00:00`));

  type Row = {
    id: string;
    group_id: string;
    position: number | null;
    average_percentage: number;
    active_members: number;
    exams_completed: number;
    collective_score: number;
    participation_rate: number;
    study_groups?: { name?: string } | null;
  };

  let rows: Row[] = [];
  let winners: {
    period_type: string;
    period_start: string;
    group_name: string;
    average_percentage: number;
  }[] = [];

  if (!usesDemoStore()) {
    const client = createAdminClient() ?? (await createClient());
    // Garante ranking atualizado (idempotente)
    await client.rpc('recalculate_collective_rankings_for_date', { p_date: today }).then(
      () => undefined,
      () => undefined
    );

    const [{ data }, { data: hist }] = await Promise.all([
      client
        .from('study_group_collective_rankings')
        .select(
          'id, group_id, position, average_percentage, active_members, exams_completed, collective_score, participation_rate, study_groups(name)'
        )
        .eq('period_type', period)
        .eq('period_start', bounds.start)
        .order('position', { ascending: true })
        .limit(50),
      client
        .from('study_group_collective_winners')
        .select('period_type, period_start, group_name, average_percentage')
        .order('period_start', { ascending: false })
        .limit(12),
    ]);
    rows = (data ?? []) as Row[];
    winners = hist ?? [];
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6">
      <Link href="/aluno/grupos" className="text-sm text-emerald-700">
        ← Grupos
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
        Ranking entre grupos
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        Disputa coletiva justa: média de acertos, participação e regularidade. Grupos maiores não
        ganham vantagem automática. Mínimo de 3 participantes ativos.
      </p>

      <div className="mt-4 flex gap-2">
        <Link
          href="/aluno/ranking/grupos?period=weekly"
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
            period === 'weekly'
              ? 'bg-emerald-700 text-white'
              : 'bg-white text-slate-700 ring-1 ring-slate-200'
          }`}
        >
          Semanal
        </Link>
        <Link
          href="/aluno/ranking/grupos?period=monthly"
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
            period === 'monthly'
              ? 'bg-emerald-700 text-white'
              : 'bg-white text-slate-700 ring-1 ring-slate-200'
          }`}
        >
          Mensal
        </Link>
      </div>

      <ol className="mt-6 space-y-2">
        {rows.length === 0 ? (
          <li className="rounded-2xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-600 ring-1 ring-slate-200">
            Ainda sem classificação coletiva neste período. É preciso ter grupos com pelo menos 3
            alunos ativos fazendo provas.
          </li>
        ) : (
          rows.map((r) => {
            const name =
              (r.study_groups as { name?: string } | null)?.name ?? 'Grupo';
            return (
              <li key={r.id}>
                <Link
                  href={`/aluno/grupos/${r.group_id}`}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {r.position}º {name}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      {r.active_members} ativos · {r.exams_completed} provas · participação{' '}
                      {Number(r.participation_rate).toFixed(0)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-800">
                      {Number(r.average_percentage).toFixed(0)}%
                    </p>
                    <p className="text-xs text-slate-500">
                      score {Number(r.collective_score).toFixed(1)}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })
        )}
      </ol>

      {winners.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Histórico de vencedores
          </h2>
          <ul className="mt-3 space-y-2">
            {winners.map((w) => (
              <li
                key={`${w.period_type}-${w.period_start}`}
                className="flex justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm ring-1 ring-slate-200"
              >
                <span className="text-slate-700">
                  {w.period_type === 'weekly' ? 'Semana' : 'Mês'} {w.period_start}
                </span>
                <span className="font-medium text-slate-900">
                  {w.group_name} · {Number(w.average_percentage).toFixed(0)}%
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
