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
      .catch(() =>
        setAi({ enabled: false, daily_budget_usd: 0, monthly_budget_usd: 0, require_confirm: true })
      );
  }, []);

  async function save(enabled: boolean) {
    if (enabled) {
      const ok = window.confirm(
        'Ativar IA paga?\n\nO padrão do MedRank é o banco (grátis). Continuar?'
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
      setMsg(enabled ? 'IA paga ativada.' : 'IA paga desativada.');
    } finally {
      setBusy(false);
    }
  }

  if (!ai) return null;

  return (
    <section className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-900">IA paga (OpenAI)</h3>
          <p className="text-sm text-slate-600">
            Status:{' '}
            <span className={ai.enabled ? 'font-semibold text-amber-800' : 'font-semibold text-emerald-800'}>
              {ai.enabled ? 'ativada' : 'desativada (recomendado)'}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {ai.enabled ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => void save(false)}
              className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
            >
              Desativar
            </button>
          ) : (
            <button
              type="button"
              disabled={busy}
              onClick={() => void save(true)}
              className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-950 disabled:opacity-50"
            >
              Ativar
            </button>
          )}
          <Link
            href="/admin/importar/prova"
            className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-800"
          >
            Importar prova
          </Link>
        </div>
      </div>
      {msg && <p className="mt-2 text-xs text-emerald-800">{msg}</p>}
      {err && <p className="mt-2 text-xs text-red-700">{err}</p>}
    </section>
  );
}
