'use client';

import { useEffect, useState } from 'react';

type ReviewRow = {
  order_number: number;
  severity: string;
  message: string;
  codes: string[];
};

type Props = {
  examId: string;
  initialStatus?: string | null;
  initialSummary?: string | null;
};

export function ExamQualityAdminCard({ examId, initialStatus, initialSummary }: Props) {
  const [status, setStatus] = useState(initialStatus || 'pending');
  const [summary, setSummary] = useState(initialSummary || '');
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const problems = reviews.filter((r) => r.severity !== 'ok');

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
      setMsg(data.result?.summary || 'Revisão concluída');
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
      `LIBERAÇÃO MANUAL (somente administrador)\n\nA disputa NÃO passou na revisão automática IA.\nProblemas encontrados:\n\n${list}\n\nLiberar mesmo assim para os alunos?`
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
      setMsg('Prova liberada manualmente (override admin). Os problemas ficam registrados no resumo.');
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
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
            Pipeline IA (gerar → revisar → trocar → 2ª passagem) · {status}
          </p>
          <p className="mt-1 text-sm">
            {summary ||
              'Ao gerar a disputa, a OpenAI revisa cada questão, reprova/substitui e só publica com 20/20 aprovadas.'}
          </p>
          <p className="mt-1 text-xs opacity-80">
            Limiares: qualidade ≥90% · confiança gabarito ≥95% · ambiguidade ausente · uma resposta correta ·
            justificativa obrigatória. OPENAI_API_KEY obrigatória.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={rereview}
            className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold ring-1 ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
          >
            Re-revisar lote
          </button>
          {(status === 'blocked' || status === 'pending') && (
            <button
              type="button"
              disabled={busy}
              onClick={approve}
              title="Somente administrador — exige confirmação com lista de problemas"
              className="rounded-lg bg-amber-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-800 disabled:opacity-50"
            >
              Liberar mesmo assim (admin)
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
      {problems.length > 0 && (
        <div className="mt-3 rounded-xl bg-white/70 p-3 ring-1 ring-red-200">
          <p className="text-xs font-semibold text-red-900">
            Problemas encontrados ({problems.length}) — a disputa não deveria ir aos alunos sem override:
          </p>
          <ul className="mt-2 max-h-48 space-y-1 overflow-y-auto text-xs text-red-950">
            {problems.map((r, i) => (
              <li key={`${r.order_number}-${i}`}>
                <span className="font-semibold uppercase">{r.severity}</span> · Q{r.order_number}: {r.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
