import { Link } from 'react-router-dom'
import { useData } from '../hooks/useData'
import { STUDY_TEMPLATE_LABELS } from '../types'
import { computeStudyStats } from '../lib/stats'

export function HomePage() {
  const { studies, patientsOf } = useData()

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Região IRC · pesquisa e emprego em saúde</p>
          <h1>
            <span className="hero-brand">Meu Rim</span>
            <span className="hero-sub">Estudos</span>
          </h1>
          <p className="lede">
            Crie vários trabalhos de pesquisa: cadastre pacientes, calcule a TFG
            pela CKD-EPI e acompanhe prevalência de DRC, doença de base e uso de
            estatina — tudo pronto para relatórios daqui a meses.
          </p>
          <div className="cta-row">
            <Link className="btn primary" to="/novo-trabalho">
              Criar novo trabalho
            </Link>
            {studies[0] ? (
              <Link className="btn secondary" to={`/trabalho/${studies[0].id}`}>
                Abrir estudo de DRC
              </Link>
            ) : null}
          </div>
        </div>
        <div className="hero-visual" aria-hidden>
          <div className="hero-orb" />
          <div className="hero-panel">
            <span>CKD-EPI 2021</span>
            <strong>TFG automática</strong>
            <p>Creatinina · idade · sexo → estágio G1–G5</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Trabalhos na IRC</h2>
          <p>
            Cada trabalho é um estudo independente. O primeiro modelo cobre
            epidemiologia de doença renal; outros podem ser abertos conforme a
            demanda da região.
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
                        <span>{STUDY_TEMPLATE_LABELS[study.template]}</span>
                        <span>
                          {stats.totalPatients} paciente
                          {stats.totalPatients === 1 ? '' : 's'}
                        </span>
                        <span>
                          DRC {stats.ckdPrevalence.toFixed(0)}%
                          {stats.totalPatients ? ` (${stats.ckdCount})` : ''}
                        </span>
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
