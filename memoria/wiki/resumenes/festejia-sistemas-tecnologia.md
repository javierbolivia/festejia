---
tipo: resumen
tags: [festejia, sistemas, tecnologia, rsvp, qr, checkin, express]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[05_SISTEMAS_Y_TECNOLOGIA|raw/documentos/festejia/05_SISTEMAS_Y_TECNOLOGIA.md]]"]
---

# Resumen de Fuente: Sistemas, Tecnología y Flujo RSVP Inteligente

- **Fuente cruda**: `raw/documentos/festejia/05_SISTEMAS_Y_TECNOLOGIA.md`
- **Materia**: Infraestructura de software, RSVP, código QR de acceso y Festejia Express.

## Tesis Central
Festejia trasciende el concepto tradicional de agencia gráfica para convertirse en una plataforma de software logístico para eventos, resolviendo con precisión los problemas de transferencias no autorizadas de invitaciones, exceso de acompañantes y desorganización en el control de acceso a los salones.

## Componentes Tecnológicos

### 1. Sistema de Confirmación Inteligente (RSVP)
- Enlaces web únicos intransferibles (`/invitacion/xyz123`).
- Inyección de pases exactos y asignación de mesas predeterminada.
- Restricción estricta de confirmación: el invitado no puede superar su cupo.
- Generación de **código QR dinámico** instantáneo al confirmar.
- Validación de acceso mediante [[checkin-qr]] en puerta (`/checkin`) para evitar duplicaciones o reingresos fraudulentos.

### 2. Live Dashboard (Panel de Control del Anfitrión)
- Métricas en tiempo real: confirmados, pendientes, rechazados y porcentaje de ocupación del aforo.
- Feed en vivo de actividad por evento.
- Gestor visual de mesas.

### 3. Festejia Express (SaaS DIY con IA)
- Autoservicio instantáneo en `/express`.
- Editor en tiempo real `/express/dashboard/editor/[id]`.
- Asistente de inteligencia artificial `/api/express/generate-text` para redacción de votos, dedicatorias y frases.
- Pasarela asistida en `lib/express/payments.js` con orden pre-generada hacia WhatsApp.

### 4. Módulos de Administración Interna
- `/admin`: Control maestro de clientes y planes.
- `/admin-express`: Verificación y publicación de órdenes Express.
- `/gestor`: Interfaz simplificada para anfitriones del Plan Elegante.

## Conexiones y Enlaces
- Conceptos: [[sistema-rsvp-inteligente]], [[checkin-qr]], [[invitacion-web-interactiva]]
- Entidades: [[festejia]], [[festejia-express]], [[nextjs]]
- Relacionado con: [[festejia-arquitectura-tecnica]]
