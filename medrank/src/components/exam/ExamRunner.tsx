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

  const [currentIndex, setCurrentIndex] = useState(firstOpenIndex);
  const [answers, setAnswers] = useState<Record<string, OptionLetter>>(initialAnswers);
  const [remaining, setRemaining] = useState(() =>
    getEffectiveExamRemainingSeconds(startedAt, durationMinutes)
  );
  const [questionRemaining, setQuestionRemaining] = useState(questionLimit);
  const [submitting, setSubmitting] = useState(false);
  const [pendingChoice, setPendingChoice] = useState<OptionLetter | null>(null);

  const questionStartedAt = useRef(Date.now());
  const finishedRef = useRef(false);
  const selectingRef = useRef(false);
  const pendingRef = useRef<OptionLetter | null>(null);
  const answersRef = useRef(initialAnswers);
  const currentIndexRef = useRef(firstOpenIndex);
  const submittingRef = useRef(false);
  const lastPickAtRef = useRef(0);

  answersRef.current = answers;
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

  const pickOption = useCallback(
    (option: OptionLetter) => {
      const now = Date.now();
      if (now - lastPickAtRef.current < 250) return;
      lastPickAtRef.current = now;

      if (submittingRef.current) return;
      const question = questions[currentIndexRef.current];
      if (!question || answersRef.current[question.id]) return;

      pendingRef.current = option;
      setPendingChoice(option);
    },
    [questions]
  );

  const handleNext = useCallback(() => {
    const choice = pendingRef.current;
    if (!choice || selectingRef.current || submittingRef.current) return;

    const index = currentIndexRef.current;
    const question = questions[index];
    if (!question || answersRef.current[question.id]) return;

    selectingRef.current = true;
    const timeSpent = secondsOnQuestion(questionStartedAt.current);
    const nextAnswers = { ...answersRef.current, [question.id]: choice };
    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);
    recordAnswer(question.id, choice, timeSpent);
    pendingRef.current = null;
    setPendingChoice(null);

    if (index >= questions.length - 1) {
      void submitExam(true);
    } else {
      setCurrentIndex(index + 1);
    }
    selectingRef.current = false;
  }, [questions, recordAnswer, submitExam]);

  const skipQuestion = useCallback(
    (index: number) => {
      if (selectingRef.current || submittingRef.current) return;
      const question = questions[index];
      if (!question || answersRef.current[question.id]) return;

      selectingRef.current = true;
      recordAnswer(question.id, null, questionLimit);

      if (index >= questions.length - 1) {
        void submitExam(true);
      } else {
        setCurrentIndex(index + 1);
      }
      selectingRef.current = false;
    },
    [questionLimit, questions, recordAnswer, submitExam]
  );

  useEffect(() => {
    questionStartedAt.current = Date.now();
    setQuestionRemaining(questionLimit);
    pendingRef.current = null;
    setPendingChoice(null);
    selectingRef.current = false;
    lastPickAtRef.current = 0;
  }, [currentIndex, questionLimit]);

  useEffect(() => {
    const tick = () => {
      const examSecs = getEffectiveExamRemainingSeconds(startedAt, durationMinutes);
      setRemaining(examSecs);
      if (examSecs <= 0) {
        submitExam(true);
        return;
      }

      if (!linearMode || selectingRef.current || submittingRef.current) return;

      const index = currentIndexRef.current;
      const question = questions[index];
      if (!question || answersRef.current[question.id]) return;

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
  }, [durationMinutes, linearMode, questionLimit, questions, skipQuestion, startedAt, submitExam]);

  const current = questions[currentIndex];
  if (!current) return null;

  const answeredCount = Object.keys(answers).length;
  const isUrgent = remaining <= 300;
  const questionUrgent = questionRemaining <= 20;
  const questionConfirmed = Boolean(answers[current.id]);
  const canPick = !questionConfirmed && !submitting;
  const isLastQuestion = currentIndex >= questions.length - 1;
  const questionLimitLabel =
    questionLimit % 60 === 0
      ? `${questionLimit / 60} min`
      : `${Math.floor(questionLimit / 60)} min ${questionLimit % 60}s`;

  const tapStyle = {
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation' as const,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 pb-8">

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
        <p className="exam-no-select whitespace-pre-wrap text-base leading-relaxed text-slate-900">{current.statement}</p>
        {current.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current.image_url} alt="Imagem da questão" className="mt-4 max-h-64 rounded-lg" />
        )}
      </div>

      <div key={current.id} className="mb-4 space-y-3" role="group" aria-label="Alternativas">
        {(['A', 'B', 'C', 'D', 'E'] as OptionLetter[]).map((letter) => {
          const text = current[`option_${letter.toLowerCase()}` as keyof Question] as string;
          if (!text) return null;
          const selected = pendingChoice === letter;

          return (
            <button
              key={letter}
              type="button"
              aria-pressed={selected}
              aria-disabled={!canPick}
              onPointerUp={(e) => {
                if (e.pointerType === 'mouse' && e.button !== 0) return;
                pickOption(letter);
              }}
              onClick={() => pickOption(letter)}
              className={`flex min-h-[4.5rem] w-full items-start gap-3 rounded-xl border-2 p-4 text-left active:scale-[0.99] ${
                selected
                  ? 'border-emerald-600 bg-emerald-100 ring-2 ring-emerald-300'
                  : canPick
                    ? 'border-slate-300 bg-white active:bg-slate-50'
                    : 'border-slate-200 bg-slate-100 opacity-50'
              }`}
              style={tapStyle}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-bold ${
                  selected ? 'bg-emerald-600 text-white' : 'bg-sky-100 text-sky-900'
                }`}
              >
                {letter}
              </span>
              <span className="pt-1.5 text-base leading-relaxed text-slate-900">{text}</span>
            </button>
          );
        })}
      </div>

      {linearMode && canPick && (
        <div className="mb-8">
          {pendingChoice ? (
            <p className="mb-2 text-center text-sm font-medium text-emerald-800">
              Você marcou: <span className="text-lg font-bold">{pendingChoice}</span>
            </p>
          ) : (
            <p className="mb-2 text-center text-sm text-slate-500">Toque uma alternativa acima</p>
          )}
          <button
            type="button"
            aria-disabled={!pendingChoice}
            onPointerUp={(e) => {
              if (e.pointerType === 'mouse' && e.button !== 0) return;
              if (!pendingRef.current) return;
              handleNext();
            }}
            onClick={() => {
              if (!pendingRef.current) return;
              handleNext();
            }}
            className={`flex w-full items-center justify-center rounded-2xl px-6 py-5 text-xl font-bold text-white shadow-md active:scale-[0.99] ${
              pendingChoice ? 'bg-emerald-600 active:bg-emerald-700' : 'bg-slate-300'
            }`}
            style={tapStyle}
          >
            {isLastQuestion ? 'Finalizar prova' : 'Próxima questão →'}
          </button>
        </div>
      )}

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
