'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { Question, OptionLetter } from '@/types/database';
import { getEffectiveExamRemainingSeconds } from '@/lib/utils';
import { getQuestionTimeLimitSeconds } from '@/lib/exams/scoring';
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
  linearMode?: boolean;
}

function secondsOnQuestion(questionStartedAtMs: number, now = Date.now()): number {
  const elapsed = (now - questionStartedAtMs) / 1000;
  return Math.max(1, Math.round(elapsed));
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
  linearMode = true,
}: Props) {
  const router = useRouter();
  const questionLimit = getQuestionTimeLimitSeconds(durationMinutes, questions.length);

  const firstOpenIndex = Math.max(
    0,
    questions.findIndex((q) => !initialAnswers[q.id])
  );
  const allAnswered = questions.every((q) => initialAnswers[q.id]);

  const [currentIndex, setCurrentIndex] = useState(allAnswered ? questions.length - 1 : firstOpenIndex);
  const [answers, setAnswers] = useState<Record<string, OptionLetter>>(initialAnswers);
  const [remaining, setRemaining] = useState(() =>
    getEffectiveExamRemainingSeconds(startedAt, durationMinutes)
  );
  const [questionRemaining, setQuestionRemaining] = useState(questionLimit);
  const [submitting, setSubmitting] = useState(false);
  const [selecting, setSelecting] = useState(false);

  const questionStartedAt = useRef(Date.now());
  const finishedRef = useRef(false);
  const currentIndexRef = useRef(currentIndex);
  const submittingRef = useRef(submitting);

  currentIndexRef.current = currentIndex;
  submittingRef.current = submitting;

  const submitExam = useCallback(async (auto = false) => {
    if (submittingRef.current) return;
    setSubmitting(true);
    submittingRef.current = true;
    try {
      const res = await fetch(`${apiBase}/${attemptId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auto }),
      });
      const data = await res.json();
      if (res.ok) {
        finishedRef.current = true;
        router.push(resultPath ?? `/aluno/resultado/${attemptId}`);
        router.refresh();
      } else {
        alert(data.error ?? 'Erro ao enviar prova');
        setSubmitting(false);
        submittingRef.current = false;
      }
    } catch {
      alert('Erro de conexão ao enviar prova');
      setSubmitting(false);
      submittingRef.current = false;
    }
  }, [attemptId, apiBase, router, resultPath]);

  const recordAnswer = useCallback(
    (questionId: string, option: OptionLetter | null, timeSpentSeconds: number) => {
      void fetch(`${apiBase}/${attemptId}/answer`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, selectedOption: option, timeSpentSeconds }),
        keepalive: true,
      });
    },
    [apiBase, attemptId]
  );

  const selectAnswer = useCallback(
    (questionId: string, option: OptionLetter) => {
      if (selecting || submittingRef.current || answers[questionId]) return;

      const clickedAt = Date.now();
      const timeSpent = secondsOnQuestion(questionStartedAt.current, clickedAt);
      const index = currentIndexRef.current;

      setSelecting(true);
      setAnswers((prev) => ({ ...prev, [questionId]: option }));
      recordAnswer(questionId, option, timeSpent);

      if (index >= questions.length - 1) {
        void submitExam(true);
        return;
      }

      setCurrentIndex(index + 1);
      setSelecting(false);
    },
    [answers, questions.length, recordAnswer, selecting, submitExam]
  );

  const skipQuestion = useCallback(
    (index: number) => {
      if (selecting || submittingRef.current) return;
      const question = questions[index];
      if (!question || answers[question.id]) return;

      setSelecting(true);
      recordAnswer(question.id, null, questionLimit);

      if (index >= questions.length - 1) {
        void submitExam(true);
        return;
      }

      setCurrentIndex(index + 1);
      setSelecting(false);
    },
    [answers, questionLimit, questions, recordAnswer, selecting, submitExam]
  );

  useEffect(() => {
    questionStartedAt.current = Date.now();
    setQuestionRemaining(questionLimit);
    setSelecting(false);
  }, [currentIndex, questionLimit]);

  useEffect(() => {
    const tick = () => {
      const examSecs = getEffectiveExamRemainingSeconds(startedAt, durationMinutes);
      setRemaining(examSecs);
      if (examSecs <= 0) {
        submitExam(true);
        return;
      }

      if (!linearMode || selecting || submittingRef.current) return;

      const index = currentIndexRef.current;
      const question = questions[index];
      if (!question || answers[question.id]) return;

      const elapsed = Math.floor((Date.now() - questionStartedAt.current) / 1000);
      const left = Math.max(0, questionLimit - elapsed);
      setQuestionRemaining(left);

      if (left <= 0) {
        skipQuestion(index);
      }
    };

    tick();
    const interval = setInterval(tick, 250);
    return () => clearInterval(interval);
  }, [
    answers,
    durationMinutes,
    linearMode,
    questionLimit,
    questions,
    selecting,
    skipQuestion,
    startedAt,
    submitExam,
  ]);

  const current = questions[currentIndex];
  if (!current) return null;

  const answeredCount = Object.keys(answers).length;
  const isUrgent = remaining <= 300;
  const questionUrgent = questionRemaining <= 20;
  const selectedLetter = answers[current.id];
  const isLocked = Boolean(selectedLetter) || selecting || submitting;
  const questionLimitLabel =
    questionLimit % 60 === 0
      ? `${questionLimit / 60} min`
      : `${Math.floor(questionLimit / 60)} min ${questionLimit % 60}s`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      {linearMode && !isLocked && (
        <div className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-center text-sm text-amber-950 ring-1 ring-amber-200">
          <strong>Ao tocar em uma alternativa, a questão passa na hora.</strong>
          <br />
          Toque só com certeza — o tempo é marcado no clique.
        </div>
      )}

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600">Tempo total</p>
          <p
            className={`mt-1 font-mono text-2xl font-bold tabular-nums ${
              isUrgent ? 'text-red-700' : 'text-emerald-800'
            }`}
          >
            {formatDuration(remaining)}
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Questão {currentIndex + 1} de {questions.length} · {answeredCount} respondidas
          </p>
        </div>
        {linearMode && (
          <div className="rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-600">Tempo nesta questão</p>
            <p
              className={`mt-1 font-mono text-2xl font-bold tabular-nums ${
                questionUrgent ? 'text-red-700' : 'text-slate-900'
              }`}
            >
              {formatDuration(questionRemaining)}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Máx. {questionLimitLabel} · acerto rápido vale mais
            </p>
          </div>
        )}
      </div>

      <div className="mb-4 rounded-xl bg-white p-6 text-slate-900 shadow-sm ring-1 ring-slate-200">
        {current.topic && (
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-emerald-600">
            {current.topic}
            {current.subtopic ? ` · ${current.subtopic}` : ''}
          </p>
        )}
        <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-900">{current.statement}</p>
        {current.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current.image_url} alt="Imagem da questão" className="mt-4 max-h-64 rounded-lg" />
        )}
      </div>

      <div className="mb-6 space-y-3">
        {(['A', 'B', 'C', 'D', 'E'] as OptionLetter[]).map((letter) => {
          const text = current[`option_${letter.toLowerCase()}` as keyof Question] as string;
          if (!text) return null;
          const selected = selectedLetter === letter;

          return (
            <div
              key={letter}
              role="button"
              tabIndex={isLocked ? -1 : 0}
              onClick={() => {
                if (isLocked) return;
                selectAnswer(current.id, letter);
              }}
              onKeyDown={(e) => {
                if (isLocked) return;
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  selectAnswer(current.id, letter);
                }
              }}
              className={`flex min-h-[3.25rem] w-full cursor-pointer select-none items-start gap-3 rounded-xl border p-4 text-left transition ${
                selected
                  ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200'
                  : isLocked
                    ? 'pointer-events-none border-slate-200 bg-slate-50 opacity-50'
                    : 'border-slate-200 bg-white active:scale-[0.99] active:border-emerald-400 active:bg-emerald-50'
              }`}
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'rgba(16, 185, 129, 0.15)' }}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  selected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-800'
                }`}
              >
                {letter}
              </span>
              <span className="pt-0.5 text-sm leading-relaxed text-slate-900">{text}</span>
            </div>
          );
        })}
      </div>

      {!linearMode && (
        <>
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
        </>
      )}
    </div>
  );
}
