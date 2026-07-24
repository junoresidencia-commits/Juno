'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { QUALITY_LABELS, type QualityLabel } from '@/lib/question-bank/quality-classify';

type Q = {
  id: string;
  statement: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  correct_option: string;
  explanation: string | null;
  source: string | null;
  year: number | null;
  specialty: string | null;
  topic: string | null;
  difficulty: string | null;
  bank_status?: string | null;
  question_origin?: string | null;
  quality_label?: string | null;
  quality_notes?: string | null;
  institution?: string | null;
  exam_name?: string | null;
  source_url?: string | null;
  official_answer?: string | null;
};

type LogRow = {
  id: string;
  action: string;
  reason: string;
  created_at: string;
  old_correct_option?: string | null;
  new_correct_option?: string | null;
};

export default function QuestaoEditorPage() {
  const params = useParams();
  const id = String(params?.id || '');
  const [q, setQ] = useState<Q | null>(null);
  const [log, setLog] = useState<LogRow[]>([]);
  const [reason, setReason] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [rescore, setRescore] = useState(true);

  async function load() {
    const res = await fetch(`/api/admin/questions/${id}`);
    const data = await res.json();
    if (!res.ok) {
      setErr(data.error || 'Falha ao carregar');
      return;
    }
    setQ(data.question);
    setLog(data.log || []);
  }

  useEffect(() => {
    if (id) void load();
  }, [id]);

  async function run(action: string, extra: Record<string, unknown> = {}) {
    if (!q) return;
    if (action !== 'approve' && reason.trim().length < 8) {
      setErr('Informe o motivo (mín. 8 caracteres)');
      return;
    }
    setBusy(true);
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch('/api/admin/questions/bank-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: q.id,
          action,
          reason: reason || 'Aprovada na auditoria',
          rescoreExams: rescore,
          ...extra,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Falha');
        return;
      }
      setMsg(data.message || 'Salvo');
      setQ(data.question);
      await load();
    } finally {
      setBusy(false);
    }
  }

  if (!q && !err) {
    return <p className="p-8 text-sm text-slate-500">Carregando…</p>;
  }
  if (!q) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-red-700">{err}</p>
        <Link href="/admin/questoes/auditoria" className="text-emerald-700 underline">
          ← Auditoria
        </Link>
      </div>
    );
  }

  const official = q.question_origin === 'official';

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin/questoes/auditoria" className="text-sm text-emerald-700 hover:underline">
        ← Auditoria
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Auditoria da questão</h1>
      <p className="mt-1 text-sm text-slate-600">
        {[q.institution || q.source, q.exam_name, q.year, q.question_origin, q.bank_status, q.quality_label]
          .filter(Boolean)
          .join(' · ')}
        {q.source_url ? (
          <>
            {' · '}
            <a href={q.source_url} target="_blank" rel="noreferrer" className="text-emerald-700 underline">
              fonte
            </a>
          </>
        ) : null}
      </p>

      {official && (
        <p className="mt-3 rounded-lg bg-teal-50 px-3 py-2 text-sm text-teal-900">
          Prova oficial: não reescreva o enunciado nem invente gabarito. Se a banca anulou, use
          “Anular oficial”.
        </p>
      )}

      <div className="mt-4 space-y-3 rounded-xl bg-white p-5 ring-1 ring-slate-200">
        <label className="block text-sm">
          Enunciado
          <textarea
            value={q.statement}
            disabled={official}
            onChange={(e) => setQ({ ...q, statement: e.target.value })}
            rows={8}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-50"
          />
        </label>
        {(['a', 'b', 'c', 'd', 'e'] as const).map((L) => (
          <label key={L} className="block text-sm">
            Alternativa {L.toUpperCase()}
            <input
              value={q[`option_${L}` as keyof Q] as string}
              disabled={official}
              onChange={(e) => setQ({ ...q, [`option_${L}`]: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-50"
            />
          </label>
        ))}
        <label className="block text-sm">
          Gabarito
          <select
            value={q.correct_option}
            onChange={(e) => setQ({ ...q, correct_option: e.target.value })}
            className="mt-1 rounded-lg border border-slate-300 px-3 py-2"
          >
            {['A', 'B', 'C', 'D', 'E'].map((L) => (
              <option key={L} value={L}>
                {L}
              </option>
            ))}
          </select>
          {q.official_answer ? (
            <span className="ml-2 text-xs text-slate-500">oficial: {q.official_answer}</span>
          ) : null}
        </label>
        <label className="block text-sm">
          Explicação (não altera gabarito)
          <textarea
            value={q.explanation || ''}
            onChange={(e) => setQ({ ...q, explanation: e.target.value })}
            rows={5}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm">
          Classificação
          <select
            value={q.quality_label || 'precisa_de_correcao'}
            onChange={(e) => setQ({ ...q, quality_label: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            {QUALITY_LABELS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Motivo da alteração (obrigatório)
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Ex.: enunciado óbvio; gabarito alinhado ao PDF oficial; anulada pela banca…"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={rescore} onChange={(e) => setRescore(e.target.checked)} />
          Recalcular provas onde esta questão já pontuou (zerar / devolver pontos via remediação)
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() =>
            void run('edit', {
              statement: q.statement,
              option_a: q.option_a,
              option_b: q.option_b,
              option_c: q.option_c,
              option_d: q.option_d,
              option_e: q.option_e,
              explanation: q.explanation,
              specialty: q.specialty,
              topic: q.topic,
              difficulty: q.difficulty,
            })
          }
          className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          Salvar edição
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void run('approve')}
          className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          Aprovar
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void run('suspend')}
          className="rounded-lg bg-amber-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          Suspender
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void run('exclude')}
          className="rounded-lg bg-red-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          Excluir do banco
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void run('fix_gabarito', { correct_option: q.correct_option })}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold disabled:opacity-50"
        >
          Corrigir gabarito
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() =>
            void run('set_label', { quality_label: q.quality_label as QualityLabel })
          }
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold disabled:opacity-50"
        >
          Salvar classificação
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void run('annul_official')}
          className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm font-semibold text-red-900 disabled:opacity-50"
        >
          Anular oficial
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void run('restore')}
          className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900 disabled:opacity-50"
        >
          Restaurar
        </button>
      </div>

      {msg && <p className="mt-3 text-sm text-emerald-800">{msg}</p>}
      {err && <p className="mt-3 text-sm text-red-700">{err}</p>}

      <section className="mt-8">
        <h2 className="font-semibold text-slate-900">Histórico</h2>
        <ul className="mt-2 space-y-2 text-xs text-slate-600">
          {log.length === 0 ? (
            <li>Sem registros (rode migration 032).</li>
          ) : (
            log.map((l) => (
              <li key={l.id} className="rounded-lg bg-slate-50 px-3 py-2">
                <strong>{l.action}</strong> · {new Date(l.created_at).toLocaleString('pt-BR')}
                {l.old_correct_option || l.new_correct_option
                  ? ` · gabarito ${l.old_correct_option || '?'}→${l.new_correct_option || '?'}`
                  : ''}
                <br />
                {l.reason}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
