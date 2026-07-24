import { Link, NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useData } from '../hooks/useData'

export function AppShell({ children }: { children: ReactNode }) {
  const { downloadBackup, uploadBackup } = useData()

  return (
    <div className="shell">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden />
          <span className="brand-text">
            <strong>Meu Rim</strong>
            <em>Estudos IRC</em>
          </span>
        </Link>
        <nav className="topnav" aria-label="Principal">
          <NavLink to="/" end>
            Trabalhos
          </NavLink>
          <NavLink to="/novo-trabalho">Nova ideia</NavLink>
          <NavLink to="/integracoes">Integrações</NavLink>
        </nav>
        <div className="top-actions">
          <button type="button" className="btn ghost" onClick={downloadBackup}>
            Backup
          </button>
          <label className="btn ghost file-btn">
            Restaurar
            <input
              type="file"
              accept="application/json,.json"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  void uploadBackup(file).catch((err: Error) => {
                    window.alert(err.message || 'Falha ao importar backup.')
                  })
                }
                e.target.value = ''
              }}
            />
          </label>
        </div>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <p>
          Produtor de trabalhos científicos na região IRC: ideia → estrutura →
          dados → artigo. Excel e Supabase opcionais. CKD-EPI 2021 (sem raça).
          Não substitui julgamento clínico nem revisão editorial.
        </p>
      </footer>
    </div>
  )
}
