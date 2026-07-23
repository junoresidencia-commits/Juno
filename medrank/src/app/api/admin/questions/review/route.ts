import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';

/** Lista questoes pending_review (fila do admin). */
export async function GET(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  if (usesDemoStore()) return NextResponse.json({ questions: [], batches: [] });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessaria' }, { status: 503 });

  const url = new URL(request.url);
  const batchId = url.searchParams.get('batchId');

  let q = admin
    .from('questions')
    .select(
      'id, statement, option_a, option_b, option_c, option_d, option_e, correct_option, institution, exam_name, year, source_url, question_origin, bank_status, import_batch_id, created_at'
    )
    .eq('bank_status', 'pending_review')
    .order('created_at', { ascending: false })
    .limit(100);

  if (batchId) q = q.eq('import_batch_id', batchId);

  const [{ data: questions, error }, { data: batches }] = await Promise.all([
    q,
    admin
      .from('question_import_batches')
      .select('id, title, institution, year, status, question_count, approved_count, rejected_count, created_at')
      .order('created_at', { ascending: false })
      .limit(30),
  ]);

  if (error) {
    return NextResponse.json(
      { error: error.message, hint: 'Aplique a migration 031_question_bank_provenance.sql' },
      { status: 500 }
    );
  }

  return NextResponse.json({ questions: questions ?? [], batches: batches ?? [] });
}

/** Aprova ou reprova questoes da fila. */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  if (usesDemoStore() || auth.demo) {
    return NextResponse.json({ error: 'Indisponivel no demo' }, { status: 501 });
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessaria' }, { status: 503 });

  const body = (await request.json().catch(() => null)) as {
    questionIds?: string[];
    action?: 'approve' | 'reject' | 'disable';
  } | null;

  if (!body?.questionIds?.length || !body.action) {
    return NextResponse.json({ error: 'questionIds e action obrigatorios' }, { status: 400 });
  }

  const status =
    body.action === 'approve' ? 'approved' : body.action === 'reject' ? 'rejected' : 'disabled';

  const userId =
    !auth.demo && auth.supabase
      ? (await auth.supabase.auth.getUser()).data.user?.id ?? null
      : null;

  const { data: updated, error } = await admin
    .from('questions')
    .update({
      bank_status: status,
      reviewed_at: new Date().toISOString(),
      reviewed_by: userId,
    })
    .in('id', body.questionIds)
    .eq('bank_status', 'pending_review')
    .select('id, import_batch_id');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Atualiza contadores do lote
  const batchIds = [
    ...new Set((updated ?? []).map((r) => r.import_batch_id).filter(Boolean)),
  ] as string[];
  for (const bid of batchIds) {
    const [{ count: approved }, { count: rejected }, { count: pending }] = await Promise.all([
      admin
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('import_batch_id', bid)
        .eq('bank_status', 'approved'),
      admin
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('import_batch_id', bid)
        .eq('bank_status', 'rejected'),
      admin
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('import_batch_id', bid)
        .eq('bank_status', 'pending_review'),
    ]);
    await admin
      .from('question_import_batches')
      .update({
        approved_count: approved ?? 0,
        rejected_count: rejected ?? 0,
        status:
          (pending ?? 0) > 0
            ? 'partially_approved'
            : (approved ?? 0) > 0
              ? 'completed'
              : 'rejected',
      })
      .eq('id', bid);
  }

  return NextResponse.json({
    ok: true,
    updated: updated?.length ?? 0,
    status,
  });
}
