import 'server-only';
import { createAdminClient } from '@/lib/supabase/admin';
import { getAppBaseUrl } from '@/lib/app-url';
import { isEmailSendingConfigured } from '@/lib/email/config';
import { sendEmailBatch, type OutboundEmail } from '@/lib/email/send';
import { usesDemoStore } from '@/lib/demo-data';
import {
  EXAM_WINDOW_END_HOUR,
  EXAM_WINDOW_START_HOUR,
  EXAM_WINDOW_START_MINUTE,
} from '@/lib/exams/window';

export type ExamReadyNotifyResult = {
  emailed: number;
  inApp: number;
  recipients: number;
  skipped?: string;
  error?: string;
};

type ExamSlice = {
  created: boolean;
  exam: {
    id: string;
    title: string;
    status: string;
  } | null;
};

export type ExamReadyNotifyInput = {
  date: string;
  general: ExamSlice;
  nephrology: ExamSlice;
};

type StudentRecipient = {
  id: string;
  name: string;
  email: string;
  enabled_tracks: string[] | null;
};

type PublishedExam = {
  id: string;
  title: string;
  audience: 'general' | 'nephrology';
};

function formatDateBr(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return isoDate;
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
}

function windowLabel(): string {
  const startMin = String(EXAM_WINDOW_START_MINUTE).padStart(2, '0');
  return `${EXAM_WINDOW_START_HOUR}h${startMin}–${EXAM_WINDOW_END_HOUR}h`;
}

function hasNephrologyTrack(tracks: string[] | null | undefined): boolean {
  return Array.isArray(tracks) && tracks.includes('nephrology');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildExamReadyEmail(opts: {
  name: string;
  dateLabel: string;
  exams: PublishedExam[];
  homeUrl: string;
}): Omit<OutboundEmail, 'to'> {
  const firstName = escapeHtml(opts.name.trim().split(/\s+/)[0] || 'aluno');
  const dateLabel = escapeHtml(opts.dateLabel);
  const listHtml = opts.exams
    .map(
      (e) =>
        `<li><strong>${escapeHtml(e.title)}</strong>${
          e.audience === 'nephrology' ? ' (Nefrologia)' : ''
        }</li>`
    )
    .join('');
  const listText = opts.exams
    .map((e) => `- ${e.title}${e.audience === 'nephrology' ? ' (Nefrologia)' : ''}`)
    .join('\n');

  const subject =
    opts.exams.length > 1
      ? `MedRank: suas disputas de ${opts.dateLabel} já estão ativas`
      : `MedRank: sua prova de ${opts.dateLabel} já está ativa`;

  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, sans-serif; line-height: 1.5; color: #0f172a;">
      <p>Olá, <strong>${firstName}</strong>!</p>
      <p>A disputa de <strong>${dateLabel}</strong> já está <strong>ativa</strong> no MedRank.</p>
      <ul>${listHtml}</ul>
      <p>Janela de hoje: <strong>${windowLabel()}</strong> (horário de Brasília).</p>
      <p>
        <a href="${opts.homeUrl}" style="display:inline-block;background:#047857;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:600;">
          Abrir a prova
        </a>
      </p>
      <p style="font-size:13px;color:#64748b;">Se o botão não abrir, use: ${opts.homeUrl}</p>
    </div>
  `.trim();

  const text = [
    `Olá, ${opts.name.trim().split(/\s+/)[0] || 'aluno'}!`,
    '',
    `A disputa de ${opts.dateLabel} já está ativa no MedRank.`,
    listText,
    '',
    `Janela: ${windowLabel()} (Brasília).`,
    `Acesse: ${opts.homeUrl}`,
  ].join('\n');

  return { subject, html, text };
}

async function listActiveStudents(): Promise<StudentRecipient[]> {
  const admin = createAdminClient();
  if (!admin) return [];

  const full = await admin
    .from('profiles')
    .select('id, name, email, enabled_tracks')
    .eq('role', 'student')
    .eq('active', true)
    .limit(2000);

  if (!full.error && full.data) {
    return full.data as StudentRecipient[];
  }

  if (full.error && /enabled_tracks|schema cache/i.test(full.error.message)) {
    const basic = await admin
      .from('profiles')
      .select('id, name, email')
      .eq('role', 'student')
      .eq('active', true)
      .limit(2000);
    return (basic.data ?? []).map((s) => ({
      ...(s as Omit<StudentRecipient, 'enabled_tracks'>),
      enabled_tracks: null,
    }));
  }

  console.error('[exam-ready-email] list students:', full.error?.message);
  return [];
}

/**
 * Quando a disputa diária é gerada e publicada, avisa os alunos ativos por e-mail
 * (+ notificação no app). Não reenvia se a prova só “já existia” (created=false).
 */
export async function notifyStudentsExamReady(
  result: ExamReadyNotifyInput
): Promise<ExamReadyNotifyResult> {
  if (usesDemoStore()) {
    return { emailed: 0, inApp: 0, recipients: 0, skipped: 'demo' };
  }

  const published: PublishedExam[] = [];
  if (result.general.created && result.general.exam?.status === 'published') {
    published.push({
      id: result.general.exam.id,
      title: result.general.exam.title,
      audience: 'general',
    });
  }
  if (result.nephrology.created && result.nephrology.exam?.status === 'published') {
    published.push({
      id: result.nephrology.exam.id,
      title: result.nephrology.exam.title,
      audience: 'nephrology',
    });
  }

  if (!published.length) {
    return {
      emailed: 0,
      inApp: 0,
      recipients: 0,
      skipped: 'nenhuma disputa nova publicada',
    };
  }

  const students = await listActiveStudents();
  if (!students.length) {
    return { emailed: 0, inApp: 0, recipients: 0, skipped: 'nenhum aluno ativo' };
  }

  const dateLabel = formatDateBr(result.date);
  const homeUrl = `${getAppBaseUrl()}/aluno`;
  const hasGeneral = published.some((e) => e.audience === 'general');
  const hasNefro = published.some((e) => e.audience === 'nephrology');

  const targeted = students
    .map((s) => {
      const exams = published.filter((e) => {
        if (e.audience === 'general') return true;
        return hasNephrologyTrack(s.enabled_tracks);
      });
      if (!hasGeneral && hasNefro && !hasNephrologyTrack(s.enabled_tracks)) {
        return null;
      }
      if (!exams.length) return null;
      return { student: s, exams };
    })
    .filter(Boolean) as { student: StudentRecipient; exams: PublishedExam[] }[];

  if (!targeted.length) {
    return { emailed: 0, inApp: 0, recipients: 0, skipped: 'sem destinatários para as audiências' };
  }

  const admin = createAdminClient();
  let inApp = 0;
  if (admin) {
    const rows = targeted.map(({ student, exams }) => ({
      user_id: student.id,
      title:
        exams.length > 1
          ? 'Disputas de hoje já estão ativas'
          : 'Sua prova de hoje já está ativa',
      body: `${exams.map((e) => e.title).join(' · ')} — janela ${windowLabel()}.`,
      kind: 'system',
      meta: {
        date: result.date,
        exam_ids: exams.map((e) => e.id),
      },
    }));
    const { error } = await admin.from('user_notifications').insert(rows);
    if (error) {
      console.error('[exam-ready-email] in-app notify:', error.message);
    } else {
      inApp = rows.length;
    }
  }

  if (!isEmailSendingConfigured()) {
    return {
      emailed: 0,
      inApp,
      recipients: targeted.length,
      skipped: 'RESEND_API_KEY não configurada (notificação no app ok)',
    };
  }

  const messages: OutboundEmail[] = targeted.map(({ student, exams }) => {
    const built = buildExamReadyEmail({
      name: student.name,
      dateLabel,
      exams,
      homeUrl,
    });
    return { ...built, to: student.email };
  });

  let emailed = 0;
  let lastError: string | undefined;
  const chunkSize = 100;
  for (let i = 0; i < messages.length; i += chunkSize) {
    const chunk = messages.slice(i, i + chunkSize);
    const batchKey = `exam-ready/${result.date}/${published.map((e) => e.id).join(',')}/p${i}`;
    const batch = await sendEmailBatch(chunk, batchKey);
    emailed += batch.sent;
    if (batch.error) lastError = batch.error;
  }

  return {
    emailed,
    inApp,
    recipients: targeted.length,
    error: lastError,
  };
}
