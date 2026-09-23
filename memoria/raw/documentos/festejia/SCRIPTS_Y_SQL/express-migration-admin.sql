-- ============================================================
-- FESTEJIA EXPRESS — Migración aditiva: acceso de administrador
-- ============================================================
-- Este script SOLO agrega políticas RLS nuevas a express_invitaciones y
-- express_pagos. No borra ni modifica ninguna política existente (el
-- dueño de cada invitación sigue viendo y editando únicamente lo suyo).
--
-- Usa el mismo criterio de administrador que ya usa el panel Premium
-- existente (app/admin/page.js): profiles.role = 'admin'. No se toca
-- la tabla profiles ni su contenido, solo se referencia para decidir
-- si el usuario autenticado tiene permiso de admin.
--
-- Sin esto, /admin-express no podría ver ni confirmar pagos de otros
-- usuarios porque las políticas actuales son "solo el dueño".
--
-- Seguro de re-ejecutar gracias a DROP POLICY IF EXISTS.
-- ============================================================

drop policy if exists "express_invitaciones_admin_all" on express_invitaciones;
create policy "express_invitaciones_admin_all"
  on express_invitaciones for all
  using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  )
  with check (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

drop policy if exists "express_pagos_admin_all" on express_pagos;
create policy "express_pagos_admin_all"
  on express_pagos for all
  using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  )
  with check (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ============================================================
-- FIN DE LA MIGRACIÓN
-- ============================================================
-- Verificación rápida después de ejecutar:
--   select policyname from pg_policies
--   where tablename in ('express_invitaciones','express_pagos')
--   and policyname like '%admin%';
-- ============================================================
