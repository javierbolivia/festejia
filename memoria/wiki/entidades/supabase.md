---
tipo: entidad
tags: [backend, base-datos, postgresql, auth, storage, websockets, supabase]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-arquitectura-backend-base-datos]]", "[[08_ARQUITECTURA_TECNICA|raw/documentos/festejia/08_ARQUITECTURA_TECNICA.md]]"]
---

# Supabase

## Definición
**Supabase** es una plataforma de desarrollo backend de código abierto (*Backend-as-a-Service*, BaaS) construida sobre PostgreSQL, que proporciona autenticación, base de datos relacional en tiempo real (WebSockets), almacenamiento multimedia de archivos y políticas de seguridad a nivel de fila (RLS).

## Rol en la Arquitectura de Festejia
En el ecosistema de [[festejia]]:
1. **Autenticación (Auth)**:
   - Gestiona las credenciales de clientes Bespoke (cuentas virtuales `${usuario}@festejia.local`) y clientes Express.
2. **Base de Datos Relacional y Triggers**:
   - Aloja el esquema de 9 tablas centrales y ejecuta triggers en PL/pgSQL como [[triggers-postgresql-supabase|validar_limite_invitados_por_plan]].
3. **WebSockets en Tiempo Real**:
   - Alimenta las alertas de confirmación instantánea en el Live Dashboard del anfitrión mediante los canales `notif-[user.id]` e `invitados-realtime-[evento.id]`.
4. **Almacenamiento (Storage)**:
   - Aloja el bucket `express-media` con aislamiento RLS por usuario para las fotografías de las invitaciones.

## Enlaces Relacionados
- [[triggers-postgresql-supabase]]
- [[motor-notificaciones-hitos]]
- [[festejia-arquitectura-backend-base-datos]]
- [[festejia-especificacion-panel-admin]]
- [[festejia-especificacion-panel-cliente]]
