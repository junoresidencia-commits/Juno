'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'medrank-onboarding-v3';

type Props = {
  disputeCount?: number;
  hasTreino?: boolean;
};

export function DisputeOnboarding({ disputeCount = 1, hasTreino = false }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="mb-5 rounded-2xl bg-teal-900 p-5 text-white">
      <p className="text-lg font-bold">Como funciona</p>
      <ul className="mt-3 space-y-2 text-sm text-teal-50">
        <li>
          <strong className="text-white">Hoje:</strong>{' '}
          {disputeCount === 1 ? '1 disputa' : `${disputeCount} disputas`} · 20 questões · 7h–23h59
        </li>
        <li>
          <strong className="text-white">1 chance</strong> — trocar de aba/app zera. Refresh ou queda de
          conexão: pode continuar.
        </li>
        <li>
          <strong className="text-white">Ranking</strong> do seu grupo
          {hasTreino ? ' · treino livre não conta' : ''}.
        </li>
      </ul>
      <button
        type="button"
        onClick={dismiss}
        className="exam-tap mt-4 w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-teal-950"
      >
        Entendi
      </button>
    </div>
  );
}
