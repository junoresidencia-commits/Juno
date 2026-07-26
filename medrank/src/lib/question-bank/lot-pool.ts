import type { SupabaseClient } from '@supabase/supabase-js';
import type { Question } from '@/types/database';

/** Colunas enxutas para montar disputa (sem select('*')). */
export const DAILY_POOL_COLUMNS =
  'id, statement, option_a, option_b, option_c, option_d, option_e, correct_option, explanation, source, year, specialty, topic, subtopic, difficulty, tags, bank_status, question_origin, institution, exam_name, lote_importacao, area, created_at';

/** Especialidades dos lotes MedRank usadas na Residência Geral. */
export const GENERAL_RESIDENCY_SPECIALTIES = [
  'Clínica Médica',
  'Pediatria',
  'Cirurgia',
  'Ginecologia e Obstetrícia',
  'Medicina Preventiva',
  'Ortopedia',
  'Psiquiatria',
  'Anestesiologia',
  'Radiologia',
  'Medicina de Família',
] as const;

export const NEFRO_ADULT_SPECIALTY = 'Nefrologia';
export const NEFRO_PED_SPECIALTY = 'Nefropediatria';

/** Aliases de especialidade usados em imports (ex.: "Nefrologia Pediátrica"). */
export const NEFRO_SPECIALTY_ALIASES: Record<
  'Nefrologia' | 'Nefropediatria',
  string[]
> = {
  Nefrologia: ['Nefrologia'],
  Nefropediatria: ['Nefropediatria', 'Nefrologia Pediátrica', 'Nefrologia Pediatrica'],
};

const LOT_OR =
  'lote_importacao.like.MEDRANK_AUTORAL_2026_LOTE_%,lote_importacao.like.MEDRANK_NEFRO_NEFROPED_2026_LOTE_%,lote_importacao.like.MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_%';

type Admin = SupabaseClient;

function asQuestions(data: unknown): Question[] {
  return (data ?? []) as unknown as Question[];
}

/**
 * Questões aprovadas dos lotes MedRank filtradas por especialidade
 * (ex.: Clínica Médica, Nefrologia, Nefropediatria).
 */
export async function fetchApprovedLotsBySpecialty(
  admin: Admin,
  specialties: string[],
  opts?: { onlyNefroLots?: boolean; maxPages?: number }
): Promise<Question[]> {
  const byId = new Map<string, Question>();
  const pageSize = 500;
  const maxPages = opts?.maxPages ?? 6;

  for (const specialty of specialties) {
    for (let page = 0; page < maxPages; page++) {
      const from = page * pageSize;
      const to = from + pageSize - 1;
      let query = admin
        .from('questions')
        .select(DAILY_POOL_COLUMNS)
        .eq('bank_status', 'approved')
        .ilike('specialty', specialty);

      if (opts?.onlyNefroLots) {
        query = query.like('lote_importacao', 'MEDRANK_NEFRO_NEFROPED_2026_LOTE_%');
      } else {
        query = query.or(LOT_OR);
      }

      const { data, error } = await query.range(from, to);
      if (error) {
        // Schema antigo / coluna ausente: tenta sem bank_status
        if (/bank_status|schema cache/i.test(error.message)) {
          let retry = admin
            .from('questions')
            .select(DAILY_POOL_COLUMNS.replace(', bank_status', ''))
            .ilike('specialty', specialty);
          if (opts?.onlyNefroLots) {
            retry = retry.like('lote_importacao', 'MEDRANK_NEFRO_NEFROPED_2026_LOTE_%');
          } else {
            retry = retry.or(LOT_OR);
          }
          const r = await retry.range(from, to);
          if (r.error) break;
          const rows = asQuestions(r.data);
          for (const q of rows) byId.set(q.id, q);
          if (rows.length < pageSize) break;
          continue;
        }
        break;
      }
      const rows = asQuestions(data);
      for (const q of rows) byId.set(q.id, q);
      if (rows.length < pageSize) break;
    }
  }

  return [...byId.values()];
}

/** Todos os lotes MedRank de residência (autoral + diretrizes), aprovados. */
export async function fetchApprovedGeneralLots(admin: Admin): Promise<Question[]> {
  const byId = new Map<string, Question>();

  // Preferência: especialidades clássicas da residência nos lotes
  const bySpecialty = await fetchApprovedLotsBySpecialty(admin, [
    ...GENERAL_RESIDENCY_SPECIALTIES,
  ]);
  for (const q of bySpecialty) byId.set(q.id, q);

  // Também inclui lotes AUTORAL + DIRETRIZES inteiros (pode haver specialty varia)
  for (const prefix of [
    'MEDRANK_AUTORAL_2026_LOTE_',
    'MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_',
  ] as const) {
    for (let page = 0; page < 6; page++) {
      const from = page * 500;
      const to = from + 499;
      const { data, error } = await admin
        .from('questions')
        .select(DAILY_POOL_COLUMNS)
        .eq('bank_status', 'approved')
        .like('lote_importacao', `${prefix}%`)
        .range(from, to);
      if (error) break;
      const rows = asQuestions(data);
      for (const q of rows) byId.set(q.id, q);
      if (rows.length < 500) break;
    }
  }

  return [...byId.values()];
}

/** Lotes Nefro/Nefroped por especialidade (busca principal da disputa Nefro). */
export async function fetchApprovedNefroLotsBySpecialty(
  admin: Admin,
  specialty: 'Nefrologia' | 'Nefropediatria'
): Promise<Question[]> {
  const aliases = NEFRO_SPECIALTY_ALIASES[specialty] ?? [specialty];
  // Preferir Banco Nefro (1000) + demais lotes NEFRO_NEFROPED
  return fetchApprovedLotsBySpecialty(admin, aliases, {
    onlyNefroLots: true,
    maxPages: 8,
  });
}

/** Contagem por especialidade nos lotes aprovados (painel admin). */
export async function countApprovedLotsBySpecialty(
  admin: Admin
): Promise<{ specialty: string; count: number }[]> {
  const specs = [
    ...GENERAL_RESIDENCY_SPECIALTIES,
    NEFRO_ADULT_SPECIALTY,
    NEFRO_PED_SPECIALTY,
  ];
  const results = await Promise.all(
    specs.map(async (specialty) => {
      const { count, error } = await admin
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('bank_status', 'approved')
        .or(LOT_OR)
        .ilike('specialty', specialty);
      return { specialty, count: error ? 0 : count ?? 0 };
    })
  );
  return results.filter((r) => r.count > 0).sort((a, b) => b.count - a.count);
}
