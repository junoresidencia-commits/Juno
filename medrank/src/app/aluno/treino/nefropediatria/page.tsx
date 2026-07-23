import Link from 'next/link';
import { requireAuth } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  getNefropediatriaBankCount,
  getNefropediatriaTopics,
  getTreinoHistory,
  getTreinoRanking,
  getTreinoUserStats,
} from '@/lib/treino/runtime';
import { NefropediatriaLauncher } from '@/components/treino/NefropediatriaLauncher';
import { formatPercent } from '@/lib/format';

async function getProductionBankCount(): Promise<number> {
  const admin = createAdminClient();
  if (!admin) return 0;
  const { count } = await admin
    .from('questions')
    .select('*', { count: 'exact', head: true })
    .contains('tags', ['nefropediatria']);
  return count ?? 0;
}

async function getProductionTopics(): Promise<string[]> {
  const admin = createAdminClient();
  if (!admin) return [];
  const { data } = await admin
    .from('questions')
    .select('topic')
    .contains('tags', ['nefropediatria']);
  const set = new Set<string>();
  for (const row of data ?? []) {
    if (row.topic) set.add(row.topic);
  }
  return [...set].sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

export default async function NefropediatriaTreinoPage() {
  const { userId } = await requireAuth();

  const bankCount = usesDemoStore()
    ? getNefropediatriaBankCount()
    : await getProductionBankCount();

  const topics = usesDemoStore() ? getNefropediatriaTopics() : await getProductionTopics();
  const stats = await getTreinoUserStats(userId);
  let history: Awaited<ReturnType<typeof getTreinoHistory>> = [];
  let ranking: Awaited<ReturnType<typeof getTreinoRanking>> = [];
  let loadError: string | null = null;
  try {
    history = (await getTreinoHistory(userId)).slice(0, 5);
    ranking = await getTreinoRanking(userId);
  } catch (e) {
    loadError = e instanceof Error ? e.message : 'Falha ao carregar histórico de treino';
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <Link href="/aluno" className="text-sm text-teal-700 hover:underline">
        ← Voltar ao início
      </Link>

      <header className="mt-4 mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-teal-800">
          Banco vivo · Certificado SBN/SBP
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Nefrologia Pediátrica
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Cada questão é um objeto completo (tema, tipo, idade, labs, A–D, explicação e
          referências). Simulados diferentes todos os dias — sem copiar prova oficial.
        </p>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs text-slate-600">Banco</p>
          <p className="text-2xl font-bold text-teal-800">{bankCount.toLocaleString('pt-BR')}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs text-slate-600">Acerto</p>
          <p className="text-2xl font-bold text-slate-900">
            {stats.accuracy != null ? formatPercent(stats.accuracy) : '—'}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs text-slate-600">Confiança média</p>
          <p className="text-2xl font-bold text-slate-900">
            {stats.avgConfidence != null ? `${stats.avgConfidence}/5` : '—'}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs text-slate-600">Tempo médio/Q</p>
          <p className="text-2xl font-bold text-slate-900">
            {stats.avgSeconds != null ? `${stats.avgSeconds}s` : '—'}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs text-slate-600">Revisão devida</p>
          <p className="text-2xl font-bold text-amber-700">{stats.dueReview}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs text-slate-600">Chance estimada*</p>
          <p className="text-2xl font-bold text-teal-800">{stats.approvalChance}%</p>
        </div>
      </div>
      <p className="mb-6 text-xs text-slate-500">
        *Heurística educacional (acerto + confiança + pontos fracos) — não é predição oficial.
      </p>

      {stats.worstTopics.length > 0 && (
        <section className="mb-8 rounded-2xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <h2 className="font-semibold">Assuntos com mais erro</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {stats.worstTopics.map((t) => (
              <li key={t.topic} className="flex justify-between gap-2">
                <span>{t.topic}</span>
                <span className="text-slate-600">
                  {formatPercent(t.accuracy)} · {t.total} Q
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <NefropediatriaLauncher
        bankCount={bankCount}
        topics={topics}
        dueReview={stats.dueReview}
      />
      {loadError && (
        <p className="mt-3 text-sm text-red-700">
          {loadError.includes('permission denied')
            ? 'permission denied for table practice_sessions — admin: rode a migration 029 no Supabase e confira SUPABASE_SERVICE_ROLE_KEY na Vercel.'
            : loadError}
        </p>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Ranking do treino</h2>
          <ol className="mt-4 space-y-2 text-sm">
            {ranking.length === 0 ? (
              <p className="text-slate-600">Finalize um treino para entrar no ranking.</p>
            ) : (
              ranking.map((r) => (
                <li key={`${r.user_id}-${r.finished_at}`} className="flex justify-between gap-2">
                  <span>
                    {r.position}º {r.isCurrentUser ? 'Você' : 'Aluno'} — {r.title}
                  </span>
                  <span className="font-medium">{r.score} pts</span>
                </li>
              ))
            )}
          </ol>
        </section>

        <section className="rounded-2xl bg-white p-6 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Histórico recente</h2>
          <div className="mt-4 space-y-3">
            {history.length === 0 ? (
              <p className="text-sm text-slate-600">Nenhum treino finalizado ainda.</p>
            ) : (
              history.map((s) => (
                <Link
                  key={s.id}
                  href={`/aluno/treino/nefropediatria/resultado/${s.id}`}
                  className="block rounded-lg border border-slate-200 p-3 hover:border-teal-300"
                >
                  <p className="text-sm font-medium">{s.title}</p>
                  <p className="text-xs text-slate-600">
                    {s.total_correct}/{s.total_questions} · {formatPercent(s.percentage)} ·{' '}
                    {s.score} pts
                  </p>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
