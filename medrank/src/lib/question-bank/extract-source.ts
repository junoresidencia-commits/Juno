import 'server-only';
import { extractText } from 'unpdf';
import mammoth from 'mammoth';
import JSZip from 'jszip';

const MAX_BYTES = 15 * 1024 * 1024; // 15 MB por arquivo
const MAX_BATCH_FILES = 25;

export type ExtractedExamFile = {
  filename: string;
  kind: 'pdf' | 'docx' | 'txt' | 'json' | 'url';
  text: string;
  pages?: number;
  sourceUrl?: string;
  error?: string;
};

/**
 * Limpa texto tipico de PDF/Word de prova (USP/ENARE) para o parser de blocos.
 */
export function normalizeExamExtractedText(raw: string): string {
  let t = String(raw || '')
    .replace(/\r\n/g, '\n')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n');

  t = t.replace(/(\p{L})-\n(\p{L})/gu, '$1$2');
  t = t.replace(/^([A-Ea-e])\s*[\)\.\-]\s*\n+/gm, (_, L: string) => `${L.toUpperCase()}) `);
  t = t.replace(
    /^(gabarito|resposta|alternativa\s*correta)\s*[:\-]?\s*\n+\s*([A-Ea-e])\b/gim,
    (_, g: string, L: string) => `${g}: ${L.toUpperCase()}`
  );

  return t.trim();
}

export async function extractTextFromPdfBuffer(buffer: ArrayBuffer | Uint8Array): Promise<{
  text: string;
  pages: number;
}> {
  const data = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  if (data.byteLength === 0) throw new Error('PDF vazio');
  if (data.byteLength > MAX_BYTES) throw new Error('PDF maior que 15 MB');

  const result = await extractText(data, { mergePages: true });
  const rawText = typeof result.text === 'string' ? result.text : String(result.text ?? '');
  const text = normalizeExamExtractedText(rawText);
  if (!text || text.length < 40) {
    throw new Error(
      'Pouco texto no PDF (pode ser imagem/scan). Use OCR externo ou cole o texto.'
    );
  }
  return { text, pages: result.totalPages };
}

export async function extractTextFromDocxBuffer(buffer: ArrayBuffer | Uint8Array): Promise<{
  text: string;
}> {
  const data = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  if (data.byteLength === 0) throw new Error('Word vazio');
  if (data.byteLength > MAX_BYTES) throw new Error('Word maior que 15 MB');

  const result = await mammoth.extractRawText({ buffer: Buffer.from(data) });
  const text = normalizeExamExtractedText(result.value || '');
  if (!text || text.length < 40) {
    throw new Error('Pouco texto no Word. Confira se o arquivo tem enunciados e gabarito.');
  }
  return { text };
}

function extOf(name: string): string {
  const n = name.toLowerCase();
  const i = n.lastIndexOf('.');
  return i >= 0 ? n.slice(i + 1) : '';
}

function isPdfMagic(data: Uint8Array): boolean {
  return data.length >= 4 && data[0] === 0x25 && data[1] === 0x50 && data[2] === 0x44 && data[3] === 0x46;
}

/** Extrai um arquivo solto (pdf/docx/txt/json). */
export async function extractFromNamedBuffer(
  filename: string,
  buffer: ArrayBuffer | Uint8Array
): Promise<ExtractedExamFile> {
  const data = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  const ext = extOf(filename);

  try {
    if (ext === 'pdf' || isPdfMagic(data)) {
      const { text, pages } = await extractTextFromPdfBuffer(data);
      return { filename, kind: 'pdf', text, pages };
    }
    if (ext === 'docx') {
      const { text } = await extractTextFromDocxBuffer(data);
      return { filename, kind: 'docx', text };
    }
    if (ext === 'doc') {
      return {
        filename,
        kind: 'docx',
        text: '',
        error: 'Word antigo (.doc) não suportado. Salve como .docx ou PDF.',
      };
    }
    if (ext === 'txt' || ext === 'md') {
      const text = normalizeExamExtractedText(new TextDecoder('utf-8').decode(data));
      return { filename, kind: 'txt', text };
    }
    if (ext === 'json') {
      const text = new TextDecoder('utf-8').decode(data);
      return { filename, kind: 'json', text };
    }
    // tentativa PDF
    if (isPdfMagic(data)) {
      const { text, pages } = await extractTextFromPdfBuffer(data);
      return { filename, kind: 'pdf', text, pages };
    }
    return {
      filename,
      kind: 'txt',
      text: '',
      error: 'Formato não suportado (use PDF, DOCX, TXT, JSON ou ZIP).',
    };
  } catch (e) {
    return {
      filename,
      kind: ext === 'docx' ? 'docx' : ext === 'pdf' ? 'pdf' : 'txt',
      text: '',
      error: e instanceof Error ? e.message : 'Falha na extração',
    };
  }
}

/** Expande ZIP com provas (PDF/Word/TXT) e extrai cada uma. */
export async function extractFromZipBuffer(
  buffer: ArrayBuffer | Uint8Array,
  zipName = 'provas.zip'
): Promise<ExtractedExamFile[]> {
  const data = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  if (data.byteLength > MAX_BYTES * 2) throw new Error('ZIP maior que 30 MB');

  const zip = await JSZip.loadAsync(data);
  const entries = Object.keys(zip.files)
    .filter((name) => {
      const f = zip.files[name];
      if (f.dir) return false;
      if (name.startsWith('__MACOSX') || name.includes('/.')) return false;
      const ext = extOf(name);
      return ['pdf', 'docx', 'txt', 'json', 'md'].includes(ext);
    })
    .slice(0, MAX_BATCH_FILES);

  if (entries.length === 0) {
    return [
      {
        filename: zipName,
        kind: 'txt',
        text: '',
        error: 'ZIP sem PDF/DOCX/TXT/JSON úteis.',
      },
    ];
  }

  const out: ExtractedExamFile[] = [];
  for (const name of entries) {
    const ab = await zip.files[name].async('arraybuffer');
    const base = name.split('/').pop() || name;
    out.push(await extractFromNamedBuffer(base, ab));
  }
  return out;
}

export async function fetchExamSourceFromUrl(urlRaw: string): Promise<ExtractedExamFile> {
  let url: URL;
  try {
    url = new URL(urlRaw.trim());
  } catch {
    throw new Error('URL inválida');
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Só http/https');
  }

  const res = await fetch(url.toString(), {
    redirect: 'follow',
    headers: {
      'User-Agent': 'MedRankImport/1.0 (admin exam import)',
      Accept:
        'application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/html;q=0.8,*/*;q=0.5',
    },
    signal: AbortSignal.timeout(45_000),
  });

  if (!res.ok) throw new Error(`Falha ao baixar (${res.status})`);

  const contentType = (res.headers.get('content-type') || '').toLowerCase();
  const buf = await res.arrayBuffer();
  if (buf.byteLength > MAX_BYTES) throw new Error('Arquivo maior que 15 MB');

  const pathName = url.pathname.toLowerCase();
  const guessName =
    pathName.split('/').pop() ||
    (contentType.includes('word') || pathName.endsWith('.docx')
      ? 'prova.docx'
      : contentType.includes('pdf') || pathName.endsWith('.pdf')
        ? 'prova.pdf'
        : 'prova.txt');

  if (pathName.endsWith('.zip') || contentType.includes('zip')) {
    const files = await extractFromZipBuffer(buf, guessName);
    // URL zip: devolve o primeiro ok; lote completo via multipart
    const ok = files.find((f) => f.text && !f.error);
    if (!ok) throw new Error(files[0]?.error || 'ZIP sem conteúdo útil');
    return { ...ok, sourceUrl: url.toString(), kind: 'url' };
  }

  const file = await extractFromNamedBuffer(guessName, buf);
  if (file.error) throw new Error(file.error);
  return { ...file, sourceUrl: url.toString(), kind: 'url' };
}

export { MAX_BATCH_FILES };
