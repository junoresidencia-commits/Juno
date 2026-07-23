'use client';

import { useState } from 'react';

export function EnsureDailyExamsButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(force: boolean) {
    if (force) {
      const ok = window.confirm(
        'Forçar regenerar apaga as disputas de HOJE (e tentativas) e cria de novo com revisão IA.\n\nUse se qualidade=pending, 0 questões ou prova ruim. Continuar?'
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
        body: JSON.stringify({ today: true, force }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Falha ao gerar disputa');
        return;
      }
      const createdCount =
        (data.general?.created ? 1 : 0) + (data.nephrology?.created ? 1 : 0);
      const progressBits = [data.general, data.nephrology]
        .filter(Boolean)
        .map((r: { progress?: { approved?: number; rejected?: number; target?: number; poolSize?: number }; exam?: { title?: string } }) => {
          const p = r.progress;
          if (!p) return null;
          return `aprovadas ${p.approved ?? '?'}/${p.target ?? 20} · reprovadas ${p.rejected ?? 0} · pool ${p.poolSize ?? '?'}`;
        })
        .filter(Boolean);
      if (force) {
        setMessage(
          createdCount > 0
            ? `Disputa(s) regenerada(s) com IA (${createdCount}). ${progressBits.join(' | ')} Atualize a página.`
            : 'Regeneração pedida, mas nada foi criado — veja o erro.'
        );
      } else {
        setMessage(
          createdCount > 0
            ? `Disputa(s) de hoje gerada(s) e revisada(s) pela IA (${createdCount}). ${progressBits.join(' | ')}`
            : data.general?.exam || data.nephrology?.exam
              ? 'Já existiam as disputas de hoje — use “Forçar regenerar” se estiverem ruins.'
              : 'Não foi possível criar as provas de hoje'
        );
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
          onClick={() => void run(false)}
          className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
        >
          {loading ? 'Gerando e revisando…' : 'Gerar disputa de hoje'}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => void run(true)}
          className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-60"
        >
          Forçar regenerar
        </button>
      </div>
      <p className="text-xs text-slate-600">
        Só hoje. Pipeline OpenAI: gerar → revisar → trocar → publicar com 20/20. Se já existe e
        está ruim (0 Q / pending), use <strong>Forçar regenerar</strong>. Sem{' '}
        <code className="rounded bg-slate-100 px-1">OPENAI_API_KEY</code> não publica.
      </p>
      {message && <p className="text-sm text-emerald-800">{message}</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
