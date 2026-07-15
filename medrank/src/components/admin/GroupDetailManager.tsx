'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CHALLENGE_TYPE_LABELS } from '@/lib/challenges';
import type { ChallengeType } from '@/types/database';

type Member = { user_id: string; name: string; email: string; joined_at: string };
type Student = { id: string; name: string; email: string; active: boolean };
type RankingRow = {
  user_id: string;
  position: number | null;
  total_score: number;
  profiles?: { name?: string } | null;
};
type Challenge = {
  id: string;
  title: string;
  challenge_type: ChallengeType;
  target_value: number;
  bonus_points: number;
  weekly_challenge_completions?: { user_id: string }[];
};

export function GroupDetailManager({
  groupId,
  groupName,
  groupDescription,
  members: initialMembers,
  students,
  rankings,
  challenges: initialChallenges,
  weekStart,
  weekEnd,
}: {
  groupId: string;
  groupName: string;
  groupDescription: string | null;
  members: Member[];
  students: Student[];
  rankings: { daily: RankingRow[]; weekly: RankingRow[]; monthly: RankingRow[] };
  challenges: Challenge[];
  weekStart: string;
  weekEnd: string;
}) {
  const router = useRouter();
  const [members, setMembers] = useState(initialMembers);
  const [challenges, setChallenges] = useState(initialChallenges);
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selected, setSelected] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const memberIds = useMemo(() => new Set(members.map((m) => m.user_id)), [members]);
  const available = students.filter((s) => s.active && !memberIds.has(s.id));

  async function addMember() {
    if (!selected) return;
    setLoading(true);
    setError('');
    const res = await fetch(`/api/admin/groups/${groupId}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: selected }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? 'Falha ao adicionar');
      return;
    }
    setMembers(data.members ?? []);
    setSelected('');
    setMessage('Membro adicionado');
    router.refresh();
  }

  async function removeMember(userId: string) {
    setLoading(true);
    setError('');
    const res = await fetch(`/api/admin/groups/${groupId}/members`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? 'Falha ao remover');
      return;
    }
    setMembers((prev) => prev.filter((m) => m.user_id !== userId));
    setMessage('Membro removido');
    router.refresh();
  }

  async function createChallenge(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const form = new FormData(e.currentTarget);
    const challengeType = form.get('challenge_type') as ChallengeType;
    const res = await fetch(`/api/admin/groups/${groupId}/challenges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.get('title'),
        description: form.get('description'),
        challenge_type: challengeType,
        target_value: form.get('target_value'),
        topic: challengeType === 'topic_accuracy' ? form.get('topic') : null,
        bonus_points: form.get('bonus_points'),
        week_start: weekStart,
        week_end: weekEnd,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? 'Falha ao criar desafio');
      return;
    }
    setChallenges((prev) => [data.challenge, ...prev]);
    e.currentTarget.reset();
    setMessage('Desafio do grupo criado');
    router.refresh();
  }

  const rankingRows = rankings[period] ?? [];
  const inputClass = 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm';

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">{groupName}</h1>
        {groupDescription ? <p className="mt-1 text-slate-600">{groupDescription}</p> : null}
        {message ? <p className="mt-2 text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      </header>

      <section className="rounded-xl bg-white p-5 ring-1 ring-slate-200">
        <h2 className="font-semibold text-slate-900">Participantes ({members.length})</h2>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">Selecione um aluno…</option>
            {available.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {s.email}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={!selected || loading}
            onClick={addMember}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Adicionar
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {members.length === 0 ? (
            <li className="text-sm text-slate-600">Nenhum membro ainda.</li>
          ) : (
            members.map((m) => (
              <li
                key={m.user_id}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{m.name}</p>
                  <p className="text-xs text-slate-500">{m.email}</p>
                </div>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => removeMember(m.user_id)}
                  className="text-sm text-red-700 hover:underline"
                >
                  Remover
                </button>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="rounded-xl bg-white p-5 ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold text-slate-900">Ranking do grupo</h2>
          <div className="flex gap-1">
            {(['daily', 'weekly', 'monthly'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  period === p ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {p === 'daily' ? 'Diário' : p === 'weekly' ? 'Semanal' : 'Mensal'}
              </button>
            ))}
          </div>
        </div>
        <ol className="mt-4 space-y-2">
          {rankingRows.length === 0 ? (
            <li className="text-sm text-slate-600">Sem pontuações neste período.</li>
          ) : (
            rankingRows.map((r) => (
              <li
                key={r.user_id}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
              >
                <span>
                  {r.position}º · {r.profiles?.name ?? 'Aluno'}
                </span>
                <span className="text-slate-600">{r.total_score} pts</span>
              </li>
            ))
          )}
        </ol>
      </section>

      <section className="rounded-xl bg-white p-5 ring-1 ring-slate-200">
        <h2 className="font-semibold text-slate-900">Desafio exclusivo do grupo</h2>
        <p className="text-xs text-slate-600">
          Semana {weekStart} a {weekEnd} — só conta para membros deste grupo.
        </p>
        <form onSubmit={createChallenge} className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">Título *</label>
            <input name="title" required className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">Descrição</label>
            <input name="description" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium">Tipo *</label>
            <select name="challenge_type" required className={inputClass}>
              {Object.entries(CHALLENGE_TYPE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Meta *</label>
            <input name="target_value" type="number" required min={1} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium">Tema</label>
            <input name="topic" className={inputClass} placeholder="Para acerto por tema" />
          </div>
          <div>
            <label className="block text-sm font-medium">Bônus</label>
            <input name="bonus_points" type="number" defaultValue={50} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              Criar desafio do grupo
            </button>
          </div>
        </form>
        <ul className="mt-4 space-y-2">
          {challenges.map((c) => (
            <li key={c.id} className="rounded-lg bg-slate-50 px-3 py-2 text-sm">
              <p className="font-medium text-slate-900">{c.title}</p>
              <p className="text-slate-600">
                {CHALLENGE_TYPE_LABELS[c.challenge_type]} · meta {c.target_value} ·{' '}
                {c.weekly_challenge_completions?.length ?? 0} concluíram
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
