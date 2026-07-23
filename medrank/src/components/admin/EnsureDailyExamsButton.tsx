'use client';

import { useState } from 'react';

export function EnsureDailyExamsButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(force: boolean, mode: 'bank' | 'ai') {
    if (mode === 'ai') {
      const ok = window.confirm(
        'IA PAGA — estimativa ~US$ 0,50 a US$ 5 por regeneração completa.\n\n' +
          'Só funciona se "Permitir IA paga" estiver ATIVADA em Admin → Provas.\n\n' +
          'Recomendado: use Gerar do banco (grátis). Continuar com IA?'
      );
      if (!ok) return;
    } else if (force) {
      const ok = window.confirm(
        'Forçar regenerar (BANCO) apaga as disputas de HOJE e monta de novo só com o banco local — sem custo OpenAI. Continuar?'
      );
      if (!ok) return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch('/api/admin/exams/ensure-daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ today: true, force, mode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Falha ao gerar disputa');
        return;
      }
      const createdCount =
        (data.general?.created ? 1 : 0) + (data.nephrology?.created ? 1 : 0);
      const modeLabel = data.mode === 'ai' ? 'IA' : 'banco local';
      if (createdCount > 0) {
        setMessage(
          `Disputa(s) gerada(s) via ${modeLabel} (${createdCount}). Atualize a pagina.`
        );
      } else if (data.general?.exam || data.nephrology?.exam) {
        setMessage(
          'Ja existiam as disputas de hoje — use Forcar regenerar (banco) se estiverem ruins.'
        );
      } else {
        setMessage('Nao foi possivel criar as provas de hoje');
      }
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
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={loading}
          onClick={() => void run(false, 'bank')}
          className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
        >
          {loading ? 'Gerando…' : 'Gerar do banco (gratis)'}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => void run(true, 'bank')}
          className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-60"
        >
          Forçar regenerar (banco)
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => void run(true, 'ai')}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          Regenerar com IA (pago)
        </button>
      </div>
      <p className="text-xs text-slate-600">
        <strong>Recomendado:</strong> Gerar do banco — sorteia questões já aprovadas (provas
        públicas + banco MedRank), sem gastar OpenAI. Fluxo: Importar prova → Revisar → Gerar.
      </p>
      <p className="text-xs text-slate-500">
        Provas da internet: só importe material com direito de uso (fontes oficiais públicas). Não
        copie prova comercial sem autorização. Ver docs/BANCO-PROVAS-PUBLICAS.md.
      </p>
      {message && <p className="text-sm text-emerald-800">{message}</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
