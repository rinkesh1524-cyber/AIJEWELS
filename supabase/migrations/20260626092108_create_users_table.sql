create table users (
    id uuid primary key references auth.users(id) on delete cascade,

    organization_id uuid not null references organizations(id) on delete cascade,

    full_name text not null,

    role text not null default 'owner',

    created_at timestamptz default now(),

    updated_at timestamptz default now()
);