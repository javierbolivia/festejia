---
title: Festejia - Índice Maestro de Conocimiento
tags:
  - moc
  - festejia
  - indice
updated: 2026-09-23
---

# 👑 Festejia — Índice Maestro de Conocimiento (Obsidian Vault)

Bienvenido a la memoria central y base de conocimiento total de **Festejia**. Esta carpeta contiene la documentación exhaustiva del proyecto en formato Markdown y texto plano, diseñada con enlaces bidireccionales `[[...]]` para que puedas abrirla directamente como una **Bóveda (Vault)** en Obsidian.

---

## 🗂️ Módulos de Conocimiento

1. **[[01_VISION_Y_MARCA]]**:
   - Manifiesto de Festejia, propuesta de valor, pilares estratégicos.
   - Identidad visual completa: códigos de color exactos (#d6b06a, #11100f, etc.), tipografías y reglas de estilo editorial.
   - Canales oficiales y redes sociales.

2. **[[02_PLANES_Y_PRECIOS]]**:
   - Detalles técnicos y comerciales del **Plan Clásico ($45 USD / Bs. 520)**.
   - Detalles del **Plan Elegante ($75 USD / Bs. 860)**.
   - Detalles del **Plan Imperial ($110 USD / Bs. 1270)**.
   - Detalles del **Plan Festejia Express (Desde Bs. 200)**.
   - Catálogo de **Servicios Adicionales (Addons)** con tarifas.
   - **Matriz Comparativa de Funciones** (Diseño, Experiencia, Gestión de Invitados, Administración).

3. **[[03_FINANZAS_Y_DIVISAS]]**:
   - Política cambiaria de mercado real para Bolivia (**11.5 BOB/USD**).
   - Tabla completa de divisas de Latinoamérica y del mundo.
   - Algoritmo de detección geográfica automática (Timezone y Locale).
   - Reglas de redondeo comercial y actualización horaria en vivo.
   - Política de reserva de $15 USD y saldo contra entrega.

4. **[[04_CATALOGO_COLECCIONES]]**:
   - **Bodas (8 diseños):** Serenata, Aurora, Jardín, Allegria, Napoli, Terra, Rose Gold, Euforia.
   - **15 Años (4 diseños):** Princesa, Mariposa, Encanto, Celestial.
   - **Graduaciones (3 diseños):** Logro, Éxito, Academia.
   - **Bautizos (3 diseños):** Bendición, Ángel, Gracia.
   - Datos ficticios de muestra, paletas y conceptos de cada modelo.

5. **[[05_SISTEMAS_Y_TECNOLOGIA]]**:
   - **Sistema de Confirmación Inteligente (RSVP):** Enlaces únicos, pases intransferibles, asignación de mesas, control QR.
   - **Live Dashboard:** Simulación en tiempo real de actividad, alertas y contadores.
   - **Gestor de Invitados Online:** Visualización privada para el cliente.
   - **Plataforma Festejia Express:** Editor visual, generación de textos con IA y checkout manual vía WhatsApp.
   - **Módulo de Check-in:** Escaneo de tickets en puerta.

6. **[[06_OPERACIONES_Y_VENTAS]]**:
   - El proceso de trabajo en 3 pasos (Selección -> Datos y Seña -> Entrega en 5-7 días).
   - Servicio Express en 48 horas.
   - Guiones y plantillas de atención rápida por WhatsApp.
   - Métodos y pasarelas de pago aceptados.

7. **[[07_FAQ_PREGUNTAS_FRECUENTES]]**:
   - Las 19 preguntas frecuentes oficiales divididas en 4 categorías: General, Personalización, Confirmación, Pagos y Entrega.

8. **[[08_ARQUITECTURA_TECNICA]]**:
   - Stack tecnológico (Next.js 16 Turbopack, React 19, CSS modular).
   - Mapa de archivos y rutas de la aplicación.
   - Esquema de base de datos Supabase y modelos relacionales.
   - Seguridad, variables de entorno y optimizaciones de rendimiento.

9. **[[09_PANEL_ADMINISTRADOR]]**:
   - **Panel Bespoke (`/admin`):** Métricas, gestión de clientes, creación con rollback atómico, actualización de eventos, vistas de invitados.
   - **Panel Express (`/admin-express`):** Control de pagos pendientes, aprobación/rechazo de pagos, cálculo de expiración (+1 día del evento), publicación manual, despublicación y eliminación.
   - **APIs Server-Side:** `/api/admin/create-client`, `/api/admin/delete-user`, `/api/admin/express-client-ids` con Service Role Key.

10. **[[10_PANEL_CLIENTE_Y_GESTOR]]**:
    - **Login Inteligente (`/login`):** Resolución de `@festejia.local`, enrutamiento automático según rol y plan.
    - **Panel del Anfitrión (`/panel`):** WebSockets en tiempo real, alertas de RSVP, cuenta regresiva, exportación a Excel, filas de alto rendimiento con `React.memo(GuestRow)`.
    - **Gestor Lite (`/gestor`):** Panel ultrarrápido para Plan Clásico.
    - **Control de Puerta y Escáner QR (`/checkin`):** Cámara trasera nativa, `jsQR`, tokens `festejia:UUID`, prevención de reingreso y fraude, búsqueda manual de emergencia y feedback háptico.

11. **[[11_EXPRESS_STUDIO_Y_BLOQUES]]**:
    - **Estudio de Diseño Express (`/express/dashboard/editor/[id]`):** Drag & Drop tipo Canva.
    - **Los 17 Bloques Modulares:** Portada, Información Principal, Cuenta Regresiva, Ceremonia, Recepción, Itinerario, Padres, Padrinos, Historia, Galería, Música, Dress Code, Regalos, Solo Adultos, Confirmación, Redes Sociales y Configuración.
    - **Sistemas del Motor:** `registry.js`, `sync.js` (columnas legacy), `validator.js`.
    - **Ciclo de Publicación y Pagos:** WhatsApp checkout, 2 correcciones gratuitas con log de auditoría y recargas de correcciones adicionales.

12. **[[12_PLANTILLAS_Y_SISTEMA_PUBLICO]]**:
    - **Runtime Público (`/invitacion/[id]`):** Generación dinámica de OpenGraph y Twitter Cards, redirección limpia con `window.location.replace()`.
    - **Plantillas Bespoke:** Sobre interactivo con sello de lacre virtual (`plantilla1`) y Mármol & Oro (`plantilla2`) con inyección dinámica en el DOM.
    - **Las 5 Plantillas Oficiales Express:** Mármol (`plantilla-a`), Clásica (`plantilla-b`), Romance (`plantilla-c`), Jardín (`plantilla-d`) y Moderna (`plantilla-e`).

13. **[[13_MOTOR_DE_NOTIFICACIONES_Y_TRIGGERS]]**:
    - **Motor de Notificaciones:** Hitos de porcentaje (25%, 50%, 75%, 100%) y cuenta regresiva (30d, 15d, 7d, 1d, hoy).
    - **Triggers en PostgreSQL:** Trigger `validar_limite_invitados_por_plan` (enforce 50/150/9999 a nivel motor de base de datos) y `express_set_updated_at`.
    - **Almacenamiento Multimedia (Storage):** Bucket `express-media` con aislamiento RLS por usuario.
    - **Seguridad y Auditoría de IA:** Endpoint Moonshot AI Kimi (`kimi-k2.7-code`), limitador de tasa (40 req/h) y tabla `express_ia_generaciones`.
    - **Hook de Rendimiento:** `useVisibleInterval` con `IntersectionObserver`.

14. **[[14_DASHBOARD_EXPRESS_Y_EDITOR_ENGINE]]**:
    - **Vistas del Dashboard:** Mis invitaciones, Nueva (`EXP-XXXX`), Cuenta y Ayuda.
    - **Componentes del Editor:** `EditorEngine.js`, `SortableBlockItem.js`, `Accordion.js`, `FieldRenderer.js`, `BlockPreviewShell.js`.
    - **Pipeline de Compresión WebP:** Redimensionamiento a 1200px en el navegador mediante `comprimirImagen(file)` y validación estricta de archivos.

15. **[[15_SISTEMA_DE_CONFIGURACION_Y_DIVISAS_GLOBAL]]**:
    - **Configuración Centralizada:** `WHATSAPP_NUMERO` y helper `waLink()` para enlaces universales.
    - **Las 23 Divisas Oficiales:** 17 de Latinoamérica y 6 globales con banderas, símbolos, tasas de referencia y pasos de redondeo.
    - **Algoritmos:** Detección geográfica por timezone/locale y redondeo comercial estético por orden de magnitud.

16. **[[16_DOCUMENTOS_ORIGINALES_Y_HISTORIAL]]**:
    - **Consolidación de Archivos Markdown Originales:** `PROYECTO-FESTEJIA.md`, `ESTADO-PROYECTO.md`, `EXPRESS-ARQUITECTURA.md` y `festejia-vault/`.
    - **Infraestructura de Producción:** Vercel (`festejia/festejia`), GitHub (`javierbolivia/festejia`), Porkbun y Supabase.
    - **Historial Completo de Commits:** Desde `262a518` hasta `8891b05`.
    - **Hoja de Ruta de Pagos Bolivia:** Fase 1 (WhatsApp QR Simple), Fase 2 (Links Libélula), Fase 3 (API REST Libélula).

17. **[[17_AGENTS_RULES_Y_SKILLS_SISTEMA]]**:
    - **Reglas del Repositorio:** `AGENTS.md` (Next.js 16 breaking changes y prevención de diffs de git) y `CLAUDE.md`.
    - **Arquitectura de Skills de Antigravity AI:** Especificación de `SKILL.md`, frontmatter YAML, directorio `.agents/`, reglas jerárquicas, plugins, hooks y servidores MCP.
    - **Skills y Comandos Disponibles:** `agy-customizations`, `antigravity_guide`, `generative_ui`, `migrate-workflows` y los slash commands (`/goal`, `/schedule`, `/browser`, `/grill-me`, `/teamwork-preview`, `/learn`, `/boost`).

18. **[[FESTEJIA_CONOCIMIENTO_TOTAL_RAW.txt]]**:
    - Documento monolítico continuo que contiene absolutamente todo el conocimiento sin interrupciones.

---

## 📁 Archivos Originales en Crudo (Verbatim Raw)

Para garantizar que **absolutamente ningún detalle, palabra o coma quede afuera**, se han copiado e indexado todos los archivos originales del repositorio:

### 1. `DOCUMENTOS_MD_ORIGINALES/`
- **[[DOCUMENTOS_MD_ORIGINALES/PROYECTO-FESTEJIA.md|PROYECTO-FESTEJIA.md]]**: Documento fundacional maestro completo (21 KB) con el desglose de modelos, copy comercial, addons legacy y visión estratégica original.
- **[[DOCUMENTOS_MD_ORIGINALES/ESTADO-PROYECTO.md|ESTADO-PROYECTO.md]]**: Auditoría técnica del proyecto (10 KB), componentes construidos, pendientes, estructura de base de datos y checklist de producción.
- **[[DOCUMENTOS_MD_ORIGINALES/EXPRESS-ARQUITECTURA.md|EXPRESS-ARQUITECTURA.md]]**: Arquitectura detallada de Festejia Express (14 KB), los 17 bloques desacoplados, sistema de registro y flujo de estados.
- **[[DOCUMENTOS_MD_ORIGINALES/AGENTS.md|AGENTS.md]]**: Reglas obligatorias de desarrollo para Next.js 16 (Turbopack) y prevención de diffs.
- **[[DOCUMENTOS_MD_ORIGINALES/CLAUDE.md|CLAUDE.md]]**: Puntero de configuración de reglas para asistentes Claude.
- **`festejia-vault/`**: La bóveda Obsidian original completa intacta:
  - `00 - Guia para Usar esta Boveda en Obsidian.md`
  - `00 - Inicio (MOC).md`
  - `01 - Marca/01 - Identidad y Propuesta de Valor.md`
  - `02 - Planes y Servicios/01 - Plan Clasico.md`

### 2. `SKILLS_IA/` (Skills y Herramientas del Asistente de IA)
- **[[SKILLS_IA/agy-customizations/SKILL.md|agy-customizations/SKILL.md]]**: Especificación de personalizaciones, creación de skills, reglas, plugins y hooks. Incluye subcarpeta `docs/` con guías de hooks, json configs, servidores MCP, plugins, rules y skills.
- **[[SKILLS_IA/antigravity_guide/SKILL.md|antigravity_guide/SKILL.md]]**: Manual oficial del asistente y CLI (`agy`), IDE, SDK y App. Incluye subcarpeta `references/` con manuales de app, cli, ide y sdk.
- **[[SKILLS_IA/generative_ui/SKILL.md|generative_ui/SKILL.md]]**: Guía para la generación de interfaces de usuario interactivas en HTML y widgets dinámicos.
- **[[SKILLS_IA/migrate-workflows/SKILL.md|migrate-workflows/SKILL.md]]**: Guía de migración de workflows heredados a skills modernos.
- **[[SKILLS_IA/permissioned-github/SKILL.md|permissioned-github/SKILL.md]]**: Manual de integración y operaciones seguras sobre GitHub.

### 3. `SCRIPTS_Y_SQL/` (Backend, Migraciones y Base de Datos)
- `crear-tabla-notificaciones.sql`: Definición de tabla de notificaciones push/email.
- `express-migration.sql`: Migración inicial de tablas `express_invitaciones` y usuarios.
- `express-migration-admin.sql`: Campos de gestión administrativa y control de expiración.
- `express-migration-bloques.sql`: Estructura JSONB de bloques y ordenamiento.
- `express-migration-ia-security.sql`: Auditoría de IA Kimi y limitación de tasa (40 req/h).
- `premium-plan-enforcement.sql`: Triggers de PostgreSQL `validar_limite_invitados_por_plan`.
- `fix-plantilla2.js`: Script de verificación y normalización de plantilla2.
- `preparar-plantilla.ps1`: Automatización PowerShell para aprovisionamiento de plantillas.
- `setup-notificaciones.js`: Inicialización de colas de eventos y recordatorios.
- `verify-imperial-panel.js`: Validación de acceso y límites para el Plan Imperial.

---

> [!TIP] Uso en Obsidian
> Abre la carpeta `obsidian` desde Obsidian mediante la opción **"Open folder as vault"**. Presiona `Ctrl + G` para ver el grafo interactivo de relaciones completo con todos los capítulos, documentos originales, skills y scripts interconectados.
