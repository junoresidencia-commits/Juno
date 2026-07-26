/**
 * Totais esperados nos arquivos do repositório (lotes 01–27).
 * Usado no painel para comparar com o que está publicado no Supabase.
 */
export const EXPECTED_LOT_TOTALS = {
  autoral: 550, // lotes 01–11
  nefro: 1400, // lotes 12–19 (400) + Banco Nefro (1000)
  diretrizes: 400, // lotes 20–27
  total: 2350,
  nefroAdult: 700, // 200 lotes + 500 Banco Nefro
  nefroPed: 700,
  clinicaMedica: 512,
} as const;
