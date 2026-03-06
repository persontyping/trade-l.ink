-- 001_auth_profiles.sql

-- Enable extension for UUID generation if needed
create extension if not exists "uuid-ossp";

---------------------------------------------------------
-- PROFILES TABLE
---------------------------------------------------------

create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,

  email text unique,
  first_name text not null,
  last_name text not null,
  phone text,

  username text unique,
  bio text,
  avatar_url text,
  website text,

  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

---------------------------------------------------------
-- INDEXES
---------------------------------------------------------

create index if not exists profiles_username_idx
on public.profiles(username);

create index if not exists profiles_email_idx
on public.profiles(email);

---------------------------------------------------------
-- ROW LEVEL SECURITY
---------------------------------------------------------

alter table public.profiles enable row level security;

-- Users can read any public profile
create policy "Profiles are viewable by everyone"
on public.profiles
for select
using (true);

-- Users can insert their own profile
create policy "Users can insert their own profile"
on public.profiles
for insert
with check (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id);

-- Users can delete their own profile
create policy "Users can delete own profile"
on public.profiles
for delete
using (auth.uid() = id);

---------------------------------------------------------
-- AUTO UPDATE updated_at
---------------------------------------------------------

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
before update on public.profiles
for each row
execute procedure public.handle_updated_at();

---------------------------------------------------------
-- AUTO CREATE PROFILE ON SIGNUP
---------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    email,
    first_name,
    last_name
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name',''),
    coalesce(new.raw_user_meta_data->>'last_name','')
  );

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();