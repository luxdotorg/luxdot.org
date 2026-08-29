-- LuxDot · Removing Harm from the Way · Supabase setup v4.18.44
-- Run once in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.harm_reports (
  id uuid primary key default gen_random_uuid(),
  public_code text unique not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'NEW' check (status in ('NEW','VERIFIED','SENT_TO_MUNICIPALITY','IN_PROGRESS','FIXED','CLOSED','REJECTED')),
  title text not null,
  description text not null,
  categories text[] not null default '{}',
  risk_level text not null default 'normal' check (risk_level in ('low','normal','high','urgent')),
  latitude double precision,
  longitude double precision,
  location_accuracy_m double precision check (location_accuracy_m > 0 and location_accuracy_m <= 10000),
  location_captured_at timestamptz,
  location_text text,
  reporter_name text,
  reporter_email text,
  reporter_phone text,
  reporter_consent boolean not null default false,
  published boolean not null default false,
  public_summary text,
  resolution_summary text,
  fixed_at timestamptz
);

create table if not exists public.harm_report_images (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.harm_reports(id) on delete cascade,
  created_at timestamptz not null default now(),
  phase text not null default 'before' check (phase in ('before','after')),
  private_path text,
  public_path text,
  caption text,
  published boolean not null default false
);

create table if not exists public.harm_report_events (
  id bigint generated always as identity primary key,
  report_id uuid not null references public.harm_reports(id) on delete cascade,
  created_at timestamptz not null default now(),
  event_type text not null,
  note text,
  actor uuid default auth.uid()
);

create table if not exists public.harm_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create schema if not exists private;

-- The production database stores the official PDOK/Kadaster boundary for
-- Alphen-Chaam (GM1723) in this private PostGIS table. Keep boundary data out
-- of public schemas so anonymous clients can only ask the boolean predicate.
create extension if not exists postgis with schema extensions;
create table if not exists private.harm_service_areas (
  code text primary key,
  name text not null,
  source text not null,
  source_updated date,
  geom extensions.geometry(MultiPolygon, 4326) not null
);
create index if not exists harm_service_areas_geom_gix
  on private.harm_service_areas using gist (geom);

create or replace function private.is_in_harm_service_area(lat double precision, lon double precision)
returns boolean language sql stable security definer
set search_path=pg_catalog,private,extensions as $$
  select exists (
    select 1 from private.harm_service_areas
    where code = 'GM1723'
      and extensions.st_covers(geom, extensions.st_setsrid(extensions.st_point(lon,lat),4326))
  );
$$;

revoke all on function private.is_in_harm_service_area(double precision,double precision) from public;
grant usage on schema private to anon, authenticated;
grant execute on function private.is_in_harm_service_area(double precision,double precision) to anon, authenticated;

create or replace function private.is_harm_admin()
returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.harm_admins where user_id=auth.uid());
$$;

revoke all on function private.is_harm_admin() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.is_harm_admin() to authenticated;

alter table public.harm_reports enable row level security;
alter table public.harm_report_images enable row level security;
alter table public.harm_report_events enable row level security;
alter table public.harm_admins enable row level security;

-- public can submit, but cannot read private reports
drop policy if exists "harm reports public insert" on public.harm_reports;
create policy "harm reports public insert" on public.harm_reports for insert to anon with check (
  reporter_consent is true
  and status = 'NEW'
  and published is false
  and public_summary is null
  and resolution_summary is null
  and fixed_at is null
  and latitude is not null
  and longitude is not null
  and location_accuracy_m > 0
  and location_accuracy_m <= 500
  and location_captured_at between now() - interval '5 minutes' and now() + interval '1 minute'
  and private.is_in_harm_service_area(latitude, longitude)
);
create policy "harm reports public published read" on public.harm_reports for select to anon, authenticated using (published = true);
create policy "harm reports admin read" on public.harm_reports for select to authenticated using (private.is_harm_admin());
create policy "harm reports admin update" on public.harm_reports for update to authenticated using (private.is_harm_admin()) with check (private.is_harm_admin());
create policy "harm reports admin delete" on public.harm_reports for delete to authenticated using (private.is_harm_admin());

drop policy if exists "harm images public insert" on public.harm_report_images;
create policy "harm images public insert" on public.harm_report_images for insert to anon with check (
  phase = 'before'
  and published is false
  and public_path is null
  and private_path is not null
  and private_path like ('incoming/' || report_id::text || '/%')
);
create policy "harm images public approved read" on public.harm_report_images for select to anon, authenticated using (published = true);
create policy "harm images admin read" on public.harm_report_images for select to authenticated using (private.is_harm_admin());
create policy "harm images admin update" on public.harm_report_images for update to authenticated using (private.is_harm_admin()) with check (private.is_harm_admin());
create policy "harm images admin delete" on public.harm_report_images for delete to authenticated using (private.is_harm_admin());

create policy "harm events admin all" on public.harm_report_events for all to authenticated using (private.is_harm_admin()) with check (private.is_harm_admin());
create policy "harm admins self read" on public.harm_admins for select to authenticated using (user_id=auth.uid());

-- Buckets: harm-private is never public; harm-public contains only administrator-approved publication copies.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('harm-private','harm-private',false,10485760,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=false,file_size_limit=10485760,allowed_mime_types=array['image/jpeg','image/png','image/webp'];

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('harm-public','harm-public',true,10485760,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=true,file_size_limit=10485760,allowed_mime_types=array['image/jpeg','image/png','image/webp'];

-- Allow submissions only under incoming/<uuid>/... in private bucket.
create policy "harm private anon upload" on storage.objects for insert to anon, authenticated
with check (bucket_id='harm-private' and (storage.foldername(name))[1]='incoming');
create policy "harm private admin read" on storage.objects for select to authenticated
using (bucket_id='harm-private' and private.is_harm_admin());
create policy "harm private admin delete" on storage.objects for delete to authenticated
using (bucket_id='harm-private' and private.is_harm_admin());

-- Admin can publish approved copies.
create policy "harm public admin insert" on storage.objects for insert to authenticated
with check (bucket_id='harm-public' and private.is_harm_admin());
create policy "harm public admin update" on storage.objects for update to authenticated
using (bucket_id='harm-public' and private.is_harm_admin()) with check (bucket_id='harm-public' and private.is_harm_admin());
create policy "harm public admin delete" on storage.objects for delete to authenticated
using (bucket_id='harm-public' and private.is_harm_admin());

-- After creating your Supabase Auth user, make that user an admin with:
-- insert into public.harm_admins(user_id) values ('YOUR_AUTH_USER_UUID');
