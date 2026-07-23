import { createAdminClient } from '@/lib/supabase/admin';
import { todayDateStringBrazil } from '@/lib/exams/window';

export type DayHealthExam = {
  id: string;
  title: string;
  audience: string;
  status: string;
  quality_status: string | null;
  quality_summary: string | null;
  questionCount: number;
  finishedCount: number;
  forfeitedCount: number;
  sampleStems: string[];
};

export type DayHealthReport = {
  date: string;
  openaiConfigured: boolean;
  exams: DayHealthExam[];
  ok: boolean;
  issues: string[];
};

/** Saúde das disputas de hoje — para o painel do professor. */
export async function getDayHealthReport(
  dateStr = todayDateStringBrazil()
): Promise<DayHealthReport> {
  const issues: string[] = [];
  const openaiConfigured = Boolean(process.env.OPENAI_API_KEY?.trim());
  if (!openaiConfigured) {
    issues.push('OPENAI_API_KEY não configurada — revisão IA obrigatória falhará ao gerar.');
  }

  const admin = createAdminClient();
  if (!admin) {
    return {
      date: dateStr,
      openaiConfigured,
      exams: [],
      ok: false,
      issues: [...issues, 'SUPABASE_SERVICE_ROLE_KEY ausente — não dá para auditar o dia.'],
    };
  }

  const { data: exams } = await admin
    .from('exams')
    .select('id, title, audience, status, quality_status, quality_summary, total_questions')
    .eq('date_available', dateStr)
    .eq('exam_kind', 'daily')
    .order('audience');

  const reportExams: DayHealthExam[] = [];

  for (const exam of exams ?? []) {
    const { count: questionCount } = await admin
      .from('exam_questions')
      .select('*', { count: 'exact', head: true })
      .eq('exam_id', exam.id);

    const { count: finishedCount } = await admin
      .from('attempts')
      .select('*', { count: 'exact', head: true })
      .eq('exam_id', exam.id)
      .not('finished_at', 'is', null);

    const { count: forfeitedCount } = await admin
      .from('attempts')
      .select('*', { count: 'exact', head: true })
      .eq('exam_id', exam.id)
      .eq('forfeited', true);

    const { data: eqs } = await admin
      .from('exam_questions')
      .select('order_number, questions(statement)')
      .eq('exam_id', exam.id)
      .order('order_number')
      .limit(3);

    const sampleStems = (eqs ?? [])
      .map((row) => {
        const q = row.questions as unknown as { statement?: string } | { statement?: string }[] | null;
        const stmt = Array.isArray(q) ? q[0]?.statement : q?.statement;
        return String(stmt || '').replace(/\s+/g, ' ').slice(0, 140);
      })
      .filter(Boolean);

    const qCount = questionCount ?? 0;
    if (exam.status !== 'published') {
      issues.push(`${exam.title}: status=${exam.status} (não publicada).`);
    }
    if (exam.quality_status === 'blocked' || exam.quality_status === 'pending') {
      issues.push(
        `${exam.title}: qualidade=${exam.quality_status}${
          exam.quality_summary ? ` — ${exam.quality_summary.slice(0, 80)}` : ''
        }`
      );
    }
    if (qCount === 0) {
      issues.push(`${exam.title}: 0 questões vinculadas (tela em branco para o aluno).`);
    } else if (qCount < (exam.total_questions || 20)) {
      issues.push(`${exam.title}: só ${qCount}/${exam.total_questions} questões.`);
    }

    reportExams.push({
      id: exam.id,
      title: exam.title,
      audience: (exam as { audience?: string }).audience ?? 'general',
      status: exam.status,
      quality_status: (exam as { quality_status?: string }).quality_status ?? null,
      quality_summary: (exam as { quality_summary?: string | null }).quality_summary ?? null,
      questionCount: qCount,
      finishedCount: finishedCount ?? 0,
      forfeitedCount: forfeitedCount ?? 0,
      sampleStems,
    });
  }

  if (reportExams.length === 0) {
    issues.push('Nenhuma disputa diária para hoje — use Gerar disputa de hoje.');
  }

  return {
    date: dateStr,
    openaiConfigured,
    exams: reportExams,
    ok: issues.length === 0,
    issues,
  };
}
