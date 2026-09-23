# 17 - AGENTS, REGLAS Y SISTEMA DE SKILLS DEL ASISTENTE DE IA

> Especificación de las reglas de desarrollo del repositorio (`AGENTS.md`, `CLAUDE.md`), arquitectura de Skills de Antigravity AI y comandos de orquestación.

---

## 1. REGLAS DEL REPOSITORIO (`AGENTS.md` Y `CLAUDE.md`)

En la raíz del proyecto existen dos archivos que definen el comportamiento de cualquier asistente de IA (Antigravity, Claude, Cursor, Copilot):

### 1.1. `AGENTS.md` (Regla de Next.js 16)
```markdown
<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
```
- **Motivo de Existencia:** Este bloque es generado automáticamente por `next dev` en Next.js 16 (Turbopack).
- **Regla Estricta:** Nunca debe ser eliminado ni descartado en un commit, ya que `next dev` lo vuelve a generar inmediatamente. Mantenerlo versionado en git garantiza que el árbol de trabajo permanezca limpio.
- **Advertencia Técnica:** Informa al modelo de IA que las convenciones de Next.js 16 difieren de versiones antiguas (ej. `params` en App Router ahora es una promesa asíncrona que debe resolverse con `await params`).

### 1.2. `CLAUDE.md`
- Contiene la directiva `@AGENTS.md` para que los asistentes que buscan archivos de configuración específicos de Claude carguen automáticamente las mismas reglas de `AGENTS.md`.

---

## 2. ARQUITECTURA DEL SISTEMA DE SKILLS DE ANTIGRAVITY (AGY)

Un **Skill** es una unidad modular de conocimiento procedimental que enseña al modelo de IA cómo ejecutar tareas complejas, seguir flujos de trabajo paso a paso y utilizar herramientas especializadas.

### 2.1. Estructura Estándar de un Skill (`SKILL.md`)
Cada skill reside en una carpeta dedicada con un archivo `SKILL.md` obligatorio que inicia con metadatos en YAML frontmatter:
```yaml
---
name: nombre-del-skill
description: Descripción clara de lo que hace el skill y cuándo debe activarse.
---

# Título de las Instrucciones

Instrucciones detalladas, guías de estilo, reglas y flujos de trabajo...
```
Opcionalmente puede incluir:
- `scripts/`: Scripts ejecutables (Node.js, Python, PowerShell) para automatizar tareas.
- `examples/`: Código y ejemplos de referencia.
- `resources/`: Plantillas y configuraciones prearmadas.

### 2.2. Tipos de Personalizaciones en el Asistente

| Tipo | Archivo / Carpeta | Alcance | Propósito |
| :--- | :--- | :--- | :--- |
| **Rules** | `AGENTS.md`, `GEMINI.md`, `.agents/rules/*.md` | Jerárquico / Por carpeta | Estilos de código obligatorios, restricciones de API y seguridad. |
| **Skills** | `skills/<nombre>/SKILL.md` | Bajo demanda (Progressive) | Flujos de trabajo paso a paso, manuales de procedimiento y runbooks. |
| **Plugins** | `plugins/<nombre>/plugin.json` | Paquete consolidado | Empaquetado conjunto de skills, reglas y configuraciones MCP. |
| **Hooks** | `hooks.json` | Ciclo de vida | Scripts que corren antes o después de ejecutar una herramienta. |
| **MCP Servers** | `mcp_config.json` | Integración de herramientas | Conexión con servicios externos (GitHub, bases de datos, APIs). |

---

## 3. SKILLS DISPONIBLES EN EL ENTORNO DE FESTEJIA

En esta instalación de desarrollo existen cuatro skills nativos disponibles:

1. **`agy-customizations`** (`builtin/skills/agy-customizations/SKILL.md`):
   - Guía maestra para crear nuevas reglas, plugins, hooks y servidores MCP.
2. **`antigravity-guide`** (`builtin/skills/antigravity_guide/SKILL.md`):
   - Manual completo del CLI de Antigravity (`agy`), interfaz del IDE y SDK.
3. **`generative_ui`** (`builtin/skills/generative_ui/SKILL.md`):
   - Guía para renderizar widgets interactivos en HTML, diagramas y visualizaciones gráficas en tiempo real.
4. **`migrate-workflows`** (`builtin/skills/migrate-workflows/SKILL.md`):
   - Utilidad para migrar flujos de trabajo heredados hacia el estándar moderno de skills.

---

## 4. COMANDOS DE CONTROL Y COMANDOS DE BARRA (SLASH COMMANDS)

Atajos de productividad disponibles para el usuario en la interfaz del chat:
- **`/goal`**: Para tareas de desarrollo extensas y autónomas donde el agente trabaja a fondo hasta completar el objetivo sin detenerse prematuramente.
- **`/schedule`**: Para programar recordatorios o tareas recurrentes mediante expresiones cron.
- **`/browser`**: Para activar navegación web interactiva e inspección de páginas.
- **`/grill-me`**: Entrevista interactiva donde el agente hace preguntas al usuario para definir especificaciones y requerimientos antes de programar.
- **`/teamwork-preview`**: Orquestación de equipos con múltiples subagentes concurrentes.
- **`/learn`**: Para persistir correcciones y preferencias del usuario en la memoria permanente del asistente.
- **`/boost`**: Razonamiento profundo y verificación en múltiples perspectivas para refactorizaciones complejas.
