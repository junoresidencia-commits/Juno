'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { Question, OptionLetter } from '@/types/database';
import { getEffectiveExamRemainingSeconds } from '@/lib/utils';
import { getQuestionTimeLimitSeconds } from '@/lib/exams/scoring';
import { formatDuration } from '@/lib/format';
import { useExamAntiFraud } from '@/hooks/useExamAntiFraud';
import { ExamTerminatedOverlay } from '@/components/exam/ExamTerminatedOverlay';
import type { ViolationType } from '@/lib/exams/anti-fraud';
import { formatStudentSourceLabel } from '@/lib/question-bank/presentation';
import { formatExamReadableText } from '@/lib/exams/format-readable-text';

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
  /** Coleta confiança 1–5 antes de confirmar (treino) */
  collectConfidence?: boolean;
  /** Tolerância zero — disputa diária. Desligado em treino/simulados. */
  antiFraud?: boolean;
  /**
   * Corta o tempo no fim da janela da disputa (8h30–21h).
   * Só disputa diária. Treino/simulados devem passar false.
   */
  capByDailyWindow?: boolean;
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
  collectConfidence = false,
  antiFraud = true,
  capByDailyWindow = true,
}: Props) {
  const router = useRouter();
  const questionLimit = getQuestionTimeLimitSeconds(durationMinutes, questions.length);

  const firstOpenIndex = Math.max(
    0,
    questions.findIndex((q) => !initialAnswers[q.id])
  );

  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(firstOpenIndex);
  const [answers, setAnswers] = useState<Record<string, OptionLetter>>(initialAnswers);
  const [remaining, setRemaining] = useState(0);
  const [questionRemaining, setQuestionRemaining] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [pendingChoice, setPendingChoice] = useState<OptionLetter | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [terminated, setTerminated] = useState(false);

  const questionStartedAt = useRef(Date.now());
  const finishedRef = useRef(false);
  const antiFraudLockedRef = useRef(false);
  const selectingRef = useRef(false);
  const pendingRef = useRef<OptionLetter | null>(null);
  const answersRef = useRef(initialAnswers);
  const currentIndexRef = useRef(firstOpenIndex);
  const submittingRef = useRef(false);

  answersRef.current = answers;
  currentIndexRef.current = currentIndex;
  submittingRef.current = submitting;

  const currentQuestionId = questions[currentIndex]?.id ?? null;

  const handleTerminated = useCallback((_type: ViolationType) => {
    finishedRef.current = true;
    antiFraudLockedRef.current = true;
    setTerminated(true);
    setSubmitting(true);
    submittingRef.current = true;
  }, []);

  useExamAntiFraud({
    enabled: antiFraud && !terminated,
    attemptId,
    apiBase,
    questionId: currentQuestionId,
    startedAt,
    lockedRef: antiFraudLockedRef,
    onTerminated: handleTerminated,
  });

  useEffect(() => {
    setMounted(true);
    setRemaining(
      getEffectiveExamRemainingSeconds(startedAt, durationMinutes, new Date(), capByDailyWindow)
    );
    setQuestionRemaining(questionLimit);
  }, [startedAt, durationMinutes, questionLimit, capByDailyWindow]);

  useEffect(() => {
    if (finishedRef.current || antiFraud) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [antiFraud]);

  const submitExam = useCallback(async (auto = false) => {
    if (submittingRef.current || finishedRef.current) return;
    setSubmitting(true);
    submittingRef.current = true;
    antiFraudLockedRef.current = true;
    try {
      const res = await fetch(`${apiBase}/${attemptId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auto }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        finishedRef.current = true;
        router.push(resultPath ?? `/aluno/resultado/${attemptId}`);
        router.refresh();
      } else {
        antiFraudLockedRef.current = false;
        alert((data as { error?: string }).error ?? 'Erro ao enviar prova');
        setSubmitting(false);
        submittingRef.current = false;
      }
    } catch {
      antiFraudLockedRef.current = false;
      alert('Erro de conexão ao enviar prova');
      setSubmitting(false);
      submittingRef.current = false;
    }
  }, [attemptId, apiBase, router, resultPath]);

  const recordAnswer = useCallback(
    (
      questionId: string,
      option: OptionLetter | null,
      timeSpentSeconds: number,
      confidenceValue?: number | null
    ) => {
      void fetch(`${apiBase}/${attemptId}/answer`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId,
          selectedOption: option,
          timeSpentSeconds,
          confidence: confidenceValue ?? null,
        }),
        keepalive: true,
      });
    },
    [apiBase, attemptId]
  );

  const pickOption = useCallback(
    (option: OptionLetter) => {
      if (submittingRef.current || finishedRef.current || antiFraudLockedRef.current) return;
      const question = questions[currentIndexRef.current];
      if (!question || answersRef.current[question.id]) return;

      pendingRef.current = option;
      setPendingChoice(option);
      setConfidence(null);
    },
    [questions]
  );

  const handleNext = useCallback(() => {
    const choice = pendingRef.current;
    if (!choice || selectingRef.current || submittingRef.current) return;
    if (collectConfidence && confidence == null) return;

    const index = currentIndexRef.current;
    const question = questions[index];
    if (!question || answersRef.current[question.id]) return;

    selectingRef.current = true;
    try {
      const timeSpent = secondsOnQuestion(questionStartedAt.current);
      const nextAnswers = { ...answersRef.current, [question.id]: choice };
      answersRef.current = nextAnswers;
      setAnswers(nextAnswers);
      recordAnswer(question.id, choice, timeSpent, confidence);
      pendingRef.current = null;
      setPendingChoice(null);
      setConfidence(null);

      if (index >= questions.length - 1) {
        void submitExam(true);
      } else {
        setCurrentIndex(index + 1);
      }
    } finally {
      selectingRef.current = false;
    }
  }, [questions, recordAnswer, submitExam, collectConfidence, confidence]);

  const skipQuestion = useCallback(
    (index: number) => {
      if (selectingRef.current || submittingRef.current || pendingRef.current) return;
      const question = questions[index];
      if (!question || answersRef.current[question.id]) return;

      selectingRef.current = true;
      try {
        recordAnswer(question.id, null, questionLimit);

        if (index >= questions.length - 1) {
          void submitExam(true);
        } else {
          setCurrentIndex(index + 1);
        }
      } finally {
        selectingRef.current = false;
      }
    },
    [questionLimit, questions, recordAnswer, submitExam]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (submittingRef.current) return;
      const index = currentIndexRef.current;
      const question = questions[index];
      if (!question || answersRef.current[question.id]) return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D', 'E'].includes(key)) {
        e.preventDefault();
        pickOption(key as OptionLetter);
        return;
      }

      if (e.key === 'Enter' && pendingRef.current) {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [questions, pickOption, handleNext]);

  useEffect(() => {
    questionStartedAt.current = Date.now();
    setQuestionRemaining(questionLimit);
    pendingRef.current = null;
    setPendingChoice(null);
    setConfidence(null);
    selectingRef.current = false;
  }, [currentIndex, questionLimit]);

  useEffect(() => {
    if (!mounted) return;

    const tick = () => {
      const examSecs = getEffectiveExamRemainingSeconds(
        startedAt,
        durationMinutes,
        new Date(),
        capByDailyWindow
      );
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
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [
    capByDailyWindow,
    durationMinutes,
    linearMode,
    mounted,
    questionLimit,
    questions,
    skipQuestion,
    startedAt,
    submitExam,
  ]);

  const current = questions[currentIndex];
  if (!current) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-red-900">Não foi possível carregar as questões</h1>
        <p className="mt-3 text-sm text-slate-700">
          Volte ao início e tente de novo. Se continuar em branco, peça ao professor para
          regenerar a disputa de hoje.
        </p>
        <button
          type="button"
          onClick={() => router.push('/aluno')}
          className="mt-6 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Voltar ao início
        </button>
      </div>
    );
  }

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

  const timerDisplay = mounted ? formatDuration(remaining) : '--:--';
  const questionTimerDisplay = mounted ? formatDuration(questionRemaining) : '--:--';

  const progressPct = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0;
  const statementText = formatExamReadableText(current.statement);

  return (
    <div
      className={`exam-shell mx-auto w-full max-w-3xl px-4 pt-4 lg:max-w-4xl lg:px-8 ${
        antiFraud ? 'exam-no-select' : ''
      }`}
    >
      {terminated ? <ExamTerminatedOverlay attemptId={attemptId} /> : null}
      {antiFraud ? (
        <div className="mb-3 rounded-2xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs leading-snug text-red-900 sm:text-sm">
          <strong>Tolerância zero:</strong> trocar de aba ou tirar print encerra a prova (0 pts).
        </div>
      ) : null}

      <div className="exam-sticky-top mb-3 space-y-3">
        <div>
          <div className="mb-1 flex justify-between text-xs font-medium text-slate-600">
            <span>
              Questão {currentIndex + 1}/{questions.length}
            </span>
            <span>
              {answeredCount} respondidas · {progressPct}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-[width] duration-300 ease-out"
              style={{ width: `${Math.max(progressPct, answeredCount > 0 ? 4 : 0)}%` }}
            />
          </div>
        </div>

        <div className={`grid gap-2 ${linearMode ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <div className="rounded-2xl bg-white/95 p-3 shadow-sm ring-1 ring-slate-200/80 backdrop-blur sm:p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
              Tempo total
            </p>
            <p
              suppressHydrationWarning
              className={`mt-0.5 font-mono text-xl font-bold tabular-nums sm:text-2xl ${
                isUrgent ? 'text-red-600' : 'text-emerald-800'
              }`}
            >
              {timerDisplay}
            </p>
          </div>
          {linearMode && (
            <div className="rounded-2xl bg-white/95 p-3 shadow-sm ring-1 ring-slate-200/80 backdrop-blur sm:p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
                Nesta questão
              </p>
              <p
                suppressHydrationWarning
                className={`mt-0.5 font-mono text-xl font-bold tabular-nums sm:text-2xl ${
                  questionUrgent ? 'text-red-600' : 'text-slate-900'
                }`}
              >
                {questionTimerDisplay}
              </p>
              <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">
                Máx. {questionLimitLabel} · rápido vale mais
              </p>
            </div>
          )}
        </div>
      </div>

      <article className="mb-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/90 sm:p-6">
        <p className="exam-stem exam-no-select text-[17px] leading-7 text-slate-900 sm:text-lg sm:leading-8">
          {statementText}
        </p>
        {current.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current.image_url}
            alt="Imagem da questão"
            className="mt-4 max-h-72 w-full rounded-xl object-contain"
            loading="lazy"
            decoding="async"
          />
        )}
        {formatStudentSourceLabel(current) && (
          <p className="exam-no-select mt-4 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500">
            {formatStudentSourceLabel(current)}
          </p>
        )}
      </article>

      <div key={current.id} className="mb-4 space-y-2.5 sm:space-y-3" role="group" aria-label="Alternativas">
        {(['A', 'B', 'C', 'D', 'E'] as OptionLetter[]).map((letter) => {
          const text = current[`option_${letter.toLowerCase()}` as keyof Question] as string;
          if (!text) return null;
          const selected = pendingChoice === letter;
          const optionText = formatExamReadableText(text);

          return (
            <button
              key={letter}
              type="button"
              disabled={!canPick}
              aria-pressed={selected}
              onClick={() => pickOption(letter)}
              className={`exam-tap flex min-h-[3.25rem] w-full items-start gap-3 rounded-2xl border-2 p-3.5 text-left transition active:scale-[0.99] disabled:opacity-50 sm:min-h-[4rem] sm:p-4 ${
                selected
                  ? 'border-emerald-500 bg-emerald-50 shadow-sm ring-2 ring-emerald-200'
                  : 'border-slate-200 bg-white hover:border-emerald-300'
              }`}
            >
              <span
                className={`pointer-events-none flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold sm:h-10 sm:w-10 sm:text-base ${
                  selected ? 'bg-emerald-600 text-white' : 'bg-teal-50 text-teal-900'
                }`}
              >
                {letter}
              </span>
              <span className="pointer-events-none flex-1 pt-1 text-[15px] leading-6 text-slate-900 sm:text-base sm:leading-7">
                {optionText}
              </span>
            </button>
          );
        })}
      </div>

      {linearMode && canPick && (
        <div className="exam-sticky-bottom">
          {pendingChoice ? (
            <p className="mb-2 text-center text-sm font-medium text-emerald-800">
              Marcada: <span className="text-lg font-bold">{pendingChoice}</span>
              {collectConfidence ? ' — confiança e confirme' : ' — confirme para seguir'}
            </p>
          ) : (
            <p className="mb-2 text-center text-sm text-slate-500">Toque numa alternativa</p>
          )}
          {collectConfidence && pendingChoice && (
            <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-slate-600">Confiança:</span>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setConfidence(n)}
                  className={`h-9 w-9 rounded-xl text-sm font-semibold ${
                    confidence === n
                      ? 'bg-teal-700 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            disabled={!pendingChoice || submitting || (collectConfidence && confidence == null)}
            onClick={handleNext}
            className={`exam-tap flex w-full items-center justify-center rounded-2xl px-6 py-4 text-lg font-bold text-white shadow-md active:scale-[0.99] disabled:opacity-50 sm:py-5 sm:text-xl ${
              pendingChoice && (!collectConfidence || confidence != null)
                ? 'bg-emerald-600 active:bg-emerald-700'
                : 'bg-slate-300'
            }`}
          >
            {isLastQuestion ? finishLabel : 'Próxima questão →'}
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
                className={`exam-tap h-9 w-9 rounded-lg text-sm font-medium ${
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
          <div className="flex gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
              className="exam-tap rounded-xl border border-slate-300 px-4 py-2 text-sm disabled:opacity-40"
            >
              Anterior
            </button>
            <button
              type="button"
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="exam-tap rounded-xl border border-slate-300 px-4 py-2 text-sm disabled:opacity-40"
            >
              Próxima
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => {
                if (confirm('Deseja finalizar a prova?')) submitExam(false);
              }}
              className="exam-tap ml-auto rounded-xl bg-emerald-600 px-6 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {submitting ? 'Enviando...' : finishLabel}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
