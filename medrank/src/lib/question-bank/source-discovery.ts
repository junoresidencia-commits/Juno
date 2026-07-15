import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface OfficialPortal {
  id: string;
  institution: string;
  organizer?: string;
  home: string;
  search_hints?: string[];
  notes?: string;
}

export interface OpenDataset {
  id: string;
  name: string;
  license: string;
  url: string;
  download_url?: string;
  local_file?: string;
  years_from?: number;
}

export interface DiscoveredDocument {
  institution: string;
  title: string;
  url: string;
  year: number | null;
  kind: 'portal' | 'pdf' | 'dataset' | 'edital';
  notes?: string;
}

export interface SourceDiscoveryReport {
  checkedAt: string;
  portalsOnline: number;
  portalsOffline: number;
  documents: DiscoveredDocument[];
  errors: string[];
}

function loadCatalog() {
  const path = join(process.cwd(), 'data', 'official-sources.json');
  if (!existsSync(path)) {
    return { official_portals: [] as OfficialPortal[], open_datasets: [] as OpenDataset[] };
  }
  return JSON.parse(readFileSync(path, 'utf-8')) as {
    official_portals: OfficialPortal[];
    open_datasets: OpenDataset[];
  };
}

function guessYear(text: string): number | null {
  const match = text.match(/20(2[4-9]|[3-9]\d)/);
  return match ? Number(match[0]) : null;
}

/** Verifica portais oficiais e datasets abertos (metadados/URL). Não baixa PDFs protegidos. */
export async function discoverOfficialSources(options?: {
  timeoutMs?: number;
}): Promise<SourceDiscoveryReport> {
  const timeoutMs = options?.timeoutMs ?? 6000;
  const catalog = loadCatalog();
  const documents: DiscoveredDocument[] = [];
  const errors: string[] = [];
  let portalsOnline = 0;
  let portalsOffline = 0;

  for (const dataset of catalog.open_datasets ?? []) {
    documents.push({
      institution: dataset.name,
      title: dataset.name,
      url: dataset.url,
      year: dataset.years_from ?? null,
      kind: 'dataset',
      notes: dataset.license,
    });
  }

  for (const portal of catalog.official_portals ?? []) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch(portal.home, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'User-Agent': 'MedRankBankBot/1.0 (+educational; metadata-only)' },
      });
      clearTimeout(timer);

      if (res.ok || (res.status >= 300 && res.status < 400)) {
        portalsOnline += 1;
        documents.push({
          institution: portal.institution,
          title: `Portal oficial — ${portal.institution}`,
          url: portal.home,
          year: null,
          kind: 'portal',
          notes: portal.notes,
        });
      } else {
        portalsOffline += 1;
        errors.push(`${portal.institution}: HTTP ${res.status}`);
      }
    } catch (err) {
      portalsOffline += 1;
      errors.push(
        `${portal.institution}: ${err instanceof Error ? err.message : 'falha de rede'}`
      );
    }
  }

  // Heurística: se a página listar links .pdf com anos ≥ 2024 no HTML, indexa só o link (não o conteúdo).
  // Limitado ao portal ENARE/gov quando acessível — muitos sites bloqueiam bots; falhas são aceitáveis.
  for (const portal of catalog.official_portals ?? []) {
    if (!portal.home.includes('gov.br') && !portal.home.includes('ebserh')) continue;
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch(portal.home, {
        signal: controller.signal,
        headers: { 'User-Agent': 'MedRankBankBot/1.0 (+educational; metadata-only)' },
      });
      clearTimeout(timer);
      if (!res.ok) continue;
      const html = await res.text();
      const links = [...html.matchAll(/href=["']([^"']+\.pdf[^"']*)["']/gi)].slice(0, 30);
      for (const match of links) {
        const href = match[1];
        const absolute = href.startsWith('http') ? href : new URL(href, portal.home).toString();
        const year = guessYear(absolute) ?? guessYear(html.slice(Math.max(0, match.index! - 80), match.index! + 80));
        if (year && year < 2024) continue;
        documents.push({
          institution: portal.institution,
          title: absolute.split('/').pop() || 'documento.pdf',
          url: absolute,
          year,
          kind: 'pdf',
          notes: 'Metadado público indexado — conteúdo do PDF não é importado.',
        });
      }
    } catch {
      // ignore
    }
  }

  return {
    checkedAt: new Date().toISOString(),
    portalsOnline,
    portalsOffline,
    documents,
    errors,
  };
}
