---
tipo: resumen
tags: [festejia, cliente, panel, gestor, rsvp, checkin, websockets]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[10_PANEL_CLIENTE_Y_GESTOR|raw/documentos/festejia/10_PANEL_CLIENTE_Y_GESTOR.md]]"]
---

# Resumen de Fuente: Panel del Cliente, Gestor y Control de Acceso

- **Fuente cruda**: `raw/documentos/festejia/10_PANEL_CLIENTE_Y_GESTOR.md`
- **Materia**: Experiencia completa del anfitrión, enrutamiento post-login, WebSockets en vivo, exportación Excel y control QR en puerta.

## Tesis Central
Festejia segmenta la experiencia de post-autenticación según el nivel de plan: los anfitriones de Plan Clásico acceden a un gestor ágil sin distracciones (`/gestor`), mientras que los planes Elegante e Imperial disponen de un centro de mando en tiempo real (`/panel`) con suscripciones WebSockets y control de acceso móvil en puerta (`/checkin`).

## Puntos Clave
1. **Normalización de Credenciales y Router Post-Login (`/login`)**:
   - Usuario simple (ej. `maria_juan`) normalizado automáticamente a `maria_juan@festejia.local`.
   - Redirección automática según rol y plan: Express (`/express/dashboard`), Admin (`/admin`), Elegante/Imperial (`/panel`), Clásico (`/gestor`).
2. **Arquitectura en Tiempo Real (`/panel`)**:
   - Dos canales WebSockets de Supabase: `notif-[user.id]` (alertas de confirmación o rechazo) e `invitados-realtime-[evento.id]` (cambios en listas).
   - Campana interactiva con notificaciones no leídas y cálculo de tiempo relativo.
3. **Métricas y Rendimiento**:
   - KPI Grid de 7 tarjetas (Invitados, Pases, Confirmados, Pendientes, Rechazados, Enviadas, Ingresados).
   - Límite estricto de invitados: 150 para Plan Elegante (`premium`) e ilimitados (9999) para Plan Imperial (`exclusive`).
   - Componente `GuestRow` optimizado con `React.memo` y `useCallback` para listas masivas.
   - Exportación a `.csv` con codificación `UTF-8 BOM` para compatibilidad universal con Excel.
4. **Módulo de Recepción y Control QR (`/checkin`)**:
   - Selector nativo de cámara trasera (`facingMode: environment`).
   - Decodificación con `jsQR` de tokens con formato `festejia:UUID`.
   - Prevención de fraude: detecta tickets previamente escaneados mostrando la hora exacta de ingreso.
   - Búsqueda manual de emergencia y feedback háptico por vibración (`navigator.vibrate([100, 50, 100])`).

## Conexiones y Enlaces
- Conceptos: [[sistema-rsvp-inteligente]], [[checkin-qr]], [[triggers-postgresql-supabase]]
- Síntesis: [[festejia-especificacion-panel-cliente]]
- Entidades: [[festejia]], [[supabase|festejia]]
