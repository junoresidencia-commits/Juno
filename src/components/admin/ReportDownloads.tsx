'use client';

import { useState } from 'react';
import type { PeriodType } from '@/types/database';
import { PERIOD_OPTIONS } from '@/lib/periods';

export function ReportDownloads() {
  const [period, setPeriod] = useState<PeriodType>('weekly');
  const [loading, setLoading] = useState<string | null>(null);

  async function download(format: 'excel' | 'pdf') {
    setLoading(format);
    try {
      const res = await fetch(`/api/admin/reports?format=${format}&period=${period}`);
      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? 'Erro ao gerar relatório');
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = res.headers.get('Content-Disposition')?.split('filename=')[1]?.replace(/"/g, '')
        ?? `medrank-relatorio.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="font-semibold">Exportar relatório completo</h2>
      <p className="mt-1 text-sm text-slate-600">
        Inclui desempenho por aluno, ranking, estatísticas por tema e questões com mais erro.
      </p>

      <div className="mt-4">
        <label className="block text-sm font-medium text-slate-700">Período do ranking</label>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as PeriodType)}
          className="mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          {PERIOD_OPTIONS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => download('excel')}
          disabled={loading !== null}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading === 'excel' ? 'Gerando...' : 'Baixar Excel (.xlsx)'}
        </button>
        <button
          type="button"
          onClick={() => download('pdf')}
          disabled={loading !== null}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          {loading === 'pdf' ? 'Gerando...' : 'Baixar PDF'}
        </button>
      </div>
    </div>
  );
}
