---
tipo: sintesis
tags: [festejia, admin, backend, administracion, control, seguridad, rbac, rollback]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-09-panel-administrador]]", "[[09_PANEL_ADMINISTRADOR|raw/documentos/festejia/09_PANEL_ADMINISTRADOR.md]]", "[[festejia-arquitectura-backend-base-datos]]"]
---

# Especificación Completa del Panel de Administración (Admin)

Este documento detalla la arquitectura, vistas, endpoints y flujos operativos del **Panel de Administración** de [[festejia]] (`/admin` y `/admin-express`), la herramienta interna con la que el equipo gestiona clientes, invitaciones, pagos y catálogos.

---

## 1. Módulos y Rutas Administrativas

| Ruta | Nombre del Módulo | Propósito y Función | Nivel de Acceso |
|---|---|---|:---:|
| `/login` | Acceso Unificado | Autenticación con verificación de rol (`admin` vs `cliente`). Normalización automática `@festejia.local`. | Público / Seguro |
| `/admin` | Panel Central de Control | Altas de clientes, asignación de planes, catálogo y slugs para planes Bespoke (Clásico, Elegante, Imperial). | Rol `admin` |
| `/admin-express` | Gestión de Órdenes Express | Validación de comprobantes de pago, aprobación/rechazo y publicación manual de Express. | Rol `admin` |
| `/api/admin/*` | Endpoints Protegidos | APIs para creación con rollback, borrado en cascada y consulta con **Service Role Key**. | JWT + Rol Admin |

---

## 2. Mapeo Interno de Planes en Base de Datos

Por retrocompatibilidad con el esquema original de Supabase:
```javascript
const NOMBRE_COMERCIAL_PLAN = {
  plus: 'Clásico',      // $45 USD / Bs. 520
  premium: 'Elegante',   // $75 USD / Bs. 860
  exclusive: 'Imperial', // $110 USD / Bs. 1.270
};
```

---

## 3. Panel Central Bespoke (`/admin`)

Estructurado en 4 pestañas operativas:

### A. Tab "Dashboard" (Métricas Globales en Tiempo Real)
- Total de clientes registrados y eventos creados.
- Conteo de clientes activos (`activo === true`).
- Conteo desglosado por plan: Clásicos (`plus`), Elegantes (`premium`) e Imperiales (`exclusive`).
- Tabla de los últimos 5 clientes dados de alta con badge cromático.

### B. Tab "Clientes" (Gestión de Anfitriones)
- Tabla completa: Nombre, Usuario (sin `@festejia.local`), Plan, Estado (`Activo` en verde / `Inactivo` en rojo) y Fecha de registro.
- **Toggle Activar / Desactivar**: Si se desactiva, el anfitrión queda bloqueado y no puede entrar a `/panel` o `/gestor`.
- **Eliminación en Cascada**: Llama a `/api/admin/delete-user` para borrar secuencialmente registros en `invitados`, `eventos`, `clientes_login`, `profiles` y `auth.users`.

### C. Formulario de Alta con Rollback Atómico (`+ Crear Nuevo Cliente`)
- Campos: `usuario` (regex `/^[a-z0-9_-]{3,40}$/`), `password` (min 8 chars), `nombre`, `plan` (`plus`, `premium`, `exclusive`), `nombre_evento`, `tipo` (`boda`, `quince`, etc.).
- **Garantía Transaccional**: Si la creación de base de datos falla tras haber creado el usuario en Supabase Auth, el servidor ejecuta una limpieza reversa automática eliminando registros parciales para evitar usuarios corruptos o huérfanos.

### D. Tab "Eventos" (Diseño y Edición Rápida)
- Tarjetas con estadísticas: invitados registrados vs confirmados.
- Selector de Plantilla: dropdown para vincular con `plantilla1` (Sobre con lacre) o `plantilla2` (Mármol & Oro).
- **Editor en Línea ("✏️ Editar Diseño")**: Actualiza nombres de novios, lugares y horarios de ceremonia y recepción en tiempo real mediante `onBlur`.

### E. Tab "Invitados" (Auditoría Consolidada)
- Vista unificada de todos los invitados de todos los eventos en la plataforma con nombre, pases, mesa, estado y evento asociado.

---

## 4. Panel Festejia Express (`/admin-express`)

### A. Pestaña "Pagos Pendientes"
Lista las solicitudes generadas por clientes al pulsar "Pagar y Publicar":
- Datos: Nombres de agasajados, tipo de pago (`publicacion` Bs. 200 o `correcciones_extra` Bs. 30), código interno (`EXP-XXXX`), plantilla y monto.
- **Acción `✓ Confirmar pago`**:
  - Cambia pago a `confirmado`.
  - Si es `publicacion`: pasa la invitación a `publicada`, guarda `fecha_publicacion = now()` y **calcula automáticamente la fecha de expiración sumando +1 día a la fecha del evento (`fecha_evento + interval '1 day'`)**.
  - Si es `correcciones_extra`: suma `+2` al saldo de correcciones.
- **Acción `✕ Rechazar`**: Marca el pago como `rechazado` para que el cliente rectifique su comprobante.

### B. Pestaña "Todas las Invitaciones Express"
- Inventario completo con filtros por estado: `Borrador` (Gris), `Pendiente de pago` (Amarillo), `Publicada` (Verde), `Expirada` (Rojo).
- **Publicación Manual**: Permite activar invitaciones inmediatamente sin requerir pago (para influencers, cortesías o cobros en efectivo presenciales).
- **Despublicar**: Regresa la invitación a `borrador` retirándola de internet.

---

## 5. Contratos de APIs Server-Side

### `POST /api/admin/create-client`
```json
{
  "usuario": "sofiaymateo",
  "password": "PasswordSeguro2026",
  "nombre": "Sofía & Mateo",
  "plan": "premium",
  "nombre_evento": "Boda Sofía & Mateo",
  "tipo": "boda"
}
```
**Respuesta:** `{"success": true, "clientId": "uuid", "email": "sofiaymateo@festejia.local"}`.

### `POST /api/admin/delete-user`
```json
{ "clientId": "uuid" }
```
**Respuesta:** `{"success": true, "message": "Usuario y dependencias eliminadas con éxito"}`.

### `GET /api/admin/express-client-ids`
Devuelve array de UUIDs de clientes en `express_clientes` para aislarlos de las vistas Bespoke.

---

## Enlaces Relacionados
- [[festejia-especificacion-panel-cliente]]
- [[triggers-postgresql-supabase]]
- [[festejia-arquitectura-backend-base-datos]]
- [[festejia-hoja-de-ruta-pagos-bolivia]]
- [[festejia-guia-desarrollo-web]]
