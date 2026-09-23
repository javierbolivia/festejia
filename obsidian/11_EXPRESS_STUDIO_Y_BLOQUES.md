# 11 - FESTEJIA EXPRESS: ESTUDIO DE DISEÑO Y CATÁLOGO DE BLOQUES

> Arquitectura modular de Festejia Express (Bs. 200 / DIY).
> Motor de edición visual tipo Canva, catálogo de 17 bloques, sincronización de columnas legacy y ciclo de publicación.

---

## 1. INTRODUCCIÓN Y CONCEPTO

**Festejia Express** es la vertiente de autoservicio digital de Festejia, diseñada para anfitriones que buscan una solución económica (**Bs. 200**), inmediata y autogestionable.
A través de un estudio de diseño interactivo (`/express/dashboard/editor/[id]`), el usuario puede armar su invitación web combinando bloques temáticos prediseñados, ordenándolos a su gusto y personalizando textos, colores y fotos.

---

## 2. ESTRUCTURA DE RUTAS Y FLUJO DE USUARIO

- **Registro de cuenta Express:** `/express/registro` (Crea usuario en Supabase Auth y registro en tabla `express_clientes`).
- **Login Express:** `/express/login` (Autenticación directa con redirección a `/express/dashboard`).
- **Recuperación de contraseña:** `/express/recuperar` y `/express/restablecer`.
- **Dashboard Principal (`/express/dashboard`):**
  - Lista todas las invitaciones del usuario.
  - Muestra badges de estado: `Borrador` (Gris), `Pendiente de pago` (Amarillo), `Publicada` (Verde) y `Expirada` (Rojo).
  - Permite continuar editando, previsualizar la web pública en `/e/[slug]` o eliminar la invitación.
- **Creación de nueva invitación:** `/express/dashboard/nueva` (Selector de plantilla inicial que genera un borrador con código interno único, ej. `BOD-1024`).
- **Ajustes de cuenta y ayuda:** `/express/dashboard/cuenta` y `/express/dashboard/ayuda`.

---

## 3. ARQUITECTURA DEL MOTOR DE EDICIÓN (`lib/express/blocks/`)

El editor se diseñó siguiendo el principio de extensibilidad y desacoplamiento. Toda la lógica de los bloques está aislada en la carpeta `lib/express/blocks/`:

```
lib/express/blocks/
├── registry.js             # Registro central único de bloques
├── EditorEngine.js         # Motor principal del editor (gestión de estado y guardado)
├── BlockEditorForm.js      # Formulario dinámico para editar campos
├── BlockPreviewShell.js    # Contenedor de previsualización en vivo
├── Accordion.js            # Acordeón colapsable para cada sección
├── SortableBlockItem.js    # Elemento reordenable con Drag & Drop
├── FieldRenderer.js        # Renderizador de inputs (texto, fecha, color, imagen)
├── sync.js                 # Traductor de JSON a columnas legacy de BD
└── validator.js            # Reglas de validación antes de publicar
```

### 3.1. Patrón Registry (`registry.js`)
El registro central contiene el mapeo de cada bloque con su triada esencial:
- `schema`: Definición de campos, valores por defecto, etiquetas y tipos de datos.
- `Editor`: Componente de formulario para editar los valores del bloque.
- `Preview`: Componente visual que renderiza el bloque tal como se verá en el teléfono del invitado.

### 3.2. Sincronización Automática de Columnas Legacy (`sync.js`)
Para garantizar que las columnas tradicionales de la tabla `express_invitaciones` (como `nombre1`, `nombre2`, `fecha_evento`, `ceremonia_lugar`, `recepcion_lugar`, `dresscode`) se mantengan sincronizadas con el JSON modular del editor, la función `derivarColumnasLegacy()` extrae automáticamente estos valores en cada guardado:
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

## 4. EL CATÁLOGO DE LOS 17 BLOQUES MODULARES

Cada invitación Express se compone de una selección de los siguientes 17 bloques:

### 1. `informacion-principal` (Bloque Fundamental)
- **Propósito:** Define los datos nucleares del evento.
- **Campos:** Nombres de los festejados (`nombre1`, `nombre2`), tipo de evento (`boda`, `quince`, `graduacion`, `bautizo`), fecha del evento y hora general.
- **Sincronización:** Alimenta directamente las columnas legacy de búsqueda y filtrado.

### 2. `portada`
- **Propósito:** La primera impresión visual al abrir la invitación digital.
- **Campos:** Imagen de portada (URL o subida), título principal, subtítulo romántico o festivo, estilo de presentación (sobre con sello de lacre virtual o portada limpia).

### 3. `cuenta-regresiva`
- **Propósito:** Genera anticipación emocional hacia el día del evento.
- **Campos:** Fecha y hora objetivo, mensaje de cuenta activa ("Faltan..."), mensaje para el día del evento ("¡Hoy es el gran día!").
- **Visual:** Contadores animados de Días, Horas, Minutos y Segundos.

### 4. `ceremonia`
- **Propósito:** Toda la información referente al acto religioso o civil.
- **Campos:** Nombre de la iglesia o templo (`lugar`), dirección exacta, hora de inicio, enlace directo a Google Maps / Waze para navegación GPS con un solo toque.

### 5. `recepcion`
- **Propósito:** Detalles de la fiesta o banquete.
- **Campos:** Nombre del salón o quinta (`lugar`), dirección, hora de inicio, hora estimada de finalización, link de geolocalización.

### 6. `itinerario`
- **Propósito:** Cronograma ordenado para que los invitados conozcan los momentos clave de la celebración.
- **Campos:** Lista dinámica de hitos: hora, icono descriptivo (iglesia, copas de bienvenida, cena gourmet, vals de los novios, fiesta loca) y descripción breve.

### 7. `padres`
- **Propósito:** Sección solemne de agradecimiento y honra a las familias.
- **Campos:** Nombres de los padres de la novia y padres del novio (en bodas), o padres de la quinceañera.

### 8. `padrinos`
- **Propósito:** Reconocimiento a los padrinos de honor y cortejo.
- **Campos:** Lista de padrinos clasificados por categoría (Padrinos de Religión, Padrinos de Aros, Testigos de Honor, etc.).

### 9. `historia` (Nuestra Historia)
- **Propósito:** Conectar emocionalmente con los invitados compartiendo la trayectoria de la pareja.
- **Campos:** Título de la historia, texto narrativo (cómo se conocieron, la primera cita, la propuesta de matrimonio) y fotografías de recuerdo.

### 10. `galeria`
- **Propósito:** Despliegue fotográfico de la sesión pre-boda o sesión de quince años.
- **Campos:** Cuadrícula o carrusel deslizante con múltiples fotografías en alta resolución, con visor lightbox para verlas en pantalla completa.

### 11. `musica`
- **Propósito:** Ambientación auditiva personalizada.
- **Campos:** Enlace de la canción elegida (YouTube, enlace MP3 o Spotify), botón flotante de control de audio (reproducir/pausar) que respeta las políticas de autoplay del navegador móvil.

### 12. `dress-code` (Código de Vestimenta)
- **Propósito:** Orientar a los invitados sobre la etiqueta del evento y evitar combinaciones no deseadas.
- **Campos:** Tipo de etiqueta (Etiqueta rigurosa, Formal, Elegante Sport, Guayabera, etc.), descripción explicativa y paleta de colores sugerida / paleta de colores reservados exclusivamente para la novia o quinceañera.

### 13. `regalos` (Mesa de Regalos y Sugerencias)
- **Propósito:** Facilitar a los invitados el envío de obsequios sin incomodidad.
- **Opciones soportadas:**
  - **Lluvia de Sobres:** Mensaje elegante solicitando regalo en efectivo el día del evento.
  - **Transferencia Bancaria:** Datos bancarios completos (Banco, Titular, Número de Cuenta, CI/NIT) e imagen del código QR para transferencias instantáneas (Simple QR en Bolivia).
  - **Mesa de Regalos Externa:** Enlaces directos a tiendas por departamento (Multicenter, Casa Elena, etc.).

### 14. `solo-adultos`
- **Propósito:** Notificación cordial para eventos donde no se admiten niños.
- **Campos:** Mensaje empático y respetuoso predeterminado (ej. *"Amamos a sus pequeños, pero hemos reservado este evento exclusivamente para adultos. ¡Agradecemos su comprensión!"*).

### 15. `confirmacion` (RSVP Interactivo)
- **Propósito:** El formulario donde el invitado indica su asistencia.
- **Campos:** Nombre del invitado, selector de asistencia ("¡Sí, ahí estaré!" o "Lo siento, no podré asistir"), número de pases confirmados, restricciones dietéticas (vegetariano, celiaco, alergias) y mensaje de dedicatoria.
- **Integración:** Envía la confirmación directamente a una base de datos o arma un mensaje estructurado hacia el WhatsApp del anfitrión.

### 16. `redes-sociales`
- **Propósito:** Fomentar la interacción social durante la fiesta.
- **Campos:** Hashtag oficial de la fiesta (ej. `#BodaSofiYMateo`), enlace al filtro personalizado de Instagram o enlace a la cuenta de TikTok.

### 17. `configuracion` (Ajustes Globales del Diseño)
- **Propósito:** Control de la identidad estética general de la invitación.
- **Campos:** Paleta cromática seleccionada (fondos claros, fondos oscuros, dorado champán, oro rosa), combinaciones tipográficas (Cormorant Garamond, Montserrat, Playfair Display) y texturas de fondo.

---

## 5. CICLO DE VIDA, VALIDACIÓN Y PAGOS

### 5.1. Validación Previa a Publicación (`validator.js`)
Antes de permitir el pago o la publicación, el sistema valida que los datos indispensables estén completos:
- Debe existir título y nombres de los anfitriones.
- Debe estar configurada la fecha del evento.
- Debe estar configurada al menos una ubicación (Ceremonia o Recepción).

### 5.2. Flujo de Publicación y Pago
1. **Solicitud de Publicación:** El usuario presiona "Publicar Invitación" en el editor.
2. **Generación de Slug Único (`prepararParaPublicar`):**
   - El sistema normaliza los nombres (ej. `sofi-y-mateo`).
   - Intenta escribir en Supabase. Si ocurre una colisión (código de error Postgres `23505`), el backend reintenta automáticamente con un sufijo numérico aleatorio (ej. `sofi-y-mateo-8291`).
   - Actualiza de forma atómica el estado a `pendiente_pago`.
3. **Generación del Link de Pago por WhatsApp (`iniciarPagoPublicacion`):**
   - Registra una fila en la tabla `express_pagos` con `monto = 200`, `concepto = 'Publicación de invitación'` y `estado = 'pendiente'`.
   - Abre WhatsApp con un mensaje predeterminado:
     ```text
     Hola Festejia! Quiero realizar un pago del Plan Express.
     Nombre: Sofía & Mateo
     Correo: sofi@gmail.com
     Plantilla: Aurora
     Código interno: BOD-4820
     Concepto: Publicación de invitación
     Monto: Bs. 200
     ```
4. **Confirmación por el Administrador:**
   - El equipo de Festejia recibe el comprobante de pago en WhatsApp y abre `/admin-express`.
   - Hace clic en **"Confirmar pago"**.
   - El sistema cambia el estado de la invitación a `publicada`, registra `fecha_publicacion = now()`, calcula automáticamente la `fecha_expiracion` (día posterior al evento) y asigna **2 correcciones gratuitas**.
   - La invitación queda inmediatamente visible en `https://www.festejia.com/e/sofi-y-mateo`.

### 5.3. Política de Correcciones Post-Publicación
- **2 Correcciones Gratuitas:** El anfitrión puede volver a entrar al editor y corregir erratas menores (ej. cambio de hora de la ceremonia o corrección ortográfica de un apellido).
- **Registro de Auditoría (`express_correcciones_log`):** Cada edición descuenta 1 corrección del saldo y deja asentado en la base de datos el campo alterado, su valor anterior y su valor nuevo.
- **Correcciones Adicionales:** Una vez agotadas las 2 correcciones gratuitas, el editor ofrece comprar un paquete de **2 correcciones extra por Bs. 30**, repitiendo el flujo de pago en `express_pagos`.
