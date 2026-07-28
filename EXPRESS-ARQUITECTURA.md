# FESTEJIA EXPRESS — Documento Técnico de Arquitectura

> Este documento define cómo se integra el nuevo servicio "Express" al proyecto Festejia
> existente, siguiendo el principio **Open for Extension, Closed for Modification**.
>
> REGLA DE ORO: Nada de lo que ya funciona en Festejia (landing, panel, admin, gestor,
> checkin, plantillas 1/2/3, tablas profiles/eventos/invitados/clientes_login) se modifica,
> se reemplaza ni se toca. Express es 100% aditivo.

---

## 0. Hallazgos del análisis del código real (base para todo lo que sigue)

| Elemento | Estado actual real |
|---|---|
| Framework | Next.js 14.2.5, App Router, JavaScript plano (sin TypeScript) |
| Estilos | `<style jsx>` inline por página (styled-jsx nativo), sin Tailwind |
| Dependencias | Solo `@supabase/supabase-js`, `next`, `qrcode`, `react`, `react-dom` |
| Supabase client | Un único archivo `lib/supabase.js`, URL y anon key hardcodeados |
| Auth | Un solo proyecto Supabase Auth. Usuarios Premium con emails falsos `usuario@festejia.local` |
| Enrutamiento por rol | `profiles.role` + `profiles.plan` deciden redirect en `/login` |
| Tablas existentes | `profiles`, `eventos`, `invitados`, `clientes_login` |
| Plantillas | HTML estático en `public/plantilla1/`, `plantilla2/`, `plantilla3/`. Leen query params y hacen fetch directo a Supabase REST con anon key embebido |
| Renderizado público | `app/invitacion/[id]/page.js` hace redirect client-side hacia `/plantillaN/?...` |
| Storage de fotos | No se usa Supabase Storage actualmente (fotos son archivos estáticos) |
| API routes | No existe ninguna carpeta `app/api/` todavía |
| Vercel config | `vercel.json` solo tiene `{"framework": "nextjs"}` |

Conclusión: **Express no colisiona con nada existente** si se siguen las reglas de este documento. No hay ninguna carpeta, tabla ni ruta que se solape.

---

## 1. Principio rector

Festejia Premium y Festejia Express comparten el mismo proyecto Next.js y el mismo
proyecto Supabase, pero son dos sistemas lógicamente independientes que nunca se
tocan entre sí.

Lo único compartido:
- El mismo repositorio (un solo deploy en Vercel)
- El mismo proyecto Supabase (Auth + DB), con tablas nuevas y separadas
- El archivo `lib/supabase.js`, reutilizado tal cual, sin editarlo

---

## 2. Archivos y tablas que NO se tocan (Closed for Modification)

```
app/page.js
app/login/page.js
app/panel/page.js
app/gestor/page.js
app/admin/page.js
app/checkin/page.js
app/invitacion/[id]/page.js
app/layout.js
app/globals.css
app/bodas/, app/quince/, app/graduaciones/, app/bautizos/
lib/supabase.js
lib/client-helper.js
public/plantilla1/, public/plantilla2/, public/plantilla3/
scripts/fix-plantilla2.js, scripts/preparar-plantilla.ps1
Tablas: profiles, eventos, invitados, clientes_login
```

Si en algún punto del desarrollo se necesitara tocar alguno de estos, se detiene y
se discute antes — nunca se hace por defecto.

---

## 3. Estructura de carpetas nueva (Open for Extension)

```
app/
├── express/
│   ├── page.js                       -> /express (landing del producto)
│   ├── registro/page.js              -> /express/registro
│   ├── login/page.js                 -> /express/login
│   ├── recuperar/page.js             -> /express/recuperar
│   ├── restablecer/page.js           -> /express/restablecer
│   └── dashboard/
│       ├── page.js                   -> /express/dashboard (Mis Invitaciones)
│       ├── nueva/page.js             -> /express/dashboard/nueva
│       ├── editor/[invitacionId]/page.js
│       ├── cuenta/page.js
│       └── ayuda/page.js
│
├── e/
│   └── [slug]/page.js                -> /e/laura-y-carlos (renderizador publico)
│
├── admin-express/
│   └── page.js                       -> /admin-express (gestion de pagos)
│
└── api/
    └── express/
        ├── generate-text/route.js
        ├── solicitar-publicacion/route.js
        └── cron/expirar/route.js

lib/
└── express/
    ├── queries.js
    ├── payments.js
    ├── storage.js
    └── validation.js

public/
└── express-plantillas/
    ├── shared/
    │   └── render-itinerario.js
    ├── plantilla-a/index.html
    ├── plantilla-b/index.html
    └── ... (hasta 8)
```

Nada de esto existe hoy. Todo son archivos y carpetas nuevas.

---

## 4. Base de datos — tablas nuevas (sin tocar las existentes)

Todas con prefijo `express_` para evitar cualquier confusión con las tablas Premium.

### `express_clientes`
```
id (= auth.users.id, FK)
email
nombre
telefono
created_at
```

### `express_invitaciones`
```
id
user_id (FK -> auth.users)
plantilla
slug (unico)
estado ('borrador' | 'pendiente_pago' | 'publicada' | 'expirada')
codigo_interno

nombre1, nombre2
fecha_evento, hora_evento
padres_novia, padres_novio, padrinos

ceremonia_lugar, ceremonia_maps_url, ceremonia_hora
recepcion_lugar, recepcion_maps_url, recepcion_hora

itinerario (JSONB)
dresscode, colores_sugeridos (JSONB)
solo_adultos (boolean)

mensaje_bienvenida, mensaje_regalos, mensaje_dresscode, mensaje_solo_adultos

regalo_qr_url, regalo_mesa_link

foto_portada_url
fotos_galeria (JSONB)
musica_url

correcciones_disponibles (int, default 2)
correcciones_usadas (int, default 0)

fecha_publicacion
fecha_expiracion
created_at, updated_at
```

### `express_pagos`
```
id
invitacion_id (FK)
tipo ('publicacion' | 'correcciones_extra')
monto
moneda ('BOB')
metodo ('whatsapp_manual' | 'libelula_qr' | 'libelula_link' | 'libelula_api')
estado ('pendiente' | 'confirmado' | 'rechazado')
referencia_externa
confirmado_por
confirmado_at
created_at
```

### `express_correcciones_log` (recomendada)
```
id, invitacion_id, campo_modificado, valor_anterior, valor_nuevo, created_at
```

### `express_ia_generaciones` (recomendada)
```
id, invitacion_id, tipo_texto, prompt_usado, resultado, tokens_usados, costo_estimado, created_at
```

### Storage
Nuevo bucket `express-media` (el proyecto no usa Storage hoy, terreno limpio):
```
express-media/{user_id}/{invitacion_id}/portada.webp
express-media/{user_id}/{invitacion_id}/galeria-1.webp
express-media/{user_id}/{invitacion_id}/galeria-2.webp
express-media/{user_id}/{invitacion_id}/galeria-3.webp
express-media/{user_id}/{invitacion_id}/musica.mp3
```

---

## 5. Auth separada — sin duplicar Supabase

Es el mismo proyecto Supabase Auth, pero la separacion se logra asi:

1. Los usuarios Express nunca se insertan en `profiles`, solo en `express_clientes`.
   Esto garantiza que el login Premium jamas los reconozca.
2. Registro con email real (no `@festejia.local`), porque Express necesita
   "olvide mi contrasena" funcional via correo real.
3. Rutas de login separadas: `/express/login` vs `/login`.
4. La configuracion global "Confirmar email" de Supabase Auth es a nivel de
   proyecto, no por flujo. No se toca esa configuracion global para no afectar
   la creacion de cuentas Premium. Express funciona con signUp/signIn estandar
   sin depender de que la confirmacion este activada.
5. RLS nuevas y propias para las tablas `express_*` (un usuario solo ve sus
   propias filas; el publico solo ve invitaciones con estado publicada y no
   expiradas). No se tocan las politicas de las tablas existentes.

---

## 6. Reutilizacion de `lib/supabase.js` (sin modificarlo)

No se crea un segundo cliente Supabase. Todo archivo nuevo de Express hace:

```
import { supabase } from '../supabase'
```

Mismo cliente, mismo archivo, sin editarlo. La separacion Premium/Express ocurre
a nivel de que tablas consulta cada modulo, no a nivel de que cliente usan.

---

## 7. Reutilizacion del patron de plantillas existente

Patron actual (plantilla1/2/3): HTML estatico -> lee query params -> fetch directo
a Supabase con anon key -> renderiza.

Express reutiliza el mismo patron, no uno nuevo:
- Las plantillas Express consultan `express_invitaciones` en vez de `eventos`/`invitados`.
- Un solo archivo JS compartido (`public/express-plantillas/shared/render-itinerario.js`)
  para la logica de renderizar la lista dinamica de itinerario, evitando duplicarla
  en cada plantilla. El resto de cada plantilla sigue siendo HTML/CSS propio.
- El renderizador publico (`app/e/[slug]/page.js`) sigue el mismo mecanismo que
  `app/invitacion/[id]/page.js`: busca, valida estado, redirige client-side.

Las plantillas Premium no se modifican para lograr esto.

---

## 8. Ruta publica y estados de la invitacion

```
/e/laura-y-carlos
     -> app/e/[slug]/page.js consulta express_invitaciones por slug
     -> si estado=publicada y fecha_expiracion >= hoy:
            redirect a /express-plantillas/plantilla-a/?id=...
     -> si no:
            pagina "Invitacion no disponible"
```

Esto evita exponer contenido en borrador o ya expirado.

---

## 9. Flujo de pago (WhatsApp manual hoy, Libelula mañana)

`lib/express/payments.js` expone funciones con nombres estables, sin importar el
metodo real detras:

```
iniciarPagoPublicacion(invitacionId)
iniciarPagoCorreccionExtra(invitacionId)
confirmarPago(pagoId, adminUserId)
```

Hoy: `iniciarPagoPublicacion()` crea el registro en `express_pagos` con
`metodo='whatsapp_manual'`, genera el link wa.me con nombre, correo, plantilla,
codigo interno y "Plan Express", y lo abre.

Mañana (Libelula): la misma funcion cambia por dentro (genera un link de pago via
su API), pero el editor, el boton Publicar y el admin no cambian nada porque solo
conocen el nombre de la funcion, no su implementacion.

`confirmarPago()` es lo que usas desde `/admin-express`: marca el pago confirmado
y automaticamente pasa `express_invitaciones.estado` de `pendiente_pago` a
`publicada`, fijando `fecha_publicacion` y `fecha_expiracion`.

---

## 10. Panel de administracion Express (separado del actual)

`app/admin-express/page.js` es nuevo. `app/admin/page.js` no se toca. Ambos
verifican lo mismo (tu cuenta admin) pero son archivos y rutas distintas.
Ahi veras invitaciones pendientes de pago, boton para marcarlas Pagado, y
solicitudes de correcciones extra pendientes de cobrar.

---

## 11. IA (Kimi K3) — nunca en el navegador

`app/api/express/generate-text/route.js` corre en servidor. El editor llama a
este endpoint interno; el endpoint es el unico que conoce `KIMI_API_KEY`
(variable de entorno en Vercel, nunca expuesta al navegador).

---

## 12. Expiracion automatica

Un Vercel Cron Job llama diariamente a `app/api/express/cron/expirar/route.js`,
que marca `expirada` toda invitacion con `fecha_expiracion < hoy`. Alternativa:
`pg_cron` de Supabase ejecutando el mismo UPDATE en base de datos.

---

## 13. Correcciones post-publicacion

Antes de `publicada`: ediciones ilimitadas, sin contador.

Despues de publicada: cada guardado exitoso resta 1 a `correcciones_disponibles`.
Al llegar a 0, el editor bloquea y muestra el CTA de Bs. 30. Al confirmar ese pago
en `/admin-express`, se suman +2 a `correcciones_disponibles` (se acumula, no
se resetea).

---

## 14. TypeScript

El proyecto real es 100% JavaScript. Se recomienda mantener Express tambien en
JavaScript, igual que el resto del proyecto, para consistencia y cero curva de
aprendizaje nueva. Si en el futuro se decide adoptar TypeScript, Next.js permite
adopcion incremental sin afectar los archivos `.js` existentes.

---

## 15. Tabla resumen de rutas nuevas

| Ruta | Proposito |
|---|---|
| /express | Landing del producto Express |
| /express/registro | Alta de cuenta |
| /express/login | Login exclusivo Express |
| /express/recuperar | Recuperar contrasena |
| /express/restablecer | Definir nueva contrasena |
| /express/dashboard | Mis Invitaciones |
| /express/dashboard/nueva | Elegir plantilla |
| /express/dashboard/editor/[id] | Editor multi-paso |
| /express/dashboard/cuenta | Mi Cuenta |
| /express/dashboard/ayuda | Ayuda |
| /e/[slug] | Invitacion publica Express |
| /admin-express | Panel de gestion de pagos Express |
| /api/express/generate-text | IA (server-only) |
| /api/express/solicitar-publicacion | Marca pendiente de pago |
| /api/express/cron/expirar | Job diario de expiracion |

---

## 16. Riesgos identificados (deuda tecnica existente, no relacionada a Express)

1. `clientes_login` guarda contrasenas Premium en texto plano.
2. El anon key de Supabase esta hardcodeado en multiples archivos, incluyendo el
   HTML de las plantillas publicas.
3. La configuracion global "confirmar email" de Supabase Auth debe permanecer
   intacta para no afectar el flujo de creacion de clientes Premium.

Estos puntos no se resuelven como parte de Express, solo se documentan para
que quede constancia de que se detectaron durante el analisis.

---

## 17. Orden de construccion sugerido (una vez aprobado este documento)

1. Tablas `express_*` + bucket `express-media` + politicas RLS
2. `lib/express/queries.js`, `payments.js`, `storage.js`, `validation.js`
3. `/express/registro`, `/express/login`, `/express/recuperar`, `/express/restablecer`
4. `/express/dashboard` (Mis Invitaciones, vacio)
5. `/express/dashboard/nueva` (seleccion de plantilla)
6. `/express/dashboard/editor/[id]` (wizard multi-paso, guardado de borrador)
7. Subida y compresion de fotos/musica
8. Integracion IA (`/api/express/generate-text`)
9. Vista previa
10. Boton Publicar + bloqueo de pago + WhatsApp
11. `/admin-express` (confirmar pagos)
12. `/e/[slug]` + primera plantilla Express
13. Cron de expiracion
14. Flujo de correcciones post-publicacion
15. Plantillas Express adicionales (2 a 8)
