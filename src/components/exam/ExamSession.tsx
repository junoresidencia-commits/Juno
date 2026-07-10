'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Exam, OptionLetter, Question } from '@/types/database';
import { ExamRunner } from '@/components/exam/ExamRunner';

interface ExamQuestion extends Question {
  order_number: number;
}

interface Props {
  examId: string;
  durationMinutes: number;
  questions: ExamQuestion[];
}

export function ExamSession({ examId, durationMinutes, questions }: Props) {
  const router = useRouter();
  const [attempt, setAttempt] = useState<{
    id: string;
    started_at: string;
  } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      const res = await fetch(`/api/exams/${examId}/start`, { method: 'POST' });
      const data = await res.json();

      if (cancelled) return;

      if (res.status === 403 && data.forfeited) {
        router.replace('/aluno');
        return;
      }

      if (res.status === 400 && data.attemptId) {
        router.replace(`/aluno/resultado/${data.attemptId}`);
        return;
      }

      if (!res.ok) {
        setError(data.error ?? 'Não foi possível iniciar a prova.');
        setLoading(false);
        return;
      }

      setAttempt({
        id: data.attempt.id,
        started_at: data.attempt.started_at,
      });
      setLoading(false);
    }

    void start();
    return () => {
      cancelled = true;
    };
  }, [examId, router]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <p className="text-sm text-slate-600">Iniciando prova…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <p className="text-red-700">{error}</p>
        <button
          type="button"
          onClick={() => router.push('/aluno')}
          className="mt-4 text-sm text-emerald-700 underline"
        >
          Voltar
        </button>
      </div>
    );
  }

  if (!attempt) return null;

  return (
    <ExamRunner
      attemptId={attempt.id}
      examId={examId}
      durationMinutes={durationMinutes}
      startedAt={attempt.started_at}
      questions={questions}
      initialAnswers={{} as Record<string, OptionLetter>}
    />
  );
}
