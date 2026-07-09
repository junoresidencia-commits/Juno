'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function InviteGenerator() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  async function generate() {
    setLoading(true);
    setError('');
    setCopied(false);

    const res = await fetch('/api/admin/invites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? 'Erro ao gerar link');
      setLoading(false);
      return;
    }

    setLink(data.invite.link);
    router.refresh();
    setLoading(false);
  }

  async function copy() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="font-semibold">Gerar link de convite</h2>
      <p className="mt-1 text-sm text-slate-600">
        Envie este link para o aluno. Ele cria o e-mail e senha, e você libera o acesso depois.
      </p>
      <p className="mt-1 text-xs text-amber-700">Cada link vale para 1 cadastro · válido por 7 dias</p>

      <button
        type="button"
        onClick={generate}
        disabled={loading}
        className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? 'Gerando...' : 'Gerar novo link'}
      </button>

      {link && (
        <div className="mt-4 rounded-lg bg-slate-50 p-3">
          <p className="break-all text-sm text-slate-800">{link}</p>
          <button type="button" onClick={copy} className="mt-2 text-sm font-medium text-emerald-700 hover:underline">
            {copied ? 'Copiado!' : 'Copiar link'}
          </button>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
