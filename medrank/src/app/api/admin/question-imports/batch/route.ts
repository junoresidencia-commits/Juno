import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import type { ImportMeta } from '@/lib/question-bank/import-parse';
import { importExamContentToReview } from '@/lib/question-bank/import-exam';

export const maxDuration = 300;

const MAX_ITEMS = 25;

/**
 * Importa várias provas de uma vez (cada arquivo = um lote em revisão).
 * body: { items: [{ format, content, meta }], baseMeta? }
 */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  if (usesDemoStore() || auth.demo) {
    return NextResponse.json({ error: 'Importação em lote indisponível no demo.' }, { status: 501 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as {
    items?: Array<{
      format?: 'text' | 'json';
      content?: string;
      meta?: ImportMeta;
      filename?: string;
    }>;
    baseMeta?: ImportMeta;
  } | null;

  const items = (body?.items || []).slice(0, MAX_ITEMS);
  if (items.length === 0) {
    return NextResponse.json({ error: 'items[] obrigatório' }, { status: 400 });
  }

  const createdBy =
    !auth.demo && auth.supabase
      ? (await auth.supabase.auth.getUser()).data.user?.id
      : null;

  const base = body?.baseMeta || { title: 'Importação' };
  const results = [];

  for (const item of items) {
    if (!item.content?.trim()) {
      results.push({
        ok: false,
        filename: item.filename,
        inserted: 0,
        duplicates: 0,
        message: 'Sem conteúdo',
      });
      continue;
    }

    const filename = item.filename || 'prova';
    const stem = filename.replace(/\.[^.]+$/, '');
    const meta: ImportMeta = {
      ...base,
      ...item.meta,
      title: item.meta?.title || `${base.institution || 'Prova'} ${base.year || ''} — ${stem}`.trim(),
      exam_name: item.meta?.exam_name || base.exam_name || stem,
      notes: [base.notes, item.filename ? `arquivo: ${item.filename}` : null]
        .filter(Boolean)
        .join(' | '),
    };

    const result = await importExamContentToReview(admin, {
      format: item.format === 'json' ? 'json' : 'text',
      content: item.content,
      meta,
      createdBy,
    });

    results.push({
      ok: result.ok,
      filename,
      batchId: result.batchId,
      inserted: result.inserted,
      duplicates: result.duplicates,
      errors: result.errors.slice(0, 5),
      message: result.message,
      title: result.title,
    });
  }

  const inserted = results.reduce((s, r) => s + (r.inserted || 0), 0);
  const okCount = results.filter((r) => r.ok).length;

  return NextResponse.json({
    ok: inserted > 0,
    fileCount: results.length,
    okCount,
    inserted,
    results,
    message: `${okCount}/${results.length} arquivo(s) importados · ${inserted} questão(ões) em revisão.`,
  });
}
