---
tipo: sintesis
tags: [festejia, desarrollo, software, ingenieria, nextjs, react, frontend]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-arquitectura-tecnica]]", "[[festejia-sistemas-tecnologia]]"]
---

# Guía de Desarrollo Web: Arquitectura y Construcción de Festejia

Esta síntesis técnica sirve como guía de ingeniería para construir, mantener y desplegar la plataforma web de [[festejia]], cubriendo el stack, la organización de rutas, los componentes de interfaz y las APIs de soporte.

---

## 1. Fundamentos Técnicos del Stack
- **Framework**: [[nextjs]] 16.3.5 con Turbopack como empaquetador (`next dev --turbopack`).
- **Librería UI**: [[react]] 19.
- **Enfoque de Estilos**:
  - `globals.css`: Variables CSS nativas, reseteo, tipografía e iconografía básica.
  - `premium-polish.css`: Microinteracciones editoriales, bordes con degradados metálicos, sombras suaves y el marco contenedor del teléfono interactivo (*mobile preview*).
  - Cero librerías CSS pesadas en runtime para garantizar [[optimizacion-rendimiento-movil]].

---

## 2. Mapa Detallado de Rutas (`app/`)

```
app/
├── layout.jsx                # Layout raíz con fuentes Google (Cormorant, Inter)
├── page.jsx                  # Portada: Hero interactivo, colecciones, planes, FAQ, contacto
│
├── bodas/                    # Catálogo y filtro de bodas
├── quince/                   # Catálogo de XV años
├── graduaciones/             # Catálogo de graduaciones (dark mode)
├── bautizos/                 # Catálogo infantil y bautizos
│
├── express/                  # Módulo SaaS Festejia Express
│   ├── page.jsx              # Landing informativa y precios
│   ├── registro/page.jsx     # Onboarding y creación de cuenta
│   ├── login/page.jsx        # Login de usuarios express
│   └── dashboard/
│       ├── page.jsx          # Listado de invitaciones del usuario
│       ├── nueva/page.jsx    # Wizard de creación
│       └── editor/[id]/      # Editor interactivo en vivo
│
├── invitacion/[id]/          # Render dinámico de la invitación final para el invitado
├── gestor/page.jsx           # Panel de lista de confirmados para clientes
├── checkin/page.jsx          # Escáner QR de puerta para guardias/recepción
├── admin/page.jsx            # Panel interno de administración
└── api/
    ├── currency/route.js     # Endpoint de tasas cambiarias
    └── express/
        └── generate-text/    # Asistente de IA para textos
```

---

## 3. Módulos Críticos en `lib/`

### A. Gestión Multidivisa (`lib/currency.js`)
- **Regla Bolivia**: `BOB_MARKET_RATE = 11.5`.
- **Detección Automática**:
  ```javascript
  export function detectUserCurrency() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (navigator.language || "").toLowerCase();
    if (tz.includes("La_Paz") || lang.includes("es-bo")) return "BOB";
    if (tz.includes("Lima") || lang.includes("es-pe")) return "PEN";
    // ...resto de países
    return "USD";
  }
  ```
- **Conversión y Redondeo**: Aplica el múltiplo amigable (ej. 10 para BOB, 500 para ARS, etc.).

### B. Optimización de Animaciones (`lib/useVisibleInterval.js`)
Pausa cronómetros y loops visuales cuando el contenedor sale de la pantalla:
```javascript
export function useVisibleInterval(callback, delay, ref) {
  useEffect(() => {
    let intervalId = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        intervalId = setInterval(callback, delay);
      } else {
        clearInterval(intervalId);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => {
      clearInterval(intervalId);
      observer.disconnect();
    };
  }, [callback, delay, ref]);
}
```

### C. Generador de Enlaces a WhatsApp (`lib/config.js`)
Constructor unificado para garantizar que cada botón de la web envíe el texto exacto predeterminado con codificación de URI (`encodeURIComponent`).

---

## 4. Despliegue y Variables de Entorno
Configurar en Vercel o en el archivo `.env.local`:
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: Número oficial de atención internacional.
- `NEXT_PUBLIC_BASE_URL`: Dominio oficial (`https://www.festejia.com`).
- `CURRENCY_API_KEY`: Clave del proveedor de cotizaciones de cambio.
- `AI_API_KEY`: Clave para el generador de dedicatorias de Express.

---

## Enlaces Relacionados
- [[festejia-arquitectura-tecnica]]
- [[festejia-especificacion-panel-admin]]
- [[festejia-especificacion-panel-cliente]]
- [[catalogo-colecciones-modelos]]
- [[addons-servicios-adicionales]]
- [[scripts-whatsapp-festejia]]
- [[optimizacion-rendimiento-movil]]
- [[festejia-sistemas-tecnologia]]
