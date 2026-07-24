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
    return `${label}: ${selected} na prova · pool de ${pool} no banco`;
  }
  return `${label}: ${selected} questões na prova`;
}

export function EnsureDailyExamsButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [details, setDetails] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function run(force: boolean, mode: 'ai' | 'bank') {
    if (mode === 'ai') {
      const ok = window.confirm(
        'IA PAGA — estimativa ~US$ 0,50 a US$ 5 por regeneração completa.\n\n' +
          'Só funciona se "Permitir IA paga" estiver ATIVADA.\n\n' +
          'Recomendado: use o banco (grátis). Continuar com IA?'
      );
      if (!ok) return;
    } else if (force) {
      const ok = window.confirm(
        'Forçar regenerar (BANCO) apaga as disputas de HOJE e monta de novo só com o banco — sem OpenAI. Continuar?'
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
      const modeLabel = data.mode === 'ai' ? 'IA' : 'banco local';

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
        setMessage(
          `Geradas ${createdCount} disputa(s) via ${modeLabel}. Veja abaixo quantas questões entraram.`
        );
      } else if (data.general?.exam || data.nephrology?.exam) {
        setMessage(
          'Já existiam as de hoje — use Forçar regenerar para remontar e ver as contagens novas.'
        );
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
      'Apagar TODAS as disputas diárias de HOJE em diante (incluindo as de agosto etc.) e regenerar hoje com o banco NOVO?\n\nProvas antigas já feitas por alunos no passado ficam. Continuar?'
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
        window.alert(data.error || 'Falha ao resetar');
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
      setMessage(data.message || 'Ok — provas regeneradas.');
      window.alert(
        `${data.message || 'Pronto'}\n\n${lines.join('\n') || 'Atualize a página para ver as provas.'}`
      );
    } catch (e) {
      const m = e instanceof Error ? e.message : 'Erro de rede';
      setError(m);
      window.alert(m);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        disabled={loading}
        onClick={() => void resetFromToday()}
        className="w-full rounded-xl bg-red-800 px-4 py-3 text-sm font-bold text-white hover:bg-red-900 disabled:opacity-60"
      >
        {loading ? 'Apagando e regenerando…' : 'Apagar disputas futuras e regenerar com banco novo'}
      </button>
      <p className="text-xs text-slate-600">
        Busca nos lotes por especialidade (Clínica Médica, Nefrologia…). Depois da geração, aparece
        quantas questões entraram em cada prova.
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={loading}
          onClick={() => void run(false, 'bank')}
          className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
        >
          {loading ? 'Gerando…' : 'Gerar do banco (grátis)'}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => void run(true, 'bank')}
          className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-60"
        >
          Forçar regenerar hoje
        </button>
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
    </div>
  );
}
