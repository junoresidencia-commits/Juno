'use client';

import { useState } from 'react';

export function RebuildOfficialBankButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleRebuild() {
    const ok = window.confirm(
      'BACKUP + LIMPEZA DO BANCO ATIVO\n\n' +
        '1) Copia todas as questões atuais para questions_archive\n' +
        '2) Remove do ativo as questões sintéticas/fáceis\n' +
        '3) Publica SOMENTE provas oficiais públicas (ENARE/Revalida CC-BY, 2020–2026)\n\n' +
        'Não usa OpenAI. Continuar?'
    );
    if (!ok) return;

    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/questions/rebuild-official', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: true, deleteUnreferenced: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || data.hint || 'Falha no rebuild');
        return;
      }
      setMessage(data.message || 'Rebuild concluído');
      window.location.reload();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Erro de rede');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={loading}
        onClick={() => void handleRebuild()}
        className="rounded-lg bg-red-800 px-4 py-2 text-sm font-semibold text-white hover:bg-red-900 disabled:opacity-50"
      >
        {loading ? 'Fazendo backup e reconstruindo…' : 'Backup + apagar ativo + só oficiais'}
      </button>
      {message ? <p className="text-sm text-slate-700">{message}</p> : null}
    </div>
  );
}
