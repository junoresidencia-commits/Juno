import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../hooks/useData'
import { generateBlueprint, templateForKind } from '../lib/blueprint'
import type { WorkBlueprint, WorkKind } from '../types'
import { WORK_KIND_HINTS, WORK_KIND_LABELS } from '../types'
import { BlueprintPreview } from '../components/BlueprintPreview'

export function NewStudyPage() {
  const { createStudy } = useData()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [idea, setIdea] = useState('')
  const [region, setRegion] = useState('IRC')
  const [kind, setKind] = useState<WorkKind>('ckd_epidemiology')
  const [blueprint, setBlueprint] = useState<WorkBlueprint | null>(null)

  const canGenerate = title.trim().length > 2 && idea.trim().length > 8

  const preview = useMemo(() => blueprint, [blueprint])

  function onGenerate(e?: FormEvent) {
    e?.preventDefault()
    if (!canGenerate) return
    setBlueprint(
      generateBlueprint({
        title: title.trim(),
        idea: idea.trim(),
        kind,
        region: region.trim() || 'IRC',
      }),
    )
  }

  function onCreate() {
    if (!title.trim() || !idea.trim()) return
    const bp =
      blueprint ??
      generateBlueprint({
        title: title.trim(),
        idea: idea.trim(),
        kind,
        region: region.trim() || 'IRC',
      })
    const study = createStudy({
      title: title.trim(),
      objective: bp.specificObjectives[0] || idea.trim(),
      region: region.trim() || 'IRC',
      template: templateForKind(kind),
      kind,
      idea: idea.trim(),
      blueprint: bp,
      status: 'active',
    })
    navigate(`/trabalho/${study.id}`)
  }

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Produtor de trabalhos científicos</p>
        <h1>Da ideia ao artigo</h1>
        <p className="lede compact">
          Coloque o nome do trabalho e a ideia (ou cole o que o ChatGPT sugeriu).
          O app gera o que você precisa: pergunta, PICO, variáveis, seções do
          manuscrito, plano de revisão e prompt para aprofundar.
        </p>
      </header>

      <div className="split idea-split">
        <form className="form panel" onSubmit={onGenerate}>
          <label>
            Nome / título do trabalho
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex.: Prevalência de DRC e uso de estatina na IRC"
              required
            />
          </label>

          <label>
            Ideia (pode colar do ChatGPT)
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              rows={7}
              placeholder="Ex.: Quero um estudo transversal na região IRC medindo creatinina, CKD-EPI, diabetes/HAS e estatina, e depois escrever o artigo…"
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
              Tipo de produto
              <select
                value={kind}
                onChange={(e) => {
                  setKind(e.target.value as WorkKind)
                  setBlueprint(null)
                }}
              >
                {(Object.keys(WORK_KIND_LABELS) as WorkKind[]).map((key) => (
                  <option key={key} value={key}>
                    {WORK_KIND_LABELS[key]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="hint">{WORK_KIND_HINTS[kind]}</p>

          <div className="form-actions">
            <button
              type="submit"
              className="btn secondary"
              disabled={!canGenerate}
            >
              Gerar estrutura
            </button>
            <button
              type="button"
              className="btn primary"
              disabled={!canGenerate}
              onClick={onCreate}
            >
              Criar trabalho
            </button>
          </div>
        </form>

        <div className="panel">
          {preview ? (
            <BlueprintPreview blueprint={preview} />
          ) : (
            <div className="empty soft">
              <p>
                Gere a estrutura para ver objetivos, variáveis, seções do artigo
                e o prompt pronto para o ChatGPT.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
