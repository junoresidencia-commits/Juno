'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  studentId: string;
  name: string;
  active: boolean;
}

export function StudentActions({ studentId, name, active }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function toggleBlock() {
    if (!confirm(`${active ? 'Bloquear' : 'Desbloquear'} ${name}?`)) return;
    setLoading('block');
    try {
      const res = await fetch(`/api/admin/students/${studentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? 'Erro');
        return;
      }
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  async function deleteStudent() {
    if (!confirm(`Excluir permanentemente ${name}? Esta ação não pode ser desfeita.`)) return;
    setLoading('delete');
    try {
      const res = await fetch(`/api/admin/students/${studentId}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? 'Erro');
        return;
      }
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={toggleBlock}
        disabled={loading !== null}
        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-50 disabled:opacity-50"
      >
        {loading === 'block' ? '...' : active ? 'Bloquear' : 'Desbloquear'}
      </button>
      <button
        type="button"
        onClick={deleteStudent}
        disabled={loading !== null}
        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
      >
        {loading === 'delete' ? '...' : 'Excluir'}
      </button>
    </div>
  );
}
