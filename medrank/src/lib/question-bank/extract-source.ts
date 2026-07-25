import 'server-only';
import { extractText } from 'unpdf';

const MAX_BYTES = 15 * 1024 * 1024; // 15 MB

/**
 * Limpa texto tipico de PDF de prova (USP/ENARE) para o parser de blocos.
 */
export function normalizeExamExtractedText(raw: string): string {
  let t = String(raw || '')
    .replace(/\r\n/g, '\n')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n');

  // Junta hifenizacao de fim de linha: "hipoten-\nsão" → "hipotensão"
  t = t.replace(/(\p{L})-\n(\p{L})/gu, '$1$2');

  // Alternativas quebradas: "A)\ntexto" → "A) texto"
  t = t.replace(/^([A-Ea-e])\s*[\)\.\-]\s*\n+/gm, (_, L: string) => `${L.toUpperCase()}) `);

  // Gabarito em linha tipica de PDF
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

export async function fetchExamSourceFromUrl(urlRaw: string): Promise<{
  text: string;
  pages?: number;
  contentType: string;
  sourceUrl: string;
}> {
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
      Accept: 'application/pdf,text/plain,text/html;q=0.8,*/*;q=0.5',
    },
    signal: AbortSignal.timeout(45_000),
  });

  if (!res.ok) {
    throw new Error(`Falha ao baixar (${res.status})`);
  }

  const contentType = (res.headers.get('content-type') || '').toLowerCase();
  const buf = await res.arrayBuffer();
  if (buf.byteLength > MAX_BYTES) throw new Error('Arquivo maior que 15 MB');

  const looksPdf =
    contentType.includes('pdf') ||
    url.pathname.toLowerCase().endsWith('.pdf') ||
    new Uint8Array(buf).slice(0, 4).every((b, i) => '%PDF'.charCodeAt(i) === b);

  if (looksPdf) {
    const { text, pages } = await extractTextFromPdfBuffer(buf);
    return { text, pages, contentType: contentType || 'application/pdf', sourceUrl: url.toString() };
  }

  if (contentType.includes('text/plain') || contentType.includes('application/json')) {
    const text = normalizeExamExtractedText(new TextDecoder('utf-8').decode(buf));
    return { text, contentType, sourceUrl: url.toString() };
  }

  if (contentType.includes('text/html') || contentType.includes('html')) {
    const html = new TextDecoder('utf-8').decode(buf);
    const text = normalizeExamExtractedText(htmlToRoughText(html));
    if (text.length < 40) throw new Error('Pouco texto na página. Prefira o PDF oficial.');
    return { text, contentType, sourceUrl: url.toString() };
  }

  // Tentativa: tratar como PDF mesmo sem content-type
  try {
    const { text, pages } = await extractTextFromPdfBuffer(buf);
    return { text, pages, contentType: contentType || 'application/octet-stream', sourceUrl: url.toString() };
  } catch {
    throw new Error('Formato não suportado. Envie PDF, TXT/JSON ou link direto do PDF.');
  }
}

function htmlToRoughText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}
