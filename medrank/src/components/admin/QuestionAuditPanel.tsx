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
  const [fixing, setFixing] = useState(false);
  const [fixMsg, setFixMsg] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/questions/audit?limit=3000&errorsOnly=${errorsOnly ? '1' : '0'}`
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
  }, [errorsOnly]);

  async function fixNow() {
    setFixing(true);
    setFixMsg(null);
    try {
      // 1) Reimporta bancos expert polidos
      const seedRes = await fetch('/api/admin/questions/seed-bank', { method: 'POST' });
      const seedData = await seedRes.json().catch(() => ({}));
      if (!seedRes.ok) {
        setFixMsg(seedData.error || 'Falha ao reimportar banco');
        return;
      }

      // 2) Polimento in-place do que ainda estiver ruim no Supabase
      const fixRes = await fetch('/api/admin/questions/fix-quality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ limit: 3000 }),
      });
      const fixData = await fixRes.json().catch(() => ({}));
      if (!fixRes.ok) {
        setFixMsg(
          `Banco reimportado (${seedData.imported}), mas polimento falhou: ${fixData.error || 'erro'}`
        );
        await load();
        return;
      }

      setFixMsg(
        `Pronto: importadas ${seedData.imported} · polidas na importação ${seedData.polishedOnImport ?? 0} · ` +
          `corrigidas no banco ${fixData.updated ?? 0} (precisavam ${fixData.neededFix ?? 0}). ` +
          `Se alguma questão já pontuou na disputa, use Provas → Remediação.`
      );
      await load();
    } catch {
      setFixMsg('Erro de rede ao corrigir');
    } finally {
      setFixing(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
        <p className="text-sm text-emerald-950">
          <strong>Corrigir agora</strong> reimporta o banco expert (opções equilibradas) e polisce
          no Supabase o que ainda estiver com gabarito óbvio por tamanho.
        </p>
        <button
          type="button"
          disabled={fixing}
          onClick={fixNow}
          className="mt-3 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
        >
          {fixing ? 'Corrigindo banco…' : 'Corrigir opções desbalanceadas agora'}
        </button>
        {fixMsg && <p className="mt-2 text-sm text-emerald-900">{fixMsg}</p>}
      </div>

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
          {data.note} Para anular/mudar gabarito de questão <em>já aplicada</em> na disputa, use{' '}
          <strong>Provas → Remediação</strong>.
        </p>
      )}

      {loading && <p className="text-sm text-slate-500">Rodando auditoria automática…</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}

      {!loading && data && data.rows.length === 0 && (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Nenhum problema estrutural neste lote. Banco ok para disputa.
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
