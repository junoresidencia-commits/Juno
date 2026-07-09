'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CHALLENGE_TYPE_LABELS } from '@/lib/challenges';
import type { ChallengeType } from '@/types/database';

interface Challenge {
  id: string;
  title: string;
  description: string | null;
  challenge_type: ChallengeType;
  target_value: number;
  topic: string | null;
  bonus_points: number;
  weekly_challenge_completions?: { user_id: string; profiles: { name: string } | { name: string }[] }[];
}

interface Props {
  challenges: Challenge[];
  weekStart: string;
  weekEnd: string;
}

export function ChallengeManager({ challenges, weekStart, weekEnd }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData(e.currentTarget);
    const challengeType = form.get('challenge_type') as ChallengeType;
    const body = {
      title: form.get('title'),
      description: form.get('description'),
      challenge_type: challengeType,
      target_value: form.get('target_value'),
      topic: challengeType === 'topic_accuracy' ? form.get('topic') : null,
      bonus_points: form.get('bonus_points'),
      week_start: weekStart,
      week_end: weekEnd,
    };

    const res = await fetch('/api/admin/challenges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Erro ao criar desafio');
      setLoading(false);
      return;
    }

    e.currentTarget.reset();
    router.refresh();
    setLoading(false);
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm';

  return (
    <div>
      <form onSubmit={handleSubmit} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="font-semibold">Novo desafio semanal</h2>
        <p className="text-xs text-slate-500">Semana: {weekStart} a {weekEnd}</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">Título *</label>
            <input name="title" required placeholder="Ex: Maratona da semana" className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">Descrição</label>
            <input name="description" placeholder="Descrição opcional" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium">Tipo *</label>
            <select name="challenge_type" required className={inputClass}>
              {Object.entries(CHALLENGE_TYPE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Meta *</label>
            <input name="target_value" type="number" required min={1} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium">Tema (para acerto por tema)</label>
            <input name="topic" placeholder="Ex: Nefrologia" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium">Pontos bônus</label>
            <input name="bonus_points" type="number" defaultValue={50} className={inputClass} />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Criando...' : 'Criar desafio'}
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {challenges.length === 0 ? (
          <p className="text-slate-500">Nenhum desafio esta semana.</p>
        ) : (
          challenges.map((ch) => {
            const completions = ch.weekly_challenge_completions ?? [];
            return (
              <div key={ch.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <h3 className="font-semibold">{ch.title}</h3>
                {ch.description && <p className="text-sm text-slate-600">{ch.description}</p>}
                <p className="mt-1 text-xs text-slate-500">
                  {CHALLENGE_TYPE_LABELS[ch.challenge_type]} · meta: {ch.target_value}
                  {ch.topic ? ` · ${ch.topic}` : ''} · +{ch.bonus_points} pts
                </p>
                {completions.length > 0 && (
                  <p className="mt-2 text-sm text-emerald-700">
                    Concluído por:{' '}
                    {completions.map((c, i) => {
                      const p = Array.isArray(c.profiles) ? c.profiles[0] : c.profiles;
                      return (
                        <span key={c.user_id}>
                          {i > 0 ? ', ' : ''}{p?.name ?? 'Aluno'}
                        </span>
                      );
                    })}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
