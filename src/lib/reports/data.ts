import type { SupabaseClient } from '@supabase/supabase-js';

export interface StudentPerformanceRow {
  name: string;
  email: string;
  provas: number;
  acertos: number;
  questoes: number;
  mediaPercentual: number;
  tempoMedioSeg: number;
  pontuacao: number;
}

export interface TopicStatRow {
  tema: string;
  total: number;
  acertos: number;
  erros: number;
  taxaErro: number;
}

export interface QuestionErrorRow {
  id: string;
  enunciado: string;
  tema: string;
  origem: string;
  totalRespostas: number;
  erros: number;
  taxaErro: number;
}

export interface RankingReportRow {
  posicao: number;
  nome: string;
  acertos: number;
  questoes: number;
  mediaPercentual: number;
  tempoTotalSeg: number;
  pontuacao: number;
  streak: number;
}

export async function fetchStudentPerformance(
  supabase: SupabaseClient
): Promise<StudentPerformanceRow[]> {
  const { data: students } = await supabase
    .from('profiles')
    .select('id, name, email')
    .eq('role', 'student')
    .order('name');

  const { data: attempts } = await supabase
    .from('attempts')
    .select('user_id, total_correct, total_questions, percentage, duration_seconds, score')
    .not('finished_at', 'is', null);

  return (students ?? []).map((s) => {
    const userAttempts = (attempts ?? []).filter((a) => a.user_id === s.id);
    const provas = userAttempts.length;
    const acertos = userAttempts.reduce((sum, a) => sum + (a.total_correct ?? 0), 0);
    const questoes = userAttempts.reduce((sum, a) => sum + (a.total_questions ?? 0), 0);
    const mediaPercentual = provas > 0
      ? userAttempts.reduce((sum, a) => sum + Number(a.percentage ?? 0), 0) / provas
      : 0;
    const tempoMedioSeg = provas > 0
      ? userAttempts.reduce((sum, a) => sum + (a.duration_seconds ?? 0), 0) / provas
      : 0;
    const pontuacao = userAttempts.reduce((sum, a) => sum + Number(a.score ?? 0), 0);

    return {
      name: s.name,
      email: s.email,
      provas,
      acertos,
      questoes,
      mediaPercentual: Math.round(mediaPercentual * 10) / 10,
      tempoMedioSeg: Math.round(tempoMedioSeg),
      pontuacao: Math.round(pontuacao * 100) / 100,
    };
  });
}

export async function fetchTopicStats(supabase: SupabaseClient): Promise<TopicStatRow[]> {
  const { data: answers } = await supabase
    .from('attempt_answers')
    .select('is_correct, questions(topic)')
    .not('is_correct', 'is', null);

  const byTopic: Record<string, { total: number; acertos: number }> = {};

  for (const a of answers ?? []) {
    const q = a.questions as unknown as { topic: string | null };
    const tema = q?.topic ?? 'Sem tema';
    if (!byTopic[tema]) byTopic[tema] = { total: 0, acertos: 0 };
    byTopic[tema].total++;
    if (a.is_correct) byTopic[tema].acertos++;
  }

  return Object.entries(byTopic)
    .map(([tema, stats]) => ({
      tema,
      total: stats.total,
      acertos: stats.acertos,
      erros: stats.total - stats.acertos,
      taxaErro: stats.total > 0
        ? Math.round(((stats.total - stats.acertos) / stats.total) * 1000) / 10
        : 0,
    }))
    .sort((a, b) => b.taxaErro - a.taxaErro);
}

export async function fetchQuestionErrors(
  supabase: SupabaseClient,
  limit = 20
): Promise<QuestionErrorRow[]> {
  const { data: answers } = await supabase
    .from('attempt_answers')
    .select('is_correct, question_id, questions(id, statement, topic, source)')
    .not('is_correct', 'is', null);

  const byQuestion: Record<string, QuestionErrorRow & { _total: number; _erros: number }> = {};

  for (const a of answers ?? []) {
    const q = a.questions as unknown as {
      id: string;
      statement: string;
      topic: string | null;
      source: string | null;
    };
    if (!q?.id) continue;

    if (!byQuestion[q.id]) {
      byQuestion[q.id] = {
        id: q.id,
        enunciado: q.statement.slice(0, 120) + (q.statement.length > 120 ? '...' : ''),
        tema: q.topic ?? 'Sem tema',
        origem: q.source ?? '-',
        totalRespostas: 0,
        erros: 0,
        taxaErro: 0,
        _total: 0,
        _erros: 0,
      };
    }
    byQuestion[q.id]._total++;
    if (!a.is_correct) byQuestion[q.id]._erros++;
  }

  return Object.values(byQuestion)
    .map((q) => ({
      id: q.id,
      enunciado: q.enunciado,
      tema: q.tema,
      origem: q.origem,
      totalRespostas: q._total,
      erros: q._erros,
      taxaErro: q._total > 0 ? Math.round((q._erros / q._total) * 1000) / 10 : 0,
    }))
    .filter((q) => q.totalRespostas > 0)
    .sort((a, b) => b.taxaErro - a.taxaErro || b.erros - a.erros)
    .slice(0, limit);
}

export async function fetchRankingReport(
  supabase: SupabaseClient,
  periodType: string,
  periodStart: string
): Promise<RankingReportRow[]> {
  const { data } = await supabase
    .from('rankings')
    .select('position, total_correct, total_questions, average_percentage, total_time_seconds, total_score, streak_days, profiles(name)')
    .eq('period_type', periodType)
    .eq('period_start', periodStart)
    .order('position', { ascending: true });

  return (data ?? []).map((r) => {
    const profileData = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
    return {
      posicao: r.position ?? 0,
      nome: (profileData as { name?: string } | null)?.name ?? 'Aluno',
      acertos: r.total_correct ?? 0,
      questoes: r.total_questions ?? 0,
      mediaPercentual: Number(r.average_percentage ?? 0),
      tempoTotalSeg: r.total_time_seconds ?? 0,
      pontuacao: Number(r.total_score ?? 0),
      streak: r.streak_days ?? 0,
    };
  });
}
