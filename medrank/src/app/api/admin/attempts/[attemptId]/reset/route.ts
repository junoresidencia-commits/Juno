import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * Apaga a tentativa (e violações/respostas) para liberar nova chance.
 * Uso: bug técnico / falso antifraude — não para trapaça confirmada.
 */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const { attemptId } = await params;
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role indisponível' }, { status: 503 });

  const { data: attempt, error: findErr } = await admin
    .from('attempts')
    .select('id, exam_id, user_id, exams(date_available)')
    .eq('id', attemptId)
    .maybeSingle();

  if (findErr || !attempt) {
    return NextResponse.json(
      { error: findErr?.message || 'Tentativa não encontrada' },
      { status: 404 }
    );
  }

  await admin.from('attempt_answers').delete().eq('attempt_id', attemptId);

  const { error: violErr } = await admin
    .from('attempt_violations')
    .delete()
    .eq('attempt_id', attemptId);
  // Instalações antigas podem não ter a tabela — ignora.
  if (violErr && !/does not exist|relation/i.test(violErr.message)) {
    // segue mesmo assim; o delete da tentativa é o essencial
  }

  const { error: delErr } = await admin.from('attempts').delete().eq('id', attemptId);
  if (delErr) return NextResponse.json({ error: delErr.message }, { status: 500 });

  const examMeta = attempt.exams as unknown as
    | { date_available?: string }
    | { date_available?: string }[]
    | null;
  const date =
    (Array.isArray(examMeta) ? examMeta[0]?.date_available : examMeta?.date_available) || null;

  if (date) {
    await admin.rpc('recalculate_rankings_for_date', { p_date: date }).then(
      () => undefined,
      () => undefined
    );
    await admin.rpc('recalculate_group_rankings_for_date', { p_date: date }).then(
      () => undefined,
      () => undefined
    );
  }

  return NextResponse.json({
    ok: true,
    exam_id: attempt.exam_id,
    user_id: attempt.user_id,
    message: 'Tentativa removida — o aluno pode iniciar de novo esta disputa.',
  });
}
