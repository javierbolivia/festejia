---
tipo: concepto
tags: [festejia, notificaciones, hitos, tiempo-real, websockets, campana, engagement]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-13-notificaciones-triggers-bd]]", "[[SCRIPTS_Y_SQL/setup-notificaciones.js|raw/documentos/festejia/SCRIPTS_Y_SQL/setup-notificaciones.js]]"]
---

# Motor de Notificaciones Proactivas y Disparadores por Hito

El **motor de notificaciones** de [[festejia]] mantiene al anfitrión informado de forma proactiva sobre el avance logístico de su evento sin requerir que consulte manualmente su lista una y otra vez.

---

## 1. Disparadores por Hito de Asistencia (Milestones)

Se evalúan automáticamente cuando un invitado confirma o rechaza su invitación en la web:

| Hito Alcanzado | Condición Algorítmica | Mensaje Notificado al Anfitrión |
|:---:|---|---|
| **25% de Confirmación** | `confirmados / total >= 0.25` | *"¡Un cuarto de tu fiesta confirmado! 25% de tus invitados ya aseguraron su asistencia."* |
| **50% de Confirmación** | `confirmados / total >= 0.50` | *"¡Mitad del salón listo! La mitad de tus invitados ha confirmado su presencia."* |
| **75% de Confirmación** | `confirmados / total >= 0.75` | *"¡Casi al completo! El 75% de tus asistentes ya tienen su pase activo."* |
| **100% de Aforo** | `confirmados / total >= 1.00` | *"¡Aforo completo! Todos tus pases han sido confirmados. ¡Felicidades!"* |

---

## 2. Disparadores Temporales (Cuenta Regresiva)

Generados por un proceso programado según los días restantes para la fecha del evento:
- **A 30 días:** *"Falta 1 mes para tu evento. Momento ideal para revisar los pendientes de confirmación."*
- **A 15 días:** *"Faltan 2 semanas. Te sugerimos enviar un recordatorio por WhatsApp a quienes no confirmaron."*
- **A 7 días:** *"¡Última semana! Descarga tu lista en Excel para entregarla al salón de eventos y catering."*
- **A 1 día:** *"¡Mañana es el gran día! Recuerda que el personal de recepción puede usar `/checkin` para escanear tickets."*
- **El día del evento:** *"¡Hoy celebramos! Te deseamos un momento inolvidable."*

---

## 3. Arquitectura de Entrega
1. **Inserción en Tabla `notificaciones`**:
   Campos: `id`, `user_id`, `evento_id`, `tipo` (`hito`, `rsvp`, `sistema`), `titulo`, `mensaje`, `leida` (boolean), `created_at`.
2. **Difusión en Tiempo Real**:
   Emitida inmediatamente a través de la suscripción WebSocket `notif-[user.id]`.
3. **Interfaz de la Campana (`panel-header`)**:
   - Muestra contador de no leídas en rojo.
   - Botón *"Marcar todas como leídas"*.
   - Renderizado con tiempo relativo amigable ("Hace 5 min", "Hace 2h").

---

## Enlaces Relacionados
- [[festejia-especificacion-panel-cliente]]
- [[triggers-postgresql-supabase]]
- [[festejia-arquitectura-backend-base-datos]]
