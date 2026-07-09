import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Profile, UserRole } from '@/types/database';

export async function getSessionProfile(): Promise<{
  userId: string;
  profile: Profile;
} | null> {
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
