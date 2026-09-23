---
tipo: concepto
tags: [rendimiento, web, performance, mobile, react, frontend]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-arquitectura-tecnica]]"]
---

# Optimización de Rendimiento Móvil

## Definición
La **optimización de rendimiento móvil** en [[festejia]] comprende las decisiones arquitectónicas y patrones de código diseñados para que las [[invitacion-web-interactiva|invitaciones web]] carguen instantáneamente y consuman el mínimo de batería y ancho de banda en dispositivos celulares con conexiones variables (3G/4G).

## Principales Patrones Técnicos

### 1. Ausencia de Frameworks CSS Pesados
En lugar de cargar librerías con sobrecarga de runtime o clases utilitarias extensas, se utiliza CSS modular nativo puro. Esto reduce los archivos estáticos a menos de 40 KB comprimidos, logrando un *First Contentful Paint* (FCP) casi inmediato.

### 2. Hook de Visibilidad Inteligente (`useVisibleInterval`)
Las invitaciones web suelen incluir componentes activos como:
- Cuenta regresiva por segundo.
- Galería de fotos con pase automático.
- Animación de partículas o confeti.

Para evitar que estos procesos consuman batería y degraden la CPU mientras el usuario hace scroll hacia otras secciones, se implementa `lib/useVisibleInterval.js` empleando la API nativa de `IntersectionObserver`. Cuando el elemento sale del visor (*viewport*), el ciclo se pausa de forma transparente y se reanuda al volver a verse.

### 3. Carga Diferida y Optimización de Audio
- La música de fondo se carga de manera asíncrona (`audio.preload = "none"` o `"metadata"`) para no retrasar la carga del texto y las imágenes prioritarias.
- El reproductor interactúa con políticas de reproducción automática (*autoplay*) respetando el gesto inicial del usuario.

## Enlaces Relacionados
- [[react]]
- [[nextjs]]
- [[festejia-arquitectura-tecnica]]
