import type {
  CkdStage,
  Patient,
  Sex,
  StudyStats,
  UnderlyingDisease,
} from '../types'

const STAGES: CkdStage[] = ['G1', 'G2', 'G3a', 'G3b', 'G4', 'G5']
const DISEASES: UnderlyingDisease[] = [
  'diabetes',
  'hypertension',
  'diabetes_hypertension',
  'glomerulopathy',
  'polycystic',
  'obstructive',
  'autoimmune',
  'other',
  'unknown',
]

const AGE_BANDS = [
  { label: '18–39', min: 18, max: 39 },
  { label: '40–59', min: 40, max: 59 },
  { label: '60–74', min: 60, max: 74 },
  { label: '75+', min: 75, max: 200 },
]

export function computeStudyStats(patients: Patient[]): StudyStats {
  const byStage = Object.fromEntries(STAGES.map((s) => [s, 0])) as Record<
    CkdStage,
    number
  >
  const byDisease = Object.fromEntries(DISEASES.map((d) => [d, 0])) as Record<
    UnderlyingDisease,
    number
  >
  const bySex: Record<Sex, number> = { F: 0, M: 0 }

  let ckdCount = 0
  let statinCount = 0
  let ageSum = 0
  let creatSum = 0
  let egfrSum = 0

  for (const p of patients) {
    byStage[p.ckdStage] += 1
    byDisease[p.underlyingDisease] += 1
    bySex[p.sex] += 1
    if (p.hasCkd) ckdCount += 1
    if (p.onStatin) statinCount += 1
    ageSum += p.age
    creatSum += p.creatinineMgDl
    egfrSum += p.egfr
  }

  const total = patients.length
  const ageBands = AGE_BANDS.map((band) => {
    const inBand = patients.filter((p) => p.age >= band.min && p.age <= band.max)
    return {
      label: band.label,
      total: inBand.length,
      ckd: inBand.filter((p) => p.hasCkd).length,
    }
  })

  return {
    totalPatients: total,
    ckdCount,
    ckdPrevalence: total ? (ckdCount / total) * 100 : 0,
    byStage,
    byDisease,
    bySex,
    statinCount,
    statinRate: total ? (statinCount / total) * 100 : 0,
    meanAge: total ? ageSum / total : 0,
    meanCreatinine: total ? creatSum / total : 0,
    meanEgfr: total ? egfrSum / total : 0,
    ageBands,
  }
}

export function patientsToCsv(patients: Patient[]): string {
  const header = [
    'id',
    'nome',
    'idade',
    'sexo',
    'creatinina_mg_dl',
    'egfr_ckd_epi_2021',
    'estagio_ckd',
    'drc_egfr_lt_60',
    'doenca_base',
    'estatina',
    'observacoes',
    'cadastrado_em',
  ]

  const rows = patients.map((p) =>
    [
      p.id,
      escapeCsv(p.name),
      p.age,
      p.sex,
      p.creatinineMgDl,
      p.egfr,
      p.ckdStage,
      p.hasCkd ? 'sim' : 'nao',
      p.underlyingDisease,
      p.onStatin ? 'sim' : 'nao',
      escapeCsv(p.notes),
      p.createdAt,
    ].join(','),
  )

  return [header.join(','), ...rows].join('\n')
}

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}
