import type { Profile } from '@/types/database';
import { findDemoStudentById } from '@/lib/demo-store';
import { isDemoMode } from '@/lib/demo-auth';

/** Aluno precisa trocar a senha antes de usar o app (ex.: conta criada pelo professor). */
export function profileMustChangePassword(profile: Profile): boolean {
  if (profile.role !== 'student') return false;
  if (profile.must_change_password === true) return true;
  if (isDemoMode()) {
    const student = findDemoStudentById(profile.id);
    return student?.mustChangePassword === true;
  }
  return false;
}
