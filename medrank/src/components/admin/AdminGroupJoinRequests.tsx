'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type JoinRequest = {
  id: string;
  user_id: string;
  created_at: string;
  profiles?: { name?: string; email?: string } | null;
};

export function AdminGroupJoinRequests({
  groupId,
  initialRequests,
}: {
  groupId: string;
  initialRequests: JoinRequest[];
}) {
  const router = useRouter();
  const [requests, setRequests] = useState(initialRequests);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function resolve(requestId: string, action: 'approve' | 'reject') {
    setLoading(requestId);
    setError('');
    const res = await fetch(`/api/grupos/${groupId}/join-requests/${requestId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(null);
    if (!res.ok) {
      setError((data as { error?: string }).error ?? 'Falha ao resolver');
      return;
    }
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
    router.refresh();
  }

  return (
    <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
      <h3 className="font-semibold text-amber-950">Solicitações pendentes</h3>
      {requests.length === 0 ? (
        <p className="mt-2 text-sm text-amber-900">Nenhuma solicitação no momento.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {requests.map((r) => (
            <li
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-3 py-2"
            >
              <span className="text-sm text-slate-900">
                {(r.profiles as { name?: string } | null)?.name ?? 'Aluno'}
                {(r.profiles as { email?: string } | null)?.email
                  ? ` · ${(r.profiles as { email?: string }).email}`
                  : ''}
              </span>
              <span className="flex gap-2">
                <button
                  type="button"
                  disabled={!!loading}
                  onClick={() => void resolve(r.id, 'approve')}
                  className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white"
                >
                  Aceitar
                </button>
                <button
                  type="button"
                  disabled={!!loading}
                  onClick={() => void resolve(r.id, 'reject')}
                  className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium"
                >
                  Recusar
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
