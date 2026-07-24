'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatPriceBrl } from '@/lib/billing/pix';

export function GeneratePaidInviteForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [link, setLink] = useState('');
  const [copied, setCopied] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setLink('');
    try {
      const res = await fetch('/api/admin/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          note: `Assinatura ${formatPriceBrl()}/mês · PIX`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Não foi possível gerar o link');
      } else {
        setLink(data.invite?.link || '');
        setEmail('');
        router.refresh();
      }
    } catch {
      setError('Erro de conexão');
    }
    setLoading(false);
  }

  async function copyLink() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
      <h2 className="font-semibold text-slate-900">Gerar link de pagamento</h2>
      <p className="mt-1 text-sm text-slate-600">
        O aluno abre o link, cria e-mail/senha, vê o PIX de {formatPriceBrl()}/mês. A conta só
        libera depois que você confirmar o pagamento.
      </p>
      <form onSubmit={(e) => void submit(e)} className="mt-4 space-y-3">
        <div>
          <label htmlFor="paid-email" className="block text-sm font-medium text-slate-700">
            E-mail do aluno
          </label>
          <input
            id="paid-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="aluno@email.com"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200"
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="exam-tap w-full rounded-xl bg-teal-800 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-900 disabled:opacity-50"
        >
          {loading ? 'Gerando…' : 'Gerar link'}
        </button>
      </form>

      {link ? (
        <div className="mt-4 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
          <p className="text-sm font-semibold text-emerald-900">Link pronto — envie ao aluno</p>
          <p className="mt-2 break-all text-sm text-emerald-950">{link}</p>
          <button
            type="button"
            onClick={() => void copyLink()}
            className="exam-tap mt-3 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white"
          >
            {copied ? 'Copiado!' : 'Copiar link'}
          </button>
        </div>
      ) : null}
    </div>
  );
}
