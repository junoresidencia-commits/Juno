'use client';

import { useEffect, useState } from 'react';
import {
  friendlyQualitySummary,
  qualityStatusLabel,
  qualityStatusTone,
} from '@/lib/exams/admin-labels';

type ReviewRow = {
  order_number: number;
  severity: string;
  message: string;
  codes: string[];
};

type Props = {
  examId: string;
  examLabel?: string;
  initialStatus?: string | null;
  initialSummary?: string | null;
  /** Compacto: só status + ações essenciais (lista de hoje). */
  compact?: boolean;
};

export function ExamQualityAdminCard({
  examId,
  examLabel,
  initialStatus,
  initialSummary,
  compact = false,
}: Props) {
  const [status, setStatus] = useState(initialStatus || 'pending');
  const [summary, setSummary] = useState(initialSummary || '');
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const problems = reviews.filter((r) => r.severity !== 'ok');
  const needsAction = status === 'blocked' || status === 'pending' || status === 'warning';

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

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId]);

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
      setMsg('Revisão concluída.');
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  async function approve() {
    const list =
      problems.length > 0
        ? problems.map((p) => `Q${p.order_number}: ${p.message}`).join('\n')
        : summary || 'Problemas não listados individualmente.';
    const ok = window.confirm(
      `Liberar esta prova mesmo com problemas?\n\n${list}\n\nOs alunos vão ver a disputa.`
    );
    if (!ok) return;

    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin/exam-quality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId,
          action: 'approve',
          note: 'Liberação forçada pelo admin após listar problemas da IA',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || 'Falha ao liberar');
        return;
      }
      setStatus('approved_override');
      setMsg('Prova liberada.');
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  const ring =
    status === 'blocked'
      ? 'ring-red-200 bg-red-50/40'
      : status === 'warning'
        ? 'ring-amber-200 bg-amber-50/40'
        : status === 'passed' || status === 'approved_override'
          ? 'ring-emerald-200 bg-white'
          : 'ring-slate-200 bg-white';

  return (
    <div className={`rounded-xl p-4 ring-1 ${ring}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          {examLabel ? (
            <p className="font-semibold text-slate-900">{examLabel}</p>
          ) : null}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${qualityStatusTone(status)}`}
            >
              {qualityStatusLabel(status)}
            </span>
            <span className="text-sm text-slate-600">
              {friendlyQualitySummary(status, summary)}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={`/admin/provas/${examId}/amostra`}
            className="rounded-lg bg-teal-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-900"
          >
            Ver questões
          </a>
          {(needsAction || !compact) && (
            <a
              href={`/admin/provas/${examId}/remediar`}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              Corrigir
            </a>
          )}
          {(status === 'blocked' || status === 'pending') && (
            <button
              type="button"
              disabled={busy}
              onClick={approve}
              className="rounded-lg bg-amber-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-800 disabled:opacity-50"
            >
              Liberar mesmo assim
            </button>
          )}
        </div>
      </div>

      {msg && <p className="mt-2 text-xs font-medium text-slate-700">{msg}</p>}

      {problems.length > 0 && (
        <div className="mt-3 rounded-lg bg-white p-3 ring-1 ring-red-200">
          <p className="text-xs font-semibold text-red-900">
            {problems.length} problema(s) nas questões
          </p>
          <ul className="mt-2 max-h-36 space-y-1 overflow-y-auto text-xs text-red-950">
            {problems.slice(0, 8).map((r, i) => (
              <li key={`${r.order_number}-${i}`}>
                Q{r.order_number}: {r.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <details className="mt-3">
        <summary className="cursor-pointer text-xs font-medium text-slate-500 hover:text-slate-700">
          Detalhes técnicos
        </summary>
        <div className="mt-2 space-y-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-700 ring-1 ring-slate-200">
          <p className="whitespace-pre-wrap break-words">{summary || 'Sem resumo.'}</p>
          <button
            type="button"
            disabled={busy}
            onClick={rereview}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50"
          >
            {busy ? '…' : 'Re-revisar lote'}
          </button>
        </div>
      </details>
    </div>
  );
}
