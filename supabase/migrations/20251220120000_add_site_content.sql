-- Admin editable site content key/value store
create table if not exists public.site_content (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

-- allow public read
alter table public.site_content enable row level security;
do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'site_content' and policyname = 'Site content is publicly readable') then
    create policy "Site content is publicly readable" on public.site_content
      for select using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'site_content' and policyname = 'Site content updatable by admins only') then
    create policy "Site content updatable by admins only" on public.site_content
      for all using (exists (select 1 from public.user_roles ur where ur.user_id = auth.uid() and ur.role = 'admin'));
  end if;
end$$;

