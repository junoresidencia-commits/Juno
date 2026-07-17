import Link from 'next/link';
import { requireAuth } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { createAdminClient } from '@/lib/supabase/admin';
import { getNefropediatriaBankCount, getTreinoHistory } from '@/lib/treino/runtime';
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

export default async function NefropediatriaTreinoPage() {
  const { userId } = await requireAuth();

  const bankCount = usesDemoStore()
    ? getNefropediatriaBankCount()
    : await getProductionBankCount();

  const history = usesDemoStore() ? (await getTreinoHistory(userId)).slice(0, 5) : [];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <Link href="/aluno" className="text-sm text-teal-700 hover:underline">
        ← Voltar ao início
      </Link>

      <header className="mt-4 mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-teal-800">Treino especializado</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Nefropediatria</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Provas de treino no estilo cobrado pela SBN e pela Sociedade Brasileira de Nefropediatria.
          Questões inéditas MedRank — não são cópia de provas oficiais.
        </p>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-600">Questões no banco</p>
          <p className="text-3xl font-bold text-teal-800">{bankCount}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-600">Formato</p>
          <p className="text-lg font-semibold text-slate-900">20 questões · 30 min</p>
          <p className="mt-1 text-xs text-slate-500">Não conta no ranking diário</p>
        </div>
      </div>

      <section className="mb-8 rounded-2xl bg-teal-50 p-6 ring-1 ring-teal-100">
        <h2 className="font-semibold text-teal-950">O que você treina</h2>
        <ul className="mt-3 space-y-1.5 text-sm text-teal-900">
          <li>Síndrome nefrótica e nefrítica pediátrica</li>
          <li>ITU, RVU e CAKUT</li>
          <li>SHU, ATR, distúrbios eletrolíticos</li>
          <li>DRC pediátrica, diálise e hipertensão</li>
        </ul>
      </section>

      <NefropediatriaLauncher bankCount={bankCount} />

      {history.length > 0 && (
        <section className="mt-10 rounded-2xl bg-white p-6 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Histórico recente</h2>
          <div className="mt-4 space-y-3">
            {history.map((s) => (
              <Link
                key={s.id}
                href={`/aluno/treino/nefropediatria/resultado/${s.id}`}
                className="block rounded-lg border border-slate-200 p-3 hover:border-teal-300"
              >
                <p className="text-sm font-medium">{s.title}</p>
                <p className="text-xs text-slate-600">
                  {s.total_correct}/{s.total_questions} · {formatPercent(s.percentage)} · {s.score} pts
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
