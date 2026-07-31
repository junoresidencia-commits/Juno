import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { formatDateBR } from '@/lib/format';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoExams } from '@/lib/demo/content';
import { todayDateString, formatExamWindowShort } from '@/lib/exams/release';
import { getDemoAdminExamStatus } from '@/lib/demo/presenters';
import { EnsureDailyExamsButton } from '@/components/admin/EnsureDailyExamsButton';
import { ExamQualityAdminCard } from '@/components/admin/ExamQualityAdminCard';
import { AiPaidSettingsCard } from '@/components/admin/AiPaidSettingsCard';
import { BankInventoryPanel } from '@/components/admin/BankInventoryPanel';
import { BankReadinessPanel } from '@/components/admin/BankReadinessPanel';
import { ReleaseForfeitedPanel } from '@/components/admin/ReleaseForfeitedPanel';
import { shortTrackLabel, trackForDate } from '@/lib/exams/daily-schedule';
import {
  qualityStatusLabel,
  qualityStatusTone,
  shortExamLabel,
} from '@/lib/exams/admin-labels';

function ExamRow({
  id,
  title,
  dateAvailable,
  totalQuestions,
  durationMinutes,
  audience,
  today,
  qualityStatus,
}: {
  id: string;
  title: string;
  dateAvailable: string;
  totalQuestions: number;
  durationMinutes: number;
  audience?: string | null;
  today: string;
  qualityStatus?: string | null;
}) {
  const isToday = dateAvailable === today;
  const label = shortExamLabel(title, audience);

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-slate-900 ring-1 ring-slate-200">
      <div className="min-w-0">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-slate-600">
          {formatDateBR(dateAvailable)} · {totalQuestions}Q · {durationMinutes} min
          {audience === 'nephrology' ? ' · Nefro' : ' · Geral'}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {qualityStatus ? (
          <span
            className={`hidden rounded-full px-2.5 py-0.5 text-xs font-semibold sm:inline ${qualityStatusTone(qualityStatus)}`}
          >
            {qualityStatusLabel(qualityStatus)}
          </span>
        ) : null}
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            isToday ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {isToday ? 'Hoje' : 'Publicada'}
        </span>
        <Link
          href={`/admin/provas/${id}/amostra`}
          className="rounded-lg bg-teal-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-900"
        >
          Abrir
        </Link>
      </div>
    </div>
  );
}

export default async function ProvasPage() {
  await requireRole('admin');
  const today = todayDateString();
  const todayTrack = shortTrackLabel(trackForDate(today), today);

  if (usesDemoStore()) {
    const exams = getDemoExams().slice().reverse();
    const { todayExam, finishedCount, activeStudents, rankings } = getDemoAdminExamStatus();

    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <Link href="/admin" className="text-sm text-emerald-700 hover:underline">
              ← Painel
            </Link>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Provas</h1>
            <p className="mt-1 text-sm text-slate-600">{formatExamWindowShort()}</p>
          </div>
          <Link
            href="/admin/provas/nova"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
          >
            Nova
          </Link>
        </div>

        {todayExam && (
          <section className="mb-6 rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-200">
            <h2 className="text-lg font-semibold text-emerald-900">Hoje</h2>
            <p className="mt-1 font-medium">{shortExamLabel(todayExam.title)}</p>
            <p className="mt-1 text-sm text-emerald-800">
              {finishedCount}/{activeStudents} alunos finalizaram
            </p>
            {rankings.length > 0 && (
              <ol className="mt-3 space-y-1 text-sm">
                {rankings.slice(0, 5).map((r) => (
                  <li key={r.id} className="flex justify-between">
                    <span>
                      {r.position}º {(r as { profiles?: { name?: string } }).profiles?.name}
                    </span>
                    <span className="font-medium">{r.total_score} pts</span>
                  </li>
                ))}
              </ol>
            )}
          </section>
        )}

        <section className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Recentes
          </h2>
          <div className="space-y-2">
            {exams.slice(0, 20).map((e) => (
              <ExamRow
                key={e.id}
                id={e.id}
                title={e.title}
                dateAvailable={e.date_available}
                totalQuestions={e.total_questions}
                durationMinutes={e.duration_minutes}
                today={today}
              />
            ))}
          </div>
        </section>

        <details className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <summary className="cursor-pointer font-semibold text-slate-800">Avançado</summary>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-slate-600">
              Hoje seria: <strong>{todayTrack}</strong>
            </p>
            <EnsureDailyExamsButton />
          </div>
        </details>
      </div>
    );
  }

  const supabase = await createClient();
  const { data: exams } = await supabase
    .from('exams')
    .select('*')
    .order('date_available', { ascending: false })
    .limit(40);

  const todayExams = (exams ?? []).filter((e) => e.date_available === today);
  const todayGeneral = todayExams.find(
    (e) => (e as { audience?: string }).audience !== 'nephrology'
  );
  const todayNefro = todayExams.find(
    (e) => (e as { audience?: string }).audience === 'nephrology'
  );
  const pastExams = (exams ?? []).filter((e) => e.date_available !== today);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <Link href="/admin" className="text-sm text-emerald-700 hover:underline">
            ← Painel
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Provas</h1>
          <p className="mt-1 text-sm text-slate-600">
            Hoje · Geral + Nefro · {formatExamWindowShort()}
          </p>
        </div>
        <Link
          href="/admin/provas/nova"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
        >
          Nova
        </Link>
      </div>

      <ReleaseForfeitedPanel autoLoad hideWhenEmpty />

      <section className="mb-8 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Provas de hoje</h2>
        {!todayGeneral && !todayNefro ? (
          <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
            <p className="text-sm text-amber-950">Ainda não há disputa hoje.</p>
            <div className="mt-3">
              <EnsureDailyExamsButton />
            </div>
          </div>
        ) : (
          <>
            {todayNefro && (
              <ExamQualityAdminCard
                examId={todayNefro.id}
                examLabel={shortExamLabel(
                  todayNefro.title,
                  (todayNefro as { audience?: string }).audience
                )}
                initialStatus={(todayNefro as { quality_status?: string }).quality_status}
                initialSummary={(todayNefro as { quality_summary?: string }).quality_summary}
                compact
              />
            )}
            {todayGeneral && (
              <ExamQualityAdminCard
                examId={todayGeneral.id}
                examLabel={shortExamLabel(
                  todayGeneral.title,
                  (todayGeneral as { audience?: string }).audience
                )}
                initialStatus={(todayGeneral as { quality_status?: string }).quality_status}
                initialSummary={(todayGeneral as { quality_summary?: string }).quality_summary}
                compact
              />
            )}
          </>
        )}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Anteriores
        </h2>
        <div className="space-y-2">
          {pastExams.length === 0 ? (
            <p className="text-sm text-slate-600">Nenhuma prova anterior nesta lista.</p>
          ) : (
            pastExams.map((e) => (
              <ExamRow
                key={e.id}
                id={e.id}
                title={e.title}
                dateAvailable={e.date_available}
                totalQuestions={e.total_questions}
                durationMinutes={e.duration_minutes}
                audience={(e as { audience?: string }).audience}
                today={today}
                qualityStatus={(e as { quality_status?: string }).quality_status}
              />
            ))
          )}
        </div>
      </section>

      <details className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
        <summary className="cursor-pointer text-base font-semibold text-slate-800">
          Avançado · banco, geração e IA
        </summary>
        <div className="mt-4 space-y-4">
          <p className="text-sm text-slate-600">
            Nefro hoje: <strong>{todayTrack}</strong>. Geração usa o banco aprovado (sem OpenAI).
            Dá para pré-gerar 7, 14 ou 30 dias de uma vez.
          </p>
          <EnsureDailyExamsButton />
          <AiPaidSettingsCard />
          <BankReadinessPanel />
          <BankInventoryPanel />
        </div>
      </details>
    </div>
  );
}
