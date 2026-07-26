import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';

const BUCKET = 'question-images';
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

function extFor(mime: string): string {
  if (mime === 'image/png') return 'png';
  if (mime === 'image/webp') return 'webp';
  if (mime === 'image/gif') return 'gif';
  return 'jpg';
}

/** Upload de imagem para questão (Desafio Expert etc.). */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY necessária para enviar imagem.' },
      { status: 503 }
    );
  }

  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Envie um arquivo em "file".' }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: 'Use JPG, PNG, WEBP ou GIF.' },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Imagem no máximo 5 MB.' }, { status: 400 });
  }

  const folder = String(form.get('folder') || 'expert').replace(/[^a-z0-9_-]/gi, '') || 'expert';
  const bytes = new Uint8Array(await file.arrayBuffer());
  const path = `${folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${extFor(file.type)}`;

  const { error: upErr } = await admin.storage.from(BUCKET).upload(path, bytes, {
    contentType: file.type,
    upsert: false,
  });

  if (upErr) {
    const hint = /bucket|not found|404/i.test(upErr.message)
      ? ' Rode o SQL docs/SQL-BUCKET-IMAGENS-QUESTOES.sql no Supabase.'
      : '';
    return NextResponse.json(
      { error: `${upErr.message}.${hint}` },
      { status: 500 }
    );
  }

  const { data } = admin.storage.from(BUCKET).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl, path });
}
