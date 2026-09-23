---
tipo: resumen
tags: [festejia, infraestructura, devops, vercel, supabase, commits, pagos-bolivia]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[16_DOCUMENTOS_ORIGINALES_Y_HISTORIAL|raw/documentos/festejia/16_DOCUMENTOS_ORIGINALES_Y_HISTORIAL.md]]"]
---

# Resumen de Fuente: Infraestructura, Historial de Commits y Pasarelas

- **Fuente cruda**: `raw/documentos/festejia/16_DOCUMENTOS_ORIGINALES_Y_HISTORIAL.md`
- **Materia**: Infraestructura en la nube, proveedores, control de versiones y hoja de ruta de pasarelas de pago bolivianas.

## Tesis Central
Festejia opera sobre un stack de producción sin servidores (serverless) altamente escalable y económico basado en Vercel, Supabase y Porkbun, con una estrategia evolutiva de cobros en Bolivia que avanza desde la atención humana por WhatsApp QR hasta la integración completa con pasarelas automatizadas como Libélula.

## Puntos Clave
1. **Infraestructura de Producción**:
   - **Hosting y CI/CD**: Vercel (`festejia/festejia`) con integración continua ligada al repositorio GitHub (`javierbolivia/festejia`).
   - **Base de Datos y Auth**: Supabase PostgreSQL administrado con RLS.
   - **Dominio y DNS**: Porkbun con gestión de registros DNS y certificados SSL automáticos.
2. **Historial de Commits y Evolución del Código**:
   - Trazabilidad documentada desde los primeros commits fundacionales (`262a518`) hasta la arquitectura modular de bloques y seguridad de IA (`8891b05`).
3. **Hoja de Ruta de Pasarelas de Pago para Bolivia**:
   - **Fase 1 (Vigente / Cero Comisión)**: Cobro manual asistido por WhatsApp mediante código QR Simple interbancario y validación visual en `/admin-express`.
   - **Fase 2 (Transición)**: Generación dinámica de enlaces de cobro de la pasarela **Libélula** para pagos automáticos con tarjeta de débito/crédito boliviana.
   - **Fase 3 (Automatización Total)**: Webhooks y API REST de Libélula para confirmación instantánea sin intervención de administradores.

## Conexiones y Enlaces
- Conceptos: [[politica-cambiaria-mercado]], [[triggers-postgresql-supabase]]
- Síntesis: [[festejia-hoja-de-ruta-pagos-bolivia]], [[festejia-guia-desarrollo-web]]
- Entidades: [[festejia]]
