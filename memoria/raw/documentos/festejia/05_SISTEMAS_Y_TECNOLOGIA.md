---
title: Sistemas, Tecnología y Flujo RSVP
tags:
  - festejia/tecnologia
  - rsvp
  - qr
  - dashboard
  - express
updated: 2026-09-23
---

# ⚙️ Sistemas, Tecnología y Flujo RSVP Inteligente

Festejia no es solo una agencia de diseño gráfico: es una **plataforma tecnológica** construida para optimizar la logística y la experiencia de los invitados y organizadores.

---

## 1. El Sistema de Confirmación Inteligente (RSVP)

El buque insignia tecnológico de Festejia (incluido en el [[02_PLANES_Y_PRECIOS|Plan Imperial]] y disponible como addon) resuelve los tres dolores de cabeza más grandes de cualquier boda o fiesta:
1. Invitados que reenvían la invitación a personas no invitadas.
2. Invitados que confirman más personas de las asignadas.
3. Desorden en la recepción del salón al buscar mesas y listas impresas.

### ¿Cómo funciona el circuito técnico?
1. **Generación de Enlaces Únicos:** Cada invitado o familia recibe un enlace web parametrizado (ej. `festejia.com/invitacion/xyz123`).
2. **Personalización del Ticket:** Al abrir el link, el sistema lee los datos de la base de datos y muestra:
   - *"Familia González Morales"*
   - *"Tienes 3 pases asignados"*
   - *"Mesa asignada: Mesa 8"*
3. **Confirmación con Límites:** El invitado selecciona cuántos de sus pases confirmará (ej. 2 de 3) o si declina cortésmente. No puede exceder el límite asignado por el anfitrión.
4. **Generación Inmediata de QR de Acceso:** Una vez confirmada la asistencia, el sistema genera automáticamente un **código QR dinámico** en la pantalla del invitado.
5. **Control de Entrada en la Recepción (`/checkin`):**
   - El personal de recepción o los guardias abren el módulo `/checkin` en un smartphone o tablet.
   - Escanean el QR del invitado en la puerta.
   - La pantalla muestra: `✓ Acceso Permitido - Familia González (2 personas) - Mesa 8`.
   - El pase queda marcado como "Ingresado" evitando duplicados o reutilización del código.

---

## 2. El Live Dashboard (Panel en Tiempo Real)

El anfitrión cuenta con un panel interactivo que muestra:
- **Contador en Vivo:** Total Confirmados, Total Pendientes, Total No Asisten.
- **Barras de Ocupación:** Porcentaje de asistencia respecto al aforo total del salón.
- **Feed de Actividad en Vivo:** Notificaciones instantáneas cada vez que un invitado confirma, actualiza acompañantes o escanea su QR.
- **Gestión de Mesas:** Asignación visual de qué invitados van en cada mesa.

---

## 3. Festejia Express (Arquitectura DIY con IA)

Para el segmento que requiere inmediatez, Festejia Express cuenta con su propia infraestructura:
- **Landing y Registro:** `/express`, `/express/registro`, `/express/login`.
- **Editor en Tiempo Real:** `/express/dashboard/editor/[id]` permite al cliente editar nombres, fechas, mapas, itinerario y subir fotos directamente.
- **Generador de Textos con IA:** Endpoint `/api/express/generate-text` que crea dedicatorias, votos y frases para la invitación basadas en el tono del evento.
- **Flujo de Pago Express:** Abstracción en `lib/express/payments.js` que genera una orden con código interno y abre WhatsApp con un mensaje pre-estructurado para validación manual y activación instantánea.

---

## 4. Módulos de Administración Interna

- `/admin`: Panel central para crear credenciales de clientes, dar de alta invitaciones personalizadas y gestionar el catálogo.
- `/admin-express`: Panel específico para verificar órdenes de Express, comprobar comprobantes de pago y marcar invitaciones como publicadas.
- `/gestor`: Módulo ligero para clientes del Plan Elegante donde pueden consultar la lista de asistentes que confirmaron.

---

Volver al índice: [[00_INDICE_MAESTRO]] | Ver Operaciones: [[06_OPERACIONES_Y_VENTAS]]
