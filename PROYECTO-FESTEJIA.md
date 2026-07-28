# FESTEJIA — Documentación Completa del Proyecto

## Qué es Festejia

Festejia es una empresa de invitaciones digitales premium para eventos (bodas, XV años, graduaciones, bautizos). Ofrecemos páginas web interactivas personalizadas con música, animaciones, cuenta regresiva, mapa, confirmación de asistencia y panel de gestión.

**Slogan:** "Imagina el recuerdo, nosotros lo creamos"

---

## Stack Tecnológico

| Tecnología | Uso | URL |
|---|---|---|
| Next.js 14.2.5 | Framework frontend (React) | — |
| Vercel | Hosting y deploy | https://vercel.com |
| Supabase | Base de datos + Auth | https://supabase.com |
| GitHub | Repositorio de código | https://github.com/javierbolivia/festejia |
| Porkbun | Dominio (festejia.com) | https://porkbun.com |

---

## URLs Importantes

- **Producción:** https://www.festejia.com
- **GitHub:** https://github.com/javierbolivia/festejia
- **Vercel Dashboard:** https://vercel.com (login con tu cuenta)
- **Supabase Dashboard:** https://supabase.com (login con tu cuenta)

---

## Estructura del Proyecto

```
festejia/
├── app/
│   ├── layout.js              ← Layout global (fonts, metadata, SEO)
│   ├── page.js                ← Landing page principal
│   ├── globals.css            ← Todos los estilos (design system luxury)
│   ├── LiveDashboard.js       ← Componente dashboard animado (plan Imperial)
│   ├── FeatureVisuals.js      ← Micro-animaciones de la sección features
│   ├── bodas/page.js          ← Página categoría bodas
│   ├── quince/page.js         ← Página categoría XV años
│   ├── graduaciones/page.js   ← Página categoría graduaciones
│   ├── bautizos/page.js       ← Página categoría bautizos
│   ├── login/page.js          ← Login de usuarios
│   ├── panel/page.js          ← Panel de administración
│   ├── admin/page.js          ← Admin general
│   ├── gestor/page.js         ← Gestor de invitados
│   ├── checkin/page.js        ← Check-in con QR
│   └── invitacion/[id]/page.js ← Invitación dinámica por ID
├── public/
│   ├── plantilla1/            ← Template de invitación 1
│   └── plantilla2/            ← Template de invitación 2
├── vercel.json                ← Config de Vercel
├── package.json               ← Dependencias
└── .env.local                 ← Variables de entorno (Supabase keys)
```

---

## Planes y Precios

| Plan | USD | Bs. | Concepto |
|---|---|---|---|
| Clásico | $45 | 450 | Elige un diseño de la colección, personaliza info |
| Elegante | $75 | 700 | Personalización de colores, tipografía, ajustes visuales |
| Imperial | $110 | 950 | Diseño 100% desde cero + Sistema de Confirmación Inteligente |

**Reserva:** Bs. 100 — el resto al finalizar.

---

## Servicios Adicionales

| Servicio | Precio USD |
|---|---|
| Personalización Total | $100 |
| Entrega Express (48h) | $30 |
| Menú de Navegación | $15 |
| Save the Date | $30 |
| Dominio Propio | $120 |
| Visibilidad Extendida (+3 meses) | $30 |
| Ajustes Post-Entrega | $10 |

---

## Design System

### Paleta de colores
- Gold: `#c4a265`
- Gold Light: `#ddc99a`
- Gold Dark: `#9a7b45`
- Dark: `#0a0a0a`
- Ivory: `#faf9f7`
- Gray-50: `#f8f7f5`

### Fuentes
- Display (títulos): Playfair Display (serif)
- Body (textos): Inter (sans-serif)

### Espaciado (sistema de 8px)
- space-1: 4px → space-9: 128px

### Estilo visual
- Luxury, minimal, elegante, moderno
- Inspirado en: Apple, Stripe, Linear, Framer, Cartier
- Animaciones sutiles (fade, translateY, glow)
- Micro-interacciones en botones (shine, press effect, glow)

---

## Comandos Frecuentes

```bash
# Desarrollo local
npm run dev

# Build de producción
npx next build

# Deploy a producción
npx vercel --prod --yes

# Subir cambios a GitHub
git add .
git commit -m "descripción del cambio"
git push

# Bajar cambios en otra PC
git pull
npm install
```

---

## Componentes Principales

### LiveDashboard.js
Dashboard animado que simula confirmaciones en tiempo real. Muestra contadores (confirmados, pendientes, no asisten), feed de actividad, notificaciones y QR flash. Se actualiza cada 3 segundos con nombres aleatorios.

### FeatureVisuals.js
6 micro-animaciones para la sección "Más que una Invitación":
1. ResponsiveVisual — cicla entre phone/tablet/desktop
2. PersonalizationVisual — nombres que cambian
3. ConfirmationVisual — check que aparece/desaparece
4. AnimationsVisual — tarjeta con efecto shine
5. MapVisual — pin que cae con bounce
6. CountdownVisual — número que cuenta hacia atrás

### TestimonialCarousel (dentro de page.js)
Carousel con autoplay (4s), swipe mobile, arrows, dots, pause on hover, keyboard nav.

### FaqAccordion (dentro de page.js)
23 preguntas frecuentes, solo una abierta a la vez, animación suave de max-height.

---

## Notas Importantes

1. **Encoding:** Los archivos DEBEN guardarse en UTF-8. Nunca usar PowerShell `Set-Content` para escribir archivos con tildes — corrompe el encoding. Usar herramientas del IDE.

2. **Mobile:** Las animaciones de scroll (reveal-section, stagger-child) se desactivan en mobile (<768px) para evitar contenido invisible.

3. **WhatsApp:** El número actual es placeholder (59100000000). Cambiar por el número real del negocio.

4. **Video YouTube:** El link de "Ver Demostración" apunta a un video externo. Idealmente reemplazar con video propio.

5. **Deploy:** Vercel está vinculado al proyecto `festejia/festejia`. Solo necesitas `npx vercel --prod --yes` para desplegar.

6. **Supabase:** Las credenciales están en `.env.local` (no se sube a GitHub). Si clonas en otra PC, necesitas crear ese archivo con las keys de Supabase.

---

## Historial de Cambios (resumen)

1. Rediseño completo de landing page (de diseño básico a luxury)
2. Corrección de overflow mobile
3. Corrección de encoding (tildes y ñ)
4. Implementación de animaciones premium (hero stagger, scroll reveal)
5. Carousel de testimonios con autoplay
6. Dashboard live animado para sección Imperial
7. Micro-animaciones en features (6 visuales únicos)
8. FAQ accordion con 23 preguntas
9. Pricing con jerarquía visual (Clásico → Elegante → Imperial)
10. Tabla comparativa categorizada con iconos (✓ ⭐ 👑)
11. Botones con shine, glow y press effects
12. Currency toggle con estilo dorado
13. Contacto mejorado con trust badges y CTA
14. Ortografía completa corregida (tildes y ñ en todo el sitio)

---

## Para Continuar Trabajando

Si abres una sesión nueva en Kiro y quieres que continúe donde dejamos, simplemente di:

"Estoy trabajando en Festejia, lee PROYECTO-FESTEJIA.md para contexto"

Eso me dará todo el conocimiento necesario sin necesidad del historial de chat anterior.
