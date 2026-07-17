export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function formatPercent(value: number | null | undefined): string {
  if (value == null) return '0%';
  return `${Number(value).toFixed(1)}%`;
}

export function formatDateBR(date: string): string {
  const [y, m, d] = date.split('-');
  return `${d}/${m}/${y}`;
}

export const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E'] as const;

export const DIFFICULTY_LABELS: Record<string, string> = {
  facil: 'Fácil',
  medio: 'Médio',
  dificil: 'Difícil',
};

export const SOURCE_OPTIONS = [
  'ENARE',
  'Revalida',
  'MedRank',
  'USP',
  'USP-RP',
  'UNIFESP',
  'UNICAMP',
  'SUS-SP',
  'PSU-MG',
  'AMP',
  'SES-PE',
  'HCPA',
  'UFRGS',
  'UFMG',
  'UFPR',
  'SBN',
  'SBNPed',
  'Outra',
];
