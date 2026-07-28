import { useState, type FormEvent } from 'react'
import type { LiteratureRecord } from '../types'

export function LiteraturePanel({
  studyId,
  records,
  onSave,
  onRemove,
  onExportExcel,
}: {
  studyId: string
  records: LiteratureRecord[]
  onSave: (
    input: Omit<LiteratureRecord, 'id' | 'createdAt' | 'updatedAt'> & {
      id?: string
    },
  ) => void
  onRemove: (id: string) => void
  onExportExcel: () => void
}) {
  const [editing, setEditing] = useState<LiteratureRecord | null>(null)
  const [open, setOpen] = useState(false)

  const included = records.filter((r) => r.included).length

  return (
    <div className="literature">
      <div className="section-head">
        <h2>Extração da literatura</h2>
        <p>
          Cadastre cada artigo da busca. Marque os incluídos — o manuscrito usa
          isso em Resultados. {included}/{records.length} incluídos.
        </p>
      </div>

      <div className="form-actions left wrap">
        <button
          type="button"
          className="btn primary"
          onClick={() => {
            setEditing(null)
            setOpen(true)
          }}
        >
          Adicionar artigo
        </button>
        <button
          type="button"
          className="btn ghost"
          disabled={!records.length}
          onClick={onExportExcel}
        >
          Exportar extração (Excel)
        </button>
      </div>

      {records.length === 0 ? (
        <div className="empty soft">
          <p>Nenhum artigo na tabela de extração ainda.</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Incluído</th>
                <th>Ano</th>
                <th>Título</th>
                <th>Autores</th>
                <th>Tipo</th>
                <th>Achados</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className={r.included ? undefined : 'row-muted'}>
                  <td>{r.included ? 'Sim' : 'Não'}</td>
                  <td>{r.year ?? '—'}</td>
                  <td>{r.title}</td>
                  <td>{r.authors || '—'}</td>
                  <td>{r.studyType || '—'}</td>
                  <td className="clip">{r.mainFindings || '—'}</td>
                  <td className="row-actions">
                    <button
                      type="button"
                      className="linkish"
                      onClick={() => {
                        setEditing(r)
                        setOpen(true)
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="linkish danger"
                      onClick={() => {
                        if (window.confirm('Remover este registro?')) onRemove(r.id)
                      }}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open ? (
        <LiteratureForm
          studyId={studyId}
          initial={editing}
          onCancel={() => setOpen(false)}
          onSave={(payload) => {
            onSave(payload)
            setOpen(false)
          }}
        />
      ) : null}
    </div>
  )
}

function LiteratureForm({
  studyId,
  initial,
  onSave,
  onCancel,
}: {
  studyId: string
  initial: LiteratureRecord | null
  onSave: (
    input: Omit<LiteratureRecord, 'id' | 'createdAt' | 'updatedAt'> & {
      id?: string
    },
  ) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [authors, setAuthors] = useState(initial?.authors ?? '')
  const [year, setYear] = useState(initial?.year?.toString() ?? '')
  const [journal, setJournal] = useState(initial?.journal ?? '')
  const [studyType, setStudyType] = useState(initial?.studyType ?? '')
  const [population, setPopulation] = useState(initial?.population ?? '')
  const [mainFindings, setMainFindings] = useState(initial?.mainFindings ?? '')
  const [limitations, setLimitations] = useState(initial?.limitations ?? '')
  const [included, setIncluded] = useState(initial?.included ?? true)
  const [notes, setNotes] = useState(initial?.notes ?? '')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    const yearNum = year.trim() ? Number(year) : null
    onSave({
      id: initial?.id,
      studyId,
      title: title.trim(),
      authors: authors.trim(),
      year: yearNum && Number.isFinite(yearNum) ? yearNum : null,
      journal: journal.trim(),
      studyType: studyType.trim(),
      population: population.trim(),
      mainFindings: mainFindings.trim(),
      limitations: limitations.trim(),
      included,
      notes: notes.trim(),
    })
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onCancel}>
      <form
        className="form panel modal wide"
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}
      >
        <header className="modal-head">
          <h2>{initial ? 'Editar artigo' : 'Novo artigo na extração'}</h2>
          <p>Preencha o essencial para a tabela de revisão.</p>
        </header>

        <label>
          Título
          <input value={title} onChange={(e) => setTitle(e.target.value)} required autoFocus />
        </label>
        <div className="grid-2">
          <label>
            Autores
            <input value={authors} onChange={(e) => setAuthors(e.target.value)} />
          </label>
          <label>
            Ano
            <input
              type="number"
              min={1950}
              max={2100}
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
        </div>
        <div className="grid-2">
          <label>
            Periódico
            <input value={journal} onChange={(e) => setJournal(e.target.value)} />
          </label>
          <label>
            Tipo de estudo
            <input
              value={studyType}
              onChange={(e) => setStudyType(e.target.value)}
              placeholder="Ensaio, coorte, transversal, revisão…"
            />
          </label>
        </div>
        <label>
          População
          <input value={population} onChange={(e) => setPopulation(e.target.value)} />
        </label>
        <label>
          Principais achados
          <textarea rows={3} value={mainFindings} onChange={(e) => setMainFindings(e.target.value)} />
        </label>
        <label>
          Limitações
          <textarea rows={2} value={limitations} onChange={(e) => setLimitations(e.target.value)} />
        </label>
        <label>
          Notas
          <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <label className="check-row">
          <input
            type="checkbox"
            checked={included}
            onChange={(e) => setIncluded(e.target.checked)}
          />
          Incluir na síntese / Resultados
        </label>
        <div className="form-actions">
          <button type="button" className="btn ghost" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn primary">
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}
