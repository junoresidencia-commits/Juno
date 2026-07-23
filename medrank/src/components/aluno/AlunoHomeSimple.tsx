import Link from 'next/link';
import type { Exam } from '@/types/database';
import type { RankingPreviewRow } from '@/components/ranking/RankingPreviewList';
import { RankingPreviewList } from '@/components/ranking/RankingPreviewList';
import { DisputeOnboarding } from '@/components/aluno/DisputeOnboarding';
import { formatExamWindowShort } from '@/lib/exams/window';
import {
  studentDailyRankingLabel,
  studentRankingBeforeFinishMessage,
} from '@/lib/exams/ranking-visibility';

type WindowPhase = 'before' | 'open' | 'after' | 'wrong_day' | null;

export type HomeDisputeCard = {
  key: string;
  exam: Exam | null;
  trackLabel: string;
  leagueLabel?: string | null;
  windowPhase: WindowPhase;
  canStart: boolean;
  completed: boolean;
  forfeitedToday: boolean;
  missedToday: boolean;
  attemptId?: string;
  qualityStatus?: string | null;
  qualitySummary?: string | null;
};

interface Props {
  name: string;
  userId?: string;
  /** Uma ou duas disputas do dia (nefro e/ou residência geral). */
  disputes: HomeDisputeCard[];
  showRanking: boolean;
  todayRankings: RankingPreviewRow[];
  rankingDate: string;
  finishedToday?: number;
  streakDays?: number;
  rankingGroupName?: string;
  showNephrologyTreino?: boolean;
  /** @deprecated use disputes */
  todayExam?: Exam | null;
  windowPhase?: WindowPhase;
  canStart?: boolean;
  canContinue?: boolean;
  completed?: boolean;
  forfeitedToday?: boolean;
  missedToday?: boolean;
  attemptId?: string;
  trackLabel?: string;
  leagueLabel?: string;
  qualityStatus?: string | null;
  qualitySummary?: string | null;
}

function DisputeBlock({
  card,
  alone,
}: {
  card: HomeDisputeCard;
  alone: boolean;
}) {
  const examHref = card.exam ? `/aluno/prova/${card.exam.id}` : '/aluno';
  const resultHref = card.attemptId ? `/aluno/resultado/${card.attemptId}` : '/aluno';
  const specialty = card.trackLabel;
  const qualityBlocked =
    card.qualityStatus === 'blocked' || card.qualityStatus === 'pending';
  const effectiveCanStart = card.canStart && !qualityBlocked;

  return (
    <div className={alone ? '' : 'rounded-2xl bg-white p-4 ring-1 ring-slate-200'}>
      <p className="mb-3 text-center text-sm font-medium text-teal-800">
        {card.leagueLabel ? (
          <>
            <span className="font-bold">{card.leagueLabel}</span>
            {' · '}
            Hoje: <span className="font-bold">{specialty}</span>
          </>
        ) : (
          <>
            Hoje: <span className="font-bold">{specialty}</span>
          </>
        )}
      </p>

      {qualityBlocked && (
        <div className="mb-4 rounded-2xl bg-red-50 p-4 text-sm text-red-950 ring-1 ring-red-200">
          <p className="font-semibold">
            {card.qualityStatus === 'pending'
              ? 'Aguarde — revisão IA em andamento'
              : 'Disputa não publicada — revisão IA'}
          </p>
          <p className="mt-1">
            {card.qualitySummary ||
              'A disputa só libera depois da revisão automática.'}
          </p>
        </div>
      )}

      {!card.exam ? (
        <div className="rounded-2xl bg-slate-50 px-6 py-8 text-center ring-1 ring-slate-200">
          <p className="text-slate-600">Sem disputa publicada para hoje ({specialty}).</p>
          <p className="mt-2 text-sm text-slate-500">
            O professor gera 1× por dia (ou o cron).
          </p>
        </div>
      ) : (
        <>
          {effectiveCanStart && (
            <Link
              href={examHref}
              prefetch={false}
              className="exam-tap flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-6 py-6 text-xl font-bold text-white shadow-lg shadow-emerald-600/25 active:scale-[0.98]"
            >
              Começar a disputa!
            </Link>
          )}
          {card.forfeitedToday && (
            <div className="rounded-2xl bg-red-50 px-6 py-8 text-center ring-1 ring-red-100">
              <p className="text-lg font-semibold text-red-900">Você saiu da disputa</p>
              <p className="mt-2 text-sm text-red-700">Perdeu o dia nesta prova — não dá para refazer hoje.</p>
              {card.attemptId && (
                <Link
                  href={resultHref}
                  className="mt-4 inline-block text-sm font-medium text-red-800 underline-offset-2 hover:underline"
                >
                  Ver o que ficou registrado →
                </Link>
              )}
            </div>
          )}
          {card.completed && !card.forfeitedToday && (
            <Link
              href={resultHref}
              className="flex w-full items-center justify-center rounded-2xl bg-slate-700 px-6 py-5 text-lg font-semibold text-white active:scale-[0.98]"
            >
              Ver seu resultado
            </Link>
          )}
          {card.windowPhase === 'before' && (
            <div className="rounded-2xl bg-blue-50 px-6 py-8 text-center ring-1 ring-blue-100">
              <p className="text-lg font-semibold text-blue-900">Disputa abre às 7h</p>
              <p className="mt-2 text-sm text-blue-700">Hoje é {specialty}.</p>
            </div>
          )}
          {card.missedToday && (
            <div className="rounded-2xl bg-red-50 px-6 py-8 text-center ring-1 ring-red-100">
              <p className="text-lg font-semibold text-red-900">Você não fez esta disputa hoje</p>
              <p className="mt-2 text-sm text-red-700">Sem pontos neste dia nesta prova.</p>
            </div>
          )}
          <p className="mt-4 text-center text-sm text-slate-600">
            {card.exam.total_questions} questões · {card.exam.duration_minutes} min ·{' '}
            {formatExamWindowShort()}
          </p>
        </>
      )}
    </div>
  );
}

export function AlunoHomeSimple({
  name,
  userId,
  disputes: disputesProp,
  showRanking,
  todayRankings,
  rankingDate,
  finishedToday = 0,
  streakDays = 0,
  rankingGroupName,
  showNephrologyTreino = false,
  // legacy single-exam props
  todayExam,
  windowPhase,
  canStart,
  completed,
  forfeitedToday,
  missedToday,
  attemptId,
  trackLabel,
  leagueLabel,
  qualityStatus,
  qualitySummary,
}: Props) {
  const disputes: HomeDisputeCard[] =
    disputesProp?.length > 0
      ? disputesProp
      : [
          {
            key: 'legacy',
            exam: todayExam ?? null,
            trackLabel: trackLabel ?? 'Disputa do dia',
            leagueLabel,
            windowPhase: windowPhase ?? null,
            canStart: Boolean(canStart),
            completed: Boolean(completed),
            forfeitedToday: Boolean(forfeitedToday),
            missedToday: Boolean(missedToday),
            attemptId,
            qualityStatus,
            qualitySummary,
          },
        ];

  const anyOpen = disputes.some((d) => d.canStart || d.windowPhase === 'open');

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full flex-col px-4 py-6 md:px-6">
      <header>
        <p className="text-sm text-slate-600">Olá,</p>
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{name}</h1>
          {streakDays > 0 && (
            <span className="shrink-0 rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-800 ring-1 ring-orange-200">
              🔥 {streakDays} {streakDays === 1 ? 'dia' : 'dias'}
            </span>
          )}
        </div>
      </header>

      <DisputeOnboarding />

      {anyOpen && finishedToday > 0 && (
        <p className="mb-4 text-center text-sm text-slate-600">
          <strong className="text-emerald-700">{finishedToday}</strong>{' '}
          {finishedToday === 1 ? 'aluno já disputou' : 'alunos já disputaram'} hoje
        </p>
      )}

      <section className="mt-4 flex flex-1 flex-col gap-4 md:max-w-xl">
        {disputes.length > 1 && (
          <p className="text-center text-xs text-slate-600">
            Você está em mais de um grupo — pode fazer as{' '}
            <strong>{disputes.length} disputas</strong> de hoje (cada uma conta no ranking do
            respectivo grupo).
          </p>
        )}
        {disputes.map((card) => (
          <DisputeBlock key={card.key} card={card} alone={disputes.length === 1} />
        ))}
      </section>

      <section className="mt-8 rounded-2xl bg-white p-5 text-slate-900 ring-1 ring-slate-200 md:max-w-xl">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-semibold text-slate-900">
            {rankingGroupName
              ? `Ranking · ${rankingGroupName}`
              : studentDailyRankingLabel(rankingDate)}
          </h2>
          {showRanking && rankingGroupName && (
            <Link href="/aluno/ranking" className="shrink-0 text-sm text-emerald-700">
              Ver →
            </Link>
          )}
        </div>
        <div className="mt-3">
          {!rankingGroupName ? (
            <p className="text-sm text-slate-600">
              Você ainda não está em um grupo. O professor adiciona você — aí o ranking aparece
              aqui.
            </p>
          ) : showRanking ? (
            todayRankings.length > 0 ? (
              <RankingPreviewList rankings={todayRankings} userId={userId} />
            ) : (
              <p className="text-sm text-slate-600">Aguardando primeiros resultados do grupo…</p>
            )
          ) : (
            <p className="text-sm text-slate-600">{studentRankingBeforeFinishMessage()}</p>
          )}
        </div>
      </section>

      {showNephrologyTreino && (
        <section className="mt-6 space-y-3 md:max-w-xl">
          <div>
            <h2 className="font-semibold text-slate-900">Treinos</h2>
            <p className="mt-1 text-sm text-slate-600">
              Exclusivo da Liga de Nefrologia — treine quando quiser (não conta na disputa do dia).
            </p>
          </div>
          <Link
            href="/aluno/treino/nefrologia"
            className="block rounded-2xl bg-teal-700 px-5 py-4 text-white shadow-sm hover:bg-teal-800"
          >
            <p className="text-sm font-medium text-teal-100">Adulto · Título SBN</p>
            <p className="text-lg font-bold">Nefrologia</p>
            <p className="mt-1 text-sm text-teal-100">Clínica Médica aplicada ao rim · gerar prova</p>
          </Link>
          <Link
            href="/aluno/treino/nefropediatria"
            className="block rounded-2xl bg-white px-5 py-4 text-slate-900 shadow-sm ring-1 ring-teal-200 hover:ring-teal-400"
          >
            <p className="text-sm font-medium text-teal-800">Pediátrica · SBN/SBP</p>
            <p className="text-lg font-bold">Nefrologia Pediátrica</p>
            <p className="mt-1 text-sm text-slate-600">Casos pediátricos · gerar prova</p>
          </Link>
        </section>
      )}
    </div>
  );
}
