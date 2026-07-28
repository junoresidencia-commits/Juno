import type { AppData, LiteratureRecord, Patient, Study } from '../types'
import { generateBlueprint } from '../lib/blueprint'
import { createManuscriptFromBlueprint } from '../lib/manuscript'
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
  const title = 'Prevalência de DRC na região IRC'
  const idea =
    'Quero estimar prevalência de doença renal crônica na região IRC, com creatinina, CKD-EPI, doença de base e estatina, e transformar isso em artigo.'
  const kind = 'ckd_epidemiology' as const
  const blueprint = generateBlueprint({
    title,
    idea,
    kind,
    region: 'IRC',
  })
  const manuscript = createManuscriptFromBlueprint(
    { title, objective: blueprint.specificObjectives[0] ?? idea, idea, kind, region: 'IRC' },
    blueprint,
  )

  const study: Study = {
    id: studyId,
    title,
    objective: blueprint.specificObjectives[0] ?? idea,
    region: 'IRC',
    template: 'ckd_epidemiology',
    kind,
    idea,
    blueprint,
    manuscript,
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

  const reviewId = createId('study')
  const reviewTitle = 'Revisão: DRC e estatina na atenção primária'
  const reviewIdea =
    'Revisão de literatura sobre uso de estatina em pacientes com DRC na atenção primária, com aplicação à região IRC.'
  const reviewBlueprint = generateBlueprint({
    title: reviewTitle,
    idea: reviewIdea,
    kind: 'literature_review',
    region: 'IRC',
  })
  const reviewStudy: Study = {
    id: reviewId,
    title: reviewTitle,
    objective: reviewBlueprint.specificObjectives[0] ?? reviewIdea,
    region: 'IRC',
    template: 'none',
    kind: 'literature_review',
    idea: reviewIdea,
    blueprint: reviewBlueprint,
    manuscript: createManuscriptFromBlueprint(
      {
        title: reviewTitle,
        objective: reviewBlueprint.specificObjectives[0] ?? reviewIdea,
        idea: reviewIdea,
        kind: 'literature_review',
        region: 'IRC',
      },
      reviewBlueprint,
    ),
    status: 'active',
    createdAt: now,
    updatedAt: now,
  }

  const literature: LiteratureRecord[] = [
    {
      id: createId('lit'),
      studyId: reviewId,
      title: 'Statins and chronic kidney disease outcomes',
      authors: 'Exemplo A, Exemplo B',
      year: 2021,
      journal: 'Exemplo Journal of Nephrology',
      studyType: 'Revisão / metanálise',
      population: 'Adultos com DRC',
      mainFindings: 'Associação de estatina com redução de eventos CV em estratos selecionados.',
      limitations: 'Heterogeneidade entre estudos.',
      included: true,
      notes: 'Usar na discussão do trabalho local.',
      createdAt: now,
      updatedAt: now,
    },
  ]

  return {
    version: 3,
    studies: [study, reviewStudy],
    patients,
    literature,
  }
}
