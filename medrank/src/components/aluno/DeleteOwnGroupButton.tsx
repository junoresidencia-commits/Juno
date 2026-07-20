'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function DeleteOwnGroupButton({
  groupId,
  groupName,
}: {
  groupId: string;
  groupName: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleDelete() {
    if (
      !confirm(
        `Apagar a liga "${groupName}"?\n\nIsso remove membros, rankings e desafios. Não tem volta.`
      )
    ) {
      return;
    }
    setLoading(true);
    setError('');
    const res = await fetch(`/api/grupos/${groupId}`, { method: 'DELETE' });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError((data as { error?: string }).error ?? 'Falha ao apagar liga');
      return;
    }
    router.push('/aluno/grupos');
    router.refresh();
  }

  return (
    <div>
      <button
        type="button"
        disabled={loading}
        onClick={handleDelete}
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800 hover:bg-red-100 disabled:opacity-50"
      >
        {loading ? 'Apagando…' : 'Apagar liga'}
      </button>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
