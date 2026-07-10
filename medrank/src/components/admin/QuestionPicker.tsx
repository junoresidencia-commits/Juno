'use client';

import { useCallback, useEffect, useState } from 'react';
import { SOURCE_OPTIONS } from '@/lib/format';

interface QuestionItem {
  id: string;
  statement: string;
  source: string | null;
  topic: string | null;
  difficulty: string | null;
}

interface Props {
  totalQuestions: number;
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export function QuestionPicker({ totalQuestions, selectedIds, onChange }: Props) {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('');
  const [topic, setTopic] = useState('');
  const [search, setSearch] = useState('');

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '50' });
    if (source) params.set('source', source);
    if (topic) params.set('topic', topic);
    if (search) params.set('search', search);

    const res = await fetch(`/api/admin/questions/list?${params}`);
    const data = await res.json();
    setQuestions(data.questions ?? []);
    setLoading(false);
  }, [source, topic, search]);

  useEffect(() => {
    const t = setTimeout(loadQuestions, 300);
    return () => clearTimeout(t);
  }, [loadQuestions]);

  function toggle(id: string) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((x) => x !== id));
    } else if (selectedIds.length < totalQuestions) {
      onChange([...selectedIds, id]);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium">
          Selecionadas: {selectedIds.length}/{totalQuestions}
        </p>
        {selectedIds.length === totalQuestions && (
          <span className="text-xs text-emerald-600">✓ Quantidade atingida</span>
        )}
      </div>

      <div className="mb-3 grid gap-2 sm:grid-cols-3">
        <input
          placeholder="Buscar enunciado..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Todas origens</option>
          {SOURCE_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          placeholder="Filtrar tema..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="max-h-80 space-y-2 overflow-y-auto">
        {loading ? (
          <p className="text-sm text-slate-600">Carregando...</p>
        ) : questions.length === 0 ? (
          <p className="text-sm text-slate-600">Nenhuma questão encontrada.</p>
        ) : (
          questions.map((q) => {
            const checked = selectedIds.includes(q.id);
            const disabled = !checked && selectedIds.length >= totalQuestions;
            return (
              <label
                key={q.id}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm ${
                  checked ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-white'
                } ${disabled ? 'opacity-50' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => toggle(q.id)}
                  className="mt-1"
                />
                <div>
                  <p className="line-clamp-2">{q.statement}</p>
                  <p className="mt-1 text-xs text-slate-600">
                    {q.source} · {q.topic ?? 'Sem tema'}
                  </p>
                </div>
              </label>
            );
          })
        )}
      </div>
    </div>
  );
}
