import { Link } from 'react-router-dom'
import { useData } from '../hooks/useData'
import { WORK_KIND_LABELS } from '../types'
import { computeStudyStats } from '../lib/stats'

export function HomePage() {
  const { studies, patientsOf } = useData()

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Região IRC · produtor de ciência e emprego</p>
          <h1>
            <span className="hero-brand">Meu Rim</span>
            <span className="hero-sub">Estudos</span>
          </h1>
          <p className="lede">
            Ideia → estrutura → dados → artigo. Gere trabalhos (DRC, transversal,
            revisão de literatura), calcule CKD-EPI, exporte Excel e sincronize
            com Supabase quando quiser.
          </p>
          <div className="cta-row">
            <Link className="btn primary" to="/novo-trabalho">
              Nova ideia de trabalho
            </Link>
            <Link className="btn secondary" to="/integracoes">
              Excel · Supabase
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden>
          <div className="hero-orb" />
          <div className="hero-panel">
            <span>Da ideia ao manuscrito</span>
            <strong>PICO · seções · prompt</strong>
            <p>CKD-EPI · Excel · Supabase · revisão</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Trabalhos na IRC</h2>
          <p>
            Cada item é um produto científico independente — artigo, revisão ou
            estudo com coleta.
          </p>
        </div>

        {studies.length === 0 ? (
          <div className="empty">
            <p>Nenhum trabalho ainda.</p>
            <Link className="btn primary" to="/novo-trabalho">
              Começar o primeiro
            </Link>
          </div>
        ) : (
          <ul className="study-list">
            {studies.map((study) => {
              const stats = computeStudyStats(patientsOf(study.id))
              const doneSections =
                study.blueprint?.articleSections.filter((s) => s.done).length ?? 0
              const totalSections = study.blueprint?.articleSections.length ?? 0
              return (
                <li key={study.id}>
                  <Link to={`/trabalho/${study.id}`} className="study-row">
                    <div>
                      <span className={`status pill ${study.status}`}>
                        {statusLabel(study.status)}
                      </span>
                      <h3>{study.title}</h3>
                      <p>{study.objective}</p>
                      <div className="meta">
                        <span>{study.region}</span>
                        <span>{WORK_KIND_LABELS[study.kind]}</span>
                        {study.template !== 'none' ? (
                          <>
                            <span>
                              {stats.totalPatients} paciente
                              {stats.totalPatients === 1 ? '' : 's'}
                            </span>
                            <span>
                              DRC {stats.ckdPrevalence.toFixed(0)}%
                              {stats.totalPatients ? ` (${stats.ckdCount})` : ''}
                            </span>
                          </>
                        ) : null}
                        {totalSections ? (
                          <span>
                            Manuscrito {doneSections}/{totalSections}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <span className="chevron" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}

function statusLabel(status: string) {
  if (status === 'active') return 'Ativo'
  if (status === 'paused') return 'Pausado'
  return 'Concluído'
}
