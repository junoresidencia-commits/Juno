import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';

/** Desfaz o último lote autoral importado. */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  if (usesDemoStore() || auth.demo) {
    return NextResponse.json({ error: 'Indisponível no demo' }, { status: 501 });
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });

  const body = (await request.json().catch(() => null)) as { reason?: string } | null;
  const reason = String(body?.reason || 'Desfazer última importação').trim();

  const { data: last } = await admin
    .from('question_import_batches')
    .select('id, status, lote_codigo, notes')
    .eq('batch_kind', 'authorial')
    .neq('status', 'undone')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!last) {
    return NextResponse.json({ error: 'Nenhum lote autoral para desfazer' }, { status: 404 });
  }

  const { data: qs } = await admin.from('questions').select('id').eq('import_batch_id', last.id);
  let deleted = 0;
  let kept = 0;
  for (const q of qs ?? []) {
    const [{ count: eqc }, { count: anc }] = await Promise.all([
      admin.from('exam_questions').select('*', { count: 'exact', head: true }).eq('question_id', q.id),
      admin.from('attempt_answers').select('*', { count: 'exact', head: true }).eq('question_id', q.id),
    ]);
    if ((eqc ?? 0) > 0 || (anc ?? 0) > 0) {
      await admin
        .from('questions')
        .update({ bank_status: 'disabled', quality_notes: reason })
        .eq('id', q.id);
      kept += 1;
      continue;
    }
    const { error } = await admin.from('questions').delete().eq('id', q.id);
    if (!error) deleted += 1;
    else kept += 1;
  }

  await admin
    .from('question_import_batches')
    .update({
      status: 'undone',
      undone_at: new Date().toISOString(),
      notes: `${last.notes || ''}\n${reason}`.trim(),
    })
    .eq('id', last.id);

  return NextResponse.json({
    ok: true,
    batchId: last.id,
    lote_codigo: last.lote_codigo,
    deleted,
    keptDisabled: kept,
    message: `Último lote ${last.lote_codigo} desfeito (${deleted} removidas, ${kept} desativadas).`,
  });
}
