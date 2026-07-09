import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { demoCookieName, isDemoMode, parseDemoSession } from '@/lib/demo-auth';
import { isSkipAuth } from '@/lib/skip-auth';
import type { Profile, UserRole } from '@/types/database';

const GUEST_ADMIN: Profile = {
  id: 'guest-admin',
  name: 'Professor',
  email: 'professor@medrank.com',
  role: 'admin',
  active: true,
  created_at: new Date().toISOString(),
};

const GUEST_STUDENT: Profile = {
  id: 'guest-student',
  name: 'Aluno Demo',
  email: 'aluno@medrank.com',
  role: 'student',
  active: true,
  created_at: new Date().toISOString(),
};

export function getGuestProfile(role: UserRole = 'admin'): Profile {
  return role === 'admin' ? GUEST_ADMIN : GUEST_STUDENT;
}

export async function getSessionProfile(): Promise<{
  userId: string;
  profile: Profile;
} | null> {
  if (isSkipAuth()) {
    return { userId: GUEST_ADMIN.id, profile: GUEST_ADMIN };
  }

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
  if (isSkipAuth()) {
    return { userId: GUEST_ADMIN.id, profile: getGuestProfile(role) };
  }
  const session = await getSessionProfile();
  if (!session) redirect('/login');
  if (session.profile.role !== role) redirect('/');
  return session;
}

export async function requireAuth() {
  if (isSkipAuth()) {
    return { userId: GUEST_STUDENT.id, profile: GUEST_STUDENT };
  }
  const session = await getSessionProfile();
  if (!session) redirect('/login');
  return session;
}
