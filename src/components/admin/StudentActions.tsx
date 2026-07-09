'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  studentId: string;
  name: string;
  active: boolean;
  pending: boolean;
}

export function StudentActions({ studentId, name, active, pending }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function apiCall(method: string, body?: object) {
    const res = await fetch(`/api/admin/students/${studentId}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error ?? 'Erro');
      return false;
    }
    router.refresh();
    return true;
  }

  async function approve() {
    if (!confirm(`Liberar acesso de ${name}?`)) return;
    setLoading('approve');
    await apiCall('PATCH', { action: 'approve' });
    setLoading(null);
  }

  async function toggleBlock() {
    if (!confirm(`${active ? 'Bloquear' : 'Desbloquear'} ${name}?`)) return;
    setLoading('block');
    await apiCall('PATCH', { action: active ? 'block' : 'unblock' });
    setLoading(null);
  }

  async function deleteStudent() {
    if (!confirm(`Excluir permanentemente ${name}?`)) return;
    setLoading('delete');
    await apiCall('DELETE');
    setLoading(null);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {pending && (
        <button
          type="button"
          onClick={approve}
          disabled={loading !== null}
          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading === 'approve' ? '...' : 'Liberar acesso'}
        </button>
      )}
      {!pending && (
        <button
          type="button"
          onClick={toggleBlock}
          disabled={loading !== null}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-50 disabled:opacity-50"
        >
          {loading === 'block' ? '...' : active ? 'Bloquear' : 'Desbloquear'}
        </button>
      )}
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
