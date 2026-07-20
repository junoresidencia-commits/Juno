import type { Profile } from '@/types/database';

/** Professor (role admin) ou aluno marcado como administrador de liga. */
export function canCreateLeague(
  profile: Pick<Profile, 'role' | 'league_admin'> | null | undefined
): boolean {
  if (!profile) return false;
  if (profile.role === 'admin') return true;
  return !!profile.league_admin;
}
