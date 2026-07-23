import { createHash } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { isStructurallySound, polishQuestionOptions, stripOptionRationaleLeak } from '@/lib/question-bank/polish-options';
import type { Difficulty, OptionLetter, Question } from '@/types/database';

/** Importa dezenas de milhares de questões — precisa de timeout longo. */
export const maxDuration = 300;

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

function cleanOptionFields(q: Question): Question {
  return {
    ...q,
    option_a: stripOptionRationaleLeak(String(q.option_a || '')),
    option_b: stripOptionRationaleLeak(String(q.option_b || '')),
    option_c: stripOptionRationaleLeak(String(q.option_c || '')),
    option_d: stripOptionRationaleLeak(String(q.option_d || '')),
    option_e: stripOptionRationaleLeak(String(q.option_e || '')),
  };
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
    ...loadBankFile('residencia-expert-questions.json'),
    ...loadBankFile('nefropediatria-questions.json'),
    ...loadBankFile('nefrologia-avancada-questions.json'),
    ...loadBankFile('supplement-questions.json'),
    ...loadBankFile('original-style-questions.json'),
    // Importado por último e só entra se passar no filtro estrutural (após polish)
    ...loadBankFile('imported-questions.json'),
  ];

  // Deduplicate by statement; polish opções ruins; descarta o que ainda falhar
  const seen = new Set<string>();
  let polishedCount = 0;
  let droppedWeak = 0;
  const unique: Question[] = [];
  for (const raw of combined) {
    const key = raw.statement.slice(0, 120).toLowerCase().replace(/\s+/g, ' ');
    if (seen.has(key)) continue;
    seen.add(key);

    let q = cleanOptionFields(raw);
    if (!isStructurallySound(q) || /esta abordagem atrasa/i.test(
      `${q.option_a} ${q.option_b} ${q.option_c} ${q.option_d} ${q.option_e}`
    )) {
      q = polishQuestionOptions(q);
      polishedCount += 1;
    }
    // Só descarta erros graves (não warning de stem curto)
    if (!isStructurallySound(q)) {
      droppedWeak += 1;
      continue;
    }
    unique.push(q);
  }

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
    polishedOnImport: polishedCount,
    droppedWeak,
    sources:
      'Expert residência + nefro/nefroped + originais MedRank (+ importados só se passarem no filtro de qualidade)',
    styleBanks: [...styleTags].sort(),
    errors,
  });
}
