import type {
  AppData,
  LiteratureRecord,
  Patient,
  Study,
  StudyTemplate,
  WorkKind,
} from '../types'
import { createId } from './id'
import { seedData } from '../data/seed'

const STORAGE_KEY = 'meu-rim-irc-estudos-v1'

function emptyData(): AppData {
  return { version: 3, studies: [], patients: [], literature: [] }
}

function normalizeStudy(raw: Partial<Study> & { title?: string }): Study {
  const template = (raw.template ?? 'general') as StudyTemplate
  const kind = (raw.kind ??
    (template === 'ckd_epidemiology'
      ? 'ckd_epidemiology'
      : 'cross_sectional')) as WorkKind
  const now = new Date().toISOString()
  return {
    id: raw.id || createId('study'),
    title: raw.title || 'Trabalho sem título',
    objective: raw.objective || '',
    region: raw.region || 'IRC',
    template,
    kind,
    idea: raw.idea || raw.objective || '',
    blueprint: raw.blueprint,
    manuscript: raw.manuscript,
    status: raw.status || 'active',
    createdAt: raw.createdAt || now,
    updatedAt: raw.updatedAt || now,
  }
}

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seeded = seedData()
      saveData(seeded)
      return seeded
    }
    const parsed = JSON.parse(raw) as Partial<AppData> & { version?: number }
    if (!parsed || !Array.isArray(parsed.studies)) {
      return emptyData()
    }
    const data: AppData = {
      version: 3,
      studies: parsed.studies.map((s) => normalizeStudy(s as Study)),
      patients: Array.isArray(parsed.patients) ? (parsed.patients as Patient[]) : [],
      literature: Array.isArray(parsed.literature)
        ? (parsed.literature as LiteratureRecord[])
        : [],
    }
    if (parsed.version !== 3) {
      saveData(data)
    }
    return data
  } catch {
    return emptyData()
  }
}

export function saveData(data: AppData): void {
  const payload: AppData = {
    version: 3,
    studies: data.studies.map((s) => normalizeStudy(s)),
    patients: data.patients,
    literature: data.literature ?? [],
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export function replaceAllData(data: AppData): AppData {
  saveData({
    version: 3,
    studies: data.studies,
    patients: data.patients,
    literature: data.literature ?? [],
  })
  return loadData()
}

export function upsertStudy(
  study: Omit<Study, 'id' | 'createdAt' | 'updatedAt'> & { id?: string },
): Study {
  const data = loadData()
  const now = new Date().toISOString()

  if (study.id) {
    const index = data.studies.findIndex((s) => s.id === study.id)
    if (index >= 0) {
      const updated = normalizeStudy({
        ...data.studies[index],
        ...study,
        id: study.id,
        updatedAt: now,
      })
      data.studies[index] = updated
      saveData(data)
      return updated
    }
  }

  const created = normalizeStudy({
    ...study,
    id: createId('study'),
    createdAt: now,
    updatedAt: now,
  })
  data.studies.unshift(created)
  saveData(data)
  return created
}

export function deleteStudy(studyId: string): void {
  const data = loadData()
  data.studies = data.studies.filter((s) => s.id !== studyId)
  data.patients = data.patients.filter((p) => p.studyId !== studyId)
  data.literature = data.literature.filter((l) => l.studyId !== studyId)
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

export function getLiteratureForStudy(studyId: string): LiteratureRecord[] {
  return loadData()
    .literature.filter((l) => l.studyId === studyId)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || b.updatedAt.localeCompare(a.updatedAt))
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

export function upsertPatientsBulk(patients: Patient[]): number {
  const data = loadData()
  let count = 0
  for (const patient of patients) {
    const index = data.patients.findIndex((p) => p.id === patient.id)
    if (index >= 0) {
      data.patients[index] = { ...patient, updatedAt: new Date().toISOString() }
    } else {
      data.patients.unshift(patient)
    }
    count += 1
  }
  saveData(data)
  return count
}

export function deletePatient(patientId: string): void {
  const data = loadData()
  data.patients = data.patients.filter((p) => p.id !== patientId)
  saveData(data)
}

export function upsertLiterature(
  record: Omit<LiteratureRecord, 'id' | 'createdAt' | 'updatedAt'> & {
    id?: string
  },
): LiteratureRecord {
  const data = loadData()
  const now = new Date().toISOString()

  if (record.id) {
    const index = data.literature.findIndex((l) => l.id === record.id)
    if (index >= 0) {
      const updated: LiteratureRecord = {
        ...data.literature[index],
        ...record,
        id: record.id,
        updatedAt: now,
      }
      data.literature[index] = updated
      saveData(data)
      return updated
    }
  }

  const created: LiteratureRecord = {
    ...record,
    id: createId('lit'),
    createdAt: now,
    updatedAt: now,
  }
  data.literature.unshift(created)
  saveData(data)
  return created
}

export function deleteLiterature(recordId: string): void {
  const data = loadData()
  data.literature = data.literature.filter((l) => l.id !== recordId)
  saveData(data)
}

export function exportBackup(): string {
  return JSON.stringify(loadData(), null, 2)
}

export function importBackup(json: string): AppData {
  const parsed = JSON.parse(json) as Partial<AppData>
  if (!parsed || !Array.isArray(parsed.studies) || !Array.isArray(parsed.patients)) {
    throw new Error('Arquivo inválido: faltam estudos ou pacientes.')
  }
  saveData({
    version: 3,
    studies: parsed.studies.map((s) => normalizeStudy(s)),
    patients: parsed.patients,
    literature: Array.isArray(parsed.literature) ? parsed.literature : [],
  })
  return loadData()
}

export function resetToSeed(): AppData {
  const seeded = seedData()
  saveData(seeded)
  return seeded
}
