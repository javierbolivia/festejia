---
tipo: resumen
tags: [festejia, arquitectura, nextjs, react, frontend, backend, rendimiento]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[08_ARQUITECTURA_TECNICA|raw/documentos/festejia/08_ARQUITECTURA_TECNICA.md]]"]
---

# Resumen de Fuente: Arquitectura Técnica y Estructura del Software

- **Fuente cruda**: `raw/documentos/festejia/08_ARQUITECTURA_TECNICA.md`
- **Materia**: Stack tecnológico, mapa de rutas App Router, APIs y utilidades críticas.

## Tesis Central
La arquitectura técnica de Festejia prioriza la carga ultra-rápida y el consumo mínimo de datos/batería en dispositivos móviles mediante Next.js 16, React 19 y CSS modular nativo sin sobrecarga de frameworks pesados, complementado con utilidades especializadas para el manejo de divisas y hooks de visibilidad.

## Mapa Arquitectónico

### 1. Stack Tecnológico
- **Framework**: Next.js 16.3.5 (App Router, compilación con Turbopack).
- **Librería UI**: React 19 con balance entre Server Components y `'use client'`.
- **Estilos**: CSS modular nativo (`globals.css` para diseño base y `premium-polish.css` para microinteracciones y mockup móvil).

### 2. Mapa de Rutas Clave (`app/`)
- **Públicas**: `/` (Landing principal con Hero interactivo), `/bodas`, `/quince`, `/graduaciones`, `/bautizos`.
- **SaaS Express**: `/express`, `/express/registro`, `/express/login`, `/express/dashboard`, `/express/dashboard/editor/[id]`.
- **Gestión y Operativa**: `/login`, `/panel`, `/gestor`, `/checkin` (escáner QR), `/invitacion/[id]`.
- **Administración**: `/admin` (control global de clientes), `/admin-express` (validación de pagos).
- **APIs**: `/api/currency` (tasas en vivo), `/api/express/generate-text` (IA generativa), `/api/admin/*` (gestión de usuarios).

### 3. Módulos Críticos (`lib/`)
- `lib/currency.js`: Lógica de tasa fija `BOB_MARKET_RATE = 11.5`, detección automática y conversión.
- `lib/config.js`: Centralización del número de WhatsApp y constructor de URLs.
- `lib/express/payments.js`: Capa de pago y checkout asistido por chat.
- `lib/useVisibleInterval.js`: Hook de optimización con `IntersectionObserver` que detiene timers fuera de pantalla.

## Conexiones y Enlaces
- Conceptos: [[optimizacion-rendimiento-movil]], [[politica-cambiaria-mercado]], [[checkin-qr]]
- Entidades: [[festejia]], [[nextjs]], [[react]], [[festejia-express]]
- Síntesis: [[festejia-guia-desarrollo-web]]
