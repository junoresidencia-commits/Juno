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
import {
  mergeExamWithGabarito,
  parseJsonQuestions,
  parseTextExamBlocks,
} from '@/lib/question-bank/import-parse';

export const maxDuration = 300;

type FileResult = ExtractedExamFile & {
  parsedCount: number;
  parseErrors: string[];
  preview: { n: number; statement: string; correct_option: string }[];
  format: 'text' | 'json';
};

function withParse(file: ExtractedExamFile, requireGabarito = true): FileResult {
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
  if (format === 'json') {
    const parsed = parseJsonQuestions(file.text);
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

  const parsed = parseTextExamBlocks(file.text, { requireGabarito });
  const missingHint =
    parsed.missingGabarito.length > 0
      ? [`Sem gabarito embutido em ${parsed.missingGabarito.length} questão(ões) — envie o gabarito.`]
      : [];
  return {
    ...file,
    format,
    parsedCount: parsed.questions.length,
    parseErrors: [...parsed.errors.slice(0, 12), ...missingHint],
    preview: parsed.questions.slice(0, 5).map((q, i) => ({
      n: i + 1,
      statement: q.statement.slice(0, 180) + (q.statement.length > 180 ? '…' : ''),
      correct_option: q.correct_option,
    })),
  };
}

/**
 * Extrai provas (PDF/Word/ZIP/URL) e opcionalmente junta com arquivo de gabarito.
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
    let gabaritoText = '';

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      const urlField = String(form.get('url') || '').trim();
      const allFiles = form.getAll('files').concat(form.getAll('file'));
      const gabaritoFile = form.get('gabarito');

      if (gabaritoFile instanceof File && gabaritoFile.size > 0) {
        const g = await extractFromNamedBuffer(gabaritoFile.name || 'gabarito.txt', await gabaritoFile.arrayBuffer());
        if (g.error || !g.text) {
          return NextResponse.json(
            { error: g.error || 'Não consegui ler o gabarito' },
            { status: 400 }
          );
        }
        gabaritoText = g.text;
      } else {
        const gabaritoUrl = String(form.get('gabarito_url') || '').trim();
        if (gabaritoUrl) {
          const g = await fetchExamSourceFromUrl(gabaritoUrl);
          gabaritoText = g.text;
        }
      }

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
              'Envie a prova (PDF/Word/TXT/ZIP/link) e, se o gabarito for separado, o arquivo de gabarito.',
          },
          { status: 400 }
        );
      }
    } else {
      const body = (await request.json().catch(() => null)) as {
        url?: string;
        content?: string;
        gabarito?: string;
        gabarito_url?: string;
      } | null;

      if (body?.gabarito?.trim()) gabaritoText = body.gabarito.trim();
      else if (body?.gabarito_url?.trim()) {
        const g = await fetchExamSourceFromUrl(body.gabarito_url);
        gabaritoText = g.text;
      }

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

    // Prova + gabarito separado → monta questões prontas
    if (gabaritoText && extracted.length >= 1) {
      const files: FileResult[] = [];
      for (const exam of extracted) {
        if (exam.error || !exam.text) {
          files.push(withParse(exam, false));
          continue;
        }
        if (exam.kind === 'json') {
          files.push(withParse(exam, true));
          continue;
        }
        const merged = mergeExamWithGabarito(exam.text, gabaritoText);
        files.push({
          filename: exam.filename,
          kind: exam.kind,
          text: merged.readyText,
          pages: exam.pages,
          sourceUrl: exam.sourceUrl,
          format: 'text',
          parsedCount: merged.questions.length,
          parseErrors: merged.errors.slice(0, 12),
          preview: merged.questions.slice(0, 5).map((q, i) => ({
            n: i + 1,
            statement: q.statement.slice(0, 180) + (q.statement.length > 180 ? '…' : ''),
            correct_option: q.correct_option,
          })),
        });
      }

      const totalQuestions = files.reduce((s, f) => s + f.parsedCount, 0);
      const first = files[0];
      return NextResponse.json({
        ok: true,
        files,
        fileCount: files.length,
        okFileCount: files.filter((f) => f.parsedCount > 0).length,
        totalQuestions,
        gabaritoApplied: true,
        kind: first?.kind ?? 'text',
        pages: first?.pages ?? null,
        sourceUrl: first?.sourceUrl ?? null,
        text: first?.text ?? '',
        parsedCount: first?.parsedCount ?? 0,
        parseErrors: first?.parseErrors ?? [],
        preview: first?.preview ?? [],
        tip:
          totalQuestions === 0
            ? 'Prova e gabarito lidos, mas não bateu o formato. Gabarito: linhas "1 C" / "1-C". Prova: 1. enunciado + A–E.'
            : `${files.length} prova(s) + gabarito → ${totalQuestions} questão(ões) prontas. Envie para revisão.`,
      });
    }

    const files = extracted.map((f) => withParse(f, true));
    const okFiles = files.filter((f) => f.parsedCount > 0);
    const totalQuestions = files.reduce((s, f) => s + f.parsedCount, 0);
    const first = files[0];

    return NextResponse.json({
      ok: true,
      files,
      fileCount: files.length,
      okFileCount: okFiles.length,
      totalQuestions,
      gabaritoApplied: false,
      kind: first?.kind ?? 'text',
      pages: first?.pages ?? null,
      sourceUrl: first?.sourceUrl ?? null,
      text: first?.text ?? '',
      parsedCount: first?.parsedCount ?? 0,
      parseErrors: first?.parseErrors ?? [],
      preview: first?.preview ?? [],
      tip:
        totalQuestions === 0
          ? 'Sem questões. Se o gabarito é arquivo separado, envie no campo Gabarito. Senão use template com "Gabarito: X" em cada questão.'
          : `${files.length} arquivo(s) · ${totalQuestions} questão(ões). Revise e envie para revisão.`,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Falha na extração' },
      { status: 400 }
    );
  }
}
