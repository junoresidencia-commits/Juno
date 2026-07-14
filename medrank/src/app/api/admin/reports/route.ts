import { NextResponse } from 'next/server';
import type { SupabaseClient } from '@supabase/supabase-js';
import { requireAdminApi } from '@/lib/api-auth';
import { getPeriodBounds, PERIOD_OPTIONS } from '@/lib/periods';
import type { PeriodType } from '@/types/database';
import {
  fetchQuestionErrors,
  fetchRankingReport,
  fetchStudentPerformance,
  fetchTopicStats,
} from '@/lib/reports/data';
import { generateExcelBuffer } from '@/lib/reports/excel';
import { generatePdfBuffer } from '@/lib/reports/pdf';

async function buildReportData(supabase: SupabaseClient, period: PeriodType) {
  const bounds = getPeriodBounds(period);
  const [students, topics, questions, ranking] = await Promise.all([
    fetchStudentPerformance(supabase),
    fetchTopicStats(supabase),
    fetchQuestionErrors(supabase),
    fetchRankingReport(supabase, bounds.type, bounds.start),
  ]);

  const periodLabel = PERIOD_OPTIONS.find((p) => p.value === period)?.label ?? period;

  return {
    students,
    topics,
    questions,
    ranking,
    generatedAt: new Date().toLocaleString('pt-BR'),
    periodLabel,
  };
}

export async function GET(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') ?? 'excel';
  const period = (searchParams.get('period') ?? 'weekly') as PeriodType;

  if (!['daily', 'weekly', 'monthly', 'general'].includes(period)) {
    return NextResponse.json({ error: 'Período inválido' }, { status: 400 });
  }

  if (auth.demo) {
    return NextResponse.json(
      { error: 'Relatórios com banco requerem Supabase configurado' },
      { status: 503 }
    );
  }

  const data = await buildReportData(auth.supabase, period);
  const dateStr = new Date().toISOString().split('T')[0];

  if (format === 'pdf') {
    const buffer = generatePdfBuffer(data);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="medrank-relatorio-${period}-${dateStr}.pdf"`,
      },
    });
  }

  const buffer = generateExcelBuffer(data);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="medrank-relatorio-${period}-${dateStr}.xlsx"`,
    },
  });
}
