'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'medrank-onboarding-v2';

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
    <div className="mb-5 rounded-2xl bg-emerald-700 p-5 text-white shadow-md">
      <p className="text-lg font-bold">Em 30 segundos</p>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-emerald-50">
        <li>
          <strong className="text-white">Disputa do dia</strong> — você tem{' '}
          {disputeCount === 1 ? '1 disputa' : `${disputeCount} disputas`} hoje
          {disputeCount > 1 ? ' (uma por módulo/grupo)' : ''}. Cada uma conta sozinha.
        </li>
        <li>
          <strong className="text-white">1 chance por disputa</strong> — 20 questões · 7h–23h59.
          Fique na tela: trocar de aba/app encerra com 0 pts. Refresh ou queda de conexão não
          zera — você pode continuar.
        </li>
        <li>
          <strong className="text-white">Ranking</strong> — só o do seu grupo. Treino livre
          {hasTreino ? ' (abaixo)' : ''} não entra no ranking.
        </li>
      </ol>
      <button
        type="button"
        onClick={dismiss}
        className="exam-tap mt-4 w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-emerald-900"
      >
        Entendi
      </button>
    </div>
  );
}
