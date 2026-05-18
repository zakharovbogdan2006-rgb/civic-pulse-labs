
create table public.access_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  request_type text not null check (request_type in ('register','signin','partnership')),
  first_name text,
  last_name text,
  email text not null,
  organization text,
  note text,
  source text
);

alter table public.access_requests enable row level security;

-- No SELECT/UPDATE/DELETE policies for anon or authenticated.
-- Inserts come from the server route using the service role (bypasses RLS).
create index access_requests_created_at_idx on public.access_requests (created_at desc);
