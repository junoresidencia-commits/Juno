import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { AppData, Patient, Study } from '../types'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

let client: SupabaseClient | null = null

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anon)
}

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null
  if (!client) {
    client = createClient(url!, anon!)
  }
  return client
}

export type SyncResult = {
  studiesUpserted: number
  patientsUpserted: number
}

/** Envia estudos e pacientes locais para o Supabase (upsert). */
export async function pushToSupabase(data: AppData): Promise<SyncResult> {
  const sb = getSupabase()
  if (!sb) throw new Error('Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.')

  const studiesPayload = data.studies.map(studyToRow)
  const patientsPayload = data.patients.map(patientToRow)

  if (studiesPayload.length) {
    const { error } = await sb.from('irc_studies').upsert(studiesPayload)
    if (error) throw new Error(`Estudos: ${error.message}`)
  }
  if (patientsPayload.length) {
    const { error } = await sb.from('irc_patients').upsert(patientsPayload)
    if (error) throw new Error(`Pacientes: ${error.message}`)
  }

  return {
    studiesUpserted: studiesPayload.length,
    patientsUpserted: patientsPayload.length,
  }
}

/** Baixa tudo do Supabase e devolve AppData. */
export async function pullFromSupabase(): Promise<AppData> {
  const sb = getSupabase()
  if (!sb) throw new Error('Supabase não configurado.')

  const studiesRes = await sb.from('irc_studies').select('*').order('created_at', {
    ascending: false,
  })
  if (studiesRes.error) throw new Error(studiesRes.error.message)

  const patientsRes = await sb.from('irc_patients').select('*').order('created_at', {
    ascending: false,
  })
  if (patientsRes.error) throw new Error(patientsRes.error.message)

  return {
    version: 2,
    studies: (studiesRes.data ?? []).map(rowToStudy),
    patients: (patientsRes.data ?? []).map(rowToPatient),
  }
}

function studyToRow(study: Study) {
  return {
    id: study.id,
    title: study.title,
    objective: study.objective,
    region: study.region,
    template: study.template,
    kind: study.kind,
    idea: study.idea,
    blueprint: study.blueprint ?? null,
    status: study.status,
    created_at: study.createdAt,
    updated_at: study.updatedAt,
  }
}

function patientToRow(patient: Patient) {
  return {
    id: patient.id,
    study_id: patient.studyId,
    name: patient.name,
    age: patient.age,
    sex: patient.sex,
    creatinine_mg_dl: patient.creatinineMgDl,
    egfr: patient.egfr,
    ckd_stage: patient.ckdStage,
    has_ckd: patient.hasCkd,
    underlying_disease: patient.underlyingDisease,
    on_statin: patient.onStatin,
    notes: patient.notes,
    created_at: patient.createdAt,
    updated_at: patient.updatedAt,
  }
}

function rowToStudy(row: Record<string, unknown>): Study {
  return {
    id: String(row.id),
    title: String(row.title ?? ''),
    objective: String(row.objective ?? ''),
    region: String(row.region ?? 'IRC'),
    template: (row.template as Study['template']) ?? 'general',
    kind: (row.kind as Study['kind']) ?? 'cross_sectional',
    idea: String(row.idea ?? ''),
    blueprint: (row.blueprint as Study['blueprint']) ?? undefined,
    status: (row.status as Study['status']) ?? 'active',
    createdAt: String(row.created_at ?? new Date().toISOString()),
    updatedAt: String(row.updated_at ?? new Date().toISOString()),
  }
}

function rowToPatient(row: Record<string, unknown>): Patient {
  return {
    id: String(row.id),
    studyId: String(row.study_id),
    name: String(row.name ?? ''),
    age: Number(row.age ?? 0),
    sex: row.sex === 'M' ? 'M' : 'F',
    creatinineMgDl: Number(row.creatinine_mg_dl ?? 0),
    egfr: Number(row.egfr ?? 0),
    ckdStage: row.ckd_stage as Patient['ckdStage'],
    hasCkd: Boolean(row.has_ckd),
    underlyingDisease: row.underlying_disease as Patient['underlyingDisease'],
    onStatin: Boolean(row.on_statin),
    notes: String(row.notes ?? ''),
    createdAt: String(row.created_at ?? new Date().toISOString()),
    updatedAt: String(row.updated_at ?? new Date().toISOString()),
  }
}
