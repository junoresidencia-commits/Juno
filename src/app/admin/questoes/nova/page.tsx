'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SOURCE_OPTIONS } from '@/lib/format';

export default function NovaQuestaoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form.entries());

    const res = await fetch('/api/admin/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? 'Erro ao salvar');
      setLoading(false);
      return;
    }

    router.push('/admin/questoes');
    router.refresh();
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200';

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/admin/questoes" className="text-sm text-emerald-700 hover:underline">
        ← Voltar
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Nova questão</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Enunciado *</label>
          <textarea name="statement" required rows={4} className={inputClass} />
        </div>

        {['a', 'b', 'c', 'd', 'e'].map((l) => (
          <div key={l}>
            <label className="block text-sm font-medium">Alternativa {l.toUpperCase()} *</label>
            <input name={`option_${l}`} required className={inputClass} />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium">Alternativa correta *</label>
          <select name="correct_option" required className={inputClass}>
            {['A', 'B', 'C', 'D', 'E'].map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Comentário</label>
          <textarea name="explanation" rows={3} className={inputClass} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Origem</label>
            <select name="source" className={inputClass}>
              <option value="">Selecione</option>
              {SOURCE_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Ano</label>
            <input name="year" type="number" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium">Especialidade</label>
            <input name="specialty" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium">Tema</label>
            <input name="topic" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium">Subtema</label>
            <input name="subtopic" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium">Dificuldade</label>
            <select name="difficulty" className={inputClass}>
              <option value="">Selecione</option>
              <option value="facil">Fácil</option>
              <option value="medio">Médio</option>
              <option value="dificil">Difícil</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Tags (separadas por vírgula)</label>
          <input name="tags" className={inputClass} placeholder="IRA, eletrólitos" />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar questão'}
        </button>
      </form>
    </div>
  );
}
