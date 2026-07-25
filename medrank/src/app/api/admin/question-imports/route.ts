import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import type { ImportMeta } from '@/lib/question-bank/import-parse';
import { importExamContentToReview } from '@/lib/question-bank/import-exam';

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

  const createdBy =
    !auth.demo && auth.supabase
      ? (await auth.supabase.auth.getUser()).data.user?.id
      : null;

  const result = await importExamContentToReview(admin, {
    format: body.format === 'json' ? 'json' : 'text',
    content: body.content,
    meta: body.meta || { title: 'Importacao' },
    createdBy,
  });

  if (!result.ok && result.inserted === 0 && !result.batchId) {
    return NextResponse.json(
      { error: result.message, errors: result.errors },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: result.ok,
    batchId: result.batchId,
    inserted: result.inserted,
    duplicates: result.duplicates,
    pending_review: result.inserted,
    errors: result.errors,
    message:
      result.inserted > 0
        ? `${result.message} Aprove em Admin -> Questoes -> Revisao antes de usar na disputa.`
        : result.message,
  });
}
