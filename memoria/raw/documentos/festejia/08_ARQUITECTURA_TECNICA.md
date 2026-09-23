---
title: Arquitectura Técnica y Estructura del Software
tags:
  - festejia/tecnico
  - nextjs
  - codigo
  - arquitectura
updated: 2026-09-23
---

# 💻 Arquitectura Técnica y Estructura del Software

Festejia está construido como una aplicación web moderna de alto rendimiento, optimizada para velocidad de carga instantánea en conexiones móviles.

---

## 1. Stack Tecnológico

- **Framework Web:** Next.js 16.3.5 (App Router, Turbopack).
- **Librería UI:** React 19 (`'use client'` para interactividad, Server Components para páginas estáticas).
- **Estilos y CSS:**
  - CSS Modular puro y nativo para máxima velocidad y cero sobrecarga de runtime.
  - `app/globals.css`: Sistema de diseño base, variables CSS, componentes y media queries.
  - `app/premium-polish.css`: Capa de estilo editorial, micro-interacciones, mockup del teléfono y adaptabilidad ultra-fina.
- **Entorno:** Node.js / Vercel / Servidor Linux con HTTPS.

---

## 2. Mapa de Rutas de la Aplicación (`app/`)

### Rutas Públicas (Landing y Catálogo)
- `/`: Portada principal (Hero con teléfono interactivo, colecciones, planes, comparativa, live dashboard, FAQ, formulario de contacto y botón WhatsApp).
- `/bodas`: Colección de bodas con selector de diseño.
- `/quince`: Colección de 15 años.
- `/graduaciones`: Colección de graduaciones (modo teléfono oscuro).
- `/bautizos`: Colección de bautizos y eventos infantiles.

### Rutas de Autoservicio (Festejia Express)
- `/express`: Landing comercial de Festejia Express.
- `/express/registro`: Creación de cuenta de cliente.
- `/express/login`: Inicio de sesión de cliente.
- `/express/dashboard`: Panel donde el usuario ve sus invitaciones creadas.
- `/express/dashboard/nueva`: Creación de una nueva invitación paso a paso.
- `/express/dashboard/editor/[id]`: Editor visual interactivo en vivo.
- `/express/dashboard/cuenta`: Gestión de perfil.
- `/express/dashboard/ayuda`: Centro de soporte.

### Rutas de Gestión y Validación
- `/login`: Acceso unificado para clientes y administradores.
- `/panel`: Panel del cliente para gestionar su evento.
- `/gestor`: Módulo para anfitriones del Plan Elegante.
- `/checkin`: Escáner QR de puerta para validar acceso de invitados.
- `/invitacion/[id]`: Renderizado dinámico de la invitación web final personalizada.

### Rutas de Administración (Protegidas)
- `/admin`: Panel central de control, altas de clientes y asignación de planes.
- `/admin-express`: Panel de verificación y aprobación de órdenes de Express.

### Rutas de API (`app/api/`)
- `/api/currency`: Endpoint que devuelve tipos de cambio internacionales en vivo en formato JSON.
- `/api/express/generate-text`: Generación de textos y dedicatorias mediante modelos de lenguaje / IA.
- `/api/admin/create-client`: Endpoint para dar de alta clientes y enlaces privados.
- `/api/admin/delete-user`: Endpoint de mantenimiento.
- `/api/admin/express-client-ids`: Gestión de identificadores únicos.

---

## 3. Módulos Críticos en `lib/`

- `lib/currency.js`:
  - Contiene la tasa fija `BOB_MARKET_RATE = 11.5`.
  - Diccionario completo de divisas mundiales (`LATAM_CURRENCIES` y `GLOBAL_CURRENCIES`).
  - Funciones exportadas: `detectUserCurrency()`, `convertPrice()`, `formatPrice()`, `getCurrencyMeta()`.
- `lib/config.js`:
  - Centraliza `WHATSAPP_NUMERO` y el constructor de URLs codificadas `waLink(mensaje)`.
- `lib/express/payments.js`:
  - Capa de abstracción para cobro del Plan Express con mensaje pre-armado hacia WhatsApp.
- `lib/useVisibleInterval.js`:
  - Hook personalizado que pausa automáticamente timers y animaciones pesadas cuando el elemento está fuera de la pantalla (`IntersectionObserver`), ahorrando batería y memoria en celulares.

---

Volver al índice: [[00_INDICE_MAESTRO]]
