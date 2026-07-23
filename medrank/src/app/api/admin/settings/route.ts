import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';

const DEFAULT_AI = {
  enabled: false,
  daily_budget_usd: 0,
  monthly_budget_usd: 0,
  require_confirm: true,
};

export async function GET() {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  if (usesDemoStore()) {
    return NextResponse.json({ ai_paid: DEFAULT_AI });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ ai_paid: DEFAULT_AI, warning: 'service role ausente' });
  }

  const { data, error } = await admin
    .from('app_settings')
    .select('value')
    .eq('key', 'ai_paid')
    .maybeSingle();

  if (error) {
    return NextResponse.json({
      ai_paid: DEFAULT_AI,
      warning: error.message,
      hint: 'Aplique migration 031',
    });
  }

  return NextResponse.json({
    ai_paid: { ...DEFAULT_AI, ...(data?.value as object | null) },
  });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  if (usesDemoStore() || auth.demo) {
    return NextResponse.json({ error: 'Indisponivel no demo' }, { status: 501 });
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessaria' }, { status: 503 });

  const body = (await request.json().catch(() => null)) as {
    enabled?: boolean;
    daily_budget_usd?: number;
    monthly_budget_usd?: number;
    require_confirm?: boolean;
    confirm_cost?: boolean;
  } | null;

  if (body?.enabled === true && body.confirm_cost !== true) {
    return NextResponse.json(
      {
        error:
          'Ativar IA paga exige confirm_cost=true. Estimativa: regenerar 2 disputas com revisao pode custar de centavos a alguns dolares por dia.',
        estimate_usd_per_day: { min: 0.5, max: 5 },
      },
      { status: 400 }
    );
  }

  const userId =
    'supabase' in auth && auth.supabase
      ? (await auth.supabase.auth.getUser()).data.user?.id ?? null
      : null;
  const value = {
    enabled: Boolean(body?.enabled),
    daily_budget_usd: Number(body?.daily_budget_usd ?? 0),
    monthly_budget_usd: Number(body?.monthly_budget_usd ?? 0),
    require_confirm: body?.require_confirm !== false,
  };

  const { error } = await admin.from('app_settings').upsert({
    key: 'ai_paid',
    value,
    updated_at: new Date().toISOString(),
    updated_by: userId,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message, hint: 'Aplique migration 031_question_bank_provenance.sql' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, ai_paid: value });
}
