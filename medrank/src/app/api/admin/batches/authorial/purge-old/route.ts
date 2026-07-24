import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';

export const maxDuration = 120;

/**
 * Banco ativo = SÓ lotes MedRank (01–27).
 * Desativa oficiais/sintéticas/resto. body: { confirm: true }
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
      { error: 'Envie { confirm: true } para deixar só os lotes MedRank.' },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });

  // Desativa tudo que NÃO é dos lotes MedRank (bulk via filter negativo em lotes)
  // PostgREST: desativa oficiais
  const { data: off, error: e1 } = await admin
    .from('questions')
    .update({
      bank_status: 'disabled',
      quality_notes: 'Desativada: banco ativo = só lotes MedRank 01–27',
    })
    .eq('question_origin', 'official')
    .neq('bank_status', 'disabled')
    .select('id');
  if (e1) return NextResponse.json({ error: e1.message }, { status: 500 });

  // Desativa sem lote_importacao MedRank (páginas)
  let disabledOther = 0;
  const pageSize = 500;
  for (let page = 0; page < 50; page++) {
    const from = page * pageSize;
    const to = from + pageSize - 1;
    const { data: rows, error } = await admin
      .from('questions')
      .select('id, lote_importacao, bank_status')
      .neq('bank_status', 'disabled')
      .neq('bank_status', 'annulled')
      .range(from, to);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!rows?.length) break;

    const toDisable = rows
      .filter((q) => {
        const c = String(q.lote_importacao || '');
        return !(
          c.startsWith('MEDRANK_AUTORAL_2026_LOTE_') ||
          c.startsWith('MEDRANK_NEFRO_NEFROPED_2026_LOTE_') ||
          c.startsWith('MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_')
        );
      })
      .map((q) => q.id);

    for (let i = 0; i < toDisable.length; i += 100) {
      const chunk = toDisable.slice(i, i + 100);
      const { error: uErr } = await admin
        .from('questions')
        .update({
          bank_status: 'disabled',
          quality_notes: 'Desativada: fora dos lotes MedRank 01–27',
        })
        .in('id', chunk);
      if (uErr) return NextResponse.json({ error: uErr.message }, { status: 500 });
      disabledOther += chunk.length;
    }

    // Se a página veio cheia de oficiais já desativados, range ainda avança — ok
    if (rows.length < pageSize) break;
  }

  // Batches autorais estranhos
  const { data: batches } = await admin
    .from('question_import_batches')
    .select('id, lote_codigo')
    .eq('batch_kind', 'authorial');

  let rejectedBatches = 0;
  for (const b of batches || []) {
    const c = String(b.lote_codigo || '');
    const keep =
      c.startsWith('MEDRANK_AUTORAL_2026_LOTE_') ||
      c.startsWith('MEDRANK_NEFRO_NEFROPED_2026_LOTE_') ||
      c.startsWith('MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_');
    if (!keep) {
      await admin
        .from('question_import_batches')
        .update({ status: 'rejected', undone_at: new Date().toISOString() })
        .eq('id', b.id);
      rejectedBatches += 1;
    }
  }

  const { count: approvedLots } = await admin
    .from('questions')
    .select('*', { count: 'exact', head: true })
    .eq('bank_status', 'approved')
    .or(
      [
        'lote_importacao.like.MEDRANK_AUTORAL_2026_LOTE_%',
        'lote_importacao.like.MEDRANK_NEFRO_NEFROPED_2026_LOTE_%',
        'lote_importacao.like.MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_%',
      ].join(',')
    );

  const { count: draftLots } = await admin
    .from('questions')
    .select('*', { count: 'exact', head: true })
    .eq('bank_status', 'draft')
    .or(
      [
        'lote_importacao.like.MEDRANK_AUTORAL_2026_LOTE_%',
        'lote_importacao.like.MEDRANK_NEFRO_NEFROPED_2026_LOTE_%',
        'lote_importacao.like.MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_%',
      ].join(',')
    );

  const disabledOfficials = off?.length ?? 0;

  return NextResponse.json({
    ok: true,
    disabledOfficials,
    disabledOther,
    rejectedBatches,
    approvedFromLots: approvedLots ?? 0,
    draftFromLots: draftLots ?? 0,
    message: `Pronto. Ativas nos lotes: ${approvedLots ?? 0} · rascunho nos lotes: ${draftLots ?? 0}. Desativei ${disabledOfficials + disabledOther} antigas. Publique os rascunhos e regenere as provas.`,
  });
}
