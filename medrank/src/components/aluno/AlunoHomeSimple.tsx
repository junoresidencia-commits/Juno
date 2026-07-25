import Link from 'next/link';
import type { Exam } from '@/types/database';
import type { RankingPreviewRow } from '@/components/ranking/RankingPreviewList';
import { DisputeOnboarding } from '@/components/aluno/DisputeOnboarding';
import { formatExamWindowShort } from '@/lib/exams/window';
import { formatExamWindowForExam } from '@/lib/exams/release';
import { studentRankingBeforeFinishMessage } from '@/lib/exams/ranking-visibility';
import { WEEKLY_EXPERT_SCORE_MULTIPLIER } from '@/lib/exams/weekly-expert';

type WindowPhase = 'before' | 'open' | 'after' | 'wrong_day' | null;

export type HomeDisputeCard = {
  key: string;
  exam: Exam | null;
  trackLabel: string;
  leagueLabel?: string | null;
  windowPhase: WindowPhase;
  canStart: boolean;
  canContinue?: boolean;
  completed: boolean;
  forfeitedToday: boolean;
  missedToday: boolean;
  attemptId?: string;
  qualityStatus?: string | null;
  qualitySummary?: string | null;
  variant?: 'daily' | 'expert';
};

interface Props {
  name: string;
  userId?: string;
  disputes: HomeDisputeCard[];
  showRanking: boolean;
  todayRankings: RankingPreviewRow[];
  rankingDate: string;
  finishedToday?: number;
  streakDays?: number;
  rankingGroupName?: string;
  showNephrologyTreino?: boolean;
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

function DisputeBlock({ card }: { card: HomeDisputeCard }) {
  const examHref = card.exam ? `/aluno/prova/${card.exam.id}` : '/aluno';
  const resultHref = card.attemptId ? `/aluno/resultado/${card.attemptId}` : '/aluno';
  const specialty = card.trackLabel;
  const qualityBlocked =
    card.qualityStatus === 'blocked' || card.qualityStatus === 'pending';
  const effectiveCanStart = card.canStart && !qualityBlocked;
  const qCount = card.exam?.total_questions ?? 20;
  const isNefro = card.key === 'nephrology';
  const isExpert = card.variant === 'expert' || card.key === 'weekly_expert';
  const openHour = card.exam?.window_start_hour ?? 7;
  const windowLabel = card.exam
    ? formatExamWindowForExam(card.exam)
    : formatExamWindowShort();
  const multiplier = card.exam?.score_multiplier ?? (isExpert ? WEEKLY_EXPERT_SCORE_MULTIPLIER : 1);

  return (
    <article
      className={`rounded-3xl p-5 ring-1 ${
        isExpert
          ? 'bg-amber-50 text-amber-950 ring-amber-200'
          : isNefro
            ? 'bg-teal-900 text-white ring-teal-950'
            : 'bg-white text-slate-900 ring-slate-200/80'
      }`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-wide ${
          isExpert ? 'text-amber-800' : isNefro ? 'text-teal-200' : 'text-teal-800'
        }`}
      >
        {card.leagueLabel || 'Disputa'}
      </p>
      <h3
        className={`mt-1 text-xl font-bold tracking-tight ${
          isExpert ? 'text-amber-950' : isNefro ? 'text-white' : 'text-slate-900'
        }`}
      >
        {specialty}
      </h3>
      {card.exam && (
        <p className={`mt-1 text-sm ${isExpert ? 'text-amber-900/80' : isNefro ? 'text-teal-100' : 'text-slate-600'}`}>
          {qCount} questões · {card.exam.duration_minutes} min · {windowLabel}
          {multiplier > 1 ? ` · acerto ×${multiplier}` : ''}
        </p>
      )}

      {qualityBlocked && (
        <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-950 ring-1 ring-red-200">
          <p className="font-semibold">
            {card.qualityStatus === 'pending' ? 'Revisão IA em andamento' : 'Aguardando republicação'}
          </p>
          <p className="mt-1 text-xs">
            {card.qualitySummary || 'A disputa só libera depois da revisão automática.'}
          </p>
        </div>
      )}

      <div className="mt-5">
        {!card.exam ? (
          <p
            className={`rounded-2xl px-4 py-5 text-center text-sm ${
              isNefro ? 'bg-teal-800/60 text-teal-50' : 'bg-slate-50 text-slate-600'
            }`}
          >
            Ainda sem disputa publicada para hoje.
          </p>
        ) : card.canContinue ? (
          <Link
            href={examHref}
            prefetch={false}
            className="exam-tap flex w-full items-center justify-center rounded-2xl bg-amber-500 px-6 py-4 text-lg font-bold text-white active:scale-[0.98]"
          >
            Continuar
          </Link>
        ) : effectiveCanStart ? (
          <Link
            href={examHref}
            prefetch={false}
            className={`exam-tap flex w-full items-center justify-center rounded-2xl px-6 py-4 text-lg font-bold active:scale-[0.98] ${
              isNefro
                ? 'bg-white text-teal-950'
                : 'bg-teal-800 text-white shadow-md shadow-teal-900/15'
            }`}
          >
            Iniciar
          </Link>
        ) : card.forfeitedToday ? (
          <div
            className={`rounded-2xl px-4 py-4 text-center text-sm ${
              isNefro ? 'bg-red-950/40 text-red-100' : 'bg-red-50 text-red-800 ring-1 ring-red-100'
            }`}
          >
            <p className="font-semibold">Prova encerrada</p>
            <p className="mt-1 opacity-90">
              Se foi ligação/notificação, o professor pode liberar de novo.
            </p>
            {card.attemptId && (
              <Link href={resultHref} className="mt-2 inline-block underline">
                Ver registro
              </Link>
            )}
          </div>
        ) : card.completed ? (
          <Link
            href={resultHref}
            className={`flex w-full items-center justify-center rounded-2xl px-6 py-3.5 text-base font-semibold ${
              isNefro ? 'bg-teal-800 text-white' : 'bg-slate-900 text-white'
            }`}
          >
            Ver resultado
          </Link>
        ) : card.windowPhase === 'before' ? (
          <div
            className={`rounded-2xl px-4 py-4 text-center text-sm ${
              isExpert
                ? 'bg-amber-100 text-amber-950'
                : isNefro
                  ? 'bg-teal-800/50 text-teal-50'
                  : 'bg-sky-50 text-sky-950'
            }`}
          >
            Abre às {openHour}h (Brasília)
            {isExpert ? ` — só ${windowLabel}, mais pontos` : ''}
          </div>
        ) : card.missedToday ? (
          <div
            className={`rounded-2xl px-4 py-4 text-center text-sm ${
              isExpert
                ? 'bg-amber-100/80 text-amber-950'
                : isNefro
                  ? 'bg-teal-800/40 text-teal-100'
                  : 'bg-slate-100 text-slate-700'
            }`}
          >
            {isExpert
              ? `Janela de ${windowLabel} encerrada — sem pontos neste Expert.`
              : 'Prazo encerrado — sem pontos nesta disputa.'}
          </div>
        ) : (
          <p className="text-center text-sm opacity-70">Aguardando…</p>
        )}
      </div>
    </article>
  );
}

export function AlunoHomeSimple({
  name,
  disputes: disputesProp,
  showRanking,
  rankingGroupName,
  showNephrologyTreino = false,
  todayExam,
  windowPhase,
  canStart,
  canContinue,
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
            canContinue: Boolean(canContinue),
            completed: Boolean(completed),
            forfeitedToday: Boolean(forfeitedToday),
            missedToday: Boolean(missedToday),
            attemptId,
            qualityStatus,
            qualitySummary,
          },
        ];

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col px-4 pb-4 pt-6">
      <header className="mb-1">
        <p className="text-sm text-teal-900/60">Olá,</p>
        <h1 className="text-3xl font-bold tracking-tight text-teal-950">{name}</h1>
      </header>

      <DisputeOnboarding disputeCount={disputes.length} hasTreino={showNephrologyTreino} />

      <section className="mt-5 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-teal-900/50">
          Hoje
        </h2>
        {disputes.length === 0 ? (
          <div className="rounded-3xl bg-amber-50 px-5 py-6 text-sm text-amber-950 ring-1 ring-amber-200">
            Residência Geral ainda não publicada. Nefrologia só aparece se o admin autorizar.
          </div>
        ) : (
          disputes.map((card) => <DisputeBlock key={card.key} card={card} />)
        )}
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-teal-900/50">
            Ranking
          </h2>
          <Link href="/aluno/ranking" className="text-sm font-semibold text-teal-800">
            Abrir →
          </Link>
        </div>
        <div className="mt-3 rounded-3xl bg-white/80 px-5 py-4 ring-1 ring-slate-200/80">
          {!rankingGroupName ? (
            <p className="text-sm text-slate-600">Entre em um grupo para ver o ranking interno.</p>
          ) : showRanking ? (
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-slate-900">{rankingGroupName}</span>
              {' — '}ranking do dia liberado. Toque em Abrir.
            </p>
          ) : (
            <p className="text-sm text-slate-600">{studentRankingBeforeFinishMessage()}</p>
          )}
          <Link
            href="/aluno/ranking/grupos"
            className="mt-3 inline-block text-sm font-medium text-teal-800 underline-offset-2 hover:underline"
          >
            Disputa entre grupos
          </Link>
        </div>
      </section>

      {showNephrologyTreino && (
        <section className="mt-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-teal-900/50">
            Treino livre
          </h2>
          <p className="mt-1 text-xs text-slate-500">Não conta no ranking da disputa.</p>
          <div className="mt-3 grid gap-2">
            <Link
              href="/aluno/treino/nefrologia"
              className="rounded-2xl bg-teal-800 px-4 py-3.5 text-white"
            >
              <p className="text-sm font-bold">Nefrologia adulta</p>
              <p className="text-xs text-teal-100">Simulados · tema · erros</p>
            </Link>
            <Link
              href="/aluno/treino/nefropediatria"
              className="rounded-2xl bg-white px-4 py-3.5 text-slate-900 ring-1 ring-teal-200"
            >
              <p className="text-sm font-bold">Nefropediatria</p>
              <p className="text-xs text-slate-600">Simulados · tema · erros</p>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
