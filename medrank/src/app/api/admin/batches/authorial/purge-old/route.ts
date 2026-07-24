import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';

export const maxDuration = 120;

const MIN_OFFICIAL_YEAR = 2024;

function isMedRankLote(codigo: string | null | undefined): boolean {
  const c = String(codigo || '');
  return (
    c.startsWith('MEDRANK_AUTORAL_2026_LOTE_') ||
    c.startsWith('MEDRANK_NEFRO_NEFROPED_2026_LOTE_') ||
    c.startsWith('MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_')
  );
}

/**
 * Banco ativo:
 * - Lotes MedRank 01–27 (sempre)
 * - Oficiais ENARE/Revalida/USP com year >= 2024
 *
 * Sai: oficiais antigas (<2024), sintéticas sem lote, lixo.
 * body: { confirm: true }
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
      { error: 'Envie { confirm: true } para limpar o banco.' },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });

  // 1) Oficiais antigas (<2024) → disabled
  const { data: oldOfficials, error: e1 } = await admin
    .from('questions')
    .update({
      bank_status: 'disabled',
      quality_notes: `Desativada: oficial anterior a ${MIN_OFFICIAL_YEAR} (desatualizada)`,
    })
    .eq('question_origin', 'official')
    .lt('year', MIN_OFFICIAL_YEAR)
    .neq('bank_status', 'disabled')
    .select('id');
  if (e1) return NextResponse.json({ error: e1.message }, { status: 500 });

  // Oficiais sem ano → disabled (não confiamos)
  const { data: noYearOfficials, error: e1b } = await admin
    .from('questions')
    .update({
      bank_status: 'disabled',
      quality_notes: 'Desativada: oficial sem ano',
    })
    .eq('question_origin', 'official')
    .is('year', null)
    .neq('bank_status', 'disabled')
    .select('id');
  if (e1b) return NextResponse.json({ error: e1b.message }, { status: 500 });

  // 2) Reativa oficiais 2024+ (caso tenham sido desativadas por engano)
  const { data: keptOfficials, error: e2 } = await admin
    .from('questions')
    .update({
      bank_status: 'approved',
      quality_label: 'aprovada',
      quality_notes: `Oficial ${MIN_OFFICIAL_YEAR}+ mantida no banco ativo`,
    })
    .eq('question_origin', 'official')
    .gte('year', MIN_OFFICIAL_YEAR)
    .in('bank_status', ['disabled', 'draft', 'pending_review', 'approved'])
    .select('id');
  if (e2) return NextResponse.json({ error: e2.message }, { status: 500 });

  // 3) Desativa não-lote e não-oficial-2024+
  let disabledOther = 0;
  const pageSize = 500;
  for (let page = 0; page < 50; page++) {
    const from = page * pageSize;
    const to = from + pageSize - 1;
    const { data: rows, error } = await admin
      .from('questions')
      .select('id, lote_importacao, bank_status, question_origin, year')
      .neq('bank_status', 'disabled')
      .neq('bank_status', 'annulled')
      .range(from, to);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!rows?.length) break;

    const toDisable = rows
      .filter((q) => {
        if (isMedRankLote(q.lote_importacao)) return false;
        if (
          q.question_origin === 'official' &&
          typeof q.year === 'number' &&
          q.year >= MIN_OFFICIAL_YEAR
        ) {
          return false;
        }
        return true;
      })
      .map((q) => q.id);

    for (let i = 0; i < toDisable.length; i += 100) {
      const chunk = toDisable.slice(i, i + 100);
      const { error: uErr } = await admin
        .from('questions')
        .update({
          bank_status: 'disabled',
          quality_notes: 'Desativada: fora dos lotes MedRank / oficiais 2024+',
        })
        .in('id', chunk);
      if (uErr) return NextResponse.json({ error: uErr.message }, { status: 500 });
      disabledOther += chunk.length;
    }

    if (rows.length < pageSize) break;
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

  const { count: approvedOfficialRecent } = await admin
    .from('questions')
    .select('*', { count: 'exact', head: true })
    .eq('bank_status', 'approved')
    .eq('question_origin', 'official')
    .gte('year', MIN_OFFICIAL_YEAR);

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

  const disabledOldOfficials = (oldOfficials?.length ?? 0) + (noYearOfficials?.length ?? 0);

  return NextResponse.json({
    ok: true,
    disabledOldOfficials,
    reapprovedOfficial2024plus: keptOfficials?.length ?? 0,
    disabledOther,
    approvedFromLots: approvedLots ?? 0,
    approvedOfficialRecent: approvedOfficialRecent ?? 0,
    draftFromLots: draftLots ?? 0,
    message: `Ativo: ${approvedLots ?? 0} dos lotes + ${approvedOfficialRecent ?? 0} oficiais ${MIN_OFFICIAL_YEAR}+. Desativei ${disabledOldOfficials} oficiais antigas e ${disabledOther} outras. Rascunho nos lotes: ${draftLots ?? 0}.`,
  });
}
