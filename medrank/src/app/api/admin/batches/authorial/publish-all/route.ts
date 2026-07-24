import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import { publishAuthorialBatch } from '@/lib/question-bank/publish-authorial-batch';

export const maxDuration = 120;

/**
 * Publica todos os lotes autorais em rascunho de uma vez.
 * body: { confirm?: true }
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
      { error: 'Envie { confirm: true } para publicar todos os rascunhos.' },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });

  const userId =
    'supabase' in auth && auth.supabase
      ? (await auth.supabase.auth.getUser()).data.user?.id ?? null
      : null;

  const { data: drafts, error } = await admin
    .from('question_import_batches')
    .select('id, lote_codigo, title, status, question_count')
    .eq('batch_kind', 'authorial')
    .in('status', ['draft', 'pending_review', 'partially_approved'])
    .order('created_at', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!drafts?.length) {
    return NextResponse.json({
      ok: true,
      batches: 0,
      published: 0,
      message: 'Nenhum lote em rascunho para publicar.',
    });
  }

  const results: { id: string; lote: string | null; published: number; error?: string }[] = [];
  let totalPublished = 0;

  for (const batch of drafts) {
    const result = await publishAuthorialBatch(admin, {
      batchId: batch.id,
      loteCodigo: batch.lote_codigo,
      userId,
      reason: 'Publicação em massa de lotes autorais',
    });
    results.push({
      id: batch.id,
      lote: batch.lote_codigo,
      published: result.published,
      error: result.error,
    });
    totalPublished += result.published;
  }

  const failed = results.filter((r) => r.error || r.published === 0);
  return NextResponse.json({
    ok: failed.length === 0,
    batches: drafts.length,
    published: totalPublished,
    results,
    message:
      failed.length === 0
        ? `${totalPublished} questões publicadas em ${drafts.length} lote(s). Vá em Provas → Forçar regenerar (banco).`
        : `Publicadas ${totalPublished} questões; ${failed.length} lote(s) com problema. Veja results.`,
  });
}
