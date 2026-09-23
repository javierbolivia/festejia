---
tipo: resumen
tags: [festejia, postgresql, supabase, triggers, rls, seguridad, ia, storage]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[13_MOTOR_DE_NOTIFICACIONES_Y_TRIGGERS|raw/documentos/festejia/13_MOTOR_DE_NOTIFICACIONES_Y_TRIGGERS.md]]"]
---

# Resumen de Fuente: Motor de Notificaciones, Triggers de BD y Seguridad

- **Fuente cruda**: `raw/documentos/festejia/13_MOTOR_DE_NOTIFICACIONES_Y_TRIGGERS.md`
- **Materia**: Triggers a nivel PostgreSQL, reglas RLS de almacenamiento, límites de plan y seguridad en microservicios de IA.

## Tesis Central
Para evitar que clientes maliciosos alteren peticiones HTTP o saturen servidores, Festejia impone la lógica crítica de negocio en el propio motor de base de datos (PostgreSQL/Supabase) mediante triggers transaccionales, complementado con políticas RLS de almacenamiento multimedia y limitadores de tasa (*rate limiters*) en el consumo de IA.

## Puntos Clave
1. **Triggers Críticos en PostgreSQL**:
   - `validar_limite_invitados_por_plan`: Trigger `BEFORE INSERT` en `invitados`. Consulta el plan en `profiles` del anfitrión. Si es `plus` (Clásico) bloquea al superar 50; si es `premium` (Elegante) bloquea al superar 150; si es `exclusive` (Imperial) permite hasta 9999. Emite excepción `RAISE EXCEPTION` protegiendo la base de datos contra bypass de frontend.
   - `express_set_updated_at`: Actualiza automáticamente `updated_at = now()` en cada modificación de `express_invitaciones`.
2. **Motor de Notificaciones Proactivas**:
   - **Hitos de Porcentaje**: Notificaciones al anfitrión al alcanzar 25%, 50%, 75% y 100% de invitados confirmados.
   - **Cuenta Regresiva**: Alertas de seguimiento temporal a 30 días, 15 días, 7 días, 1 día y el mismo día del evento.
3. **Almacenamiento Multimedia (Bucket `express-media`)**:
   - Almacenamiento en Supabase Storage con políticas RLS: los usuarios solo pueden subir o eliminar archivos en su propia carpeta `express-media/{user_id}/*`.
4. **Seguridad y Auditoría en Microservicio de IA**:
   - Integración con Moonshot AI Kimi (`kimi-k2.7-code`).
   - Limitador de tasa (*Rate Limiter*): máximo 40 peticiones por hora por IP/usuario.
   - Tabla de auditoría `express_ia_generaciones`: registra fecha, usuario, tono, prompt y dedicatoria generada para control de abuso y costes.

## Conexiones y Enlaces
- Conceptos: [[triggers-postgresql-supabase]], [[motor-notificaciones-hitos]], [[seguridad-ia-kimi-moonshot]]
- Síntesis: [[festejia-arquitectura-backend-base-datos]]
- Entidades: [[festejia]], [[festejia-express]]
