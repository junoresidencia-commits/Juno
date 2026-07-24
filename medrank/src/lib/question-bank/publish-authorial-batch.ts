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

const DRAFT_STATUSES = ['draft', 'pending_review'] as const;

function basePayload(reason: string, userId?: string | null) {
  const payload: Record<string, unknown> = {
    bank_status: 'approved',
    quality_label: 'aprovada',
    quality_notes: reason,
    reviewed_at: new Date().toISOString(),
    reproduction_allowed: false,
  };
  if (userId) payload.reviewed_by = userId;
  return payload;
}

async function updateApproved(
  admin: SupabaseClient,
  ids: string[],
  payload: Record<string, unknown>
) {
  if (ids.length === 0) return { count: 0, error: null as string | null };

  // Chunk para limites do PostgREST (.in)
  let count = 0;
  for (let i = 0; i < ids.length; i += 200) {
    const chunk = ids.slice(i, i + 200);
    let { data, error } = await admin.from('questions').update(payload).in('id', chunk).select('id');
    if (error && payload.reviewed_by) {
      const { reviewed_by: _r, ...without } = payload;
      const retry = await admin.from('questions').update(without).in('id', chunk).select('id');
      data = retry.data;
      error = retry.error;
    }
    if (error) return { count, error: error.message };
    count += data?.length ?? 0;
  }
  return { count, error: null };
}

/**
 * Aprova questões autorais de UM lote (1–2 queries).
 */
export async function publishAuthorialBatch(
  admin: SupabaseClient,
  args: PublishArgs
): Promise<PublishAuthorialResult> {
  const reason = args.reason || 'Lote publicado após revisão';
  const payload = basePayload(reason, args.userId);

  let { data: drafts, error: loadErr } = await admin
    .from('questions')
    .select('id, question_kind')
    .eq('import_batch_id', args.batchId)
    .in('bank_status', [...DRAFT_STATUSES]);

  if (loadErr) return { published: 0, error: loadErr.message };

  let rows = (drafts || []).filter((q) => q.question_kind !== 'official_residency');

  if (rows.length === 0 && args.loteCodigo) {
    const fb = await admin
      .from('questions')
      .select('id, question_kind')
      .eq('lote_importacao', args.loteCodigo)
      .in('bank_status', [...DRAFT_STATUSES]);
    if (fb.error) return { published: 0, error: fb.error.message };
    rows = (fb.data || []).filter((q) => q.question_kind !== 'official_residency');
  }

  if (rows.length === 0) {
    return {
      published: 0,
      error: 'Nenhuma questão em rascunho neste lote.',
    };
  }

  const ids = rows.map((q) => q.id);
  const { count, error } = await updateApproved(admin, ids, payload);
  if (error) return { published: 0, error };
  if (count === 0) return { published: 0, error: 'Update não alterou nenhuma questão.' };

  // Reatacha batch + remove tag rascunho em um único update (tags fixas ok para disputa)
  await updateApproved(admin, ids, {
    import_batch_id: args.batchId,
    tags: ['authorial-batch', 'authorial-published', 'residencia-expert', 'banco-expert'],
  });

  const { error: batchErr } = await admin
    .from('question_import_batches')
    .update({ status: 'published', approved_count: count })
    .eq('id', args.batchId);

  if (batchErr) {
    return {
      published: count,
      error: `Questões aprovadas (${count}), falha ao marcar lote: ${batchErr.message}`,
    };
  }

  return { published: count };
}

/**
 * Publica TODOS os lotes autorais em rascunho — o mais rápido possível.
 */
export async function publishAllAuthorialDrafts(
  admin: SupabaseClient,
  args: { userId?: string | null; reason?: string }
): Promise<{
  batches: number;
  published: number;
  error?: string;
  message: string;
}> {
  const reason = args.reason || 'Publicação em massa de lotes autorais';
  const payload = basePayload(reason, args.userId);

  const { data: draftBatches, error: bErr } = await admin
    .from('question_import_batches')
    .select('id, lote_codigo')
    .eq('batch_kind', 'authorial')
    .in('status', ['draft', 'pending_review', 'partially_approved']);

  if (bErr) {
    return { batches: 0, published: 0, error: bErr.message, message: bErr.message };
  }
  if (!draftBatches?.length) {
    return {
      batches: 0,
      published: 0,
      message: 'Nenhum lote em rascunho para publicar.',
    };
  }

  const batchIds = draftBatches.map((b) => b.id);
  const loteCodes = draftBatches.map((b) => b.lote_codigo).filter(Boolean) as string[];

  // Busca todas as questões draft ligadas a esses lotes
  const { data: byBatch, error: q1 } = await admin
    .from('questions')
    .select('id, question_kind, import_batch_id, lote_importacao')
    .in('import_batch_id', batchIds)
    .in('bank_status', [...DRAFT_STATUSES]);

  if (q1) {
    return { batches: draftBatches.length, published: 0, error: q1.message, message: q1.message };
  }

  let rows = (byBatch || []).filter((q) => q.question_kind !== 'official_residency');

  if (loteCodes.length > 0) {
    const { data: byLote, error: q2 } = await admin
      .from('questions')
      .select('id, question_kind, import_batch_id, lote_importacao')
      .in('lote_importacao', loteCodes)
      .in('bank_status', [...DRAFT_STATUSES]);
    if (q2) {
      return { batches: draftBatches.length, published: 0, error: q2.message, message: q2.message };
    }
    const seen = new Set(rows.map((r) => r.id));
    for (const q of byLote || []) {
      if (q.question_kind === 'official_residency') continue;
      if (!seen.has(q.id)) {
        seen.add(q.id);
        rows.push(q);
      }
    }
  }

  if (rows.length === 0) {
    return {
      batches: draftBatches.length,
      published: 0,
      error: 'Lotes em rascunho sem questões draft encontradas.',
      message: 'Lotes em rascunho sem questões draft encontradas.',
    };
  }

  const ids = rows.map((r) => r.id);
  const { count, error } = await updateApproved(admin, ids, {
    ...payload,
    tags: ['authorial-batch', 'authorial-published', 'residencia-expert', 'banco-expert'],
  });
  if (error) {
    return { batches: draftBatches.length, published: 0, error, message: error };
  }

  // Marca todos os lotes como published
  await admin
    .from('question_import_batches')
    .update({ status: 'published', approved_count: Math.floor(count / Math.max(draftBatches.length, 1)) })
    .in('id', batchIds);

  // Ajusta approved_count por lote (rápido, paralelo)
  await Promise.all(
    draftBatches.map(async (b) => {
      const n = rows.filter(
        (r) =>
          r.import_batch_id === b.id ||
          (r as { lote_importacao?: string }).lote_importacao === b.lote_codigo
      ).length;
      await admin
        .from('question_import_batches')
        .update({ status: 'published', approved_count: n || count })
        .eq('id', b.id);
    })
  );

  return {
    batches: draftBatches.length,
    published: count,
    message: `${count} questões publicadas em ${draftBatches.length} lote(s). Vá em Provas → Forçar regenerar (banco).`,
  };
}
