import Link from 'next/link';
import type { Exam } from '@/types/database';
import type { RankingPreviewRow } from '@/components/ranking/RankingPreviewList';
import { RankingPreviewList } from '@/components/ranking/RankingPreviewList';
import { DisputeOnboarding } from '@/components/aluno/DisputeOnboarding';
import { formatExamWindowShort } from '@/lib/exams/window';
import { studentRankingBeforeFinishMessage } from '@/lib/exams/ranking-visibility';

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

  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
        {card.leagueLabel || 'Disputa'}
      </p>
      <h3 className="mt-1 text-lg font-bold text-slate-900">{specialty}</h3>
      {card.exam && (
        <p className="mt-1 text-sm text-slate-600">
          {qCount} questões · {card.exam.duration_minutes} min · {formatExamWindowShort()}
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

      <div className="mt-4">
        {!card.exam ? (
          <p className="rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-600">
            Ainda sem disputa publicada para hoje.
          </p>
        ) : card.canContinue ? (
          <Link
            href={examHref}
            prefetch={false}
            className="exam-tap flex w-full items-center justify-center rounded-2xl bg-amber-600 px-6 py-5 text-lg font-bold text-white shadow-md shadow-amber-600/20 active:scale-[0.98]"
          >
            Continuar disputa
          </Link>
        ) : effectiveCanStart ? (
          <Link
            href={examHref}
            prefetch={false}
            className="exam-tap flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-6 py-5 text-lg font-bold text-white shadow-md shadow-emerald-600/20 active:scale-[0.98]"
          >
            Iniciar disputa
          </Link>
        ) : card.forfeitedToday ? (
          <div className="rounded-xl bg-red-50 px-4 py-5 text-center ring-1 ring-red-100">
            <p className="font-semibold text-red-900">Você saiu da disputa</p>
            <p className="mt-1 text-sm text-red-700">
              Esta prova encerrou (antifraude ou abandono). A outra disputa, se houver, continua
              disponível. Se foi ligação ou notificação, fale com o professor — ele pode liberar de
              novo.
            </p>
            {card.attemptId && (
              <Link href={resultHref} className="mt-3 inline-block text-sm font-medium text-red-800 underline">
                Ver registro →
              </Link>
            )}
          </div>
        ) : card.completed ? (
          <Link
            href={resultHref}
            className="flex w-full items-center justify-center rounded-2xl bg-slate-800 px-6 py-4 text-base font-semibold text-white"
          >
            Ver resultado
          </Link>
        ) : card.windowPhase === 'before' ? (
          <div className="rounded-xl bg-blue-50 px-4 py-5 text-center text-sm text-blue-900 ring-1 ring-blue-100">
            Abre às 7h (Brasília)
          </div>
        ) : card.missedToday ? (
          <div className="rounded-xl bg-slate-100 px-4 py-5 text-center text-sm text-slate-700">
            Prazo encerrado — sem pontos nesta disputa hoje.
          </div>
        ) : (
          <p className="text-center text-sm text-slate-500">Aguardando…</p>
        )}
      </div>
    </article>
  );
}

export function AlunoHomeSimple({
  name,
  userId,
  disputes: disputesProp,
  showRanking,
  todayRankings,
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
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-xl flex-col px-4 py-6">
      <header className="mb-2">
        <p className="text-sm text-slate-600">Olá,</p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{name}</h1>
      </header>

      <DisputeOnboarding disputeCount={disputes.length} hasTreino={showNephrologyTreino} />

      {/* 1) Disputas — job principal */}
      <section className="mt-4 space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
          Suas disputas de hoje
        </h2>
        {disputes.length === 0 ? (
          <div className="rounded-2xl bg-amber-50 px-5 py-6 text-sm text-amber-950 ring-1 ring-amber-200">
            A prova diária de Residência Geral ainda não foi publicada para hoje. A de Nefrologia
            só aparece se o administrador autorizar.
          </div>
        ) : (
          disputes.map((card) => <DisputeBlock key={card.key} card={card} />)
        )}
      </section>

      {/* 2) Ranking do grupo — secundário */}
      <section className="mt-8">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Ranking do seu grupo
          </h2>
          {showRanking && (
            <Link href="/aluno/ranking" className="text-sm font-medium text-emerald-700">
              Ver completo →
            </Link>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Ranking do seu grupo. Também há{' '}
          <Link href="/aluno/ranking/grupos" className="font-medium text-emerald-700">
            disputa entre grupos
          </Link>
          .
        </p>
        <div className="mt-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
          {!rankingGroupName ? (
            <p className="text-sm text-slate-600">
              Você ainda não está em um grupo de ranking. O professor te adiciona na liga.
            </p>
          ) : showRanking ? (
            todayRankings.length > 0 ? (
              <>
                <p className="mb-2 text-sm font-semibold text-slate-800">{rankingGroupName}</p>
                <RankingPreviewList rankings={todayRankings} userId={userId} />
              </>
            ) : (
              <p className="text-sm text-slate-600">Aguardando primeiros resultados…</p>
            )
          ) : (
            <p className="text-sm text-slate-600">{studentRankingBeforeFinishMessage()}</p>
          )}
        </div>
      </section>

      {/* 3) Treino livre — não compete com a disputa */}
      {showNephrologyTreino && (
        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Treino livre
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Não conta no ranking da disputa. Treine quantas vezes quiser.
          </p>
          <div className="mt-3 grid gap-2">
            <Link
              href="/aluno/treino/nefrologia"
              className="rounded-xl bg-teal-700 px-4 py-3 text-white hover:bg-teal-800"
            >
              <p className="text-sm font-bold">Nefrologia adulta · título SBN</p>
              <p className="text-xs text-teal-100">Simulados · tema · revisão de erros</p>
            </Link>
            <Link
              href="/aluno/treino/nefropediatria"
              className="rounded-xl bg-white px-4 py-3 text-slate-900 ring-1 ring-teal-200 hover:ring-teal-400"
            >
              <p className="text-sm font-bold">Nefrologia pediátrica · SBN/SBP</p>
              <p className="text-xs text-slate-600">Simulados · tema · revisão de erros</p>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
