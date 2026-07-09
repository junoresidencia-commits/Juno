import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { demoCookieName, isDemoMode, parseDemoSession } from '@/lib/demo-auth';
import type { Profile, UserRole } from '@/types/database';

export async function getSessionProfile(): Promise<{
  userId: string;
  profile: Profile;
} | null> {
  if (isDemoMode()) {
    const cookieStore = await cookies();
    const demoProfile = parseDemoSession(cookieStore.get(demoCookieName())?.value);
    if (demoProfile) {
      return { userId: demoProfile.id, profile: demoProfile };
    }
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) return null;

  return { userId: user.id, profile: profile as Profile };
}

export async function requireRole(role: UserRole) {
  const session = await getSessionProfile();
  if (!session) redirect('/login');
  if (session.profile.role !== role) redirect('/');
  return session;
}

export async function requireAuth() {
  const session = await getSessionProfile();
  if (!session) redirect('/login');
  return session;
}
