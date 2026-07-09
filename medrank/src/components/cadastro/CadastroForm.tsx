'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
  token: string;
  valid: boolean;
  error?: string;
}

export function CadastroForm({ token, valid, error: initialError }: Props) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(initialError ?? '');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!valid) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-center">
        <p className="text-red-800">{error || 'Link inválido'}</p>
        <Link href="/login" className="mt-4 inline-block text-sm text-emerald-700 hover:underline">
          Ir para login
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="rounded-xl bg-emerald-50 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-800">{success}</p>
        <p className="mt-2 text-sm text-emerald-700">
          Quando o professor liberar, você poderá entrar com seu e-mail e senha.
        </p>
        <Link href="/login" className="mt-4 inline-block text-sm font-medium text-emerald-700 hover:underline">
          Ir para login →
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    const res = await fetch(`/api/cadastro/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Erro ao cadastrar');
      setLoading(false);
      return;
    }

    setSuccess(data.message);
    setLoading(false);
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-slate-600">
        Você foi convidado(a) para o MedRank. Crie seu login — o professor liberará seu acesso em seguida.
      </p>

      <div>
        <label className="block text-sm font-medium">Nome completo *</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium">E-mail *</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium">Senha *</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={4} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium">Confirmar senha *</label>
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className={inputClass} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? 'Cadastrando...' : 'Criar minha conta'}
      </button>
    </form>
  );
}
