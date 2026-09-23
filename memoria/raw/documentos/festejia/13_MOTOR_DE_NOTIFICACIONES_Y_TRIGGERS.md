# 13 - MOTOR DE NOTIFICACIONES, TRIGGERS Y SEGURIDAD AVANZADA

> Sistema de eventos, automatización de hitos, triggers en PostgreSQL, almacenamiento en la nube y auditoría de Inteligencia Artificial.

---

## 1. MOTOR DE NOTIFICACIONES Y HITOS (`lib/notificaciones.js`)

Festejia cuenta con un motor proactivo de notificaciones que acompaña emocionalmente a los anfitriones a lo largo de los meses previos a su evento.

### 1.1. Notificaciones por Hito de Confirmaciones (`evaluarHitos`)
A medida que los invitados confirman su asistencia, el sistema calcula automáticamente el porcentaje sobre el total de la lista y dispara alertas de celebración para mantener la motivación de la pareja:
- **Hito 25% (`hito_25`):** *"¡Alcanzaste el 25% de confirmaciones!"* (Icono: `🎉`).
- **Hito 50% (`hito_50`):** *"¡La mitad confirmó! Alcanzaste el 50%"* (Icono: `🎊`).
- **Hito 75% (`hito_75`):** *"¡Excelente! Ya tienes el 75% confirmado"* (Icono: `🥳`).
- **Hito 100% (`hito_100`):** *"¡Lista completa! 100% de confirmaciones"* (Icono: `👑`).

Para evitar notificaciones repetidas si un invitado cancela y otro vuelve a confirmar, la función `hitoYaNotificado(eventoId, tipo)` consulta la base de datos antes de registrar el evento.

### 1.2. Notificaciones de Cuenta Regresiva (Cronograma Temporal)
Alertas programadas basadas en la fecha del evento (`diasRestantes(fechaISO)`):
- **30 días antes (`dias_30`):** *"Faltan 30 días para tu evento"* (Icono: `📅`).
- **15 días antes (`dias_15`):** *"Faltan 15 días para tu evento"* (Icono: `⏳`).
- **7 días antes (`dias_7`):** *"Faltan 7 días — ¡ya casi es tu día!"* (Icono: `⚡`).
- **Un día antes (`manana`):** *"Mañana es tu gran día"* (Icono: `🌟`).
- **Día del Evento (`hoy`):** *"¡Hoy es tu evento! ¡Disfrútalo!"* (Icono: `💍`).

### 1.3. Eventos de Actividad de Invitados
Cada acción realizada por un invitado en su enlace web dispara una notificación con formato enriquecido:
- **Confirmación (`confirmacion`):** `"[Nombre] confirmó su asistencia"` (Icono: `✅`).
- **Rechazo (`rechazo`):** `"[Nombre] no podrá asistir"` (Icono: `❌`).
- **Modificación de pases (`cambio_acompanantes`):** `"[Nombre] modificó sus acompañantes"` (Icono: `👥`).
- **Cambio de estado (`cambio_respuesta`):** `"[Nombre] cambió su respuesta"` (Icono: `🔄`).
- **Mensaje de felicitación (`mensaje`):** `"[Nombre] dejó un mensaje"` (Icono: `💌`).

---

## 2. REGLAS EN BASE DE DATOS Y TRIGGERS DE SEGURIDAD

### 2.1. Trigger de Cumplimiento de Límites de Invitados (`validar_limite_invitados_por_plan`)
Ubicación: `scripts/premium-plan-enforcement.sql`.
Para evitar que un usuario malicioso o una herramienta externa intente insertar invitados por encima de su plan mediante llamadas directas a la API de Supabase, la base de datos cuenta con un trigger en PostgreSQL con privilegios `SECURITY DEFINER`:

```sql
create or replace function public.validar_limite_invitados_por_plan()
returns trigger
language plpgsql
security definer
as $$
declare
  limite integer;
  total_actual integer;
begin
  select case p.plan
    when 'exclusive' then 9999
    when 'premium' then 150
    else 50
  end into limite
  from profiles p
  join eventos e on e.user_id = p.id
  where e.id = new.evento_id and p.role = 'client';

  if limite is null then
    raise exception 'El evento no pertenece a un cliente activo';
  end if;

  select count(*) into total_actual
  from invitados i
  where i.evento_id = new.evento_id;

  if total_actual >= limite then
    raise exception 'El plan permite como máximo % invitados', limite;
  end if;

  return new;
end;
$$;
```
Este trigger se ejecuta `BEFORE INSERT ON invitados` en cada fila.

### 2.2. Trigger de Sello de Tiempo (`express_set_updated_at`)
Ubicación: `scripts/express-migration.sql`.
Trigger automático que actualiza la columna `updated_at = now()` en cada modificación de la tabla `express_invitaciones`.

---

## 3. ALMACENAMIENTO MULTIMEDIA EN LA NUBE (STORAGE)

- **Bucket Oficial:** `express-media` (configurado en Supabase Storage).
- **Estructura de Carpetas Segura:**
  ```text
  express-media/{user_id}/{invitacion_id}/{nombre_archivo}.[jpg|png|webp|mp3]
  ```
- **Políticas de Seguridad RLS:**
  - **Inserción, Actualización y Borrado (`express_media_owner_*`):** Restringidas para que cada anfitrión solo pueda escribir dentro del directorio que coincide con su `auth.uid()`.
  - **Lectura Pública (`express_media_public_select`):** Acceso público de lectura para que las plantillas web puedan mostrar las fotografías de la galería y reproducir el audio de fondo a los invitados sin requerir login.

---

## 4. MOTOR DE INTELIGENCIA ARTIFICIAL Y CONTROL DE GASTO

- **Ruta del Endpoint:** `/api/express/generate-text` (`app/api/express/generate-text/route.js`).
- **Proveedor y Modelo:** Moonshot AI Kimi, utilizando el modelo `kimi-k2.7-code` vía `https://api.moonshot.ai/v1/chat/completions`.
- **Protección de Llaves:** La variable `KIMI_API_KEY` vive exclusivamente en el servidor (Vercel Environment Variables). Nunca se envía al navegador.
- **Sistema de Respaldo (Fallback):** Si la API key no está presente o la conexión falla, el endpoint devuelve automáticamente textos de alta calidad pre-redactados para no frenar la experiencia del usuario.

### 4.1. Prevención de Abuso y Rate Limiting
- Exige autenticación obligatoria con JWT de Supabase.
- Valida la propiedad de la invitación antes de procesar el prompt.
- **Límite de Tasa:** Máximo **40 generaciones por hora por usuario**, verificado con consulta indexada en `idx_express_ia_user_created`.

### 4.2. Registro de Auditoría de IA (`express_ia_generaciones`)
Cada solicitud exitosa registra:
- `user_id` e `invitacion_id`.
- `tipo_texto` (bienvenida, historia, dress code, solo adultos, regalos, padres).
- `prompt_usado` y `resultado`.
- `tokens_usados` y `costo_estimado` para control financiero del backend.

---

## 5. OPTIMIZACIÓN DE RENDIMIENTO EN CLIENTE (`useVisibleInterval`)

Ubicación: `lib/useVisibleInterval.js`.
Hook de React personalizado que resuelve el consumo innecesario de batería y CPU en dispositivos móviles:
- Utiliza la API nativa `IntersectionObserver`.
- Pausa automáticamente los temporizadores (`setInterval`) cuando elementos como el `LiveDashboard` o las animaciones de `FeatureVisuals` salen del viewport del usuario al hacer scroll.
- Reactiva el intervalo inmediatamente cuando el usuario regresa a la sección.
