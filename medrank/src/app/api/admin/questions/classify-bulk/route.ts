import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import type { Question } from '@/types/database';
import {
  bankStatusForClassify,
  classifyQuestionQuality,
} from '@/lib/question-bank/quality-classify';

export const maxDuration = 300;

/**
 * Varre o banco, classifica qualidade e suspende sintéticas/ruins.
 * body: { limit?: number, dryRun?: boolean, onlySynthetic?: boolean }
 */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  if (usesDemoStore() || auth.demo) {
    return NextResponse.json({ error: 'Indisponível no demo' }, { status: 501 });
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });

  const body = (await request.json().catch(() => ({}))) as {
    limit?: number;
    dryRun?: boolean;
    onlySynthetic?: boolean;
  };
  const limit = Math.min(Math.max(Number(body.limit) || 5000, 100), 15000);
  const dryRun = Boolean(body.dryRun);

  const pageSize = 1000;
  const all: Question[] = [];
  for (let page = 0; page < Math.ceil(limit / pageSize); page++) {
    const from = page * pageSize;
    const to = Math.min(from + pageSize - 1, limit - 1);
    const { data, error } = await admin.from('questions').select('*').range(from, to);
    if (error) {
      return NextResponse.json(
        { error: error.message, hint: 'Aplique migration 032 se faltar quality_label' },
        { status: 500 }
      );
    }
    all.push(...((data ?? []) as Question[]));
    if ((data?.length ?? 0) < pageSize) break;
  }

  const summary: Record<string, number> = {};
  let suspended = 0;
  let approved = 0;
  let updated = 0;
  const samples: { id: string; label: string; suspend: boolean; notes: string }[] = [];

  const userId =
    'supabase' in auth && auth.supabase
      ? (await auth.supabase.auth.getUser()).data.user?.id ?? null
      : null;

  for (const q of all) {
    const result = classifyQuestionQuality(q);
    if (body.onlySynthetic && result.quality_label === 'aprovada' && !result.suspend) {
      continue;
    }

    summary[result.quality_label] = (summary[result.quality_label] || 0) + 1;
    const newStatus = bankStatusForClassify(result, q.bank_status);
    if (result.suspend || newStatus === 'disabled') suspended += 1;
    if (result.quality_label === 'aprovada' && newStatus === 'approved') approved += 1;

    if (samples.length < 25) {
      samples.push({
        id: q.id,
        label: result.quality_label,
        suspend: result.suspend,
        notes: result.notes.slice(0, 160),
      });
    }

    if (dryRun) continue;

    const patch = {
      quality_label: result.quality_label,
      quality_notes: result.notes,
      bank_status: newStatus,
      quality_reviewed_at: new Date().toISOString(),
      quality_reviewed_by: userId,
    };

    const { error } = await admin.from('questions').update(patch).eq('id', q.id);
    if (!error) {
      updated += 1;
      await admin.from('question_bank_audit_log').insert({
        question_id: q.id,
        action: 'bulk_classify',
        old_bank_status: q.bank_status ?? null,
        new_bank_status: newStatus,
        old_quality_label: q.quality_label ?? null,
        new_quality_label: result.quality_label,
        reason: 'Classificação em lote — priorizar provas oficiais; suspender sintéticas ruins',
        admin_id: userId,
        meta: { codes: result.codes, suspend: result.suspend },
      });
    }
  }

  return NextResponse.json({
    ok: true,
    dryRun,
    scanned: all.length,
    updated,
    suspended,
    approved,
    summary,
    samples,
    message: dryRun
      ? 'Simulação — nada gravado. Rode de novo com dryRun=false após migration 032.'
      : `Classificadas ${updated}. Suspensas/desativadas ~${suspended}. Aprovadas ${approved}.`,
  });
}
