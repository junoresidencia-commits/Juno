'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function NefropediatriaLauncher({ bankCount }: { bankCount: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function start() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/treino/start', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Erro ao iniciar treino');
        return;
      }
      router.push(`/aluno/treino/nefropediatria/${data.id}`);
      router.refresh();
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        disabled={loading || bankCount < 20}
        onClick={() => void start()}
        className="w-full rounded-2xl bg-teal-700 px-6 py-5 text-lg font-bold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Montando prova…' : 'Começar treino · 20 questões'}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {bankCount < 20 && (
        <p className="text-sm text-amber-700">
          Banco ainda insuficiente para treino. Peça ao admin: Questões → Importar banco completo.
        </p>
      )}
    </div>
  );
}
