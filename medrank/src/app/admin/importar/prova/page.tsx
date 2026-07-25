'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type PreviewRow = { n: number; statement: string; correct_option: string };

type ExtractedFile = {
  filename: string;
  kind: string;
  text: string;
  pages?: number | null;
  parsedCount: number;
  parseErrors: string[];
  preview: PreviewRow[];
  format: 'text' | 'json';
  error?: string;
  selected: boolean;
};

export default function ImportarProvaPage() {
  const [tab, setTab] = useState<'files' | 'text' | 'json'>('files');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [institution, setInstitution] = useState('USP');
  const [examName, setExamName] = useState('');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [sourceUrl, setSourceUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [gabaritoFile, setGabaritoFile] = useState<File | null>(null);
  const [gabaritoUrl, setGabaritoUrl] = useState('');
  const [extracted, setExtracted] = useState<ExtractedFile[]>([]);
  const [reproduction, setReproduction] = useState(false);
  const [origin, setOrigin] = useState<'official' | 'original_based_on_exam' | 'original'>(
    'official'
  );
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const format = tab === 'json' ? 'json' : 'text';
  const selectedFiles = extracted.filter((f) => f.selected && f.parsedCount > 0);
  const totalSelectedQs = selectedFiles.reduce((s, f) => s + f.parsedCount, 0);

  const canSubmitSingle = useMemo(
    () => content.trim().length > 20 && reproduction,
    [content, reproduction]
  );
  const canSubmitBatch = selectedFiles.length > 0 && reproduction;

  function onPickFiles(list: FileList | null, append = false) {
    if (!list) return;
    const next = Array.from(list);
    setFiles((prev) => (append ? [...prev, ...next] : next).slice(0, 25));
  }

  async function extractBatch() {
    setExtracting(true);
    setMsg(null);
    setErr(null);
    setExtracted([]);
    try {
      const form = new FormData();
      for (const f of files) form.append('files', f);
      if (linkUrl.trim()) form.append('url', linkUrl.trim());
      if (gabaritoFile) form.append('gabarito', gabaritoFile);
      if (gabaritoUrl.trim()) form.append('gabarito_url', gabaritoUrl.trim());
      if (files.length === 0 && !linkUrl.trim()) {
        setErr('Envie a prova (PDF/Word/ZIP/pasta ou link).');
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

      const list: ExtractedFile[] = (data.files || []).map(
        (f: Omit<ExtractedFile, 'selected'>) => ({
          ...f,
          selected: (f.parsedCount || 0) > 0,
        })
      );
      setExtracted(list);

      if (list.length === 1 && list[0].text) {
        setContent(list[0].text);
        if (list[0].kind === 'json') setTab('json');
        else setTab('text');
      }
      if (data.sourceUrl) setSourceUrl(data.sourceUrl);
      if (!title) {
        setTitle(`${institution} ${year}${examName ? ` — ${examName}` : ''}`);
      }
      setMsg(
        data.tip ||
          (data.gabaritoApplied
            ? `Prova + gabarito → ${data.totalQuestions} questão(ões) prontas.`
            : `Extraídos ${list.length} arquivo(s).`)
      );
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Erro de rede');
    } finally {
      setExtracting(false);
    }
  }

  async function submitSingle(e: React.FormEvent) {
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
          meta: baseMeta(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Falha na importação');
        return;
      }
      setMsg(
        `${data.message || 'Ok'} Inseridas: ${data.inserted}. Duplicatas: ${data.duplicates}.`
      );
      setContent('');
      setExtracted([]);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Erro de rede');
    } finally {
      setLoading(false);
    }
  }

  function baseMeta() {
    return {
      title: title || `${institution} ${year}`,
      institution,
      exam_name: examName || title,
      year: Number(year) || undefined,
      source_url: sourceUrl || linkUrl || undefined,
      reproduction_allowed: reproduction,
      question_origin: origin === 'official' && !reproduction ? 'original_based_on_exam' : origin,
    };
  }

  async function submitBatch() {
    setLoading(true);
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch('/api/admin/question-imports/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseMeta: baseMeta(),
          items: selectedFiles.map((f) => ({
            filename: f.filename,
            format: f.format,
            content: f.text,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Falha no lote');
        return;
      }
      setMsg(data.message || 'Lote enviado');
      setExtracted([]);
      setFiles([]);
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
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Importar prova oficial</h1>
      <p className="mt-2 text-sm text-slate-600">
        Baixe da net a <strong>prova</strong> (PDF/Word) e o <strong>gabarito</strong> → o MedRank
        junta e deixa as questões prontas para revisão.
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <a
          href="/templates/MEDRANK_PROVA_OFICIAL_MODELO.txt"
          download
          className="rounded-lg bg-slate-100 px-3 py-2 font-medium text-slate-800 hover:bg-slate-200"
        >
          Template prova
        </a>
        <a
          href="/templates/MEDRANK_GABARITO_MODELO.txt"
          download
          className="rounded-lg bg-slate-100 px-3 py-2 font-medium text-slate-800 hover:bg-slate-200"
        >
          Template gabarito
        </a>
        <a
          href="/templates/MEDRANK_PROVA_OFICIAL_MODELO.json"
          download
          className="rounded-lg bg-slate-100 px-3 py-2 font-medium text-slate-800 hover:bg-slate-200"
        >
          Template JSON
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
            ['files', 'Arquivos / pasta'],
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

      {tab === 'files' && (
        <section className="mt-4 space-y-4 rounded-xl bg-white p-5 ring-1 ring-slate-200">
          <div className="rounded-xl bg-teal-50 p-4 text-sm text-teal-950 ring-1 ring-teal-200">
            <p className="font-semibold">Como usar (prova da net + gabarito)</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>Baixe a prova (PDF ou Word) e o gabarito oficial</li>
              <li>Coloque a prova acima e o gabarito no campo Gabarito</li>
              <li>Clique em montar → revise → envie para revisão</li>
            </ol>
            <p className="mt-2 text-xs text-teal-900/80">
              Gabarito aceito: linhas <code className="rounded bg-white px-1">1 C</code>,{' '}
              <code className="rounded bg-white px-1">1-C</code>,{' '}
              <code className="rounded bg-white px-1">Questão 1: C</code> — ou PDF/Word do gabarito.
            </p>
          </div>

          <label className="block text-sm font-medium">
            1) Prova(s) — PDF, Word (.docx), TXT, ZIP, pasta
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.txt,.json,.zip,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/zip"
              onChange={(e) => onPickFiles(e.target.files)}
              className="mt-1 block w-full text-sm font-normal"
            />
          </label>

          <label className="block text-sm">
            Ou pasta com várias provas
            <input
              type="file"
              multiple
              ref={(el) => {
                if (el) {
                  el.setAttribute('webkitdirectory', '');
                  el.setAttribute('directory', '');
                }
              }}
              onChange={(e) => onPickFiles(e.target.files)}
              className="mt-1 block w-full text-sm"
            />
          </label>

          {files.length > 0 && (
            <p className="text-xs text-slate-500">
              {files.length} prova(s):{' '}
              {files
                .slice(0, 5)
                .map((f) => f.name)
                .join(', ')}
              {files.length > 5 ? '…' : ''}
            </p>
          )}

          <label className="block text-sm">
            Link da prova (opcional)
            <input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="https://.../prova.pdf"
            />
          </label>

          <label className="block text-sm font-medium">
            2) Gabarito (arquivo separado — o que você baixa da banca)
            <input
              type="file"
              accept=".pdf,.docx,.txt,.json,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              onChange={(e) => setGabaritoFile(e.target.files?.[0] ?? null)}
              className="mt-1 block w-full text-sm font-normal"
            />
          </label>
          <label className="block text-sm">
            Ou link do gabarito
            <input
              value={gabaritoUrl}
              onChange={(e) => setGabaritoUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="https://.../gabarito.pdf"
            />
          </label>
          {gabaritoFile ? (
            <p className="text-xs text-slate-500">Gabarito: {gabaritoFile.name}</p>
          ) : null}

          <button
            type="button"
            disabled={extracting}
            onClick={() => void extractBatch()}
            className="rounded-lg bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {extracting ? 'Montando questões…' : 'Montar questões (prova + gabarito)'}
          </button>
        </section>
      )}

      <div className="mt-4 space-y-4 rounded-xl bg-white p-5 ring-1 ring-slate-200">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            Instituição
            <input
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
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
            Nome da prova / série
            <input
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Residência — 1ª fase"
            />
          </label>
          <label className="text-sm sm:col-span-2">
            Título base do lote
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="text-sm sm:col-span-2">
            Link da fonte
            <input
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
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
            Confirmo que a(s) fonte(s) são públicas e permitem uso destas questões.
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

        {extracted.length > 0 && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-900">
                Arquivos identificados ({extracted.length}) · {totalSelectedQs} questões
                selecionadas
              </p>
              <button
                type="button"
                disabled={loading || !canSubmitBatch}
                onClick={() => void submitBatch()}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {loading
                  ? 'Enviando…'
                  : `Enviar ${selectedFiles.length} prova(s) para revisão`}
              </button>
            </div>
            {extracted.map((f, idx) => (
              <div
                key={`${f.filename}-${idx}`}
                className="rounded-xl bg-slate-50 p-3 text-sm ring-1 ring-slate-200"
              >
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={f.selected}
                    disabled={f.parsedCount === 0}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setExtracted((prev) =>
                        prev.map((x, i) => (i === idx ? { ...x, selected: checked } : x))
                      );
                    }}
                    className="mt-1"
                  />
                  <span className="flex-1">
                    <span className="font-semibold text-slate-900">{f.filename}</span>
                    <span className="ml-2 text-xs uppercase text-slate-500">{f.kind}</span>
                    {f.pages ? (
                      <span className="ml-2 text-xs text-slate-500">{f.pages} pág.</span>
                    ) : null}
                    <span className="mt-0.5 block text-slate-700">
                      {f.parsedCount > 0
                        ? `${f.parsedCount} questão(ões)`
                        : f.error || 'Nenhuma questão reconhecida'}
                    </span>
                    {f.preview?.length > 0 && (
                      <ul className="mt-2 space-y-1 text-xs text-slate-600">
                        {f.preview.map((p) => (
                          <li key={p.n}>
                            {p.n}. {p.statement} [{p.correct_option}]
                          </li>
                        ))}
                      </ul>
                    )}
                    {f.parseErrors?.length > 0 && f.parsedCount === 0 && (
                      <p className="mt-1 text-xs text-amber-800">{f.parseErrors[0]}</p>
                    )}
                  </span>
                </label>
              </div>
            ))}
          </div>
        )}

        {(tab === 'text' || tab === 'json') && (
          <form onSubmit={(e) => void submitSingle(e)} className="space-y-3">
            <label className="block text-sm">
              Conteúdo ({tab === 'json' ? 'JSON' : 'texto'})
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={12}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs"
              />
            </label>
            <button
              type="submit"
              disabled={loading || !canSubmitSingle}
              className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? 'Importando…' : 'Enviar este texto para revisão'}
            </button>
          </form>
        )}
      </div>

      {msg && <p className="mt-4 text-sm text-emerald-800">{msg}</p>}
      {err && <p className="mt-4 text-sm text-red-700">{err}</p>}

      <ol className="mt-8 list-decimal space-y-1 pl-5 text-sm text-slate-600">
        <li>Baixe prova + gabarito da net (USP/ENARE…)</li>
        <li>Envie os dois aqui → montar questões</li>
        <li>Enviar para revisão → aprovar em Questões → entram na disputa</li>
      </ol>
    </div>
  );
}
