# 14 - DASHBOARD EXPRESS Y MOTOR DEL EDITOR (EDITOR ENGINE)

> Arquitectura visual de Festejia Express: gestión de cuentas, componentes del editor tipo Canva y pipeline de compresión WebP en el navegador.
> Rutas: `/express/dashboard`, `/express/dashboard/nueva`, `/express/dashboard/cuenta`, `/express/dashboard/ayuda`, `/express/dashboard/editor/[id]`.

---

## 1. LAS RUTAS DEL DASHBOARD EXPRESS

El portal de autoservicio para los clientes de Express se organiza en 5 vistas conectadas mediante el layout unificado `ExpressDashboardLayout.js`:

### 1.1. Vista Principal (`/express/dashboard`)
- Lista todas las tarjetas de invitaciones pertenecientes al usuario autenticado.
- Cada tarjeta presenta:
  - Nombres de los novios o festejados.
  - Badge cromático de estado: `Borrador` (Gris), `Pendiente de pago` (Amarillo), `Publicada` (Verde), `Expirada` (Rojo).
  - Metadatos: Plantilla elegida y código interno único (`BOD-XXXX`).
  - Botón **"Continuar editando"** / **"Ver / Editar"**.
  - Botón **"Ver invitación"** con enlace a `/e/[slug]` (solo visible si está publicada).
  - Botón **"Eliminar"** con advertencia modal de confirmación.

### 1.2. Nueva Invitación (`/express/dashboard/nueva`)
- Selector visual de plantilla inicial.
- Al seleccionar una plantilla (ej. `plantilla-a`), ejecuta `crearInvitacionBorrador(userId, plantilla, codigoInterno)`.
- Genera un código interno aleatorio con formato `EXP-XXXX` usando el alfabeto `ABCDEFGHJKLMNPQRSTUVWXYZ0123456789` (excluyendo caracteres ambiguos como I, O, 0, 1).
- Redirige inmediatamente al editor con la nueva ID creada.

### 1.3. Cuenta y Perfil (`/express/dashboard/cuenta`)
- Muestra el correo electrónico del usuario y su nombre.
- Permite actualizar el nombre de contacto asociado a `express_clientes`.

### 1.4. Centro de Ayuda (`/express/dashboard/ayuda`)
- Guía rápida de uso del editor de bloques.
- Explicación de cómo compartir el enlace por WhatsApp.
- Botón de soporte directo vía WhatsApp utilizando el enlace centralizado `waLink()`.

---

## 2. COMPONENTES DEL MOTOR DEL EDITOR (`lib/express/blocks/`)

El editor interactivo (`/express/dashboard/editor/[id]`) funciona como una aplicación de composición visual sin recargas:

### 2.1. `EditorEngine.js` (El Orquestador Central)
- Mantiene el estado local de los 17 bloques (`contenido`) y el orden de los bloques (`orden`).
- Recibe la configuración de la plantilla mediante `obtenerConfigPlantilla(id)` de `lib/express/templates/registry.js`.
- Administra el autoguardado en tiempo real con debounce: cada cambio en un campo se guarda en Supabase mediante `guardarBloque(id, userId, tipoBloque, datosBloque)`.
- Dispara la sincronización con las columnas legacy (`derivarColumnasLegacy`) para que el resto del sistema siga viendo `nombre1`, `fecha_evento`, etc.

### 2.2. `SortableBlockItem.js` (Reordenamiento Drag & Drop)
- Permite arrastrar verticalmente los bloques reordenables para cambiar su orden en la invitación final.
- Los bloques estructurales obligatorios (Información principal, Portada, Confirmación y Configuración) están marcados como `fijo: true` y no pueden moverse de su posición natural.
- Al soltar un bloque, ejecuta `guardarOrdenBloques(id, userId, nuevoOrden)`.

### 2.3. `Accordion.js` (Gestión Espacial)
- Cada bloque se presenta como un acordeón colapsable con su icono, título legible y estado de completitud.
- Permite abrir un solo bloque a la vez para mantener el espacio de trabajo limpio en pantallas móviles y laptops.

### 2.4. `FieldRenderer.js` (Renderizador Polimórfico de Inputs)
Interpreta el esquema (`schema.js`) de cada bloque y renderiza el control correspondiente:
- `text`: Input de texto convencional con placeholder.
- `textarea`: Área de texto multilínea para historias o dedicatorias.
- `date`: Selector de fecha nativo HTML5.
- `time`: Selector de hora (ej. "17:00").
- `color`: Selector de color con paletas predeterminadas sugeridas.
- `image`: Cargador de imágenes integrado con previsualización y botón de eliminación.
- `audio`: Cargador de archivos de música MP3 con reproductor de prueba.
- **Botón "✨ Generar con IA":** En los campos de texto narrativo, renderiza un botón con icono de destello que llama al endpoint `/api/express/generate-text` enviando el contexto de los nombres para redactar el texto automáticamente.

### 2.5. `BlockPreviewShell.js` (Previsualización en Vivo)
- Renderiza el componente `Preview.js` de cada bloque dentro de un marco que simula la pantalla de un smartphone moderno.
- Se actualiza en tiempo real a medida que el usuario escribe, sin retardo perceptible.

---

## 3. PIPELINE DE COMPRESIÓN MULTIMEDIA (`lib/express/storage.js`)

Para evitar que los usuarios suban fotografías pesadas de cámaras profesionales (10MB+) que harían que la invitación cargue lenta en conexiones móviles 4G, el sistema incluye compresión en el cliente:

### 3.1. Compresión WebP en el Navegador (`comprimirImagen`)
```javascript
export async function comprimirImagen(file) {
  const bitmap = await createImageBitmap(file)
  const escala = Math.min(1, ANCHO_MAX_FOTO / bitmap.width) // ANCHO_MAX_FOTO = 1200px
  const ancho = Math.round(bitmap.width * escala)
  const alto = Math.round(bitmap.height * escala)

  const canvas = document.createElement('canvas')
  canvas.width = ancho
  canvas.height = alto
  const ctx = canvas.getContext('2d')
  ctx.drawImage(bitmap, 0, 0, ancho, alto)

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, 'image/webp', 0.8)
  )
  return blob
}
```
- **Ventajas:**
  - Reduce archivos de 8-15 MB a menos de 250 KB sin pérdida visible de calidad.
  - Ahorra ancho de banda de subida y almacenamiento en Supabase Storage.
  - La invitación pública abre de forma instantánea en cualquier smartphone.

### 3.2. Reglas de Validación de Archivos (`lib/express/validation.js`)
- **Fotos:** Máximo **5 MB**, formatos permitidos: `image/jpeg`, `image/png`, `image/webp`.
- **Música:** Máximo **5 MB**, formato obligatorio: `audio/mpeg` (`.mp3`).
- **Galería:** Máximo **3 fotos** en el plan base de Express (`MAX_FOTOS_GALERIA = 3`).
- **Nombres de archivo:** Se guardan bajo la ruta segura `${userId}/${invitacionId}/bloques/${bloqueTipo}-${campoKey}.webp` con `upsert: true`.
