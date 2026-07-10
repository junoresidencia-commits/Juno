import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import { isSkipAuth } from '@/lib/skip-auth';
import { getWrongQuestionIds } from '@/lib/demo-store';
import { getQuestionBankStats } from '@/lib/question-bank/pool';
import { getSimuladoHistory, getSimuladoRanking } from '@/lib/simulados/runtime';
import { SimuladoLauncher } from '@/components/simulados/SimuladoLauncher';
import { formatPercent } from '@/lib/format';

export default async function SimuladosPage() {
  const { userId } = await requireAuth();

  if (!isSkipAuth()) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-slate-600">Simulados disponíveis no modo demo. Conecte o Supabase para produção.</p>
      </div>
    );
  }

  const stats = getQuestionBankStats();
  const wrongCount = getWrongQuestionIds(userId).length;
  const history = getSimuladoHistory(userId).slice(0, 5);
  const ranking = getSimuladoRanking(userId);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Link href="/aluno" className="text-sm text-emerald-700 hover:underline">← Voltar ao início</Link>
      <header className="mt-4 mb-8">
        <h1 className="text-2xl font-bold">Simulados</h1>
        <p className="mt-1 text-slate-600">
          Banco com {stats.total} questões públicas · 20 questões aleatórias · 30 minutos · gabarito comentado
        </p>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Questões no banco</p>
          <p className="text-2xl font-bold text-emerald-700">{stats.total}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Áreas cobertas</p>
          <p className="text-2xl font-bold">{stats.byArea.length}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Para revisar</p>
          <p className="text-2xl font-bold text-amber-700">{wrongCount}</p>
        </div>
      </div>

      <SimuladoLauncher wrongCount={wrongCount} />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Ranking de simulados</h2>
          <ol className="mt-4 space-y-2">
            {ranking.length === 0 ? (
              <p className="text-sm text-slate-500">Faça um simulado para entrar no ranking.</p>
            ) : (
              ranking.map((r) => (
                <li key={`${r.user_id}-${r.finished_at}`} className="flex justify-between text-sm">
                  <span>
                    {r.position}º {r.isCurrentUser ? 'Você' : 'Aluno'} — {r.title}
                  </span>
                  <span className="font-medium">{r.score} pts</span>
                </li>
              ))
            )}
          </ol>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Histórico recente</h2>
          <div className="mt-4 space-y-3">
            {history.length === 0 ? (
              <p className="text-sm text-slate-500">Nenhum simulado finalizado ainda.</p>
            ) : (
              history.map((s) => (
                <Link
                  key={s.id}
                  href={`/aluno/simulados/resultado/${s.id}`}
                  className="block rounded-lg border border-slate-200 p-3 hover:border-emerald-300"
                >
                  <p className="font-medium text-sm">{s.title}</p>
                  <p className="text-xs text-slate-500">
                    {s.totalCorrect}/{s.totalQuestions} · {formatPercent(s.percentage)} · {s.score} pts
                  </p>
                </Link>
              ))
            )}
          </div>
          <Link href="/aluno/banco" className="mt-4 inline-block text-sm text-emerald-700 hover:underline">
            Ver banco de questões →
          </Link>
        </section>
      </div>
    </div>
  );
}
