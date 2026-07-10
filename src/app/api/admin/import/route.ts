import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { createClient } from '@/lib/supabase/server';
import { parseImportRow } from '@/lib/utils';
import { isSkipAuth } from '@/lib/skip-auth';
import { appendDemoImportedQuestions } from '@/lib/demo-store';
import { invalidateQuestionBankCache } from '@/lib/question-bank/pool';
import type { ImportQuestionRow } from '@/types/database';

export async function POST(request: Request) {
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

  if (isSkipAuth()) {
    const imported = appendDemoImportedQuestions(toInsert);
    invalidateQuestionBankCache();
    return NextResponse.json({ imported, errors });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const { error } = await supabase.from('questions').insert(toInsert);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ imported: toInsert.length, errors });
}
