'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type JoinRequest = {
  id: string;
  user_id: string;
  created_at: string;
  profiles?: { name?: string; email?: string } | null;
};

export function GroupJoinRequestsPanel({
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
      setError((data as { error?: string }).error ?? 'Falha ao resolver solicitação');
      return;
    }
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
    router.refresh();
  }

  if (requests.length === 0) return null;

  return (
    <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
      <h2 className="font-semibold text-amber-950">Solicitações de entrada</h2>
      <p className="mt-1 text-sm text-amber-900">
        Aceite ou recuse. O aluno só entra após aprovação.
      </p>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      <ul className="mt-4 space-y-3">
        {requests.map((r) => {
          const name = (r.profiles as { name?: string } | null)?.name ?? 'Aluno';
          const email = (r.profiles as { email?: string } | null)?.email ?? '';
          return (
            <li
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 ring-1 ring-amber-100"
            >
              <div>
                <p className="font-medium text-slate-900">{name}</p>
                {email ? <p className="text-xs text-slate-600">{email}</p> : null}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={loading === r.id}
                  onClick={() => void resolve(r.id, 'approve')}
                  className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Aceitar
                </button>
                <button
                  type="button"
                  disabled={loading === r.id}
                  onClick={() => void resolve(r.id, 'reject')}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 disabled:opacity-50"
                >
                  Recusar
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
