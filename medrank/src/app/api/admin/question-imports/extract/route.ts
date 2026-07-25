import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { usesDemoStore } from '@/lib/demo-data';
import {
  extractTextFromPdfBuffer,
  fetchExamSourceFromUrl,
} from '@/lib/question-bank/extract-source';
import { parseTextExamBlocks } from '@/lib/question-bank/import-parse';

export const maxDuration = 120;

/**
 * Extrai texto de PDF (upload) ou URL e já tenta montar as questões no template MedRank.
 * Não grava no banco — só preview. Depois use POST /api/admin/question-imports.
 */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  if (usesDemoStore() || auth.demo) {
    return NextResponse.json(
      { error: 'Extração de PDF/URL indisponível no demo.' },
      { status: 501 }
    );
  }

  const contentType = request.headers.get('content-type') || '';

  try {
    let text = '';
    let pages: number | undefined;
    let sourceUrl: string | undefined;
    let kind: 'pdf' | 'url' | 'text' = 'text';

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      const file = form.get('file');
      const urlField = String(form.get('url') || '').trim();

      if (file instanceof File && file.size > 0) {
        const buf = await file.arrayBuffer();
        const extracted = await extractTextFromPdfBuffer(buf);
        text = extracted.text;
        pages = extracted.pages;
        kind = 'pdf';
      } else if (urlField) {
        const extracted = await fetchExamSourceFromUrl(urlField);
        text = extracted.text;
        pages = extracted.pages;
        sourceUrl = extracted.sourceUrl;
        kind = 'url';
      } else {
        return NextResponse.json({ error: 'Envie um PDF ou uma URL.' }, { status: 400 });
      }
    } else {
      const body = (await request.json().catch(() => null)) as {
        url?: string;
        content?: string;
      } | null;

      if (body?.url?.trim()) {
        const extracted = await fetchExamSourceFromUrl(body.url);
        text = extracted.text;
        pages = extracted.pages;
        sourceUrl = extracted.sourceUrl;
        kind = 'url';
      } else if (body?.content?.trim()) {
        text = body.content.trim();
        kind = 'text';
      } else {
        return NextResponse.json({ error: 'Envie url, content ou multipart com file.' }, { status: 400 });
      }
    }

    const parsed = parseTextExamBlocks(text);
    const preview = parsed.questions.slice(0, 8).map((q, i) => ({
      n: i + 1,
      statement: q.statement.slice(0, 220) + (q.statement.length > 220 ? '…' : ''),
      correct_option: q.correct_option,
    }));

    return NextResponse.json({
      ok: true,
      kind,
      pages: pages ?? null,
      sourceUrl: sourceUrl ?? null,
      text,
      parsedCount: parsed.questions.length,
      parseErrors: parsed.errors.slice(0, 20),
      preview,
      tip:
        parsed.questions.length === 0
          ? 'Ajuste o texto no formato do template (1. enunciado / A–E / Gabarito: X) e envie de novo.'
          : `${parsed.questions.length} questão(ões) reconhecidas. Revise e clique em Enviar para revisão.`,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Falha na extração' },
      { status: 400 }
    );
  }
}
