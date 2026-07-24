import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import { auditQuestionBank } from '@/lib/question-bank/audit';
import { classifyQuestionQuality, isOfficialQuestion } from '@/lib/question-bank/quality-classify';
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
  const status = url.searchParams.get('bankStatus'); // approved|disabled|all
  const origin = url.searchParams.get('origin'); // official|synthetic|all

  let questions: Question[] = [];

  if (usesDemoStore()) {
    questions = getDemoQuestions().slice(0, limit);
  } else {
    const admin = createAdminClient();
    if (!admin) {
      return NextResponse.json({ error: 'Service role indisponível' }, { status: 500 });
    }
    let q = admin.from('questions').select('*').order('created_at', { ascending: false }).limit(limit);
    if (status && status !== 'all') q = q.eq('bank_status', status);
    const { data, error } = await q;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    questions = (data ?? []) as Question[];
  }

  if (origin === 'official') {
    questions = questions.filter((x) => isOfficialQuestion(x));
  } else if (origin === 'synthetic') {
    questions = questions.filter((x) => !isOfficialQuestion(x));
  }

  const report = auditQuestionBank(questions);
  const labelCounts: Record<string, number> = {};
  let officialCount = 0;
  let suspendedCount = 0;

  const enriched = report.rows.map((row) => {
    const full = questions.find((q) => q.id === row.id)!;
    const classified = classifyQuestionQuality(full);
    labelCounts[full.quality_label || classified.quality_label] =
      (labelCounts[full.quality_label || classified.quality_label] || 0) + 1;
    if (isOfficialQuestion(full)) officialCount += 1;
    if (full.bank_status === 'disabled' || full.bank_status === 'annulled') suspendedCount += 1;
    return {
      ...row,
      bank_status: full.bank_status ?? 'approved',
      question_origin: full.question_origin ?? null,
      quality_label: full.quality_label ?? classified.quality_label,
      quality_notes: full.quality_notes ?? classified.notes,
      suggested_label: classified.quality_label,
      suggested_suspend: classified.suspend,
      institution: full.institution ?? full.source,
      year: full.year,
    };
  });

  const rows = onlyErrors
    ? enriched.filter((r) => r.issues.some((i) => i.severity === 'error') || r.suggested_suspend)
    : enriched;

  return NextResponse.json({
    scanned: report.scanned,
    flagged: rows.length,
    errors: report.errors,
    warnings: report.warnings,
    officialCount,
    suspendedCount,
    labelCounts,
    note:
      'Prioridade: provas oficiais. Sintéticas fáceis devem ficar suspensas (disabled) até revisão.',
    rows: rows.slice(0, 500),
  });
}
