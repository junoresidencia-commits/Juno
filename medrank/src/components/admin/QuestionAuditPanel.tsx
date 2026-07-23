'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { QuestionAuditIssue } from '@/lib/question-bank/audit';

type AuditRow = {
  id: string;
  source: string | null;
  year: number | null;
  specialty: string | null;
  correct_option: string;
  statementPreview: string;
  issues: QuestionAuditIssue[];
  bank_status?: string;
  question_origin?: string | null;
  quality_label?: string | null;
  quality_notes?: string | null;
  suggested_label?: string;
  suggested_suspend?: boolean;
  institution?: string | null;
};

type AuditResponse = {
  scanned: number;
  flagged: number;
  errors: number;
  warnings: number;
  officialCount?: number;
  suspendedCount?: number;
  labelCounts?: Record<string, number>;
  note?: string;
  rows: AuditRow[];
  error?: string;
};

export function QuestionAuditPanel() {
  const [data, setData] = useState<AuditResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorsOnly, setErrorsOnly] = useState(true);
  const [origin, setOrigin] = useState<'all' | 'official' | 'synthetic'>('synthetic');
  const [bankStatus, setBankStatus] = useState<'all' | 'approved' | 'disabled'>('all');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [reason, setReason] = useState('Suspensa na auditoria — qualidade insuficiente para disputa');

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/questions/audit?limit=3000&errorsOnly=${errorsOnly ? '1' : '0'}&origin=${origin}&bankStatus=${bankStatus}`
      );
      const json = (await res.json()) as AuditResponse;
      if (!res.ok) {
        setError(json.error || 'Falha na auditoria');
        return;
      }
      setData(json);
    } catch {
      setError('Erro de rede');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorsOnly, origin, bankStatus]);

  async function runClassify(dryRun: boolean) {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin/questions/classify-bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ limit: 8000, dryRun }),
      });
      const json = await res.json();
      if (!res.ok) {
        setMsg(json.error || json.hint || 'Falha na classificação');
        return;
      }
      setMsg(
        dryRun
          ? `Simulação: ${json.scanned} escaneadas · suspenderia ~${json.suspended} · aprovaria ${json.approved}. Resumo: ${JSON.stringify(json.summary)}`
          : json.message
      );
      if (!dryRun) await load();
    } finally {
      setBusy(false);
    }
  }

  async function act(questionId: string, action: 'approve' | 'suspend' | 'exclude') {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin/questions/bank-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId,
          action,
          reason: action === 'approve' ? 'Aprovada na auditoria do banco' : reason,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setMsg(json.error || 'Falha');
        return;
      }
      setMsg(json.message || 'Ok');
      await load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
        <p className="text-sm text-amber-950">
          <strong>Orientação:</strong> não manter questão ruim só para encher o banco. Prioridade =
          provas oficiais 2020–2026. Sintéticas fáceis/mal escritas devem ficar{' '}
          <strong>suspensas</strong> até revisão.
        </p>
        <p className="mt-2 text-xs text-amber-900">
          1) Rode a migration SQL <code className="rounded bg-white px-1">032</code> no Supabase ·
          2) Classificar em lote · 3) Importar banco oficial · 4) Gerar disputa do banco.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => void runClassify(true)}
            className="rounded-lg border border-amber-400 bg-white px-3 py-2 text-xs font-semibold text-amber-950 disabled:opacity-50"
          >
            Simular classificação
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              if (
                window.confirm(
                  'Classificar e suspender sintéticas/ruins no banco? Oficiais aprovadas permanecem.'
                )
              ) {
                void runClassify(false);
              }
            }}
            className="rounded-lg bg-amber-800 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
          >
            Classificar e suspender ruins agora
          </button>
          <Link
            href="/admin/questoes"
            className="rounded-lg bg-teal-700 px-3 py-2 text-xs font-semibold text-white"
          >
            Importar banco oficial
          </Link>
        </div>
        {msg && <p className="mt-2 whitespace-pre-wrap text-sm text-amber-950">{msg}</p>}
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={errorsOnly}
            onChange={(e) => setErrorsOnly(e.target.checked)}
          />
          Só problemas / suspensão sugerida
        </label>
        <label className="text-sm text-slate-700">
          Origem
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value as typeof origin)}
            className="ml-2 rounded border border-slate-300 px-2 py-1"
          >
            <option value="synthetic">Sintéticas</option>
            <option value="official">Oficiais</option>
            <option value="all">Todas</option>
          </select>
        </label>
        <label className="text-sm text-slate-700">
          Status
          <select
            value={bankStatus}
            onChange={(e) => setBankStatus(e.target.value as typeof bankStatus)}
            className="ml-2 rounded border border-slate-300 px-2 py-1"
          >
            <option value="all">Todos</option>
            <option value="approved">Ativas</option>
            <option value="disabled">Suspensas</option>
          </select>
        </label>
        <label className="min-w-[220px] flex-1 text-sm text-slate-700">
          Motivo (suspender/excluir)
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs"
          />
        </label>
      </div>

      {data && (
        <p className="text-sm text-slate-600">
          Escaneadas: <strong>{data.scanned}</strong> · listadas: <strong>{data.flagged}</strong> ·
          oficiais no lote: <strong>{data.officialCount ?? '—'}</strong> · já suspensas:{' '}
          <strong>{data.suspendedCount ?? '—'}</strong>
        </p>
      )}
      {data?.labelCounts && (
        <p className="text-xs text-slate-500">
          Labels: {Object.entries(data.labelCounts).map(([k, v]) => `${k}=${v}`).join(' · ')}
        </p>
      )}

      {loading && <p className="text-sm text-slate-500">Carregando…</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}

      <div className="space-y-3">
        {(data?.rows ?? []).map((row) => (
          <article key={row.id} className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500">
                  {[row.institution || row.source, row.year, row.specialty, row.question_origin]
                    .filter(Boolean)
                    .join(' · ')}
                  {' · '}
                  <span className="font-medium">{row.bank_status}</span>
                  {' · '}
                  <span className="font-medium text-amber-900">
                    {row.quality_label || row.suggested_label}
                  </span>
                </p>
                <p className="mt-1 text-sm text-slate-900">{row.statementPreview}</p>
                {row.quality_notes && (
                  <p className="mt-1 text-xs text-slate-600">{row.quality_notes}</p>
                )}
                <ul className="mt-2 space-y-0.5 text-xs text-red-700">
                  {row.issues.slice(0, 4).map((issue, i) => (
                    <li key={i}>
                      [{issue.severity}] {issue.message}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <Link
                  href={`/admin/questoes/${row.id}`}
                  className="rounded-lg bg-slate-900 px-3 py-1.5 text-center text-xs font-semibold text-white"
                >
                  Ver / editar
                </Link>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void act(row.id, 'approve')}
                  className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                >
                  Aprovar
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void act(row.id, 'suspend')}
                  className="rounded-lg bg-amber-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                >
                  Suspender
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void act(row.id, 'exclude')}
                  className="rounded-lg bg-red-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                >
                  Excluir do banco
                </button>
              </div>
            </div>
          </article>
        ))}
        {!loading && (data?.rows.length ?? 0) === 0 && (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            Nenhuma questão neste filtro. Troque origem/status ou rode a classificação em lote.
          </p>
        )}
      </div>
    </div>
  );
}
