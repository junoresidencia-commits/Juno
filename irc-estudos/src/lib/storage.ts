import type { AppData, Patient, Study } from '../types'
import { createId } from './id'
import { seedData } from '../data/seed'

const STORAGE_KEY = 'meu-rim-irc-estudos-v1'

function emptyData(): AppData {
  return { version: 1, studies: [], patients: [] }
}

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seeded = seedData()
      saveData(seeded)
      return seeded
    }
    const parsed = JSON.parse(raw) as AppData
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.studies)) {
      return emptyData()
    }
    return {
      version: 1,
      studies: parsed.studies,
      patients: Array.isArray(parsed.patients) ? parsed.patients : [],
    }
  } catch {
    return emptyData()
  }
}

export function saveData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function upsertStudy(study: Omit<Study, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Study {
  const data = loadData()
  const now = new Date().toISOString()

  if (study.id) {
    const index = data.studies.findIndex((s) => s.id === study.id)
    if (index >= 0) {
      const updated: Study = {
        ...data.studies[index],
        ...study,
        id: study.id,
        updatedAt: now,
      }
      data.studies[index] = updated
      saveData(data)
      return updated
    }
  }

  const created: Study = {
    id: createId('study'),
    title: study.title,
    objective: study.objective,
    region: study.region,
    template: study.template,
    status: study.status,
    createdAt: now,
    updatedAt: now,
  }
  data.studies.unshift(created)
  saveData(data)
  return created
}

export function deleteStudy(studyId: string): void {
  const data = loadData()
  data.studies = data.studies.filter((s) => s.id !== studyId)
  data.patients = data.patients.filter((p) => p.studyId !== studyId)
  saveData(data)
}

export function getStudy(studyId: string): Study | undefined {
  return loadData().studies.find((s) => s.id === studyId)
}

export function getPatientsForStudy(studyId: string): Patient[] {
  return loadData()
    .patients.filter((p) => p.studyId === studyId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function upsertPatient(
  patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'> & { id?: string },
): Patient {
  const data = loadData()
  const now = new Date().toISOString()

  if (patient.id) {
    const index = data.patients.findIndex((p) => p.id === patient.id)
    if (index >= 0) {
      const updated: Patient = {
        ...data.patients[index],
        ...patient,
        id: patient.id,
        updatedAt: now,
      }
      data.patients[index] = updated
      saveData(data)
      return updated
    }
  }

  const created: Patient = {
    ...patient,
    id: createId('patient'),
    createdAt: now,
    updatedAt: now,
  }
  data.patients.unshift(created)
  saveData(data)
  return created
}

export function deletePatient(patientId: string): void {
  const data = loadData()
  data.patients = data.patients.filter((p) => p.id !== patientId)
  saveData(data)
}

export function exportBackup(): string {
  return JSON.stringify(loadData(), null, 2)
}

export function importBackup(json: string): AppData {
  const parsed = JSON.parse(json) as AppData
  if (!parsed || parsed.version !== 1) {
    throw new Error('Arquivo inválido: versão não suportada.')
  }
  if (!Array.isArray(parsed.studies) || !Array.isArray(parsed.patients)) {
    throw new Error('Arquivo inválido: faltam estudos ou pacientes.')
  }
  saveData({
    version: 1,
    studies: parsed.studies,
    patients: parsed.patients,
  })
  return loadData()
}

export function resetToSeed(): AppData {
  const seeded = seedData()
  saveData(seeded)
  return seeded
}
