'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TREINO_SIZE_OPTIONS } from '@/lib/treino/config';

interface Props {
  bankCount: number;
  topics: string[];
  dueReview: number;
}

export function NefropediatriaLauncher({ bankCount, topics, dueReview }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [count, setCount] = useState<(typeof TREINO_SIZE_OPTIONS)[number]>(20);
  const [topic, setTopic] = useState('');

  async function start(mode: 'prova' | 'tema' | 'srs') {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/treino/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          track: 'nefropediatria',
          count: mode === 'srs' ? 20 : count,
          mode,
          topic: mode === 'tema' ? topic : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Erro ao iniciar treino');
        return;
      }
      router.push(`/aluno/treino/nefropediatria/${data.id}`);
      router.refresh();
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <h2 className="font-semibold text-slate-900">Modo prova</h2>
        <p className="mt-1 text-sm text-slate-600">
          Cronometrado · mistura fácil/médio/difícil · evita questões recentes
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {TREINO_SIZE_OPTIONS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setCount(n)}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                count === n
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {n} Q{n === 60 ? ' (SBN)' : ''} · {n * 3} min
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={loading || bankCount < count}
          onClick={() => void start('prova')}
          className="mt-4 w-full rounded-2xl bg-teal-700 px-6 py-4 text-base font-bold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Montando prova…' : `Começar · ${count} questões`}
        </button>
      </section>

      <section className="rounded-2xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <h2 className="font-semibold text-slate-900">Por tema</h2>
        <p className="mt-1 text-sm text-slate-600">Foque em um tópico do programa SBN/SBP.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">Selecione o tema</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={loading || !topic || bankCount < 20}
            onClick={() => void start('tema')}
            className="rounded-lg bg-teal-700 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-50"
          >
            Treinar tema
          </button>
        </div>
      </section>

      <section className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100">
        <h2 className="font-semibold text-amber-950">Revisão espaçada</h2>
        <p className="mt-1 text-sm text-amber-900">
          Questões erradas voltam em 1 · 7 · 15 · 30 · 90 dias. Agora: {dueReview} na fila.
        </p>
        <button
          type="button"
          disabled={loading || dueReview === 0}
          onClick={() => void start('srs')}
          className="mt-4 rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-50"
        >
          Revisar erros devidos
        </button>
      </section>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {bankCount < 20 && (
        <p className="text-sm text-amber-700">
          Banco insuficiente. Admin → Questões → Importar banco completo.
        </p>
      )}
    </div>
  );
}
