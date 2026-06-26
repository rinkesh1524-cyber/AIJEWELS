create extension if not exists "pgcrypto";

create table organizations (
    id uuid primary key default gen_random_uuid(),

    name text not null,

    business_type text not null,

    email text,

    phone text,

    gst_number text,

    logo_url text,

    subscription_plan text default 'free',

    created_at timestamptz default now(),

    updated_at timestamptz default now()
);