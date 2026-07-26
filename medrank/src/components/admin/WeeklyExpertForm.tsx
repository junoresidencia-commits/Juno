'use client';

import { useEffect, useState } from 'react';
import type { OptionLetter } from '@/types/database';
import { todayDateStringBrazil } from '@/lib/exams/window';
import {
  WEEKLY_EXPERT_QUESTION_COUNT,
  WEEKLY_EXPERT_SCORE_MULTIPLIER,
  WEEKLY_EXPERT_WINDOW_END_HOUR,
  WEEKLY_EXPERT_WINDOW_HOURS,
  WEEKLY_EXPERT_WINDOW_START_HOUR,
  weeklyExpertWindowLabel,
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
  image_url: string;
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
    image_url: '',
  };
}

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-100';

export function WeeklyExpertForm() {
  const [date, setDate] = useState(() => todayDateStringBrazil());
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

  async function uploadImage(index: number, file: File | null) {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const body = new FormData();
      body.append('file', file);
      body.append('folder', `expert-${date}`);
      const res = await fetch('/api/admin/question-images', { method: 'POST', body });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || `Falha no upload (questão ${index + 1})`);
        return;
      }
      updateQ(index, { image_url: data.url as string });
      setMsg(`Imagem da questão ${index + 1} enviada.`);
    } finally {
      setBusy(false);
    }
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
      setMsg(
        status === 'published'
          ? `Publicado — alunos têm ${WEEKLY_EXPERT_WINDOW_HOURS}h (${weeklyExpertWindowLabel()}) nesse dia.`
          : 'Voltou para rascunho.'
      );
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
          <li>
            <strong>Você escolhe o dia</strong> — não é fixo (pode ser qualquer dia da semana).
          </li>
          <li>
            Publique quando quiser. Alunos só fazem nesse dia, das{' '}
            {weeklyExpertWindowLabel()} ({WEEKLY_EXPERT_WINDOW_HOURS} horas).
          </li>
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
                  {weeklyExpertWindowLabel(
                    e.window_start_hour ?? WEEKLY_EXPERT_WINDOW_START_HOUR,
                    WEEKLY_EXPERT_WINDOW_END_HOUR
                  )}{' '}
                  · ×{e.score_multiplier ?? WEEKLY_EXPERT_SCORE_MULTIPLIER} pts
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
          Escolha o dia *
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </label>
        <p className="mt-1 text-xs text-slate-500">
          Dia livre — você decide cada semana. Janela: {weeklyExpertWindowLabel()} (Brasília), só{' '}
          {WEEKLY_EXPERT_WINDOW_HOURS} horas. Se ainda não estiver pronto, salve rascunho e publique
          no dia.
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

              <div className="mt-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                <p className="text-sm font-medium text-slate-800">Imagem (opcional)</p>
                <p className="mt-0.5 text-xs text-slate-600">
                  ECG, TC, curva, foto de exame — JPG/PNG/WEBP até 5 MB.
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <label className="inline-flex cursor-pointer rounded-lg bg-teal-800 px-3 py-2 text-xs font-semibold text-white hover:bg-teal-900">
                    Enviar arquivo
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      disabled={busy}
                      onChange={(e) => {
                        const f = e.target.files?.[0] ?? null;
                        e.target.value = '';
                        void uploadImage(i, f);
                      }}
                    />
                  </label>
                  {q.image_url ? (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => updateQ(i, { image_url: '' })}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Remover imagem
                    </button>
                  ) : null}
                </div>
                <label className="mt-2 block text-xs font-medium text-slate-700">
                  Ou cole uma URL
                  <input
                    value={q.image_url}
                    onChange={(e) => updateQ(i, { image_url: e.target.value })}
                    className={inputClass}
                    placeholder="https://…"
                  />
                </label>
                {q.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={q.image_url}
                    alt={`Prévia questão ${i + 1}`}
                    className="mt-2 max-h-48 w-full rounded-lg object-contain ring-1 ring-slate-200"
                  />
                ) : null}
              </div>

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
