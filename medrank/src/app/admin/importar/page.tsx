'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ImportarPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ imported: number; errors: string[] } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const form = new FormData(e.currentTarget);
    const file = form.get('file') as File;

    const body = new FormData();
    body.append('file', file);

    const res = await fetch('/api/admin/import', { method: 'POST', body });
    const data = await res.json();

    if (!res.ok) {
      setResult({ imported: 0, errors: [data.error ?? 'Erro na importação'] });
    } else {
      setResult(data);
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
      <h1 className="mt-4 text-2xl font-bold">Importar questões</h1>
      <p className="mt-2 text-sm text-slate-600">
        Envie um arquivo CSV ou Excel com as colunas do template.
      </p>
      <a
        href="/templates/importacao-questoes.csv"
        className="mt-2 inline-block text-sm text-emerald-700 hover:underline"
      >
        Baixar template CSV
      </a>

      <form onSubmit={handleSubmit} className="mt-6 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <input
          name="file"
          type="file"
          accept=".csv,.xlsx,.xls"
          required
          className="text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Importando...' : 'Importar'}
        </button>
      </form>

      {result && (
        <div className="mt-6 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="font-medium text-emerald-700">{result.imported} questões importadas</p>
          {result.errors.length > 0 && (
            <ul className="mt-2 list-inside list-disc text-sm text-red-600">
              {result.errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
