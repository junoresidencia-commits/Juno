import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { usesDemoStore } from '@/lib/demo-data';
import {
  type ApplyRemediationInput,
  type RemediationAction,
  validateRemediationInput,
} from '@/lib/exams/remediation';
import type { OptionLetter } from '@/types/database';

export async function POST(request: Request) {
  const session = await getSessionProfile();
  if (!session || session.profile.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  if (usesDemoStore()) {
    return NextResponse.json(
      {
        error:
          'Remediação com recálculo de ranking exige banco de produção (Supabase). No modo demo não há tentativas reais para rescore.',
      },
      { status: 501 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as Partial<ApplyRemediationInput>;
  const input: ApplyRemediationInput = {
    examId: String(body.examId ?? ''),
    questionId: String(body.questionId ?? ''),
    action: body.action as RemediationAction,
    reason: String(body.reason ?? ''),
    newCorrectOption: (body.newCorrectOption as OptionLetter | undefined) ?? null,
    bankWide: Boolean(body.bankWide),
    notifyUsers: body.notifyUsers !== false,
  };

  const invalid = validateRemediationInput(input);
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 });
  }

  // JWT do admin para is_admin()/auth.uid() na RPC
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('apply_question_remediation', {
    p_exam_id: input.examId,
    p_question_id: input.questionId,
    p_action: input.action,
    p_reason: input.reason.trim(),
    p_new_correct_option: input.action === 'change_gabarito' ? input.newCorrectOption : null,
    p_bank_wide: Boolean(input.bankWide),
    p_notify_users: input.notifyUsers !== false,
  });

  if (error) {
    const msg = error.message || 'Falha na remediação';
    if (/apply_question_remediation|schema cache|function/i.test(msg)) {
      return NextResponse.json(
        {
          error:
            'Migration 025_question_remediation ainda não aplicada no Supabase. Rode o SQL e tente de novo.',
          detail: msg,
        },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  return NextResponse.json({ ok: true, result: data });
}

export async function GET(request: Request) {
  const session = await getSessionProfile();
  if (!session || session.profile.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const examId = new URL(request.url).searchParams.get('examId');
  if (!examId) {
    return NextResponse.json({ error: 'examId obrigatório' }, { status: 400 });
  }

  if (usesDemoStore()) {
    return NextResponse.json({ remediations: [] });
  }

  const admin = createAdminClient();
  const client = admin ?? (await createClient());

  const { data, error } = await client
    .from('question_remediations')
    .select('*')
    .eq('exam_id', examId)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    if (/question_remediations|schema cache/i.test(error.message)) {
      return NextResponse.json({ remediations: [], pendingMigration: true });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ remediations: data ?? [] });
}
