import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { defaultExamReleaseFields } from '@/lib/exams/release';
import {
  WEEKLY_EXPERT_AUDIENCE,
  WEEKLY_EXPERT_DURATION_MINUTES,
  WEEKLY_EXPERT_QUESTION_COUNT,
  WEEKLY_EXPERT_SCORE_MULTIPLIER,
  WEEKLY_EXPERT_WINDOW_END_HOUR,
  WEEKLY_EXPERT_WINDOW_START_HOUR,
  weeklyExpertLoteTag,
  weeklyExpertTitle,
} from '@/lib/exams/weekly-expert';
import type { OptionLetter } from '@/types/database';

type ExpertQuestionInput = {
  statement: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  correct_option: OptionLetter;
  explanation?: string | null;
  topic?: string | null;
};

function validateQuestions(raw: unknown): ExpertQuestionInput[] | string {
  if (!Array.isArray(raw) || raw.length !== WEEKLY_EXPERT_QUESTION_COUNT) {
    return `Envie exatamente ${WEEKLY_EXPERT_QUESTION_COUNT} questões.`;
  }
  const out: ExpertQuestionInput[] = [];
  for (let i = 0; i < raw.length; i++) {
    const q = raw[i] as Partial<ExpertQuestionInput>;
    const letters: OptionLetter[] = ['A', 'B', 'C', 'D', 'E'];
    if (
      !q.statement?.trim() ||
      !q.option_a?.trim() ||
      !q.option_b?.trim() ||
      !q.option_c?.trim() ||
      !q.option_d?.trim() ||
      !q.option_e?.trim() ||
      !letters.includes(q.correct_option as OptionLetter)
    ) {
      return `Questão ${i + 1}: preencha enunciado, A–E e gabarito.`;
    }
    out.push({
      statement: q.statement.trim(),
      option_a: q.option_a.trim(),
      option_b: q.option_b.trim(),
      option_c: q.option_c.trim(),
      option_d: q.option_d.trim(),
      option_e: q.option_e.trim(),
      correct_option: q.correct_option as OptionLetter,
      explanation: q.explanation?.trim() || null,
      topic: q.topic?.trim() || 'Caso clínico Expert',
    });
  }
  return out;
}

/** Lista o Desafio Expert da semana / data. */
export async function GET(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const supabase = createAdminClient() ?? (auth.demo ? null : auth.supabase);
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase não configurado' }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const date = (searchParams.get('date') || '').slice(0, 10);

  let query = supabase
    .from('exams')
    .select(
      'id, title, date_available, status, total_questions, duration_minutes, window_start_hour, score_multiplier, created_at'
    )
    .eq('exam_kind', 'weekly_expert')
    .order('date_available', { ascending: false })
    .limit(12);

  if (date) query = query.eq('date_available', date);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ exams: data ?? [] });
}

/**
 * Cria as 5 questões + prova weekly_expert.
 * publish=false → rascunho (você publica no dia, antes das 20h).
 */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const supabase = createAdminClient() ?? (auth.demo ? null : auth.supabase);
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase não configurado' }, { status: 503 });
  }

  const body = await request.json();
  const dateAvailable = String(body.date_available || '').slice(0, 10);
  const publish = Boolean(body.publish);
  const questions = validateQuestions(body.questions);

  if (!dateAvailable) {
    return NextResponse.json({ error: 'Informe a data (ex.: quarta-feira).' }, { status: 400 });
  }
  if (typeof questions === 'string') {
    return NextResponse.json({ error: questions }, { status: 400 });
  }

  const { data: existing } = await supabase
    .from('exams')
    .select('id, status')
    .eq('date_available', dateAvailable)
    .eq('audience', WEEKLY_EXPERT_AUDIENCE)
    .eq('exam_kind', 'weekly_expert')
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      {
        error: `Já existe Desafio Expert em ${dateAvailable} (${existing.status}). Apague ou use outra data.`,
        examId: existing.id,
      },
      { status: 409 }
    );
  }

  const lote = weeklyExpertLoteTag(dateAvailable);
  const insertedIds: string[] = [];

  for (const q of questions) {
    const { data: row, error } = await supabase
      .from('questions')
      .insert({
        statement: q.statement,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        option_e: q.option_e,
        correct_option: q.correct_option,
        explanation: q.explanation,
        source: 'MedRank Expert',
        specialty: 'Clínica Médica',
        topic: q.topic,
        difficulty: 'dificil',
        tags: ['desafio-expert', 'caso-clinico'],
        bank_status: 'approved',
        question_origin: 'original',
        question_kind: 'authorial_prediction',
        lote_importacao: lote,
        quality_label: 'aprovada',
      })
      .select('id')
      .single();

    if (error || !row) {
      if (insertedIds.length) {
        await supabase.from('questions').delete().in('id', insertedIds);
      }
      return NextResponse.json(
        { error: error?.message || 'Falha ao salvar questão' },
        { status: 500 }
      );
    }
    insertedIds.push(row.id);
  }

  const release = defaultExamReleaseFields(dateAvailable);

  const { data: exam, error: examError } = await supabase
    .from('exams')
    .insert({
      title: weeklyExpertTitle(dateAvailable),
      date_available: dateAvailable,
      date_closes: release.date_closes,
      release_days: release.release_days,
      duration_minutes: WEEKLY_EXPERT_DURATION_MINUTES,
      total_questions: WEEKLY_EXPERT_QUESTION_COUNT,
      show_answers_after_submit: true,
      show_answers_when_all_done: false,
      ranking_visible_to_students: true,
      ranking_release: release.ranking_release,
      selection_mode: 'manual',
      status: publish ? 'published' : 'draft',
      audience: WEEKLY_EXPERT_AUDIENCE,
      exam_kind: 'weekly_expert',
      score_multiplier: WEEKLY_EXPERT_SCORE_MULTIPLIER,
      window_start_hour: WEEKLY_EXPERT_WINDOW_START_HOUR,
      window_end_hour: WEEKLY_EXPERT_WINDOW_END_HOUR,
      quality_status: 'passed',
      quality_summary: 'Desafio Expert criado pelo professor — sem gate de IA.',
    })
    .select('id, title, date_available, status')
    .single();

  if (examError || !exam) {
    await supabase.from('questions').delete().in('id', insertedIds);
    return NextResponse.json(
      { error: examError?.message || 'Falha ao criar prova Expert' },
      { status: 500 }
    );
  }

  const { error: eqError } = await supabase.from('exam_questions').insert(
    insertedIds.map((qid, i) => ({
      exam_id: exam.id,
      question_id: qid,
      order_number: i + 1,
    }))
  );

  if (eqError) {
    await supabase.from('exams').delete().eq('id', exam.id);
    await supabase.from('questions').delete().in('id', insertedIds);
    return NextResponse.json({ error: eqError.message }, { status: 500 });
  }

  return NextResponse.json({
    exam,
    questionIds: insertedIds,
    message: publish
      ? `Publicado. Alunos podem começar a partir das ${WEEKLY_EXPERT_WINDOW_START_HOUR}h.`
      : 'Rascunho salvo. Publique no dia (antes das 20h) quando as questões estiverem prontas.',
  });
}

/** Publica (ou reabre) um Expert já criado. */
export async function PATCH(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const supabase = createAdminClient() ?? (auth.demo ? null : auth.supabase);
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase não configurado' }, { status: 503 });
  }

  const body = await request.json();
  const examId = String(body.examId || '');
  const status = body.status === 'draft' ? 'draft' : 'published';

  if (!examId) {
    return NextResponse.json({ error: 'examId obrigatório' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('exams')
    .update({ status })
    .eq('id', examId)
    .eq('exam_kind', 'weekly_expert')
    .select('id, title, date_available, status')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ exam: data });
}
