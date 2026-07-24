import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  if (usesDemoStore()) return NextResponse.json({ batch: null, questions: [] });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });
  const { id } = await ctx.params;

  const [{ data: batch, error }, { data: questions }] = await Promise.all([
    admin.from('question_import_batches').select('*').eq('id', id).maybeSingle(),
    admin
      .from('questions')
      .select(
        'id, external_id, statement, option_a, option_b, option_c, option_d, option_e, correct_option, explanation, specialty, area, topic, subtopic, difficulty, bank_status, question_kind, guideline_name, guideline_institution, guideline_year, bibliography, quality_label, lote_importacao, created_at'
      )
      .eq('import_batch_id', id)
      .order('created_at', { ascending: true }),
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!batch) return NextResponse.json({ error: 'Lote não encontrado' }, { status: 404 });

  return NextResponse.json({ batch, questions: questions ?? [] });
}

/**
 * Ações de lote: publish | suspend | delete | undo
 * body: { action, reason? }
 */
export async function POST(request: Request, ctx: Ctx) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  if (usesDemoStore() || auth.demo) {
    return NextResponse.json({ error: 'Indisponível no demo' }, { status: 501 });
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });
  const { id } = await ctx.params;

  const body = (await request.json().catch(() => null)) as {
    action?: 'publish' | 'suspend' | 'delete' | 'undo';
    reason?: string;
  } | null;

  if (!body?.action) {
    return NextResponse.json({ error: 'action obrigatória' }, { status: 400 });
  }

  const reason = String(body.reason || '').trim();
  if (body.action !== 'publish' && reason.length < 5) {
    return NextResponse.json({ error: 'Informe o motivo' }, { status: 400 });
  }

  const { data: batch } = await admin
    .from('question_import_batches')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (!batch) return NextResponse.json({ error: 'Lote não encontrado' }, { status: 404 });

  const userId =
    'supabase' in auth && auth.supabase
      ? (await auth.supabase.auth.getUser()).data.user?.id ?? null
      : null;

  if (body.action === 'publish') {
    const { data: drafts, error: loadErr } = await admin
      .from('questions')
      .select('id, tags, question_kind')
      .eq('import_batch_id', id)
      .in('bank_status', ['draft', 'pending_review'])
      .neq('question_kind', 'official_residency');

    if (loadErr) return NextResponse.json({ error: loadErr.message }, { status: 500 });

    let published = 0;
    for (const q of drafts ?? []) {
      const tags = Array.from(
        new Set([
          ...((q.tags as string[]) || []),
          'authorial-published',
          'residencia-expert',
          'banco-expert',
        ])
      ).filter((t) => t !== 'rascunho');
      const { error } = await admin
        .from('questions')
        .update({
          bank_status: 'approved',
          quality_label: 'aprovada',
          quality_notes: reason || 'Lote publicado após revisão',
          reviewed_at: new Date().toISOString(),
          reviewed_by: userId,
          tags,
          // Nunca marcar autoral como official
          question_origin:
            q.question_kind === 'authorial_guideline'
              ? 'guideline'
              : q.question_kind === 'authorial_prediction'
                ? 'original_based_on_exam'
                : 'original',
          reproduction_allowed: false,
        })
        .eq('id', q.id);
      if (!error) published += 1;
    }

    await admin
      .from('question_import_batches')
      .update({
        status: 'published',
        approved_count: published,
      })
      .eq('id', id);

    return NextResponse.json({
      ok: true,
      published,
      message: `${published} questões publicadas no banco ativo (autorais — não oficiais).`,
    });
  }

  if (body.action === 'suspend') {
    const { data: updated, error } = await admin
      .from('questions')
      .update({
        bank_status: 'disabled',
        quality_notes: reason,
      })
      .eq('import_batch_id', id)
      .select('id');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    await admin.from('question_import_batches').update({ status: 'suspended' }).eq('id', id);
    return NextResponse.json({ ok: true, suspended: updated?.length ?? 0 });
  }

  if (body.action === 'undo' || body.action === 'delete') {
    // Só remove rascunhos/pendentes sem vínculo em provas
    const { data: qs } = await admin
      .from('questions')
      .select('id, bank_status')
      .eq('import_batch_id', id);

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
          .update({ bank_status: 'disabled', quality_notes: reason || 'Lote desfeito/excluído' })
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
        status: body.action === 'undo' ? 'undone' : 'rejected',
        undone_at: new Date().toISOString(),
        notes: `${batch.notes || ''}\n${reason}`.trim(),
      })
      .eq('id', id);

    return NextResponse.json({
      ok: true,
      deleted,
      keptDisabled: kept,
      message:
        body.action === 'undo'
          ? `Desfeita importação: ${deleted} removidas, ${kept} desativadas (já usadas em provas).`
          : `Lote excluído: ${deleted} removidas, ${kept} desativadas.`,
    });
  }

  return NextResponse.json({ error: 'action desconhecida' }, { status: 400 });
}
