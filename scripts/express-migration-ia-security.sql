-- ============================================================
-- FESTEJIA EXPRESS — Seguridad del endpoint de IA
-- ============================================================
-- Corrige un hallazgo real: express_ia_generaciones tiene RLS activado
-- pero nunca tuvo una policy de INSERT, así que el registro de auditoría
-- de costo de IA fallaba en silencio desde su creación (el .then(()=>{})
-- del route handler descartaba el error sin loguearlo).
--
-- Agrega además una columna user_id directa (además de invitacion_id) para
-- poder hacer rate limiting por usuario con una sola consulta indexada,
-- sin necesidad de un JOIN contra express_invitaciones en cada request.
--
-- 100% aditivo. No modifica columnas ni políticas existentes de otras tablas.
-- Seguro de re-ejecutar (IF NOT EXISTS / DROP POLICY IF EXISTS).
-- ============================================================

alter table express_ia_generaciones
  add column if not exists user_id uuid references auth.users(id) on delete cascade;

create index if not exists idx_express_ia_user_created
  on express_ia_generaciones(user_id, created_at desc);

-- Política de INSERT que faltaba: el propio usuario autenticado puede
-- registrar sus generaciones de IA (el route handler ahora escribe
-- reenviando el JWT del usuario, no con el anon key "a secas").
drop policy if exists "express_ia_owner_insert" on express_ia_generaciones;
create policy "express_ia_owner_insert"
  on express_ia_generaciones for insert
  with check (auth.uid() = user_id);

-- Política de SELECT adicional por user_id directo (sin JOIN), usada por
-- el rate limiter del endpoint para contar generaciones recientes de forma
-- rápida. Postgres combina múltiples policies de SELECT con OR, así que
-- esto amplía el acceso de lectura existente sin quitarle nada a la policy
-- "express_ia_owner_select" (basada en JOIN contra express_invitaciones).
drop policy if exists "express_ia_owner_select_by_user" on express_ia_generaciones;
create policy "express_ia_owner_select_by_user"
  on express_ia_generaciones for select
  using (auth.uid() = user_id);

-- ============================================================
-- Verificación rápida después de ejecutar:
--   select column_name from information_schema.columns
--   where table_name = 'express_ia_generaciones' and column_name = 'user_id';
--
--   select policyname from pg_policies
--   where tablename = 'express_ia_generaciones';
-- ============================================================
