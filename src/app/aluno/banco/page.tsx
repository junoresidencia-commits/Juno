import Link from 'next/link';
import { requireAuth } from '@/lib/auth';
import { getQuestionBankStats } from '@/lib/question-bank/pool';
import { RESIDENCY_AREAS } from '@/lib/question-bank/areas';

export default async function BancoQuestoesPage() {
  await requireAuth();
  const stats = getQuestionBankStats();
  const areaMap = new Map(stats.byArea.map((a) => [a.area, a.count]));

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Link href="/aluno/simulados" className="text-sm text-emerald-700 hover:underline">← Simulados</Link>
      <header className="mt-4 mb-8">
        <h1 className="text-2xl font-bold">Banco de Questões</h1>
        <p className="mt-1 text-slate-600">
          Questões de fontes públicas (ENARE oficial, dataset aberto Zenodo) e casos clínicos autorais para áreas complementares.
        </p>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Total de questões</p>
          <p className="text-3xl font-bold text-emerald-700">{stats.total}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Fontes</p>
          <p className="mt-1 text-sm font-medium">{stats.sources.join(', ')}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Anos cobertos</p>
          <p className="text-3xl font-bold">
            {stats.yearRange ? `${stats.yearRange[0]}–${stats.yearRange[1]}` : '—'}
          </p>
        </div>
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">Cobertura por área</h2>
        <p className="mt-1 text-sm text-slate-600">
          Grandes áreas cobradas em provas de residência médica multidisciplinares.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {RESIDENCY_AREAS.map((area) => {
            const count = areaMap.get(area) ?? 0;
            const pct = stats.total ? Math.round((count / stats.total) * 100) : 0;
            return (
              <div key={area} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{area}</p>
                  <p className="text-sm text-slate-500">{count} questões</p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${Math.max(pct, count > 0 ? 4 : 0)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
        <h2 className="font-semibold text-amber-900">Sobre as fontes</h2>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-amber-900">
          <li>ENARE — provas públicas Ebserh/AOCP (2020–2025)</li>
          <li>Zenodo DOI 10.5281/zenodo.17571003 — dataset aberto para pesquisa</li>
          <li>Questões autorais MedRank — casos clínicos para áreas com menor cobertura em provas públicas</li>
          <li>Sem cópia de bancos comerciais protegidos</li>
        </ul>
      </section>

      <div className="mt-8">
        <Link
          href="/aluno/simulados"
          className="inline-block rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Criar simulado aleatório
        </Link>
      </div>
    </div>
  );
}
