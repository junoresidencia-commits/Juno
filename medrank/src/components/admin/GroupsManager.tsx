'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type GroupRow = {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  member_count: number;
  exam_audience?: 'general' | 'nephrology';
};

export function GroupsManager({ initialGroups }: { initialGroups: GroupRow[] }) {
  const router = useRouter();
  const [groups, setGroups] = useState(initialGroups);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError('');
    setMessage('');
    const res = await fetch('/api/admin/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    const data = await res.json();
    setCreating(false);
    if (!res.ok) {
      setError(data.error ?? 'Erro ao criar grupo');
      return;
    }
    setName('');
    setDescription('');
    setGroups((prev) => [
      { ...data.group, member_count: 0 },
      ...prev,
    ]);
    if (data.group?.id) {
      router.push(`/admin/grupos/${data.group.id}`);
      router.refresh();
      return;
    }
    router.refresh();
  }

  async function handleDelete(group: GroupRow) {
    if (
      !confirm(
        `Apagar o grupo "${group.name}"?\n\nIsso remove membros, rankings e desafios deste grupo. Não tem volta.`
      )
    ) {
      return;
    }
    setLoadingId(group.id);
    setError('');
    setMessage('');
    const res = await fetch(`/api/admin/groups/${group.id}`, { method: 'DELETE' });
    const data = await res.json().catch(() => ({}));
    setLoadingId(null);
    if (!res.ok) {
      setError((data as { error?: string }).error ?? 'Erro ao apagar grupo');
      return;
    }
    setGroups((prev) => prev.filter((g) => g.id !== group.id));
    setMessage(
      (data as { archived?: boolean }).archived
        ? `Grupo "${group.name}" arquivado.`
        : `Grupo "${group.name}" apagado.`
    );
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleCreate}
        className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200"
      >
        <h2 className="font-semibold">Novo grupo</h2>
        <p className="mt-1 text-sm text-slate-600">
          Grupos com &quot;Nefrologia&quot; no nome usam a disputa Nefrologia ↔ Nefropediatria.
          Os demais usam a disputa geral diária.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">Nome *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Nome do grupo"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">Descrição</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Opcional"
            />
          </div>
        </div>
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        {message ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}
        <button
          type="submit"
          disabled={creating || loadingId !== null}
          className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {creating ? 'Criando…' : 'Criar grupo'}
        </button>
      </form>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-800">Grupos existentes</h2>
        {groups.length === 0 ? (
          <p className="text-sm text-slate-600">Nenhum grupo ainda.</p>
        ) : (
          groups.map((g) => (
            <div
              key={g.id}
              className="rounded-xl bg-white p-4 ring-1 ring-slate-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900">{g.name}</p>
                  {g.description ? (
                    <p className="text-sm text-slate-600">{g.description}</p>
                  ) : null}
                  <p className="mt-1 text-sm text-slate-600">
                    {g.member_count} {g.member_count === 1 ? 'membro' : 'membros'}
                    {' · '}
                    <span className={g.active ? 'text-emerald-700' : 'text-slate-400'}>
                      {g.active ? 'Ativo' : 'Inativo'}
                    </span>
                    {' · '}
                    <span className="text-teal-800">
                      {g.exam_audience === 'nephrology'
                        ? 'Disputa Nefrologia'
                        : 'Disputa geral'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  href={`/admin/grupos/${g.id}`}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-center text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  Abrir
                </Link>
                <button
                  type="button"
                  disabled={loadingId !== null}
                  onClick={() => handleDelete(g)}
                  className="rounded-lg border border-red-300 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-800 hover:bg-red-100 disabled:opacity-50"
                >
                  {loadingId === g.id ? 'Apagando…' : 'Excluir'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
