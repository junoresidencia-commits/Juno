import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import { forfeitDemoAttempt } from '@/lib/demo/runtime';
import {
  clientIpFromHeaders,
  isViolationType,
  parseUserAgent,
  type ViolationType,
} from '@/lib/exams/anti-fraud';

type ForfeitBody = {
  violationType?: string;
  questionId?: string | null;
  elapsedSeconds?: number | null;
  device?: string | null;
  browser?: string | null;
  os?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, unknown>;
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const { attemptId } = await params;

  let body: ForfeitBody = {};
  const contentType = request.headers.get('content-type') || '';
  try {
    if (contentType.includes('application/json')) {
      body = (await request.json()) as ForfeitBody;
    } else {
      const text = await request.text();
      if (text) body = JSON.parse(text) as ForfeitBody;
    }
  } catch {
    body = {};
  }

  const violationType: ViolationType = isViolationType(body.violationType ?? '')
    ? (body.violationType as ViolationType)
    : 'other';

  const uaHeader = request.headers.get('user-agent') || body.userAgent || '';
  const parsedUa = parseUserAgent(uaHeader);
  const ip = clientIpFromHeaders(request.headers);
  const device = body.device || parsedUa.device;
  const browser = body.browser || parsedUa.browser;
  const os = body.os || parsedUa.os;
  const userAgent = body.userAgent || uaHeader;
  const elapsedSeconds =
    typeof body.elapsedSeconds === 'number' && Number.isFinite(body.elapsedSeconds)
      ? Math.max(0, Math.floor(body.elapsedSeconds))
      : null;
  const questionId = body.questionId || null;
  const metadata = body.metadata ?? {};

  if (usesDemoStore()) {
    try {
      const data = forfeitDemoAttempt(attemptId, {
        violationType,
        questionId,
        elapsedSeconds,
        ip,
        device,
        browser,
        os,
        userAgent,
        metadata,
      });
      return NextResponse.json({ ...data, forfeited: true, violation_type: violationType });
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Erro' },
        { status: 400 }
      );
    }
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const rpcArgs = {
    p_attempt_id: attemptId,
    p_violation_type: violationType,
    p_question_id: questionId,
    p_elapsed_seconds: elapsedSeconds,
    p_ip: ip,
    p_device: device,
    p_browser: browser,
    p_os: os,
    p_user_agent: userAgent,
    p_metadata: metadata,
  };

  let { data, error } = await supabase.rpc('forfeit_attempt', rpcArgs);

  if (error) {
    const admin = createAdminClient();
    if (admin) {
      const owned = await admin
        .from('attempts')
        .select('id')
        .eq('id', attemptId)
        .eq('user_id', user.id)
        .maybeSingle();
      if (owned.data) {
        const retry = await admin.rpc('forfeit_attempt', rpcArgs);
        data = retry.data;
        error = retry.error;
      }
    }
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
