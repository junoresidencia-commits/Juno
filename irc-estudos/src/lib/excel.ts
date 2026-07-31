import * as XLSX from 'xlsx'
import type { LiteratureRecord, Patient, Sex, UnderlyingDisease } from '../types'
import {
  calculateCkdEpi2021,
  hasCkdByEgfr,
  stageFromEgfr,
} from './ckd-epi'
import { createId } from './id'
import { UNDERLYING_DISEASE_LABELS } from '../types'

const DISEASE_BY_LABEL = Object.fromEntries(
  Object.entries(UNDERLYING_DISEASE_LABELS).map(([k, v]) => [
    v.toLowerCase(),
    k as UnderlyingDisease,
  ]),
)

const HEADER = [
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
] as const

export function downloadPatientsExcel(
  patients: Patient[],
  studyTitle: string,
  options?: { anonymize?: boolean },
) {
  const anonymize = options?.anonymize ?? false
  const rows = patients.map((p, index) => ({
    id: p.id,
    nome: anonymize ? `P${String(index + 1).padStart(3, '0')}` : p.name,
    idade: p.age,
    sexo: p.sex,
    creatinina_mg_dl: p.creatinineMgDl,
    egfr_ckd_epi_2021: p.egfr,
    estagio_ckd: p.ckdStage,
    drc_egfr_lt_60: p.hasCkd ? 'sim' : 'nao',
    doenca_base: UNDERLYING_DISEASE_LABELS[p.underlyingDisease],
    estatina: p.onStatin ? 'sim' : 'nao',
    observacoes: anonymize ? '' : p.notes,
    cadastrado_em: p.createdAt,
  }))

  const sheet = XLSX.utils.json_to_sheet(rows, { header: [...HEADER] })
  const book = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(book, sheet, 'Pacientes')
  const safe = studyTitle.replace(/[^\p{L}\p{N}]+/gu, '-').toLowerCase()
  const suffix = anonymize ? '-anonimizado' : '-pacientes'
  XLSX.writeFile(book, `${safe || 'estudo'}${suffix}.xlsx`)
}

export function downloadPatientsTemplate(studyTitle: string) {
  const sample = [
    {
      id: '',
      nome: 'Exemplo Silva',
      idade: 60,
      sexo: 'F',
      creatinina_mg_dl: 1.2,
      egfr_ckd_epi_2021: '(calculado na importação)',
      estagio_ckd: '',
      drc_egfr_lt_60: '',
      doenca_base: 'Hipertensão arterial',
      estatina: 'sim',
      observacoes: '',
      cadastrado_em: '',
    },
  ]
  const sheet = XLSX.utils.json_to_sheet(sample, { header: [...HEADER] })
  const book = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(book, sheet, 'Pacientes')
  XLSX.writeFile(
    book,
    `modelo-${studyTitle.replace(/[^\p{L}\p{N}]+/gu, '-').toLowerCase() || 'estudo'}.xlsx`,
  )
}

export async function parsePatientsExcel(
  file: File,
  studyId: string,
): Promise<Patient[]> {
  const buffer = await file.arrayBuffer()
  const book = XLSX.read(buffer, { type: 'array' })
  const sheetName = book.SheetNames[0]
  if (!sheetName) throw new Error('Planilha vazia.')
  const sheet = book.Sheets[sheetName]
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: '',
  })
  if (!rows.length) throw new Error('Nenhuma linha encontrada no Excel.')

  const now = new Date().toISOString()
  const patients: Patient[] = []

  for (const row of rows) {
    const name = String(pick(row, ['nome', 'name', 'paciente']) || '').trim()
    if (!name || name.toLowerCase().startsWith('exemplo')) continue

    const age = Number(pick(row, ['idade', 'age']))
    const sexRaw = String(pick(row, ['sexo', 'sex']) || '')
      .trim()
      .toUpperCase()
    const sex: Sex = sexRaw.startsWith('M') ? 'M' : 'F'
    const creatinine = Number(
      String(pick(row, ['creatinina_mg_dl', 'creatinina', 'creatinine']) || '')
        .replace(',', '.'),
    )
    if (!Number.isFinite(age) || age < 18 || !Number.isFinite(creatinine) || creatinine <= 0) {
      continue
    }

    const egfr = calculateCkdEpi2021(creatinine, age, sex)
    if (!Number.isFinite(egfr)) continue

    const disease = parseDisease(
      String(pick(row, ['doenca_base', 'doença_base', 'disease']) || ''),
    )
    const statinRaw = String(pick(row, ['estatina', 'statin']) || '')
      .toLowerCase()
      .trim()
    const onStatin = ['sim', 's', 'yes', 'true', '1'].includes(statinRaw)

    patients.push({
      id: String(pick(row, ['id']) || '').trim() || createId('patient'),
      studyId,
      name,
      age,
      sex,
      creatinineMgDl: creatinine,
      egfr,
      ckdStage: stageFromEgfr(egfr),
      hasCkd: hasCkdByEgfr(egfr),
      underlyingDisease: disease,
      onStatin,
      notes: String(pick(row, ['observacoes', 'observações', 'notes']) || '').trim(),
      createdAt: String(pick(row, ['cadastrado_em']) || '') || now,
      updatedAt: now,
    })
  }

  if (!patients.length) {
    throw new Error(
      'Nenhum paciente válido. Use colunas: nome, idade, sexo, creatinina_mg_dl.',
    )
  }
  return patients
}

function pick(row: Record<string, unknown>, keys: string[]): unknown {
  const entries = Object.entries(row)
  for (const key of keys) {
    const found = entries.find(
      ([k]) => k.trim().toLowerCase() === key.toLowerCase(),
    )
    if (found) return found[1]
  }
  return undefined
}

function parseDisease(raw: string): UnderlyingDisease {
  const value = raw.trim().toLowerCase()
  if (!value) return 'unknown'
  if (DISEASE_BY_LABEL[value]) return DISEASE_BY_LABEL[value]
  if (value.includes('diabetes') && value.includes('hiper')) {
    return 'diabetes_hypertension'
  }
  if (value.includes('diabetes') || value === 'dm') return 'diabetes'
  if (value.includes('hiper') || value === 'has') return 'hypertension'
  if (value.includes('glomer')) return 'glomerulopathy'
  if (value.includes('polic')) return 'polycystic'
  if (value.includes('obstr')) return 'obstructive'
  if (value.includes('autoim')) return 'autoimmune'
  if (value.includes('outra') || value.includes('other')) return 'other'
  return 'unknown'
}

export function downloadLiteratureExcel(
  records: LiteratureRecord[],
  studyTitle: string,
) {
  const rows = records.map((r) => ({
    incluido: r.included ? 'sim' : 'nao',
    ano: r.year ?? '',
    titulo: r.title,
    autores: r.authors,
    periodico: r.journal,
    tipo_estudo: r.studyType,
    populacao: r.population,
    achados: r.mainFindings,
    limitacoes: r.limitations,
    notas: r.notes,
  }))
  const sheet = XLSX.utils.json_to_sheet(rows)
  const book = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(book, sheet, 'Literatura')
  const safe = studyTitle.replace(/[^\p{L}\p{N}]+/gu, '-').toLowerCase()
  XLSX.writeFile(book, `${safe || 'revisao'}-literatura.xlsx`)
}
