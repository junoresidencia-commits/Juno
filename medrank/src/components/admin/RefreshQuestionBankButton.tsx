'use client';

import { useState } from 'react';

type HotTopic = { specialty: string; topic: string; count: number; share: number };

type RefreshResult = {
  ok?: boolean;
  error?: string;
  upserted?: number;
  generatedOriginals?: number;
  totalInDb?: number;
  discovery?: {
    portalsOnline?: number;
    portalsOffline?: number;
    indexedDocuments?: number;
    publicPdfLinksFrom2024?: number;
  };
  incidence?: { hotTopics?: HotTopic[] };
  policy?: string;
};

export function RefreshQuestionBankButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [hotTopics, setHotTopics] = useState<HotTopic[]>([]);

  async function handleRefresh() {
    setLoading(true);
    setMessage('');
    setHotTopics([]);
    try {
      const res = await fetch('/api/admin/questions/refresh-bank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maxGenerate: 120 }),
      });
      const data = (await res.json()) as RefreshResult;
      if (!res.ok) {
        setMessage(data.error ?? 'Falha ao atualizar');
        return;
      }
      const d = data.discovery;
      setMessage(
        [
          `Upsert: ${data.upserted ?? 0} · originais gerados: ${data.generatedOriginals ?? 0} · total DB: ${data.totalInDb ?? '—'}`,
          d
            ? `Fontes: ${d.portalsOnline ?? 0} portais online, ${d.indexedDocuments ?? 0} docs indexados, ${d.publicPdfLinksFrom2024 ?? 0} PDFs públicos ≥2024 (só links).`
            : null,
          data.policy,
        ]
          .filter(Boolean)
          .join('\n')
      );
      setHotTopics(data.incidence?.hotTopics ?? []);
      window.setTimeout(() => window.location.reload(), 1800);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Erro de rede');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 space-y-2 border-t border-emerald-200 pt-4">
      <button
        type="button"
        disabled={loading}
        onClick={handleRefresh}
        className="rounded-lg border border-sky-700 bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800 disabled:opacity-50"
      >
        {loading
          ? 'Atualizando (fontes + incidência + originais)…'
          : 'Atualizar banco (busca fontes + gera originais)'}
      </button>
      {message ? (
        <pre className="whitespace-pre-wrap text-sm text-slate-700">{message}</pre>
      ) : null}
      {hotTopics && hotTopics.length > 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Temas quentes (incidência)
          </p>
          <ul className="grid gap-1 text-sm text-slate-700 sm:grid-cols-2">
            {hotTopics.map((t) => (
              <li key={`${t.specialty}-${t.topic}`}>
                {t.topic}{' '}
                <span className="text-slate-400">
                  ({t.specialty} · {t.count} · {t.share}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
