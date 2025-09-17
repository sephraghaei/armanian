-- Users table for custom phone+password auth
create table if not exists public.users_app (
  id uuid primary key default gen_random_uuid(),
  phone text not null unique,
  first_name text not null,
  last_name text not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);

-- Basic index
create index if not exists users_app_phone_idx on public.users_app (phone);

-- RLS: for now disabled to simplify
alter table public.users_app disable row level security;




