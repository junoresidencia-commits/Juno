'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ImportarProvaPage() {
  const [format, setFormat] = useState<'text' | 'json'>('text');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [institution, setInstitution] = useState('USP');
  const [examName, setExamName] = useState('');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [sourceUrl, setSourceUrl] = useState('');
  const [reproduction, setReproduction] = useState(false);
  const [origin, setOrigin] = useState<'official' | 'original_based_on_exam' | 'original'>(
    'original_based_on_exam'
  );
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch('/api/admin/question-imports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          format,
          content,
          meta: {
            title: title || `${institution} ${year}`,
            institution,
            exam_name: examName || title,
            year: Number(year) || undefined,
            source_url: sourceUrl || undefined,
            reproduction_allowed: reproduction,
            question_origin: origin === 'official' && !reproduction ? 'original_based_on_exam' : origin,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Falha na importacao');
        return;
      }
      setMsg(
        `${data.message || 'Ok'} Inseridas: ${data.inserted}. Duplicatas: ${data.duplicates}. Lote: ${data.batchId}`
      );
      setContent('');
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Erro de rede');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin/importar" className="text-sm text-emerald-700 hover:underline">
        ← Importar
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Importar prova (revisao obrigatoria)</h1>
      <p className="mt-2 text-sm text-slate-600">
        Cole questoes de provas <strong>publicas e permitidas</strong>. Nada e publicado sozinho —
        tudo entra como <code className="rounded bg-slate-100 px-1">pending_review</code>.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4 rounded-xl bg-white p-5 ring-1 ring-slate-200">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            Instituicao
            <input
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="USP, ENARE, UNIFESP..."
            />
          </label>
          <label className="text-sm">
            Ano
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="text-sm sm:col-span-2">
            Nome da prova
            <input
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Residencia Medica — 1a fase"
            />
          </label>
          <label className="text-sm sm:col-span-2">
            Titulo do lote
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="text-sm sm:col-span-2">
            Link da fonte oficial
            <input
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="https://..."
            />
          </label>
        </div>

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={reproduction}
            onChange={(e) => setReproduction(e.target.checked)}
            className="mt-1"
          />
          <span>
            Confirmo que a fonte e publica e permite uso/cadastro destas questoes (sem violar direitos
            autorais).
          </span>
        </label>

        <label className="block text-sm">
          Origem
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value as typeof origin)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="official">Oficial (reproducao permitida)</option>
            <option value="original_based_on_exam">Inedita no padrao da prova</option>
            <option value="original">Original MedRank</option>
          </select>
        </label>

        <div className="flex gap-2 text-sm">
          <button
            type="button"
            onClick={() => setFormat('text')}
            className={`rounded-lg px-3 py-1.5 ${format === 'text' ? 'bg-teal-700 text-white' : 'bg-slate-100'}`}
          >
            Texto
          </button>
          <button
            type="button"
            onClick={() => setFormat('json')}
            className={`rounded-lg px-3 py-1.5 ${format === 'json' ? 'bg-teal-700 text-white' : 'bg-slate-100'}`}
          >
            JSON
          </button>
        </div>

        <label className="block text-sm">
          Conteudo
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={14}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs"
            placeholder={
              format === 'text'
                ? `1. Enunciado clinico...\nA) ...\nB) ...\nC) ...\nD) ...\nE) ...\nGabarito: C\nExplicacao: ...\n\n2. ...`
                : `[{ "statement": "...", "option_a": "...", "option_b": "...", "option_c": "...", "option_d": "...", "option_e": "...", "correct_option": "C" }]`
            }
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {loading ? 'Importando...' : 'Enviar para revisao'}
        </button>
      </form>

      {msg && <p className="mt-4 text-sm text-emerald-800">{msg}</p>}
      {err && <p className="mt-4 text-sm text-red-700">{err}</p>}

      <p className="mt-6 text-sm text-slate-600">
        Proximo passo:{' '}
        <Link href="/admin/questoes/revisao" className="font-semibold text-emerald-700 underline">
          Fila de revisao
        </Link>
      </p>
    </div>
  );
}
