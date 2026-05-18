
-- Explicit no-access policies (RLS already denies by default, this satisfies linter).
create policy "no public select" on public.access_requests for select using (false);
create policy "no public update" on public.access_requests for update using (false);
create policy "no public delete" on public.access_requests for delete using (false);
-- Inserts only happen via the server route using the service role.
create policy "no direct insert" on public.access_requests for insert with check (false);
