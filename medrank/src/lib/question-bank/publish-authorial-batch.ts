import type { SupabaseClient } from '@supabase/supabase-js';

type PublishArgs = {
  batchId: string;
  loteCodigo?: string | null;
  userId?: string | null;
  reason?: string;
};

export type PublishAuthorialResult = {
  published: number;
  error?: string;
};

async function loadDrafts(
  admin: SupabaseClient,
  batchId: string,
  loteCodigo?: string | null
) {
  const primary = await admin
    .from('questions')
    .select('id, tags, question_kind, question_origin')
    .eq('import_batch_id', batchId)
    .in('bank_status', ['draft', 'pending_review']);

  if (primary.error) return { drafts: null as null, error: primary.error.message };

  let drafts = (primary.data || []).filter((q) => q.question_kind !== 'official_residency');

  if (drafts.length === 0 && loteCodigo) {
    const fallback = await admin
      .from('questions')
      .select('id, tags, question_kind, question_origin')
      .eq('lote_importacao', loteCodigo)
      .in('bank_status', ['draft', 'pending_review']);
    if (fallback.error) return { drafts: null, error: fallback.error.message };
    drafts = (fallback.data || []).filter((q) => q.question_kind !== 'official_residency');
  }

  return { drafts, error: null as string | null };
}

/**
 * Aprova questões autorais de um lote (bulk).
 */
export async function publishAuthorialBatch(
  admin: SupabaseClient,
  args: PublishArgs
): Promise<PublishAuthorialResult> {
  const reason = args.reason || 'Lote publicado após revisão';
  const reviewedAt = new Date().toISOString();

  const loaded = await loadDrafts(admin, args.batchId, args.loteCodigo);
  if (loaded.error) return { published: 0, error: loaded.error };
  const drafts = loaded.drafts || [];

  if (drafts.length === 0) {
    return {
      published: 0,
      error:
        'Nenhuma questão em rascunho neste lote (já publicadas ou vínculo do lote não encontrado).',
    };
  }

  const ids = drafts.map((q) => q.id);

  const payload: Record<string, unknown> = {
    bank_status: 'approved',
    quality_label: 'aprovada',
    quality_notes: reason,
    reviewed_at: reviewedAt,
    reproduction_allowed: false,
  };
  if (args.userId) payload.reviewed_by = args.userId;

  let { data: updated, error: upErr } = await admin
    .from('questions')
    .update(payload)
    .in('id', ids)
    .select('id');

  // FK reviewed_by às vezes falha — tenta de novo sem o campo
  if (upErr && args.userId) {
    const { reviewed_by: _drop, ...withoutReviewer } = payload;
    const retry = await admin.from('questions').update(withoutReviewer).in('id', ids).select('id');
    updated = retry.data;
    upErr = retry.error;
  }

  if (upErr) return { published: 0, error: upErr.message };

  const published = updated?.length ?? 0;
  if (published === 0) {
    return { published: 0, error: 'Update não alterou nenhuma questão.' };
  }

  // Ajusta origem/tags (não bloqueia se falhar parcialmente)
  await Promise.all(
    drafts.map(async (q) => {
      const tags = Array.from(
        new Set([
          ...((q.tags as string[]) || []),
          'authorial-published',
          'residencia-expert',
          'banco-expert',
        ])
      ).filter((t) => t !== 'rascunho');
      const question_origin =
        q.question_kind === 'authorial_guideline'
          ? 'guideline'
          : q.question_kind === 'authorial_prediction'
            ? 'original_based_on_exam'
            : q.question_origin && q.question_origin !== 'official'
              ? q.question_origin
              : 'original';
      await admin
        .from('questions')
        .update({ tags, question_origin, import_batch_id: args.batchId })
        .eq('id', q.id);
    })
  );

  const { error: batchErr } = await admin
    .from('question_import_batches')
    .update({
      status: 'published',
      approved_count: published,
    })
    .eq('id', args.batchId);

  if (batchErr) {
    return {
      published,
      error: `Questões aprovadas (${published}), mas falhou ao marcar o lote: ${batchErr.message}`,
    };
  }

  return { published };
}
