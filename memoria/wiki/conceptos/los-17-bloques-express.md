---
tipo: concepto
tags: [festejia, express, bloques, editor, arquitectura, canva, saas]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-11-express-studio-bloques]]", "[[11_EXPRESS_STUDIO_Y_BLOQUES|raw/documentos/festejia/11_EXPRESS_STUDIO_Y_BLOQUES.md]]"]
---

# Catálogo y Especificación de los 17 Bloques Modulares de Festejia Express

En el estudio de diseño de [[festejia-express]], cada invitación web se construye mediante una estructura en formato JSONB compuesta por una combinación ordenada de **17 bloques temáticos independientes**. Cada bloque implementa el patrón *Registry* (`registry.js`) con su esquema de datos, su formulario de edición (`Editor`) y su componente de visualización en el teléfono (`Preview`).

---

## 1. Inventario Detallado de los 17 Bloques

| # | Identificador del Bloque | Categoría | Campos Principales en Schema | Propósito Visual y Experiencia |
|:---:|---|---|---|---|
| **1** | `informacion-principal` | Núcleo | `nombre1`, `nombre2`, `tipo`, `fecha`, `hora` | Define los datos centrales de la celebración. Alimenta automáticamente las columnas nativas de la base de datos vía `sync.js`. |
| **2** | `portada` | Cabecera | `imagen_url`, `titulo`, `subtitulo`, `estilo_sobre` | Primera impresión al abrir la invitación (sobre interactivo o portada editorial limpia). |
| **3** | `cuenta-regresiva` | Emoción | `fecha_objetivo`, `mensaje_activo`, `mensaje_dia_evento` | Reloj animado por segundo (Días, Horas, Minutos, Segundos) hacia la celebración. |
| **4** | `ceremonia` | Logística | `lugar`, `direccion`, `hora`, `google_maps_url`, `waze_url` | Información del acto civil o religioso con botón de navegación GPS con un solo toque. |
| **5** | `recepcion` | Logística | `lugar`, `direccion`, `hora_inicio`, `hora_fin`, `google_maps_url` | Detalles del salón de banquetes o quinta festiva. |
| **6** | `itinerario` | Logística | `hitos` (array con `hora`, `titulo`, `icono`, `descripcion`) | Línea de tiempo cronológica (ej. 18:00 Civil, 19:30 Cena, 21:00 Vals, 22:00 Fiesta). |
| **7** | `padres` | Familia | `padres_novio1` (array), `padres_novio2` (array), `titulo` | Mención de honor protocolar a los progenitores de los novios o quinceañera. |
| **8** | `padrinos` | Familia | `padrinos` (array con `nombre`, `rol`), `titulo` | Reconocimiento solemne a los padrinos de honor y testigos. |
| **9** | `historia` | Emoción | `titulo`, `texto_historia`, `fotos_cronologia` (array) | Narración emotiva de cómo se conoció la pareja con hitos románticos. |
| **10** | `galeria` | Multimedia | `fotos` (array de hasta 4 imágenes WebP), `disposicion` | Cuadrícula interactiva optimizada para fotos de la sesión pre-boda. |
| **11** | `musica` | Multimedia | `audio_url`, `titulo_cancion`, `autoplay_gestual` | Reproductor flotante con tema musical personalizado. |
| **12** | `dress-code` | Logística | `codigo` (Formal, Guayabera, etc.), `sugerencia`, `paleta_colores` | Guía de vestimenta con visualización de muestras de color (*swatches*). |
| **13** | `regalos` | Utilidades | `tipo_regalo` (Efectivo/Tienda), `banco`, `cuenta`, `titular`, `qr_imagen_url` | Mesa de regalos con soporte de subida de imagen de código QR bancario para transferencias. |
| **14** | `solo-adultos` | Protocolo | `activo` (boolean), `mensaje_respetuoso` | Mensaje delicado comunicando la reserva del evento exclusivamente para adultos. |
| **15** | `confirmacion` | RSVP | `fecha_limite`, `whatsapp_destino`, `mensaje_agradecimiento` | Botón de confirmación de asistencia hacia el WhatsApp del anfitrión. |
| **16** | `redes-sociales` | Social | `hashtag` (ej. `#BodaSofiYLucas`), `instagram_filtro_url` | Fomenta que los invitados etiqueten fotos con el hashtag oficial del festejo. |
| **17** | `configuracion` | Meta | `plantilla_id`, `color_primario`, `fuente_personalizada` | Ajustes globales de diseño y tema visual de la invitación. |

---

## 2. Mecanismo de Sincronización Automática (`sync.js`)
Para no romper compatibilidad con los índices y reportes de la tabla `express_invitaciones`, el motor ejecuta en cada guardado:
```javascript
export function derivarColumnasLegacy(contenido) {
  const info = contenido['informacion-principal'] || {}
  const cere = contenido.ceremonia || {}
  const rece = contenido.recepcion || {}
  const dress = contenido['dress-code'] || {}
  return {
    nombre1: info.nombre1 || null,
    nombre2: info.nombre2 || null,
    fecha_evento: info.fecha || null,
    ceremonia_lugar: cere.lugar || null,
    recepcion_lugar: rece.lugar || null,
    dresscode: dress.codigo || null,
  }
}
```

---

## Enlaces Relacionados
- [[motor-de-plantillas-festejia]]
- [[festejia-express]]
- [[pipeline-compresion-imagenes-webp]]
- [[festejia-11-express-studio-bloques]]
