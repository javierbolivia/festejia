-- FESTEJIA — Notificaciones de clientes Premium
-- Ejecutar una sola vez desde Supabase SQL Editor.

create table if not exists notificaciones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  evento_id uuid references eventos(id) on delete cascade,
  tipo text not null,
  titulo text not null,
  descripcion text,
  icono text default '🔔',
  leida boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_notif_user on notificaciones(user_id, created_at desc);
create index if not exists idx_notif_leida on notificaciones(user_id, leida);
create index if not exists idx_notif_evento on notificaciones(evento_id);

alter table notificaciones enable row level security;

drop policy if exists "notificaciones_select_own" on notificaciones;
create policy "notificaciones_select_own" on notificaciones
  for select using (auth.uid() = user_id);

drop policy if exists "notificaciones_update_own" on notificaciones;
create policy "notificaciones_update_own" on notificaciones
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Las plantillas públicas no pueden insertar filas arbitrarias: las
-- notificaciones deben crearlas un endpoint autenticado del servidor.
