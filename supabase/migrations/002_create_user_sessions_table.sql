create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  device_id text not null,
  session_token text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);