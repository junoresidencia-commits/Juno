'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type GroupRow = {
  id: string;
  name: string;
  description: string | null;
  created_by: string | null;
};

export function StudentGroupsPanel({
  userId,
  initialGroups,
}: {
  userId: string;
  initialGroups: GroupRow[];
}) {
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
    const res = await fetch('/api/grupos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError((data as { error?: string }).error ?? 'Erro ao criar grupo');
      return;
    }
    const group = (data as { group: GroupRow }).group;
    setName('');
    setDescription('');
    setGroups((prev) => [
      {
        id: group.id,
        name: group.name,
        description: group.description,
        created_by: group.created_by ?? userId,
      },
      ...prev,
    ]);
    router.push(`/aluno/grupos/${group.id}`);
    router.refresh();
  }

  async function handleDelete(group: GroupRow) {
    if (
      !confirm(
        `Apagar o grupo "${group.name}"?\n\nIsso remove membros, rankings e desafios deste grupo.`
      )
    ) {
      return;
    }
    setLoading(true);
    setError('');
    const res = await fetch(`/api/grupos/${group.id}`, { method: 'DELETE' });
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
    <div className="space-y-6">
      <form
        onSubmit={handleCreate}
        className="rounded-2xl bg-white p-5 ring-1 ring-slate-200"
      >
        <h2 className="font-semibold text-slate-900">Criar grupo</h2>
        <p className="mt-1 text-sm text-slate-600">
          Você vira o criador e pode apagar o grupo depois.
        </p>
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-800">Nome *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Ex.: Liga de Nefrologia"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-800">Descrição</label>
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
          <div className="rounded-2xl bg-white p-6 text-center text-slate-600 ring-1 ring-slate-200">
            Você ainda não participa de nenhum grupo. Crie um acima ou peça para te adicionarem.
          </div>
        ) : (
          groups.map((g) => {
            const isCreator = g.created_by === userId;
            return (
              <div
                key={g.id}
                className="flex items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 ring-1 ring-slate-200"
              >
                <Link href={`/aluno/grupos/${g.id}`} className="min-w-0 flex-1 hover:opacity-90">
                  <p className="font-semibold text-slate-900">{g.name}</p>
                  {g.description ? (
                    <p className="mt-1 text-sm text-slate-600">{g.description}</p>
                  ) : null}
                  <p className="mt-2 text-sm font-medium text-emerald-700">
                    Ver ranking do grupo →
                    {isCreator ? ' · você criou' : ''}
                  </p>
                </Link>
                {isCreator ? (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleDelete(g)}
                    className="shrink-0 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                  >
                    Apagar
                  </button>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
