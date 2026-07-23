import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import { auditQuestionBank } from '@/lib/question-bank/audit';
import { getDemoQuestions } from '@/lib/demo/content';
import type { Question } from '@/types/database';

export async function GET(request: Request) {
  const session = await getSessionProfile();
  if (!session || session.profile.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const url = new URL(request.url);
  const limit = Math.min(5000, Math.max(100, Number(url.searchParams.get('limit') || 2000)));
  const onlyErrors = url.searchParams.get('errorsOnly') === '1';

  let questions: Question[] = [];

  if (usesDemoStore()) {
    questions = getDemoQuestions().slice(0, limit);
  } else {
    const admin = createAdminClient();
    if (!admin) {
      return NextResponse.json({ error: 'Service role indisponível' }, { status: 500 });
    }
    const { data, error } = await admin
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    questions = (data ?? []) as Question[];
  }

  const report = auditQuestionBank(questions);
  const rows = onlyErrors
    ? report.rows.filter((r) => r.issues.some((i) => i.severity === 'error'))
    : report.rows;

  return NextResponse.json({
    scanned: report.scanned,
    flagged: rows.length,
    errors: report.errors,
    warnings: report.warnings,
    note:
      'Auditoria automática de formulação (tamanho, gabarito, balanceamento, templates fracos). Não substitui revisão clínica humana do gabarito.',
    rows: rows.slice(0, 500),
  });
}
