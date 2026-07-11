import Link from 'next/link';
import type { Exam } from '@/types/database';
import type { RankingPreviewRow } from '@/components/ranking/RankingPreviewList';
import { RankingPreviewList } from '@/components/ranking/RankingPreviewList';
import { formatExamWindowShort } from '@/lib/exams/window';
import {
  studentDailyRankingLabel,
  studentRankingBeforeFinishMessage,
} from '@/lib/exams/ranking-visibility';

type WindowPhase = 'before' | 'open' | 'after' | 'wrong_day' | null;

interface Props {
  name: string;
  userId?: string;
  todayExam: Exam | null;
  windowPhase: WindowPhase;
  canStart: boolean;
  canContinue?: boolean;
  completed: boolean;
  forfeitedToday: boolean;
  missedToday: boolean;
  attemptId?: string;
  showRanking: boolean;
  todayRankings: RankingPreviewRow[];
  rankingDate: string;
}

export function AlunoHomeSimple({
  name,
  userId,
  todayExam,
  windowPhase,
  canStart,
  canContinue = false,
  completed,
  forfeitedToday,
  missedToday,
  attemptId,
  showRanking,
  todayRankings,
  rankingDate,
}: Props) {
  const examHref = todayExam ? `/aluno/prova/${todayExam.id}` : '/aluno';
  const resultHref = attemptId ? `/aluno/resultado/${attemptId}` : '/aluno';

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full flex-col px-4 py-6 md:px-6">
      <header>
        <p className="text-sm text-slate-600">Olá,</p>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{name}</h1>
      </header>

      <section className="mt-10 flex flex-1 flex-col md:max-w-xl">
        {todayExam ? (
          <>
            {canContinue && (
              <Link
                href={examHref}
                prefetch={false}
                className="exam-tap flex w-full items-center justify-center rounded-2xl bg-amber-500 px-6 py-6 text-xl font-bold text-white shadow-lg shadow-amber-500/25 active:scale-[0.98] hover:bg-amber-600"
              >
                Continuar a prova →
              </Link>
            )}
            {canStart && (
              <Link
                href={examHref}
                prefetch={false}
                className="exam-tap flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-6 py-6 text-xl font-bold text-white shadow-lg shadow-emerald-600/25 active:scale-[0.98]"
              >
                Começar a prova!
              </Link>
            )}
            {forfeitedToday && (
              <div className="rounded-2xl bg-red-50 px-6 py-8 text-center ring-1 ring-red-100">
                <p className="text-lg font-semibold text-red-900">Você saiu da prova</p>
                <p className="mt-2 text-sm text-red-700">Perdeu o dia — não dá para refazer hoje.</p>
                {attemptId && (
                  <Link
                    href={resultHref}
                    className="mt-4 inline-block text-sm font-medium text-red-800 underline-offset-2 hover:underline"
                  >
                    Ver o que ficou registrado →
                  </Link>
                )}
              </div>
            )}
            {completed && !forfeitedToday && (
              <Link
                href={resultHref}
                className="flex w-full items-center justify-center rounded-2xl bg-slate-700 px-6 py-5 text-lg font-semibold text-white active:scale-[0.98]"
              >
                Ver seu resultado
              </Link>
            )}
            {windowPhase === 'before' && (
              <div className="rounded-2xl bg-blue-50 px-6 py-8 text-center ring-1 ring-blue-100">
                <p className="text-lg font-semibold text-blue-900">Prova abre às 7h</p>
                <p className="mt-2 text-sm text-blue-700">Volte mais tarde para fazer a prova de hoje.</p>
              </div>
            )}
            {missedToday && (
              <div className="rounded-2xl bg-red-50 px-6 py-8 text-center ring-1 ring-red-100">
                <p className="text-lg font-semibold text-red-900">Você não fez a prova hoje</p>
                <p className="mt-2 text-sm text-red-700">Sem pontos neste dia — veja o ranking abaixo.</p>
              </div>
            )}

            <p className="mt-4 text-center text-sm text-slate-600">
              {todayExam.total_questions} questões · {todayExam.duration_minutes} min · {formatExamWindowShort()}
            </p>
            {canStart && (
              <p className="mt-2 text-center text-xs text-slate-500">
                Uma chance por dia · 20 questões · máx. 2.000 pts
              </p>
            )}
            {canContinue && (
              <p className="mt-2 text-center text-xs text-slate-500">
                Prova em andamento — continue de onde parou antes do tempo acabar.
              </p>
            )}
          </>
        ) : (
          <div className="rounded-2xl bg-white px-6 py-10 text-center text-slate-900 ring-1 ring-slate-200">
            <p className="text-slate-600">Nenhuma prova para hoje.</p>
          </div>
        )}
      </section>

      <section className="mt-8 rounded-2xl bg-white p-5 text-slate-900 ring-1 ring-slate-200 md:max-w-xl">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-semibold text-slate-900">{studentDailyRankingLabel(rankingDate)}</h2>
          {showRanking && (
            <Link href="/aluno/ranking" className="shrink-0 text-sm text-emerald-700">
              Ver →
            </Link>
          )}
        </div>
        <div className="mt-3">
          {showRanking ? (
            todayRankings.length > 0 ? (
              <RankingPreviewList rankings={todayRankings} userId={userId} />
            ) : (
              <p className="text-sm text-slate-600">Aguardando primeiros resultados…</p>
            )
          ) : (
            <p className="text-sm text-slate-600">{studentRankingBeforeFinishMessage()}</p>
          )}
        </div>
      </section>

      <footer className="mt-6 pb-4 text-center">
        <Link href="/aluno/ranking?period=weekly" className="text-sm text-slate-600 underline-offset-2 hover:text-emerald-700 hover:underline">
          Ranking da semana
        </Link>
      </footer>
    </div>
  );
}
