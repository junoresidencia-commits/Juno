import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../hooks/useData'
import { isSupabaseConfigured } from '../lib/supabase'

export function IntegrationsPage() {
  const { pushCloud, pullCloud, downloadBackup, uploadBackup, restoreDemo } =
    useData()
  const configured = isSupabaseConfigured()
  const [message, setMessage] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onPush() {
    setBusy(true)
    setMessage(null)
    try {
      const result = await pushCloud()
      setMessage(
        `Enviado: ${result.studiesUpserted} trabalhos, ${result.patientsUpserted} pacientes, ${result.literatureUpserted} artigos.`,
      )
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Falha ao enviar.')
    } finally {
      setBusy(false)
    }
  }

  async function onPull() {
    if (
      !window.confirm(
        'Isso substitui os dados locais pelos dados do Supabase. Continuar?',
      )
    ) {
      return
    }
    setBusy(true)
    setMessage(null)
    try {
      await pullCloud()
      setMessage('Dados baixados do Supabase.')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Falha ao baixar.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="page narrow">
      <header className="page-header">
        <p className="eyebrow">Excel · Supabase · Backup</p>
        <h1>Integrações</h1>
        <p className="lede compact">
          O app funciona offline no navegador. Excel entra em cada trabalho;
          Supabase e backup JSON ficam aqui.
        </p>
      </header>

      <section className="panel form">
        <h2 className="panel-title">Supabase</h2>
        <p className="hint">
          Status:{' '}
          <strong>{configured ? 'configurado' : 'não configurado'}</strong>
          {!configured
            ? ' — copie `.env.example` para `.env`, rode o SQL em `supabase/migrations/001_irc_estudos.sql` e reinicie o Vite.'
            : null}
        </p>
        <div className="form-actions left">
          <button
            type="button"
            className="btn primary"
            disabled={!configured || busy}
            onClick={() => void onPush()}
          >
            Enviar para a nuvem
          </button>
          <button
            type="button"
            className="btn secondary"
            disabled={!configured || busy}
            onClick={() => void onPull()}
          >
            Puxar da nuvem
          </button>
        </div>
        {message ? <p className="sync-msg">{message}</p> : null}
        <p className="hint">
          Guia completo: <code>irc-estudos/docs/SUPABASE.md</code>
        </p>
      </section>

      <section className="panel form">
        <h2 className="panel-title">Backup local</h2>
        <div className="form-actions left">
          <button type="button" className="btn ghost" onClick={downloadBackup}>
            Baixar JSON
          </button>
          <label className="btn ghost file-btn">
            Restaurar JSON
            <input
              type="file"
              accept="application/json,.json"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  void uploadBackup(file).catch((err: Error) => {
                    window.alert(err.message || 'Falha ao importar.')
                  })
                }
                e.target.value = ''
              }}
            />
          </label>
          <button
            type="button"
            className="btn danger ghost"
            onClick={() => {
              if (window.confirm('Restaurar dados de demonstração?')) {
                restoreDemo()
              }
            }}
          >
            Restaurar demo
          </button>
        </div>
      </section>

      <p>
        <Link to="/">← Voltar aos trabalhos</Link>
      </p>
    </div>
  )
}
