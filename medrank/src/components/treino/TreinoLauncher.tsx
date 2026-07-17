'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TRACK_CONFIG, type TreinoTrack } from '@/lib/treino/bank';

interface Props {
  track: TreinoTrack;
  bankCount: number;
  topics: string[];
  dueReview: number;
  sessionBasePath: string;
}

export function TreinoLauncher({
  track,
  bankCount,
  topics,
  dueReview,
  sessionBasePath,
}: Props) {
  const router = useRouter();
  const cfg = TRACK_CONFIG[track];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [count, setCount] = useState(cfg.sizes[0]);
  const [topic, setTopic] = useState('');
  const [liga, setLiga] = useState(cfg.ligas[0] ?? '');

  async function start(mode: 'prova' | 'tema' | 'srs' | 'liga') {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/treino/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          track,
          count: mode === 'srs' ? Math.min(20, count) : count,
          mode,
          topic: mode === 'tema' ? topic : null,
          liga: mode === 'liga' ? liga : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Erro ao iniciar treino');
        return;
      }
      router.push(`${sessionBasePath}/${data.id}`);
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
        <h2 className="font-semibold text-slate-900">Simulado automático</h2>
        <p className="mt-1 text-sm text-slate-600">
          Cronometrado · mistura de dificuldade · evita questões recentes
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {cfg.sizes.map((n) => (
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
              {n} Q · {n * 3} min
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={loading || bankCount < count}
          onClick={() => void start('prova')}
          className="mt-4 w-full rounded-2xl bg-teal-700 px-6 py-4 text-base font-bold text-white hover:bg-teal-800 disabled:opacity-50"
        >
          {loading ? 'Montando…' : `Começar · ${count} questões`}
        </button>
      </section>

      {cfg.ligas.length > 0 && (
        <section className="rounded-2xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <h2 className="font-semibold text-slate-900">Ligas / modos</h2>
          <p className="mt-1 text-sm text-slate-600">
            Cada liga enviesa os temas (ex.: Plantão → UTI/IRA/CRRT).
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <select
              value={liga}
              onChange={(e) => setLiga(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              {cfg.ligas.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <button
              type="button"
              disabled={loading || bankCount < 20}
              onClick={() => void start('liga')}
              className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
            >
              Entrar na liga
            </button>
          </div>
        </section>
      )}

      <section className="rounded-2xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <h2 className="font-semibold text-slate-900">Por tema</h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={loading || !topic}
            onClick={() => void start('tema')}
            className="rounded-lg bg-teal-700 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Treinar
          </button>
        </div>
      </section>

      <section className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100">
        <h2 className="font-semibold text-amber-950">Revisão espaçada</h2>
        <p className="mt-1 text-sm text-amber-900">
          1 · 7 · 15 · 30 · 90 dias · fila: {dueReview}
        </p>
        <button
          type="button"
          disabled={loading || dueReview === 0}
          onClick={() => void start('srs')}
          className="mt-4 rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          Revisar erros
        </button>
      </section>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
