import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { getQuestionBankStats, listQuestionsNeedingComments } from '@/lib/question-bank/pool';
import { CommentQueueForm } from '@/components/admin/CommentQueueForm';
import { formatQuestionExplanation } from '@/lib/question-bank/quality';

export default async function ComentariosPage() {
  await requireRole('admin');
  const stats = getQuestionBankStats();
  const queue = listQuestionsNeedingComments(30);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/admin/questoes" className="text-sm text-emerald-700 hover:underline">← Questões</Link>
      <header className="mt-4 mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Fila de comentários</h1>
        <p className="mt-1 text-slate-600">
          {stats.thinExplanations} questões sem comentário didático. Priorize as primeiras da lista.
        </p>
      </header>

      <div className="mb-6 rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
        <p className="text-sm text-amber-900">
          Comentários salvos aqui aparecem no gabarito dos alunos. Mínimo de 50 caracteres com raciocínio clínico.
        </p>
      </div>

      <div className="space-y-6">
        {queue.length === 0 ? (
          <p className="text-slate-600">Todas as questões têm comentário didático. 🎉</p>
        ) : (
          queue.map((q, index) => (
            <article key={q.id} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                #{index + 1} · {q.topic ?? 'Sem tema'} · {q.difficulty ?? '—'}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">{q.statement}</p>
              <p className="mt-2 text-xs text-slate-500">
                Gabarito: {q.correct_option}) — preview: {formatQuestionExplanation(q).slice(0, 120)}…
              </p>
              <CommentQueueForm questionId={q.id} initialExplanation="" />
            </article>
          ))
        )}
      </div>
    </div>
  );
}
