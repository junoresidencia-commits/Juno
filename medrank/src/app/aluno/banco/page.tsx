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
        <h1 className="text-2xl font-bold text-slate-900">Banco de Questões</h1>
        <p className="mt-1 text-slate-600">
          {stats.examReady} questões validadas para disputas e provas diárias. Comentários didáticos completos em expansão.
        </p>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-600">Total no banco</p>
          <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
        </div>
        <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-600">Aptas para prova</p>
          <p className="text-3xl font-bold text-emerald-700">{stats.examReady}</p>
          <p className="mt-1 text-xs text-slate-500">{stats.excluded} filtradas (truncadas ou genéricas)</p>
        </div>
        <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-600">Fontes</p>
          <p className="mt-1 text-sm font-medium">{stats.sources.join(', ')}</p>
        </div>
        <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-600">Anos cobertos</p>
          <p className="text-3xl font-bold">
            {stats.yearRange ? `${stats.yearRange[0]}–${stats.yearRange[1]}` : '—'}
          </p>
        </div>
      </div>

      <section className="rounded-2xl bg-white p-6 text-slate-900 shadow-sm ring-1 ring-slate-200">
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
                  <p className="text-sm text-slate-600">{count} questões</p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${Math.max(pct, count > 0 ? 4 : 0)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8 rounded-2xl bg-blue-50 p-5 ring-1 ring-blue-200">
        <h2 className="font-semibold text-blue-900">Qualidade do banco</h2>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-blue-900">
          <li>Provas e simulados usam apenas questões sem alternativa truncada</li>
          <li>Questões com distrativas genéricas ficam fora do sorteio automático</li>
          <li>Gabarito mostra a alternativa correta por completo, mesmo quando o comentário é só o gabarito oficial</li>
          <li>{stats.thinExplanations} questões aguardam comentário didático do professor</li>
        </ul>
      </section>

      <section className="mt-8 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
        <h2 className="font-semibold text-amber-900">Sobre as fontes</h2>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-amber-900">
          <li>Provas públicas de residência médica (acesso direto e multidisciplinares)</li>
          <li>Dataset aberto Zenodo DOI 10.5281/zenodo.17571003 — pesquisa e educação</li>
          <li>Questões autorais MedRank — casos clínicos para áreas com menor cobertura</li>
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
