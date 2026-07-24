-- Meu Rim · Estudos IRC — schema inicial (Supabase)
-- Cole no SQL Editor do projeto Supabase e execute.

create table if not exists public.irc_studies (
  id text primary key,
  title text not null,
  objective text not null default '',
  region text not null default 'IRC',
  template text not null default 'general',
  kind text not null default 'cross_sectional',
  idea text not null default '',
  blueprint jsonb,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.irc_patients (
  id text primary key,
  study_id text not null references public.irc_studies(id) on delete cascade,
  name text not null,
  age integer not null check (age >= 0),
  sex text not null check (sex in ('F', 'M')),
  creatinine_mg_dl numeric not null,
  egfr numeric not null,
  ckd_stage text not null,
  has_ckd boolean not null default false,
  underlying_disease text not null default 'unknown',
  on_statin boolean not null default false,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists irc_patients_study_id_idx on public.irc_patients(study_id);
create index if not exists irc_studies_region_idx on public.irc_studies(region);

alter table public.irc_studies enable row level security;
alter table public.irc_patients enable row level security;

-- Políticas abertas para anon (protótipo local/equipe pequena).
-- Em produção, troque por auth.uid() e papéis.
drop policy if exists "irc_studies_all" on public.irc_studies;
create policy "irc_studies_all" on public.irc_studies
  for all using (true) with check (true);

drop policy if exists "irc_patients_all" on public.irc_patients;
create policy "irc_patients_all" on public.irc_patients
  for all using (true) with check (true);
