'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const ERROR_MESSAGES: Record<string, string> = {
  invalid: 'Usuário ou senha inválidos.',
  pending: 'Cadastro recebido! Aguarde o professor liberar seu acesso.',
  unavailable: 'Sistema indisponível no momento.',
  blocked: 'Seu acesso foi bloqueado. Fale com o professor.',
};

interface Props {
  demoMode: boolean;
}

export function LoginForm({ demoMode }: Props) {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('error') ?? (searchParams.get('blocked') ? 'blocked' : null);
  const [error, setError] = useState(
    errorCode ? ERROR_MESSAGES[errorCode] ?? 'Não foi possível entrar.' : ''
  );
  const [loading, setLoading] = useState(false);

  if (demoMode) {
    return (
      <form
        action="/api/auth/demo-login"
        method="POST"
        className="space-y-4"
        onSubmit={() => setLoading(true)}
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Usuário ou e-mail
          </label>
          <input
            id="email"
            name="email"
            type="text"
            required
            autoComplete="username"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        {error && (
          <p
            className={`rounded-lg px-3 py-2 text-sm ${
              error.includes('Aguarde') ? 'bg-amber-50 text-amber-800' : 'bg-red-50 text-red-700'
            }`}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="exam-tap w-full rounded-lg bg-emerald-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    );
  }

  return <SupabaseLoginForm initialError={error} />;
}

function SupabaseLoginForm({ initialError }: { initialError: string }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

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
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
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
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      {error && (
        <p
          className={`rounded-lg px-3 py-2 text-sm ${
            error.includes('Aguarde') ? 'bg-amber-50 text-amber-800' : 'bg-red-50 text-red-700'
          }`}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="exam-tap w-full rounded-lg bg-emerald-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
