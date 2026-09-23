---
tipo: concepto
tags: [diseno, css, ui, ux, branding, tipografia, paleta, tokens]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-vision-marca]]", "[[festejia-arquitectura-tecnica]]", "[[01_VISION_Y_MARCA|raw/documentos/festejia/01_VISION_Y_MARCA.md]]"]
---

# Sistema de Diseño Editorial y Tokens Visuales de Festejia

El **Sistema de Diseño Editorial** de [[festejia]] define las variables visuales, paletas cromáticas, reglas tipográficas y componentes CSS que confieren a las [[invitacion-web-interactiva|invitaciones web]] un acabado de alta gama similar al de publicaciones editoriales de lujo.

---

## 1. Tokens Cromáticos y Variables CSS

### A. Paleta Principal
- **Dorado Champagne Primario**: `#d6b06a`
- **Acento Dorado Oscuro**: `#caa052`
- **Degradado Metálico de Autor**:
  ```css
  --gold-metallic-gradient: linear-gradient(
    135deg, 
    #ffffff 0%, 
    #f6dfb8 35%, 
    #d6b06a 70%, 
    #caa052 100%
  );
  ```
- **Negro Obsidiana / Fondo Profundo**: `#11100f` y `#181512`
  - Uso: Fondo del Hero, tarjetas VIP (Plan Imperial), navbar nocturna y pie de página.
- **Marfil Suave / Papel Editorial**: `#f5f1e9`, `#fbfaf7` y `#fffaf0`
  - Uso: Secciones claras, fondos de tarjetas y cuerpo de lectura.

### B. Acentos Semánticos y de Estado
- **Verde Esmeralda**: `#166534` (fondo) / `#22c55e` (borde/texto) / `#25d366` (icono WhatsApp).
  - Uso: Invitados confirmados, pases activos y botón flotante de WhatsApp.
- **Dorado Alerta**: `#d6b06a`
  - Uso: Invitados pendientes de confirmación y medallas de planes.
- **Vino Tinto / Exclusiones**: `#991b1b` (fondo) / `#ef4444` (alerta).
  - Uso: Invitados que declinaron asistencia y advertencias del sistema RSVP.

---

## 2. Tipografía y Jerarquía Visual

| Nivel | Familias Tipográficas | Clasificación | Propósito de Uso |
|---|---|---|---|
| **Display / H1 / H2** | *Cormorant Garamond*, *Playfair Display* | Serif clásica | Títulos principales, nombres de novios/festejados (con itálicas italianas para máxima emotividad). |
| **Cuerpo / Datos** | *Inter*, *Montserrat*, *Raleway* | Sans-serif geométrica | Horarios, direcciones, contadores regresivos, listas de invitados y números de pases. |
| **Monospace / Código** | *JetBrains Mono*, *Fira Code* | Monoespaciada | Códigos de orden (`EXP-XXXX`), slugs de invitación y tokens de acceso. |

---

## 3. Implementación en Hojas de Estilo

### `app/globals.css`
Define las variables globales `:root`, el reseteo de márgenes, la fluidez tipográfica y la estructura base de componentes:
```css
:root {
  --color-gold: #d6b06a;
  --color-gold-dark: #caa052;
  --color-obsidian: #11100f;
  --color-ivory: #f5f1e9;
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
}
```

### `app/premium-polish.css`
Capa encargada de los acabados refinados:
- **Shimmer y Brillo de Bordes**: Animaciones `@keyframes shimmer` para los bordes de la tarjeta del Plan Imperial.
- **Simulador de Teléfono Móvil (*Mobile Device Shell*)**: Maqueta con ratio `9:19.5`, esquinas redondeadas (`border-radius: 44px`), isla dinámica o notch superior y sombra de profundidad (`box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45)`).

---

## Enlaces Relacionados
- [[invitacion-web-interactiva]]
- [[catalogo-colecciones-modelos]]
- [[festejia-vision-marca]]
- [[festejia-guia-desarrollo-web]]
