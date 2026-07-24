import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import type { AppData, Patient, Study } from '../types'
import {
  deletePatient as storageDeletePatient,
  deleteStudy as storageDeleteStudy,
  exportBackup,
  getPatientsForStudy,
  getStudy,
  importBackup,
  loadData,
  resetToSeed,
  upsertPatient as storageUpsertPatient,
  upsertStudy as storageUpsertStudy,
} from '../lib/storage'

type Listener = () => void

let cached: AppData = loadData()
const listeners = new Set<Listener>()

function emit() {
  cached = loadData()
  listeners.forEach((l) => l())
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return cached
}

export interface DataApi {
  data: AppData
  studies: Study[]
  createStudy: (
    input: Omit<Study, 'id' | 'createdAt' | 'updatedAt'>,
  ) => Study
  updateStudy: (study: Study) => Study
  removeStudy: (studyId: string) => void
  patientsOf: (studyId: string) => Patient[]
  studyOf: (studyId: string) => Study | undefined
  savePatient: (
    input: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'> & { id?: string },
  ) => Patient
  removePatient: (patientId: string) => void
  downloadBackup: () => void
  uploadBackup: (file: File) => Promise<void>
  restoreDemo: () => void
}

export const DataContext = createContext<DataApi | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const data = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const [, bump] = useState(0)

  const sync = useCallback(() => {
    emit()
    bump((n) => n + 1)
  }, [])

  const api = useMemo<DataApi>(
    () => ({
      data,
      studies: data.studies,
      createStudy: (input) => {
        const study = storageUpsertStudy(input)
        sync()
        return study
      },
      updateStudy: (study) => {
        const updated = storageUpsertStudy(study)
        sync()
        return updated
      },
      removeStudy: (studyId) => {
        storageDeleteStudy(studyId)
        sync()
      },
      patientsOf: (studyId) => getPatientsForStudy(studyId),
      studyOf: (studyId) => getStudy(studyId),
      savePatient: (input) => {
        const patient = storageUpsertPatient(input)
        sync()
        return patient
      },
      removePatient: (patientId) => {
        storageDeletePatient(patientId)
        sync()
      },
      downloadBackup: () => {
        const blob = new Blob([exportBackup()], {
          type: 'application/json',
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `irc-estudos-backup-${new Date().toISOString().slice(0, 10)}.json`
        a.click()
        URL.revokeObjectURL(url)
      },
      uploadBackup: async (file) => {
        const text = await file.text()
        importBackup(text)
        sync()
      },
      restoreDemo: () => {
        resetToSeed()
        sync()
      },
    }),
    [data, sync],
  )

  return <DataContext.Provider value={api}>{children}</DataContext.Provider>
}
