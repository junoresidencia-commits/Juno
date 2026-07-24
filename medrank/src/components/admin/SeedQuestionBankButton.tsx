'use client';

import { useState } from 'react';

export function SeedQuestionBankButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSeed() {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/questions/seed-bank', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error ?? 'Falha ao importar');
        return;
      }
      setMessage(
        `Importadas ${data.imported} (oficiais ENARE/Revalida: ${data.officialCount ?? '?'}). ` +
          `Total no banco: ${data.totalInDb}. Depois: Provas → Gerar do banco (grátis).`
      );
      window.location.reload();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Erro de rede');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={loading}
        onClick={handleSeed}
        className="rounded-lg border border-emerald-600 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 disabled:opacity-50"
      >
        {loading
          ? 'Importando banco oficial + expert…'
          : 'Importar banco completo (ENARE/Revalida oficiais)'}
      </button>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
    </div>
  );
}
