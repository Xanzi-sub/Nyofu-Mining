-- Upgrade existing Mining Connect Africa projects to the current schema.
-- Run this script in the Supabase SQL editor after 0001_init.sql.

alter table public.profiles
  add column if not exists terms_accepted_at timestamp with time zone,
  add column if not exists terms_version text;

alter table public.investments
  add column if not exists terms_accepted_at timestamp with time zone,
  add column if not exists terms_version text;

-- Ensure new profiles retain the accepted legal terms from Supabase Auth metadata.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    full_name,
    phone_number,
    terms_accepted_at,
    terms_version
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'phone_number',
    (new.raw_user_meta_data->>'terms_accepted_at')::timestamp with time zone,
    new.raw_user_meta_data->>'terms_version'
  );
  return new;
end;
$$;

create table if not exists public.withdrawal_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  investment_id uuid references public.investments(id) on delete cascade not null,
  amount numeric not null check (amount > 0),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'paid', 'rejected')),
  reviewed_at timestamp with time zone,
  paid_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

alter table public.withdrawal_requests enable row level security;

drop policy if exists "Users can view own withdrawal requests" on public.withdrawal_requests;
create policy "Users can view own withdrawal requests"
  on public.withdrawal_requests for select
  using (auth.uid() = user_id);

drop policy if exists "Users can create own withdrawal requests" on public.withdrawal_requests;
create policy "Users can create own withdrawal requests"
  on public.withdrawal_requests for insert
  with check (auth.uid() = user_id);

create index if not exists withdrawal_requests_user_id_idx
  on public.withdrawal_requests(user_id);
create unique index if not exists payments_payfast_payment_id_unique_idx
  on public.payments(payfast_payment_id)
  where payfast_payment_id is not null;
