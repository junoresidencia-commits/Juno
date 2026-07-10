'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SimuladoMode } from '@/types/simulado';
import { RESIDENCY_AREAS } from '@/lib/question-bank/areas';

const MODES: { mode: SimuladoMode; title: string; description: string; icon: string }[] = [
  {
    mode: 'geral',
    title: 'Simulado geral aleatório',
    description: '20 questões multidisciplinares misturando todas as áreas.',
    icon: '🎲',
  },
  {
    mode: 'enare',
    title: 'Estilo ENARE',
    description: 'Distribuição equilibrada: CM, Cirurgia, GO, Pediatria e Preventiva.',
    icon: '🏥',
  },
  {
    mode: 'usp',
    title: 'Estilo USP',
    description: 'Questões com perfil de provas USP e casos clínicos integrados.',
    icon: '🎓',
  },
  {
    mode: 'revisao_erros',
    title: 'Revisão de erros',
    description: 'Somente questões que você errou em simulados anteriores.',
    icon: '🔁',
  },
];

interface Props {
  wrongCount: number;
}

export function SimuladoLauncher({ wrongCount }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<SimuladoMode | null>(null);
  const [area, setArea] = useState(RESIDENCY_AREAS[0]);
  const [theme, setTheme] = useState('');

  async function start(mode: SimuladoMode, extra?: { area?: string; theme?: string }) {
    setLoading(mode);
    try {
      const res = await fetch('/api/simulados/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, ...extra }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error ?? 'Erro ao iniciar simulado');
        return;
      }
      router.push(`/aluno/simulados/${data.id}`);
      router.refresh();
    } catch {
      alert('Erro de conexão');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {MODES.map((item) => (
          <button
            key={item.mode}
            type="button"
            disabled={loading !== null || (item.mode === 'revisao_erros' && wrongCount === 0)}
            onClick={() => start(item.mode)}
            className="rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-slate-200 transition hover:ring-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <p className="text-2xl">{item.icon}</p>
            <p className="mt-2 font-semibold">{item.title}</p>
            <p className="mt-1 text-sm text-slate-600">{item.description}</p>
            {item.mode === 'revisao_erros' && (
              <p className="mt-2 text-xs text-amber-700">{wrongCount} questões na fila de revisão</p>
            )}
            <p className="mt-3 text-xs font-medium text-emerald-700">
              {loading === item.mode ? 'Gerando...' : '20 questões · 30 min'}
            </p>
          </button>
        ))}
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">Simulado por área</h2>
        <p className="mt-1 text-sm text-slate-600">Foque em uma grande área da residência médica.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <select
            value={area}
            onChange={(e) => setArea(e.target.value as typeof area)}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {RESIDENCY_AREAS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <button
            type="button"
            disabled={loading !== null}
            onClick={() => start('area', { area })}
            className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading === 'area' ? 'Gerando...' : 'Iniciar'}
          </button>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">Simulado por tema</h2>
        <p className="mt-1 text-sm text-slate-600">Busque por tema, subtema ou palavra-chave.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="Ex.: nefrologia, sepse, trauma..."
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <button
            type="button"
            disabled={loading !== null || !theme.trim()}
            onClick={() => start('tema', { theme: theme.trim() })}
            className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading === 'tema' ? 'Gerando...' : 'Iniciar'}
          </button>
        </div>
      </section>
    </div>
  );
}
