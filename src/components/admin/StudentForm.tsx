'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  disabled?: boolean;
}

export function StudentForm({ disabled }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form.entries());

    const res = await fetch('/api/admin/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Erro ao cadastrar');
      setLoading(false);
      return;
    }

    setSuccess(`Aluno cadastrado! Senha temporária: ${data.tempPassword}`);
    e.currentTarget.reset();
    router.refresh();
    setLoading(false);
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200';

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="font-semibold">Cadastrar aluno</h2>
      {disabled && (
        <p className="mt-2 text-sm text-amber-700">Limite de 10 alunos ativos atingido.</p>
      )}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Nome *</label>
          <input name="name" required disabled={disabled} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium">E-mail *</label>
          <input name="email" type="email" required disabled={disabled} className={inputClass} />
        </div>
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-3 text-sm text-emerald-700">{success}</p>}
      <button
        type="submit"
        disabled={disabled || loading}
        className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
}
