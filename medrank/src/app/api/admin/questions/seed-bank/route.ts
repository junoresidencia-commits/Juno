import { createHash } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { statementFingerprint } from '@/lib/question-bank/provenance';
import { validateOfficialQuestion } from '@/lib/question-bank/official-validate';
import type { Difficulty, OptionLetter, Question } from '@/types/database';

/** Importa somente provas oficiais públicas validadas. */
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

type OfficialRow = Question & {
  institution?: string | null;
  exam_name?: string | null;
  source_url?: string | null;
  official_answer?: string | null;
  reproduction_allowed?: boolean | null;
  exam_track?: string | null;
};

function loadOfficial(): OfficialRow[] {
  const path = join(process.cwd(), 'data', 'official-residency-questions.json');
  if (!existsSync(path)) return [];
  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { questions?: OfficialRow[] };
  return raw.questions ?? [];
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

  const official = loadOfficial();
  if (official.length === 0) {
    return NextResponse.json(
      {
        error:
          'Banco oficial ausente. Use Admin → Rebuild oficial (backup + limpeza) ou confira data/official-residency-questions.json.',
      },
      { status: 404 }
    );
  }

  const seen = new Set<string>();
  let rejected = 0;
  const rows: Record<string, unknown>[] = [];

  for (const raw of official) {
    const correct = String(raw.correct_option || 'A').toUpperCase().slice(0, 1) as OptionLetter;
    const candidate = {
      ...raw,
      correct_option: correct,
      official_answer: correct,
      question_origin: 'official' as const,
      reproduction_allowed: true,
      institution: raw.institution || raw.source || 'ENARE',
      source_url:
        raw.source_url ||
        (String(raw.source).toLowerCase() === 'revalida'
          ? 'https://huggingface.co/datasets/Larxel/healthqa-br'
          : 'https://doi.org/10.5281/zenodo.17571003'),
      exam_track:
        raw.exam_track ||
        (String(raw.source).toLowerCase() === 'revalida' ? 'revalida' : 'acesso_direto'),
    };

    if (validateOfficialQuestion(candidate).length) {
      rejected += 1;
      continue;
    }

    const fp = statementFingerprint(String(candidate.statement));
    if (seen.has(fp)) {
      rejected += 1;
      continue;
    }
    seen.add(fp);

    rows.push({
      id: deterministicUuid(String(raw.id || candidate.statement).slice(0, 80)),
      statement: candidate.statement,
      option_a: candidate.option_a,
      option_b: candidate.option_b,
      option_c: candidate.option_c,
      option_d: candidate.option_d,
      option_e: candidate.option_e ?? '',
      correct_option: correct,
      explanation: candidate.explanation ?? null,
      source: candidate.source,
      year: candidate.year,
      specialty: candidate.specialty,
      topic: candidate.topic,
      subtopic: candidate.subtopic,
      difficulty: (candidate.difficulty as Difficulty | null) ?? 'medio',
      tags: Array.from(
        new Set([
          ...(candidate.tags ?? []),
          'official',
          'real',
          'residencia-expert',
          'banco-expert',
          'cc-by-4.0',
        ])
      ),
      image_url: candidate.image_url ?? null,
      bibliography: candidate.bibliography ?? null,
      bank_status: 'approved',
      question_origin: 'official',
      institution: candidate.institution,
      exam_name: candidate.exam_name ?? null,
      source_url: candidate.source_url,
      official_answer: correct,
      reproduction_allowed: true,
      statement_fingerprint: fp,
      quality_label: 'aprovada',
      quality_notes: 'Prova oficial pública — enunciado preservado.',
      exam_track: candidate.exam_track,
    });
  }

  let imported = 0;
  const errors: string[] = [];
  for (let i = 0; i < rows.length; i += 100) {
    const chunk = rows.slice(i, i + 100);
    const { error } = await admin.from('questions').upsert(chunk, { onConflict: 'id' });
    if (error) errors.push(`Lote ${i / 100 + 1}: ${error.message}`);
    else imported += chunk.length;
  }

  const { count } = await admin
    .from('questions')
    .select('*', { count: 'exact', head: true })
    .eq('bank_status', 'approved')
    .eq('question_origin', 'official');

  return NextResponse.json({
    ok: errors.length === 0,
    imported,
    officialCount: imported,
    rejected,
    totalInDb: count ?? imported,
    polishedOnImport: 0,
    droppedWeak: rejected,
    sources: 'Somente oficiais ENARE/Revalida CC-BY (2020–2026). Sem IA / sem expert sintético.',
    errors,
    hint: 'Para backup + apagar sintéticas do ativo, use Rebuild oficial.',
  });
}
