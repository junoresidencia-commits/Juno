import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import type { OptionLetter, Question } from '@/types/database';
import type { QualityLabel } from '@/lib/question-bank/quality-classify';
import { QUALITY_LABELS } from '@/lib/question-bank/quality-classify';

const LABELS = new Set(QUALITY_LABELS.map((l) => l.value));

type Body = {
  questionId?: string;
  action?:
    | 'approve'
    | 'suspend'
    | 'exclude'
    | 'restore'
    | 'fix_gabarito'
    | 'annul_official'
    | 'set_label'
    | 'edit';
  reason?: string;
  quality_label?: QualityLabel;
  correct_option?: OptionLetter;
  statement?: string;
  option_a?: string;
  option_b?: string;
  option_c?: string;
  option_d?: string;
  option_e?: string;
  explanation?: string;
  specialty?: string;
  topic?: string;
  difficulty?: string;
  /** Se true e houver provas com a questão, aplica remediação change_gabarito / zero_score. */
  rescoreExams?: boolean;
};

async function logAction(
  admin: NonNullable<ReturnType<typeof createAdminClient>>,
  row: {
    question_id: string;
    action: string;
    old_bank_status?: string | null;
    new_bank_status?: string | null;
    old_quality_label?: string | null;
    new_quality_label?: string | null;
    old_correct_option?: string | null;
    new_correct_option?: string | null;
    reason: string;
    admin_id: string | null;
    meta?: Record<string, unknown>;
  }
) {
  await admin.from('question_bank_audit_log').insert({
    ...row,
    meta: row.meta ?? {},
  });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  if (usesDemoStore() || auth.demo) {
    return NextResponse.json({ error: 'Indisponível no demo' }, { status: 501 });
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });

  const body = (await request.json().catch(() => null)) as Body | null;
  if (!body?.questionId || !body.action) {
    return NextResponse.json({ error: 'questionId e action obrigatórios' }, { status: 400 });
  }
  const reason = String(body.reason || '').trim();
  if (reason.length < 8 && body.action !== 'approve') {
    return NextResponse.json({ error: 'Informe o motivo (mín. 8 caracteres)' }, { status: 400 });
  }

  const { data: current, error: loadErr } = await admin
    .from('questions')
    .select('*')
    .eq('id', body.questionId)
    .maybeSingle();

  if (loadErr || !current) {
    return NextResponse.json({ error: loadErr?.message || 'Questão não encontrada' }, { status: 404 });
  }

  const userId =
    'supabase' in auth && auth.supabase
      ? (await auth.supabase.auth.getUser()).data.user?.id ?? null
      : null;

  const q = current as Question;
  let patch: Record<string, unknown> = {};
  let action = body.action;

  switch (body.action) {
    case 'approve':
      patch = {
        bank_status: 'approved',
        quality_label: 'aprovada',
        quality_notes: reason || 'Aprovada na auditoria',
        quality_reviewed_at: new Date().toISOString(),
        quality_reviewed_by: userId,
      };
      break;
    case 'suspend':
      patch = {
        bank_status: 'disabled',
        quality_label: body.quality_label && LABELS.has(body.quality_label)
          ? body.quality_label
          : q.quality_label || 'precisa_de_correcao',
        quality_notes: reason,
        quality_reviewed_at: new Date().toISOString(),
        quality_reviewed_by: userId,
      };
      break;
    case 'exclude':
      patch = {
        bank_status: 'disabled',
        quality_label: 'deve_ser_excluida',
        quality_notes: reason,
        quality_reviewed_at: new Date().toISOString(),
        quality_reviewed_by: userId,
      };
      break;
    case 'restore':
      patch = {
        bank_status: 'approved',
        quality_label: 'aprovada',
        quality_notes: reason || 'Restaurada para o banco ativo',
        quality_reviewed_at: new Date().toISOString(),
        quality_reviewed_by: userId,
      };
      break;
    case 'annul_official':
      patch = {
        bank_status: 'annulled',
        quality_label: 'anulada',
        quality_notes: reason || 'Anulada oficialmente — sem gabarito próprio',
        quality_reviewed_at: new Date().toISOString(),
        quality_reviewed_by: userId,
      };
      break;
    case 'set_label':
      if (!body.quality_label || !LABELS.has(body.quality_label)) {
        return NextResponse.json({ error: 'quality_label inválido' }, { status: 400 });
      }
      patch = {
        quality_label: body.quality_label,
        quality_notes: reason,
        quality_reviewed_at: new Date().toISOString(),
        quality_reviewed_by: userId,
        bank_status:
          body.quality_label === 'aprovada'
            ? 'approved'
            : body.quality_label === 'anulada'
              ? 'annulled'
              : body.quality_label === 'deve_ser_excluida'
                ? 'disabled'
                : q.bank_status,
      };
      break;
    case 'fix_gabarito': {
      const next = String(body.correct_option || '').toUpperCase() as OptionLetter;
      if (!['A', 'B', 'C', 'D', 'E'].includes(next)) {
        return NextResponse.json({ error: 'correct_option A–E obrigatório' }, { status: 400 });
      }
      if (q.question_origin === 'official' && q.official_answer && q.official_answer !== next) {
        return NextResponse.json(
          {
            error:
              'Questão oficial: não altere o gabarito sem base na banca. Se foi anulada, use annul_official.',
          },
          { status: 400 }
        );
      }
      patch = {
        correct_option: next,
        official_answer: next,
        quality_notes: reason,
        quality_reviewed_at: new Date().toISOString(),
        quality_reviewed_by: userId,
      };
      break;
    }
    case 'edit':
      patch = {
        ...(body.statement != null ? { statement: body.statement } : {}),
        ...(body.option_a != null ? { option_a: body.option_a } : {}),
        ...(body.option_b != null ? { option_b: body.option_b } : {}),
        ...(body.option_c != null ? { option_c: body.option_c } : {}),
        ...(body.option_d != null ? { option_d: body.option_d } : {}),
        ...(body.option_e != null ? { option_e: body.option_e } : {}),
        ...(body.explanation != null ? { explanation: body.explanation } : {}),
        ...(body.specialty != null ? { specialty: body.specialty } : {}),
        ...(body.topic != null ? { topic: body.topic } : {}),
        ...(body.difficulty != null ? { difficulty: body.difficulty } : {}),
        quality_notes: reason || q.quality_notes,
        quality_reviewed_at: new Date().toISOString(),
        quality_reviewed_by: userId,
      };
      if (q.question_origin === 'official' && body.statement != null && body.statement !== q.statement) {
        return NextResponse.json(
          { error: 'Não reescreva enunciado de prova oficial. Importe novamente se necessário.' },
          { status: 400 }
        );
      }
      break;
    default:
      return NextResponse.json({ error: 'action desconhecida' }, { status: 400 });
  }

  const { data: updated, error } = await admin
    .from('questions')
    .update(patch)
    .eq('id', body.questionId)
    .select('*')
    .single();

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
        hint: error.message.includes('quality_label')
          ? 'Aplique migration 032_question_quality_audit.sql'
          : undefined,
      },
      { status: 500 }
    );
  }

  await logAction(admin, {
    question_id: body.questionId,
    action,
    old_bank_status: q.bank_status,
    new_bank_status: (updated as Question).bank_status,
    old_quality_label: q.quality_label,
    new_quality_label: (updated as Question).quality_label,
    old_correct_option: q.correct_option,
    new_correct_option: (updated as Question).correct_option,
    reason: reason || 'Aprovada',
    admin_id: userId,
  });

  // Rescore opcional em provas que usam a questão
  let remediations = 0;
  if (body.rescoreExams && (body.action === 'fix_gabarito' || body.action === 'exclude' || body.action === 'annul_official')) {
    const { data: eqs } = await admin
      .from('exam_questions')
      .select('exam_id')
      .eq('question_id', body.questionId)
      .limit(50);
    const examIds = [...new Set((eqs ?? []).map((e) => e.exam_id))];
    for (const examId of examIds) {
      const rpcAction =
        body.action === 'fix_gabarito'
          ? 'change_gabarito'
          : body.action === 'annul_official'
            ? 'annul'
            : 'zero_score';
      const { error: rpcErr } = await admin.rpc('apply_question_remediation', {
        p_exam_id: examId,
        p_question_id: body.questionId,
        p_action: rpcAction,
        p_reason: reason || 'Auditoria do banco',
        p_new_correct_option:
          rpcAction === 'change_gabarito' ? (updated as Question).correct_option : null,
        p_bank_wide: false,
        p_notify_users: true,
      });
      if (!rpcErr) remediations += 1;
    }
  }

  return NextResponse.json({
    ok: true,
    question: updated,
    remediations,
    message:
      remediations > 0
        ? `Salvo. Remediação aplicada em ${remediations} prova(s).`
        : 'Salvo no banco. Se já pontuou em provas, use Remediação ou rescoreExams=true.',
  });
}

export async function GET(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  if (usesDemoStore()) return NextResponse.json({ log: [] });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });

  const url = new URL(request.url);
  const questionId = url.searchParams.get('questionId');
  let q = admin
    .from('question_bank_audit_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);
  if (questionId) q = q.eq('question_id', questionId);

  const { data, error } = await q;
  if (error) {
    return NextResponse.json(
      { error: error.message, hint: 'Aplique migration 032' },
      { status: 500 }
    );
  }
  return NextResponse.json({ log: data ?? [] });
}
