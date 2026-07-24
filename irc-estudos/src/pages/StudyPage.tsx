import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useData } from '../hooks/useData'
import {
  calculateCkdEpi2021,
  hasCkdByEgfr,
  stageFromEgfr,
} from '../lib/ckd-epi'
import { computeStudyStats, patientsToCsv } from '../lib/stats'
import {
  CKD_STAGE_LABELS,
  STUDY_TEMPLATE_LABELS,
  UNDERLYING_DISEASE_LABELS,
  type CkdStage,
  type Patient,
  type Sex,
  type StudyStatus,
  type UnderlyingDisease,
} from '../types'

const DISEASE_OPTIONS = Object.entries(UNDERLYING_DISEASE_LABELS) as [
  UnderlyingDisease,
  string,
][]

export function StudyPage() {
  const { studyId = '' } = useParams()
  const navigate = useNavigate()
  const { studyOf, patientsOf, savePatient, removePatient, updateStudy, removeStudy } =
    useData()
  const study = studyOf(studyId)
  const patients = patientsOf(studyId)
  const stats = useMemo(() => computeStudyStats(patients), [patients])
  const [editing, setEditing] = useState<Patient | null>(null)
  const [showForm, setShowForm] = useState(false)

  if (!study) {
    return (
      <div className="page narrow">
        <p>Trabalho não encontrado.</p>
        <Link to="/">Voltar</Link>
      </div>
    )
  }

  function exportCsv() {
    const csv = patientsToCsv(patients)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${study!.title.replace(/\s+/g, '-').toLowerCase()}-pacientes.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page">
      <header className="page-header study-header">
        <div>
          <p className="eyebrow">
            {study.region} · {STUDY_TEMPLATE_LABELS[study.template]}
          </p>
          <h1>{study.title}</h1>
          <p className="lede compact">{study.objective}</p>
        </div>
        <div className="header-actions">
          <label className="inline-select">
            Status
            <select
              value={study.status}
              onChange={(e) =>
                updateStudy({
                  ...study,
                  status: e.target.value as StudyStatus,
                })
              }
            >
              <option value="active">Ativo</option>
              <option value="paused">Pausado</option>
              <option value="completed">Concluído</option>
            </select>
          </label>
          <button
            type="button"
            className="btn secondary"
            onClick={() => {
              setEditing(null)
              setShowForm(true)
            }}
          >
            Cadastrar paciente
          </button>
          <button type="button" className="btn ghost" onClick={exportCsv}>
            Exportar CSV
          </button>
          <button
            type="button"
            className="btn danger ghost"
            onClick={() => {
              if (
                window.confirm(
                  'Excluir este trabalho e todos os pacientes? Esta ação não pode ser desfeita neste navegador.',
                )
              ) {
                removeStudy(study.id)
                navigate('/')
              }
            }}
          >
            Excluir
          </button>
        </div>
      </header>

      <section className="stats-grid" aria-label="Resumo epidemiológico">
        <article className="stat">
          <span>Pacientes</span>
          <strong>{stats.totalPatients}</strong>
        </article>
        <article className="stat accent">
          <span>Prevalência de DRC (TFG &lt; 60)</span>
          <strong>{stats.ckdPrevalence.toFixed(1)}%</strong>
          <small>{stats.ckdCount} casos</small>
        </article>
        <article className="stat">
          <span>TFG média</span>
          <strong>{stats.meanEgfr ? stats.meanEgfr.toFixed(1) : '—'}</strong>
          <small>mL/min/1.73 m²</small>
        </article>
        <article className="stat">
          <span>Em estatina</span>
          <strong>{stats.statinRate.toFixed(0)}%</strong>
          <small>{stats.statinCount} pacientes</small>
        </article>
      </section>

      <div className="split">
        <section className="section panel">
          <div className="section-head tight">
            <h2>Estágios CKD-EPI</h2>
            <p>Distribuição por TFG estimada.</p>
          </div>
          <ul className="bar-list">
            {(Object.keys(CKD_STAGE_LABELS) as CkdStage[]).map((stage) => {
              const count = stats.byStage[stage]
              const pct = stats.totalPatients
                ? (count / stats.totalPatients) * 100
                : 0
              return (
                <li key={stage}>
                  <div className="bar-label">
                    <span>{CKD_STAGE_LABELS[stage]}</span>
                    <span>
                      {count} ({pct.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="bar-track">
                    <div
                      className={`bar-fill stage-${stage}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="section panel">
          <div className="section-head tight">
            <h2>Doença de base</h2>
            <p>Diabetes, hipertensão e demais causas secundárias.</p>
          </div>
          <ul className="bar-list">
            {DISEASE_OPTIONS.filter(([key]) => stats.byDisease[key] > 0).map(
              ([key, label]) => {
                const count = stats.byDisease[key]
                const pct = stats.totalPatients
                  ? (count / stats.totalPatients) * 100
                  : 0
                return (
                  <li key={key}>
                    <div className="bar-label">
                      <span>{label}</span>
                      <span>
                        {count} ({pct.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill disease" style={{ width: `${pct}%` }} />
                    </div>
                  </li>
                )
              },
            )}
            {stats.totalPatients === 0 ? (
              <li className="muted">Cadastre pacientes para ver o perfil.</li>
            ) : null}
          </ul>
        </section>
      </div>

      <section className="section panel">
        <div className="section-head tight">
          <h2>DRC por faixa etária</h2>
          <p>Prevalência estratificada — útil para relatórios em 6 meses.</p>
        </div>
        <div className="age-grid">
          {stats.ageBands.map((band) => (
            <div key={band.label} className="age-cell">
              <span>{band.label} anos</span>
              <strong>
                {band.total
                  ? `${((band.ckd / band.total) * 100).toFixed(0)}%`
                  : '—'}
              </strong>
              <small>
                {band.ckd}/{band.total} com DRC
              </small>
            </div>
          ))}
        </div>
      </section>

      {(showForm || editing) && (
        <PatientForm
          initial={editing}
          studyId={study.id}
          onCancel={() => {
            setShowForm(false)
            setEditing(null)
          }}
          onSave={(payload) => {
            savePatient(payload)
            setShowForm(false)
            setEditing(null)
          }}
        />
      )}

      <section className="section">
        <div className="section-head">
          <h2>Pacientes cadastrados</h2>
          <p>
            Informe nome, idade, sexo e creatinina — a CKD-EPI e o estágio saem
            prontos.
          </p>
        </div>

        {patients.length === 0 ? (
          <div className="empty">
            <p>Nenhum paciente neste trabalho.</p>
            <button
              type="button"
              className="btn primary"
              onClick={() => {
                setEditing(null)
                setShowForm(true)
              }}
            >
              Cadastrar o primeiro
            </button>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>Sexo</th>
                  <th>Creatinina</th>
                  <th>TFG</th>
                  <th>Estágio</th>
                  <th>Doença de base</th>
                  <th>Estatina</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.id} className={p.hasCkd ? 'row-ckd' : undefined}>
                    <td>{p.name}</td>
                    <td>{p.age}</td>
                    <td>{p.sex === 'F' ? 'F' : 'M'}</td>
                    <td>{p.creatinineMgDl.toFixed(2)}</td>
                    <td>{p.egfr.toFixed(1)}</td>
                    <td>
                      <span className={`stage-chip stage-${p.ckdStage}`}>
                        {p.ckdStage}
                      </span>
                    </td>
                    <td>{UNDERLYING_DISEASE_LABELS[p.underlyingDisease]}</td>
                    <td>{p.onStatin ? 'Sim' : 'Não'}</td>
                    <td className="row-actions">
                      <button
                        type="button"
                        className="linkish"
                        onClick={() => {
                          setEditing(p)
                          setShowForm(true)
                        }}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="linkish danger"
                        onClick={() => {
                          if (window.confirm(`Remover ${p.name}?`)) {
                            removePatient(p.id)
                          }
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
      </section>
    </div>
  )
}

function PatientForm({
  studyId,
  initial,
  onSave,
  onCancel,
}: {
  studyId: string
  initial: Patient | null
  onSave: (
    payload: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'> & { id?: string },
  ) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(initial?.name ?? '')
  const [age, setAge] = useState(initial?.age?.toString() ?? '')
  const [sex, setSex] = useState<Sex>(initial?.sex ?? 'F')
  const [creatinine, setCreatinine] = useState(
    initial?.creatinineMgDl?.toString() ?? '',
  )
  const [disease, setDisease] = useState<UnderlyingDisease>(
    initial?.underlyingDisease ?? 'unknown',
  )
  const [onStatin, setOnStatin] = useState(initial?.onStatin ?? false)
  const [notes, setNotes] = useState(initial?.notes ?? '')

  const ageNum = Number(age)
  const creatNum = Number(creatinine.replace(',', '.'))
  const egfr = calculateCkdEpi2021(creatNum, ageNum, sex)
  const stage = Number.isFinite(egfr) ? stageFromEgfr(egfr) : null
  const ckd = Number.isFinite(egfr) ? hasCkdByEgfr(egfr) : false

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !Number.isFinite(egfr)) return
    onSave({
      id: initial?.id,
      studyId,
      name: name.trim(),
      age: ageNum,
      sex,
      creatinineMgDl: creatNum,
      egfr,
      ckdStage: stageFromEgfr(egfr),
      hasCkd: hasCkdByEgfr(egfr),
      underlyingDisease: disease,
      onStatin,
      notes: notes.trim(),
    })
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onCancel}>
      <form
        className="form panel modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}
      >
        <header className="modal-head">
          <h2>{initial ? 'Editar paciente' : 'Novo paciente'}</h2>
          <p>Preencha os dados básicos — a CKD-EPI calcula na hora.</p>
        </header>

        <label>
          Nome
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </label>

        <div className="grid-3">
          <label>
            Idade
            <input
              type="number"
              min={18}
              max={120}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
          <label>
            Sexo
            <select value={sex} onChange={(e) => setSex(e.target.value as Sex)}>
              <option value="F">Feminino</option>
              <option value="M">Masculino</option>
            </select>
          </label>
          <label>
            Creatinina (mg/dL)
            <input
              inputMode="decimal"
              value={creatinine}
              onChange={(e) => setCreatinine(e.target.value)}
              placeholder="Ex.: 1,2"
              required
            />
          </label>
        </div>

        <div className={`calc-result ${ckd ? 'warn' : 'ok'}`}>
          {Number.isFinite(egfr) && stage ? (
            <>
              <div>
                <span>TFG CKD-EPI 2021</span>
                <strong>{egfr.toFixed(1)}</strong>
                <small>mL/min/1.73 m²</small>
              </div>
              <div>
                <span>Estágio</span>
                <strong>{stage}</strong>
                <small>{ckd ? 'DRC por TFG &lt; 60' : 'TFG ≥ 60'}</small>
              </div>
            </>
          ) : (
            <p>Informe idade (≥18) e creatinina válidas para calcular.</p>
          )}
        </div>

        <label>
          Doença de base
          <select
            value={disease}
            onChange={(e) => setDisease(e.target.value as UnderlyingDisease)}
          >
            {DISEASE_OPTIONS.map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="check-row">
          <input
            type="checkbox"
            checked={onStatin}
            onChange={(e) => setOnStatin(e.target.checked)}
          />
          Em uso de estatina
        </label>

        <label>
          Observações
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Opcional"
          />
        </label>

        <div className="form-actions">
          <button type="button" className="btn ghost" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn primary" disabled={!Number.isFinite(egfr)}>
            Salvar paciente
          </button>
        </div>
      </form>
    </div>
  )
}
