import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import {
  findInternalDuplicates,
  originFromKind,
  parseAuthorialBatchCsv,
  parseAuthorialBatchJson,
  type AuthorialBatchItem,
  type AuthorialParseIssue,
  type AuthorialQuestionKind,
} from '@/lib/question-bank/authorial-batch';
import { createHash } from 'crypto';

export const maxDuration = 300;

function deterministicUuid(seed: string): string {
  const hex = createHash('sha256').update(`medrank-authorial:${seed}`).digest('hex');
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    `4${hex.slice(13, 16)}`,
    `a${hex.slice(17, 20)}`,
    hex.slice(20, 32),
  ].join('-');
}

function toDbRow(item: AuthorialBatchItem, batchId: string) {
  const kind = item.tipo_da_questao as AuthorialQuestionKind;
  const origin = originFromKind(kind);
  const tags = Array.from(
    new Set([
      ...item.tags,
      'authorial-batch',
      kind,
      item.especialidade || '',
      item.area || '',
      'rascunho',
    ].filter(Boolean))
  );

  // Oficiais neste fluxo só entram se explicitamente marcadas — e ainda como draft
  const reproduction = kind === 'official_residency';

  return {
    id: deterministicUuid(item.id_externo),
    external_id: item.id_externo,
    lote_importacao: item.lote_importacao,
    import_batch_id: batchId,
    question_kind: kind,
    question_origin: origin,
    reproduction_allowed: reproduction,
    statement: item.enunciado,
    option_a: item.alternativa_A,
    option_b: item.alternativa_B,
    option_c: item.alternativa_C,
    option_d: item.alternativa_D,
    option_e: item.alternativa_E,
    correct_option: item.resposta_correta,
    explanation: item.comentario_do_gabarito,
    option_a_rationale: item.justificativa_da_alternativa_A,
    option_b_rationale: item.justificativa_da_alternativa_B,
    option_c_rationale: item.justificativa_da_alternativa_C,
    option_d_rationale: item.justificativa_da_alternativa_D,
    option_e_rationale: item.justificativa_da_alternativa_E,
    specialty: item.especialidade,
    area: item.area,
    topic: item.tema,
    subtopic: item.subtema,
    difficulty: item.nivel_dificuldade,
    bibliography: item.referencia_principal,
    guideline_name: item.referencia_principal,
    guideline_institution: item.instituicao_responsavel_pela_diretriz,
    guideline_year: item.ano_da_diretriz,
    year: item.ano_da_diretriz,
    institution: item.instituicao_responsavel_pela_diretriz,
    source: item.instituicao_responsavel_pela_diretriz || 'MedRank autoral',
    question_version: item.versao_da_questao,
    tags,
    statement_fingerprint: item.statement_fingerprint,
    bank_status: 'draft',
    quality_label: 'precisa_de_correcao',
    quality_notes: 'Importada em lote — aguarda revisão administrativa',
    official_answer: item.resposta_correta,
  };
}

async function parseBody(request: Request): Promise<{
  format: 'json' | 'csv';
  content: string;
  commit: boolean;
  title?: string;
}> {
  const ct = request.headers.get('content-type') || '';
  if (ct.includes('multipart/form-data')) {
    const form = await request.formData();
    const file = form.get('file') as File | null;
    const contentField = form.get('content');
    const format = String(form.get('format') || 'json') === 'csv' ? 'csv' : 'json';
    const commit = String(form.get('commit') || '') === 'true';
    const title = form.get('title') ? String(form.get('title')) : undefined;
    let content = '';
    if (file) content = await file.text();
    else if (typeof contentField === 'string') content = contentField;
    return { format, content, commit, title };
  }

  const body = (await request.json().catch(() => null)) as {
    format?: 'json' | 'csv';
    content?: string;
    commit?: boolean;
    title?: string;
  } | null;
  return {
    format: body?.format === 'csv' ? 'csv' : 'json',
    content: body?.content || '',
    commit: Boolean(body?.commit),
    title: body?.title,
  };
}

/**
 * Preview (commit=false) ou importação em rascunho (commit=true).
 * Nunca publica sozinho.
 */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  if (usesDemoStore() || auth.demo) {
    return NextResponse.json({ error: 'Indisponível no demo' }, { status: 501 });
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });

  const { format, content, commit, title } = await parseBody(request);
  if (!content.trim()) {
    return NextResponse.json({ error: 'Arquivo/conteúdo vazio' }, { status: 400 });
  }

  const parsed =
    format === 'csv' ? parseAuthorialBatchCsv(content) : parseAuthorialBatchJson(content);
  const dupIssues = findInternalDuplicates(parsed.items);
  const issues: AuthorialParseIssue[] = [...parsed.issues, ...dupIssues];
  const errorCount = issues.filter((i) => i.severity === 'error').length;
  const loteCodigoHint =
    parsed.loteHint || parsed.items[0]?.lote_importacao || null;

  // Já no banco? (fingerprint / external_id) — mesmo lote = reimport ok
  type ExistingQ = {
    id: string;
    statement_fingerprint: string | null;
    external_id: string | null;
    lote_importacao: string | null;
  };
  const existingByFp = new Map<string, ExistingQ>();
  const existingByExt = new Map<string, ExistingQ>();
  const fps = parsed.items.map((i) => i.statement_fingerprint).filter(Boolean);
  const extIds = parsed.items.map((i) => i.id_externo).filter(Boolean);

  if (fps.length || extIds.length) {
    const { data: byFp } = fps.length
      ? await admin
          .from('questions')
          .select('id, statement_fingerprint, external_id, lote_importacao')
          .in('statement_fingerprint', fps.slice(0, 200))
      : { data: [] as ExistingQ[] };
    const { data: byExt } = extIds.length
      ? await admin
          .from('questions')
          .select('id, statement_fingerprint, external_id, lote_importacao')
          .in('external_id', extIds.slice(0, 200))
      : { data: [] as ExistingQ[] };

    for (const row of [...(byFp ?? []), ...(byExt ?? [])] as ExistingQ[]) {
      if (row.statement_fingerprint) existingByFp.set(row.statement_fingerprint, row);
      if (row.external_id) existingByExt.set(row.external_id, row);
    }
  }

  const preview = parsed.items.map((item, index) => {
    const itemErrors = issues.filter((i) => i.index === index && i.severity === 'error');
    const hit =
      existingByExt.get(item.id_externo) ||
      existingByFp.get(item.statement_fingerprint) ||
      null;
    const sameLote =
      Boolean(hit) &&
      Boolean(loteCodigoHint) &&
      (hit!.lote_importacao === loteCodigoHint || hit!.external_id === item.id_externo);

    if (hit && !sameLote) {
      itemErrors.push({
        index,
        id_externo: item.id_externo,
        severity: 'error',
        code: 'duplicata_banco',
        message: `Já existe em outro lote (${hit.lote_importacao || hit.external_id || hit.id})`,
      });
    }

    return {
      index,
      id_externo: item.id_externo,
      tipo_da_questao: item.tipo_da_questao,
      especialidade: item.especialidade,
      tema: item.tema,
      dificuldade: item.nivel_dificuldade,
      enunciado_preview: item.enunciado.slice(0, 220),
      resposta_correta: item.resposta_correta,
      referencia: item.referencia_principal,
      diretriz: [item.instituicao_responsavel_pela_diretriz, item.ano_da_diretriz]
        .filter(Boolean)
        .join(' '),
      ok: itemErrors.length === 0,
      willUpdate: Boolean(hit && sameLote),
      errors: itemErrors,
    };
  });

  const validItems = parsed.items.filter((_, idx) => preview[idx]?.ok);
  const summary = {
    total: parsed.items.length,
    valid: validItems.length,
    invalid: parsed.items.length - validItems.length,
    errors: errorCount + preview.filter((p) => !p.ok).length,
    warnings: issues.filter((i) => i.severity === 'warning').length,
    lote: loteCodigoHint,
    willUpdate: preview.filter((p) => p.willUpdate).length,
  };

  if (!commit) {
    return NextResponse.json({
      ok: true,
      mode: 'preview',
      summary,
      preview,
      issues,
      message:
        validItems.length > 0
          ? summary.willUpdate
            ? `${validItems.length} ok — ${summary.willUpdate} já no lote e serão atualizadas.`
            : `${validItems.length} prontas para importar. Confirme com commit=true.`
          : 'Nenhuma questão válida no arquivo.',
    });
  }

  if (validItems.length === 0) {
    return NextResponse.json(
      { error: 'Nenhuma questão válida para importar', summary, preview, issues },
      { status: 400 }
    );
  }

  // Bloqueia se misturar oficiais sem reproduction (autoral batch não deve trazer fake official)
  const fakeOfficial = validItems.filter((i) => i.tipo_da_questao === 'official_residency');
  if (fakeOfficial.length > 0) {
    return NextResponse.json(
      {
        error:
          'Este fluxo é para questões AUTORAIS. Questões oficiais de prova devem usar Importar prova / rebuild oficial.',
        fakeOfficial: fakeOfficial.map((i) => i.id_externo),
      },
      { status: 400 }
    );
  }

  const userId =
    'supabase' in auth && auth.supabase
      ? (await auth.supabase.auth.getUser()).data.user?.id ?? null
      : null;

  const loteCodigo = loteCodigoHint || `lote-${Date.now()}`;

  // Reusa o lote se já existir (reimportar LOTE_04 etc.) — evita duplicate key
  let batch: { id: string; lote_codigo: string | null } | null = null;
  const { data: existingBatch } = await admin
    .from('question_import_batches')
    .select('id, lote_codigo')
    .eq('lote_codigo', loteCodigo)
    .maybeSingle();

  const isReimport = Boolean(existingBatch?.id);

  if (existingBatch?.id) {
    const { data: updated, error: updErr } = await admin
      .from('question_import_batches')
      .update({
        title: title || `Lote autoral ${loteCodigo}`,
        batch_kind: 'authorial',
        status: 'draft',
        question_count: validItems.length,
        notes: 'Reimportação — substitui/atualiza questões do mesmo lote_codigo',
        undone_at: null,
        payload_meta: {
          format,
          requested: parsed.items.length,
          valid: validItems.length,
          reimport: true,
        },
      })
      .eq('id', existingBatch.id)
      .select('id, lote_codigo')
      .single();
    if (updErr || !updated) {
      return NextResponse.json(
        { error: updErr?.message || 'Falha ao atualizar lote existente' },
        { status: 500 }
      );
    }
    batch = updated;
  } else {
    const { data: created, error: batchErr } = await admin
      .from('question_import_batches')
      .insert({
        title: title || `Lote autoral ${loteCodigo}`,
        lote_codigo: loteCodigo,
        batch_kind: 'authorial',
        status: 'draft',
        question_count: validItems.length,
        created_by: userId,
        notes: 'Importação JSON/CSV externa — status rascunho até revisão',
        payload_meta: {
          format,
          requested: parsed.items.length,
          valid: validItems.length,
        },
      })
      .select('id, lote_codigo')
      .single();

    if (batchErr || !created) {
      // Corrida / índice único: tenta reusar
      if (batchErr?.message?.includes('lote_codigo') || batchErr?.code === '23505') {
        const { data: raced } = await admin
          .from('question_import_batches')
          .select('id, lote_codigo')
          .eq('lote_codigo', loteCodigo)
          .maybeSingle();
        if (raced?.id) {
          batch = raced;
        } else {
          return NextResponse.json(
            {
              error: batchErr?.message || 'Falha ao criar lote',
              hint: 'Aplique migration 034_authorial_batch_import.sql',
            },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          {
            error: batchErr?.message || 'Falha ao criar lote',
            hint: 'Aplique migration 034_authorial_batch_import.sql',
          },
          { status: 500 }
        );
      }
    } else {
      batch = created;
    }
  }

  const rows = validItems.map((item) => {
    const row = toDbRow(item, batch!.id);
    // Reusa id já existente (external_id) — evita unique em external_id
    const hit =
      existingByExt.get(item.id_externo) ||
      existingByFp.get(item.statement_fingerprint) ||
      null;
    if (hit?.id) {
      row.id = hit.id;
    }
    // Reimportação / já no mesmo lote: aprova direto
    if (isReimport || hit?.lote_importacao === loteCodigo || hit?.external_id === item.id_externo) {
      row.bank_status = 'approved';
      row.quality_label = 'aprovada';
      row.quality_notes = 'Reimportação do lote — aprovada automaticamente';
      row.tags = Array.from(
        new Set(
          [...(row.tags || []).filter((t) => t !== 'rascunho'), 'authorial-published'].filter(
            Boolean
          )
        )
      );
    }
    return row;
  });

  let inserted = 0;
  const insertErrors: string[] = [];
  for (let i = 0; i < rows.length; i += 50) {
    const chunk = rows.slice(i, i + 50);
    const { error } = await admin.from('questions').upsert(chunk, { onConflict: 'id' });
    if (error) {
      // Fallback: atualiza uma a uma por external_id / id
      for (const row of chunk) {
        const { error: oneErr } = await admin.from('questions').upsert(row, { onConflict: 'id' });
        if (oneErr) {
          const { error: byExtErr } = await admin
            .from('questions')
            .update(row)
            .eq('external_id', row.external_id);
          if (byExtErr) insertErrors.push(`${row.external_id}: ${oneErr.message}`);
          else inserted += 1;
        } else {
          inserted += 1;
        }
      }
    } else {
      inserted += chunk.length;
    }
  }

  if ((isReimport || inserted > 0) && insertErrors.length === 0) {
    await admin
      .from('question_import_batches')
      .update({
        status: 'published',
        approved_count: inserted,
        question_count: inserted,
      })
      .eq('id', batch!.id);
  }

  return NextResponse.json({
    ok: insertErrors.length === 0,
    mode: 'commit',
    batchId: batch!.id,
    lote_codigo: batch!.lote_codigo,
    inserted,
    reusedBatch: isReimport,
    summary,
    preview,
    errors: insertErrors,
    message: isReimport
      ? `${inserted} questões atualizadas e aprovadas no lote ${batch!.lote_codigo}.`
      : `${inserted} questões importadas no lote ${batch!.lote_codigo}.`,
  });
}

export async function GET() {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  if (usesDemoStore()) return NextResponse.json({ batches: [] });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });

  const { data, error } = await admin
    .from('question_import_batches')
    .select('*')
    .eq('batch_kind', 'authorial')
    .order('created_at', { ascending: false })
    .limit(40);

  if (error) {
    return NextResponse.json(
      { error: error.message, hint: 'Aplique migration 034' },
      { status: 500 }
    );
  }
  return NextResponse.json({ batches: data ?? [] });
}
