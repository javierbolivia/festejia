# 09 - PANEL ADMINISTRADOR (FESTEJIA BESPOKE Y FESTEJIA EXPRESS)

> Sistema de Control Maestro y Operaciones Internas de Festejia.
> Rutas: `/admin` (Planes Bespoke: Clásico, Elegante, Imperial) y `/admin-express` (Autoservicio Express).

---

## 1. PANEL ADMINISTRADOR BESPOKE (`/admin`)

El panel principal de administración está diseñado para que el equipo interno de Festejia gestione las invitaciones de alta gama de los planes **Clásico ($45)**, **Elegante ($75)** e **Imperial ($110)**.

### 1.1. Control de Acceso y Seguridad (RBAC)
- **Ruta:** `c:\Users\user23\festejia\app\admin\page.js`
- **Verificación en el cliente:** Al montar el componente, ejecuta `checkAdmin()`:
  1. Verifica que exista sesión en Supabase Auth (`supabase.auth.getUser()`). Si no hay sesión, redirige a `/login`.
  2. Consulta la tabla `profiles` filtrando por `id === user.id`.
  3. Comprueba que `profiles.role === 'admin'`. Si no es admin, redirige inmediatamente a `/panel`.
- **Verificación en el servidor:** Todas las acciones destructivas o privilegiadas (creación de cuentas, borrado en cascada) se delegan a API Route Handlers server-only (`/api/admin/*`) que autentican el JWT y verifican el rol admin en la base de datos antes de usar la **Service Role Key** de Supabase.

### 1.2. Mapeo Comercial de Planes
En la base de datos, por motivos de retrocompatibilidad histórica con el esquema original, los planes se identifican con los siguientes nombres internos:
- `plus` ➔ **Plan Clásico** ($45 USD / Bs. 520)
- `premium` ➔ **Plan Elegante** ($75 USD / Bs. 860)
- `exclusive` ➔ **Plan Imperial** ($110 USD / Bs. 1270)

Constante de traducción en código:
```javascript
const NOMBRE_COMERCIAL_PLAN = {
  plus: 'Clásico',
  premium: 'Elegante',
  exclusive: 'Imperial',
}
```

### 1.3. Pestañas y Módulos del Panel Bespoke

#### A. Tab "Dashboard" (Métricas Globales)
Muestra un panel visual con tarjetas de conteo en tiempo real:
1. **Clientes:** Total de clientes bespoke registrados.
2. **Eventos:** Total de eventos creados.
3. **Activos:** Cantidad de clientes con estado `activo === true`.
4. **Plan Clásico:** Clientes con `plan === 'plus'`.
5. **Plan Elegante:** Clientes con `plan === 'premium'`.
6. **Plan Imperial:** Clientes con `plan === 'exclusive'`.
7. **Últimos Clientes:** Listado de los 5 clientes más recientes con su nombre y badge de plan con código de color.

#### B. Tab "Clientes" (Gestión de Anfitriones)
Permite supervisar, activar, suspender y eliminar cuentas de clientes:
- **Tabla de clientes:** Muestra Nombre, Usuario (extraído de `email.replace('@festejia.local', '')`), Plan (con badge cromático), Estado (`Activo` en verde o `Inactivo` en rojo), Fecha de registro y Acciones.
- **Acciones por cliente:**
  - **Activar / Desactivar (Toggle):** Ejecuta `supabase.from('profiles').update({ activo: !current }).eq('id', clientId)`. Si se desactiva, el anfitrión no puede acceder a su panel.
  - **Eliminar Cliente:** Llama a `/api/admin/delete-user` para una eliminación segura en cascada.

#### C. Proceso de Creación de Clientes (`+ Crear Nuevo Cliente`)
Formulario modal para dar de alta a una pareja o anfitrión:
- **Campos del formulario:**
  - `usuario`: Identificador alfanumérico en minúsculas (ej. `maria_juan`).
  - `password`: Mínimo 8 caracteres.
  - `nombre`: Nombre legible de los anfitriones (ej. `María & Juan`).
  - `plan`: Selector entre `plus` (Clásico $45), `premium` (Elegante $75), `exclusive` (Imperial $110).
  - `nombre_evento`: Nombre descriptivo (ej. `Boda María & Juan`).
  - `tipo`: Selector de tipo de evento (`boda`, `quince`, `graduacion`, `bautizo`, `otro`).
- **Lógica de Ejecución Server-Side (`/api/admin/create-client`):**
  1. Valida el token del administrador.
  2. Valida sintaxis de usuario con regex `/^[a-z0-9_-]{3,40}$/`.
  3. Valida longitud mínima de contraseña (8 caracteres).
  4. Crea la cuenta en Supabase Auth mediante `admin.auth.admin.createUser()` asignando el correo virtual `${usuario}@festejia.local` con confirmación automática de email (`email_confirm: true`).
  5. Inserta la fila en `profiles` con `role: 'client'`, `plan`, `nombre` y `activo: true`.
  6. Inserta en la tabla heredada `clientes_login` para trazabilidad de acceso.
  7. Inserta el registro inicial en la tabla `eventos` vinculado al `user_id`.
  8. **Mecanismo de Rollback Atómico:** Si cualquiera de los pasos falla después de crear el usuario en Auth, el servidor ejecuta una limpieza reversa automática eliminando los registros huérfanos en `invitados`, `eventos`, `clientes_login`, `profiles` y finalmente `auth.admin.deleteUser()`.

#### D. Tab "Eventos" (Diseño y Configuración Rápida)
Muestra una cuadrícula con tarjetas de todos los eventos:
- Nombre del evento, tipo y fecha programada.
- Estadísticas en vivo: Total de invitados creados y Total de confirmados.
- **Selector de Plantilla:** Dropdown para asociar el evento a una plantilla del catálogo (`plantilla1 - Sobre`, `plantilla2`, etc.).
- **Editor en Línea ("✏️ Editar Diseño"):**
  - Permite actualizar sin salir del panel los campos principales del evento:
    - Novio/a 1 (`nombre_novio1`)
    - Novio/a 2 (`nombre_novio2`)
    - Lugar de Ceremonia (`lugar_ceremonia`)
    - Hora de Ceremonia (`hora_ceremonia`)
    - Lugar de Recepción (`lugar_recepcion`)
    - Hora de Recepción (`hora_recepcion`)
  - Guarda en tiempo real mediante `supabase.from('eventos').update(...)` con evento `onBlur`.

#### E. Tab "Invitados" (Auditoría Global de Invitados)
- Muestra el total consolidado de invitados en la plataforma.
- Tabla unificada con: Nombre completo del invitado, Número de pases autorizados, Mesa asignada, Estado de confirmación (`confirmado`, `pendiente`, `rechazado`) y Nombre del Evento al que pertenece.

---

## 2. PANEL ADMINISTRADOR EXPRESS (`/admin-express`)

Diseñado específicamente para gestionar el flujo de autoservicio de **Festejia Express (Bs. 200)**.
- **Ruta:** `c:\Users\user23\festejia\app\admin-express\page.js`
- **Consultas backend:** Centralizadas en `lib/express/queries.js` y `lib/express/payments.js`.

### 2.1. Pestaña "Pagos Pendientes"
Muestra todas las solicitudes de pago que los clientes Express han generado al hacer clic en "Publicar" o en "Comprar correcciones adicionales".
- **Filtro de consulta:** `supabase.from('express_pagos').select('..., express_invitaciones(...)').eq('estado', 'pendiente').order('created_at', { ascending: true })`.
- **Datos visibles por tarjeta:**
  - Nombres de los homenajeados (`nombre1 & nombre2`).
  - Tipo de pago:
    - `publicacion`: Pago inicial para lanzar la invitación a internet (Bs. 200).
    - `correcciones_extra`: Pago para habilitar 2 cambios adicionales (Bs. 30).
  - Código interno único de la invitación (ej. `BOD-9482`).
  - Plantilla seleccionada.
  - Monto exacto en Bolivianos (`Bs. 200` o `Bs. 30`).
  - Fecha y hora exacta de la solicitud.
- **Acciones Disponibles:**
  1. **Confirmar Pago (`✓ Confirmar pago`):**
     - Ejecuta `confirmarPagoAdmin(pagoId, user.id)`.
     - Actualiza el pago a `estado = 'confirmado'` y guarda el ID del admin y la marca de tiempo `confirmado_at`.
     - **Automatización de Publicación:** Si el pago es de tipo `publicacion`, actualiza automáticamente la invitación asociada:
       - Cambia su estado a `publicada`.
       - Registra `fecha_publicacion = now()`.
       - Calcula la **fecha de expiración**: toma la fecha del evento (`fecha_evento`) y le suma automáticamente **1 día**.
     - **Automatización de Correcciones:** Si el pago es de tipo `correcciones_extra`, suma `+ 2` al contador `correcciones_disponibles`.
  2. **Rechazar Pago (`✕ Rechazar`):**
     - Ejecuta `rechazarPagoAdmin(pagoId, user.id)`.
     - Marca el pago como `rechazado`. El cliente recibe la notificación y debe volver a enviar comprobante si hubo un error.

### 2.2. Pestaña "Todas las Invitaciones Express"
Tabla con el inventario completo de invitaciones Express creadas en la plataforma:
- **Columnas:**
  - **Nombre:** Nombres de los festejados.
  - **Código:** Código interno de control.
  - **Plantilla:** Identificador del diseño.
  - **Estado:** Badge con indicador visual:
    - `Borrador` (Gris, `#999`)
    - `Pendiente de pago` (Amarillo, `#eab308`)
    - `Publicada` (Verde, `#22c55e`)
    - `Expirada` (Rojo, `#ef4444`)
  - **Correcciones:** Número de correcciones restantes.
  - **Slug:** Enlace público clickable hacia `/e/[slug]`.
  - **Acciones Operativas:**
    - **Ver / Editar:** Abre el editor interactivo de bloques en `/express/dashboard/editor/[id]`.
    - **Publicar Manual:** Permite al administrador publicar una invitación inmediatamente sin necesidad de registrar un pago (útil para cortesías, influencers, pruebas o pagos en efectivo fuera del sistema). Auto-genera un slug normalizado si no existía.
    - **Despublicar:** Regresa la invitación al estado `borrador`, deshabilitando el acceso público si se detectó algún error o incumplimiento.
    - **Eliminar:** Borra permanentemente la invitación y su historial asociado en `express_pagos` y `express_correcciones_log`.

---

## 3. APIS SERVER-SIDE DE ADMINISTRACIÓN

### `/api/admin/create-client` (`POST`)
- Valida sesión de admin.
- Entrada: `{ usuario, password, nombre, plan, nombre_evento, tipo }`.
- Crea credenciales Auth (`${usuario}@festejia.local`).
- Provisiona fila en `profiles` y crea el evento inicial en `eventos`.
- Rollback transaccional ante excepciones.

### `/api/admin/delete-user` (`POST`)
- Valida sesión de admin.
- Entrada: `{ clientId }`.
- Borra en orden relacional:
  1. `invitados` pertenecientes a los eventos del cliente.
  2. `eventos` del cliente.
  3. `clientes_login` vinculados a su perfil.
  4. Perfil en `profiles`.
  5. Usuario real en el motor de autenticación `auth.admin.deleteUser(clientId)`.

### `/api/admin/express-client-ids` (`GET`)
- Valida sesión de admin.
- Retorna la lista de UUIDs de clientes registrados en `express_clientes`.
- Utilizado por el panel `/admin` para filtrar y asegurar que los clientes Express no aparezcan en la vista de clientes Bespoke.
