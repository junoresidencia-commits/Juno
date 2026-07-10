import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { formatPercent } from '@/lib/format';
import { isSkipAuth } from '@/lib/skip-auth';
import { getDemoPerformanceByTopic } from '@/lib/demo/presenters';

export default async function DesempenhoPage() {
  const { userId } = await requireAuth();

  if (isSkipAuth()) {
    const sorted = getDemoPerformanceByTopic();
    const weakest = sorted[0];
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link href="/aluno" className="text-sm text-emerald-700 hover:underline">← Voltar</Link>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Desempenho por tema</h1>
        {weakest && <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">Tema mais fraco: <strong>{weakest[0]}</strong> ({formatPercent((weakest[1].correct / weakest[1].total) * 100)})</div>}
        <div className="mt-6 space-y-3">
          {sorted.map(([topic, stats]) => {
            const pct = (stats.correct / stats.total) * 100;
            return <div key={topic} className="rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200"><div className="flex justify-between text-sm"><span className="font-medium">{topic}</span><span>{stats.correct}/{stats.total} · {formatPercent(pct)}</span></div><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-emerald-500" style={{ width: `${pct}%` }} /></div></div>;
          })}
        </div>
      </div>
    );
  }

  const supabase = await createClient();

  const { data: userAttempts } = await supabase
    .from('attempts')
    .select('id')
    .eq('user_id', userId)
    .not('finished_at', 'is', null);

  const attemptIds = userAttempts?.map((a) => a.id) ?? [];

  const { data: topicAnswers } = attemptIds.length > 0
    ? await supabase
        .from('attempt_answers')
        .select('is_correct, questions(topic)')
        .in('attempt_id', attemptIds)
    : { data: [] as { is_correct: boolean | null; questions: unknown }[] };

  const byTopic: Record<string, { correct: number; total: number }> = {};
  for (const a of topicAnswers ?? []) {
    const q = a.questions as unknown as { topic: string | null };
    const topic = q?.topic ?? 'Sem tema';
    if (!byTopic[topic]) byTopic[topic] = { correct: 0, total: 0 };
    byTopic[topic].total++;
    if (a.is_correct) byTopic[topic].correct++;
  }

  const sorted = Object.entries(byTopic).sort(
    ([, a], [, b]) => a.correct / a.total - b.correct / b.total
  );

  const weakest = sorted[0];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/aluno" className="text-sm text-emerald-700 hover:underline">
        ← Voltar
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Desempenho por tema</h1>

      {weakest && (
        <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          Tema mais fraco: <strong>{weakest[0]}</strong> (
          {formatPercent((weakest[1].correct / weakest[1].total) * 100)})
        </div>
      )}

      <div className="mt-6 space-y-3">
        {sorted.length === 0 ? (
          <p className="text-slate-600">Sem dados ainda. Faça provas para ver seu desempenho.</p>
        ) : (
          sorted.map(([topic, stats]) => {
            const pct = (stats.correct / stats.total) * 100;
            return (
              <div key={topic} className="rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{topic}</span>
                  <span>{stats.correct}/{stats.total} · {formatPercent(pct)}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
