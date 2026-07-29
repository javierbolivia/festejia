-- ============================================================
-- FESTEJIA EXPRESS — Migración aditiva: editor de bloques
-- ============================================================
-- Este script SOLO agrega columnas nuevas a express_invitaciones.
-- No borra ni modifica ninguna columna existente (nombre1, nombre2,
-- fecha_evento, ceremonia_lugar, etc. permanecen intactas y siguen
-- siendo la fuente de verdad para el dashboard, pagos y WhatsApp).
--
-- 'contenido'  -> JSON con el contenido de TODOS los bloques del
--                 editor tipo Canva (portada, ceremonia, galería,
--                 dress-code, etc.), por tipo de bloque.
-- 'orden'      -> JSON con el arreglo de tipos de bloque en el orden
--                 elegido por el usuario (solo para los bloques
--                 marcados como reordenables en la plantilla).
--
-- Seguro de re-ejecutar gracias a IF NOT EXISTS.
-- ============================================================

alter table express_invitaciones
  add column if not exists contenido jsonb not null default '{}'::jsonb;

alter table express_invitaciones
  add column if not exists orden jsonb not null default '[]'::jsonb;

-- ============================================================
-- FIN DE LA MIGRACIÓN
-- ============================================================
-- Verificación rápida después de ejecutar:
--   select column_name from information_schema.columns
--   where table_name = 'express_invitaciones' and column_name in ('contenido','orden');
-- ============================================================
