import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { usesDemoStore } from '@/lib/demo-data';
import { approveExamQualityOverride, reviewAndPersistExamQuality } from '@/lib/exams/quality-gate';
import { requireOpenAiKey } from '@/lib/exams/pre-exam-review';
import type { Question } from '@/types/database';

export const maxDuration = 300;

/** GET: status da revisão da prova */
export async function GET(request: Request) {
  const session = await getSessionProfile();
  if (!session) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const examId = new URL(request.url).searchParams.get('examId');
  if (!examId) return NextResponse.json({ error: 'examId obrigatório' }, { status: 400 });

  if (usesDemoStore()) {
    return NextResponse.json({
      quality_status: 'passed',
      quality_summary: 'Demo: revisão OK',
      reviews: [],
    });
  }

  const admin = createAdminClient();
  const client = admin ?? (await createClient());

  const { data: exam, error } = await client
    .from('exams')
    .select('id, title, quality_status, quality_summary, quality_reviewed_at')
    .eq('id', examId)
    .maybeSingle();

  if (error) {
    if (/quality_status|schema cache/i.test(error.message)) {
      return NextResponse.json({
        quality_status: 'pending',
        quality_summary: 'Migration 026 ainda não aplicada',
        pendingMigration: true,
        reviews: [],
      });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!exam) return NextResponse.json({ error: 'Prova não encontrada' }, { status: 404 });

  const { data: reviews } = await client
    .from('exam_question_reviews')
    .select('question_id, order_number, severity, codes, message, ai_notes, resolved')
    .eq('exam_id', examId)
    .order('order_number', { ascending: true });

  return NextResponse.json({
    ...exam,
    reviews: reviews ?? [],
  });
}

/** POST: re-rodar revisão ou aprovar override (admin) */
export async function POST(request: Request) {
  const session = await getSessionProfile();
  if (!session || session.profile.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  if (usesDemoStore()) {
    return NextResponse.json({ error: 'Indisponível no demo' }, { status: 501 });
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role indisponível' }, { status: 500 });

  const body = (await request.json().catch(() => ({}))) as {
    examId?: string;
    action?: 'rereview' | 'approve';
    note?: string;
  };

  if (!body.examId) return NextResponse.json({ error: 'examId obrigatório' }, { status: 400 });

  if (body.action === 'approve') {
    await approveExamQualityOverride(admin, body.examId, session.userId, body.note);
    return NextResponse.json({ ok: true, quality_status: 'approved_override' });
  }

  try {
    requireOpenAiKey();
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'OPENAI_API_KEY obrigatória' },
      { status: 503 }
    );
  }

  try {
    const { data: eqs } = await admin
      .from('exam_questions')
      .select('question_id, order_number')
      .eq('exam_id', body.examId)
      .order('order_number');
    const ids = (eqs ?? []).map((e) => e.question_id);
    const { data: qs } = await admin.from('questions').select('*').in('id', ids);
    const orderById = new Map(
      (eqs ?? []).map((e) => [e.question_id as string, e.order_number as number])
    );
    const result = await reviewAndPersistExamQuality(
      admin,
      body.examId,
      (qs ?? []) as Question[],
      orderById
    );

    return NextResponse.json({ ok: true, result });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Falha na revisão IA' },
      { status: 500 }
    );
  }
}
