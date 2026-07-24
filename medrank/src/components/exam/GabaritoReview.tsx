'use client';

import type { Question, OptionLetter } from '@/types/database';
import { formatQuestionExplanation } from '@/lib/question-bank/quality';
import { formatStudentSourceLabel } from '@/lib/question-bank/presentation';

export type GabaritoRow = {
  id: string;
  selected_option: OptionLetter | null;
  is_correct: boolean | null;
  questions: Question;
};

export function GabaritoReview({ rows }: { rows: GabaritoRow[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-slate-900">Gabarito comentado</h2>
      <div className="mt-4 space-y-6">
        {rows.map((a, i) => {
          const q = a.questions;
          const unanswered = !a.selected_option;
          const wrong = a.selected_option && !a.is_correct;

          return (
            <div
              key={a.id}
              className={`rounded-xl p-5 text-slate-900 ring-1 ${
                unanswered
                  ? 'bg-slate-50 ring-slate-200'
                  : a.is_correct
                    ? 'bg-emerald-50 ring-emerald-200'
                    : 'bg-red-50 ring-red-200'
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                Questão {i + 1}
                {unanswered && ' · não respondida'}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm font-medium text-slate-900">{q.statement}</p>
              <div className="mt-3 space-y-1.5 text-sm">
                {(['A', 'B', 'C', 'D', 'E'] as OptionLetter[]).map((letter) => {
                  const text = q[`option_${letter.toLowerCase()}` as keyof Question] as string;
                  const isCorrect = q.correct_option === letter;
                  const isSelected = a.selected_option === letter;
                  return (
                    <p
                      key={letter}
                      className={`rounded-lg px-3 py-2 text-slate-900 ${
                        isCorrect
                          ? 'bg-emerald-200 font-semibold text-emerald-950'
                          : isSelected
                            ? 'bg-red-200 font-semibold text-red-950'
                            : 'bg-white/80 text-slate-800'
                      }`}
                    >
                      {letter}) {text}
                      {isCorrect && ' ✓'}
                      {isSelected && !isCorrect && ' ✗'}
                    </p>
                  );
                })}
              </div>
              {unanswered && (
                <p className="mt-3 text-sm font-medium text-amber-900">Sem resposta — 0 ponto nesta questão.</p>
              )}
              {wrong && (
                <p className="mt-3 text-sm font-medium text-red-900">Sua resposta: {a.selected_option}</p>
              )}
              <div className="mt-3 rounded-lg bg-white p-3 text-sm text-slate-800 ring-1 ring-slate-200">
                <strong className="text-slate-900">Comentário:</strong>
                <p className="mt-1 whitespace-pre-wrap">{formatQuestionExplanation(q)}</p>
              </div>
              {formatStudentSourceLabel(q) && (
                <p className="mt-3 text-xs font-medium text-slate-600">
                  {formatStudentSourceLabel(q)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
