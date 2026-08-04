import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Apaga disputa diária e dependências para permitir regenerar com IA.
 * Uso admin com force=true — não use no cron automático.
 */
export async function deleteDailyExamForRegen(
  admin: SupabaseClient,
  examId: string
): Promise<{ ok: boolean; error?: string }> {
  const { data: attemptIds, error: attErr } = await admin
    .from('attempts')
    .select('id')
    .eq('exam_id', examId);

  if (attErr) return { ok: false, error: attErr.message };

  const ids = (attemptIds ?? []).map((a) => a.id);
  if (ids.length > 0) {
    await admin.from('attempt_answers').delete().in('attempt_id', ids);
    await admin.from('attempt_violations').delete().in('attempt_id', ids);
    const { error: delAtt } = await admin.from('attempts').delete().eq('exam_id', examId);
    if (delAtt) return { ok: false, error: delAtt.message };
  }

  await admin.from('exam_question_reviews').delete().eq('exam_id', examId);
  // Tabela pode não existir em DBs que pularam a migration 025
  const { error: overrideErr } = await admin
    .from('exam_question_overrides')
    .delete()
    .eq('exam_id', examId);
  if (
    overrideErr &&
    !/exam_question_overrides|does not exist|42P01/i.test(overrideErr.message)
  ) {
    return { ok: false, error: overrideErr.message };
  }
  await admin.from('exam_questions').delete().eq('exam_id', examId);

  const { error: delExam } = await admin.from('exams').delete().eq('id', examId);
  if (delExam) return { ok: false, error: delExam.message };

  return { ok: true };
}
