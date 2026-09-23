---
tipo: resumen
tags: [festejia, admin, backend, rbac, rollback, supabase]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[09_PANEL_ADMINISTRADOR|raw/documentos/festejia/09_PANEL_ADMINISTRADOR.md]]"]
---

# Resumen de Fuente: Panel Administrador Bespoke y Express

- **Fuente cruda**: `raw/documentos/festejia/09_PANEL_ADMINISTRADOR.md`
- **Materia**: Control maestro de operaciones, gestión de cuentas Bespoke, validación de pagos Express y APIs con Service Role.

## Tesis Central
El sistema de administración de Festejia desacopla la gestión en dos interfaces especializadas: `/admin` para los planes boutique de alta gama (Clásico, Elegante, Imperial) con transacciones atómicas y rollback, y `/admin-express` para el flujo ágil de aprobación de órdenes y expiración automática de invitaciones de autoservicio.

## Puntos Clave
1. **Control de Acceso y RBAC**:
   - Verificación de sesión en cliente con Supabase Auth y validación de `profiles.role === 'admin'`.
   - APIs de servidor (`/api/admin/*`) autenticadas mediante JWT y ejecutadas con **Service Role Key**.
2. **Mapeo de Planes en Base de Datos**:
   - `plus` ➔ Plan Clásico ($45 USD / Bs. 520)
   - `premium` ➔ Plan Elegante ($75 USD / Bs. 860)
   - `exclusive` ➔ Plan Imperial ($110 USD / Bs. 1.270)
3. **Flujo de Creación con Rollback Atómico (`/api/admin/create-client`)**:
   - Genera usuario virtual `${usuario}@festejia.local`.
   - Inserta en `profiles`, `clientes_login` y `eventos`.
   - Si ocurre cualquier error, ejecuta limpieza reversa automática eliminando registros en cascada y borrando el usuario de Auth.
4. **Operativa Express (`/admin-express`)**:
   - Bandeja de pagos pendientes (`express_pagos`) filtrando por `estado = 'pendiente'`.
   - Aprobación de pago de publicación (Bs. 200) pasa la invitación a `publicada`, guarda `fecha_publicacion = now()` y fija la expiración automática en `fecha_evento + 1 día`.
   - Pagos de correcciones extra (Bs. 30) suman automáticamente `+2` al saldo de correcciones.
   - Acciones de publicación manual sin pago (cortesías/influencers), despublicación y borrado permanente.

## Conexiones y Enlaces
- Conceptos: [[triggers-postgresql-supabase]], [[modelo-comercial-festejia]]
- Síntesis: [[festejia-especificacion-panel-admin]], [[festejia-arquitectura-backend-base-datos]]
- Entidades: [[festejia]], [[festejia-express]]
