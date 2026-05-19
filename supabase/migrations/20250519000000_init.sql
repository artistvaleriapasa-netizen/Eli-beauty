-- ============================================================
-- Eli Beauty OS — Initial schema
-- Multi-tenant SaaS pentru saloane înfrumusețare
-- Tenant isolation: Row-Level Security pe coloana salon_id
-- ============================================================

-- Extensii necesare
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "btree_gist"; -- pentru constraint-uri de tip range pe rezervări

-- ============================================================
-- ENUMS
-- ============================================================

create type salon_role as enum ('owner', 'manager', 'staff');
create type subscription_status as enum ('trial', 'active', 'past_due', 'canceled');
create type subscription_tier as enum ('starter', 'pro', 'enterprise');
create type appointment_status as enum (
  'pending',     -- programare nouă, în așteptarea confirmării
  'confirmed',   -- confirmată de salon sau auto-confirmată
  'completed',   -- serviciu efectuat
  'cancelled',   -- anulată
  'no_show'      -- client nu s-a prezentat
);

-- ============================================================
-- TABELE
-- ============================================================

-- SALONS — tenants
create table public.salons (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null, -- pentru URL public: /[salonSlug]
  name text not null,
  description text,
  logo_url text,
  cover_url text,
  phone text,
  email text,
  address text,
  city text,
  country text default 'MD' not null, -- ISO 3166-1 alpha-2 (MD, RO)
  timezone text default 'Europe/Chisinau' not null,
  currency text default 'MDL' not null, -- MDL, EUR, RON
  subscription_status subscription_status default 'trial' not null,
  subscription_tier subscription_tier default 'starter' not null,
  subscription_ends_at timestamptz,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  constraint slug_format check (slug ~ '^[a-z0-9-]+$' and length(slug) between 3 and 50)
);

create index salons_slug_idx on public.salons(slug);

-- SALON_MEMBERS — pivot între auth.users și salons
create table public.salon_members (
  id uuid primary key default uuid_generate_v4(),
  salon_id uuid not null references public.salons(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role salon_role default 'staff' not null,
  invited_at timestamptz default now() not null,
  accepted_at timestamptz,
  created_at timestamptz default now() not null,
  unique (salon_id, user_id)
);

create index salon_members_user_id_idx on public.salon_members(user_id);
create index salon_members_salon_id_idx on public.salon_members(salon_id);

-- STAFF — angajații unui salon (pot fi conectați la un user pentru login sau nu)
create table public.staff (
  id uuid primary key default uuid_generate_v4(),
  salon_id uuid not null references public.salons(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null, -- opțional
  name text not null,
  role_title text, -- ex: "Stilist senior", "Manichiurist"
  photo_url text,
  phone text,
  email text,
  is_active boolean default true not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index staff_salon_id_idx on public.staff(salon_id);

-- SERVICES — catalogul de servicii oferite de salon
create table public.services (
  id uuid primary key default uuid_generate_v4(),
  salon_id uuid not null references public.salons(id) on delete cascade,
  name text not null,
  description text,
  category text, -- ex: "Păr", "Manichiură", "Cosmetică"
  duration_minutes int not null check (duration_minutes > 0 and duration_minutes <= 600),
  price_cents int not null check (price_cents >= 0),
  currency text default 'MDL' not null,
  photo_url text,
  is_active boolean default true not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index services_salon_id_idx on public.services(salon_id);
create index services_salon_active_idx on public.services(salon_id, is_active) where is_active;

-- CLIENTS — clienții finali ai unui salon
create table public.clients (
  id uuid primary key default uuid_generate_v4(),
  salon_id uuid not null references public.salons(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null, -- opțional, clientul poate sau nu să aibă cont
  name text not null,
  phone text,
  email text,
  birthday date,
  notes text, -- preferințe, alergii, etc.
  total_visits int default 0 not null,
  last_visit_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index clients_salon_id_idx on public.clients(salon_id);
create index clients_phone_idx on public.clients(salon_id, phone);
create index clients_user_id_idx on public.clients(user_id) where user_id is not null;

-- APPOINTMENTS — programări
create table public.appointments (
  id uuid primary key default uuid_generate_v4(),
  salon_id uuid not null references public.salons(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete restrict,
  staff_id uuid references public.staff(id) on delete set null,
  service_id uuid not null references public.services(id) on delete restrict,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status appointment_status default 'pending' not null,
  notes text,
  price_cents int not null, -- snapshot la momentul programării
  currency text default 'MDL' not null,
  cancellation_reason text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  constraint valid_time_range check (ends_at > starts_at)
);

create index appointments_salon_idx on public.appointments(salon_id);
create index appointments_starts_at_idx on public.appointments(salon_id, starts_at);
create index appointments_staff_idx on public.appointments(staff_id, starts_at);
create index appointments_client_idx on public.appointments(client_id, starts_at desc);

-- Constraint: un membru staff nu poate avea două programări suprapuse
alter table public.appointments add constraint no_overlapping_staff_appointments
  exclude using gist (
    staff_id with =,
    tstzrange(starts_at, ends_at) with &&
  ) where (staff_id is not null and status in ('pending', 'confirmed'));

-- ============================================================
-- TRIGGERE updated_at
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger salons_updated_at before update on public.salons
  for each row execute function public.set_updated_at();
create trigger staff_updated_at before update on public.staff
  for each row execute function public.set_updated_at();
create trigger services_updated_at before update on public.services
  for each row execute function public.set_updated_at();
create trigger clients_updated_at before update on public.clients
  for each row execute function public.set_updated_at();
create trigger appointments_updated_at before update on public.appointments
  for each row execute function public.set_updated_at();

-- ============================================================
-- HELPER FUNCTIONS pentru RLS
-- ============================================================

-- Verifică dacă user-ul curent e membru într-un salon
create or replace function public.is_salon_member(p_salon_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.salon_members
    where salon_id = p_salon_id and user_id = auth.uid()
  );
$$;

-- Verifică dacă user-ul curent are unul din rolurile cerute într-un salon
create or replace function public.has_salon_role(p_salon_id uuid, p_roles salon_role[])
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.salon_members
    where salon_id = p_salon_id
      and user_id = auth.uid()
      and role = any(p_roles)
  );
$$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.salons enable row level security;
alter table public.salon_members enable row level security;
alter table public.staff enable row level security;
alter table public.services enable row level security;
alter table public.clients enable row level security;
alter table public.appointments enable row level security;

-- ===== SALONS =====
-- Membrii pot vedea salonul lor
create policy "salons_select_for_members" on public.salons
  for select to authenticated
  using (public.is_salon_member(id));

-- Public: oricine poate citi datele publice ale unui salon pentru pagina de rezervări
-- (limitat la coloanele non-sensitive prin view dedicat în aplicație)
create policy "salons_public_select" on public.salons
  for select to anon
  using (true);

-- Doar owner poate update salonul
create policy "salons_update_owners" on public.salons
  for update to authenticated
  using (public.has_salon_role(id, array['owner']::salon_role[]))
  with check (public.has_salon_role(id, array['owner']::salon_role[]));

-- Insert salon: prin signup flow (Server Action cu service_role). Niciun policy direct.

-- ===== SALON_MEMBERS =====
create policy "salon_members_select_own_salons" on public.salon_members
  for select to authenticated
  using (public.is_salon_member(salon_id));

create policy "salon_members_manage_by_owners" on public.salon_members
  for all to authenticated
  using (public.has_salon_role(salon_id, array['owner', 'manager']::salon_role[]))
  with check (public.has_salon_role(salon_id, array['owner', 'manager']::salon_role[]));

-- ===== STAFF =====
create policy "staff_select_members" on public.staff
  for select to authenticated
  using (public.is_salon_member(salon_id));

-- Staff vizibil public pentru rezervări (doar info non-sensitive expusă în client)
create policy "staff_public_select_active" on public.staff
  for select to anon
  using (is_active);

create policy "staff_manage_by_owners_managers" on public.staff
  for all to authenticated
  using (public.has_salon_role(salon_id, array['owner', 'manager']::salon_role[]))
  with check (public.has_salon_role(salon_id, array['owner', 'manager']::salon_role[]));

-- ===== SERVICES =====
create policy "services_select_members" on public.services
  for select to authenticated
  using (public.is_salon_member(salon_id));

-- Servicii active vizibile public pentru rezervări
create policy "services_public_select_active" on public.services
  for select to anon
  using (is_active);

create policy "services_manage_by_staff_plus" on public.services
  for all to authenticated
  using (public.has_salon_role(salon_id, array['owner', 'manager']::salon_role[]))
  with check (public.has_salon_role(salon_id, array['owner', 'manager']::salon_role[]));

-- ===== CLIENTS =====
create policy "clients_select_members" on public.clients
  for select to authenticated
  using (public.is_salon_member(salon_id));

create policy "clients_manage_by_members" on public.clients
  for all to authenticated
  using (public.is_salon_member(salon_id))
  with check (public.is_salon_member(salon_id));

-- Clienții finali (logați) își pot vedea propriul profil
create policy "clients_select_self" on public.clients
  for select to authenticated
  using (user_id = auth.uid());

-- ===== APPOINTMENTS =====
create policy "appointments_select_members" on public.appointments
  for select to authenticated
  using (public.is_salon_member(salon_id));

create policy "appointments_manage_members" on public.appointments
  for all to authenticated
  using (public.is_salon_member(salon_id))
  with check (public.is_salon_member(salon_id));

-- Clienții finali își văd propriile programări
create policy "appointments_select_own" on public.appointments
  for select to authenticated
  using (
    client_id in (select id from public.clients where user_id = auth.uid())
  );

-- ============================================================
-- COMMENT: Toate insert-urile cross-tenant (signup salon nou,
-- invitări utilizatori, etc.) trebuie să se facă prin Server Actions
-- folosind createAdminClient() cu service_role_key.
-- ============================================================
