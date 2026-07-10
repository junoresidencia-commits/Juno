import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { formatDateBR, formatPercent } from '@/lib/format';
import { getPeriodBounds } from '@/lib/periods';
import type { PeriodType } from '@/types/database';
import { RankingPeriodNav } from '@/components/ranking/RankingPeriodNav';
import {
  fetchQuestionErrors,
  fetchTopicStats,
} from '@/lib/reports/data';
import { ReportDownloads } from '@/components/admin/ReportDownloads';
import { isSkipAuth } from '@/lib/skip-auth';
import { getDemoQuestions } from '@/lib/demo/content';

export default async function RelatoriosPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  await requireRole('admin');
  const { period: periodParam } = await searchParams;
  const period = (periodParam ?? 'weekly') as PeriodType;
  const bounds = getPeriodBounds(period);

  if (isSkipAuth()) {
    const demoQuestions = getDemoQuestions();
    const topics = ['Nefrologia', 'Cardiologia', 'Pneumologia', 'Infectologia', 'Cirurgia Geral'].map((tema, index) => ({
      tema,
      taxaErro: 42 - index * 4,
      total: 80 + index * 6,
      acertos: 40 + index * 8,
      erros: 40 - index * 2,
    }));
    const questions = demoQuestions.slice(0, 10).map((q, index) => ({
      id: q.id,
      enunciado: q.statement,
      tema: q.topic ?? 'Sem tema',
      origem: q.source ?? '-',
      erros: 18 - index,
      totalRespostas: 30,
      taxaErro: 60 - index * 2.5,
    }));
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
        <h1 className="mt-4 text-2xl font-bold">Relatórios e estatísticas</h1>
        <div className="mt-6 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="font-semibold">Modo teste preenchido</p>
          <p className="mt-1 text-sm text-slate-600">Base com 150 provas e {demoQuestions.length} questões reais ENARE importadas.</p>
        </div>
        <RankingPeriodNav basePath="/admin/relatorios" current={period} />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="font-semibold">Estatísticas por tema</h2>
            <p className="text-xs text-slate-500">Período ranking: {bounds.label}</p>
            <div className="mt-4 space-y-3">{topics.map((t) => <div key={t.tema}><div className="flex justify-between text-sm"><span>{t.tema}</span><span className="text-red-600">{t.taxaErro}% erro</span></div><div className="mt-1 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-red-400" style={{ width: `${t.taxaErro}%` }} /></div></div>)}</div>
          </section>
          <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="font-semibold">Questões com mais erro</h2>
            <div className="mt-4 space-y-3">{questions.map((q) => <div key={q.id} className="border-b border-slate-100 pb-3 last:border-0"><p className="line-clamp-2 text-sm">{q.enunciado}</p><p className="mt-1 text-xs text-slate-500">{q.tema} · {q.origem} · {q.erros}/{q.totalRespostas} erros ({formatPercent(q.taxaErro)})</p></div>)}</div>
          </section>
        </div>
      </div>
    );
  }

  const supabase = await createClient();

  const [topics, questions] = await Promise.all([
    fetchTopicStats(supabase),
    fetchQuestionErrors(supabase, 10),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
      <h1 className="mt-4 text-2xl font-bold">Relatórios e estatísticas</h1>

      <div className="mt-6">
        <ReportDownloads />
      </div>

      <RankingPeriodNav basePath="/admin/relatorios" current={period} />

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="font-semibold">Estatísticas por tema</h2>
          <p className="text-xs text-slate-500">Período ranking: {bounds.label}</p>
          <div className="mt-4 space-y-3">
            {topics.length === 0 ? (
              <p className="text-sm text-slate-500">Sem dados.</p>
            ) : (
              topics.slice(0, 8).map((t) => (
                <div key={t.tema}>
                  <div className="flex justify-between text-sm">
                    <span>{t.tema}</span>
                    <span className="text-red-600">{t.taxaErro}% erro</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-red-400"
                      style={{ width: `${t.taxaErro}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="font-semibold">Questões com mais erro</h2>
          <div className="mt-4 space-y-3">
            {questions.length === 0 ? (
              <p className="text-sm text-slate-500">Sem dados.</p>
            ) : (
              questions.map((q) => (
                <div key={q.id} className="border-b border-slate-100 pb-3 last:border-0">
                  <p className="line-clamp-2 text-sm">{q.enunciado}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {q.tema} · {q.origem} · {q.erros}/{q.totalRespostas} erros ({formatPercent(q.taxaErro)})
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <section className="mt-8 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="font-semibold">Desempenho individual</h2>
        <p className="mt-1 text-sm text-slate-600">
          Veja o ranking completo em{' '}
          <Link href={`/admin/ranking?period=${period}`} className="text-emerald-700 hover:underline">
            Rankings
          </Link>
          {' '}ou exporte o relatório acima.
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Período atual: {formatDateBR(bounds.start)}
          {bounds.start !== bounds.end ? ` — ${formatDateBR(bounds.end)}` : ''}
        </p>
      </section>
    </div>
  );
}
