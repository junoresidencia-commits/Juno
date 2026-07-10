'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function InviteGenerator() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const [invitedEmail, setInvitedEmail] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  async function generate() {
    setLoading(true);
    setError('');
    setCopied(false);
    setLink('');
    setInvitedEmail('');

    const res = await fetch('/api/admin/invites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? 'Erro ao gerar link');
      setLoading(false);
      return;
    }

    setLink(data.invite.link);
    setInvitedEmail(data.invite.email ?? email.trim().toLowerCase());
    router.refresh();
    setLoading(false);
  }

  async function copy() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
  }

  return (
    <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
      <h2 className="font-semibold text-slate-900">Convidar aluno por e-mail</h2>
      <p className="mt-1 text-sm text-slate-600">
        Informe o e-mail do aluno, gere o link e envie para ele. Só esse e-mail poderá se cadastrar; depois você libera o acesso.
      </p>
      <p className="mt-1 text-xs text-amber-700">1 convite = 1 e-mail · válido por 7 dias · sem limite de alunos</p>

      <div className="mt-4">
        <label className="block text-sm font-medium text-slate-700">E-mail do aluno</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="aluno@email.com"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      <button
        type="button"
        onClick={generate}
        disabled={loading || !email.trim()}
        className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? 'Gerando...' : 'Gerar link de convite'}
      </button>

      {link && (
        <div className="mt-4 rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-medium text-slate-600">Convite para: {invitedEmail}</p>
          <p className="mt-2 break-all text-sm text-slate-800">{link}</p>
          <button type="button" onClick={copy} className="mt-2 text-sm font-medium text-emerald-700 hover:underline">
            {copied ? 'Copiado!' : 'Copiar link'}
          </button>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
