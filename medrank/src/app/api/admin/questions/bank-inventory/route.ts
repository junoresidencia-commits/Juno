import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { isDemoMode } from '@/lib/demo-auth';
import { repairAuthorialTrackTags } from '@/lib/question-bank/publish-authorial-batch';

/** Contagens reais do banco — para o admin ver o volume e diagnosticar “insuficiente”. */
export async function GET() {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  if (isDemoMode() || auth.demo) {
    return NextResponse.json({
      totalApproved: 0,
      lotsApproved: 0,
      nefroLots: 0,
      nefroAdultTagged: 0,
      nefroPedTagged: 0,
      residenciaTagged: 0,
      official2024plus: 0,
      draftLots: 0,
      note: 'Demo mode',
    });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });
  }

  const LOT_OR =
    'lote_importacao.like.MEDRANK_AUTORAL_2026_LOTE_%,lote_importacao.like.MEDRANK_NEFRO_NEFROPED_2026_LOTE_%,lote_importacao.like.MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_%';

  const [
    totalApproved,
    lotsApproved,
    nefroLots,
    nefroAdultTagged,
    nefroPedTagged,
    residenciaTagged,
    official2024plus,
    draftLots,
    nefroBySpecialty,
  ] = await Promise.all([
    admin.from('questions').select('*', { count: 'exact', head: true }).eq('bank_status', 'approved'),
    admin.from('questions').select('*', { count: 'exact', head: true }).eq('bank_status', 'approved').or(LOT_OR),
    admin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('bank_status', 'approved')
      .like('lote_importacao', 'MEDRANK_NEFRO_NEFROPED_2026_LOTE_%'),
    admin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('bank_status', 'approved')
      .contains('tags', ['nefrologia-avancada']),
    admin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('bank_status', 'approved')
      .contains('tags', ['nefropediatria']),
    admin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('bank_status', 'approved')
      .contains('tags', ['residencia-expert']),
    admin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('bank_status', 'approved')
      .eq('question_origin', 'official')
      .gte('year', 2024),
    admin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .in('bank_status', ['draft', 'pending_review'])
      .or(LOT_OR),
    admin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('bank_status', 'approved')
      .or('specialty.ilike.Nefrologia,specialty.ilike.Nefropediatria,area.ilike.Nefrologia,area.ilike.Nefropediatria'),
  ]);

  return NextResponse.json({
    totalApproved: totalApproved.count ?? 0,
    lotsApproved: lotsApproved.count ?? 0,
    nefroLots: nefroLots.count ?? 0,
    nefroAdultTagged: nefroAdultTagged.count ?? 0,
    nefroPedTagged: nefroPedTagged.count ?? 0,
    nefroBySpecialty: nefroBySpecialty.count ?? 0,
    residenciaTagged: residenciaTagged.count ?? 0,
    official2024plus: official2024plus.count ?? 0,
    draftLots: draftLots.count ?? 0,
    canBuildNefro:
      (nefroAdultTagged.count ?? 0) >= 10 ||
      (nefroPedTagged.count ?? 0) >= 10 ||
      (nefroLots.count ?? 0) >= 20 ||
      (nefroBySpecialty.count ?? 0) >= 20,
    hint:
      (nefroAdultTagged.count ?? 0) + (nefroPedTagged.count ?? 0) === 0 &&
      (nefroLots.count ?? 0) > 0
        ? 'Há lotes Nefro publicados, mas sem tags de trilha. Clique em Corrigir tags dos lotes.'
        : null,
  });
}

/** Reetiqueta lotes publicados (corrige tags apagadas no publish antigo). */
export async function POST() {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  if (isDemoMode() || auth.demo) {
    return NextResponse.json({ updated: 0, message: 'Demo mode' });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });
  }

  const result = await repairAuthorialTrackTags(admin);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({
    ok: true,
    updated: result.updated,
    message: `Tags de trilha corrigidas em ${result.updated} questões. Agora regenere as provas.`,
  });
}
