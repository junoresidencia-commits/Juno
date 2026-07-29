import 'server-only';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  EXAM_WINDOW_END_HOUR,
  EXAM_WINDOW_START_HOUR,
  EXAM_WINDOW_START_MINUTE,
} from '@/lib/exams/window';

export type StudentRecipient = {
  id: string;
  name: string;
  email: string;
  enabled_tracks: string[] | null;
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function formatDateBr(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return isoDate;
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
}

export function examWindowLabel(): string {
  const startMin = String(EXAM_WINDOW_START_MINUTE).padStart(2, '0');
  return `${EXAM_WINDOW_START_HOUR}h${startMin}–${EXAM_WINDOW_END_HOUR}h`;
}

export function hasNephrologyTrack(tracks: string[] | null | undefined): boolean {
  return Array.isArray(tracks) && tracks.includes('nephrology');
}

export async function listActiveStudentsWithEmail(): Promise<StudentRecipient[]> {
  const admin = createAdminClient();
  if (!admin) return [];

  const full = await admin
    .from('profiles')
    .select('id, name, email, enabled_tracks')
    .eq('role', 'student')
    .eq('active', true)
    .limit(2000);

  let rows: StudentRecipient[] = [];
  if (!full.error && full.data) {
    rows = full.data as StudentRecipient[];
  } else if (full.error && /enabled_tracks|schema cache/i.test(full.error.message)) {
    const basic = await admin
      .from('profiles')
      .select('id, name, email')
      .eq('role', 'student')
      .eq('active', true)
      .limit(2000);
    rows = (basic.data ?? []).map((s) => ({
      ...(s as Omit<StudentRecipient, 'enabled_tracks'>),
      enabled_tracks: null,
    }));
  } else if (full.error) {
    console.error('[email] list students:', full.error.message);
    return [];
  }

  return rows.filter((s) => Boolean(s.email?.includes('@')));
}
