'use client';

import { useState } from 'react';

export function StudyPdfDownloadButton({
  attemptId,
  available = true,
  lockedMessage = 'PDF com gabarito libera só às 21h, quando a disputa fecha.',
  compact = false,
}: {
  attemptId: string;
  available?: boolean;
  lockedMessage?: string;
  /** Botão pequeno para o Histórico */
  compact?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function download(e?: React.MouseEvent) {
    e?.preventDefault();
    e?.stopPropagation();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/attempts/${attemptId}/study-pdf`);
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
      a.download = `medrank-estudo-${attemptId.slice(0, 8)}.pdf`;
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
    if (compact) return null;
    return (
      <p className="mt-6 rounded-lg bg-slate-100 p-4 text-sm text-slate-800 ring-1 ring-slate-200">
        {lockedMessage}
      </p>
    );
  }

  if (compact) {
    return (
      <div className="mt-3">
        <button
          type="button"
          disabled={loading}
          onClick={(e) => void download(e)}
          className="exam-tap w-full rounded-xl bg-teal-800 px-3 py-2.5 text-sm font-semibold text-white hover:bg-teal-900 disabled:opacity-50"
        >
          {loading ? 'Gerando…' : 'Baixar PDF'}
        </button>
        {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl bg-teal-900 p-5 text-white">
      <p className="text-sm font-semibold text-teal-100">Estudar depois</p>
      <p className="mt-1 text-sm text-teal-50">
        Após as 21h: PDF com gabarito, suas respostas e o que você acertou ou errou.
      </p>
      <button
        type="button"
        disabled={loading}
        onClick={() => void download()}
        className="exam-tap mt-4 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-teal-950 disabled:opacity-50"
      >
        {loading ? 'Gerando PDF…' : 'Baixar PDF para estudar'}
      </button>
      {error ? <p className="mt-2 text-sm text-red-200">{error}</p> : null}
    </div>
  );
}
