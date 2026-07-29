# Festejia — Estado del Proyecto

> Última actualización: 29 de julio de 2026
> Este documento resume qué existe, dónde vive y cómo continuar el trabajo desde cualquier computadora.

## 1. Dónde está todo

| Recurso | Ubicación |
|---|---|
| Código fuente | GitHub, repo del proyecto, rama `main` |
| Hosting / despliegue | Vercel — proyecto `festejia/festejia` |
| Dominio | festejia.com (apunta al proyecto de Vercel) |
| Base de datos | Supabase (proyecto único, URL en `lib/supabase.js`) |
| Autenticación | Supabase Auth (mismo proyecto, usuarios Premium y Express separados por tabla, no por proyecto) |

**Todo lo que aparece en este documento ya está subido a GitHub y desplegado en Vercel.** Para confirmar que una máquina nueva tiene lo último:

```
git pull origin main
npm install
npm run build
```

Si el build pasa sin errores, la máquina está al día.

## 2. Últimos commits en `main` (verificado en `origin/main`)

```
8891b05  feat(express): agregar Eliminar en paneles y limitar a una sola plantilla editable
91afc27  fix(admin-express): evitar choque de slug al publicar sin nombres
7341dc1  feat(admin-express): panel para confirmar pagos y publicar invitaciones Express
90a6880  feat(express): editor tipo Canva con arquitectura de bloques dinámicos
f9b7e50  fix: decodificar correctamente isotipo, logotipo y video hero
f34d1cd  feat: agregar enlaces visibles a Festejia Express en la home
caea2fc  fix: recuperar isotipo, video hero y logotipo perdidos
0850235  fix(security): actualizar Next.js 14.2.5 -> 14.2.35 (parche RCE CVE-2025-55182)
262a518  feat(express): agregar módulo Festejia Express (auth, dashboard, editor, storage, pagos)
```

## 3. Festejia Premium (el negocio original)

Sitio de venta de invitaciones digitales hechas a mano por el equipo. **No se ha modificado su lógica de negocio** durante el trabajo de Express, solo se le agregó un enlace de navegación hacia Express.

- `/` — landing principal (planes Clásico/Elegante/Imperial, FAQ, testimonios)
- `/bodas`, `/quince`, `/graduaciones`, `/bautizos` — landings por tipo de evento
- `/login`, `/panel` — acceso y panel del cliente Premium
- `/admin` — panel del administrador (gestión de clientes y eventos)
- `/gestor`, `/checkin` — gestión de invitados y control de acceso al evento
- `/invitacion/[id]` — redirección a la plantilla HTML estática del cliente (`public/plantilla1/`, `public/plantilla2/`)
- Base de datos: tablas `profiles`, `eventos`, `invitados`, `clientes_login`

## 4. Festejia Express (el producto self-service, en construcción)

Permite que el cliente cree y edite su propia invitación sin depender del equipo de diseño. Vive en rutas y tablas completamente separadas de Premium (prefijo `express_`), documentado a fondo en `EXPRESS-ARQUITECTURA.md`.

### 4.1 Rutas públicas y de cliente

| Ruta | Qué hace |
|---|---|
| `/express` | Landing del producto Express |
| `/express/registro`, `/login`, `/recuperar`, `/restablecer` | Autenticación propia de Express (Supabase Auth, tabla `express_clientes`) |
| `/express/dashboard` | "Mis Invitaciones" — lista, estado, botones Ver/Editar y **Eliminar** (cualquier estado) |
| `/express/dashboard/nueva` | Selector de plantilla — **actualmente solo una opción habilitada** (ver sección 5) |
| `/express/dashboard/editor/[invitacionId]` | **Editor tipo Canva** de bloques dinámicos (ver sección 6) |
| `/express/dashboard/cuenta`, `/ayuda` | Cuenta del cliente y FAQ |

### 4.2 Panel de administración Express

`/admin-express` — separado de `/admin` (Premium), mismo criterio de acceso (`profiles.role = 'admin'`).

- Pestaña **Pagos pendientes**: confirmar o rechazar solicitudes de publicación / correcciones extra
- Pestaña **Todas las invitaciones**: Ver/Editar, Publicar manual (sin pago, para cortesías), Despublicar, **Eliminar**

### 4.3 Backend / IA

- `app/api/express/generate-text/route.js` — endpoint server-only, genera textos con IA (Kimi K3) por bloque+campo. Sin `KIMI_API_KEY` configurada responde con textos de respaldo razonables (no bloquea al usuario).
- `lib/express/payments.js` — abstracción de pagos. Hoy: WhatsApp manual (genera link pre-armado). Mañana: se puede cambiar a pasarela real sin tocar el resto del sistema.
- `lib/express/storage.js` — subida y compresión de fotos/música al bucket `express-media` de Supabase Storage.

## 5. Plantillas Express

**Solo hay una plantilla habilitada para elegir hoy: "Mármol" (`plantilla-a`)**, inspirada en el diseño real de la Plantilla 2 del catálogo Premium (`public/plantilla2/`): paleta verde salvia + dorado, mismas secciones (portada, cuenta regresiva, padres, ceremonia, recepción, itinerario, historia, galería, música, dress code, regalos, confirmación).

Las plantillas B, C, D, E ya están **definidas en código** (`lib/express/templates/plantilla-b.js` ... `plantilla-e.js`) pero **deshabilitadas** en el selector (`lib/express/validation.js` → `PLANTILLAS_EXPRESS`). Para habilitar una: agregar su id a ese array, no requiere tocar el editor.

> Nota técnica: la Plantilla 2 real (`public/plantilla2/index.html`) es un export de WordPress/Elementor con miles de clases propias de ese sistema. No se puede conectar directo al editor de bloques sin reescribir su motor de renderizado — por eso se recreó su diseño como plantilla nativa del editor en vez de reutilizar el HTML original.

## 6. El editor de bloques (la pieza más grande construida)

Arquitectura diseñada para que **agregar una plantilla nueva en el futuro no requiera tocar el editor**. Documentado en el chat de diseño, resumen aquí:

```
lib/express/blocks/
├── registry.js              # único lugar que mapea tipo -> {schema, Editor, Preview}
├── EditorEngine.js           # motor genérico: lee la plantilla activa y renderiza sus bloques
├── Accordion.js               # acordeón del panel izquierdo
├── SortableBlockItem.js       # envoltorio drag&drop (@dnd-kit)
├── BlockEditorForm.js         # formulario genérico por bloque
├── FieldRenderer.js           # dibuja cada tipo de campo (texto, imagen, galería, color, etc.)
├── BlockPreviewShell.js       # wrapper visual común de la vista previa (borde activo, hover editar)
├── validator.js                # validación genérica de campos obligatorios
├── sync.js                     # traduce el contenido de bloques a las columnas legacy de la BD
└── <17 carpetas de bloques>/  # informacion-principal, portada, cuenta-regresiva, ceremonia,
                                 # recepcion, itinerario, padres, padrinos, historia, galeria,
                                 # musica, dress-code, regalos, solo-adultos, confirmacion,
                                 # redes-sociales, configuracion
    ├── schema.js    # qué campos tiene, cuáles son obligatorios, si tiene botón IA
    ├── Editor.js     # formulario del panel (casi siempre delega en BlockEditorForm)
    └── Preview.js    # componente visual real (se reusará en el renderizador público /e/[slug])

lib/express/templates/
├── registry.js         # mapea id de plantilla -> config
└── plantilla-a..e.js   # cada una declara SOLO: qué bloques usa, en qué orden, qué estilo
```

Funcionalidad ya construida: acordeón dinámico, click en la vista previa abre el bloque correspondiente, drag & drop de reordenamiento (solo en bloques marcados como reordenables por la plantilla), autoguardado con debounce e indicador "Guardando.../Guardado", validación de campos obligatorios antes de publicar, botón "Generar con IA" por campo.

## 7. Base de datos (Supabase) — qué falta ejecutar

Todas las migraciones son **aditivas** (no borran ni modifican nada existente). Si una máquina nueva va a operar el panel admin o el editor nuevo, verificar en el SQL Editor de Supabase que estos tres scripts ya se ejecutaron, en este orden:

1. `scripts/express-migration.sql` — tablas base (`express_clientes`, `express_invitaciones`, `express_pagos`, `express_correcciones_log`, `express_ia_generaciones`) + bucket `express-media`. **Ya ejecutado según confirmación previa.**
2. `scripts/express-migration-bloques.sql` — agrega columnas `contenido` (jsonb) y `orden` (jsonb) a `express_invitaciones`, necesarias para el editor de bloques.
3. `scripts/express-migration-admin.sql` — agrega políticas RLS para que el admin pueda ver/editar invitaciones y pagos de cualquier usuario (antes solo el dueño de cada fila podía verla).

Verificación rápida en el SQL Editor:
```sql
select column_name from information_schema.columns
where table_name = 'express_invitaciones' and column_name in ('contenido','orden');

select policyname from pg_policies
where tablename in ('express_invitaciones','express_pagos') and policyname like '%admin%';
```

Si `contenido`/`orden` no aparecen, o no hay políticas `%admin%`, correr los scripts 2 y 3 respectivamente.

## 8. Verificado en esta revisión (29 julio 2026)

- `git status` limpio, sin cambios pendientes de commit.
- `HEAD` local idéntico a `origin/main` (nada por subir ni por bajar).
- `npm run build` compila sin errores.
- Producción responde 200 OK en `festejia.com/`, `festejia.com/express` y `festejia.com/admin-express`.
- Último deployment en Vercel: estado "Ready", ambiente "Production".

## 9. Pendiente / próximos pasos sugeridos

- [ ] Confirmar en Supabase que los 3 scripts de migración de la sección 7 ya corrieron (especialmente el 2 y 3, más recientes).
- [ ] Construir el renderizador público `/e/[slug]` que muestra la invitación ya publicada a los invitados (hoy solo existe el editor privado; los `Preview.js` de cada bloque ya están hechos para reutilizarse ahí).
- [ ] Configurar `KIMI_API_KEY` como variable de entorno en Vercel si se quiere IA real (hoy usa textos de respaldo).
- [ ] Reemplazar el número de WhatsApp de ejemplo (`59100000000`) en `lib/express/payments.js` y en el resto del sitio por el número real de Festejia.
- [ ] Decidir si se habilitan las plantillas B–E (ya están programadas, solo falta agregarlas a `PLANTILLAS_EXPRESS`) o si se reemplazan por diseños nuevos.
- [ ] `lib/notificaciones.js` y sus scripts SQL recuperados de un deployment viejo siguen sin conectarse a ninguna función activa — confirmar si son necesarios.
