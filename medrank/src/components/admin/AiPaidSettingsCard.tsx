'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type AiPaid = {
  enabled: boolean;
  daily_budget_usd: number;
  monthly_budget_usd: number;
  require_confirm: boolean;
};

export function AiPaidSettingsCard() {
  const [ai, setAi] = useState<AiPaid | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((d) => setAi(d.ai_paid))
      .catch(() => setAi({ enabled: false, daily_budget_usd: 0, monthly_budget_usd: 0, require_confirm: true }));
  }, []);

  async function save(enabled: boolean) {
    if (enabled) {
      const ok = window.confirm(
        'ATIVAR IA PAGA?\n\nEstimativa: regenerar 2 disputas com revisao OpenAI pode custar de ~US$ 0,50 a US$ 5 por dia.\n\nO padrao do MedRank e usar o BANCO (gratis). Continuar?'
      );
      if (!ok) return;
    }
    setBusy(true);
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enabled,
          confirm_cost: enabled ? true : undefined,
          daily_budget_usd: ai?.daily_budget_usd ?? 0,
          monthly_budget_usd: ai?.monthly_budget_usd ?? 0,
          require_confirm: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Falha ao salvar');
        return;
      }
      setAi(data.ai_paid);
      setMsg(enabled ? 'IA paga ativada (use com cuidado).' : 'IA paga desativada — padrao recomendado.');
    } finally {
      setBusy(false);
    }
  }

  if (!ai) return null;

  return (
    <section className="mb-6 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
      <h2 className="font-semibold text-slate-900">Inteligencia artificial paga</h2>
      <p className="mt-1 text-sm text-slate-600">
        Padrao: <strong>desativada</strong>. Disputas usam o banco permanente (provas publicas +
        questoes aprovadas). OpenAI so em casos excepcionais.
      </p>
      <p className="mt-2 text-sm">
        Status:{' '}
        {ai.enabled ? (
          <span className="font-semibold text-amber-800">ativada</span>
        ) : (
          <span className="font-semibold text-emerald-800">desativada</span>
        )}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy || !ai.enabled}
          onClick={() => void save(false)}
          className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
        >
          Manter / desativar IA paga
        </button>
        <button
          type="button"
          disabled={busy || ai.enabled}
          onClick={() => void save(true)}
          className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-950 disabled:opacity-50"
        >
          Ativar IA paga (com confirmacao)
        </button>
        <Link href="/admin/importar/prova" className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold">
          Importar prova
        </Link>
        <Link href="/admin/questoes/revisao" className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold">
          Fila de revisao
        </Link>
      </div>
      {msg && <p className="mt-2 text-xs text-emerald-800">{msg}</p>}
      {err && <p className="mt-2 text-xs text-red-700">{err}</p>}
    </section>
  );
}
