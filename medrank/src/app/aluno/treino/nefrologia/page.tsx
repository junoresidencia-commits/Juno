import Link from 'next/link';
import { requireAuth } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  getTrackBankCount,
  getTrackTopics,
  getTreinoHistory,
  getTreinoRanking,
  getTreinoUserStats,
} from '@/lib/treino/runtime';
import { TreinoLauncher } from '@/components/treino/TreinoLauncher';
import { formatPercent } from '@/lib/format';
import { TRACK_CONFIG } from '@/lib/treino/config';

const TRACK = 'nefrologia-avancada' as const;

async function productionCount(): Promise<number> {
  const admin = createAdminClient();
  if (!admin) return 0;
  const { count } = await admin
    .from('questions')
    .select('*', { count: 'exact', head: true })
    .contains('tags', [TRACK_CONFIG[TRACK].tag]);
  return count ?? 0;
}

async function productionTopics(): Promise<string[]> {
  const admin = createAdminClient();
  if (!admin) return [];
  const { data } = await admin
    .from('questions')
    .select('topic')
    .contains('tags', [TRACK_CONFIG[TRACK].tag]);
  const set = new Set<string>();
  for (const row of data ?? []) if (row.topic) set.add(row.topic);
  return [...set].sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

export default async function NefrologiaAvancadaPage() {
  const { userId } = await requireAuth();
  const bankCount = usesDemoStore() ? getTrackBankCount(TRACK) : await productionCount();
  const topics = usesDemoStore() ? getTrackTopics(TRACK) : await productionTopics();
  const stats = await getTreinoUserStats(userId);
  let history: Awaited<ReturnType<typeof getTreinoHistory>> = [];
  let ranking: Awaited<ReturnType<typeof getTreinoRanking>> = [];
  let loadError: string | null = null;
  try {
    history = (await getTreinoHistory(userId)).filter((s) => s.track === TRACK).slice(0, 5);
    ranking = await getTreinoRanking(userId, TRACK);
  } catch (e) {
    loadError = e instanceof Error ? e.message : 'Falha ao carregar histórico de treino';
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <Link href="/aluno/treino" className="text-sm text-teal-700 hover:underline">
        ← Treinos
      </Link>

      <header className="mt-4 mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-teal-800">
          Banco vivo · Título SBN
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Nefrologia Avançada
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Clínica Médica aplicada ao rim (70% nefrologia · 30% cardiorrenal, UTI, infecção,
          endócrino…). Raciocínio de consultório, enfermaria, UTI e diálise — questões inéditas
          A–E, sem cópia de prova oficial.
        </p>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs text-slate-600">Banco</p>
          <p className="text-2xl font-bold text-teal-800">{bankCount.toLocaleString('pt-BR')}</p>
          <p className="text-xs text-slate-500">meta 20.000</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs text-slate-600">Acerto</p>
          <p className="text-2xl font-bold">
            {stats.accuracy != null ? formatPercent(stats.accuracy) : '—'}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs text-slate-600">Chance estimada*</p>
          <p className="text-2xl font-bold text-teal-800">{stats.approvalChance}%</p>
        </div>
      </div>
      <p className="mb-6 text-xs text-slate-500">*Heurística educacional — não é predição oficial.</p>

      <TreinoLauncher
        track={TRACK}
        bankCount={bankCount}
        topics={topics}
        dueReview={stats.dueReview}
        sessionBasePath="/aluno/treino/nefrologia"
      />
      {loadError && (
        <p className="mt-3 text-sm text-red-700">
          {loadError.includes('permission denied')
            ? 'permission denied for table practice_sessions — admin: rode a migration 029 no Supabase e confira SUPABASE_SERVICE_ROLE_KEY na Vercel.'
            : loadError}
        </p>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="font-semibold">Ranking</h2>
          <ol className="mt-3 space-y-2 text-sm">
            {ranking.length === 0 ? (
              <p className="text-slate-600">Finalize um treino para rankear.</p>
            ) : (
              ranking.map((r) => (
                <li key={`${r.user_id}-${r.finished_at}`} className="flex justify-between">
                  <span>
                    {r.position}º {r.isCurrentUser ? 'Você' : 'Colega'}
                  </span>
                  <span className="font-medium">{r.score} pts</span>
                </li>
              ))
            )}
          </ol>
        </section>
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="font-semibold">Histórico</h2>
          <div className="mt-3 space-y-2">
            {history.length === 0 ? (
              <p className="text-sm text-slate-600">Nenhum treino ainda.</p>
            ) : (
              history.map((s) => (
                <Link
                  key={s.id}
                  href={`/aluno/treino/nefrologia/resultado/${s.id}`}
                  className="block rounded-lg border border-slate-200 p-3 text-sm hover:border-teal-300"
                >
                  {s.title}
                  <span className="mt-1 block text-xs text-slate-600">
                    {s.total_correct}/{s.total_questions} · {formatPercent(s.percentage)}
                  </span>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
