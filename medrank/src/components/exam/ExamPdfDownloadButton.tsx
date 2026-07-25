'use client';

import { useState } from 'react';

export function ExamPdfDownloadButton({
  examId,
  available,
  lockedMessage,
}: {
  examId: string;
  available: boolean;
  lockedMessage: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function download() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/exams/${examId}/pdf`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError((data as { error?: string }).error ?? 'Não foi possível baixar o PDF');
        setLoading(false);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `medrank-prova-${examId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError('Falha ao baixar o PDF');
    }
    setLoading(false);
  }

  if (!available) {
    return (
      <p className="mt-6 rounded-lg bg-slate-100 p-4 text-sm text-slate-800 ring-1 ring-slate-200">
        {lockedMessage}
      </p>
    );
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        disabled={loading}
        onClick={download}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {loading ? 'Gerando PDF…' : 'Baixar PDF limpo (sem gabarito · após 22h)'}
      </button>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      <p className="mt-2 text-xs text-slate-500">
        Para estudar com certo/errado, use o botão verde acima.
      </p>
    </div>
  );
}
