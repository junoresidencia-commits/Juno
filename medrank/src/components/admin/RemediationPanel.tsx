'use client';

import { useMemo, useState } from 'react';
import {
  REMEDIATION_ACTION_LABELS,
  type RemediationAction,
} from '@/lib/exams/remediation';
import type { OptionLetter } from '@/types/database';

export type RemediationQuestionRow = {
  questionId: string;
  orderNumber: number;
  statement: string;
  correctOption: OptionLetter;
  overrideStatus: 'active' | 'annulled' | null;
  overrideCorrect: OptionLetter | null;
  answered: number;
  correctCount: number;
  options: Partial<Record<OptionLetter, string>>;
};

type Props = {
  examId: string;
  examTitle: string;
  questions: RemediationQuestionRow[];
  initialHistory: Array<{
    id: string;
    action: string;
    reason: string;
    created_at: string;
    attempts_updated: number;
    notified_count: number;
    old_correct_option: string | null;
    new_correct_option: string | null;
  }>;
};

export function RemediationPanel({ examId, examTitle, questions, initialHistory }: Props) {
  const [rows, setRows] = useState(questions);
  const [history, setHistory] = useState(initialHistory);
  const [selectedId, setSelectedId] = useState(questions[0]?.questionId ?? '');
  const [action, setAction] = useState<RemediationAction>('annul');
  const [newCorrect, setNewCorrect] = useState<OptionLetter>('A');
  const [bankWide, setBankWide] = useState(false);
  const [notifyUsers, setNotifyUsers] = useState(true);
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selected = useMemo(
    () => rows.find((q) => q.questionId === selectedId) ?? null,
    [rows, selectedId]
  );

  async function apply() {
    if (!selected) return;
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/remediations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId,
          questionId: selected.questionId,
          action,
          reason,
          newCorrectOption: action === 'change_gabarito' ? newCorrect : null,
          bankWide,
          notifyUsers,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Falha ao aplicar remediação');
        return;
      }

      const result = data.result ?? {};
      setMessage(
        `Aplicado: ${REMEDIATION_ACTION_LABELS[action]}. ` +
          `${result.attempts_updated ?? 0} tentativas recalculadas · ` +
          `${result.notified_count ?? 0} notificações · ranking atualizado.`
      );

      setRows((prev) =>
        prev.map((q) => {
          if (q.questionId !== selected.questionId) return q;
          if (action === 'annul' || action === 'zero_score') {
            return { ...q, overrideStatus: 'annulled', overrideCorrect: null };
          }
          if (action === 'change_gabarito') {
            return {
              ...q,
              overrideStatus: 'active',
              overrideCorrect: newCorrect,
              correctOption: newCorrect,
            };
          }
          if (action === 'restore') {
            return { ...q, overrideStatus: null, overrideCorrect: null };
          }
          return q;
        })
      );

      const histRes = await fetch(`/api/admin/remediations?examId=${examId}`);
      const histData = await histRes.json().catch(() => ({}));
      if (histRes.ok && Array.isArray(histData.remediations)) {
        setHistory(histData.remediations);
      }
      setReason('');
    } catch {
      setError('Erro de rede ao aplicar remediação');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
        <h1 className="text-xl font-bold text-amber-950">Remediação de questões</h1>
        <p className="mt-1 text-sm text-amber-900">
          Prova: <strong>{examTitle}</strong>. Anule, zere ou corrija o gabarito — o sistema
          recalcula pontuação e ranking de todos automaticamente e pode notificar os alunos.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <section className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
          <h2 className="mb-3 font-semibold text-slate-900">Questões da prova</h2>
          <div className="max-h-[32rem] space-y-2 overflow-y-auto">
            {rows.map((q) => {
              const active = q.questionId === selectedId;
              const pct =
                q.answered > 0 ? Math.round((q.correctCount / q.answered) * 100) : null;
              return (
                <button
                  key={q.questionId}
                  type="button"
                  onClick={() => setSelectedId(q.questionId)}
                  className={`w-full rounded-xl border p-3 text-left transition ${
                    active
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">#{q.orderNumber}</span>
                    <span>Gabarito {q.overrideCorrect ?? q.correctOption}</span>
                    {pct != null && <span>{pct}% acerto ({q.correctCount}/{q.answered})</span>}
                    {q.overrideStatus === 'annulled' && (
                      <span className="rounded bg-red-100 px-1.5 py-0.5 font-medium text-red-800">
                        Anulada
                      </span>
                    )}
                    {q.overrideStatus === 'active' && q.overrideCorrect && (
                      <span className="rounded bg-sky-100 px-1.5 py-0.5 font-medium text-sky-800">
                        Gabarito ajustado
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-900">{q.statement}</p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          {selected ? (
            <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <h2 className="font-semibold text-slate-900">Questão #{selected.orderNumber}</h2>
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-800">{selected.statement}</p>
              <ul className="mt-3 space-y-1 text-sm text-slate-700">
                {(['A', 'B', 'C', 'D', 'E'] as OptionLetter[]).map((L) => {
                  const text = selected.options[L];
                  if (!text) return null;
                  const isCorrect = (selected.overrideCorrect ?? selected.correctOption) === L;
                  return (
                    <li key={L} className={isCorrect ? 'font-semibold text-emerald-800' : ''}>
                      {L}) {text}
                      {isCorrect ? ' ← gabarito' : ''}
                    </li>
                  );
                })}
              </ul>

              <label className="mt-4 block text-sm font-medium text-slate-700">
                Ação
                <select
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={action}
                  onChange={(e) => setAction(e.target.value as RemediationAction)}
                >
                  {(Object.keys(REMEDIATION_ACTION_LABELS) as RemediationAction[]).map((key) => (
                    <option key={key} value={key}>
                      {REMEDIATION_ACTION_LABELS[key]}
                    </option>
                  ))}
                </select>
              </label>

              {action === 'change_gabarito' && (
                <div className="mt-3 space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Novo gabarito
                    <select
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                      value={newCorrect}
                      onChange={(e) => setNewCorrect(e.target.value as OptionLetter)}
                    >
                      {(['A', 'B', 'C', 'D', 'E'] as OptionLetter[]).map((L) => (
                        <option key={L} value={L}>
                          {L}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={bankWide}
                      onChange={(e) => setBankWide(e.target.checked)}
                    />
                    Também corrigir no banco global (todas as provas futuras)
                  </label>
                </div>
              )}

              <label className="mt-3 block text-sm font-medium text-slate-700">
                Motivo (obrigatório)
                <textarea
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Ex.: Recurso aceito — gabarito oficial é C; anulação por ambiguidade no enunciado."
                />
              </label>

              <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={notifyUsers}
                  onChange={(e) => setNotifyUsers(e.target.checked)}
                />
                Notificar participantes que fizeram esta prova
              </label>

              <button
                type="button"
                disabled={busy || reason.trim().length < 8}
                onClick={apply}
                className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {busy ? 'Aplicando e recalculando…' : 'Aplicar e recalcular ranking'}
              </button>

              {message && (
                <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">{message}</p>
              )}
              {error && (
                <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Nenhuma questão nesta prova.</p>
          )}

          <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <h2 className="font-semibold text-slate-900">Histórico nesta prova</h2>
            {history.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">Nenhuma remediação ainda.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {history.map((h) => (
                  <li key={h.id} className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700">
                    <p className="font-medium text-slate-900">
                      {REMEDIATION_ACTION_LABELS[h.action as RemediationAction] ?? h.action}
                      {h.old_correct_option && h.new_correct_option
                        ? ` (${h.old_correct_option}→${h.new_correct_option})`
                        : ''}
                    </p>
                    <p className="mt-0.5">{h.reason}</p>
                    <p className="mt-0.5 text-slate-500">
                      {new Date(h.created_at).toLocaleString('pt-BR')} · {h.attempts_updated}{' '}
                      tentativas · {h.notified_count} avisos
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
