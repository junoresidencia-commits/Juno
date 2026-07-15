import { createHash } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { computeBankIncidence } from '@/lib/question-bank/incidence';
import { generateOriginalsFromIncidence } from '@/lib/question-bank/original-generator';
import { discoverOfficialSources } from '@/lib/question-bank/source-discovery';
import type { Difficulty, OptionLetter, Question } from '@/types/database';

export const maxDuration = 60;

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

function toInsertRow(question: Omit<Question, 'created_at'> | Question) {
  const correct = String(question.correct_option || 'A').toUpperCase() as OptionLetter;
  const difficulty = (question.difficulty as Difficulty | null) ?? null;

  return {
    id: deterministicUuid(question.id || question.statement.slice(0, 80)),
    statement: question.statement,
    option_a: question.option_a,
    option_b: question.option_b,
    option_c: question.option_c,
    option_d: question.option_d,
    option_e: question.option_e,
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

/**
 * Atualiza o banco:
 * 1) Descobre portais/datasets oficiais (metadados; sem baixar PDFs protegidos)
 * 2) Calcula incidência de temas no banco atual (+ arquivos locais)
 * 3) Gera questões inéditas alinhadas às tendências
 * 4) Reimporta datasets abertos + originais e faz upsert das novas
 */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY necessária para atualizar o banco.' },
      { status: 503 }
    );
  }

  let maxGenerate = 120;
  try {
    const body = (await request.json()) as { maxGenerate?: number };
    if (typeof body.maxGenerate === 'number' && body.maxGenerate > 0) {
      maxGenerate = Math.min(400, Math.floor(body.maxGenerate));
    }
  } catch {
    // body opcional
  }

  const discovery = await discoverOfficialSources({ timeoutMs: 5000 });

  const { data: dbQuestions, error: dbError } = await admin
    .from('questions')
    .select(
      'id, statement, option_a, option_b, option_c, option_d, option_e, correct_option, explanation, source, year, specialty, topic, subtopic, difficulty, tags, image_url, bibliography, created_at'
    )
    .limit(5000);

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  const localPool = [
    ...loadBankFile('imported-questions.json'),
    ...loadBankFile('supplement-questions.json'),
    ...loadBankFile('original-style-questions.json'),
  ];

  const incidencePool: Question[] = [
    ...((dbQuestions as Question[] | null) ?? []),
    ...localPool.map((q) => ({
      ...q,
      created_at: q.created_at ?? new Date(0).toISOString(),
    })),
  ];

  const incidence = computeBankIncidence(incidencePool);
  const generated = generateOriginalsFromIncidence(incidence.hotTopics, {
    maxGenerate,
    yearHint: new Date().getFullYear(),
  });

  const combined = [...localPool, ...generated];
  const seen = new Set<string>();
  const unique = combined.filter((q) => {
    const key = q.statement.slice(0, 120).toLowerCase().replace(/\s+/g, ' ');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const rows = unique.map(toInsertRow);
  const chunkSize = 100;
  let upserted = 0;
  const errors: string[] = [];

  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const { error } = await admin.from('questions').upsert(chunk, { onConflict: 'id' });
    if (error) {
      errors.push(`Lote ${i / chunkSize + 1}: ${error.message}`);
    } else {
      upserted += chunk.length;
    }
  }

  const { count } = await admin.from('questions').select('*', { count: 'exact', head: true });

  const pdfDocs = discovery.documents.filter((d) => d.kind === 'pdf' && (d.year ?? 0) >= 2024);
  const portals = discovery.documents.filter((d) => d.kind === 'portal' || d.kind === 'dataset');

  return NextResponse.json({
    ok: errors.length === 0,
    upserted,
    generatedOriginals: generated.length,
    totalInDb: count ?? upserted,
    discovery: {
      checkedAt: discovery.checkedAt,
      portalsOnline: discovery.portalsOnline,
      portalsOffline: discovery.portalsOffline,
      indexedDocuments: discovery.documents.length,
      officialPortalsAndDatasets: portals.length,
      publicPdfLinksFrom2024: pdfDocs.length,
      sampleDocuments: discovery.documents.slice(0, 12),
      errors: discovery.errors.slice(0, 10),
    },
    incidence: {
      totalAnalyzed: incidence.total,
      hotTopics: incidence.hotTopics.slice(0, 15).map((t) => ({
        specialty: t.specialty,
        topic: t.topic,
        count: t.count,
        share: t.share,
      })),
      byStyle: incidence.byStyle.slice(0, 12),
    },
    policy:
      'Metadados de fontes oficiais indexados; PDFs protegidos não são importados. Novas questões são inéditas MedRank baseadas em incidência temática.',
    errors,
  });
}
