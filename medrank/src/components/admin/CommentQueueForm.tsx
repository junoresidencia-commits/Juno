'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  questionId: string;
  initialExplanation: string;
}

export function CommentQueueForm({ questionId, initialExplanation }: Props) {
  const router = useRouter();
  const [explanation, setExplanation] = useState(initialExplanation);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    if (explanation.trim().length < 50) {
      alert('Comentário deve ter pelo menos 50 caracteres.');
      return;
    }
    setLoading(true);
    setSaved(false);
    try {
      const res = await fetch('/api/admin/questions/explanation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, explanation: explanation.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error ?? 'Erro ao salvar');
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      alert('Erro de conexão');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-3 space-y-2">
      <textarea
        value={explanation}
        onChange={(e) => {
          setExplanation(e.target.value);
          setSaved(false);
        }}
        rows={4}
        placeholder="Explique o raciocínio clínico, por que as outras alternativas estão erradas..."
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={loading}
          onClick={save}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar comentário'}
        </button>
        {saved && <span className="text-sm text-emerald-700">Salvo ✓</span>}
        <span className="text-xs text-slate-500">{explanation.trim().length} caracteres</span>
      </div>
    </div>
  );
}
