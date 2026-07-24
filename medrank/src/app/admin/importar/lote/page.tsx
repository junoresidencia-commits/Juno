'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

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
    if (file.name.endsWith('.csv')) setFormat('csv');
    else setFormat('json');
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
        JSON (preferencial) ou CSV produzido externamente (ChatGPT). Entra como{' '}
        <strong>rascunho</strong> — nunca como prova oficial USP/ENARE. Sem API paga.
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Template: <code>/templates/lote-autorais-50.json</code> · padrão 50 questões (20 CM / 10
        Cirurgia / 10 Ped / 5 GO / 5 Prev).
      </p>

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
