import { useState } from 'react'
import type { WorkBlueprint } from '../types'

export function BlueprintPreview({
  blueprint,
  onToggleSection,
}: {
  blueprint: WorkBlueprint
  onToggleSection?: (sectionId: string) => void
}) {
  const [copied, setCopied] = useState(false)

  async function copyPrompt() {
    await navigator.clipboard.writeText(blueprint.chatGptPrompt)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="blueprint">
      <div className="section-head tight">
        <h2>Estrutura do trabalho</h2>
        <p>Tudo que precisa para o produto científico ficar redondo.</p>
      </div>

      <div className="blueprint-block">
        <h3>Pergunta</h3>
        <p>{blueprint.researchQuestion}</p>
      </div>

      <div className="blueprint-block">
        <h3>PICO</h3>
        <ul className="plain-list">
          <li>
            <strong>P</strong> {blueprint.pico.population}
          </li>
          <li>
            <strong>I/E</strong> {blueprint.pico.interventionOrExposure}
          </li>
          <li>
            <strong>C</strong> {blueprint.pico.comparison}
          </li>
          <li>
            <strong>O</strong> {blueprint.pico.outcome}
          </li>
        </ul>
      </div>

      <div className="blueprint-block">
        <h3>Objetivos específicos</h3>
        <ol>
          {blueprint.specificObjectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ol>
      </div>

      <div className="blueprint-block">
        <h3>Variáveis necessárias</h3>
        <ul className="chip-list">
          {blueprint.requiredVariables.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </div>

      <div className="blueprint-block">
        <h3>Métodos (roteiro)</h3>
        <ol>
          {blueprint.methodsOutline.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ol>
      </div>

      <div className="blueprint-block">
        <h3>Seções do manuscrito</h3>
        <ul className="checklist">
          {blueprint.articleSections.map((sec) => (
            <li key={sec.id}>
              <label>
                <input
                  type="checkbox"
                  checked={sec.done}
                  disabled={!onToggleSection}
                  onChange={() => onToggleSection?.(sec.id)}
                />
                <span>
                  <strong>{sec.title}</strong>
                  <small>{sec.guidance}</small>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="blueprint-block">
        <h3>Revisão de literatura</h3>
        <p>
          <strong>Bases:</strong> {blueprint.literaturePlan.databases.join(', ')}
        </p>
        <p>
          <strong>Descritores:</strong>{' '}
          {blueprint.literaturePlan.keywords.join(' · ')}
        </p>
        <p>
          <strong>Inclusão:</strong>{' '}
          {blueprint.literaturePlan.inclusion.join('; ')}
        </p>
        <p>
          <strong>Exclusão:</strong>{' '}
          {blueprint.literaturePlan.exclusion.join('; ')}
        </p>
      </div>

      <div className="blueprint-block">
        <h3>Entregáveis</h3>
        <ul>
          {blueprint.deliverables.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>

      <div className="blueprint-block prompt-box">
        <div className="prompt-head">
          <h3>Prompt para ChatGPT</h3>
          <button type="button" className="btn ghost" onClick={() => void copyPrompt()}>
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </div>
        <pre>{blueprint.chatGptPrompt}</pre>
      </div>
    </div>
  )
}
