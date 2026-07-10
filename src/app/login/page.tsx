'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DEMO_ACCESS } from '@/lib/demo/credentials';

export default function LoginPage() {
  const [email, setEmail] = useState('professor');
  const [password, setPassword] = useState('professor');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/demo-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = data.role === 'admin' ? '/admin' : '/aluno';
      return;
    }

    if (data.pending) {
      setError(data.error);
      setLoading(false);
      return;
    }

    const supabase = await import('@/lib/supabase/client').then((m) => m.createClient());
    const loginEmail = email.includes('@') ? email : `${email}@medrank.com`;
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    });

    if (authError) {
      setError('E-mail ou senha inválidos.');
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('active, approved_at')
      .eq('id', authData.user.id)
      .single();

    if (profile && !profile.active) {
      await supabase.auth.signOut();
      setError(
        profile.approved_at
          ? 'Seu acesso foi bloqueado. Fale com o professor.'
          : 'Cadastro recebido! Aguarde o professor liberar seu acesso.'
      );
      setLoading(false);
      return;
    }

    window.location.href = '/';
  }

  function fill(role: 'professor' | 'aluno') {
    setEmail(DEMO_ACCESS[role].user);
    setPassword(DEMO_ACCESS[role].password);
    setError('');
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-slate-900 shadow-lg ring-1 ring-slate-200">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-emerald-700">MedRank</h1>
          <p className="mt-2 text-sm text-slate-600">
            Prova diária e ranking — entre com sua conta
          </p>
        </div>

        <div className="mb-6 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => fill('professor')}
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-sm text-emerald-950 hover:bg-emerald-100"
          >
            <span className="font-semibold">Professor</span>
            <span className="mt-0.5 block text-xs text-emerald-800">
              {DEMO_ACCESS.professor.user} / {DEMO_ACCESS.professor.password}
            </span>
          </button>
          <button
            type="button"
            onClick={() => fill('aluno')}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm text-slate-900 hover:bg-slate-100"
          >
            <span className="font-semibold">Aluno</span>
            <span className="mt-0.5 block text-xs text-slate-600">
              {DEMO_ACCESS.aluno.user} / {DEMO_ACCESS.aluno.password}
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Usuário ou e-mail
            </label>
            <input
              id="email"
              type="text"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          {error && (
            <p className={`rounded-lg px-3 py-2 text-sm ${
              error.includes('Aguarde') ? 'bg-amber-50 text-amber-800' : 'bg-red-50 text-red-700'
            }`}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-600">
          Novo aluno? O professor envia um <strong>link de convite</strong> por e-mail.
        </p>
      </div>
    </div>
  );
}
