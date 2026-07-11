'use client';

import { useState } from 'react';

interface Props {
  initialError?: string;
  initialLink?: string;
  initialEmail?: string;
}

export function InviteGenerator({ initialError, initialLink, initialEmail }: Props) {
  const [copied, setCopied] = useState(false);
  const link = initialLink ?? '';
  const invitedEmail = initialEmail ?? '';
  const error = initialError ?? '';

  async function copy() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      // fallback: user can select text manually
    }
  }

  return (
    <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
      <h2 className="font-semibold text-slate-900">Convidar aluno por e-mail</h2>
      <p className="mt-1 text-sm text-slate-600">
        Informe o e-mail do aluno, gere o link e envie para ele. Só esse e-mail poderá se cadastrar; depois você libera o acesso.
      </p>
      <p className="mt-1 text-xs text-amber-700">1 convite = 1 e-mail · válido por 7 dias · sem limite de alunos</p>

      <form action="/api/admin/invites" method="POST" className="mt-4">
        <label htmlFor="invite-email" className="block text-sm font-medium text-slate-700">
          E-mail do aluno
        </label>
        <input
          id="invite-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          enterKeyHint="go"
          required
          defaultValue={invitedEmail}
          placeholder="aluno@email.com"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />

        <button
          type="submit"
          className="exam-tap mt-4 w-full rounded-lg bg-emerald-600 px-4 py-3 text-base font-semibold text-white hover:bg-emerald-700 active:bg-emerald-800 sm:w-auto"
        >
          Gerar link de convite
        </button>
      </form>

      {link && (
        <div className="mt-4 rounded-lg bg-emerald-50 p-3 ring-1 ring-emerald-200">
          <p className="text-xs font-medium text-emerald-800">✓ Convite gerado para: {invitedEmail}</p>
          <p className="mt-2 break-all text-sm text-slate-800">{link}</p>
          <button
            type="button"
            onClick={() => void copy()}
            className="exam-tap mt-2 text-sm font-medium text-emerald-700 hover:underline"
          >
            {copied ? 'Copiado!' : 'Copiar link'}
          </button>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
