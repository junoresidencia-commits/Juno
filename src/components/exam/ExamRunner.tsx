'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { Question, OptionLetter } from '@/types/database';
import { getEffectiveExamRemainingSeconds } from '@/lib/utils';
import {
  getQuestionTimeLimitSeconds,
} from '@/lib/exams/scoring';
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
  /** Prova sequencial: uma questão por vez, tempo por questão, sem pular */
  linearMode?: boolean;
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

  const questionStartedAt = useRef(Date.now());
  const advancingRef = useRef(false);
  const finishedRef = useRef(false);
  const answersRef = useRef(answers);
  const currentIndexRef = useRef(currentIndex);
  const submittingRef = useRef(submitting);

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
    async (questionId: string, option: OptionLetter | null, timeSpentSeconds: number) => {
      await fetch(`${apiBase}/${attemptId}/answer`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, selectedOption: option, timeSpentSeconds }),
      });
    },
    [apiBase, attemptId]
  );

  const goToNext = useCallback(
    (fromIndex: number) => {
      if (fromIndex >= questions.length - 1) {
        submitExam(true);
        return;
      }
      setCurrentIndex(fromIndex + 1);
    },
    [questions.length, submitExam]
  );

  const skipQuestion = useCallback(
    async (index: number) => {
      if (advancingRef.current) return;
      advancingRef.current = true;
      const question = questions[index];
      if (!question) {
        advancingRef.current = false;
        return;
      }
      await recordAnswer(question.id, null, questionLimit);
      setTimeout(() => {
        advancingRef.current = false;
        goToNext(index);
      }, 300);
    },
    [goToNext, questionLimit, questions, recordAnswer]
  );

  const selectAnswer = useCallback(
    async (questionId: string, option: OptionLetter) => {
      if (advancingRef.current || submittingRef.current) return;
      if (answersRef.current[questionId]) return;

      const elapsed = Math.floor((Date.now() - questionStartedAt.current) / 1000);
      const timeSpent = Math.max(1, elapsed);
      const newAnswers = { ...answersRef.current, [questionId]: option };
      setAnswers(newAnswers);
      answersRef.current = newAnswers;
      advancingRef.current = true;

      await recordAnswer(questionId, option, timeSpent);

      setTimeout(() => {
        advancingRef.current = false;
        if (linearMode) {
          goToNext(currentIndexRef.current);
        }
      }, 300);
    },
    [goToNext, linearMode, recordAnswer]
  );

  // Reinicia cronômetro da questão ao mudar de índice
  useEffect(() => {
    questionStartedAt.current = Date.now();
    setQuestionRemaining(questionLimit);
  }, [currentIndex, questionLimit]);

  // Pula questões já respondidas na mesma sessão
  useEffect(() => {
    const questionId = questions[currentIndex]?.id;
    if (!questionId || !answersRef.current[questionId]) return;
    if (advancingRef.current) return;

    const nextUnanswered = questions.findIndex((q, i) => i > currentIndex && !answersRef.current[q.id]);
    if (nextUnanswered !== -1) {
      setCurrentIndex(nextUnanswered);
    }
  }, [currentIndex, questions]);

  // Cronômetro único — mais confiável no Safari/iOS que vários setIntervals
  useEffect(() => {
    const tick = () => {
      const examSecs = getEffectiveExamRemainingSeconds(startedAt, durationMinutes);
      setRemaining(examSecs);
      if (examSecs <= 0) {
        submitExam(true);
        return;
      }

      if (!linearMode) return;

      const index = currentIndexRef.current;
      const question = questions[index];
      if (!question || answersRef.current[question.id] || advancingRef.current) return;

      const elapsed = Math.floor((Date.now() - questionStartedAt.current) / 1000);
      const left = Math.max(0, questionLimit - elapsed);

      setQuestionRemaining(left);

      if (left <= 0) {
        skipQuestion(index);
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [durationMinutes, linearMode, questionLimit, questions, skipQuestion, startedAt, submitExam]);

  const current = questions[currentIndex];
  if (!current) return null;

  const answeredCount = Object.keys(answers).length;
  const isUrgent = remaining <= 300;
  const questionUrgent = questionRemaining <= 20;
  const currentAnswered = Boolean(answers[current.id]);
  const isLocked = currentAnswered || submitting || advancingRef.current;
  const questionLimitLabel =
    questionLimit % 60 === 0
      ? `${questionLimit / 60} min`
      : `${Math.floor(questionLimit / 60)} min ${questionLimit % 60}s`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600">Tempo total</p>
          <p
            className={`mt-1 font-mono text-2xl font-bold ${
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
              className={`mt-1 font-mono text-2xl font-bold ${
                questionUrgent ? 'text-red-700' : 'text-slate-900'
              }`}
            >
              {formatDuration(questionRemaining)}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Máx. {questionLimitLabel} por questão · bônus para quem acerta mais rápido
            </p>
          </div>
        )}
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
          if (!text) return null;
          const selected = answers[current.id] === letter;
          return (
            <button
              key={letter}
              type="button"
              disabled={isLocked && !selected}
              onPointerDown={(e) => {
                if (isLocked) return;
                e.preventDefault();
                void selectAnswer(current.id, letter);
              }}
              onClick={(e) => {
                e.preventDefault();
                if (isLocked) return;
                void selectAnswer(current.id, letter);
              }}
              className={`flex w-full select-none items-start gap-3 rounded-xl border p-4 text-left transition active:scale-[0.99] ${
                selected
                  ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200'
                  : isLocked
                    ? 'cursor-not-allowed border-slate-200 bg-slate-50 opacity-60'
                    : 'cursor-pointer border-slate-200 bg-white hover:border-emerald-300 active:bg-emerald-50'
              }`}
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  selected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {letter}
              </span>
              <span className="text-sm leading-relaxed text-slate-900">{text}</span>
            </button>
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

      {linearMode && (
        <p className="text-center text-xs text-slate-600">
          Responda para avançar. Sem resposta no tempo = 0 ponto. Acerto rápido vale mais pontos.
        </p>
      )}
    </div>
  );
}
