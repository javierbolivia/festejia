---
tipo: resumen
tags: [festejia, express, editor, bloques, saas, sync]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[11_EXPRESS_STUDIO_Y_BLOQUES|raw/documentos/festejia/11_EXPRESS_STUDIO_Y_BLOQUES.md]]"]
---

# Resumen de Fuente: Express Studio de Diseño y Catálogo de Bloques

- **Fuente cruda**: `raw/documentos/festejia/11_EXPRESS_STUDIO_Y_BLOQUES.md`
- **Materia**: Editor visual drag & drop, arquitectura modular de 17 bloques y sincronización con base de datos.

## Tesis Central
Festejia Express implementa un editor visual interactivo desacoplado mediante el patrón *Registry*, permitiendo a usuarios autogestionar su invitación web combinando 17 bloques modulares independientes, manteniendo a la vez retrocompatibilidad con columnas legacy mediante sincronización automática en cada guardado.

## Puntos Clave
1. **Arquitectura del Editor (`lib/express/blocks/`)**:
   - `registry.js`: Mapeo central de cada bloque con su triada (`schema`, `Editor`, `Preview`).
   - `sync.js`: Extrae automáticamente del JSON modular los campos tradicionales (`nombre1`, `nombre2`, `fecha_evento`, `ceremonia_lugar`, `recepcion_lugar`, `dresscode`) para alimentar las columnas nativas de `express_invitaciones`.
   - `validator.js`: Valida campos obligatorios antes de permitir la solicitud de pago y publicación.
2. **Los 17 Bloques Modulares**:
   - Fundamentales: `informacion-principal`, `portada`, `cuenta-regresiva`.
   - Logísticos: `ceremonia`, `recepcion`, `itinerario`, `dress-code`.
   - Familia y Emoción: `padres`, `padrinos`, `historia`.
   - Multimedia: `galeria` (hasta 4 fotos), `musica`.
   - Utilidades: `regalos` (cuenta y QR bancario), `solo-adultos`, `confirmacion`, `redes-sociales` (hashtag de boda/evento), `configuracion`.
3. **Ciclo de Publicación y Correcciones**:
   - Generación de código interno `EXP-XXXX`.
   - Incluye 2 correcciones gratuitas con trazabilidad en la tabla `express_correcciones_log`.
   - Venta de paquetes de correcciones extra (+2 cambios por Bs. 30).

## Conexiones y Enlaces
- Conceptos: [[los-17-bloques-express]], [[motor-de-plantillas-festejia]], [[pipeline-compresion-imagenes-webp]]
- Entidades: [[festejia-express]]
