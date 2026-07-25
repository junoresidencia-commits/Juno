'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type ForfeitRow = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  forfeited: boolean;
  finished_at: string | null;
  exam_id: string | null;
  exam_title: string;
  exam_audience: string | null;
};

/**
 * Painel visível: lista quem teve a prova encerrada (antifraude) e permite liberar
 * quando foi erro técnico (ligação, notificação, etc.).
 */
export function ReleaseForfeitedPanel({
  examId,
  autoLoad = true,
  hideWhenEmpty = false,
}: {
  /** Se informado, lista só desta prova; senão, todas de hoje. */
  examId?: string;
  autoLoad?: boolean;
  /** Em Provas: some da tela se ninguém caiu no antifraude. */
  hideWhenEmpty?: boolean;
}) {
  const router = useRouter();
  const [rows, setRows] = useState<ForfeitRow[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(!autoLoad);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async (q = query) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ forfeited: '1' });
      if (examId) params.set('examId', examId);
      if (q.trim()) params.set('q', q.trim());
      const res = await fetch(`/api/admin/attempts?${params}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Falha ao listar');
        setRows([]);
      } else {
        setRows(data.attempts || []);
      }
    } catch {
      setError('Erro de conexão');
    }
    setLoading(false);
    setChecked(true);
  }, [examId, query]);

  useEffect(() => {
    if (autoLoad) void load('');
  }, [autoLoad, examId]); // eslint-disable-line react-hooks/exhaustive-deps

  async function release(row: ForfeitRow) {
    if (
      !confirm(
        `Liberar ${row.name} para refazer a prova?\n\n` +
          `${row.exam_title}\n\n` +
          `Use quando foi erro técnico (ligação, notificação, tela branca). ` +
          `A tentativa encerrada será apagada e o aluno poderá iniciar de novo.`
      )
    ) {
      return;
    }
    setBusyId(row.id);
    setMessage('');
    setError('');
    try {
      const res = await fetch(`/api/admin/attempts/${row.id}/reset`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Falha ao liberar');
      } else {
        setMessage(`${row.name} liberado(a) — pode fazer a prova de novo.`);
        await load();
        router.refresh();
      }
    } catch {
      setError('Erro de conexão ao liberar');
    }
    setBusyId(null);
  }

  // Em Provas: some da tela se não houver ninguém (evita poluir).
  if (
    hideWhenEmpty &&
    (!checked || (!loading && rows.length === 0 && !error && !message && !query))
  ) {
    return null;
  }

  return (
    <section className="mb-6 rounded-2xl bg-red-50 p-5 ring-1 ring-red-200">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-red-950">Liberar prova (erro técnico)</h2>
          <p className="mt-1 text-sm text-red-900/80">
            Aluno caiu no antifraude por engano? Libere para refazer hoje.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          {loading ? 'Carregando…' : 'Atualizar'}
        </button>
      </div>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void load(query);
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar aluno (nome ou e-mail)"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white"
        >
          Buscar
        </button>
      </form>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      {message ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}

      <ul className="mt-4 space-y-2">
        {loading && rows.length === 0 ? (
          <li className="text-sm text-slate-500">Carregando…</li>
        ) : rows.length === 0 ? (
          <li className="rounded-xl bg-white px-4 py-3 text-center text-sm text-slate-600 ring-1 ring-slate-100">
            {query.trim()
              ? 'Nenhum resultado para essa busca.'
              : 'Nenhuma prova encerrada por segurança hoje. Quando um aluno cair no antifraude por engano, o nome aparece aqui.'}
          </li>
        ) : (
          rows.map((row) => (
            <li
              key={row.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-red-100"
            >
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">{row.name}</p>
                {row.email ? <p className="text-xs text-slate-600">{row.email}</p> : null}
                <p className="mt-1 text-xs text-slate-700">
                  {row.exam_title}
                  {row.exam_audience ? ` · ${row.exam_audience}` : ''}
                </p>
              </div>
              <button
                type="button"
                disabled={busyId === row.id}
                onClick={() => void release(row)}
                className="shrink-0 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
              >
                {busyId === row.id ? 'Liberando…' : 'Liberar prova'}
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
