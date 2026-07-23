import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import { needsOptionPolish, polishQuestionOptions } from '@/lib/question-bank/polish-options';
import type { Question } from '@/types/database';

/**
 * Corrige no banco (Supabase) questões com alternativas desbalanceadas /
 * gabarito óbvio por tamanho. Não altera pontuações de provas já feitas —
 * para isso use Remediação na prova.
 */
export async function POST(request: Request) {
  const session = await getSessionProfile();
  if (!session || session.profile.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  if (usesDemoStore()) {
    return NextResponse.json(
      { error: 'Correção em massa exige Supabase de produção (não disponível no demo).' },
      { status: 501 }
    );
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Service role indisponível' }, { status: 500 });
  }

  const body = (await request.json().catch(() => ({}))) as { limit?: number };
  const limit = Math.min(3000, Math.max(50, Number(body.limit) || 1500));

  const { data, error } = await admin
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const questions = (data ?? []) as Question[];
  const toFix = questions.filter(needsOptionPolish);
  let updated = 0;
  const errors: string[] = [];

  for (let i = 0; i < toFix.length; i += 80) {
    const chunk = toFix.slice(i, i + 80).map((q) => {
      const polished = polishQuestionOptions(q);
      return {
        id: polished.id,
        option_a: polished.option_a,
        option_b: polished.option_b,
        option_c: polished.option_c,
        option_d: polished.option_d,
        option_e: polished.option_e ?? '',
        correct_option: polished.correct_option,
        explanation: polished.explanation,
      };
    });

    const { error: upErr } = await admin.from('questions').upsert(chunk, { onConflict: 'id' });
    if (upErr) errors.push(`Lote ${i / 80 + 1}: ${upErr.message}`);
    else updated += chunk.length;
  }

  return NextResponse.json({
    ok: errors.length === 0,
    scanned: questions.length,
    neededFix: toFix.length,
    updated,
    errors,
    note:
      'Opções reequilibradas no banco. Reimporte o banco expert se ainda faltar volume; use Remediação se alguma questão já pontuou na disputa.',
  });
}
