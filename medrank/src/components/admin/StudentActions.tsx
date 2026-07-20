'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMobileAction } from '@/hooks/use-mobile-action';

interface Props {
  studentId: string;
  name: string;
  active: boolean;
  pending: boolean;
  leagueAdmin?: boolean;
}

export function StudentActions({
  studentId,
  name,
  active,
  pending,
  leagueAdmin = false,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function apiCall(method: string, body?: object) {
    try {
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
    } catch {
      alert('Erro de conexão. Tente de novo.');
      return false;
    }
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

  async function toggleLeagueAdmin() {
    if (
      !confirm(
        leagueAdmin
          ? `Remover ${name} como administrador de liga? Ele não poderá mais criar ligas.`
          : `Tornar ${name} administrador de liga?\n\nEle poderá criar ligas (grupos) e apagar as que criar.`
      )
    ) {
      return;
    }
    setLoading('league');
    await apiCall('PATCH', {
      action: leagueAdmin ? 'revoke_league_admin' : 'make_league_admin',
    });
    setLoading(null);
  }

  async function deleteStudent() {
    if (!confirm(`Excluir permanentemente ${name}?`)) return;
    setLoading('delete');
    await apiCall('DELETE');
    setLoading(null);
  }

  const approveHandlers = useMobileAction(approve);
  const blockHandlers = useMobileAction(toggleBlock);
  const leagueHandlers = useMobileAction(toggleLeagueAdmin);
  const deleteHandlers = useMobileAction(deleteStudent);

  return (
    <div className="flex flex-wrap gap-2">
      {pending && (
        <button
          type="button"
          disabled={loading !== null}
          {...approveHandlers}
          className="exam-tap rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading === 'approve' ? '...' : 'Liberar acesso'}
        </button>
      )}
      {!pending && (
        <button
          type="button"
          disabled={loading !== null}
          {...blockHandlers}
          className="exam-tap rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
        >
          {loading === 'block' ? '...' : active ? 'Bloquear' : 'Desbloquear'}
        </button>
      )}
      {!pending && active && (
        <button
          type="button"
          disabled={loading !== null}
          {...leagueHandlers}
          className={`exam-tap rounded-lg border px-4 py-2.5 text-sm font-medium disabled:opacity-50 ${
            leagueAdmin
              ? 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
              : 'border-slate-300 hover:bg-slate-50'
          }`}
        >
          {loading === 'league'
            ? '...'
            : leagueAdmin
              ? 'Remover admin de liga'
              : 'Tornar admin de liga'}
        </button>
      )}
      <button
        type="button"
        disabled={loading !== null}
        {...deleteHandlers}
        className="exam-tap rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
      >
        {loading === 'delete' ? '...' : 'Excluir'}
      </button>
    </div>
  );
}
