/**
 * Totais esperados nos arquivos do repositório (lotes 01–27).
 * Usado no painel para comparar com o que está publicado no Supabase.
 */
export const EXPECTED_LOT_TOTALS = {
  autoral: 550, // lotes 01–11
  nefro: 400, // lotes 12–19 (200 Nefrologia + 200 Nefropediatria)
  diretrizes: 400, // lotes 20–27
  total: 1350,
  nefroAdult: 200,
  nefroPed: 200,
  clinicaMedica: 512,
} as const;
