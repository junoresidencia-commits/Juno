'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/** Um toque: corrige tags dos lotes já publicados. */
export function RepairLotTagsButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function run() {
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch('/api/admin/questions/bank-inventory', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || 'Falha ao corrigir');
      } else {
        setMsg(data.message || `Corrigidas ${data.updated} questões`);
        router.refresh();
      }
    } catch {
      setMsg('Erro de conexão');
    }
    setLoading(false);
  }

  return (
    <div>
      <button
        type="button"
        disabled={loading}
        onClick={() => void run()}
        className="rounded-xl bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-900 disabled:opacity-50"
      >
        {loading ? 'Corrigindo…' : 'Corrigir tags dos lotes agora'}
      </button>
      {msg ? <p className="mt-2 text-sm text-slate-700">{msg}</p> : null}
    </div>
  );
}
