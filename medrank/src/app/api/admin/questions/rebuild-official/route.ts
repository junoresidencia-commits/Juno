import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import { statementFingerprint } from '@/lib/question-bank/provenance';
import { validateOfficialQuestion } from '@/lib/question-bank/official-validate';
import type { Difficulty, OptionLetter, Question } from '@/types/database';

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

function loadOfficialBank(): OfficialRow[] {
  const path = join(process.cwd(), 'data', 'official-residency-questions.json');
  if (!existsSync(path)) return [];
  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { questions?: OfficialRow[] };
  return raw.questions ?? [];
}

/**
 * 1) Backup do banco atual
 * 2) Desativa tudo no ativo
 * 3) Publica somente oficiais validadas (ENARE/Revalida CC-BY 2020–2026)
 *
 * body: { confirm: true, deleteUnreferenced?: boolean }
 */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  if (usesDemoStore() || auth.demo) {
    return NextResponse.json({ error: 'Indisponível no demo' }, { status: 501 });
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });

  const body = (await request.json().catch(() => null)) as {
    confirm?: boolean;
    deleteUnreferenced?: boolean;
  } | null;

  if (body?.confirm !== true) {
    return NextResponse.json(
      {
        error:
          'Envie confirm=true para fazer backup e reconstruir o banco só com provas oficiais públicas.',
      },
      { status: 400 }
    );
  }

  const userId =
    'supabase' in auth && auth.supabase
      ? (await auth.supabase.auth.getUser()).data.user?.id ?? null
      : null;

  // --- 1) Backup (paginado) ---
  let archived = 0;
  const pageSize = 500;
  for (let page = 0; page < 40; page++) {
    const from = page * pageSize;
    const to = from + pageSize - 1;
    const { data, error } = await admin.from('questions').select('*').range(from, to);
    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          hint: 'Confirme migrations 031–033',
        },
        { status: 500 }
      );
    }
    const rows = data ?? [];
    if (rows.length === 0) break;

    const payload = rows.map((row) => ({
      archived_by: userId,
      archive_reason: 'rebuild_official_only',
      question_snapshot: row,
    }));
    const { error: archErr } = await admin.from('questions_archive').insert(payload);
    if (archErr) {
      return NextResponse.json(
        {
          error: archErr.message,
          hint: 'Aplique migration 033_questions_archive_rebuild.sql',
        },
        { status: 500 }
      );
    }
    archived += rows.length;
    if (rows.length < pageSize) break;
  }

  // --- 2) Desativa TODO o banco ativo ---
  const { error: disableErr } = await admin
    .from('questions')
    .update({
      bank_status: 'disabled',
      quality_label: 'deve_ser_excluida',
      quality_notes:
        'Removida do banco ativo no rebuild oficial. Snapshot em questions_archive.',
    })
    .neq('id', '00000000-0000-0000-0000-000000000000'); // atualiza todas

  if (disableErr) {
    return NextResponse.json({ error: disableErr.message }, { status: 500 });
  }

  // --- 3) Carrega e valida oficiais ---
  const official = loadOfficialBank();
  if (official.length === 0) {
    return NextResponse.json(
      { error: 'data/official-residency-questions.json vazio ou ausente no deploy' },
      { status: 404 }
    );
  }

  const seenFp = new Set<string>();
  const toUpsert: Record<string, unknown>[] = [];
  let rejected = 0;
  const rejectSamples: string[] = [];

  for (const raw of official) {
    const correct = String(raw.correct_option || raw.official_answer || 'A')
      .toUpperCase()
      .slice(0, 1) as OptionLetter;

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

    const errors = validateOfficialQuestion(candidate);
    if (errors.length) {
      rejected += 1;
      if (rejectSamples.length < 15) {
        rejectSamples.push(`${raw.id || '?'}: ${errors.map((e) => e.code).join(',')}`);
      }
      continue;
    }

    const fp = statementFingerprint(String(candidate.statement));
    if (seenFp.has(fp)) {
      rejected += 1;
      continue;
    }
    seenFp.add(fp);

    toUpsert.push({
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
          String(candidate.source || ''),
          String(candidate.year || ''),
          'acesso-direto',
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
      quality_notes: 'Rebuild oficial — enunciado preservado, gabarito oficial.',
      exam_track: candidate.exam_track,
      appears_in_exams: candidate.exam_name ? [String(candidate.exam_name)] : [],
    });
  }

  let imported = 0;
  const errors: string[] = [];
  for (let i = 0; i < toUpsert.length; i += 100) {
    const chunk = toUpsert.slice(i, i + 100);
    const { error } = await admin.from('questions').upsert(chunk, { onConflict: 'id' });
    if (error) errors.push(`Lote ${i / 100 + 1}: ${error.message}`);
    else imported += chunk.length;
  }

  // --- 4) Apaga sintéticas sem vínculo (opcional) ---
  let deleted = 0;
  if (body.deleteUnreferenced !== false) {
    // Busca IDs disabled não oficiais e sem uso em exam_questions / attempt_answers
    const { data: disabled } = await admin
      .from('questions')
      .select('id, question_origin')
      .eq('bank_status', 'disabled')
      .neq('question_origin', 'official')
      .limit(5000);

    for (const row of disabled ?? []) {
      const [{ count: eqCount }, { count: ansCount }] = await Promise.all([
        admin
          .from('exam_questions')
          .select('*', { count: 'exact', head: true })
          .eq('question_id', row.id),
        admin
          .from('attempt_answers')
          .select('*', { count: 'exact', head: true })
          .eq('question_id', row.id),
      ]);
      if ((eqCount ?? 0) > 0 || (ansCount ?? 0) > 0) continue;
      const { error } = await admin.from('questions').delete().eq('id', row.id);
      if (!error) deleted += 1;
    }
  }

  const { count: activeOfficial } = await admin
    .from('questions')
    .select('*', { count: 'exact', head: true })
    .eq('bank_status', 'approved')
    .eq('question_origin', 'official');

  if (toUpsert[0]?.id) {
    await admin.from('question_bank_audit_log').insert({
      question_id: toUpsert[0].id as string,
      action: 'bulk_classify',
      reason: `Rebuild oficial: archived=${archived}, imported=${imported}, rejected=${rejected}, deleted=${deleted}`,
      admin_id: userId,
      meta: { archived, imported, rejected, deleted, activeOfficial },
    });
  }

  return NextResponse.json({
    ok: errors.length === 0,
    archived,
    imported,
    rejected,
    deleted,
    activeOfficial: activeOfficial ?? imported,
    rejectSamples,
    errors,
    message:
      `Backup: ${archived}. Ativas oficiais: ${activeOfficial ?? imported}. ` +
      `Rejeitadas na validação: ${rejected}. Apagadas sem vínculo: ${deleted}. ` +
      `Próximo: Provas → Forçar regenerar (banco).`,
  });
}
