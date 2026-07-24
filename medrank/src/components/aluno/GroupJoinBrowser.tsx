'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type AvailableGroup = {
  id: string;
  name: string;
  description: string | null;
};

type PendingRequest = {
  id: string;
  group_id: string;
  study_groups?: { id: string; name: string } | null;
};

export function GroupJoinBrowser({
  available,
  pending,
}: {
  available: AvailableGroup[];
  pending: PendingRequest[];
}) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [pendingIds, setPendingIds] = useState(
    () => new Set(pending.map((p) => p.group_id))
  );

  async function requestJoin(groupId: string) {
    setLoadingId(groupId);
    setError('');
    const res = await fetch(`/api/grupos/${groupId}/join-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const data = await res.json().catch(() => ({}));
    setLoadingId(null);
    if (!res.ok) {
      setError((data as { error?: string }).error ?? 'Não foi possível solicitar entrada');
      return;
    }
    setPendingIds((prev) => new Set([...prev, groupId]));
    router.refresh();
  }

  if (available.length === 0 && pending.length === 0) {
    return (
      <div className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-600 ring-1 ring-slate-200">
        Nenhum grupo social aberto no momento. O administrador pode criar faculdades, turmas,
        ligas e grupos de amigos — a entrada é por solicitação e aprovação.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pending.length > 0 ? (
        <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <p className="text-sm font-semibold text-amber-950">Solicitações pendentes</p>
          <ul className="mt-2 space-y-1 text-sm text-amber-900">
            {pending.map((p) => (
              <li key={p.id}>
                {(p.study_groups as { name?: string } | null)?.name ?? 'Grupo'} — aguardando
                aprovação do administrador
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {available.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Grupos disponíveis
          </h3>
          <p className="text-xs text-slate-600">
            Entrar em um grupo social/equipe serve para ranking e competição. Não libera a prova
            exclusiva de Nefrologia.
          </p>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {available.map((g) => {
            const isPending = pendingIds.has(g.id);
            return (
              <div
                key={g.id}
                className="flex items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 ring-1 ring-slate-200"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">{g.name}</p>
                  {g.description ? (
                    <p className="mt-1 text-sm text-slate-600">{g.description}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  disabled={loadingId === g.id || isPending}
                  onClick={() => void requestJoin(g.id)}
                  className="shrink-0 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  {isPending
                    ? 'Pendente'
                    : loadingId === g.id
                      ? 'Enviando…'
                      : 'Solicitar entrada'}
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
