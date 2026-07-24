import type { AppData, Patient, Study } from '../types'
import { calculateCkdEpi2021, hasCkdByEgfr, stageFromEgfr } from '../lib/ckd-epi'
import { createId } from '../lib/id'

function makePatient(
  studyId: string,
  partial: Omit<
    Patient,
    | 'id'
    | 'studyId'
    | 'egfr'
    | 'ckdStage'
    | 'hasCkd'
    | 'createdAt'
    | 'updatedAt'
  > & { createdAt?: string },
): Patient {
  const egfr = calculateCkdEpi2021(partial.creatinineMgDl, partial.age, partial.sex)
  const now = partial.createdAt ?? new Date().toISOString()
  return {
    id: createId('patient'),
    studyId,
    name: partial.name,
    age: partial.age,
    sex: partial.sex,
    creatinineMgDl: partial.creatinineMgDl,
    egfr,
    ckdStage: stageFromEgfr(egfr),
    hasCkd: hasCkdByEgfr(egfr),
    underlyingDisease: partial.underlyingDisease,
    onStatin: partial.onStatin,
    notes: partial.notes,
    createdAt: now,
    updatedAt: now,
  }
}

export function seedData(): AppData {
  const now = new Date().toISOString()
  const studyId = createId('study')

  const study: Study = {
    id: studyId,
    title: 'Prevalência de DRC na região IRC',
    objective:
      'Estimar prevalência e perfil clínico de doença renal crônica (DRC) na região IRC, com cálculo automático de TFG pela equação CKD-EPI 2021.',
    region: 'IRC',
    template: 'ckd_epidemiology',
    status: 'active',
    createdAt: now,
    updatedAt: now,
  }

  const patients: Patient[] = [
    makePatient(studyId, {
      name: 'Ana Paula Souza',
      age: 62,
      sex: 'F',
      creatinineMgDl: 1.4,
      underlyingDisease: 'diabetes_hypertension',
      onStatin: true,
      notes: 'Acompanhamento ambulatorial',
    }),
    makePatient(studyId, {
      name: 'Carlos Mendes',
      age: 55,
      sex: 'M',
      creatinineMgDl: 1.1,
      underlyingDisease: 'hypertension',
      onStatin: true,
      notes: '',
    }),
    makePatient(studyId, {
      name: 'Francisca Lima',
      age: 71,
      sex: 'F',
      creatinineMgDl: 2.1,
      underlyingDisease: 'diabetes',
      onStatin: false,
      notes: 'Creatinina elevada na admissão',
    }),
    makePatient(studyId, {
      name: 'José Ribeiro',
      age: 48,
      sex: 'M',
      creatinineMgDl: 0.9,
      underlyingDisease: 'unknown',
      onStatin: false,
      notes: '',
    }),
    makePatient(studyId, {
      name: 'Maria das Dores',
      age: 67,
      sex: 'F',
      creatinineMgDl: 1.8,
      underlyingDisease: 'hypertension',
      onStatin: true,
      notes: '',
    }),
  ]

  return { version: 1, studies: [study], patients }
}
