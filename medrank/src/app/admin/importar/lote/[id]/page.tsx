'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Q = {
  id: string;
  external_id: string | null;
  statement: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  correct_option: string;
  explanation: string | null;
  specialty: string | null;
  topic: string | null;
  bank_status: string | null;
  question_kind: string | null;
  guideline_name: string | null;
  guideline_institution: string | null;
  guideline_year: number | null;
  bibliography: string | null;
};

type Batch = {
  id: string;
  title: string;
  lote_codigo: string | null;
  status: string;
};

export default function RevisarLotePage() {
  const params = useParams();
  const id = String(params?.id || '');
  const [batch, setBatch] = useState<Batch | null>(null);
  const [questions, setQuestions] = useState<Q[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch(`/api/admin/batches/authorial/${id}`);
    const data = await res.json();
    if (!res.ok) {
      setErr(data.error || 'Falha');
      return;
    }
    setBatch(data.batch);
    setQuestions(data.questions || []);
    setSelected(new Set());
  }, [id]);

  useEffect(() => {
    if (id) void load();
  }, [id, load]);

  async function actSelected(action: 'approve' | 'suspend' | 'exclude') {
    if (selected.size === 0) return;
    setBusy(true);
    setMsg(null);
    try {
      for (const questionId of selected) {
        const res = await fetch('/api/admin/questions/bank-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionId,
            action,
            reason:
              action === 'approve'
                ? 'Aprovada na revisão do lote autoral'
                : 'Reprovada/suspensa na revisão do lote',
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          setErr(data.error || 'Falha parcial');
        }
      }
      setMsg(`${selected.size} questão(ões) → ${action}`);
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function publishBatch() {
    if (!window.confirm('Publicar TODO o lote (rascunhos → aprovadas)?')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/batches/authorial/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish', reason: 'Publicação do lote após revisão' }),
      });
      const data = await res.json();
      if (!res.ok) setErr(data.error);
      else
        setMsg(
          `${data.message || 'Publicado.'} Próximo: Provas → Forçar regenerar (banco).`
        );
      await load();
    } finally {
      setBusy(false);
    }
  }

  if (!batch && !err) return <p className="p-8 text-sm text-slate-500">Carregando…</p>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin/importar/lote" className="text-sm text-emerald-700 hover:underline">
        ← Lotes
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">{batch?.title || 'Lote'}</h1>
      <p className="text-sm text-slate-600">
        {batch?.lote_codigo} · {batch?.status} · {questions.length} questões
      </p>

      <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-950 ring-1 ring-amber-200">
        <p className="font-bold">Depois de importar: publique o lote.</p>
        <p className="mt-1">
          Rascunho não entra na disputa. Toque em <strong>Publicar lote inteiro</strong>, depois vá
          em Provas → Forçar regenerar (banco).
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => void publishBatch()}
          className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white"
        >
          Publicar lote inteiro
        </button>
        <button
          type="button"
          disabled={busy || selected.size === 0}
          onClick={() => void actSelected('approve')}
          className="rounded-lg bg-teal-700 px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          Aprovar selecionadas
        </button>
        <button
          type="button"
          disabled={busy || selected.size === 0}
          onClick={() => void actSelected('suspend')}
          className="rounded-lg bg-amber-700 px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          Suspender selecionadas
        </button>
        <button
          type="button"
          disabled={busy || selected.size === 0}
          onClick={() => void actSelected('exclude')}
          className="rounded-lg bg-red-700 px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          Recusar selecionadas
        </button>
        <button
          type="button"
          onClick={() => setSelected(new Set(questions.map((q) => q.id)))}
          className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold"
        >
          Selecionar todas
        </button>
      </div>

      {msg && <p className="mt-3 text-sm text-emerald-800">{msg}</p>}
      {err && <p className="mt-3 text-sm text-red-700">{err}</p>}

      <div className="mt-6 space-y-3">
        {questions.map((q) => (
          <article key={q.id} className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
            <label className="flex gap-3">
              <input
                type="checkbox"
                checked={selected.has(q.id)}
                onChange={() => {
                  setSelected((prev) => {
                    const n = new Set(prev);
                    if (n.has(q.id)) n.delete(q.id);
                    else n.add(q.id);
                    return n;
                  });
                }}
                className="mt-1"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500">
                  {q.external_id} · {q.question_kind} · {q.bank_status} · gabarito{' '}
                  {q.correct_option}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-slate-900">{q.statement}</p>
                <ul className="mt-2 space-y-0.5 text-xs text-slate-700">
                  {(['A', 'B', 'C', 'D', 'E'] as const).map((L) => (
                    <li key={L} className={q.correct_option === L ? 'font-semibold text-emerald-800' : ''}>
                      {L}) {q[`option_${L.toLowerCase()}` as keyof Q] as string}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-slate-600">
                  {[q.guideline_institution || q.bibliography, q.guideline_year].filter(Boolean).join(' · ')}
                </p>
                <Link
                  href={`/admin/questoes/${q.id}`}
                  className="mt-2 inline-block text-xs font-semibold text-emerald-700 underline"
                >
                  Editar / gabarito / anular / histórico
                </Link>
              </div>
            </label>
          </article>
        ))}
      </div>
    </div>
  );
}
