'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

type Q = {
  id: string;
  statement: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  correct_option: string;
  institution: string | null;
  exam_name: string | null;
  year: number | null;
  source_url: string | null;
  question_origin: string | null;
};

export default function RevisaoQuestoesPage() {
  const [questions, setQuestions] = useState<Q[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch('/api/admin/questions/review');
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || data.hint || 'Falha ao carregar');
        return;
      }
      setQuestions(data.questions || []);
      setSelected(new Set());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function toggle(id: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  async function act(action: 'approve' | 'reject') {
    if (selected.size === 0) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin/questions/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionIds: [...selected], action }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Falha');
        return;
      }
      setMsg(`${data.updated} questao(oes) → ${action === 'approve' ? 'aprovadas' : 'reprovadas'}`);
      await load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin/questoes" className="text-sm text-emerald-700 hover:underline">
        ← Questoes
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Revisao de importacao</h1>
      <p className="mt-1 text-sm text-slate-600">
        Aprove manualmente antes de entrar na disputa diaria. Nada importa direto como publicado.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy || selected.size === 0}
          onClick={() => void act('approve')}
          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          Aprovar selecionadas
        </button>
        <button
          type="button"
          disabled={busy || selected.size === 0}
          onClick={() => void act('reject')}
          className="rounded-lg bg-red-700 px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          Reprovar
        </button>
        <button
          type="button"
          onClick={() => setSelected(new Set(questions.map((q) => q.id)))}
          className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold"
        >
          Selecionar todas
        </button>
        <Link
          href="/admin/importar/prova"
          className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold ring-1 ring-slate-300"
        >
          Nova importacao
        </Link>
      </div>

      {msg && <p className="mt-3 text-sm text-emerald-800">{msg}</p>}
      {err && <p className="mt-3 text-sm text-red-700">{err}</p>}
      {loading && <p className="mt-4 text-sm text-slate-500">Carregando...</p>}

      <div className="mt-4 space-y-3">
        {questions.length === 0 && !loading ? (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            Fila vazia. Importe uma prova em Admin → Importar → Prova.
          </p>
        ) : (
          questions.map((q) => (
            <article key={q.id} className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
              <label className="flex gap-3">
                <input
                  type="checkbox"
                  checked={selected.has(q.id)}
                  onChange={() => toggle(q.id)}
                  className="mt-1"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-500">
                    {[q.institution, q.exam_name, q.year, q.question_origin]
                      .filter(Boolean)
                      .join(' · ')}
                    {q.source_url ? (
                      <>
                        {' · '}
                        <a
                          href={q.source_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 underline"
                        >
                          fonte
                        </a>
                      </>
                    ) : null}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-900">{q.statement}</p>
                  <ul className="mt-2 space-y-0.5 text-xs text-slate-700">
                    {(['A', 'B', 'C', 'D', 'E'] as const).map((L) => {
                      const text = q[`option_${L.toLowerCase()}` as keyof Q] as string;
                      return (
                        <li key={L} className={q.correct_option === L ? 'font-semibold text-emerald-800' : ''}>
                          {L}) {text}
                          {q.correct_option === L ? ' ← gabarito' : ''}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </label>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
