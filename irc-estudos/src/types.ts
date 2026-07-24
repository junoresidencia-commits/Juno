export type Sex = 'F' | 'M'

export type CkdStage = 'G1' | 'G2' | 'G3a' | 'G3b' | 'G4' | 'G5'

export type UnderlyingDisease =
  | 'diabetes'
  | 'hypertension'
  | 'diabetes_hypertension'
  | 'glomerulopathy'
  | 'polycystic'
  | 'obstructive'
  | 'autoimmune'
  | 'other'
  | 'unknown'

export type StudyStatus = 'active' | 'paused' | 'completed'

export type StudyTemplate = 'ckd_epidemiology' | 'general'

export interface Study {
  id: string
  title: string
  objective: string
  region: string
  template: StudyTemplate
  status: StudyStatus
  createdAt: string
  updatedAt: string
}

export interface Patient {
  id: string
  studyId: string
  name: string
  age: number
  sex: Sex
  creatinineMgDl: number
  egfr: number
  ckdStage: CkdStage
  hasCkd: boolean
  underlyingDisease: UnderlyingDisease
  onStatin: boolean
  notes: string
  createdAt: string
  updatedAt: string
}

export interface AppData {
  version: 1
  studies: Study[]
  patients: Patient[]
}

export interface StudyStats {
  totalPatients: number
  ckdCount: number
  ckdPrevalence: number
  byStage: Record<CkdStage, number>
  byDisease: Record<UnderlyingDisease, number>
  bySex: Record<Sex, number>
  statinCount: number
  statinRate: number
  meanAge: number
  meanCreatinine: number
  meanEgfr: number
  ageBands: { label: string; total: number; ckd: number }[]
}

export const UNDERLYING_DISEASE_LABELS: Record<UnderlyingDisease, string> = {
  diabetes: 'Diabetes mellitus',
  hypertension: 'Hipertensão arterial',
  diabetes_hypertension: 'Diabetes + hipertensão',
  glomerulopathy: 'Glomerulopatia',
  polycystic: 'Doença renal policística',
  obstructive: 'Nefropatia obstrutiva',
  autoimmune: 'Doença autoimune',
  other: 'Outra',
  unknown: 'Desconhecida',
}

export const CKD_STAGE_LABELS: Record<CkdStage, string> = {
  G1: 'G1 (≥90)',
  G2: 'G2 (60–89)',
  G3a: 'G3a (45–59)',
  G3b: 'G3b (30–44)',
  G4: 'G4 (15–29)',
  G5: 'G5 (<15)',
}

export const STUDY_TEMPLATE_LABELS: Record<StudyTemplate, string> = {
  ckd_epidemiology: 'Epidemiologia de DRC',
  general: 'Estudo geral (IRC)',
}
