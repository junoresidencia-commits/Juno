import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import { deleteDailyExamForRegen } from '@/lib/exams/delete-daily';
import { ensureBothDailyExams } from '@/lib/exams/ensure-daily';
import { todayDateStringBrazil } from '@/lib/exams/window';

export const maxDuration = 120;

/**
 * Apaga disputas diárias a partir de hoje e regenera com o banco atual (grátis).
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
      { error: 'Envie { confirm: true } para apagar e regenerar.' },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });

  const today = todayDateStringBrazil();

  // Todas as disputas diárias de hoje em diante (inclui horizonte antigo de meses)
  const { data: exams, error } = await admin
    .from('exams')
    .select('id, title, date_available, exam_kind')
    .eq('exam_kind', 'daily')
    .gte('date_available', today)
    .order('date_available', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let deleted = 0;
  const failures: string[] = [];

  for (const exam of exams ?? []) {
    const wiped = await deleteDailyExamForRegen(admin, exam.id);
    if (wiped.ok) deleted += 1;
    else failures.push(`${exam.date_available}: ${wiped.error || 'falha'}`);
  }

  const regenerated = await ensureBothDailyExams(today, { force: true, mode: 'bank' });

  return NextResponse.json({
    ok: failures.length === 0,
    today,
    deleted,
    failures,
    general: regenerated.general,
    nephrology: regenerated.nephrology,
    message:
      failures.length === 0
        ? `Apaguei ${deleted} disputa(s) de ${today} em diante e regeneri as de hoje com o banco atual.`
        : `Apaguei ${deleted}; ${failures.length} falha(s). Veja failures.`,
  });
}
