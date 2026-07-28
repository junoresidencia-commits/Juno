import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import type { AppData, LiteratureRecord, Patient, Study } from '../types'
import {
  deleteLiterature as storageDeleteLiterature,
  deletePatient as storageDeletePatient,
  deleteStudy as storageDeleteStudy,
  exportBackup,
  getLiteratureForStudy,
  getPatientsForStudy,
  getStudy,
  importBackup,
  loadData,
  replaceAllData,
  resetToSeed,
  upsertLiterature as storageUpsertLiterature,
  upsertPatient as storageUpsertPatient,
  upsertPatientsBulk,
  upsertStudy as storageUpsertStudy,
} from '../lib/storage'
import { pullFromSupabase, pushToSupabase } from '../lib/supabase'

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
  literatureOf: (studyId: string) => LiteratureRecord[]
  studyOf: (studyId: string) => Study | undefined
  savePatient: (
    input: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'> & { id?: string },
  ) => Patient
  importPatients: (patients: Patient[]) => number
  removePatient: (patientId: string) => void
  saveLiterature: (
    input: Omit<LiteratureRecord, 'id' | 'createdAt' | 'updatedAt'> & {
      id?: string
    },
  ) => LiteratureRecord
  removeLiterature: (id: string) => void
  downloadBackup: () => void
  uploadBackup: (file: File) => Promise<void>
  restoreDemo: () => void
  pushCloud: () => Promise<{
    studiesUpserted: number
    patientsUpserted: number
    literatureUpserted: number
  }>
  pullCloud: () => Promise<void>
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
      literatureOf: (studyId) => getLiteratureForStudy(studyId),
      studyOf: (studyId) => getStudy(studyId),
      savePatient: (input) => {
        const patient = storageUpsertPatient(input)
        sync()
        return patient
      },
      importPatients: (patients) => {
        const count = upsertPatientsBulk(patients)
        sync()
        return count
      },
      removePatient: (patientId) => {
        storageDeletePatient(patientId)
        sync()
      },
      saveLiterature: (input) => {
        const record = storageUpsertLiterature(input)
        sync()
        return record
      },
      removeLiterature: (id) => {
        storageDeleteLiterature(id)
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
      pushCloud: async () => {
        const result = await pushToSupabase(loadData())
        return result
      },
      pullCloud: async () => {
        const remote = await pullFromSupabase()
        replaceAllData(remote)
        sync()
      },
    }),
    [data, sync],
  )

  return <DataContext.Provider value={api}>{children}</DataContext.Provider>
}
