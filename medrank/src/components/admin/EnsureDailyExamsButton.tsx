'use client';

import { useState } from 'react';
import { HORIZON_PRESETS } from '@/lib/exams/daily-schedule';

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

function horizonLabel(days: number): string {
  if (days === 7) return '7 dias (1 semana)';
  if (days === 14) return '14 dias (2 semanas)';
  if (days === 30) return '30 dias (1 mês)';
  return `${days} dias`;
}

export function EnsureDailyExamsButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [details, setDetails] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function run(force: boolean, mode: 'ai' | 'bank', days = 1) {
    if (days > 1) {
      const ok = window.confirm(
        `Gerar disputas para ${horizonLabel(days)} a partir de hoje?\n\n` +
          'Usa o banco (grátis). Dias que já existem são mantidos — só preenche o que faltar.\n\nContinuar?'
      );
      if (!ok) return;
    } else if (mode === 'ai') {
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
        body: JSON.stringify({ today: true, force: days > 1 ? false : force, mode, days }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Falha ao gerar disputa');
        return;
      }

      if (days > 1) {
        const lines: string[] = [
          `Período: ${data.fromDate} → ${data.toDate}`,
          `Criadas: ${data.createdGeneral ?? 0} geral · ${data.createdNephrology ?? 0} nefro`,
          `Já existiam: ${data.alreadyOk ?? 0} dia(s)`,
        ];
        if (Array.isArray(data.errors) && data.errors.length) {
          lines.push(`Falhas: ${data.errors.length}`);
        }
        setDetails(lines);
        setMessage(data.message || `Horizonte de ${days} dias processado.`);
        if (data.error) setError(data.error);
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
        setMessage(`Pronto — ${createdCount} prova(s) de hoje gerada(s).`);
      } else if (data.general?.exam || data.nephrology?.exam) {
        setMessage('Já existem as de hoje. Use “Regenerar hoje” se quiser remontar.');
      } else {
        setMessage('Não foi possível criar as provas de hoje');
      }
      const err = data.general?.error || data.nephrology?.error || data.error;
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
      setMessage(data.message || 'Provas regeneradas.');
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
        onClick={() => void run(false, 'bank', 1)}
        className="w-full rounded-xl bg-teal-800 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-900 disabled:opacity-60"
      >
        {loading ? 'Gerando Geral + Nefro…' : 'Gerar provas de hoje (Geral + Nefro)'}
      </button>

      <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
        <p className="text-sm font-semibold text-slate-900">Pré-gerar vários dias</p>
        <p className="mt-1 text-xs text-slate-600">
          Monta hoje + os próximos — <strong>Residência Geral e Nefrologia</strong> em cada dia
          (banco, grátis). Assim você não precisa gerar todo dia.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {HORIZON_PRESETS.map((days) => (
            <button
              key={days}
              type="button"
              disabled={loading}
              onClick={() => void run(false, 'bank', days)}
              className="rounded-lg border border-teal-700 bg-teal-50 px-3 py-2.5 text-sm font-semibold text-teal-900 hover:bg-teal-100 disabled:opacity-60"
            >
              {loading ? '…' : horizonLabel(days)}
            </button>
          ))}
        </div>
      </div>

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
            onClick={() => void run(true, 'bank', 1)}
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
