import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { DataProvider } from './hooks/data-context'
import { HomePage } from './pages/HomePage'
import { IntegrationsPage } from './pages/IntegrationsPage'
import { NewStudyPage } from './pages/NewStudyPage'
import { StudyPage } from './pages/StudyPage'

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/novo-trabalho" element={<NewStudyPage />} />
            <Route path="/integracoes" element={<IntegrationsPage />} />
            <Route path="/trabalho/:studyId" element={<StudyPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </DataProvider>
  )
}
