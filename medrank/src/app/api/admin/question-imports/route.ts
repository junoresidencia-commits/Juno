import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import {
  parseJsonQuestions,
  parseTextExamBlocks,
  type ImportMeta,
} from '@/lib/question-bank/import-parse';
import { statementFingerprint } from '@/lib/question-bank/provenance';

export const maxDuration = 120;

/**
 * Importa prova/texto/JSON para pending_review (nao publica sozinho).
 * body: { format: 'text'|'json', content: string, meta: ImportMeta }
 */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  if (usesDemoStore() || auth.demo) {
    return NextResponse.json(
      { error: 'Importacao de prova oficial indisponivel no demo. Use CSV legado ou seed.' },
      { status: 501 }
    );
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Service role necessaria' }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as {
    format?: 'text' | 'json';
    content?: string;
    meta?: ImportMeta;
  } | null;

  if (!body?.content?.trim()) {
    return NextResponse.json({ error: 'content obrigatorio' }, { status: 400 });
  }

  const format = body.format === 'json' ? 'json' : 'text';
  const parsed =
    format === 'json' ? parseJsonQuestions(body.content) : parseTextExamBlocks(body.content);

  if (parsed.questions.length === 0) {
    return NextResponse.json(
      { error: 'Nenhuma questao valida no conteudo', errors: parsed.errors },
      { status: 400 }
    );
  }

  const meta = body.meta || { title: 'Importacao' };
  const origin = meta.question_origin || (meta.reproduction_allowed ? 'official' : 'original');
  const reproduction = Boolean(meta.reproduction_allowed);

  if (origin === 'official' && !reproduction) {
    return NextResponse.json(
      {
        error:
          'Para marcar como prova oficial, confirme reproduction_allowed=true (fonte publica permitida).',
      },
      { status: 400 }
    );
  }

  const { data: batch, error: batchErr } = await admin
    .from('question_import_batches')
    .insert({
      title: meta.title || `${meta.institution || 'Prova'} ${meta.year || ''}`.trim(),
      institution: meta.institution || null,
      exam_name: meta.exam_name || null,
      year: meta.year || null,
      source_url: meta.source_url || null,
      reproduction_allowed: reproduction,
      notes: meta.notes || null,
      created_by: !auth.demo && auth.supabase ? (await auth.supabase.auth.getUser()).data.user?.id : null,
      question_count: parsed.questions.length,
      status: 'pending_review',
    })
    .select('id')
    .single();

  if (batchErr || !batch) {
    return NextResponse.json(
      { error: batchErr?.message || 'Falha ao criar lote (rode migration 031)' },
      { status: 500 }
    );
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
      const label = `${meta.institution || ''} ${meta.exam_name || meta.title || ''} ${meta.year || ''}`.trim();
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

    if (error) {
      insertErrors.push(error.message);
    } else {
      inserted += 1;
    }
  }

  await admin
    .from('question_import_batches')
    .update({ question_count: inserted })
    .eq('id', batch.id);

  return NextResponse.json({
    ok: true,
    batchId: batch.id,
    inserted,
    duplicates,
    pending_review: inserted,
    errors: insertErrors,
    message:
      inserted > 0
        ? `${inserted} questao(oes) em revisao. Aprove em Admin -> Questoes -> Revisao antes de usar na disputa.`
        : 'Nada inserido (duplicatas ou erros).',
  });
}
