import 'server-only';
import { redirect } from 'next/navigation';
import type { Profile } from '@/types/database';
import { resolveUserExamAudience } from '@/lib/exams/audience';

/**
 * Treinos de Nefrologia / Nefropediatria: só Liga de Nefrologia (ou admin).
 * Admin adiciona o aluno na liga → libera treino + disputa nefro.
 */
export async function canAccessNephrologyTreino(
  userId: string,
  profile?: Pick<Profile, 'role' | 'enabled_tracks'> | null
): Promise<boolean> {
  if (profile?.role === 'admin') return true;
  const tracks = profile?.enabled_tracks;
  // Caminho rápido: sem query extra se o profile já trouxe os tracks
  if (Array.isArray(tracks)) return tracks.includes('nephrology');
  const ctx = await resolveUserExamAudience(userId);
  return ctx.hasNephrology;
}

export async function requireNephrologyTreinoAccess(
  userId: string,
  profile?: Pick<Profile, 'role'> | null
): Promise<void> {
  const ok = await canAccessNephrologyTreino(userId, profile);
  if (!ok) redirect('/aluno?treino=liga');
}
