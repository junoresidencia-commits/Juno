import { useMemo, useState } from 'react'
import type { LiteratureRecord, Manuscript, Study, StudyStats } from '../types'
import {
  buildResultsFromLiterature,
  buildResultsFromStats,
  downloadMarkdown,
  ensureManuscript,
  manuscriptProgress,
  manuscriptToMarkdown,
} from '../lib/manuscript'

export function ManuscriptEditor({
  study,
  stats,
  literature,
  onChange,
}: {
  study: Study
  stats: StudyStats
  literature: LiteratureRecord[]
  onChange: (manuscript: Manuscript) => void
}) {
  const manuscript = useMemo(() => ensureManuscript(study), [study])
  const progress = manuscriptProgress(manuscript)
  const [activeId, setActiveId] = useState(manuscript.sections[0]?.id ?? '')

  const active = manuscript.sections.find((s) => s.id === activeId) ?? manuscript.sections[0]

  function patch(partial: Partial<Manuscript>) {
    onChange({
      ...manuscript,
      ...partial,
      updatedAt: new Date().toISOString(),
    })
  }

  function patchSection(
    sectionId: string,
    partial: Partial<(typeof manuscript.sections)[0]>,
  ) {
    patch({
      sections: manuscript.sections.map((s) =>
        s.id === sectionId ? { ...s, ...partial } : s,
      ),
    })
  }

  function fillResults() {
    const text =
      study.kind === 'literature_review'
        ? buildResultsFromLiterature(study, literature)
        : buildResultsFromStats(study, stats)

    const target = manuscript.sections.find((s) =>
      s.title.toLowerCase().includes('resultado'),
    )
    if (!target) {
      window.alert('Não há seção de Resultados neste manuscrito.')
      return
    }
    patchSection(target.id, { content: text, done: true })
    setActiveId(target.id)
  }

  function exportMd() {
    const md = manuscriptToMarkdown(study, manuscript)
    const safe = study.title.replace(/[^\p{L}\p{N}]+/gu, '-').toLowerCase()
    downloadMarkdown(`${safe || 'artigo'}.md`, md)
  }

  return (
    <div className="manuscript">
      <div className="manuscript-toolbar">
        <div className="progress-ring" aria-label={`Progresso ${progress.pct}%`}>
          <strong>{progress.pct}%</strong>
          <span>
            {progress.done}/{progress.total} pronto
          </span>
        </div>
        <div className="form-actions left wrap">
          <button type="button" className="btn secondary" onClick={fillResults}>
            Preencher Resultados com dados
          </button>
          <button type="button" className="btn primary" onClick={exportMd}>
            Exportar artigo (.md)
          </button>
        </div>
      </div>

      <div className="grid-2 manuscript-meta">
        <label>
          Autores
          <input
            value={manuscript.authors}
            onChange={(e) => patch({ authors: e.target.value })}
            placeholder="Nome Sobrenome; Nome Sobrenome"
          />
        </label>
        <label>
          Afiliação
          <input
            value={manuscript.affiliations}
            onChange={(e) => patch({ affiliations: e.target.value })}
            placeholder="Hospital / universidade / região IRC"
          />
        </label>
      </div>

      <label>
        Palavras-chave
        <input
          value={manuscript.keywords}
          onChange={(e) => patch({ keywords: e.target.value })}
          placeholder="DRC; CKD-EPI; prevalência; IRC"
        />
      </label>

      <div className="grid-2">
        <label>
          Resumo (PT)
          <textarea
            rows={5}
            value={manuscript.abstractPt}
            onChange={(e) => patch({ abstractPt: e.target.value })}
          />
        </label>
        <label>
          Abstract (EN)
          <textarea
            rows={5}
            value={manuscript.abstractEn}
            onChange={(e) => patch({ abstractEn: e.target.value })}
          />
        </label>
      </div>

      <div className="manuscript-body">
        <aside className="section-nav">
          {manuscript.sections.map((s) => (
            <button
              key={s.id}
              type="button"
              className={s.id === active?.id ? 'active' : ''}
              onClick={() => setActiveId(s.id)}
            >
              <span>{s.done ? '✓' : '○'}</span> {s.title}
            </button>
          ))}
        </aside>

        {active ? (
          <div className="section-editor">
            <div className="section-editor-head">
              <h3>{active.title}</h3>
              <label className="check-row compact">
                <input
                  type="checkbox"
                  checked={active.done}
                  onChange={(e) =>
                    patchSection(active.id, { done: e.target.checked })
                  }
                />
                Seção concluída
              </label>
            </div>
            <textarea
              rows={16}
              value={active.content}
              onChange={(e) => patchSection(active.id, { content: e.target.value })}
              placeholder="Escreva o texto desta seção do artigo…"
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
