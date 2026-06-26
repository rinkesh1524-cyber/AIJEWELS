create extension if not exists "pgcrypto";

create table if not exists public.products (
    id uuid primary key default gen_random_uuid(),

    organization_id uuid not null references organizations(id) on delete cascade,

    name text not null,

    sku text unique,

    barcode text,

    category text,

    metal text,

    purity text,

    gross_weight numeric,

    net_weight numeric,

    quantity integer default 0,

    unit text default 'Piece',

    purchase_price numeric,

    making_charges numeric,

    selling_price numeric,

    image_urls text[],

    ai_description text,

    ai_tags text[],

    status text default 'Active',

    created_at timestamp with time zone default now(),

    updated_at timestamp with time zone default now()
);