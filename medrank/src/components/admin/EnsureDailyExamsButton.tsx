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
        const createdCount =
          (data.general?.created ? 1 : 0) + (data.nephrology?.created ? 1 : 0);
        setMessage(
          createdCount > 0
            ? `Criadas ${createdCount} disputa(s) de hoje (geral + Liga de Nefrologia)`
            : data.general?.exam || data.nephrology?.exam
              ? 'Já existiam: disputa geral + Liga de Nefrologia'
              : 'Não foi possível criar as provas de hoje'
        );
        const err = data.general?.error || data.nephrology?.error;
        if (err) setError(err);
      } else {
        setMessage(
          `Geradas ${data.created} novas · verificadas ${data.checked} (próximos 14 dias)`
        );
        const firstError = (data.results ?? []).find(
          (r: { general?: { error?: string }; nephrology?: { error?: string } }) =>
            r.general?.error || r.nephrology?.error
        );
        const err = firstError?.general?.error || firstError?.nephrology?.error;
        if (err) setError(err);
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
        Pipeline automático com OpenAI obrigatória: gera 20 questões → revisa cada uma →
        reprova/substitui → 2ª passagem do lote → só publica com 20/20 aprovadas. Pode levar
        alguns minutos. Sem <code className="rounded bg-slate-100 px-1">OPENAI_API_KEY</code> não
        publica.
      </p>
      {message && <p className="text-sm text-emerald-800">{message}</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
