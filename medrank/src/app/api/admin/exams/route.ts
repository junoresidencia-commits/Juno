import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { addDays, defaultExamReleaseFields } from '@/lib/exams/release';

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const supabase = createAdminClient() ?? (auth.demo ? null : auth.supabase);
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase não configurado (service role necessária para criar prova).' },
      { status: 503 }
    );
  }

  const body = await request.json();
  const mode = body.selection_mode ?? 'auto';
  const totalQuestions = Number(body.total_questions);
  const sourceFilter = body.source_filter || null;
  const topicFilter = body.topic_filter || null;
  const manualIds: string[] = body.question_ids ?? [];
  const dateAvailable = String(body.date_available || '').slice(0, 10);
  const releaseDays = Number(body.release_days) === 2 ? 2 : 1;

  if (!dateAvailable) {
    return NextResponse.json({ error: 'Informe a data da prova (date_available).' }, { status: 400 });
  }

  let selected: { id: string }[] = [];

  const STYLE_FILTERS = new Set([
    'USP',
    'USP-RP',
    'UNIFESP',
    'UNICAMP',
    'SUS-SP',
    'PSU-MG',
    'AMP',
    'SES-PE',
    'HCPA',
    'UFRGS',
    'UFMG',
    'UFPR',
    'SBN',
    'SBNPed',
  ]);

  if (mode === 'manual') {
    if (manualIds.length !== totalQuestions) {
      return NextResponse.json(
        {
          error: `Selecione exatamente ${totalQuestions} questões. Selecionadas: ${manualIds.length}`,
        },
        { status: 400 }
      );
    }
    selected = manualIds.map((id) => ({ id }));
  } else {
    let query = supabase.from('questions').select('id');
    if (sourceFilter) {
      if (STYLE_FILTERS.has(sourceFilter)) {
        query = query.contains('tags', [`estilo-${sourceFilter}`]);
      } else {
        query = query.eq('source', sourceFilter);
      }
    }
    if (topicFilter) query = query.eq('topic', topicFilter);

    const { data: allQuestions, error: qError } = await query;

    if (qError) {
      return NextResponse.json({ error: qError.message }, { status: 500 });
    }

    if (!allQuestions || allQuestions.length < totalQuestions) {
      return NextResponse.json(
        {
          error: `Questões insuficientes. Disponíveis: ${allQuestions?.length ?? 0}, necessárias: ${totalQuestions}`,
        },
        { status: 400 }
      );
    }

    selected = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, totalQuestions);
  }

  const release = defaultExamReleaseFields(dateAvailable);
  if (releaseDays === 2) {
    release.release_days = 2;
    release.date_closes = addDays(dateAvailable, 1);
  }

  const { data: exam, error: examError } = await supabase
    .from('exams')
    .insert({
      title: body.title,
      date_available: dateAvailable,
      duration_minutes: Number(body.duration_minutes) || 30,
      total_questions: totalQuestions,
      show_answers_after_submit: Boolean(body.show_answers_after_submit),
      show_answers_when_all_done: Boolean(body.show_answers_when_all_done),
      selection_mode: mode,
      status: body.publish ? 'published' : 'draft',
      date_closes: release.date_closes,
      release_days: release.release_days,
      ranking_visible_to_students: release.ranking_visible_to_students,
      ranking_release: release.ranking_release,
      window_start_hour: Number(body.window_start_hour) || 8,
      window_end_hour: Number(body.window_end_hour) || 21,
    })
    .select()
    .single();

  if (examError) {
    return NextResponse.json({ error: examError.message }, { status: 500 });
  }

  const examQuestions = selected.map((q, i) => ({
    exam_id: exam.id,
    question_id: q.id,
    order_number: i + 1,
  }));

  const { error: eqError } = await supabase.from('exam_questions').insert(examQuestions);

  if (eqError) {
    await supabase.from('exams').delete().eq('id', exam.id);
    return NextResponse.json({ error: eqError.message }, { status: 500 });
  }

  return NextResponse.json({ exam });
}
