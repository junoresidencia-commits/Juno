'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type PreviewRow = { n: number; statement: string; correct_option: string };

export default function ImportarProvaPage() {
  const [tab, setTab] = useState<'pdf' | 'text' | 'json'>('pdf');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [institution, setInstitution] = useState('USP');
  const [examName, setExamName] = useState('');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [sourceUrl, setSourceUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [reproduction, setReproduction] = useState(false);
  const [origin, setOrigin] = useState<'official' | 'original_based_on_exam' | 'original'>(
    'official'
  );
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [parsedCount, setParsedCount] = useState<number | null>(null);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [preview, setPreview] = useState<PreviewRow[]>([]);
  const [pages, setPages] = useState<number | null>(null);

  const format = tab === 'json' ? 'json' : 'text';

  const canSubmit = useMemo(() => content.trim().length > 20 && reproduction, [content, reproduction]);

  async function extractFromPdfOrLink() {
    setExtracting(true);
    setMsg(null);
    setErr(null);
    setPreview([]);
    setParsedCount(null);
    setParseErrors([]);
    setPages(null);
    try {
      const form = new FormData();
      if (file) form.append('file', file);
      if (linkUrl.trim()) form.append('url', linkUrl.trim());
      if (!file && !linkUrl.trim()) {
        setErr('Envie um PDF ou cole o link do PDF oficial.');
        return;
      }

      const res = await fetch('/api/admin/question-imports/extract', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Falha na extração');
        return;
      }

      setContent(data.text || '');
      setParsedCount(data.parsedCount ?? 0);
      setParseErrors(data.parseErrors || []);
      setPreview(data.preview || []);
      setPages(data.pages ?? null);
      if (data.sourceUrl) setSourceUrl(data.sourceUrl);
      if (!title) {
        setTitle(`${institution} ${year}${examName ? ` — ${examName}` : ''}`);
      }
      setTab('text');
      setMsg(
        data.tip ||
          `Texto extraído${data.pages ? ` (${data.pages} páginas)` : ''}. Revise e envie para revisão.`
      );
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Erro de rede');
    } finally {
      setExtracting(false);
    }
  }

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
            source_url: sourceUrl || linkUrl || undefined,
            reproduction_allowed: reproduction,
            question_origin:
              origin === 'official' && !reproduction ? 'original_based_on_exam' : origin,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Falha na importação');
        if (data.errors?.length) setParseErrors(data.errors);
        return;
      }
      setMsg(
        `${data.message || 'Ok'} Inseridas: ${data.inserted}. Duplicatas: ${data.duplicates}. Lote: ${data.batchId}`
      );
      setContent('');
      setPreview([]);
      setParsedCount(null);
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
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Importar prova oficial</h1>
      <p className="mt-2 text-sm text-slate-600">
        USP, ENARE e similares: envie o <strong>PDF</strong>, cole o <strong>link</strong>, ou use o{' '}
        <strong>template</strong>. O sistema monta as questões e manda para revisão — nada publica
        sozinho.
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <a
          href="/templates/MEDRANK_PROVA_OFICIAL_MODELO.txt"
          download
          className="rounded-lg bg-slate-100 px-3 py-2 font-medium text-slate-800 hover:bg-slate-200"
        >
          Baixar template TXT
        </a>
        <a
          href="/templates/MEDRANK_PROVA_OFICIAL_MODELO.json"
          download
          className="rounded-lg bg-slate-100 px-3 py-2 font-medium text-slate-800 hover:bg-slate-200"
        >
          Baixar template JSON
        </a>
        <Link
          href="/admin/questoes/revisao"
          className="rounded-lg bg-teal-50 px-3 py-2 font-medium text-teal-900 ring-1 ring-teal-200"
        >
          Fila de revisão →
        </Link>
      </div>

      <div className="mt-6 flex gap-2 text-sm">
        {(
          [
            ['pdf', 'PDF / link'],
            ['text', 'Texto'],
            ['json', 'JSON'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-lg px-3 py-1.5 ${
              tab === id ? 'bg-teal-800 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'pdf' && (
        <section className="mt-4 space-y-4 rounded-xl bg-white p-5 ring-1 ring-slate-200">
          <p className="text-sm text-slate-600">
            Preferência: PDF com texto selecionável (não scan). Se for só imagem, use OCR e cole no
            template TXT.
          </p>
          <label className="block text-sm">
            Arquivo PDF
            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="mt-1 block w-full text-sm"
            />
          </label>
          <label className="block text-sm">
            Ou link direto do PDF / página oficial
            <input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="https://.../prova.pdf"
            />
          </label>
          <button
            type="button"
            disabled={extracting}
            onClick={() => void extractFromPdfOrLink()}
            className="rounded-lg bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {extracting ? 'Extraindo e montando…' : 'Extrair e montar questões'}
          </button>
        </section>
      )}

      <form onSubmit={(e) => void submit(e)} className="mt-4 space-y-4 rounded-xl bg-white p-5 ring-1 ring-slate-200">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            Instituição
            <input
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="USP, ENARE, UNIFESP..."
              list="inst-list"
            />
            <datalist id="inst-list">
              <option value="USP" />
              <option value="ENARE" />
              <option value="UNIFESP" />
              <option value="UNICAMP" />
              <option value="Revalida" />
            </datalist>
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
              placeholder="Residência Médica — 1ª fase"
            />
          </label>
          <label className="text-sm sm:col-span-2">
            Título do lote
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
            required
          />
          <span>
            Confirmo que a fonte é pública e permite uso destas questões (sem violar direitos
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
            <option value="official">Oficial (reprodução permitida)</option>
            <option value="original_based_on_exam">Inédita no padrão da prova</option>
            <option value="original">Original MedRank</option>
          </select>
        </label>

        {(tab === 'text' || tab === 'json' || content) && (
          <label className="block text-sm">
            Conteúdo ({tab === 'json' ? 'JSON' : 'texto no template'})
            {pages != null ? (
              <span className="ml-2 text-xs text-slate-500">{pages} pág. no PDF</span>
            ) : null}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={14}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs"
              placeholder={
                tab === 'json'
                  ? `[{ "statement": "...", "option_a": "...", "option_b": "...", "option_c": "...", "option_d": "...", "option_e": "...", "correct_option": "C" }]`
                  : `1. Enunciado clinico...\nA) ...\nB) ...\nC) ...\nD) ...\nE) ...\nGabarito: C\nExplicacao: ...\n\n2. ...`
              }
            />
          </label>
        )}

        {parsedCount != null && (
          <div className="rounded-xl bg-slate-50 p-4 text-sm ring-1 ring-slate-200">
            <p className="font-semibold text-slate-900">
              Preview: {parsedCount} questão(ões) reconhecidas
            </p>
            {preview.length > 0 && (
              <ul className="mt-2 space-y-2">
                {preview.map((p) => (
                  <li key={p.n} className="text-slate-700">
                    <span className="font-semibold">{p.n}.</span> {p.statement}{' '}
                    <span className="text-teal-800">[{p.correct_option}]</span>
                  </li>
                ))}
              </ul>
            )}
            {parseErrors.length > 0 && (
              <ul className="mt-2 list-disc pl-5 text-amber-900">
                {parseErrors.slice(0, 8).map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !canSubmit}
          className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {loading ? 'Importando…' : 'Enviar para revisão'}
        </button>
      </form>

      {msg && <p className="mt-4 text-sm text-emerald-800">{msg}</p>}
      {err && <p className="mt-4 text-sm text-red-700">{err}</p>}

      <ol className="mt-8 list-decimal space-y-1 pl-5 text-sm text-slate-600">
        <li>PDF/link ou template → extrair/montar</li>
        <li>Revise o texto e o preview</li>
        <li>Enviar para revisão → aprove em Questões</li>
        <li>A disputa diária passa a usar as aprovadas (preferência 2024+)</li>
      </ol>
    </div>
  );
}
