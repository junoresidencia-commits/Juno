import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { usesDemoStore } from '@/lib/demo-data';
import {
  extractFromNamedBuffer,
  extractFromZipBuffer,
  fetchExamSourceFromUrl,
  MAX_BATCH_FILES,
  type ExtractedExamFile,
} from '@/lib/question-bank/extract-source';
import { parseJsonQuestions, parseTextExamBlocks } from '@/lib/question-bank/import-parse';

export const maxDuration = 300;

type FileResult = ExtractedExamFile & {
  parsedCount: number;
  parseErrors: string[];
  preview: { n: number; statement: string; correct_option: string }[];
  format: 'text' | 'json';
};

function withParse(file: ExtractedExamFile): FileResult {
  if (file.error || !file.text) {
    return {
      ...file,
      parsedCount: 0,
      parseErrors: file.error ? [file.error] : ['Sem texto'],
      preview: [],
      format: 'text',
    };
  }
  const format = file.kind === 'json' ? 'json' : 'text';
  const parsed =
    format === 'json' ? parseJsonQuestions(file.text) : parseTextExamBlocks(file.text);
  return {
    ...file,
    format,
    parsedCount: parsed.questions.length,
    parseErrors: parsed.errors.slice(0, 12),
    preview: parsed.questions.slice(0, 5).map((q, i) => ({
      n: i + 1,
      statement: q.statement.slice(0, 180) + (q.statement.length > 180 ? '…' : ''),
      correct_option: q.correct_option,
    })),
  };
}

/**
 * Extrai 1+ provas: PDF, Word (.docx), TXT/JSON, ZIP (pasta) ou URL.
 * Não grava — preview. Depois: POST /api/admin/question-imports ou /batch.
 */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  if (usesDemoStore() || auth.demo) {
    return NextResponse.json(
      { error: 'Extração de PDF/Word/URL indisponível no demo.' },
      { status: 501 }
    );
  }

  const contentType = request.headers.get('content-type') || '';

  try {
    const extracted: ExtractedExamFile[] = [];

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      const urlField = String(form.get('url') || '').trim();
      const allFiles = form.getAll('files').concat(form.getAll('file'));

      for (const entry of allFiles) {
        if (!(entry instanceof File) || entry.size === 0) continue;
        if (extracted.length >= MAX_BATCH_FILES) break;

        const name = entry.name || 'arquivo';
        const buf = await entry.arrayBuffer();
        const ext = name.toLowerCase().split('.').pop();

        if (ext === 'zip') {
          const fromZip = await extractFromZipBuffer(buf, name);
          for (const f of fromZip) {
            if (extracted.length >= MAX_BATCH_FILES) break;
            extracted.push(f);
          }
        } else {
          extracted.push(await extractFromNamedBuffer(name, buf));
        }
      }

      if (extracted.length === 0 && urlField) {
        extracted.push(await fetchExamSourceFromUrl(urlField));
      }

      if (extracted.length === 0) {
        return NextResponse.json(
          {
            error:
              'Envie PDF, Word (.docx), TXT/JSON, ZIP com vários arquivos, ou um link.',
          },
          { status: 400 }
        );
      }
    } else {
      const body = (await request.json().catch(() => null)) as {
        url?: string;
        content?: string;
      } | null;

      if (body?.url?.trim()) {
        extracted.push(await fetchExamSourceFromUrl(body.url));
      } else if (body?.content?.trim()) {
        extracted.push({
          filename: 'texto.txt',
          kind: 'txt',
          text: body.content.trim(),
        });
      } else {
        return NextResponse.json(
          { error: 'Envie url, content ou multipart com files.' },
          { status: 400 }
        );
      }
    }

    const files = extracted.map(withParse);
    const okFiles = files.filter((f) => f.parsedCount > 0);
    const totalQuestions = files.reduce((s, f) => s + f.parsedCount, 0);

    // Compat: se só 1 arquivo, mantém campos flat da API antiga
    const first = files[0];
    return NextResponse.json({
      ok: true,
      files,
      fileCount: files.length,
      okFileCount: okFiles.length,
      totalQuestions,
      kind: first?.kind ?? 'text',
      pages: first?.pages ?? null,
      sourceUrl: first?.sourceUrl ?? null,
      text: first?.text ?? '',
      parsedCount: first?.parsedCount ?? 0,
      parseErrors: first?.parseErrors ?? [],
      preview: first?.preview ?? [],
      tip:
        totalQuestions === 0
          ? 'Nenhuma questão reconhecida. Ajuste no template (1. / A–E / Gabarito) ou confira se o PDF/Word tem texto.'
          : `${files.length} arquivo(s) · ${totalQuestions} questão(ões). Revise e envie para revisão (lote ou um a um).`,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Falha na extração' },
      { status: 400 }
    );
  }
}
