'use client';

import { useEffect, useState } from 'react';
import type { OptionLetter } from '@/types/database';
import {
  WEEKLY_EXPERT_QUESTION_COUNT,
  WEEKLY_EXPERT_SCORE_MULTIPLIER,
  WEEKLY_EXPERT_WINDOW_START_HOUR,
} from '@/lib/exams/weekly-expert';

type QDraft = {
  statement: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  correct_option: OptionLetter;
  explanation: string;
  topic: string;
};

type ExistingExam = {
  id: string;
  title: string;
  date_available: string;
  status: string;
  total_questions: number;
  window_start_hour: number | null;
  score_multiplier: number | null;
};

function emptyQuestion(): QDraft {
  return {
    statement: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    option_e: '',
    correct_option: 'A',
    explanation: '',
    topic: 'Dose / medicação / caso clínico',
  };
}

function nextWednesday(from = new Date()): string {
  const d = new Date(from);
  const day = d.getDay(); // 0=dom
  const add = day <= 3 ? 3 - day : 10 - day;
  d.setDate(d.getDate() + (add === 0 ? 0 : add));
  return d.toISOString().slice(0, 10);
}

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-100';

export function WeeklyExpertForm() {
  const [date, setDate] = useState(nextWednesday);
  const [questions, setQuestions] = useState<QDraft[]>(() =>
    Array.from({ length: WEEKLY_EXPERT_QUESTION_COUNT }, emptyQuestion)
  );
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [existing, setExisting] = useState<ExistingExam[]>([]);

  async function refreshList() {
    const res = await fetch('/api/admin/weekly-expert');
    const data = await res.json();
    if (res.ok) setExisting(data.exams ?? []);
  }

  useEffect(() => {
    void refreshList();
  }, []);

  function updateQ(index: number, patch: Partial<QDraft>) {
    setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, ...patch } : q)));
  }

  async function submit(publish: boolean) {
    setBusy(true);
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch('/api/admin/weekly-expert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date_available: date,
          publish,
          questions,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Falha ao criar');
        return;
      }
      setMsg(data.message || 'Salvo.');
      setQuestions(Array.from({ length: WEEKLY_EXPERT_QUESTION_COUNT }, emptyQuestion));
      await refreshList();
    } finally {
      setBusy(false);
    }
  }

  async function setStatus(examId: string, status: 'published' | 'draft') {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch('/api/admin/weekly-expert', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examId, status }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Falha ao atualizar');
        return;
      }
      setMsg(status === 'published' ? 'Publicado — abre às 20h no dia.' : 'Voltou para rascunho.');
      await refreshList();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <h2 className="font-semibold text-slate-900">Como funciona</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
          <li>Você escreve 5 casos clínicos difíceis (dose, medicação, conduta…).</li>
          <li>Escolhe o dia (ex.: quarta) e salva — pode deixar em rascunho.</li>
          <li>No dia, publique. Os alunos só entram a partir das {WEEKLY_EXPERT_WINDOW_START_HOUR}h.</li>
          <li>Cada acerto vale {WEEKLY_EXPERT_SCORE_MULTIPLIER}× no ranking.</li>
        </ol>
      </section>

      {existing.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Já criados
          </h2>
          {existing.map((e) => (
            <div
              key={e.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200"
            >
              <div>
                <p className="font-medium text-slate-900">{e.title}</p>
                <p className="text-xs text-slate-600">
                  {e.date_available} · {e.status === 'published' ? 'Publicado' : 'Rascunho'} ·{' '}
                  {e.window_start_hour ?? WEEKLY_EXPERT_WINDOW_START_HOUR}h · ×
                  {e.score_multiplier ?? WEEKLY_EXPERT_SCORE_MULTIPLIER} pts
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={`/admin/provas/${e.id}/amostra`}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold"
                >
                  Ver
                </a>
                {e.status !== 'published' ? (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void setStatus(e.id, 'published')}
                    className="rounded-lg bg-teal-800 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                  >
                    Publicar
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void setStatus(e.id, 'draft')}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold disabled:opacity-50"
                  >
                    Despublicar
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <label className="block text-sm font-medium text-slate-900">
          Data do desafio *
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </label>
        <p className="mt-1 text-xs text-slate-500">
          Sugestão: quarta. Abre às {WEEKLY_EXPERT_WINDOW_START_HOUR}h (Brasília). Se às 17h ainda
          não estiver pronto, salve rascunho e publique no dia.
        </p>

        <div className="mt-6 space-y-6">
          {questions.map((q, i) => (
            <fieldset key={i} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <legend className="px-1 text-sm font-bold text-slate-900">Questão {i + 1}</legend>
              <label className="mt-2 block text-sm font-medium">
                Caso clínico / enunciado *
                <textarea
                  required
                  rows={4}
                  value={q.statement}
                  onChange={(e) => updateQ(i, { statement: e.target.value })}
                  className={inputClass}
                  placeholder="Paciente de 62 anos, DRC G4, em uso de…"
                />
              </label>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {(
                  [
                    ['option_a', 'A'],
                    ['option_b', 'B'],
                    ['option_c', 'C'],
                    ['option_d', 'D'],
                    ['option_e', 'E'],
                  ] as const
                ).map(([key, letter]) => (
                  <label key={key} className="block text-sm font-medium">
                    {letter} *
                    <input
                      value={q[key]}
                      onChange={(e) => updateQ(i, { [key]: e.target.value })}
                      className={inputClass}
                    />
                  </label>
                ))}
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="block text-sm font-medium">
                  Gabarito *
                  <select
                    value={q.correct_option}
                    onChange={(e) =>
                      updateQ(i, { correct_option: e.target.value as OptionLetter })
                    }
                    className={inputClass}
                  >
                    {(['A', 'B', 'C', 'D', 'E'] as const).map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium">
                  Tema
                  <input
                    value={q.topic}
                    onChange={(e) => updateQ(i, { topic: e.target.value })}
                    className={inputClass}
                  />
                </label>
              </div>
              <label className="mt-3 block text-sm font-medium">
                Comentário / justificativa
                <textarea
                  rows={2}
                  value={q.explanation}
                  onChange={(e) => updateQ(i, { explanation: e.target.value })}
                  className={inputClass}
                />
              </label>
            </fieldset>
          ))}
        </div>

        {err && <p className="mt-4 text-sm text-red-700">{err}</p>}
        {msg && <p className="mt-4 text-sm text-emerald-800">{msg}</p>}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            disabled={busy}
            onClick={() => void submit(false)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50"
          >
            {busy ? 'Salvando…' : 'Salvar rascunho'}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void submit(true)}
            className="rounded-xl bg-teal-800 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-900 disabled:opacity-50"
          >
            {busy ? 'Publicando…' : 'Criar e publicar'}
          </button>
        </div>
      </section>
    </div>
  );
}
