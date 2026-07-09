'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('admin');
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
      window.location.href = '/';
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

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-emerald-700">MedRank</h1>
          <p className="mt-2 text-sm text-slate-600">
            Competição de questões médicas — acesso restrito
          </p>
        </div>

        <div className="mb-6 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <p>O cadastro é só por <strong>link de convite</strong> do professor.</p>
          <p className="mt-1 text-xs text-slate-500">Professor: use seu login habitual (admin).</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              E-mail ou usuário
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

        <p className="mt-6 text-center text-xs text-slate-500">
          Recebeu um convite? Abra o link enviado pelo professor para criar sua conta.
        </p>
      </div>
    </div>
  );
}
