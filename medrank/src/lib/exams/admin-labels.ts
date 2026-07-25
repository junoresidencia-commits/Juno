/** Labels curtos para o painel do professor (sem jargão de pipeline). */

export function shortExamLabel(title: string, audience?: string | null): string {
  const cleaned = title
    .replace(/^Disputa do dia\s*·\s*/i, '')
    .replace(/\s*·\s*\d{1,2}\/\d{1,2}(\/\d{2,4})?$/i, '')
    .trim();
  if (cleaned) return cleaned;
  if (audience === 'nephrology') return 'Nefrologia';
  return 'Residência Geral';
}

export function qualityStatusLabel(status?: string | null): string {
  switch (status) {
    case 'passed':
    case 'approved_override':
      return 'Pronta';
    case 'warning':
      return 'Atenção';
    case 'blocked':
      return 'Bloqueada';
    case 'pending':
      return 'Verificando';
    default:
      return '—';
  }
}

export function qualityStatusTone(status?: string | null): string {
  switch (status) {
    case 'passed':
    case 'approved_override':
      return 'bg-emerald-100 text-emerald-900';
    case 'warning':
      return 'bg-amber-100 text-amber-950';
    case 'blocked':
      return 'bg-red-100 text-red-900';
    case 'pending':
      return 'bg-slate-100 text-slate-700';
    default:
      return 'bg-slate-100 text-slate-600';
  }
}

/** Uma linha humana a partir do resumo técnico da IA. */
export function friendlyQualitySummary(
  status?: string | null,
  summary?: string | null
): string {
  if (status === 'passed' || status === 'approved_override') {
    if (summary && /20\/20|aprovad/i.test(summary)) {
      return '20 questões ok — pode liberar para os alunos.';
    }
    return status === 'approved_override'
      ? 'Liberada manualmente pelo professor.'
      : 'Prova pronta.';
  }
  if (status === 'blocked') {
    return 'Há problemas nas questões — revise ou libere manualmente.';
  }
  if (status === 'warning') {
    return 'Passou com avisos — confira se quiser.';
  }
  if (status === 'pending') {
    return 'Aguardando revisão automática.';
  }
  return summary?.split('\n')[0]?.slice(0, 120) || 'Sem status de qualidade.';
}
