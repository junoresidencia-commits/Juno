'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'medrank-onboarding-dismissed';

export function DisputeOnboarding() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) setOpen(true);
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
    <div className="mb-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-5 text-white shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-bold">⚔️ Como funciona a disputa</p>
          <ul className="mt-3 space-y-2 text-sm text-emerald-50">
            <li>• <strong className="text-white">1 chance por dia</strong> — 20 questões</li>
            <li>• <strong className="text-white">Alterna especialidade</strong> — um dia Nefrologia, outro Nefropediatria</li>
            <li>• <strong className="text-white">Máx. 2.000 pts</strong> — quem faz ganha; quem não faz, fica sem pontos</li>
            <li>• <strong className="text-white">Janela 7h–23h59</strong> (horário de Brasília)</li>
            <li>• Ranking atualiza conforme a turma termina</li>
          </ul>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-lg bg-white/20 px-2 py-1 text-sm font-medium hover:bg-white/30"
          aria-label="Fechar"
        >
          ✕
        </button>
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="exam-tap mt-4 w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-emerald-800"
      >
        Entendi — bora disputar!
      </button>
    </div>
  );
}
