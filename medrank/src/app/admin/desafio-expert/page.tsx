import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { WeeklyExpertForm } from '@/components/admin/WeeklyExpertForm';
import {
  WEEKLY_EXPERT_QUESTION_COUNT,
  WEEKLY_EXPERT_SCORE_MULTIPLIER,
  WEEKLY_EXPERT_WINDOW_START_HOUR,
} from '@/lib/exams/weekly-expert';

export default async function DesafioExpertPage() {
  await requireRole('admin');

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">
        ← Painel
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Desafio Expert</h1>
      <p className="mt-1 text-sm text-slate-600">
        {WEEKLY_EXPERT_QUESTION_COUNT} casos clínicos difíceis que você cria · 1 dia na semana ·
        abre às {WEEKLY_EXPERT_WINDOW_START_HOUR}h · acerto vale ×{WEEKLY_EXPERT_SCORE_MULTIPLIER} no
        ranking
      </p>
      <div className="mt-6">
        <WeeklyExpertForm />
      </div>
    </div>
  );
}
