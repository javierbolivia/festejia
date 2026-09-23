---
tipo: entidad
tags: [framework, tecnologia, javascript, react, web]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-arquitectura-tecnica]]"]
---

# Next.js

## Definición
**Next.js** es un framework web de React para producción desarrollado por Vercel, que permite renderizado en servidor (SSR), generación de sitios estáticos (SSG), componentes de servidor (RSC) y optimización nativa de rutas.

## Uso en el Proyecto Festejia
En la arquitectura de [[festejia]]:
- **Versión**: Next.js 16.3.5 utilizando el motor de empaquetado **Turbopack**.
- **Enfoque Arquitectónico**: *App Router* con división clara entre Server Components para páginas de catálogo/SEO y Client Components (`'use client'`) para interactividad, modales y reproductor de música.
- **Rutas de API**: Aloja los endpoints de microservicios como `/api/currency` y `/api/express/generate-text`.

## Enlaces Relacionados
- [[react]]
- [[festejia-arquitectura-tecnica]]
- [[optimizacion-rendimiento-movil]]
