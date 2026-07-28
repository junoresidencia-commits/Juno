-- Manuscrito + tabela de literatura (rode depois do 001)

alter table public.irc_studies
  add column if not exists manuscript jsonb;

create table if not exists public.irc_literature (
  id text primary key,
  study_id text not null references public.irc_studies(id) on delete cascade,
  title text not null,
  authors text not null default '',
  year integer,
  journal text not null default '',
  study_type text not null default '',
  population text not null default '',
  main_findings text not null default '',
  limitations text not null default '',
  included boolean not null default true,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists irc_literature_study_id_idx on public.irc_literature(study_id);

alter table public.irc_literature enable row level security;

drop policy if exists "irc_literature_all" on public.irc_literature;
create policy "irc_literature_all" on public.irc_literature
  for all using (true) with check (true);
