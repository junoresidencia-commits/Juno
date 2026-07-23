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
  finishedToday?: number;
  streakDays?: number;
  /** Especialidade da disputa de hoje (Nefrologia, Nefropediatria ou Residência). */
  trackLabel?: string;
  /** Nome da liga (ex.: Liga de Nefrologia) quando a disputa é exclusiva. */
  leagueLabel?: string;
  /** Grupo cujo ranking aparece na home (só membros). */
  rankingGroupName?: string;
  /** Treinos Nefro/Nefroped — só Liga de Nefrologia (ou admin). */
  showNephrologyTreino?: boolean;
  qualityStatus?: string | null;
  qualitySummary?: string | null;
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
  finishedToday = 0,
  streakDays = 0,
  trackLabel,
  leagueLabel,
  rankingGroupName,
  showNephrologyTreino = false,
  qualityStatus,
  qualitySummary,
}: Props) {
  const examHref = todayExam ? `/aluno/prova/${todayExam.id}` : '/aluno';
  const resultHref = attemptId ? `/aluno/resultado/${attemptId}` : '/aluno';
  const specialty = trackLabel ?? 'Disputa do dia';
  const qualityBlocked = qualityStatus === 'blocked' || qualityStatus === 'pending';
  const effectiveCanStart = canStart && !qualityBlocked;

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

      {(canStart || windowPhase === 'open') && finishedToday > 0 && (
        <p className="mb-4 text-center text-sm text-slate-600">
          <strong className="text-emerald-700">{finishedToday}</strong>{' '}
          {finishedToday === 1 ? 'aluno já disputou' : 'alunos já disputaram'} hoje
        </p>
      )}

      <section className="mt-4 flex flex-1 flex-col md:max-w-xl">
        {todayExam ? (
          <>
            <p className="mb-3 text-center text-sm font-medium text-teal-800">
              {leagueLabel ? (
                <>
                  <span className="font-bold">{leagueLabel}</span>
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
                  {qualityStatus === 'pending'
                    ? 'Aguarde — revisão IA em andamento'
                    : 'Disputa não publicada — revisão IA'}
                </p>
                <p className="mt-1">
                  {qualitySummary ||
                    (qualityStatus === 'pending'
                      ? 'A disputa só libera depois que as 20 questões forem aprovadas automaticamente pela IA.'
                      : 'A revisão automática reprovou questões. O sistema deve substituí-las e republicar; o administrador foi avisado.')}
                </p>
              </div>
            )}

            {!qualityBlocked && qualityStatus === 'warning' && (
              <div className="mb-4 rounded-2xl bg-amber-50 p-3 text-sm text-amber-950 ring-1 ring-amber-200">
                <strong>Aviso:</strong>{' '}
                {qualitySummary || 'Há alertas menores na revisão automática desta prova.'}
              </div>
            )}

            {effectiveCanStart && (
              <Link
                href={examHref}
                prefetch={false}
                className="exam-tap flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-6 py-6 text-xl font-bold text-white shadow-lg shadow-emerald-600/25 active:scale-[0.98]"
              >
                Começar a disputa!
              </Link>
            )}
            {forfeitedToday && (
              <div className="rounded-2xl bg-red-50 px-6 py-8 text-center ring-1 ring-red-100">
                <p className="text-lg font-semibold text-red-900">Você saiu da disputa</p>
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
                <p className="text-lg font-semibold text-blue-900">Disputa abre às 7h</p>
                <p className="mt-2 text-sm text-blue-700">
                  Hoje é {specialty}. Volte mais tarde para disputar.
                </p>
              </div>
            )}
            {missedToday && (
              <div className="rounded-2xl bg-red-50 px-6 py-8 text-center ring-1 ring-red-100">
                <p className="text-lg font-semibold text-red-900">Você não fez a disputa hoje</p>
                <p className="mt-2 text-sm text-red-700">Sem pontos neste dia — veja o ranking abaixo.</p>
              </div>
            )}

            <p className="mt-4 text-center text-sm text-slate-600">
              {todayExam.total_questions} questões · {todayExam.duration_minutes} min · {formatExamWindowShort()}
            </p>
            {effectiveCanStart && (
              <p className="mt-2 text-center text-xs text-slate-500">
                Uma chance por dia · {specialty} · máx. 2.000 pts
              </p>
            )}
            {canStart && qualityBlocked && (
              <p className="mt-2 text-center text-xs text-red-700">
                Início bloqueado até o professor liberar a disputa.
              </p>
            )}
            {canContinue && (
              <p className="mt-2 text-center text-xs text-slate-500">
                Disputa em andamento — continue antes do tempo acabar.
              </p>
            )}
          </>
        ) : (
          <div className="rounded-2xl bg-white px-6 py-10 text-center text-slate-900 ring-1 ring-slate-200">
            <p className="text-slate-600">Sem disputa publicada para hoje ({specialty}).</p>
            <p className="mt-2 text-sm text-slate-500">
              O professor gera 1× por dia (ou o cron). Aguarde a revisão automática da IA.
            </p>
          </div>
        )}
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
              Você ainda não está em um grupo. O professor adiciona você na liga — aí o ranking
              aparece aqui (só para quem participa).
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
            Exclusivo da Liga de Nefrologia. Gere um simulado agora.
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

      <footer className="mt-6 pb-4 text-center">
        <Link href="/aluno/ranking?period=weekly" className="text-sm text-slate-600 underline-offset-2 hover:text-emerald-700 hover:underline">
          Ranking da semana
        </Link>
      </footer>
    </div>
  );
}
