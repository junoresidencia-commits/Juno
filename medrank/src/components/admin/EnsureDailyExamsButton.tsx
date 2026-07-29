'use client';

import { useState } from 'react';

type Progress = {
  poolSize?: number;
  selected?: number;
  approved?: number;
  rejected?: number;
  target?: number;
};

function formatProgress(label: string, p?: Progress | null, examQs?: number | null) {
  if (!p && examQs == null) return null;
  const selected = p?.selected ?? examQs ?? 0;
  const pool = p?.poolSize ?? 0;
  if (pool > 0) {
    return `${label}: ${selected} na prova · ${pool} no banco`;
  }
  return `${label}: ${selected} questões`;
}

export function EnsureDailyExamsButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [details, setDetails] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function run(force: boolean, mode: 'ai' | 'bank') {
    if (mode === 'ai') {
      const ok = window.confirm(
        'IA paga: regenerar pode custar ~US$ 0,50 a US$ 5.\n\nPreferível usar o banco (grátis). Continuar com IA?'
      );
      if (!ok) return;
    } else if (force) {
      const ok = window.confirm(
        'Apagar as provas de HOJE e montar de novo com o banco? Continuar?'
      );
      if (!ok) return;
    }

    setLoading(true);
    setMessage(null);
    setDetails([]);
    setError(null);
    try {
      const res = await fetch('/api/admin/exams/ensure-daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ today: true, force, mode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Falha ao gerar disputa');
        return;
      }
      const createdCount =
        (data.general?.created ? 1 : 0) + (data.nephrology?.created ? 1 : 0);

      const lines: string[] = [];
      const gLine = formatProgress(
        'Residência Geral',
        data.general?.progress,
        data.general?.exam?.total_questions
      );
      const nLine = formatProgress(
        'Nefrologia',
        data.nephrology?.progress,
        data.nephrology?.exam?.total_questions
      );
      if (gLine) lines.push(gLine);
      if (nLine) lines.push(nLine);
      setDetails(lines);

      if (createdCount > 0) {
        const emailed = data.notify?.emailed ?? 0;
        const inApp = data.notify?.inApp ?? 0;
        const skip = data.notify?.skipped ? ` (${data.notify.skipped})` : '';
        setMessage(
          `Pronto — ${createdCount} prova(s) de hoje gerada(s). Avisos: ${emailed} e-mail(s), ${inApp} no app${skip}.`
        );
      } else if (data.general?.exam || data.nephrology?.exam) {
        setMessage('Já existem as de hoje. Use “Regenerar hoje” se quiser remontar.');
      } else {
        setMessage('Não foi possível criar as provas de hoje');
      }
      const err = data.general?.error || data.nephrology?.error || data.error || data.notify?.error;
      if (err) setError(err);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro de rede');
    } finally {
      setLoading(false);
    }
  }

  async function resetFromToday() {
    const ok = window.confirm(
      'Apagar TODAS as disputas de HOJE em diante e regenerar hoje com o banco?\n\nProvas antigas dos alunos ficam. Continuar?'
    );
    if (!ok) return;

    setLoading(true);
    setMessage(null);
    setDetails([]);
    setError(null);
    try {
      const res = await fetch('/api/admin/exams/reset-bank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: true }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Falha ao resetar');
        return;
      }
      const lines: string[] = [];
      const gLine = formatProgress(
        'Residência Geral',
        data.general?.progress,
        data.general?.exam?.total_questions
      );
      const nLine = formatProgress(
        'Nefrologia',
        data.nephrology?.progress,
        data.nephrology?.exam?.total_questions
      );
      if (gLine) lines.push(gLine);
      if (nLine) lines.push(nLine);
      setDetails(lines);
      setMessage(
        [
          data.message || 'Provas regeneradas.',
          data.notify
            ? `Avisos: ${data.notify.emailed ?? 0} e-mail(s), ${data.notify.inApp ?? 0} no app.`
            : null,
        ]
          .filter(Boolean)
          .join(' ')
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro de rede');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        disabled={loading}
        onClick={() => void run(false, 'bank')}
        className="w-full rounded-xl bg-teal-800 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-900 disabled:opacity-60"
      >
        {loading ? 'Gerando…' : 'Gerar provas de hoje'}
      </button>

      {message && <p className="text-sm text-emerald-800">{message}</p>}
      {details.length > 0 ? (
        <ul className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-950 ring-1 ring-emerald-200">
          {details.map((line) => (
            <li key={line} className="font-medium">
              {line}
            </li>
          ))}
        </ul>
      ) : null}
      {error && <p className="text-sm text-red-700">{error}</p>}

      <details className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
        <summary className="cursor-pointer text-sm font-medium text-slate-700">
          Mais opções
        </summary>
        <div className="mt-3 flex flex-col gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => void run(true, 'bank')}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-60"
          >
            Regenerar hoje
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => void resetFromToday()}
            className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-50 disabled:opacity-60"
          >
            Apagar futuras e regenerar
          </button>
          <p className="text-xs text-slate-500">
            Só use se as provas de hoje estiverem erradas ou o banco mudou.
          </p>
        </div>
      </details>
    </div>
  );
}
