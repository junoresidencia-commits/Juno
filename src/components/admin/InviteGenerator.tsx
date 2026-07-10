'use client';

import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export function InviteGenerator() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const lastTapAtRef = useRef(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const [invitedEmail, setInvitedEmail] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const readEmail = useCallback(() => {
    const fromDom = emailRef.current?.value?.trim().toLowerCase() ?? '';
    return fromDom || email.trim().toLowerCase();
  }, [email]);

  const tapOnce = useCallback((action: () => void) => {
    const now = Date.now();
    if (now - lastTapAtRef.current < 300) return;
    lastTapAtRef.current = now;
    action();
  }, []);

  async function generate() {
    const emailValue = readEmail();
    if (!emailValue || !emailValue.includes('@')) {
      setError('Informe o e-mail do aluno.');
      return;
    }

    setLoading(true);
    setError('');
    setCopied(false);
    setLink('');
    setInvitedEmail('');

    try {
      const res = await fetch('/api/admin/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Erro ao gerar link');
        return;
      }

      setLink(data.invite.link);
      setInvitedEmail(data.invite.email ?? emailValue);
      router.refresh();
    } catch {
      setError('Erro de conexão. Tente de novo.');
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      setError('Não foi possível copiar. Selecione o link e copie manualmente.');
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void generate();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200"
    >
      <h2 className="font-semibold text-slate-900">Convidar aluno por e-mail</h2>
      <p className="mt-1 text-sm text-slate-600">
        Informe o e-mail do aluno, gere o link e envie para ele. Só esse e-mail poderá se cadastrar; depois você libera o acesso.
      </p>
      <p className="mt-1 text-xs text-amber-700">1 convite = 1 e-mail · válido por 7 dias · sem limite de alunos</p>

      <div className="mt-4">
        <label htmlFor="invite-email" className="block text-sm font-medium text-slate-700">
          E-mail do aluno
        </label>
        <input
          ref={emailRef}
          id="invite-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          enterKeyHint="go"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onInput={(e) => setEmail(e.currentTarget.value)}
          placeholder="aluno@email.com"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="exam-tap mt-4 w-full rounded-lg bg-emerald-600 px-4 py-3 text-base font-semibold text-white hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 sm:w-auto"
      >
        {loading ? 'Gerando...' : 'Gerar link de convite'}
      </button>

      {link && (
        <div className="mt-4 rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-medium text-slate-600">Convite para: {invitedEmail}</p>
          <p className="mt-2 break-all text-sm text-slate-800">{link}</p>
          <button
            type="button"
            onPointerUp={() => tapOnce(() => void copy())}
            onClick={() => tapOnce(() => void copy())}
            className="exam-tap mt-2 text-sm font-medium text-emerald-700 hover:underline"
          >
            {copied ? 'Copiado!' : 'Copiar link'}
          </button>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </form>
  );
}
