import { randomUUID } from 'crypto';
import type { PeriodType, StudyGroup, StudyGroupMember, StudyGroupRanking } from '@/types/database';
import { readDemoStore, writeDemoStore, listDemoStudents, type DemoStore } from '@/lib/demo-store';
import { getPeriodBounds } from '@/lib/periods';
import { getAllDemoAttempts } from '@/lib/demo/runtime';
import { getDemoExams } from '@/lib/demo/content';

type StoredGroup = NonNullable<DemoStore['studyGroups']>[number];

function ensureGroups(): DemoStore & { studyGroups: StoredGroup[] } {
  const store = readDemoStore();
  if (!store.studyGroups) store.studyGroups = [];
  return store as DemoStore & { studyGroups: StoredGroup[] };
}

export function listDemoStudyGroups(): (StudyGroup & { member_count: number })[] {
  return ensureGroups().studyGroups.map((g) => ({
    id: g.id,
    name: g.name,
    description: g.description,
    active: g.active,
    created_by: g.created_by,
    created_at: g.created_at,
    member_count: g.members.length,
  }));
}

export function getDemoStudyGroup(id: string): StoredGroup | null {
  return ensureGroups().studyGroups.find((g) => g.id === id) ?? null;
}

export function createDemoStudyGroup(input: {
  name: string;
  description?: string | null;
  createdBy?: string | null;
}): StudyGroup {
  const store = ensureGroups();
  const group: StoredGroup = {
    id: `demo-group-${randomUUID()}`,
    name: input.name.trim(),
    description: input.description?.trim() || null,
    active: true,
    created_by: input.createdBy ?? null,
    created_at: new Date().toISOString(),
    members: [],
  };
  store.studyGroups.push(group);
  writeDemoStore(store);
  return group;
}

export function updateDemoStudyGroup(
  id: string,
  patch: { name?: string; description?: string | null; active?: boolean }
): StudyGroup | null {
  const store = ensureGroups();
  const group = store.studyGroups.find((g) => g.id === id);
  if (!group) return null;
  if (patch.name != null) group.name = patch.name.trim();
  if (patch.description !== undefined) group.description = patch.description;
  if (patch.active != null) group.active = patch.active;
  writeDemoStore(store);
  return group;
}

export function deleteDemoStudyGroup(id: string): boolean {
  const store = ensureGroups();
  const before = store.studyGroups.length;
  store.studyGroups = store.studyGroups.filter((g) => g.id !== id);
  writeDemoStore(store);
  return store.studyGroups.length < before;
}

export function listDemoGroupMembers(groupId: string): (StudyGroupMember & { name: string; email: string })[] {
  const group = getDemoStudyGroup(groupId);
  if (!group) return [];
  const students = listDemoStudents();
  return group.members.map((userId) => {
    const s = students.find((row) => row.id === userId);
    return {
      group_id: groupId,
      user_id: userId,
      joined_at: group.created_at,
      name: s?.name ?? 'Aluno',
      email: s?.email ?? '',
    };
  });
}

export function addDemoGroupMember(groupId: string, userId: string): boolean {
  const store = ensureGroups();
  const group = store.studyGroups.find((g) => g.id === groupId);
  if (!group) return false;
  if (!group.members.includes(userId)) group.members.push(userId);
  writeDemoStore(store);
  return true;
}

export function removeDemoGroupMember(groupId: string, userId: string): boolean {
  const store = ensureGroups();
  const group = store.studyGroups.find((g) => g.id === groupId);
  if (!group) return false;
  group.members = group.members.filter((id) => id !== userId);
  writeDemoStore(store);
  return true;
}

export function getDemoGroupsForUser(userId: string): StudyGroup[] {
  return ensureGroups()
    .studyGroups.filter((g) => g.active && g.members.includes(userId))
    .map(({ members: _m, ...g }) => g);
}

export function buildDemoGroupRankings(
  groupId: string,
  period: PeriodType,
  date = new Date()
): (StudyGroupRanking & { profiles?: { name: string } })[] {
  const group = getDemoStudyGroup(groupId);
  if (!group) return [];
  const bounds = getPeriodBounds(period, date);
  const exams = getDemoExams();
  const examById = new Map(exams.map((e) => [e.id, e]));
  const attempts = getAllDemoAttempts().filter(
    (a) =>
      a.finished_at &&
      !a.forfeited &&
      group.members.includes(a.user_id) &&
      (() => {
        const exam = examById.get(a.exam_id);
        if (!exam) return false;
        return exam.date_available >= bounds.start && exam.date_available <= bounds.end;
      })()
  );

  const byUser = new Map<
    string,
    { score: number; correct: number; questions: number; pctSum: number; n: number; time: number }
  >();

  for (const userId of group.members) {
    byUser.set(userId, { score: 0, correct: 0, questions: 0, pctSum: 0, n: 0, time: 0 });
  }

  for (const a of attempts) {
    const row = byUser.get(a.user_id);
    if (!row) continue;
    row.score += a.score ?? 0;
    row.correct += a.total_correct ?? 0;
    row.questions += a.total_questions ?? 0;
    row.pctSum += a.percentage ?? 0;
    row.n += 1;
    row.time += a.duration_seconds ?? 0;
  }

  const students = listDemoStudents();
  const ranked = [...byUser.entries()]
    .map(([user_id, row]) => ({
      id: `demo-gr-${groupId}-${period}-${user_id}`,
      group_id: groupId,
      user_id,
      period_type: period,
      period_start: bounds.start,
      period_end: bounds.end,
      total_score: row.score,
      total_correct: row.correct,
      total_questions: row.questions,
      average_percentage: row.n ? Math.round((row.pctSum / row.n) * 100) / 100 : 0,
      total_time_seconds: row.time,
      position: null as number | null,
      profiles: { name: students.find((s) => s.id === user_id)?.name ?? 'Aluno' },
    }))
    .sort((a, b) => {
      if (b.total_score !== a.total_score) return b.total_score - a.total_score;
      if (b.total_correct !== a.total_correct) return b.total_correct - a.total_correct;
      return a.total_time_seconds - b.total_time_seconds;
    });

  return ranked.map((row, index) => ({ ...row, position: index + 1 }));
}
