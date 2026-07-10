'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Question, OptionLetter } from '@/types/database';
import { getEffectiveExamRemainingSeconds } from '@/lib/utils';
import { formatDuration } from '@/lib/format';

interface ExamQuestion extends Question {
  order_number: number;
}

interface Props {
  attemptId: string;
  examId: string;
  durationMinutes: number;
  startedAt: string;
  questions: ExamQuestion[];
  initialAnswers: Record<string, OptionLetter>;
  resultPath?: string;
  apiBase?: string;
  finishLabel?: string;
}

export function ExamRunner({
  attemptId,
  durationMinutes,
  startedAt,
  questions,
  initialAnswers,
  resultPath,
  apiBase = '/api/attempts',
  finishLabel = 'Finalizar prova',
}: Props) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, OptionLetter>>(initialAnswers);
  const [remaining, setRemaining] = useState(() =>
    getEffectiveExamRemainingSeconds(startedAt, durationMinutes)
  );
  const [submitting, setSubmitting] = useState(false);

  const submitExam = useCallback(async (auto = false) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${apiBase}/${attemptId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auto }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push(resultPath ?? `/aluno/resultado/${attemptId}`);
        router.refresh();
      } else {
        alert(data.error ?? 'Erro ao enviar prova');
        setSubmitting(false);
      }
    } catch {
      alert('Erro de conexão ao enviar prova');
      setSubmitting(false);
    }
  }, [attemptId, apiBase, router, resultPath, submitting]);

  useEffect(() => {
    const interval = setInterval(() => {
      const secs = getEffectiveExamRemainingSeconds(startedAt, durationMinutes);
      setRemaining(secs);
      if (secs <= 0) {
        clearInterval(interval);
        submitExam(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startedAt, durationMinutes, submitExam]);

  async function saveAnswer(questionId: string, option: OptionLetter) {
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);
    await fetch(`${apiBase}/${attemptId}/answer`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, selectedOption: option }),
    });
  }

  const current = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const isUrgent = remaining <= 300;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <div>
          <p className="text-sm text-slate-600">Questão {currentIndex + 1} de {questions.length}</p>
          <p className="text-xs text-slate-400">{answeredCount} respondidas</p>
        </div>
        <div
          className={`rounded-lg px-4 py-2 font-mono text-lg font-bold ${
            isUrgent ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          {formatDuration(remaining)}
        </div>
      </div>

      <div className="mb-4 rounded-xl bg-white p-6 text-slate-900 shadow-sm ring-1 ring-slate-200">
        {current.topic && (
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-emerald-600">
            {current.topic}{current.subtopic ? ` · ${current.subtopic}` : ''}
          </p>
        )}
        <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-900">{current.statement}</p>
        {current.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current.image_url} alt="Imagem da questão" className="mt-4 max-h-64 rounded-lg" />
        )}
      </div>

      <div className="mb-6 space-y-2">
        {(['A', 'B', 'C', 'D', 'E'] as OptionLetter[]).map((letter) => {
          const text = current[`option_${letter.toLowerCase()}` as keyof Question] as string;
          const selected = answers[current.id] === letter;
          return (
            <button
              key={letter}
              type="button"
              onClick={() => saveAnswer(current.id, letter)}
              className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                selected
                  ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200'
                  : 'border-slate-200 bg-white hover:border-emerald-300'
              }`}
            >
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                selected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {letter}
              </span>
              <span className="text-sm leading-relaxed text-slate-900">{text}</span>
            </button>
          );
        })}
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {questions.map((q, i) => (
          <button
            key={q.id}
            type="button"
            onClick={() => setCurrentIndex(i)}
            className={`h-9 w-9 rounded-lg text-sm font-medium ${
              i === currentIndex
                ? 'bg-emerald-600 text-white'
                : answers[q.id]
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:opacity-40"
        >
          Anterior
        </button>
        <button
          type="button"
          disabled={currentIndex === questions.length - 1}
          onClick={() => setCurrentIndex((i) => i + 1)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:opacity-40"
        >
          Próxima
        </button>
        <button
          type="button"
          disabled={submitting}
          onClick={() => {
            if (confirm('Deseja finalizar a prova?')) submitExam(false);
          }}
          className="ml-auto rounded-lg bg-emerald-600 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {submitting ? 'Enviando...' : finishLabel}
        </button>
      </div>
    </div>
  );
}
