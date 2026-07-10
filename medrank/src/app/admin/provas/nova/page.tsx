'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SOURCE_OPTIONS } from '@/lib/format';
import { QuestionPicker } from '@/components/admin/QuestionPicker';
import type { SelectionMode } from '@/types/database';

export default function NovaProvaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<SelectionMode>('auto');
  const [totalQuestions, setTotalQuestions] = useState(20);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData(e.currentTarget);
    const body = {
      title: form.get('title'),
      date_available: form.get('date_available'),
      duration_minutes: form.get('duration_minutes'),
      total_questions: totalQuestions,
      source_filter: form.get('source_filter') || null,
      topic_filter: form.get('topic_filter') || null,
      selection_mode: mode,
      question_ids: mode === 'manual' ? selectedIds : [],
      publish: form.get('publish') === 'on',
      show_answers_after_submit: form.get('show_answers_after_submit') === 'on',
      show_answers_when_all_done: form.get('show_answers_when_all_done') === 'on',
    };

    const res = await fetch('/api/admin/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Erro ao criar prova');
      setLoading(false);
      return;
    }

    router.push('/admin/provas');
    router.refresh();
  }

  const today = new Date().toISOString().split('T')[0];
  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200';

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin/provas" className="text-sm text-emerald-700 hover:underline">
        ← Voltar
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Nova prova</h1>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => { setMode('auto'); setSelectedIds([]); }}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            mode === 'auto' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-900 ring-1 ring-slate-200'
          }`}
        >
          Sorteio automático
        </button>
        <button
          type="button"
          onClick={() => setMode('manual')}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            mode === 'manual' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-900 ring-1 ring-slate-200'
          }`}
        >
          Seleção manual
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Título *</label>
          <input name="title" required defaultValue={`Prova ${today}`} className={inputClass} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Data *</label>
            <input name="date_available" type="date" required defaultValue={today} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium">Duração (min) *</label>
            <input name="duration_minutes" type="number" required defaultValue={30} min={5} max={180} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium">Qtd. questões *</label>
            <input
              name="total_questions"
              type="number"
              required
              value={totalQuestions}
              onChange={(e) => {
                const n = Number(e.target.value);
                setTotalQuestions(n);
                if (selectedIds.length > n) setSelectedIds(selectedIds.slice(0, n));
              }}
              min={1}
              max={50}
              className={inputClass}
            />
          </div>
          {mode === 'auto' && (
            <>
              <div>
                <label className="block text-sm font-medium">Filtrar por origem</label>
                <select name="source_filter" className={inputClass}>
                  <option value="">Todas</option>
                  {SOURCE_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Filtrar por tema</label>
                <input name="topic_filter" placeholder="Ex: Nefrologia" className={inputClass} />
              </div>
            </>
          )}
        </div>

        {mode === 'manual' && (
          <QuestionPicker
            totalQuestions={totalQuestions}
            selectedIds={selectedIds}
            onChange={setSelectedIds}
          />
        )}

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="show_answers_after_submit" />
            Liberar gabarito imediatamente após envio
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="show_answers_when_all_done" />
            Liberar gabarito quando todos terminarem
          </label>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" name="publish" defaultChecked />
            Publicar prova agora
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading || (mode === 'manual' && selectedIds.length !== totalQuestions)}
          className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Criando...' : mode === 'manual' ? 'Criar prova com questões selecionadas' : 'Criar prova (sorteio automático)'}
        </button>
      </form>
    </div>
  );
}
