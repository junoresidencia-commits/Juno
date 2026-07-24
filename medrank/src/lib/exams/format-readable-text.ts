/** Texto legível na prova (mobile/desktop): remove quebras ruins de PDF/import. */
export function formatExamReadableText(raw: string): string {
  return String(raw || '')
    .replace(/\u00ad/g, '') // soft hyphen
    .replace(/\u200b/g, '') // zero-width space
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    // Quebras simples viram espaço (comum em enunciados importados)
    .replace(/([^\n])\n([^\n])/g, '$1 $2')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}
