-- ============================================================
-- FESTEJIA EXPRESS — Migración de base de datos
-- ============================================================
-- Este script SOLO crea tablas nuevas con prefijo express_.
-- NO modifica: profiles, eventos, invitados, clientes_login.
-- Ejecutar en el SQL Editor de Supabase (proyecto existente).
-- Seguro de re-ejecutar gracias a IF NOT EXISTS.
-- ============================================================

-- ------------------------------------------------------------
-- 1. express_clientes
-- ------------------------------------------------------------
create table if not exists express_clientes (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  nombre text,
  telefono text,
  created_at timestamptz not null default now()
);

alter table express_clientes enable row level security;

drop policy if exists "express_clientes_select_own" on express_clientes;
create policy "express_clientes_select_own"
  on express_clientes for select
  using (auth.uid() = id);

drop policy if exists "express_clientes_insert_own" on express_clientes;
create policy "express_clientes_insert_own"
  on express_clientes for insert
  with check (auth.uid() = id);

drop policy if exists "express_clientes_update_own" on express_clientes;
create policy "express_clientes_update_own"
  on express_clientes for update
  using (auth.uid() = id);

-- ------------------------------------------------------------
-- 2. express_invitaciones
-- ------------------------------------------------------------
create table if not exists express_invitaciones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plantilla text not null default 'plantilla-a',
  slug text unique,
  estado text not null default 'borrador'
    check (estado in ('borrador', 'pendiente_pago', 'publicada', 'expirada')),
  codigo_interno text unique,

  nombre1 text,
  nombre2 text,
  fecha_evento date,
  hora_evento text,
  padres_novia text,
  padres_novio text,
  padrinos text,

  ceremonia_lugar text,
  ceremonia_maps_url text,
  ceremonia_hora text,
  recepcion_lugar text,
  recepcion_maps_url text,
  recepcion_hora text,

  itinerario jsonb default '[]'::jsonb,
  dresscode text,
  colores_sugeridos jsonb default '[]'::jsonb,
  solo_adultos boolean default false,

  mensaje_bienvenida text,
  mensaje_regalos text,
  mensaje_dresscode text,
  mensaje_solo_adultos text,

  regalo_qr_url text,
  regalo_mesa_link text,

  foto_portada_url text,
  fotos_galeria jsonb default '[]'::jsonb,
  musica_url text,

  correcciones_disponibles int not null default 2,
  correcciones_usadas int not null default 0,

  fecha_publicacion timestamptz,
  fecha_expiracion date,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_express_invitaciones_user on express_invitaciones(user_id);
create index if not exists idx_express_invitaciones_slug on express_invitaciones(slug);
create index if not exists idx_express_invitaciones_estado on express_invitaciones(estado);

alter table express_invitaciones enable row level security;

-- El dueño puede ver y editar todo, en cualquier estado
drop policy if exists "express_invitaciones_owner_all" on express_invitaciones;
create policy "express_invitaciones_owner_all"
  on express_invitaciones for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- El público solo puede leer invitaciones publicadas y vigentes
drop policy if exists "express_invitaciones_public_select" on express_invitaciones;
create policy "express_invitaciones_public_select"
  on express_invitaciones for select
  using (
    estado = 'publicada'
    and (fecha_expiracion is null or fecha_expiracion >= current_date)
  );

-- Trigger para mantener updated_at al día
create or replace function express_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_express_invitaciones_updated_at on express_invitaciones;
create trigger trg_express_invitaciones_updated_at
  before update on express_invitaciones
  for each row
  execute function express_set_updated_at();

-- ------------------------------------------------------------
-- 3. express_pagos
-- ------------------------------------------------------------
create table if not exists express_pagos (
  id uuid primary key default gen_random_uuid(),
  invitacion_id uuid not null references express_invitaciones(id) on delete cascade,
  tipo text not null check (tipo in ('publicacion', 'correcciones_extra')),
  monto numeric(10,2) not null,
  moneda text not null default 'BOB',
  metodo text not null default 'whatsapp_manual'
    check (metodo in ('whatsapp_manual', 'libelula_qr', 'libelula_link', 'libelula_api')),
  estado text not null default 'pendiente'
    check (estado in ('pendiente', 'confirmado', 'rechazado')),
  referencia_externa text,
  confirmado_por uuid references auth.users(id),
  confirmado_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_express_pagos_invitacion on express_pagos(invitacion_id);
create index if not exists idx_express_pagos_estado on express_pagos(estado);

alter table express_pagos enable row level security;

-- El dueño de la invitación puede ver sus propios pagos e insertar solicitudes
drop policy if exists "express_pagos_owner_select" on express_pagos;
create policy "express_pagos_owner_select"
  on express_pagos for select
  using (
    exists (
      select 1 from express_invitaciones ei
      where ei.id = express_pagos.invitacion_id
      and ei.user_id = auth.uid()
    )
  );

drop policy if exists "express_pagos_owner_insert" on express_pagos;
create policy "express_pagos_owner_insert"
  on express_pagos for insert
  with check (
    exists (
      select 1 from express_invitaciones ei
      where ei.id = express_pagos.invitacion_id
      and ei.user_id = auth.uid()
    )
  );

-- Nota: la confirmación de pagos (UPDATE estado='confirmado') la hace el admin
-- desde /admin-express usando la Service Role Key en el backend, no el anon key.
-- Por eso no se define aquí una policy pública de UPDATE.

-- ------------------------------------------------------------
-- 4. express_correcciones_log (auditoría, recomendada)
-- ------------------------------------------------------------
create table if not exists express_correcciones_log (
  id uuid primary key default gen_random_uuid(),
  invitacion_id uuid not null references express_invitaciones(id) on delete cascade,
  campo_modificado text not null,
  valor_anterior text,
  valor_nuevo text,
  created_at timestamptz not null default now()
);

create index if not exists idx_express_correcciones_invitacion on express_correcciones_log(invitacion_id);

alter table express_correcciones_log enable row level security;

drop policy if exists "express_correcciones_owner_select" on express_correcciones_log;
create policy "express_correcciones_owner_select"
  on express_correcciones_log for select
  using (
    exists (
      select 1 from express_invitaciones ei
      where ei.id = express_correcciones_log.invitacion_id
      and ei.user_id = auth.uid()
    )
  );

drop policy if exists "express_correcciones_owner_insert" on express_correcciones_log;
create policy "express_correcciones_owner_insert"
  on express_correcciones_log for insert
  with check (
    exists (
      select 1 from express_invitaciones ei
      where ei.id = express_correcciones_log.invitacion_id
      and ei.user_id = auth.uid()
    )
  );

-- ------------------------------------------------------------
-- 5. express_ia_generaciones (control de costo IA, recomendada)
-- ------------------------------------------------------------
create table if not exists express_ia_generaciones (
  id uuid primary key default gen_random_uuid(),
  invitacion_id uuid references express_invitaciones(id) on delete cascade,
  tipo_texto text not null,
  prompt_usado text,
  resultado text,
  tokens_usados int,
  costo_estimado numeric(10,6),
  created_at timestamptz not null default now()
);

create index if not exists idx_express_ia_invitacion on express_ia_generaciones(invitacion_id);

alter table express_ia_generaciones enable row level security;

-- Esta tabla solo la escribe el backend (route handler con service role).
-- El dueño de la invitación puede leerla si quiere ver su historial.
drop policy if exists "express_ia_owner_select" on express_ia_generaciones;
create policy "express_ia_owner_select"
  on express_ia_generaciones for select
  using (
    exists (
      select 1 from express_invitaciones ei
      where ei.id = express_ia_generaciones.invitacion_id
      and ei.user_id = auth.uid()
    )
  );

-- ------------------------------------------------------------
-- 6. Storage bucket: express-media
-- ------------------------------------------------------------
-- Crea el bucket si no existe (privado por defecto; el acceso público
-- de lectura se controla con la policy de abajo, solo para archivos
-- de invitaciones publicadas se recomienda servir vía URL firmada o
-- marcar el bucket como público de solo lectura, según prefieras).

insert into storage.buckets (id, name, public)
values ('express-media', 'express-media', true)
on conflict (id) do nothing;

-- Policy: el dueño puede subir/editar/borrar solo dentro de su propia carpeta
-- (la ruta debe ser express-media/{user_id}/{invitacion_id}/archivo.ext)
drop policy if exists "express_media_owner_insert" on storage.objects;
create policy "express_media_owner_insert"
  on storage.objects for insert
  with check (
    bucket_id = 'express-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "express_media_owner_update" on storage.objects;
create policy "express_media_owner_update"
  on storage.objects for update
  using (
    bucket_id = 'express-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "express_media_owner_delete" on storage.objects;
create policy "express_media_owner_delete"
  on storage.objects for delete
  using (
    bucket_id = 'express-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Lectura pública (necesaria para que las plantillas HTML públicas muestren
-- las fotos y la música sin necesidad de autenticación del visitante).
drop policy if exists "express_media_public_select" on storage.objects;
create policy "express_media_public_select"
  on storage.objects for select
  using (bucket_id = 'express-media');

-- ============================================================
-- FIN DE LA MIGRACIÓN
-- ============================================================
-- Verificación rápida después de ejecutar:
--   select table_name from information_schema.tables
--   where table_name like 'express_%';
--
--   select * from storage.buckets where id = 'express-media';
-- ============================================================
