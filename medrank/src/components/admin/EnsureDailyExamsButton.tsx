'use client';

import { useState } from 'react';

export function EnsureDailyExamsButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(todayOnly: boolean) {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch('/api/admin/exams/ensure-daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todayOnly ? { today: true } : { days: 14 }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Falha ao gerar disputas');
        return;
      }
      if (todayOnly) {
        setMessage(
          data.created
            ? `Criada: ${data.exam?.title ?? data.date}`
            : data.exam
              ? `Já existia: ${data.exam.title}`
              : data.error || 'Não foi possível criar a prova de hoje'
        );
        if (data.error) setError(data.error);
      } else {
        setMessage(
          `Geradas ${data.created} novas · verificadas ${data.checked} (próximos 14 dias)`
        );
        const firstError = (data.results ?? []).find(
          (r: { error?: string }) => r.error
        );
        if (firstError?.error) setError(firstError.error);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro de rede');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={loading}
          onClick={() => run(true)}
          className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
        >
          {loading ? 'Gerando…' : 'Gerar disputa de hoje'}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => run(false)}
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-teal-800 ring-1 ring-teal-300 hover:bg-teal-50 disabled:opacity-60"
        >
          Pré-gerar 14 dias
        </button>
      </div>
      <p className="text-xs text-slate-600">
        Alterna automaticamente: um dia Nefrologia, outro Nefropediatria. Quem faz ganha
        pontos; quem não faz fica sem pontos no dia.
      </p>
      {message && <p className="text-sm text-emerald-800">{message}</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
