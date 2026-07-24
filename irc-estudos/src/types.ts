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

/** Ficha de coleta de pacientes (dados clínicos). */
export type StudyTemplate = 'ckd_epidemiology' | 'general' | 'none'

/**
 * Tipo de produto científico do trabalho.
 * O app ajuda a estruturar artigo, revisão, etc. a partir de uma ideia.
 */
export type WorkKind =
  | 'ckd_epidemiology'
  | 'cross_sectional'
  | 'original_article'
  | 'literature_review'
  | 'case_series'

export interface PicoFrame {
  population: string
  interventionOrExposure: string
  comparison: string
  outcome: string
}

export interface ArticleSection {
  id: string
  title: string
  guidance: string
  done: boolean
}

export interface LiteraturePlan {
  databases: string[]
  keywords: string[]
  inclusion: string[]
  exclusion: string[]
}

/** Estrutura gerada a partir da ideia — o que o trabalho precisa para ficar bom. */
export interface WorkBlueprint {
  researchQuestion: string
  pico: PicoFrame
  specificObjectives: string[]
  requiredVariables: string[]
  methodsOutline: string[]
  articleSections: ArticleSection[]
  literaturePlan: LiteraturePlan
  deliverables: string[]
  chatGptPrompt: string
  generatedAt: string
}

export interface Study {
  id: string
  title: string
  objective: string
  region: string
  template: StudyTemplate
  kind: WorkKind
  /** Ideia bruta / rascunho que originou o trabalho. */
  idea: string
  blueprint?: WorkBlueprint
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
  version: 2
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
  ckd_epidemiology: 'Ficha DRC + CKD-EPI',
  general: 'Ficha clínica geral',
  none: 'Sem coleta de pacientes',
}

export const WORK_KIND_LABELS: Record<WorkKind, string> = {
  ckd_epidemiology: 'Epidemiologia de DRC (dados + artigo)',
  cross_sectional: 'Estudo transversal',
  original_article: 'Artigo original',
  literature_review: 'Revisão de literatura',
  case_series: 'Série de casos',
}

export const WORK_KIND_HINTS: Record<WorkKind, string> = {
  ckd_epidemiology:
    'Coleta pacientes, calcula TFG e já estrutura o artigo de prevalência.',
  cross_sectional:
    'Corte transversal com variáveis, objetivos e seções do manuscrito.',
  original_article:
    'Produto científico completo: pergunta, métodos, resultados e discussão.',
  literature_review:
    'Bases, descritores, inclusão/exclusão e roteiro da revisão.',
  case_series:
    'Casos clínicos com variáveis mínimas e narrativa para publicação.',
}
