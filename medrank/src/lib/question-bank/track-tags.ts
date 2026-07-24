/**
 * Tags de trilha usadas na disputa diária / treino.
 * Lotes MedRank Nefro usam especialidade/área; ao publicar não podemos
 * sobrescrever só com residencia-expert (isso quebrou a geração Nefro).
 */

export const TAG_NEFRO_ADULT = 'nefrologia-avancada';
export const TAG_NEFRO_PED = 'nefropediatria';
export const TAG_RESIDENCIA = 'residencia-expert';
export const TAG_BANCO_EXPERT = 'banco-expert';
export const TAG_AUTHORIAL = 'authorial-batch';
export const TAG_AUTHORIAL_PUBLISHED = 'authorial-published';

export function isNefroLoteCodigo(lote: string | null | undefined): boolean {
  const c = String(lote || '');
  return c.startsWith('MEDRANK_NEFRO_NEFROPED_2026_LOTE_');
}

export function isDiretrizesLoteCodigo(lote: string | null | undefined): boolean {
  const c = String(lote || '');
  return c.startsWith('MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_');
}

export function isAutoralResidenciaLoteCodigo(lote: string | null | undefined): boolean {
  const c = String(lote || '');
  return c.startsWith('MEDRANK_AUTORAL_2026_LOTE_');
}

/** Inferência adulto vs ped a partir de especialidade / área / população / tags. */
export function inferNephrologyTrack(q: {
  specialty?: string | null;
  area?: string | null;
  tags?: string[] | null;
  topic?: string | null;
  subtopic?: string | null;
  lote_importacao?: string | null;
}): 'adult' | 'pediatric' | null {
  const blob = [
    q.specialty,
    q.area,
    q.topic,
    q.subtopic,
    ...(q.tags ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (/nefropediat|pedia|pediatr|infantil|crianca|neonat/.test(blob)) {
    return 'pediatric';
  }
  if (/nefrolog/.test(blob) || isNefroLoteCodigo(q.lote_importacao)) {
    return 'adult';
  }
  return null;
}

/**
 * Tags finais ao publicar um lote autoral.
 * Preserva tags de conteúdo do arquivo e garante as tags de trilha.
 */
export function buildPublishedAuthorialTags(q: {
  specialty?: string | null;
  area?: string | null;
  tags?: string[] | null;
  topic?: string | null;
  subtopic?: string | null;
  lote_importacao?: string | null;
}): string[] {
  const existing = (q.tags ?? [])
    .map(String)
    .filter((t) => t && !['draft', 'pending_review', 'rascunho'].includes(t.toLowerCase()));

  const out = new Set<string>(existing);
  out.add(TAG_AUTHORIAL);
  out.add(TAG_AUTHORIAL_PUBLISHED);
  out.add(TAG_BANCO_EXPERT);

  const track = inferNephrologyTrack(q);
  if (track === 'pediatric') {
    out.add(TAG_NEFRO_PED);
    out.add('titulo-nefrologia');
  } else if (track === 'adult') {
    out.add(TAG_NEFRO_ADULT);
    out.add('titulo-nefrologia');
  } else if (
    isAutoralResidenciaLoteCodigo(q.lote_importacao) ||
    isDiretrizesLoteCodigo(q.lote_importacao)
  ) {
    out.add(TAG_RESIDENCIA);
  } else {
    // Fallback seguro: disputa geral
    out.add(TAG_RESIDENCIA);
  }

  return [...out];
}
