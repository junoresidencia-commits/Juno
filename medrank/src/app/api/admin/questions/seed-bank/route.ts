import { createHash } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Difficulty, OptionLetter, Question } from '@/types/database';

function deterministicUuid(seed: string): string {
  const hex = createHash('sha256').update(`medrank-q:${seed}`).digest('hex');
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    `4${hex.slice(13, 16)}`,
    `a${hex.slice(17, 20)}`,
    hex.slice(20, 32),
  ].join('-');
}

function loadBankFile(fileName: string): Question[] {
  const path = join(process.cwd(), 'data', fileName);
  if (!existsSync(path)) return [];
  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { questions?: Question[] } | Question[];
  if (Array.isArray(raw)) return raw;
  return raw.questions ?? [];
}

function toInsertRow(question: Question) {
  const correct = String(question.correct_option || 'A').toUpperCase() as OptionLetter;
  const difficulty = (question.difficulty as Difficulty | null) ?? null;

  return {
    id: deterministicUuid(question.id || question.statement.slice(0, 80)),
    statement: question.statement,
    option_a: question.option_a,
    option_b: question.option_b,
    option_c: question.option_c,
    option_d: question.option_d,
    option_e: question.option_e ?? '',
    correct_option: ['A', 'B', 'C', 'D', 'E'].includes(correct) ? correct : 'A',
    explanation: question.explanation ?? null,
    source: question.source ?? null,
    year: question.year ?? null,
    specialty: question.specialty ?? null,
    topic: question.topic ?? null,
    subtopic: question.subtopic ?? null,
    difficulty,
    tags: question.tags ?? [],
    image_url: question.image_url ?? null,
    bibliography: question.bibliography ?? null,
  };
}

export async function POST() {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY necessária na Vercel para importar o banco.' },
      { status: 503 }
    );
  }

  const combined = [
    ...loadBankFile('imported-questions.json'),
    ...loadBankFile('supplement-questions.json'),
    ...loadBankFile('original-style-questions.json'),
    ...loadBankFile('nefropediatria-questions.json'),
  ];

  // Deduplicate by statement
  const seen = new Set<string>();
  const unique = combined.filter((q) => {
    const key = q.statement.slice(0, 120).toLowerCase().replace(/\s+/g, ' ');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (unique.length === 0) {
    return NextResponse.json(
      { error: 'Arquivos data/imported-questions.json não encontrados no deploy.' },
      { status: 404 }
    );
  }

  const rows = unique.map(toInsertRow);
  const chunkSize = 100;
  let imported = 0;
  const errors: string[] = [];

  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const { error } = await admin.from('questions').upsert(chunk, { onConflict: 'id' });
    if (error) {
      errors.push(`Lote ${i / chunkSize + 1}: ${error.message}`);
    } else {
      imported += chunk.length;
    }
  }

  const { count } = await admin.from('questions').select('*', { count: 'exact', head: true });

  const styleTags = new Set<string>();
  for (const q of unique) {
    for (const tag of q.tags ?? []) {
      if (tag.startsWith('estilo-')) styleTags.add(tag.replace('estilo-', ''));
    }
  }

  return NextResponse.json({
    ok: errors.length === 0,
    imported,
    totalInDb: count ?? imported,
    sources:
      'ENARE + Revalida (abertos) + originais MedRank (estilo USP/UNICAMP/etc.) + nefropediatria (SBN/SBNPed)',
    styleBanks: [...styleTags].sort(),
    errors,
  });
}
