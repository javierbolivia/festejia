# 10 - PANEL DEL CLIENTE, GESTOR Y CONTROL DE ACCESO (CHECK-IN)

> La experiencia completa del anfitrión en Festejia: desde el inicio de sesión hasta la gestión de invitados, control de mesas, confirmaciones en tiempo real y recepción en puerta con código QR.
> Rutas: `/login`, `/panel`, `/gestor`, `/checkin`.

---

## 1. SISTEMA DE ACCESO Y ENRUTAMIENTO INTELIGENTE (`/login`)

- **Ruta:** `c:\Users\user23\festejia\app\login\page.js`
- **Mecanismo de Autenticación:** Supabase Auth (`supabase.auth.signInWithPassword`).

### 1.1. Normalización de Credenciales
Festejia provee a los anfitriones un nombre de usuario amigable y sencillo (ej. `maria_juan`).
Para mantener compatibilidad con el estándar de Supabase Auth (que exige correos electrónicos válidos), el formulario aplica una regla automática:
```javascript
const email = usuario.includes('@') ? usuario : usuario + '@festejia.local'
```
Si el usuario introduce `maria_juan`, el sistema autentica internamente contra `maria_juan@festejia.local`. Los administradores pueden ingresar directamente con su correo real (ej. `admin@festejia.com`).

### 1.2. Router Inteligente Post-Login (RBAC y Planes)
Una vez autenticado el usuario, el sistema inspecciona su perfil y lo redirige automáticamente a la interfaz correspondiente a su producto contratado:
1. **Cliente Festejia Express:**
   - Consulta `express_clientes` por `id === data.user.id`.
   - Si existe ➔ Redirige a `/express/dashboard`.
2. **Administrador:**
   - Consulta `profiles` por `id === data.user.id`.
   - Si `role === 'admin'` ➔ Redirige a `/admin`.
3. **Cliente Bespoke Premium / Imperial:**
   - Si `plan === 'premium'` (Plan Elegante) o `plan === 'exclusive'` (Plan Imperial) ➔ Redirige a `/panel` (Panel Completo).
4. **Cliente Bespoke Clásico:**
   - Si `plan === 'plus'` (Plan Clásico) ➔ Redirige a `/gestor` (Gestor Lite optimizado).

---

## 2. PANEL DEL ANFITRIÓN COMPLETO (`/panel`)

Exclusivo para los anfitriones de **Plan Elegante ($75)** y **Plan Imperial ($110)**.
- **Ruta:** `c:\Users\user23\festejia\app\panel\page.js`

### 2.1. Arquitectura en Tiempo Real (WebSockets con Supabase Channels)
El panel cuenta con dos suscripciones de baja latencia que actualizan la interfaz sin necesidad de recargar la página:
1. **Canal de Notificaciones Personales (`notif-[user.id]`):**
   - Escucha eventos `INSERT` en la tabla `notificaciones` filtrados por `user_id = user.id`.
   - Alerta en vivo cuando un invitado confirma o rechaza su invitación desde la web pública.
2. **Canal de Invitados (`invitados-realtime-[evento.id]`):**
   - Escucha cambios (`*`) en la tabla `invitados` restringidos al `evento_id` del anfitrión.
   - Refresca automáticamente las estadísticas de confirmados, pendientes y rechazados al instante.

### 2.2. Sistema de Notificaciones en Vivo (Campana Flotante)
- Ubicada en la barra superior del panel (`panel-header`).
- Muestra un badge rojo con el número de notificaciones no leídas (`notifsNoLeidas`).
- Menú desplegable con:
  - Botón **"Marcar todas"** como leídas.
  - Lista de alertas con icono contextual (`🎉`, `✉️`, `❌`), título, descripción del mensaje y cálculo de tiempo relativo ("Ahora", "Hace 5 min", "Hace 2h", "Hace 3d").
  - Indicador de punto dorado (`notif-dot`) para elementos pendientes de lectura.

### 2.3. Cabecera y Configuración del Evento
Tarjeta superior siempre visible que permite al anfitrión afinar los detalles de su celebración:
- **Nombre del Evento:** Editable en vivo (ej. "Nuestra Boda - Sofía & Mateo").
- **Tipo de Evento:** Badge con coloración distintiva (`boda`, `quince`, `graduacion`, `bautizo`).
- **Fecha del Evento:** Selector de fecha utilizado para el reloj de cuenta regresiva.
- **Fecha Límite de Confirmación (RSVP Deadline):** Establece el día límite en que los invitados pueden confirmar su asistencia.
- **Mensaje Personalizado de WhatsApp:** Texto predeterminado que acompañará al enlace de la invitación cuando el anfitrión lo comparta con sus invitados.

### 2.4. Barra de Cuenta Regresiva y Progreso Visual
- **Countdown Bar:** Muestra en tipografía elegante el número de días restantes ("X días para tu evento" o "¡Es el día de tu evento!").
- **Progress Bar de Confirmaciones:**
  - Barra de progreso con relleno en degradado verde calculando el porcentaje total: `(confirmados / total) * 100`.
  - Leyenda desglosada con colores semánticos: Verde (confirmados), Amarillo (pendientes), Rojo (rechazados).

### 2.5. Tablero de Métricas (KPI Grid)
Muestra 7 tarjetas estadísticas con números grandes:
1. **Invitados:** Total de registros en la lista.
2. **Pases:** Suma total de pases individuales asignados (`num_pases`).
3. **Confirmados:** Invitados con estado `confirmado` (tarjeta verde).
4. **Pendientes:** Invitados que no han respondido (tarjeta amarilla).
5. **Rechazados:** Invitados que declinaron la asistencia (tarjeta roja).
6. **Enviadas:** Cantidad de invitaciones marcadas como enviadas por el anfitrión.
7. **Ingresados:** Invitados que ya pasaron por el control de ingreso / check-in (tarjeta azul).

### 2.6. Pestaña "Invitados" (El Corazón de la Gestión)
Permite el control total de la lista de invitados:

#### Límite de Invitados según el Plan Contratado:
- **Plan Elegante (`premium`):** Límite de **150 invitados**.
- **Plan Imperial (`exclusive`):** Invitados **ilimitados (9999)**.
- El botón de creación muestra el contador actual (ej. `+ Agregar Invitado (48/150)`). Al llegar al límite, el sistema bloquea nuevas altas y solicita contactar a Festejia para un upgrade.

#### Barra de Herramientas (Toolbar):
- **+ Agregar Invitado:** Despliega el formulario rápido de registro.
- **📥 Exportar Excel:** Genera un archivo `.csv` descargable con codificación `UTF-8 BOM` (compatible con Microsoft Excel, Google Sheets y Apple Numbers) con las columnas: Nombre, Pases, Mesa, Estado, Enviada, Fecha Confirmación y Mensaje del Invitado. *Habilitado para planes Elegante e Imperial.*
- **👁️ Ver Invitación:** Enlace directo que abre la invitación web interactiva del primer invitado para previsualizar la experiencia final.
- **Buscador Instantáneo:** Filtro en tiempo real por nombre sin recargar la página.
- **Selector de Filtro de Estado:** Permite segmentar por `Todos`, `Confirmados`, `Pendientes`, `Rechazados`, `Enviadas` y `No enviadas`.

#### Optimización de Alto Rendimiento (`GuestRow` con `React.memo`):
Para garantizar que listas de cientos de invitados no generen lentitud al escribir en el buscador, cada fila de la tabla está aislada en un componente `GuestRow` memoizado con `React.memo` y manejadores estabilizados mediante `useCallback`.

#### Acciones por Invitado:
- **Nombre y Pases:** Modificables con edición en línea (`inline-edit`).
- **Mesa Asignada:** Campo para asignar número o nombre de mesa (ej. "Mesa 4" o "Mesa Principal").
- **Badge de Estado:** Muestra visualmente si está `confirmado` (verde), `pendiente` (amarillo) o `rechazado` (rojo).
- **Botón de Envío (`Enviada`):** Switch interactivo `✓ Sí` / `○ No` para que el anfitrión marque a quiénes ya les envió el enlace por WhatsApp y evitar duplicados.
- **Copiar Link (📋):** Copia al portapapeles el mensaje personalizado del anfitrión junto con la URL única del invitado: `https://www.festejia.com/invitacion/[guest.id]`.
- **Compartir por WhatsApp (💬):** Abre directamente la app de WhatsApp (`wa.me/?text=...`) con el mensaje pre-cargado listo para enviar al contacto.
- **Eliminar (🗑️):** Elimina al invitado previa confirmación.

### 2.7. Pestaña "Mensajes" (Muro de Buenos Deseos)
- Recopila todas las felicitaciones, notas de cariño y dedicatorias escritas por los invitados en el formulario de confirmación de la invitación web.
- Cada tarjeta muestra el nombre del invitado, su estado y el texto entre comillas con estilo itálico elegante.

### 2.8. Pestaña "Check-in" (Resumen de Ingresos)
- Disponible dentro del panel para clientes con función de control de acceso activa.
- Muestra el total de personas que ya ingresaron respecto a los confirmados (`Ingresados: 85 / 120 confirmados`).
- Lista con botón de marcado rápido para registrar la llegada manual de un invitado y su hora exacta.

---

## 3. GESTOR LITE PARA PLAN CLÁSICO (`/gestor`)

Diseñado específicamente para el **Plan Clásico ($45 USD / Bs. 520)**.
- **Ruta:** `c:\Users\user23\festejia\app\gestor\page.js`
- **Filosofía:** Experiencia ultra-simplificada, ágil y sin fricción técnica. Pensada para eventos íntimos o familias que buscan una lista de confirmaciones directa sin la complejidad de diagramación de mesas ni escáneres QR.

### 3.1. Funcionalidades del Gestor Lite
- Encabezado minimalista con el nombre del evento y resumen rápido (`X confirmados · Y pendientes · Z total`).
- Formulario rápido: Nombre completo + Cantidad de pases.
- Tabla compacta:
  - Nombre del invitado.
  - Cantidad de pases.
  - Estado de confirmación (`confirmado`, `pendiente`, `rechazado`).
  - Botón **Copiar link** (📋).
  - Botón **WhatsApp** (💬).
  - Botón **Eliminar** (🗑️).

---

## 4. SISTEMA DE CONTROL DE PUERTA Y ESCÁNER QR (`/checkin`)

La herramienta profesional para recepcionistas, doormen y wedding planners el día del evento. Exclusivo del **Plan Imperial ($110 USD / Bs. 1270)**.
- **Ruta:** `c:\Users\user23\festejia\app\checkin\page.js`
- **Control de Seguridad (RBAC):** Solo accesible si `profiles.plan === 'exclusive'`. Si un usuario de Plan Clásico o Elegante intenta acceder por URL directa, es devuelto a su panel correspondiente.

### 4.1. Tecnología del Escáner
- **Acceso a Hardware:** Utiliza la API nativa del navegador `navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })`, seleccionando automáticamente la cámara trasera principal del smartphone.
- **Librería jsQR con Carga Dinámica Segura:** Inyecta dinámicamente `jsQR` vía CDN con un temporizador de seguridad de 10 segundos (`cargarScriptJsQR()`). Si la red del salón tiene firewall o el CDN no responde, emite una advertencia clara en lugar de congelar la pantalla.
- **Bucle de Análisis:** Captura frames cada 500 ms dibujándolos en un elemento `<canvas>` invisible para extraer los datos bidimensionales.

### 4.2. Formato del Token QR y Prevención de Fraude
- **Estructura del Payload:** Cada invitado cuenta con un código QR único que codifica la cadena propietaria:
  ```text
  festejia:UUID_DEL_INVITADO
  ```
- **Filtro Anti-Rebote con Mutable Ref (`useRef`):**
  Para evitar que la cámara procese 10 veces seguidas el mismo código mientras el invitado sostiene el teléfono frente al lente, el sistema registra el ID en `ultimoEscaneadoRef.current` con un enfriamiento de 3 segundos.

### 4.3. Reglas de Validación en Puerta
Al escanear un código, el sistema consulta en Supabase y evalúa cuatro escenarios:
1. **Acceso Autorizado (Éxito):**
   - El invitado existe y su estado es `confirmado`.
   - Marca `ingreso = true` y guarda `fecha_ingreso = now()`.
   - Respuesta visual verde: `"✓ [Nombre] — X pase(s) — Mesa Y"`.
   - Dispara vibración física de confirmación en el teléfono del recepcionista: `navigator.vibrate(200)`.
2. **Intento de Reingreso o Fraude (Alerta Amarilla/Roja):**
   - Si `invitado.ingreso === true`.
   - Alerta visible: `"⚠️ [Nombre] YA INGRESÓ anteriormente"`.
   - Evita que un invitado le envíe una captura de pantalla de su QR a un amigo para que ingrese con el mismo pase.
3. **Invitado No Confirmado:**
   - Si `invitado.estado !== 'confirmado'` (ej. figura como `pendiente` o `rechazado`).
   - Alerta visible: `"⚠️ [Nombre] NO confirmó asistencia (estado: pendiente)"`.
4. **QR No Reconocido:**
   - Si el ID no existe en la base de datos de Festejia.
   - Alerta visible: `"QR no válido. Invitado no encontrado."`.

### 4.4. Módulo de Entrada Manual de Emergencia
Si un invitado llega al evento sin batería en su teléfono móvil o no guardó el QR:
- La pantalla de Check-in incluye un buscador manual: `"O busca por nombre:"`.
- Permite escribir parte del nombre (ej. "Carlos Gómez") y ejecuta un query flexible con operador `ilike`.
- Registra el ingreso de inmediato con los mismos sellos de auditoría que el escaneo por cámara.

### 4.5. Historial en Vivo de Ingresos
Muestra una lista en tiempo real de los últimos asistentes que han cruzado la puerta con su nombre, cantidad de pases ingresados y la hora exacta en formato local (`new Date(h.fecha_ingreso).toLocaleTimeString('es')`).
