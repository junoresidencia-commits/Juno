import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { parseImportRow } from '@/lib/utils';
import { usesDemoStore } from '@/lib/demo-data';
import { appendDemoImportedQuestions } from '@/lib/demo-store';
import { invalidateQuestionBankCache } from '@/lib/question-bank/pool';
import { statementFingerprint } from '@/lib/question-bank/provenance';
import { requireAdminApi } from '@/lib/api-auth';
import type { ImportQuestionRow } from '@/types/database';

/**
 * Importação CSV/Excel.
 * Por padrão: pending_review (revisão obrigatória).
 * auto_approve=true: publica direto (legado / seed manual).
 */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const formData = await request.formData();
  const file = formData.get('file') as File;
  const autoApprove = formData.get('auto_approve') === 'true';

  if (!file) {
    return NextResponse.json({ error: 'Arquivo não enviado' }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<ImportQuestionRow>(sheet);

  const errors: string[] = [];
  const toInsert = [];

  for (let i = 0; i < rows.length; i++) {
    try {
      const parsed = parseImportRow(rows[i]);
      if (!parsed.statement) throw new Error('Enunciado vazio');
      toInsert.push({
        ...parsed,
        bank_status: autoApprove ? 'approved' : 'pending_review',
        question_origin: 'original',
        statement_fingerprint: statementFingerprint(parsed.statement),
        reproduction_allowed: false,
      });
    } catch (err) {
      errors.push(`Linha ${i + 2}: ${err instanceof Error ? err.message : 'Erro'}`);
    }
  }

  if (toInsert.length === 0) {
    return NextResponse.json({ error: 'Nenhuma questão válida encontrada', errors }, { status: 400 });
  }

  if (usesDemoStore()) {
    const imported = appendDemoImportedQuestions(toInsert);
    invalidateQuestionBankCache();
    return NextResponse.json({ imported, errors, pending_review: !autoApprove });
  }

  if (auth.demo) {
    return NextResponse.json({ error: 'Supabase não configurado' }, { status: 503 });
  }

  const supabase = auth.supabase;

  const { error } = await supabase.from('questions').insert(toInsert);

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
        hint: error.message.includes('bank_status')
          ? 'Aplique a migration 031_question_bank_provenance.sql no Supabase'
          : undefined,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    imported: toInsert.length,
    errors,
    pending_review: !autoApprove,
    message: autoApprove
      ? `${toInsert.length} questões publicadas.`
      : `${toInsert.length} questões em revisão. Aprove em Admin → Questões → Revisão.`,
  });
}
