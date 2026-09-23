# 12 - MOTOR DE PLANTILLAS Y EXPERIENCIA PÚBLICA DE LA INVITACIÓN

> Arquitectura del runtime público de invitaciones (`/invitacion/[id]`, `/public/plantilla1/`, `/public/plantilla2/`) y catálogo de plantillas de Festejia Express (`lib/express/templates/`).

---

## 1. EL ENLACE DEL INVITADO Y REDIRECCIÓN DINÁMICA (`/invitacion/[id]`)

- **Ruta:** `c:\Users\user23\festejia\app\invitacion\[id]\page.js`
- Cada invitado recibe un enlace con su UUID: `https://www.festejia.com/invitacion/[UUID]`.

### 1.1. Metadatos OpenGraph Dinámicos (SEO y WhatsApp Preview)
Al compartir el enlace por WhatsApp, Telegram o iMessage, la función `generateMetadata` construye en el servidor la tarjeta de previsualización (rich preview card):
- **Título:** `${novio1} & ${novio2} — ¡Nos Casamos!` (o `${novio1} — Celebración`).
- **Descripción:** El mensaje personalizado configurado por los anfitriones en su panel, o por defecto: `"Te invitamos a ser parte de este día tan especial. [Fecha formateada en español]"`.
- **Imagen OpenGraph (`og:image`):** Toma automáticamente la foto de portada de la plantilla asignada en el evento: `https://www.festejia.com/${plantilla}/images/foto-modelo-sobre-boda-1.jpg`.
- **Twitter Card:** `summary_large_image`.

### 1.2. Hidratación y Redirección Server-Side
La página no requiere React en el cliente para calcular datos:
1. Consulta en Supabase la tabla `invitados` para obtener `nombre_completo`, `num_pases` y `evento_id`.
2. Consulta la tabla `eventos` para obtener la columna `plantilla` (por defecto `plantilla1`).
3. Construye la URL de redirección final con parámetros codificados:
   ```text
   /${plantilla}/?m=${encodeURIComponent(nombre)}&n=${encodeURIComponent(pases + ' pases')}&id=${id}&evento=${eventoId}
   ```
4. Emite un script de reemplazo atómico en el navegador: `window.location.replace(redirectUrl)`, evitando pasos intermedios en el historial de navegación.

---

## 2. LAS PLANTILLAS BESPOKE DE ALTA GAMA (`public/`)

### 2.1. Plantilla 1: Sobre Interactivo de Lacre Virtual (`public/plantilla1/`)
- **Efecto Sobre Virtual:** Simula un sobre de papel satinado cerrado con un sello de lacre dorado brillante con las iniciales de los novios o festejados.
- **Interacción de Apertura:** Al tocar el sello, se reproduce una animación física CSS con solapas abatibles (`flap-open`), extrayendo la tarjeta interior de invitación con efecto de elevación y desenfoque.
- **Música de Fondo:** Al abrir el sobre, el reproductor de audio inicia suavemente la melodía elegida (respetando las políticas de interacción del usuario del navegador).

### 2.2. Plantilla 2: Mármol & Oro (`public/plantilla2/`)
- **Estilo Visual:** Texturas de mármol blanco de Carrara, marcos de oro cepillado y acentos en verde salvia (`#5F6754`).
- **Inyección y Reemplazo Dinámico del DOM:** El archivo JavaScript de la plantilla lee los parámetros de la URL e inyecta dinámicamente el contenido en los elementos con IDs reservados:
  - `#nombre-novio1-portada`, `#nombre-novio2-portada`: Portada inicial.
  - `#nombre-novio1`, `#nombre-novio2`: Nombres en el encabezado formal.
  - `#nombre-invitado-seccion`, `#nombre-invitado-dinamico`: Saludo personalizado para la familia.
  - `#fecha-mes`, `#fecha-dia`, `#fecha-ano`: Fecha desglosada.
  - `#lugar-ceremonia`, `#hora-ceremonia`: Datos religiosos.
  - `#lugar-recepcion`, `#hora-recepcion`: Datos del salón de fiesta.
- **Confirmación RSVP Directa a Base de Datos:** El formulario modal envía la respuesta directamente a la API de Supabase, actualizando la fila correspondiente en `invitados` e insertando la notificación para el anfitrión.

---

## 3. CATÁLOGO DE PLANTILLAS FESTEJIA EXPRESS (`lib/express/templates/`)

En Festejia Express, cada plantilla define el ADN visual, la paleta cromática, qué bloques están presentes y cuáles pueden ser reordenados por el usuario. El registro central se encuentra en `lib/express/templates/registry.js`.

### 1. `plantilla-a` — "Mármol"
- **Inspiración:** Basada en la estética verde salvia y dorado de la Plantilla 2.
- **Paleta Cromática:** Primario `#5F6754`, Dorado `#876E44`.
- **Bloques Fijos:** Información principal, Portada (clásico-dorado), Confirmación y Configuración.
- **Bloques Reordenables:** Cuenta regresiva (circular), Padres, Ceremonia, Recepción, Itinerario (línea de tiempo), Galería (grid-3), Música, Dress code, Solo adultos, Regalos y Padrinos.

### 2. `plantilla-b` — "Clásica"
- **Inspiración:** Minimalismo formal atemporal.
- **Paleta Cromática:** Primario `#1a1a1a`, Dorado `#c9a96e`.
- **Estilo:** Tipografías puras, fondo blanco perla y contrastes en negro y oro.
- **Bloques Reordenables:** Cuenta regresiva (minimal), Ceremonia, Recepción, Itinerario (lista), Galería (grid-3), Dress code, Regalos y Padres.

### 3. `plantilla-c` — "Romance"
- **Inspiración:** Bodas íntimas, tonos pastel y romanticismo poético.
- **Paleta Cromática:** Primario `#8b5f6b` (rosa empolvado), Dorado `#d4a5b0` (oro rosa).
- **Estilo:** Galería en formato carrusel deslizante y bloque "Nuestra Historia" destacado.
- **Bloques Reordenables:** Cuenta regresiva, Historia, Padres, Ceremonia, Recepción, Galería (carrusel), Música, Dress code y Regalos.

### 4. `plantilla-d` — "Jardín"
- **Inspiración:** Bodas campestres, quintas y celebraciones al aire libre.
- **Paleta Cromática:** Primario `#4a6e5c` (verde bosque), Dorado `#c9a96e`.
- **Estilo:** Ilustraciones botánicas, mapas GPS interactivos embebidos directamente en las secciones de ceremonia y recepción.
- **Bloques Reordenables:** Ceremonia, Recepción, Itinerario, Galería, Dress code, Solo adultos, Regalos y Padrinos.

### 5. `plantilla-e` — "Moderna"
- **Inspiración:** Celebraciones de noche, fiestas de gala y graduaciones VIP.
- **Paleta Cromática:** Primario `#0a0a0a` (negro profundo), Dorado `#c4a265`.
- **Estilo:** Contraste de alto impacto, bloque de redes sociales con hashtag interactivo y feed de fotos.
- **Bloques Reordenables:** Ceremonia, Recepción, Itinerario, Galería, Música, Dress code, Solo adultos, Regalos y Redes sociales.
