-- Public API access without Supabase authentication.
-- Run this in the Supabase project's SQL Editor.

grant usage on schema public to anon, authenticated;

grant select on table public.events to anon, authenticated;
grant select on table public.users to anon, authenticated;
grant select, insert on table public.registrations to anon, authenticated;

alter table public.events enable row level security;
alter table public.users enable row level security;
alter table public.registrations enable row level security;

create policy "Public read events"
  on public.events
  for select
  to anon, authenticated
  using (true);

create policy "Public read users"
  on public.users
  for select
  to anon, authenticated
  using (true);

create policy "Public read registrations"
  on public.registrations
  for select
  to anon, authenticated
  using (true);

create policy "Public create registrations"
  on public.registrations
  for insert
  to anon, authenticated
  with check (true);

create unique index if not exists registrations_user_event_unique
  on public.registrations (user_id, event_id);
