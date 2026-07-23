import { createHash } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { isStructurallySound, polishQuestionOptions, stripOptionRationaleLeak } from '@/lib/question-bank/polish-options';
import { statementFingerprint } from '@/lib/question-bank/provenance';
import type { Difficulty, OptionLetter, Question, QuestionOrigin } from '@/types/database';

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

type BankQuestion = Question & {
  institution?: string | null;
  exam_name?: string | null;
  source_url?: string | null;
  official_answer?: string | null;
  reproduction_allowed?: boolean | null;
  question_origin?: QuestionOrigin | null;
  bank_status?: string | null;
};

function loadBankFile(fileName: string): BankQuestion[] {
  const path = join(process.cwd(), 'data', fileName);
  if (!existsSync(path)) return [];
  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { questions?: BankQuestion[] } | BankQuestion[];
  if (Array.isArray(raw)) return raw;
  return raw.questions ?? [];
}

function isOfficialRow(q: BankQuestion): boolean {
  if (q.question_origin === 'official') return true;
  if (q.reproduction_allowed === true) return true;
  const tags = q.tags ?? [];
  if (tags.includes('official') || tags.includes('real')) return true;
  const src = String(q.source || '').toLowerCase();
  return src === 'enare' || src === 'revalida';
}

function cleanOptionFields(q: BankQuestion): BankQuestion {
  return {
    ...q,
    option_a: stripOptionRationaleLeak(String(q.option_a || '')),
    option_b: stripOptionRationaleLeak(String(q.option_b || '')),
    option_c: stripOptionRationaleLeak(String(q.option_c || '')),
    option_d: stripOptionRationaleLeak(String(q.option_d || '')),
    option_e: stripOptionRationaleLeak(String(q.option_e || '')),
  };
}

function toInsertRow(question: BankQuestion) {
  const correct = String(question.correct_option || 'A').toUpperCase() as OptionLetter;
  const difficulty = (question.difficulty as Difficulty | null) ?? null;
  const official = isOfficialRow(question);
  const origin: QuestionOrigin =
    question.question_origin ||
    (official ? 'official' : 'original');

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
    bank_status: 'approved' as const,
    question_origin: origin,
    institution: question.institution ?? (official ? question.source : null) ?? null,
    exam_name: question.exam_name ?? null,
    source_url: question.source_url ?? null,
    official_answer: question.official_answer ?? (official ? correct : null),
    reproduction_allowed: official ? true : Boolean(question.reproduction_allowed),
    statement_fingerprint: statementFingerprint(question.statement),
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

  // Oficiais primeiro (ENARE/Revalida CC-BY); expert MedRank depois (treino/fallback)
  const combined = [
    ...loadBankFile('official-residency-questions.json'),
    ...loadBankFile('imported-questions.json'),
    ...loadBankFile('original-style-questions.json'),
    ...loadBankFile('supplement-questions.json'),
    ...loadBankFile('residencia-expert-questions.json'),
    ...loadBankFile('nefropediatria-questions.json'),
    ...loadBankFile('nefrologia-avancada-questions.json'),
  ];

  const seen = new Set<string>();
  let polishedCount = 0;
  let droppedWeak = 0;
  let officialCount = 0;
  const unique: BankQuestion[] = [];

  for (const raw of combined) {
    const key = raw.statement.slice(0, 120).toLowerCase().replace(/\s+/g, ' ');
    if (seen.has(key)) continue;
    seen.add(key);

    const official = isOfficialRow(raw);
    let q = cleanOptionFields(raw);

    // Nunca reescrever alternativas de prova oficial
    if (!official) {
      if (
        !isStructurallySound(q) ||
        /esta abordagem atrasa/i.test(
          `${q.option_a} ${q.option_b} ${q.option_c} ${q.option_d} ${q.option_e}`
        )
      ) {
        q = polishQuestionOptions(q);
        polishedCount += 1;
      }
      if (!isStructurallySound(q)) {
        droppedWeak += 1;
        continue;
      }
    } else {
      // Oficiais: só exige enunciado + 5 opções + gabarito
      const hasOptions = [q.option_a, q.option_b, q.option_c, q.option_d, q.option_e].every(
        (o) => String(o || '').trim().length > 0
      );
      if (!String(q.statement || '').trim() || !hasOptions) {
        droppedWeak += 1;
        continue;
      }
      officialCount += 1;
    }

    unique.push(q);
  }

  if (unique.length === 0) {
    return NextResponse.json(
      { error: 'Nenhum arquivo de banco encontrado em data/.' },
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

  return NextResponse.json({
    ok: errors.length === 0,
    imported,
    officialCount,
    totalInDb: count ?? imported,
    polishedOnImport: polishedCount,
    droppedWeak,
    sources:
      'Oficiais ENARE/Revalida (CC-BY) primeiro + originais MedRank + expert nefro (fallback)',
    errors,
  });
}
