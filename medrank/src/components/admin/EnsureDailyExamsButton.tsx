'use client';

import { useState } from 'react';

export function EnsureDailyExamsButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch('/api/admin/exams/ensure-daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ today: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Falha ao gerar disputa');
        return;
      }
      const createdCount =
        (data.general?.created ? 1 : 0) + (data.nephrology?.created ? 1 : 0);
      setMessage(
        createdCount > 0
          ? `Disputa(s) de hoje gerada(s) e revisada(s) pela IA (${createdCount}).`
          : data.general?.exam || data.nephrology?.exam
            ? 'Já existiam as disputas de hoje — não reprocessa (1×/dia).'
            : 'Não foi possível criar as provas de hoje'
      );
      const err = data.general?.error || data.nephrology?.error || data.error;
      if (err) setError(err);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro de rede');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={loading}
        onClick={run}
        className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
      >
        {loading ? 'Gerando e revisando…' : 'Gerar disputa de hoje'}
      </button>
      <p className="text-xs text-slate-600">
        Só hoje, uma vez por dia (geral + Liga de Nefrologia). Pipeline OpenAI: gerar →
        revisar → trocar → publicar com 20/20. Se a disputa do dia já existe, não refaz.
        Sem <code className="rounded bg-slate-100 px-1">OPENAI_API_KEY</code> não publica.
      </p>
      {message && <p className="text-sm text-emerald-800">{message}</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
