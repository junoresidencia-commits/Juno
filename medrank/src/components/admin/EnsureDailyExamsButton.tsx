'use client';

import { useState } from 'react';

export function EnsureDailyExamsButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(force: boolean, mode: 'ai' | 'bank') {
    if (mode === 'ai') {
      const ok = window.confirm(
        'IA PAGA — estimativa ~US$ 0,50 a US$ 5 por regeneração completa.\n\n' +
          'Só funciona se "Permitir IA paga" estiver ATIVADA.\n\n' +
          'Recomendado: use o banco (grátis). Continuar com IA?'
      );
      if (!ok) return;
    } else if (force) {
      const ok = window.confirm(
        'Forçar regenerar (BANCO) apaga as disputas de HOJE e monta de novo só com o banco — sem OpenAI. Continuar?'
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
        setMessage(`Disputa(s) gerada(s) via ${modeLabel} (${createdCount}). Atualize a página.`);
      } else if (data.general?.exam || data.nephrology?.exam) {
        setMessage('Já existiam as de hoje — use Forçar regenerar ou Apagar futuras.');
      } else {
        setMessage('Não foi possível criar as provas de hoje');
      }
      const err = data.general?.error || data.nephrology?.error || data.error;
      if (err) setError(err);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro de rede');
    } finally {
      setLoading(false);
    }
  }

  async function resetFromToday() {
    const ok = window.confirm(
      'Apagar TODAS as disputas diárias de HOJE em diante (incluindo as de agosto etc.) e regenerar hoje com o banco NOVO?\n\nProvas antigas já feitas por alunos no passado ficam. Continuar?'
    );
    if (!ok) return;

    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch('/api/admin/exams/reset-bank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: true }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Falha ao resetar');
        window.alert(data.error || 'Falha ao resetar');
        return;
      }
      setMessage(data.message || 'Ok');
      window.alert(data.message || 'Pronto — atualize a página.');
      window.location.reload();
    } catch (e) {
      const m = e instanceof Error ? e.message : 'Erro de rede';
      setError(m);
      window.alert(m);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        disabled={loading}
        onClick={() => void resetFromToday()}
        className="w-full rounded-xl bg-red-800 px-4 py-3 text-sm font-bold text-white hover:bg-red-900 disabled:opacity-60"
      >
        {loading ? 'Apagando e regenerando…' : 'Apagar disputas futuras e regenerar com banco novo'}
      </button>
      <p className="text-xs text-slate-600">
        Use depois de publicar os lotes novos. Some as provas pré-montadas com questões antigas e
        remonta a de hoje com o banco aprovado (oficiais + lotes).
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={loading}
          onClick={() => void run(false, 'bank')}
          className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
        >
          {loading ? 'Gerando…' : 'Gerar do banco (grátis)'}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => void run(true, 'bank')}
          className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-60"
        >
          Forçar regenerar hoje
        </button>
      </div>
      {message && <p className="text-sm text-emerald-800">{message}</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
