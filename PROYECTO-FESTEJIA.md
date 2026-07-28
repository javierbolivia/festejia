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
| Supabase | Base de datos + Auth + Storage | https://supabase.com |
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
│   ├── plantilla1/            ← Template "Sobre" (azul, Mea Culpa)
│   ├── plantilla2/            ← Template "Mármol" (verde/dorado, Great Vibes)
│   └── plantilla3/            ← Template "Paradise" (verde oscuro/dorado) [NUEVO]
├── vercel.json                ← Config de Vercel
├── package.json               ← Dependencias
└── .env.local                 ← Variables de entorno (Supabase keys)
```

---

## Servicios de Festejia (2 líneas de negocio)

### Línea 1: Paquetes Premium (servicio manual — TÚ diseñas)

El cliente contacta por WhatsApp, paga, manda sus datos y fotos. TÚ creas la invitación manualmente. El cliente nunca entra a una plataforma.

| Plan | USD | Bs. | Concepto |
|---|---|---|---|
| Clásico | $45 | 450 | Elige un diseño de la colección, personaliza info |
| Elegante | $75 | 700 | Personalización de colores, tipografía, nombres de invitados, pases |
| Imperial | $110 | 950 | Diseño 100% desde cero + Sistema de Confirmación Inteligente |

**Reserva:** Bs. 100 — el resto al finalizar.

#### Servicios Adicionales (Paquetes)

| Servicio | Precio USD |
|---|---|
| Personalización Total | $100 |
| Entrega Express (48h) | $30 |
| Menú de Navegación | $15 |
| Save the Date | $30 |
| Dominio Propio | $120 |
| Visibilidad Extendida (+3 meses) | $30 |
| Ajustes Post-Entrega | $10 |

#### Tabla comparativa Paquetes:

| Característica | Imperial | Elegante | Clásico |
|---|---|---|---|
| Selección de plantilla | ✓ | ✓ | ✓ |
| Colores personalizados | ⭐ | ✓ | — |
| Tipografía personalizada | ⭐ | ✓ | — |
| Diseño exclusivo desde cero | 👑 | — | — |
| Animaciones elegantes | ✓ | ✓ | ✓ |
| Música de fondo | ✓ | ✓ | ✓ |
| Galería de fotos (8) | ✓ | ✓ | — |
| Galería de fotos (20) | 👑 | — | — |
| Cuenta regresiva | ✓ | ✓ | ✓ |
| Ubicación Google Maps | ✓ | ✓ | ✓ |
| Confirmación por WhatsApp | — | ✓ | ✓ |
| Nombres personalizados | ✓ | ✓ | — |
| Tickets / Pases | ⭐ | ✓ | — |
| Número de mesa | 👑 | — | — |
| QR de acceso personal | 👑 | — | — |
| Agendar Google Calendar | ✓ | ✓ | — |
| Gestor de invitados online | ✓ | ✓ | — |
| Sistema Confirmación Inteligente | 👑 | — | — |
| Panel de administración | 👑 | — | — |
| Soporte prioritario | 👑 | — | — |

---

### Línea 2: Plan Express con IA (self-service — el CLIENTE crea solo) [NUEVO]

Servicio automatizado donde el cliente se registra, elige plantilla, sube sus fotos/música, la IA genera textos, y publica sin intervención nuestra. Solo cobramos y activamos.

#### Especificaciones Plan Express:

| Aspecto | Detalle |
|---|---|
| **Precio** | Bs. 200 |
| **Registro** | Email + contraseña (el cliente se crea su propia cuenta) |
| **Panel** | Sección exclusiva `/crear` (separada del panel admin de paquetes) |
| **Plantillas disponibles** | 5-8 diseños (limitadas, distintas a las de paquetes premium) |
| **Fotos** | Máximo 4 (1 portada + 3 galería) — se comprimen automáticamente |
| **Música** | 1 archivo MP3 (máx 5MB, ~3 minutos) |
| **Textos** | IA (Kimi K3) genera automáticamente, cliente puede editar |
| **Nombres de invitado** | ❌ NO incluido |
| **Pases individuales** | ❌ NO incluido |
| **Confirmación inteligente** | ❌ NO incluido |
| **QR de acceso** | ❌ NO incluido |
| **Link** | Genérico (mismo para todos los invitados) |
| **Vigencia** | Desde publicación hasta el DÍA del evento (se desactiva automáticamente) |
| **Correcciones post-publicación** | 2 incluidas (las hace el propio cliente) |
| **Correcciones extra** | Bs. 30 (desbloquea 2 correcciones más) |

#### Lo que el cliente puede personalizar en Express:

| Campo | Descripción |
|---|---|
| Nombres de la pareja | "Laura & Carlos" |
| Fecha del evento | Día, mes, año |
| Padres de la novia | Nombres |
| Padres del novio | Nombres |
| Padrinos/Madrinas | Nombres |
| Ceremonia religiosa | Nombre del lugar + link Google Maps + hora |
| Recepción social | Nombre del lugar + link Google Maps + hora |
| Itinerario | Lista dinámica (hora + descripción, agregar/quitar items) |
| Dress code | Tipo (formal/semi-formal) + colores sugeridos |
| Sugerencia de regalos | Subir QR bancario Y/O link mesa de regalos |
| Solo adultos | Toggle Sí/No |
| Fotos | Subir 4 máx (1 portada + 3 galería) |
| Música | Subir 1 MP3 |

#### Flujo del cliente Express:

```
1. Ve landing festejia.com → Le interesa Express
2. Click "Crear mi invitación" → Va a /crear
3. Se registra con email + contraseña
4. Explora y elige 1 de 5-8 plantillas (ve preview de cada una)
5. Llena formulario multi-paso:
   - Datos de pareja (nombres, fecha)
   - Familia (padres, padrinos)
   - Lugares (ceremonia + recepción con Google Maps)
   - Itinerario (horarios del evento)
   - Detalles (dress code, solo adultos)
   - Regalos (sube QR y/o link)
   - Media (sube fotos + música)
6. IA genera textos elegantes automáticamente
7. Ve vista previa completa de su invitación
8. Click "Publicar" → Sale bloqueo de pago:
   "Para publicar: Bs. 200 → [Pagar por WhatsApp]"
9. Click abre WhatsApp con mensaje pre-armado a Festejia
10. Nosotros cobramos (QR bancario/Libélula) y activamos en admin
11. Cliente recibe: "¡Tu invitación está publicada!"
    Link: festejia.com/i/laura-y-carlos
```

#### Estrategia de enganche:

- TODO es gratis hasta el momento de PUBLICAR
- El cliente ya invirtió 20-30 min armando su invitación
- Ve lo bonita que queda en el preview
- No querrá perder ese trabajo → paga

#### Post-publicación:

```
Publicada → 2 correcciones gratis
         → Corrección 3+: Bloqueado
         → Sale mensaje: "Bs. 30 por más correcciones"
         → Contacta por WhatsApp → Nosotros cobramos y desbloqueamos
         → Invitación activa hasta fecha_evento
         → Día después del evento → se desactiva automáticamente
```

---

## Integración IA — Kimi K3 (Moonshot AI)

### Qué es Kimi

Modelo de IA de Moonshot AI, compatible con formato OpenAI. Se usa para generar textos elegantes automáticamente para las invitaciones Express.

### Configuración API

| Campo | Valor |
|---|---|
| Base URL | `https://api.moonshot.ai/v1` |
| Modelos | `kimi-k3` (flagship) / `kimi-k2.7-code` (código) |
| Precio | $0.95/1M tokens input, $4.00/1M tokens output (K2.7) |
| Costo por invitación | ~$0.015 (~Bs. 0.10) |
| API Key | Obtener en https://platform.kimi.ai |

### Qué genera la IA por invitación:

| Texto | Ejemplo |
|---|---|
| Mensaje de bienvenida | "Nuestro gran día se aproxima y nos encantaría que formaras parte..." |
| Cita bíblica/poema | Eclesiastés 4:9-10, 1 Corintios 13, etc. |
| Texto de regalos | "Si desean hacernos un obsequio, agradeceremos de corazón..." |
| Texto solo adultos | "Amamos a sus pequeños, pero este día especial es solo para adultos..." |

### Ejemplo de llamada API:

```javascript
// /api/generate-text.js
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.KIMI_API_KEY,
  baseURL: 'https://api.moonshot.ai/v1',
});

const response = await client.chat.completions.create({
  model: 'kimi-k3',
  messages: [{
    role: 'user',
    content: `Genera un texto de bienvenida romántico y elegante para una invitación 
    de boda. Nombres: Laura y Carlos. Estilo: clásico romántico. 
    Máximo 3 oraciones. En español.`
  }]
});
```

### Presupuesto IA:

- Con $5 USD (Bs. 35) de recarga se hacen ~330 invitaciones Express
- Es despreciable el costo por cliente

---

## Pasarela de Pagos — Bolivia

### Problema: Stripe NO funciona en Bolivia

### Solución por fases:

| Fase | Método | Cuándo |
|---|---|---|
| **Fase 1 (ahora)** | WhatsApp + QR bancario personal + activación manual | Ya |
| **Fase 2 (cuando escale)** | Links de pago Libélula (semi-automático) | +50 clientes |
| **Fase 3 (futuro)** | API Libélula integrada al checkout (100% automático) | +200 clientes |

### Libélula.bo (pasarela boliviana recomendada):

| Aspecto | Detalle |
|---|---|
| Web | https://libelula.bo |
| Años en mercado | 16 años, +600 comercios |
| Métodos de pago | QR Simple, Visa/Mastercard, Google Pay, Tigo Money, BNB, PIX |
| API | REST API para integración |
| Links de pago | Sí — generas link, cliente paga, te notifica |
| Moneda | BOB y USD |
| Facturación | Electrónica incluida |

### Otras opciones Bolivia:

- **Red Enlace - EON** (enlazateonline.com.bo) — Links, QR, WhatsApp, SMS
- **BNB QR** — API del Banco Nacional de Bolivia

### Flujo actual de cobro (Fase 1):

```
Cliente quiere publicar → Click "Pagar por WhatsApp"
→ Se abre WhatsApp con mensaje:
  "Hola Festejia! Quiero publicar mi invitación Express.
   Email: cliente@gmail.com
   Plantilla: Paradise"
→ Nosotros respondemos con QR bancario
→ Cliente paga y manda captura
→ Nosotros activamos en /admin → estado = "publicada"
→ Cliente recibe notificación
```

---

## Plantillas

### Plantillas actuales (para Paquetes Premium):

| # | Nombre | Estilo | Colores | Fuentes |
|---|---|---|---|---|
| 1 | Sobre | Clásico, cortinas azules | Azul marino #354A68 | Cormorant + Mea Culpa |
| 2 | Mármol | Elegante, verde/dorado, flores | Verde #5F6754, Dorado #876E44 | Cormorant + Great Vibes |
| 3 | Paradise | Tropical, verde oscuro/dorado | Verde #2d4a3e, Dorado #b8860b | Cormorant + Great Vibes + Raleway |

### Plantillas para Plan Express (por crear):

Serán 5-8 plantillas más simples/genéricas. Distintas a las premium para que haya diferenciación. El cliente Express NO puede usar las plantillas premium.

### Estructura técnica de cada plantilla:

Cada plantilla es un archivo HTML estático en `/public/plantillaN/index.html` que:
- Lee parámetros de URL (`?id=`, `?evento=`, `?m=`, `?n=`)
- Se conecta a Supabase para datos dinámicos
- Renderiza nombres, fechas, fotos, música del evento
- Incluye formulario de confirmación (RSVP) que guarda en Supabase
- Genera QR de acceso al confirmar

### Secciones comunes en todas las plantillas:

1. Portada con botón "Ingresar" + animación
2. Foto principal de los novios
3. Nombres + fecha + lugar
4. Mensaje de bienvenida / cita bíblica
5. Nombre del invitado + pases (solo paquetes Elegante+)
6. Cuenta regresiva
7. Padres / Padrinos
8. Ceremonia religiosa (lugar + mapa + hora)
9. Recepción social (lugar + mapa + hora)
10. Itinerario / Cronograma
11. Dress code + colores sugeridos
12. Galería de fotos
13. Sugerencia de regalos (QR bancario / mesa de regalos)
14. Solo adultos (opcional)
15. Compartir fotos
16. Confirmación de asistencia (RSVP)
17. Música de fondo + botón play/pause
18. Footer con marca Festejia

---

## Optimización de Storage (Hosting)

### Problema: Hosting limitado en espacio

### Solución: Comprimir todo al subir

| Tipo | Regla |
|---|---|
| Fotos | Máx 4 por invitación. Se comprimen a WebP, máx 1200px ancho, ~200-400KB c/u |
| Música | Máx 1 MP3, máx 5MB (~3 minutos a 128kbps) |
| **Total por cliente Express** | **~4 MB máximo** |

### Cálculo de capacidad:

- Supabase free: 1GB storage → ~250 clientes Express
- Supabase Pro ($25/mes): 100GB → miles de clientes
- Las invitaciones se desactivan automáticamente después del evento → se pueden limpiar fotos de invitaciones expiradas

---

## Arquitectura de la Plataforma

### Dos puertas de entrada separadas:

```
festejia.com
├── /crear      ← NUEVO: Self-service Plan Express
│                 El cliente se registra con email
│                 Panel exclusivo para crear su invitación
│                 Paga por WhatsApp para publicar
│
├── /login      ← EXISTENTE: Panel admin (Paquetes Premium)
│                 Nosotros creamos las cuentas manualmente
│                 Para clientes Clásico/Elegante/Imperial
│
└── /admin      ← NUESTRO: Dashboard de gestión
                  Ver clientes Express (activar pagos)
                  Ver clientes Premium (gestionar eventos)
```

### Base de datos Express (Supabase):

```sql
-- Tabla: invitaciones_express
id                          UUID (PK)
user_id                     UUID (FK → auth.users)
plantilla                   TEXT ("paradise", "tropical", "minimal"...)
slug                        TEXT UNIQUE ("laura-y-carlos")
estado                      TEXT ("borrador", "publicada", "expirada")

-- Datos del evento
nombre1                     TEXT
nombre2                     TEXT
fecha_evento                DATE
ciudad                      TEXT

-- Familia
padres_novia                TEXT
padres_novio                TEXT
padrinos                    TEXT

-- Lugares
ceremonia_nombre            TEXT
ceremonia_maps_url          TEXT
ceremonia_hora              TEXT
recepcion_nombre            TEXT
recepcion_maps_url          TEXT
recepcion_hora              TEXT

-- Itinerario (dinámico)
itinerario                  JSONB  -- [{"hora":"16:00","desc":"Ceremonia"},...]

-- Detalles
dresscode                   TEXT
colores_sugeridos           JSONB  -- ["#2d4a3e","#b8860b",...]
solo_adultos                BOOLEAN DEFAULT false
mensaje_custom              TEXT

-- Regalos
regalo_qr_url               TEXT (URL de imagen subida a Storage)
regalo_link_externo         TEXT (URL mesa de regalos)
regalo_texto                TEXT

-- Media
foto_portada_url            TEXT
fotos_galeria               JSONB  -- ["url1","url2","url3"]
musica_url                  TEXT

-- IA
textos_ia                   JSONB  -- {"bienvenida":"...","regalos":"...","adultos":"..."}

-- Control
correcciones_restantes      INTEGER DEFAULT 2
created_at                  TIMESTAMP DEFAULT now()
publicada_at                TIMESTAMP
expires_at                  DATE (= fecha_evento + 1 día)
```

---

## Design System

### Paleta de colores (Landing/Brand)
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

## Plan de Desarrollo — Próximos Pasos

### Prioridad 1: Más plantillas
- Crear 5-8 plantillas Express (más simples/genéricas)
- Seguir creando plantillas premium para paquetes
- Meta: 10 plantillas totales mínimo para lanzar Express

### Prioridad 2: Página `/crear` (self-service)
- Registro con email (Supabase Auth)
- Formulario multi-paso (datos → familia → lugares → itinerario → detalles → media)
- Upload de fotos con compresión automática
- Upload de música
- Vista previa en tiempo real
- Botón publicar con bloqueo de pago

### Prioridad 3: Integración IA (Kimi K3)
- Endpoint `/api/generate-text`
- Generación automática de textos al llenar formulario
- Costo: $5 USD para ~330 invitaciones
- API Key de: https://platform.kimi.ai

### Prioridad 4: Renderizador público
- Ruta `/i/[slug]` que lee datos de Supabase y renderiza la plantilla elegida
- Carga dinámica de fotos, música, textos
- Expiración automática post-evento

### Prioridad 5: Pasarela de pagos
- Fase 1: WhatsApp + QR bancario (manual)
- Fase 2: Libélula.bo links de pago
- Fase 3: API Libélula integrada

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
15. **[NUEVO] Plantilla 3 "Paradise" creada** (verde/dorado, estilo tropical elegante)
16. **[NUEVO] Definición completa del Plan Express con IA**
17. **[NUEVO] Investigación pasarelas de pago Bolivia (Libélula.bo)**
18. **[NUEVO] Arquitectura self-service para clientes Express**

---

## Para Continuar Trabajando

Si abres una sesión nueva en Kiro y quieres que continúe donde dejamos, simplemente di:

"Estoy trabajando en Festejia, lee PROYECTO-FESTEJIA.md para contexto"

Eso me dará todo el conocimiento necesario sin necesidad del historial de chat anterior.
