import 'server-only';
import { createAdminClient } from '@/lib/supabase/admin';
import { getAppBaseUrl } from '@/lib/app-url';
import { isEmailSendingConfigured } from '@/lib/email/config';
import { sendEmailBatch, type OutboundEmail } from '@/lib/email/send';
import { usesDemoStore } from '@/lib/demo-data';
import {
  examWindowLabel,
  escapeHtml,
  formatDateBr,
  hasNephrologyTrack,
  listActiveStudentsWithEmail,
  type StudentRecipient,
} from '@/lib/email/shared';
import { getBrazilClock, getExamWindowPhase, todayDateStringBrazil } from '@/lib/exams/window';
import { getPeriodBounds } from '@/lib/periods';

export type NudgePhase = 'morning' | 'midday' | 'afternoon' | 'evening';

export type ExamNudgeResult = {
  phase: NudgePhase | null;
  emailed: number;
  inApp: number;
  recipients: number;
  skipped?: string;
  error?: string;
};

type TodayExam = {
  id: string;
  title: string;
  audience: 'general' | 'nephrology';
};

type RankTease = {
  line: string;
};

/** Horários (Brasília) em que mandamos o empurrão. */
export function resolveNudgePhase(now = new Date()): NudgePhase | null {
  const { hour } = getBrazilClock(now);
  if (hour === 9) return 'morning';
  if (hour === 13) return 'midday';
  if (hour === 17) return 'afternoon';
  if (hour === 19) return 'evening';
  return null;
}

function parsePhase(raw: string | null | undefined): NudgePhase | null {
  if (!raw) return null;
  const v = raw.trim().toLowerCase();
  if (v === 'morning' || v === 'midday' || v === 'afternoon' || v === 'evening') return v;
  return null;
}

function phaseCopy(phase: NudgePhase): {
  subject: string;
  headline: string;
  body: string;
  cta: string;
} {
  switch (phase) {
    case 'morning':
      return {
        subject: 'MedRank: a prova de hoje já está no ar — bora',
        headline: 'A disputa de hoje já está ativa',
        body: 'Não deixa pra depois. Abre agora, faz com calma e garante sua pontuação do dia.',
        cta: 'Fazer a prova agora',
      };
    case 'midday':
      return {
        subject: 'MedRank: ainda dá tempo — faça a de hoje',
        headline: 'Meio-dia e a prova continua aberta',
        body: 'Quem faz cedo joga com menos pressão. A janela segue até 21h — mas o ranking não espera.',
        cta: 'Entrar na disputa',
      };
    case 'afternoon':
      return {
        subject: 'MedRank: a tarde passa — prova de hoje ainda conta',
        headline: 'Ainda não fechou o dia?',
        body: 'Tem gente andando no placar. A de hoje ainda está aberta — e cada ponto conta na semana.',
        cta: 'Garantir meus pontos',
      };
    case 'evening':
      return {
        subject: 'MedRank: última chamada — fecha às 21h',
        headline: 'Última chamada de hoje',
        body: 'A janela fecha às 21h (Brasília). Depois disso, a disputa de hoje encerra. Entra agora.',
        cta: 'Fazer antes de acabar',
      };
  }
}

function pickRankTease(opts: {
  phase: NudgePhase;
  leaderScore: number | null;
  myScore: number | null;
  myPosition: number | null;
  finishedTodayCount: number;
}): RankTease | null {
  const { phase, leaderScore, myScore, myPosition, finishedTodayCount } = opts;

  const wantTease =
    phase === 'afternoon' ||
    phase === 'evening' ||
    (phase === 'midday' && finishedTodayCount > 0) ||
    (phase === 'morning' && finishedTodayCount >= 3);

  if (!wantTease) return null;

  if (myPosition === 1 && myScore != null) {
    return {
      line: `A liderança da semana está com você (${Math.round(myScore)} pts) — mas o dia ainda não acabou. Mantém o ritmo.`,
    };
  }

  if (myScore != null && leaderScore != null && leaderScore > myScore) {
    const gap = Math.round(leaderScore - myScore);
    return {
      line: `Faltam ${gap} pts para o 1º da semana (${Math.round(leaderScore)} pts). A de hoje ainda conta.`,
    };
  }

  if (leaderScore != null && leaderScore > 0) {
    const variants = [
      `No ranking da semana o 1º já soma ${Math.round(leaderScore)} pts. A de hoje ainda entra no placar.`,
      `O topo da semana está em ${Math.round(leaderScore)} pts. Quem faz hoje sobe; quem deixa, vê de longe.`,
      `Placar da semana: líder com ${Math.round(leaderScore)} pts. A disputa de hoje ainda está aberta.`,
    ];
    const idx = (getBrazilClock().hour + Math.floor(leaderScore)) % variants.length;
    return { line: variants[idx] };
  }

  if (finishedTodayCount > 0) {
    return {
      line: `${finishedTodayCount} aluno(s) já fecharam a de hoje. O placar está andando.`,
    };
  }

  return {
    line: 'Ainda dá pra abrir o placar de hoje. Quem fizer agora sai na frente.',
  };
}

async function loadTodayPublishedExams(date: string): Promise<TodayExam[]> {
  const admin = createAdminClient();
  if (!admin) return [];

  const { data, error } = await admin
    .from('exams')
    .select('id, title, audience, status')
    .eq('date_available', date)
    .eq('exam_kind', 'daily')
    .eq('status', 'published');

  if (error) {
    console.error('[exam-nudge] exams:', error.message);
    return [];
  }

  return (data ?? [])
    .filter((e) => e.audience === 'general' || e.audience === 'nephrology')
    .map((e) => ({
      id: String(e.id),
      title: String(e.title),
      audience: e.audience as 'general' | 'nephrology',
    }));
}

async function loadFinishedByUser(examIds: string[]): Promise<Map<string, Set<string>>> {
  const admin = createAdminClient();
  const done = new Map<string, Set<string>>();
  if (!admin || !examIds.length) return done;

  const { data, error } = await admin
    .from('attempts')
    .select('user_id, exam_id, finished_at, forfeited')
    .in('exam_id', examIds)
    .not('finished_at', 'is', null);

  if (error) {
    console.error('[exam-nudge] attempts:', error.message);
    return done;
  }

  for (const row of data ?? []) {
    if ((row as { forfeited?: boolean }).forfeited) continue;
    const uid = String(row.user_id);
    const set = done.get(uid) ?? new Set();
    set.add(String(row.exam_id));
    done.set(uid, set);
  }
  return done;
}

async function loadWeeklyRankContext(userIds: string[]): Promise<{
  leaderScore: number | null;
  byUser: Map<string, { score: number; position: number | null }>;
}> {
  const admin = createAdminClient();
  const byUser = new Map<string, { score: number; position: number | null }>();
  if (!admin) return { leaderScore: null, byUser };

  const today = todayDateStringBrazil();
  const [y, m, d] = today.split('-').map(Number);
  const anchor = new Date(Date.UTC(y, m - 1, d, 15));
  const week = getPeriodBounds('weekly', anchor);

  const { data, error } = await admin
    .from('rankings')
    .select('user_id, total_score, position')
    .eq('period_type', 'weekly')
    .eq('period_start', week.start)
    .order('total_score', { ascending: false })
    .limit(500);

  if (error) {
    if (!/rankings|schema cache/i.test(error.message)) {
      console.error('[exam-nudge] rankings:', error.message);
    }
    return { leaderScore: null, byUser };
  }

  const rows = data ?? [];
  const leaderScore = rows.length ? Number(rows[0].total_score) || 0 : null;
  const wanted = new Set(userIds);
  for (const row of rows) {
    const id = String(row.user_id);
    if (!wanted.has(id)) continue;
    byUser.set(id, {
      score: Number(row.total_score) || 0,
      position: row.position == null ? null : Number(row.position),
    });
  }

  return { leaderScore, byUser };
}

function buildNudgeEmail(opts: {
  student: StudentRecipient;
  phase: NudgePhase;
  dateLabel: string;
  exams: TodayExam[];
  tease: RankTease | null;
  homeUrl: string;
}): OutboundEmail {
  const copy = phaseCopy(opts.phase);
  const firstName = escapeHtml(opts.student.name.trim().split(/\s+/)[0] || 'aluno');
  const listHtml = opts.exams
    .map(
      (e) =>
        `<li><strong>${escapeHtml(e.title)}</strong>${
          e.audience === 'nephrology' ? ' (Nefrologia)' : ''
        }</li>`
    )
    .join('');

  const teaseHtml = opts.tease
    ? `<p style="margin-top:16px;padding:12px 14px;background:#ecfdf5;border-radius:10px;color:#065f46;"><strong>Placar:</strong> ${escapeHtml(opts.tease.line)}</p>`
    : '';

  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, sans-serif; line-height: 1.5; color: #0f172a;">
      <p>Olá, <strong>${firstName}</strong>!</p>
      <p><strong>${escapeHtml(copy.headline)}</strong> (${escapeHtml(opts.dateLabel)}).</p>
      <p>${escapeHtml(copy.body)}</p>
      <ul>${listHtml}</ul>
      <p>Janela: <strong>${examWindowLabel()}</strong> (Brasília).</p>
      ${teaseHtml}
      <p>
        <a href="${opts.homeUrl}" style="display:inline-block;background:#047857;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:600;">
          ${escapeHtml(copy.cta)}
        </a>
      </p>
      <p style="font-size:13px;color:#64748b;">MedRank não para — e o ranking também não.</p>
    </div>
  `.trim();

  const text = [
    `Olá, ${opts.student.name.trim().split(/\s+/)[0] || 'aluno'}!`,
    '',
    `${copy.headline} (${opts.dateLabel}).`,
    copy.body,
    ...opts.exams.map((e) => `- ${e.title}`),
    `Janela: ${examWindowLabel()} (Brasília).`,
    opts.tease ? `Placar: ${opts.tease.line}` : '',
    '',
    `${copy.cta}: ${opts.homeUrl}`,
    'MedRank não para — e o ranking também não.',
  ]
    .filter(Boolean)
    .join('\n');

  return {
    to: opts.student.email,
    subject: copy.subject,
    html,
    text,
  };
}

/**
 * Empurra alunos ativos (com e-mail) que ainda não fizeram a prova de hoje.
 * Toques de ranking sem humilhar — só estímulo e placar.
 */
export async function sendExamNudges(opts?: {
  phase?: NudgePhase | string | null;
  now?: Date;
}): Promise<ExamNudgeResult> {
  if (usesDemoStore()) {
    return { phase: null, emailed: 0, inApp: 0, recipients: 0, skipped: 'demo' };
  }

  const now = opts?.now ?? new Date();
  const phase =
    parsePhase(typeof opts?.phase === 'string' ? opts.phase : null) ?? resolveNudgePhase(now);

  if (!phase) {
    return {
      phase: null,
      emailed: 0,
      inApp: 0,
      recipients: 0,
      skipped: 'fora do horário de lembrete (9h / 13h / 17h / 19h BRT)',
    };
  }

  const date = todayDateStringBrazil(now);
  const windowPhase = getExamWindowPhase(date, now);
  if (windowPhase !== 'open') {
    return {
      phase,
      emailed: 0,
      inApp: 0,
      recipients: 0,
      skipped: `janela fechada (${windowPhase})`,
    };
  }

  const exams = await loadTodayPublishedExams(date);
  if (!exams.length) {
    return {
      phase,
      emailed: 0,
      inApp: 0,
      recipients: 0,
      skipped: 'nenhuma disputa publicada hoje',
    };
  }

  const students = await listActiveStudentsWithEmail();
  if (!students.length) {
    return { phase, emailed: 0, inApp: 0, recipients: 0, skipped: 'nenhum aluno ativo com e-mail' };
  }

  const finishedByUser = await loadFinishedByUser(exams.map((e) => e.id));
  const finishedTodayCount = finishedByUser.size;

  const pending = students
    .map((student) => {
      const available = exams.filter((e) => {
        if (e.audience === 'general') return true;
        return hasNephrologyTrack(student.enabled_tracks);
      });
      if (!available.length) return null;
      const done = finishedByUser.get(student.id) ?? new Set();
      const remaining = available.filter((e) => !done.has(e.id));
      if (!remaining.length) return null;
      return { student, exams: remaining };
    })
    .filter(Boolean) as { student: StudentRecipient; exams: TodayExam[] }[];

  if (!pending.length) {
    return {
      phase,
      emailed: 0,
      inApp: 0,
      recipients: 0,
      skipped: 'todos os alunos ativos já fizeram a prova de hoje',
    };
  }

  const rank = await loadWeeklyRankContext(pending.map((p) => p.student.id));
  const dateLabel = formatDateBr(date);
  const homeUrl = `${getAppBaseUrl()}/aluno`;
  const admin = createAdminClient();

  const messages: OutboundEmail[] = pending.map(({ student, exams: remaining }) => {
    const mine = rank.byUser.get(student.id) ?? null;
    const tease = pickRankTease({
      phase,
      leaderScore: rank.leaderScore,
      myScore: mine?.score ?? null,
      myPosition: mine?.position ?? null,
      finishedTodayCount,
    });
    return buildNudgeEmail({
      student,
      phase,
      dateLabel,
      exams: remaining,
      tease,
      homeUrl,
    });
  });

  let inApp = 0;
  if (admin) {
    const copy = phaseCopy(phase);
    const rows = pending.map(({ student, exams: remaining }) => {
      const mine = rank.byUser.get(student.id) ?? null;
      const tease = pickRankTease({
        phase,
        leaderScore: rank.leaderScore,
        myScore: mine?.score ?? null,
        myPosition: mine?.position ?? null,
        finishedTodayCount,
      });
      return {
        user_id: student.id,
        title: copy.headline,
        body: [copy.body, tease?.line, remaining.map((e) => e.title).join(' · ')]
          .filter(Boolean)
          .join(' — '),
        kind: 'system',
        meta: { date, phase, exam_ids: remaining.map((e) => e.id), kind: 'exam_nudge' },
      };
    });
    const { error } = await admin.from('user_notifications').insert(rows);
    if (error) console.error('[exam-nudge] in-app:', error.message);
    else inApp = rows.length;
  }

  if (!isEmailSendingConfigured()) {
    return {
      phase,
      emailed: 0,
      inApp,
      recipients: pending.length,
      skipped: 'RESEND_API_KEY não configurada (notificação no app ok)',
    };
  }

  let emailed = 0;
  let lastError: string | undefined;
  for (let i = 0; i < messages.length; i += 100) {
    const chunk = messages.slice(i, i + 100);
    const batch = await sendEmailBatch(chunk, `exam-nudge/${date}/${phase}/p${i}`);
    emailed += batch.sent;
    if (batch.error) lastError = batch.error;
  }

  return {
    phase,
    emailed,
    inApp,
    recipients: pending.length,
    error: lastError,
  };
}
