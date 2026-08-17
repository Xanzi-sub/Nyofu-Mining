-- Mining Connect Africa (MCA) — Initial schema
-- Run this entire script in the Supabase SQL editor.

-- ============================================================
-- 1. PROFILES (extends auth.users)
-- ============================================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null,
  phone_number text,
  terms_accepted_at timestamp with time zone,
  terms_version text,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user is created.
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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- 2. PACKAGES (investment tiers)
-- ============================================================
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  min_amount numeric not null,
  monthly_return numeric not null,
  active boolean default true,
  sort_order integer not null default 0
);

alter table public.packages enable row level security;

create policy "Anyone can view active packages"
  on public.packages for select
  using (true);

insert into public.packages (name, min_amount, monthly_return, sort_order) values
  ('Bronze', 7000, 2100, 1),
  ('Tier 2', 10000, 3000, 2),
  ('Silver', 15000, 4500, 3),
  ('Tier 4', 20000, 6000, 4),
  ('Gold', 30000, 9000, 5),
  ('Diamond', 50000, 15000, 6)
on conflict do nothing;

-- ============================================================
-- 3. INVESTMENTS (user active investments)
-- ============================================================
create table if not exists public.investments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  package_id uuid references public.packages(id) not null,
  amount numeric not null,
  monthly_return numeric not null,
  status text default 'pending' check (status in ('pending', 'active', 'completed', 'cancelled')),
  terms_accepted_at timestamp with time zone not null,
  terms_version text not null,
  created_at timestamp with time zone default now()
);

alter table public.investments enable row level security;

create policy "Users can view own investments"
  on public.investments for select
  using (auth.uid() = user_id);

create policy "Users can create own investments"
  on public.investments for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- 4. PAYMENTS (PayFast transaction logs)
-- ============================================================
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  investment_id uuid references public.investments(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  payfast_payment_id text,
  amount numeric not null,
  status text not null check (status in ('COMPLETE', 'PENDING', 'FAILED')),
  pf_payment_data jsonb,
  created_at timestamp with time zone default now()
);

alter table public.payments enable row level security;

create policy "Users can view own payments"
  on public.payments for select
  using (auth.uid() = user_id);

-- ============================================================
-- 5. WITHDRAWAL REQUESTS (earnings payout review queue)
-- ============================================================
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

create policy "Users can view own withdrawal requests"
  on public.withdrawal_requests for select
  using (auth.uid() = user_id);

create policy "Users can create own withdrawal requests"
  on public.withdrawal_requests for insert
  with check (auth.uid() = user_id);

-- Note: inserts/updates to investments.status and payments are performed by the
-- PayFast ITN webhook using the Supabase service role key, which bypasses RLS.

create index if not exists investments_user_id_idx on public.investments(user_id);
create index if not exists payments_user_id_idx on public.payments(user_id);
create index if not exists payments_investment_id_idx on public.payments(investment_id);
create index if not exists withdrawal_requests_user_id_idx on public.withdrawal_requests(user_id);
create unique index if not exists payments_payfast_payment_id_unique_idx
  on public.payments(payfast_payment_id)
  where payfast_payment_id is not null;
