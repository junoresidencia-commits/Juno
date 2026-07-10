'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function ReleaseExamButton({
  examId,
  disabled,
}: {
  examId: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [days, setDays] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRelease() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/exams/${examId}/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ release_days: days }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Erro ao liberar prova');
        return;
      }
      router.refresh();
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value) as 1 | 2)}
          className="rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
          disabled={loading || disabled}
        >
          <option value={1}>1 dia</option>
          <option value={2}>2 dias</option>
        </select>
        <button
          type="button"
          onClick={handleRelease}
          disabled={loading || disabled}
          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Liberando…' : 'Liberar prova'}
        </button>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
