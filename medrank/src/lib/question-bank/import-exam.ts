import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  parseJsonQuestions,
  parseTextExamBlocks,
  type ImportMeta,
} from '@/lib/question-bank/import-parse';
import { statementFingerprint } from '@/lib/question-bank/provenance';

export type ImportOneResult = {
  ok: boolean;
  batchId?: string;
  inserted: number;
  duplicates: number;
  errors: string[];
  title: string;
  message: string;
};

/** Importa um conteúdo de prova para pending_review. */
export async function importExamContentToReview(
  admin: SupabaseClient,
  opts: {
    format: 'text' | 'json';
    content: string;
    meta: ImportMeta;
    createdBy?: string | null;
  }
): Promise<ImportOneResult> {
  const { format, content, meta, createdBy } = opts;
  const title = meta.title || `${meta.institution || 'Prova'} ${meta.year || ''}`.trim();

  const parsed =
    format === 'json' ? parseJsonQuestions(content) : parseTextExamBlocks(content);

  if (parsed.questions.length === 0) {
    return {
      ok: false,
      inserted: 0,
      duplicates: 0,
      errors: parsed.errors.length ? parsed.errors : ['Nenhuma questão válida'],
      title,
      message: 'Nenhuma questão válida no conteúdo',
    };
  }

  const origin = meta.question_origin || (meta.reproduction_allowed ? 'official' : 'original');
  const reproduction = Boolean(meta.reproduction_allowed);

  if (origin === 'official' && !reproduction) {
    return {
      ok: false,
      inserted: 0,
      duplicates: 0,
      errors: [
        'Para marcar como prova oficial, confirme reproduction_allowed=true (fonte pública permitida).',
      ],
      title,
      message: 'Confirme fonte pública permitida',
    };
  }

  const { data: batch, error: batchErr } = await admin
    .from('question_import_batches')
    .insert({
      title,
      institution: meta.institution || null,
      exam_name: meta.exam_name || null,
      year: meta.year || null,
      source_url: meta.source_url || null,
      reproduction_allowed: reproduction,
      notes: meta.notes || null,
      created_by: createdBy ?? null,
      question_count: parsed.questions.length,
      status: 'pending_review',
    })
    .select('id')
    .single();

  if (batchErr || !batch) {
    return {
      ok: false,
      inserted: 0,
      duplicates: 0,
      errors: [batchErr?.message || 'Falha ao criar lote'],
      title,
      message: 'Falha ao criar lote',
    };
  }

  let inserted = 0;
  let duplicates = 0;
  const insertErrors: string[] = [...parsed.errors];

  for (const q of parsed.questions) {
    const fp = q.statement_fingerprint || statementFingerprint(q.statement);
    const { data: existing } = await admin
      .from('questions')
      .select('id, appears_in_exams, bank_status')
      .eq('statement_fingerprint', fp)
      .maybeSingle();

    if (existing) {
      duplicates += 1;
      const label =
        `${meta.institution || ''} ${meta.exam_name || meta.title || ''} ${meta.year || ''}`.trim();
      if (label) {
        const prev = Array.isArray(existing.appears_in_exams) ? existing.appears_in_exams : [];
        if (!prev.includes(label)) {
          await admin
            .from('questions')
            .update({ appears_in_exams: [...prev, label] })
            .eq('id', existing.id);
        }
      }
      continue;
    }

    const { error } = await admin.from('questions').insert({
      statement: q.statement,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      option_e: q.option_e,
      correct_option: q.correct_option,
      explanation: q.explanation,
      specialty: q.specialty,
      topic: q.topic,
      subtopic: q.subtopic,
      difficulty: q.difficulty,
      year: q.year || meta.year || null,
      source: q.source || meta.institution || meta.title,
      tags: [
        'import',
        origin,
        meta.institution ? `inst-${meta.institution.toLowerCase().replace(/\s+/g, '-')}` : null,
      ].filter(Boolean) as string[],
      bank_status: 'pending_review',
      question_origin: origin,
      institution: meta.institution || null,
      exam_name: meta.exam_name || null,
      source_url: meta.source_url || null,
      official_answer: q.correct_option,
      reproduction_allowed: reproduction,
      statement_fingerprint: fp,
      import_batch_id: batch.id,
      appears_in_exams: meta.exam_name || meta.title ? [String(meta.exam_name || meta.title)] : [],
    });

    if (error) insertErrors.push(error.message);
    else inserted += 1;
  }

  await admin.from('question_import_batches').update({ question_count: inserted }).eq('id', batch.id);

  return {
    ok: inserted > 0,
    batchId: batch.id,
    inserted,
    duplicates,
    errors: insertErrors,
    title,
    message:
      inserted > 0
        ? `${inserted} questão(ões) em revisão.`
        : 'Nada inserido (duplicatas ou erros).',
  };
}
