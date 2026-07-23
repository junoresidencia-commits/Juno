import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { usesDemoStore } from '@/lib/demo-data';
import { getSessionProfile } from '@/lib/auth';
import { createDemoAttempt, getDemoAttemptAnswers, getDemoAttemptByExam } from '@/lib/demo/runtime';
import { getDemoExams } from '@/lib/demo/content';
import { canStartExam } from '@/lib/exams/release';
import type { OptionLetter } from '@/types/database';

function mapSavedAnswers(attemptId: string): Record<string, OptionLetter> {
  const initial: Record<string, OptionLetter> = {};
  for (const row of getDemoAttemptAnswers(attemptId)) {
    if (row.selected_option) initial[row.question_id] = row.selected_option;
  }
  return initial;
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ examId: string }> }
) {
  const { examId } = await params;
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  const { userId } = session;

  if (usesDemoStore()) {
    const exam = getDemoExams().find((item) => item.id === examId);
    if (!exam || !canStartExam(exam)) {
      return NextResponse.json({ error: 'Disputa não disponível neste horário (7h–23h59)' }, { status: 404 });
    }

    const existing = getDemoAttemptByExam(examId, userId);
    if (existing?.finished_at) {
      return NextResponse.json(
        { error: 'Prova já finalizada', attemptId: existing.id },
        { status: 400 }
      );
    }

    if (existing && !existing.finished_at) {
      const { forfeitDemoAttempt } = await import('@/lib/demo/runtime');
      const forfeited = forfeitDemoAttempt(existing.id, { violationType: 'abandoned_session' });
      return NextResponse.json(
        { error: 'Prova encerrada por abandono (antifraude).', attemptId: existing.id, forfeited: true, attempt: forfeited },
        { status: 400 }
      );
    }

    const attempt = createDemoAttempt(examId, userId);
    return NextResponse.json({ attempt, initialAnswers: {}, resumed: false });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { data: exam } = await supabase
    .from('exams')
    .select('*')
    .eq('id', examId)
    .eq('status', 'published')
    .single();

  if (!exam || !canStartExam(exam)) {
    return NextResponse.json({ error: 'Prova não disponível' }, { status: 404 });
  }

  const qualityStatus = (exam as { quality_status?: string }).quality_status;
  if (qualityStatus === 'blocked' || qualityStatus === 'pending') {
    return NextResponse.json(
      {
        error:
          qualityStatus === 'pending'
            ? 'Disputa ainda em revisão pela IA. Aguarde a publicação automática.'
            : 'Disputa não publicada: a revisão IA reprovou questões. O administrador foi avisado.',
        quality_status: qualityStatus,
        quality_summary: (exam as { quality_summary?: string }).quality_summary,
      },
      { status: 423 }
    );
  }

  // Só pode iniciar a disputa da própria trilha (geral vs Liga de Nefrologia)
  const { resolveUserExamAudience } = await import('@/lib/exams/audience');
  const ctx = await resolveUserExamAudience(user.id);
  const examAudience = (exam as { audience?: string }).audience ?? 'general';
  if (examAudience !== ctx.audience) {
    return NextResponse.json(
      {
        error:
          examAudience === 'nephrology'
            ? 'Esta disputa é exclusiva da Liga de Nefrologia.'
            : 'Esta é a disputa geral — sua liga tem outra prova hoje.',
      },
      { status: 403 }
    );
  }

  const { data: existing } = await supabase
    .from('attempts')
    .select('*')
    .eq('exam_id', examId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (existing?.finished_at) {
    return NextResponse.json(
      { error: 'Prova já finalizada', attemptId: existing.id },
      { status: 400 }
    );
  }

  if (existing && !existing.finished_at) {
    // Tolerância zero: tentativa aberta = abandono → forfeit
    const { createAdminClient } = await import('@/lib/supabase/admin');
    const admin = createAdminClient();
    await (admin ?? supabase).rpc('forfeit_attempt', {
      p_attempt_id: existing.id,
      p_violation_type: 'abandoned_session',
      p_question_id: null,
      p_elapsed_seconds: null,
      p_ip: null,
      p_device: null,
      p_browser: null,
      p_os: null,
      p_user_agent: null,
      p_metadata: {},
    });
    return NextResponse.json(
      {
        error: 'Prova encerrada por abandono da sessão (antifraude).',
        attemptId: existing.id,
        forfeited: true,
      },
      { status: 400 }
    );
  }

  const { data: attempt, error } = await supabase
    .from('attempts')
    .insert({
      exam_id: examId,
      user_id: user.id,
      total_questions: exam.total_questions,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ attempt, initialAnswers: {}, resumed: false });
}
