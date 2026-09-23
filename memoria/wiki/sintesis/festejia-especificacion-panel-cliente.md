---
tipo: sintesis
tags: [festejia, cliente, anfitrion, panel, gestor, rsvp, dashboard, express, websockets, checkin]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-10-panel-cliente-gestor]]", "[[10_PANEL_CLIENTE_Y_GESTOR|raw/documentos/festejia/10_PANEL_CLIENTE_Y_GESTOR.md]]", "[[festejia-arquitectura-backend-base-datos]]"]
---

# Especificación Completa del Panel de Cliente, Gestor y Check-in

Este documento describe la experiencia interactiva, técnica y operativa de los anfitriones de [[festejia]] al gestionar sus celebraciones, cubriendo el **Router de Login**, el **Live Dashboard**, el **Gestor Lite**, el **Panel Express** y el módulo de **Check-in en Puerta**.

---

## 1. Sistema de Acceso y Router Inteligente (`/login`)
- **Autenticación**: Supabase Auth con normalización de usuario amigable:
  ```javascript
  const email = usuario.includes('@') ? usuario : usuario + '@festejia.local';
  ```
- **Enrutamiento por Rol y Plan**:
  1. Si está en `express_clientes` ➔ Redirige a `/express/dashboard`.
  2. Si `profiles.role === 'admin'` ➔ Redirige a `/admin`.
  3. Si `plan === 'premium'` (Elegante) o `plan === 'exclusive'` (Imperial) ➔ Redirige a `/panel` (Live Dashboard completo).
  4. Si `plan === 'plus'` (Clásico) ➔ Redirige a `/gestor` (Gestor Lite).

---

## 2. El Live Dashboard para Planes Elegante e Imperial (`/panel`)

### A. Arquitectura WebSockets en Tiempo Real
- **Canal Personal `notif-[user.id]`**: Escucha inserciones en `notificaciones` y actualiza la campana flotante superior sin recargar la página.
- **Canal de Evento `invitados-realtime-[evento.id]`**: Escucha cualquier cambio en la tabla `invitados` para sincronizar métricas al instante.

### B. Barra de Progreso y Cuenta Regresiva
- **Countdown Bar**: Cálculo de días restantes hacia `fecha_evento` ("X días para tu evento" / "¡Hoy es tu gran día!").
- **Barra de Progreso de Aforo**:
  $$\text{Porcentaje Confirmados} = \left(\frac{\text{Confirmados}}{\text{Total Invitados}}\right) \times 100$$
  Leyenda cromática: Verde (confirmados), Amarillo (pendientes), Rojo (rechazados).

### C. Tablero de 7 Métricas (KPI Grid)
1. **Total Invitados**: Conteo de registros.
2. **Pases**: Suma total de cupos familiares (`num_pases`).
3. **Confirmados**: Asistencias ratificadas (Verde).
4. **Pendientes**: Enlaces sin respuesta (Amarillo).
5. **Rechazados**: Cupos liberados (Rojo).
6. **Enviadas**: Invitaciones compartidas por el anfitrión.
7. **Ingresados**: Personas que ya ingresaron físicamente por recepción (Azul).

### D. Tabla de Invitados de Alto Rendimiento
- **Límites de Invitados**:
  - Plan Elegante: **150 invitados**.
  - Plan Imperial: **Ilimitados (9999)**.
- **Optimización `GuestRow` con `React.memo`**: Aísla cada fila para que el buscador en vivo y los filtros no re-rendericen toda la lista, manteniendo 60 FPS en listas extensas.
- **Exportación a Excel / CSV**: Genera archivo descargable con encabezado `UTF-8 BOM` para compatibilidad inmediata con Microsoft Excel.
- **Acciones Rápidas**: Enlace pre-redactado de WhatsApp para enviar invitación, copiar link privado, marcar como enviada, editar y eliminar.

---

## 3. Gestor Lite para Plan Clásico (`/gestor`)
Para anfitriones del Plan Clásico ($45 / Bs. 520):
- Límite de **50 invitados**.
- Enfoque directo sin configuraciones complejas ni gestión de mesas.
- Lista simple con buscador para marcar quién asistirá.

---

## 4. Panel de Autoservicio Express (`/express/dashboard`)
- Listado de invitaciones con badges de estado (`Borrador`, `Pendiente de pago`, `Publicada`, `Expirada`).
- Creación de nueva invitación con código `EXP-XXXX`.
- Acceso al editor interactivo con los [[los-17-bloques-express]], compresión WebP y asistente de inteligencia artificial ([[seguridad-ia-kimi-moonshot]]).

---

## 5. Módulo de Recepción y Control QR (`/checkin`)
Diseñado para smartphones y tablets en la puerta del salón de fiestas:
1. **Acceso a Cámara Trasera**: Mediante `{ video: { facingMode: 'environment' } }`.
2. **Decodificación Continua**: Motor `jsQR` escaneando el frame del canvas en bucle `requestAnimationFrame`.
3. **Formato de Token Seguro**: `festejia:UUID` (ej. `festejia:8f7a9e21-4b12-4a01-9012-a1b2c3d4e5f6`).
4. **Validación y Prevención de Reingreso**:
   - **Pase Válido**: Muestra tarjeta verde con nombre, cupos autorizados y mesa asignada. Registra `ingresado_at = now()` en base de datos.
   - **Alerta de Fraude / Duplicado**: Tarjeta roja parpadeante indicando: *"¡Ticket ya utilizado! Ingresó a las 20:15"*.
   - **Vibración Háptica**: Emite señal háptica mediante `navigator.vibrate([100, 50, 100])` para alertar al guardia de recepción.
   - **Búsqueda Manual**: Permite buscar invitados por apellido si el teléfono del invitado se quedó sin batería.

---

## Enlaces Relacionados
- [[festejia-especificacion-panel-admin]]
- [[sistema-rsvp-inteligente]]
- [[checkin-qr]]
- [[triggers-postgresql-supabase]]
- [[motor-notificaciones-hitos]]
- [[festejia-arquitectura-backend-base-datos]]
