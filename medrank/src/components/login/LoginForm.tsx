'use client';

import { useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const ERROR_MESSAGES: Record<string, string> = {
  invalid: 'Usuário ou senha inválidos.',
  pending: 'Cadastro recebido! Aguarde o professor liberar seu acesso.',
  unavailable: 'Sistema indisponível no momento.',
  blocked: 'Seu acesso foi bloqueado. Fale com o professor.',
};

const INPUT_CLASS =
  'mt-2 block w-full min-h-[3rem] rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200';

interface Props {
  demoMode: boolean;
}

export function LoginForm({ demoMode }: Props) {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error') ?? (searchParams.get('blocked') ? 'blocked' : null);
  const [error, setError] = useState(
    errorParam ? ERROR_MESSAGES[errorParam] ?? decodeURIComponent(errorParam) : ''
  );
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function fillDemoCredentials(user: string, password: string) {
    if (emailRef.current) emailRef.current.value = user;
    if (passwordRef.current) passwordRef.current.value = password;
    formRef.current?.requestSubmit();
  }

  if (demoMode) {
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => fillDemoCredentials('aluno', 'aluno')}
            className="exam-tap rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 disabled:opacity-50"
          >
            Entrar como aluno
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => fillDemoCredentials('professor', 'professor')}
            className="exam-tap rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          >
            Entrar como professor
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden>
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-wide">
            <span className="bg-white px-3 text-slate-500">ou use login</span>
          </div>
        </div>

        <form
          ref={formRef}
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
              ref={emailRef}
              id="email"
              name="email"
              type="text"
              required
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              enterKeyHint="next"
              placeholder="aluno"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Senha
            </label>
            <input
              ref={passwordRef}
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              enterKeyHint="go"
              placeholder="••••••••"
              className={INPUT_CLASS}
            />
          </div>

          {error && <ErrorMessage message={error} />}

          <button
            type="submit"
            disabled={loading}
            className="exam-tap w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <form
      action="/api/auth/login"
      method="POST"
      className="space-y-4"
      onSubmit={() => {
        setError('');
        setLoading(true);
      }}
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          defaultValue="junoresidencia@gmail.com"
          placeholder="seu@email.com"
          className={INPUT_CLASS}
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
          enterKeyHint="go"
          placeholder="••••••••"
          className={INPUT_CLASS}
        />
      </div>

      {error && <ErrorMessage message={error} />}

      <button
        type="submit"
        disabled={loading}
        className="exam-tap w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}

function ErrorMessage({ message }: { message: string }) {
  const isPending = message.includes('Aguarde');
  return (
    <p
      className={`rounded-xl px-4 py-3 text-sm ${
        isPending ? 'bg-amber-50 text-amber-900 ring-1 ring-amber-200' : 'bg-red-50 text-red-800 ring-1 ring-red-200'
      }`}
    >
      {message}
    </p>
  );
}
