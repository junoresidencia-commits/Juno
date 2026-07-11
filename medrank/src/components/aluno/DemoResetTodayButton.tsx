'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DemoResetTodayButton({ examId }: { examId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function reset() {
    if (!confirm('Apagar sua prova de hoje e começar de novo? (só demo)')) return;
    setLoading(true);
    const res = await fetch('/api/demo/reset-today-attempt', { method: 'POST' });
    if (!res.ok) {
      alert('Não foi possível reiniciar');
      setLoading(false);
      return;
    }
    router.push(`/aluno/prova/${examId}`);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={reset}
      disabled={loading}
      className="mt-3 w-full text-center text-sm text-slate-500 underline-offset-2 hover:text-emerald-700 hover:underline disabled:opacity-50"
    >
      {loading ? 'Reiniciando...' : 'Refazer prova de hoje (demo)'}
    </button>
  );
}
