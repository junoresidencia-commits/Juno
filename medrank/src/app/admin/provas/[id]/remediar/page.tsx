import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireRole } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import { RemediationPanel, type RemediationQuestionRow } from '@/components/admin/RemediationPanel';
import type { OptionLetter, Question } from '@/types/database';

export default async function RemediacaoProvaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRole('admin');
  const { id: examId } = await params;

  if (usesDemoStore()) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link href="/admin/provas" className="text-sm text-emerald-700 hover:underline">
          ← Provas
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Remediação</h1>
        <p className="mt-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-950 ring-1 ring-amber-200">
          Esta função recalcula tentativas e ranking reais no Supabase. No modo demo não há
          tentativas de produção para rescore. Use em produção após aplicar a migration
          <code className="mx-1">025_question_remediation.sql</code>.
        </p>
      </div>
    );
  }

  const admin = createAdminClient();
  if (!admin) notFound();

  const { data: exam } = await admin.from('exams').select('id, title').eq('id', examId).maybeSingle();
  if (!exam) notFound();

  const { data: eqRows } = await admin
    .from('exam_questions')
    .select('question_id, order_number')
    .eq('exam_id', examId)
    .order('order_number', { ascending: true });

  const questionIds = (eqRows ?? []).map((r) => r.question_id);
  const { data: questions } = questionIds.length
    ? await admin.from('questions').select('*').in('id', questionIds)
    : { data: [] as Question[] };

  const qMap = new Map((questions ?? []).map((q) => [q.id, q as Question]));

  const overridesRes = await admin
    .from('exam_question_overrides')
    .select('question_id, status, correct_option_override')
    .eq('exam_id', examId);
  const overrides = overridesRes.error ? [] : overridesRes.data ?? [];

  const ovMap = new Map(
    overrides.map((o) => [
      o.question_id as string,
      o as {
        question_id: string;
        status: 'active' | 'annulled';
        correct_option_override: OptionLetter | null;
      },
    ])
  );

  const { data: attempts } = await admin
    .from('attempts')
    .select('id')
    .eq('exam_id', examId)
    .not('finished_at', 'is', null);

  const attemptIds = (attempts ?? []).map((a) => a.id);
  const answerStats = new Map<string, { answered: number; correctCount: number }>();

  if (attemptIds.length > 0) {
    const { data: answers } = await admin
      .from('attempt_answers')
      .select('question_id, is_correct, selected_option')
      .in('attempt_id', attemptIds);

    for (const a of answers ?? []) {
      const qid = a.question_id as string;
      const cur = answerStats.get(qid) ?? { answered: 0, correctCount: 0 };
      if (a.selected_option) cur.answered += 1;
      if (a.is_correct) cur.correctCount += 1;
      answerStats.set(qid, cur);
    }
  }

  const rows: RemediationQuestionRow[] = (eqRows ?? []).map((eq) => {
    const q = qMap.get(eq.question_id);
    const ov = ovMap.get(eq.question_id);
    const stats = answerStats.get(eq.question_id) ?? { answered: 0, correctCount: 0 };
    return {
      questionId: eq.question_id,
      orderNumber: eq.order_number,
      statement: q?.statement ?? '(questão não encontrada)',
      correctOption: (q?.correct_option ?? 'A') as OptionLetter,
      overrideStatus: ov?.status ?? null,
      overrideCorrect: ov?.correct_option_override ?? null,
      answered: stats.answered,
      correctCount: stats.correctCount,
      options: {
        A: q?.option_a,
        B: q?.option_b,
        C: q?.option_c || undefined,
        D: q?.option_d || undefined,
        E: q?.option_e || undefined,
      },
    };
  });

  const historyRes = await admin
    .from('question_remediations')
    .select(
      'id, action, reason, created_at, attempts_updated, notified_count, old_correct_option, new_correct_option'
    )
    .eq('exam_id', examId)
    .order('created_at', { ascending: false })
    .limit(50);
  const history = historyRes.error ? [] : historyRes.data ?? [];
  const pendingMigration = Boolean(overridesRes.error || historyRes.error);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link href="/admin/provas" className="text-sm text-emerald-700 hover:underline">
        ← Provas
      </Link>
      {pendingMigration && (
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-950 ring-1 ring-amber-200">
          Aplique a migration <code>025_question_remediation.sql</code> no Supabase antes de usar
          anulação/recálculo. A lista da prova já aparece; as ações só funcionam após o SQL.
        </p>
      )}
      <div className="mt-4">
        <RemediationPanel
          examId={examId}
          examTitle={exam.title}
          questions={rows}
          initialHistory={history as Parameters<typeof RemediationPanel>[0]['initialHistory']}
        />
      </div>
    </div>
  );
}
