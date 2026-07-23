'use client';

import { useEffect, useState } from 'react';
import type { QuestionAuditRow } from '@/lib/question-bank/audit';

type AuditResponse = {
  scanned: number;
  flagged: number;
  errors: number;
  warnings: number;
  note?: string;
  rows: QuestionAuditRow[];
  error?: string;
};

export function QuestionAuditPanel() {
  const [data, setData] = useState<AuditResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorsOnly, setErrorsOnly] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/admin/questions/audit?limit=3000&errorsOnly=${errorsOnly ? '1' : '0'}`
        );
        const json = (await res.json()) as AuditResponse;
        if (!res.ok) {
          if (!cancelled) setError(json.error || 'Falha na auditoria');
          return;
        }
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setError('Erro de rede');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [errorsOnly]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={errorsOnly}
            onChange={(e) => setErrorsOnly(e.target.checked)}
          />
          Só problemas graves (errors)
        </label>
        {data && (
          <p className="text-sm text-slate-600">
            Escaneadas: <strong>{data.scanned}</strong> · com alerta:{' '}
            <strong>{data.flagged}</strong> · erros: <strong>{data.errors}</strong> · avisos:{' '}
            <strong>{data.warnings}</strong>
          </p>
        )}
      </div>

      {data?.note && (
        <p className="rounded-xl bg-sky-50 px-4 py-3 text-sm text-sky-950 ring-1 ring-sky-200">
          {data.note}
        </p>
      )}

      {loading && <p className="text-sm text-slate-500">Rodando auditoria automática…</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}

      {!loading && data && data.rows.length === 0 && (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Nenhum problema estrutural encontrado neste lote. Continue a revisão clínica pontual
          via remediação quando houver recurso.
        </p>
      )}

      <div className="space-y-3">
        {(data?.rows ?? []).map((row) => (
          <article key={row.id} className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
            <p className="text-xs text-slate-500">
              {[row.source, row.year, row.specialty, `gabarito ${row.correct_option}`]
                .filter(Boolean)
                .join(' · ')}
            </p>
            <p className="mt-1 text-sm text-slate-900">{row.statementPreview}</p>
            <ul className="mt-2 space-y-1">
              {row.issues.map((issue, idx) => (
                <li
                  key={`${row.id}-${idx}`}
                  className={`text-xs ${
                    issue.severity === 'error' ? 'text-red-700' : 'text-amber-700'
                  }`}
                >
                  <span className="font-semibold uppercase">{issue.severity}</span> · {issue.code}:{' '}
                  {issue.message}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-mono text-[10px] text-slate-400">{row.id}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
