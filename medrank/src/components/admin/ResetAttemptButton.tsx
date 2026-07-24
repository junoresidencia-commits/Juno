'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/** Lista forfeits do dia nesta prova e permite resetar (bug, não trapaça). */
export function ResetAttemptButton({ examId }: { examId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<
    Array<{ id: string; user_id: string; name: string; forfeited: boolean }>
  >([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    setBusy('load');
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/attempts?examId=${examId}&forfeited=1`);
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || 'Falha ao listar');
        return;
      }
      setRows(data.attempts || []);
      setOpen(true);
    } finally {
      setBusy(null);
    }
  }

  async function reset(attemptId: string, name: string) {
    if (
      !confirm(
        `Liberar nova chance para ${name}?\n\nUse só quando foi bug (tela branca, falso antifraude). Apaga a tentativa de hoje nesta prova.`
      )
    ) {
      return;
    }
    setBusy(attemptId);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/attempts/${attemptId}/reset`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || 'Falha ao resetar');
        return;
      }
      setMsg(`Reset ok: ${name} pode refazer esta disputa.`);
      await load();
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <button
        type="button"
        disabled={busy === 'load'}
        onClick={() => void load()}
        className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-red-800 ring-1 ring-red-200 hover:bg-red-50 disabled:opacity-50"
      >
        {busy === 'load' ? '…' : 'Ver quem encerrou / Liberar'}
      </button>
      {msg && <p className="mt-2 text-xs font-medium text-slate-700">{msg}</p>}
      {open && (
        <ul className="mt-2 max-h-40 space-y-1 overflow-y-auto text-xs">
          {rows.length === 0 ? (
            <li className="text-slate-500">Nenhum forfeit nesta prova.</li>
          ) : (
            rows.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-2 py-1.5">
                <span>{r.name}</span>
                <button
                  type="button"
                  disabled={busy === r.id}
                  onClick={() => void reset(r.id, r.name)}
                  className="font-semibold text-emerald-700 hover:underline disabled:opacity-50"
                >
                  Liberar prova
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
