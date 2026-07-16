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
};

export function GroupsManager({ initialGroups }: { initialGroups: GroupRow[] }) {
  const router = useRouter();
  const [groups, setGroups] = useState(initialGroups);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    const data = await res.json();
    setLoading(false);
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

  async function handleDelete(group: GroupRow, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (
      !confirm(
        `Apagar o grupo "${group.name}"?\n\nIsso remove membros, rankings e desafios deste grupo.`
      )
    ) {
      return;
    }
    setLoading(true);
    setError('');
    const res = await fetch(`/api/admin/groups/${group.id}`, { method: 'DELETE' });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError((data as { error?: string }).error ?? 'Erro ao apagar grupo');
      return;
    }
    setGroups((prev) => prev.filter((g) => g.id !== group.id));
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
          Ex.: Liga Acadêmica de Nefrologia, Turma ENARE 2027, R1 Clínica Médica…
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
        <button
          type="submit"
          disabled={loading}
          className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Criando…' : 'Criar grupo'}
        </button>
      </form>

      <div className="space-y-3">
        {groups.length === 0 ? (
          <p className="text-sm text-slate-600">Nenhum grupo ainda.</p>
        ) : (
          groups.map((g) => (
            <div
              key={g.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-4 ring-1 ring-slate-200"
            >
              <Link href={`/admin/grupos/${g.id}`} className="min-w-0 flex-1 hover:opacity-90">
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
                </p>
              </Link>
              <button
                type="button"
                disabled={loading}
                onClick={(e) => handleDelete(g, e)}
                className="shrink-0 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
              >
                Excluir
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
