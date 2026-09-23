---
tipo: resumen
tags: [festejia, plantillas, seo, opengraph, runtime, publico]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[12_PLANTILLAS_Y_SISTEMA_PUBLICO|raw/documentos/festejia/12_PLANTILLAS_Y_SISTEMA_PUBLICO.md]]"]
---

# Resumen de Fuente: Plantillas y Sistema Público de Invitaciones

- **Fuente cruda**: `raw/documentos/festejia/12_PLANTILLAS_Y_SISTEMA_PUBLICO.md`
- **Materia**: Motor de plantillas Bespoke y Express, runtime público, metadatos dinámicos OpenGraph y SEO para redes sociales.

## Tesis Central
El runtime público de Festejia garantiza que cuando un anfitrión comparte su enlace por WhatsApp, Facebook o Instagram, se despliegue una tarjeta interactiva enriquecida (*Rich Preview*) mediante generación dinámica de metadatos OpenGraph en el servidor, adaptando la experiencia entre plantillas Bespoke de alta costura y las 5 plantillas oficiales Express.

## Puntos Clave
1. **Runtime Público (`/invitacion/[id]` y `/e/[slug]`)**:
   - `generateMetadata()` en Next.js App Router inyecta dinámicamente títulos ("Nuestra Boda - Valeria & Mateo"), descripciones emotivas e imágenes de portada en miniatura.
   - Redirección limpia a URLs amigables mediante `window.location.replace()`.
2. **Plantillas Bespoke de Autor**:
   - `plantilla1`: Sobre virtual interactivo con animación 3D de apertura y **sello de lacre virtual**.
   - `plantilla2`: Estética Mármol & Oro con animaciones sutiles e inyección directa en el DOM.
3. **Las 5 Plantillas Oficiales Express**:
   - `plantilla-a` (Mármol): Acabado sobrio, elegante y contemporáneo.
   - `plantilla-b` (Clásica): Papelería tradicional en marfil y dorados.
   - `plantilla-c` (Romance): Tonos rosa palo, vino y acentos caligráficos.
   - `plantilla-d` (Jardín): Estética botánica en verde salvia y follaje.
   - `plantilla-e` (Moderna): Tipografía sans-serif limpia y minimalista.

## Conexiones y Enlaces
- Conceptos: [[motor-de-plantillas-festejia]], [[sistema-diseno-editorial]], [[invitacion-web-interactiva]]
- Entidades: [[festejia]], [[festejia-express]], [[nextjs]]
