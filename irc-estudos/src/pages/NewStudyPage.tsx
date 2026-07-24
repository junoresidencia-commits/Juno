import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../hooks/useData'
import type { StudyStatus, StudyTemplate } from '../types'
import { STUDY_TEMPLATE_LABELS } from '../types'

export function NewStudyPage() {
  const { createStudy } = useData()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [objective, setObjective] = useState('')
  const [region, setRegion] = useState('IRC')
  const [template, setTemplate] = useState<StudyTemplate>('ckd_epidemiology')
  const [status, setStatus] = useState<StudyStatus>('active')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim() || !objective.trim()) return
    const study = createStudy({
      title: title.trim(),
      objective: objective.trim(),
      region: region.trim() || 'IRC',
      template,
      status,
    })
    navigate(`/trabalho/${study.id}`)
  }

  return (
    <div className="page narrow">
      <header className="page-header">
        <p className="eyebrow">Novo trabalho</p>
        <h1>Abrir mais um estudo na IRC</h1>
        <p className="lede compact">
          Não precisa ser só DRC. Use o modelo de epidemiologia renal ou um
          estudo geral — a plataforma cresce com os trabalhos da região.
        </p>
      </header>

      <form className="form panel" onSubmit={onSubmit}>
        <label>
          Título do trabalho
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex.: Prevalência de DRC na unidade X"
            required
          />
        </label>

        <label>
          Objetivo
          <textarea
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            rows={4}
            placeholder="O que este trabalho pretende medir ou descrever?"
            required
          />
        </label>

        <div className="grid-2">
          <label>
            Região
            <input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            />
          </label>
          <label>
            Status
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as StudyStatus)}
            >
              <option value="active">Ativo</option>
              <option value="paused">Pausado</option>
              <option value="completed">Concluído</option>
            </select>
          </label>
        </div>

        <fieldset>
          <legend>Modelo do trabalho</legend>
          {(Object.keys(STUDY_TEMPLATE_LABELS) as StudyTemplate[]).map((key) => (
            <label key={key} className="radio-row">
              <input
                type="radio"
                name="template"
                checked={template === key}
                onChange={() => setTemplate(key)}
              />
              <span>
                <strong>{STUDY_TEMPLATE_LABELS[key]}</strong>
                <small>
                  {key === 'ckd_epidemiology'
                    ? 'Nome, idade, sexo, creatinina, doença de base, estatina + CKD-EPI.'
                    : 'Mesma ficha clínica básica, para outros recortes na IRC.'}
                </small>
              </span>
            </label>
          ))}
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="btn primary">
            Criar trabalho
          </button>
        </div>
      </form>
    </div>
  )
}
