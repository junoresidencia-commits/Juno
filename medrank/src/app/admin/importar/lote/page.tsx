'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

const REPO_LOTES = [
  'MEDRANK_AUTORAL_2026_LOTE_01',
  'MEDRANK_AUTORAL_2026_LOTE_02',
  'MEDRANK_AUTORAL_2026_LOTE_03',
  'MEDRANK_AUTORAL_2026_LOTE_04',
  'MEDRANK_AUTORAL_2026_LOTE_05',
  'MEDRANK_AUTORAL_2026_LOTE_06',
  'MEDRANK_AUTORAL_2026_LOTE_07',
  'MEDRANK_AUTORAL_2026_LOTE_08',
  'MEDRANK_AUTORAL_2026_LOTE_09',
  'MEDRANK_AUTORAL_2026_LOTE_10',
  'MEDRANK_AUTORAL_2026_LOTE_11',
  'MEDRANK_NEFRO_NEFROPED_2026_LOTE_12',
  'MEDRANK_NEFRO_NEFROPED_2026_LOTE_13',
  'MEDRANK_NEFRO_NEFROPED_2026_LOTE_14',
  'MEDRANK_NEFRO_NEFROPED_2026_LOTE_15',
  'MEDRANK_NEFRO_NEFROPED_2026_LOTE_16',
  'MEDRANK_NEFRO_NEFROPED_2026_LOTE_17',
  'MEDRANK_NEFRO_NEFROPED_2026_LOTE_18',
  'MEDRANK_NEFRO_NEFROPED_2026_LOTE_19',
] as const;

function loteLabel(lote: string): string {
  return lote
    .replace('MEDRANK_AUTORAL_2026_', '')
    .replace('MEDRANK_NEFRO_NEFROPED_2026_', 'NEFRO_');
}

type PreviewRow = {
  index: number;
  id_externo: string;
  tipo_da_questao: string;
  especialidade: string | null;
  tema: string | null;
  dificuldade: string | null;
  enunciado_preview: string;
  resposta_correta: string;
  referencia: string;
  diretriz: string;
  ok: boolean;
  errors: { message: string }[];
};

type Batch = {
  id: string;
  title: string;
  lote_codigo: string | null;
  status: string;
  question_count: number;
  approved_count: number;
  created_at: string;
};

export default function ImportarLotePage() {
  const [format, setFormat] = useState<'json' | 'csv'>('json');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState<PreviewRow[] | null>(null);
  const [summary, setSummary] = useState<Record<string, unknown> | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [loadedLote, setLoadedLote] = useState<string | null>(null);

  const loadBatches = useCallback(async () => {
    const res = await fetch('/api/admin/batches/authorial');
    const data = await res.json();
    if (res.ok) setBatches(data.batches || []);
  }, []);

  useEffect(() => {
    void loadBatches();
  }, [loadBatches]);

  async function run(commit: boolean) {
    setBusy(true);
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch('/api/admin/batches/authorial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format, content, commit, title: title || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Falha');
        if (data.preview) setPreview(data.preview);
        if (data.summary) setSummary(data.summary);
        return;
      }
      setPreview(data.preview || null);
      setSummary(data.summary || null);
      setMsg(data.message || 'Ok');
      if (commit) {
        setContent('');
        await loadBatches();
      }
    } finally {
      setBusy(false);
    }
  }

  async function onFile(file: File | null) {
    if (!file) return;
    const text = await file.text();
    setContent(text);
    setPreview(null);
    setSummary(null);
    setLoadedLote(file.name);
    if (file.name.endsWith('.csv')) setFormat('csv');
    else setFormat('json');
  }

  async function loadRepoLote(loteCodigo: string) {
    setBusy(true);
    setMsg(null);
    setErr(null);
    setPreview(null);
    setSummary(null);
    try {
      const res = await fetch(`/templates/${loteCodigo}.json`);
      if (!res.ok) {
        setErr(`Não achei ${loteCodigo}.json no app (deploy pode estar antigo).`);
        return;
      }
      const text = await res.text();
      setFormat('json');
      setContent(text);
      setTitle(`MedRank — ${loteLabel(loteCodigo)}`);
      setLoadedLote(loteCodigo);
      setMsg(`Lote ${loteLabel(loteCodigo)} carregado. Clique em Validar e prévia.`);
    } catch {
      setErr('Falha ao carregar o lote do app.');
    } finally {
      setBusy(false);
    }
  }

  async function batchAction(id: string, action: 'publish' | 'suspend' | 'delete' | 'undo') {
    const reason =
      action === 'publish'
        ? 'Lote publicado após revisão'
        : window.prompt('Motivo:') || '';
    if (action !== 'publish' && reason.length < 5) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/batches/authorial/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, reason }),
      });
      const data = await res.json();
      if (!res.ok) setErr(data.error || 'Falha');
      else setMsg(data.message || 'Ok');
      await loadBatches();
    } finally {
      setBusy(false);
    }
  }

  async function undoLast() {
    if (!window.confirm('Desfazer a última importação de lote autoral?')) return;
    setBusy(true);
    try {
      const res = await fetch('/api/admin/batches/authorial/undo-last', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'Desfazer última importação pelo painel' }),
      });
      const data = await res.json();
      if (!res.ok) setErr(data.error || 'Falha');
      else setMsg(data.message || 'Ok');
      await loadBatches();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/admin/importar" className="text-sm text-emerald-700 hover:underline">
        ← Importar
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Importar lote de questões</h1>
      <p className="mt-2 text-sm text-slate-600">
        Carregue um lote pronto abaixo (ou envie arquivo / cole JSON). Entra como{' '}
        <strong>rascunho</strong> — nunca como prova oficial USP/ENARE. Sem API paga.
      </p>

      <div className="mt-4 rounded-xl bg-teal-50 p-4 ring-1 ring-teal-200">
        <p className="text-sm font-semibold text-teal-950">
          Lotes autorais prontos (JSON) — 50 questões cada
        </p>
        <p className="mt-1 text-xs text-teal-900">
          <strong>Carregar aqui</strong> ou <strong>Baixar JSON</strong> + Escolher arquivo. Depois:
          Validar → Confirmar. Um por vez. Autoral (rascunho), não ENARE.
        </p>
        <ul className="mt-3 space-y-2">
          {REPO_LOTES.map((lote) => {
            const label = loteLabel(lote);
            const href = `/templates/${lote}.json`;
            const active = loadedLote === lote;
            const nefro = lote.includes('NEFRO');
            return (
              <li
                key={lote}
                className="flex flex-wrap items-center gap-2 rounded-lg bg-white/80 px-3 py-2 ring-1 ring-teal-200"
              >
                <span className="min-w-[6.5rem] text-xs font-bold text-teal-950">
                  {label}
                  {nefro ? (
                    <span className="ml-1 font-medium text-teal-700">nefro</span>
                  ) : null}
                </span>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void loadRepoLote(lote)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50 ${
                    active ? 'bg-teal-900' : 'bg-teal-700'
                  }`}
                >
                  Carregar aqui
                </button>
                <a
                  href={href}
                  download={`${lote}.json`}
                  className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-teal-900 ring-1 ring-teal-300"
                >
                  Baixar JSON
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 space-y-3 rounded-xl bg-white p-5 ring-1 ring-slate-200">
        <label className="block text-sm">
          Título do lote (opcional)
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Lote Clínica — diretrizes 2025/2026"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFormat('json')}
            className={`rounded-lg px-3 py-1.5 text-sm ${format === 'json' ? 'bg-teal-700 text-white' : 'bg-slate-100'}`}
          >
            JSON
          </button>
          <button
            type="button"
            onClick={() => setFormat('csv')}
            className={`rounded-lg px-3 py-1.5 text-sm ${format === 'csv' ? 'bg-teal-700 text-white' : 'bg-slate-100'}`}
          >
            CSV
          </button>
          <input
            type="file"
            accept=".json,.csv,application/json,text/csv"
            onChange={(e) => void onFile(e.target.files?.[0] || null)}
            className="text-sm"
          />
        </div>
        {loadedLote && (
          <p className="text-xs text-slate-500">
            Carregado: <code>{loadedLote}</code>
          </p>
        )}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs"
          placeholder='[{ "id_externo": "...", "lote_importacao": "LOTE-001", ... }]'
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy || !content.trim()}
            onClick={() => void run(false)}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Validar e prévia
          </button>
          <button
            type="button"
            disabled={busy || !content.trim() || !preview}
            onClick={() => {
              if (window.confirm('Importar questões válidas como RASCUNHO?')) void run(true);
            }}
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Confirmar importação (rascunho)
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void undoLast()}
            className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-900 disabled:opacity-50"
          >
            Desfazer última importação
          </button>
        </div>
      </div>

      {msg && <p className="mt-3 text-sm text-emerald-800">{msg}</p>}
      {err && <p className="mt-3 text-sm text-red-700">{err}</p>}
      {summary && (
        <p className="mt-2 text-sm text-slate-600">
          Total {String(summary.total)} · válidas {String(summary.valid)} · inválidas{' '}
          {String(summary.invalid)} · lote {String(summary.lote || '—')}
        </p>
      )}

      {preview && (
        <div className="mt-6 space-y-2">
          <h2 className="font-semibold text-slate-900">Prévia</h2>
          {preview.map((row) => (
            <article
              key={row.index}
              className={`rounded-lg p-3 text-sm ring-1 ${row.ok ? 'bg-white ring-slate-200' : 'bg-red-50 ring-red-200'}`}
            >
              <p className="text-xs text-slate-500">
                {row.id_externo} · {row.tipo_da_questao} · {row.especialidade} · gabarito{' '}
                {row.resposta_correta}
              </p>
              <p className="mt-1 text-slate-900">{row.enunciado_preview}</p>
              <p className="mt-1 text-xs text-slate-600">
                Ref: {row.referencia}
                {row.diretriz ? ` · ${row.diretriz}` : ''}
              </p>
              {!row.ok && (
                <ul className="mt-1 text-xs text-red-700">
                  {row.errors.map((e, i) => (
                    <li key={i}>{e.message}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      )}

      <section className="mt-10">
        <h2 className="font-semibold text-slate-900">Lotes autorais</h2>
        <div className="mt-3 space-y-3">
          {batches.length === 0 ? (
            <p className="text-sm text-slate-500">Nenhum lote ainda.</p>
          ) : (
            batches.map((b) => (
              <div
                key={b.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white p-4 ring-1 ring-slate-200"
              >
                <div>
                  <p className="font-medium text-slate-900">{b.title}</p>
                  <p className="text-xs text-slate-500">
                    {b.lote_codigo} · {b.status} · {b.question_count} questões ·{' '}
                    {new Date(b.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Link
                    href={`/admin/importar/lote/${b.id}`}
                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Revisar lote
                  </Link>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void batchAction(b.id, 'publish')}
                    className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Publicar lote
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void batchAction(b.id, 'suspend')}
                    className="rounded-lg bg-amber-700 px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Suspender
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void batchAction(b.id, 'delete')}
                    className="rounded-lg bg-red-700 px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Excluir lote
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
