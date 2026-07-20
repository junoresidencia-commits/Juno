import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import {
  addDemoGroupMember,
  createDemoStudyGroup,
} from '@/lib/groups/demo';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

/** Aluno (ou admin) cria um grupo e entra como membro. */
export async function POST(request: Request) {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    description?: string | null;
  };
  const name = body.name?.trim();
  if (!name) {
    return NextResponse.json({ error: 'Nome do grupo é obrigatório' }, { status: 400 });
  }

  if (usesDemoStore()) {
    const group = createDemoStudyGroup({
      name,
      description: body.description ?? null,
      createdBy: session.userId,
    });
    addDemoGroupMember(group.id, session.userId);
    return NextResponse.json({ group });
  }

  const admin = createAdminClient() ?? (await createClient());
  const { data: group, error } = await admin
    .from('study_groups')
    .insert({
      name,
      description: body.description?.trim() || null,
      created_by: session.userId,
      active: true,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { error: memberError } = await admin.from('study_group_members').upsert(
    { group_id: group.id, user_id: session.userId },
    { onConflict: 'group_id,user_id' }
  );
  if (memberError) {
    return NextResponse.json({ error: memberError.message }, { status: 500 });
  }

  return NextResponse.json({ group });
}
