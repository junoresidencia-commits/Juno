import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';

export const maxDuration = 120;

/** Lotes que devem permanecer (diretrizes atuais). */
export const KEEP_LOTE_PREFIX = 'MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_';

/**
 * Apaga questões/lotes autorais antigos e mantém só DIRETRIZES 20–27.
 * body: { confirm: true }
 *
 * Nunca mexe em question_origin=official / question_kind=official_residency.
 */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  if (usesDemoStore() || auth.demo) {
    return NextResponse.json({ error: 'Indisponível no demo' }, { status: 501 });
  }

  const body = (await request.json().catch(() => null)) as { confirm?: boolean } | null;
  if (!body?.confirm) {
    return NextResponse.json(
      { error: 'Envie { confirm: true } para apagar lotes autorais antigos.' },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });

  const { data: batches, error: bErr } = await admin
    .from('question_import_batches')
    .select('id, lote_codigo, title, status')
    .eq('batch_kind', 'authorial');

  if (bErr) return NextResponse.json({ error: bErr.message }, { status: 500 });

  const toRemove = (batches || []).filter(
    (b) => !String(b.lote_codigo || '').startsWith(KEEP_LOTE_PREFIX)
  );
  const toKeep = (batches || []).filter((b) =>
    String(b.lote_codigo || '').startsWith(KEEP_LOTE_PREFIX)
  );

  let deletedQuestions = 0;
  let disabledQuestions = 0;
  let deletedBatches = 0;

  for (const batch of toRemove) {
    const { data: qs } = await admin
      .from('questions')
      .select('id')
      .eq('import_batch_id', batch.id)
      .neq('question_kind', 'official_residency');

    // Também por lote_importacao
    let extra: { id: string }[] = [];
    if (batch.lote_codigo) {
      const { data: byLote } = await admin
        .from('questions')
        .select('id')
        .eq('lote_importacao', batch.lote_codigo)
        .neq('question_kind', 'official_residency');
      extra = byLote || [];
    }

    const ids = Array.from(new Set([...(qs || []), ...extra].map((q) => q.id)));

    for (let i = 0; i < ids.length; i += 100) {
      const chunk = ids.slice(i, i + 100);
      for (const id of chunk) {
        const [{ count: eqc }, { count: anc }] = await Promise.all([
          admin.from('exam_questions').select('*', { count: 'exact', head: true }).eq('question_id', id),
          admin.from('attempt_answers').select('*', { count: 'exact', head: true }).eq('question_id', id),
        ]);
        if ((eqc ?? 0) > 0 || (anc ?? 0) > 0) {
          await admin
            .from('questions')
            .update({
              bank_status: 'disabled',
              quality_notes: 'Removida: lote autoral antigo (manter só diretrizes 20–27)',
            })
            .eq('id', id);
          disabledQuestions += 1;
        } else {
          const { error } = await admin.from('questions').delete().eq('id', id);
          if (!error) deletedQuestions += 1;
          else {
            await admin
              .from('questions')
              .update({ bank_status: 'disabled' })
              .eq('id', id);
            disabledQuestions += 1;
          }
        }
      }
    }

    await admin
      .from('question_import_batches')
      .update({
        status: 'rejected',
        notes: 'Apagado: manter só MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_20–27',
        undone_at: new Date().toISOString(),
      })
      .eq('id', batch.id);
    deletedBatches += 1;
  }

  // Órfãs: authorial draft/approved com lote antigo sem batch
  const { data: orphans } = await admin
    .from('questions')
    .select('id, lote_importacao, question_kind')
    .in('question_kind', ['authorial_guideline', 'authorial_prediction', 'in_review'])
    .not('lote_importacao', 'like', `${KEEP_LOTE_PREFIX}%`);

  for (const q of orphans || []) {
    if (!q.lote_importacao || String(q.lote_importacao).startsWith(KEEP_LOTE_PREFIX)) continue;
    const [{ count: eqc }, { count: anc }] = await Promise.all([
      admin.from('exam_questions').select('*', { count: 'exact', head: true }).eq('question_id', q.id),
      admin.from('attempt_answers').select('*', { count: 'exact', head: true }).eq('question_id', q.id),
    ]);
    if ((eqc ?? 0) > 0 || (anc ?? 0) > 0) {
      await admin.from('questions').update({ bank_status: 'disabled' }).eq('id', q.id);
      disabledQuestions += 1;
    } else {
      const { error } = await admin.from('questions').delete().eq('id', q.id);
      if (!error) deletedQuestions += 1;
    }
  }

  return NextResponse.json({
    ok: true,
    keptBatches: toKeep.map((b) => b.lote_codigo),
    removedBatches: deletedBatches,
    deletedQuestions,
    disabledQuestions,
    message: `Mantidos ${toKeep.length} lote(s) DIR 20–27. Removidos ${deletedBatches} lote(s) antigos · ${deletedQuestions} questões apagadas · ${disabledQuestions} desativadas (já usadas em provas). Oficiais ENARE intactas.`,
  });
}
