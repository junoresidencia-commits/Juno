import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { parseImportRow } from '@/lib/utils';
import { usesDemoStore } from '@/lib/demo-data';
import { appendDemoImportedQuestions } from '@/lib/demo-store';
import { invalidateQuestionBankCache } from '@/lib/question-bank/pool';
import { requireAdminApi } from '@/lib/api-auth';
import type { ImportQuestionRow } from '@/types/database';

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth && auth.error) return auth.error;

  const formData = await request.formData();
  const file = formData.get('file') as File;

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
      toInsert.push(parsed);
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
    return NextResponse.json({ imported, errors });
  }

  const supabase = auth.supabase;

  const { error } = await supabase.from('questions').insert(toInsert);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ imported: toInsert.length, errors });
}
