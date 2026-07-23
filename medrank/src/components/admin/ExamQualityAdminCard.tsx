'use client';

import { useState } from 'react';

type Props = {
  examId: string;
  initialStatus?: string | null;
  initialSummary?: string | null;
};

export function ExamQualityAdminCard({ examId, initialStatus, initialSummary }: Props) {
  const [status, setStatus] = useState(initialStatus || 'pending');
  const [summary, setSummary] = useState(initialSummary || '');
  const [reviews, setReviews] = useState<
    Array<{ order_number: number; severity: string; message: string; codes: string[] }>
  >([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function refresh() {
    const res = await fetch(`/api/admin/exam-quality?examId=${examId}`);
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error || 'Falha ao carregar revisão');
      return;
    }
    setStatus(data.quality_status);
    setSummary(data.quality_summary || '');
    setReviews(data.reviews || []);
  }

  async function rereview() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin/exam-quality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examId, action: 'rereview' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || 'Falha na revisão');
        return;
      }
      setMsg(data.result?.summary || 'Revisão concluída');
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  async function approve() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin/exam-quality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId,
          action: 'approve',
          note: 'Liberada após revisão do professor',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || 'Falha ao liberar');
        return;
      }
      setStatus('approved_override');
      setMsg('Prova liberada para os alunos.');
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  const tone =
    status === 'blocked'
      ? 'bg-red-50 ring-red-200 text-red-950'
      : status === 'warning'
        ? 'bg-amber-50 ring-amber-200 text-amber-950'
        : status === 'passed' || status === 'approved_override'
          ? 'bg-emerald-50 ring-emerald-200 text-emerald-950'
          : 'bg-slate-50 ring-slate-200 text-slate-900';

  return (
    <div className={`rounded-2xl p-4 ring-1 ${tone}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
            Revisão IA / qualidade · {status}
          </p>
          <p className="mt-1 text-sm">{summary || 'Sem resumo ainda — rode a revisão.'}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={rereview}
            className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold ring-1 ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
          >
            Revisar agora
          </button>
          {status === 'blocked' && (
            <button
              type="button"
              disabled={busy}
              onClick={approve}
              className="rounded-lg bg-amber-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-800 disabled:opacity-50"
            >
              Liberar mesmo assim
            </button>
          )}
          <a
            href={`/admin/provas/${examId}/remediar`}
            className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold ring-1 ring-amber-300 text-amber-900 hover:bg-amber-50"
          >
            Remediação
          </a>
        </div>
      </div>
      {msg && <p className="mt-2 text-xs font-medium">{msg}</p>}
      {reviews.filter((r) => r.severity !== 'ok').length > 0 && (
        <ul className="mt-3 max-h-40 space-y-1 overflow-y-auto text-xs">
          {reviews
            .filter((r) => r.severity !== 'ok')
            .map((r, i) => (
              <li key={`${r.order_number}-${i}`}>
                <span className="font-semibold uppercase">{r.severity}</span> · Q{r.order_number}:{' '}
                {r.message}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
