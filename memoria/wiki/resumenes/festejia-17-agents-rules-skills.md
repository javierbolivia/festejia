---
tipo: resumen
tags: [festejia, antigravity, skills, rules, nextjs16, prompt-engineering, mcp]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[17_AGENTS_RULES_Y_SKILLS_SISTEMA|raw/documentos/festejia/17_AGENTS_RULES_Y_SKILLS_SISTEMA.md]]"]
---

# Resumen de Fuente: Reglas del Sistema, Skills de IA y Antigravity

- **Fuente cruda**: `raw/documentos/festejia/17_AGENTS_RULES_Y_SKILLS_SISTEMA.md`
- **Materia**: Protocolos de desarrollo para Next.js 16, prevención de errores de Turbopack, arquitectura de Skills de Antigravity AI y slash commands.

## Tesis Central
El proyecto Festejia establece una simbiosis formal entre el código fuente y los agentes autónomos de IA mediante directrices estrictas en `AGENTS.md` (que previenen errores de compilación con Turbopack y conflictos de git) y un ecosistema modular de *Skills* (`agy-customizations`, `antigravity_guide`, `generative_ui`, `migrate-workflows`, `permissioned-github`) que guían al asistente para operar de forma segura y precisa.

## Puntos Clave
1. **Reglas Obligatorias de Repositorio (`AGENTS.md`)**:
   - Compatibilidad estricta con Next.js 16.3.5: uso explícito de `'use client'` en componentes interactivos, Server Components por defecto y manejo asíncrono obligatorio de `params` en App Router (`const { id } = await params`).
   - Prevención de diffs innecesarios: no tocar código funcional que no haya sido solicitado.
2. **Arquitectura de Skills de Antigravity AI**:
   - Cada skill se define en una carpeta con su archivo maestro `SKILL.md` (frontmatter YAML con `name` y `description`).
   - Soporte para subdirectorios `scripts/`, `examples/`, `resources/` y `references/`.
3. **Catálogo de Skills Disponibles en Festejia**:
   - `agy-customizations`: Creación de plugins, hooks y servidores MCP.
   - `antigravity_guide`: Manual oficial del CLI `agy`, IDE y SDK de Python.
   - `generative_ui`: Renderizado de widgets interactivos y previsualizaciones HTML ricas.
   - `migrate-workflows`: Migración de flujos de trabajo heredados.
   - `permissioned-github`: Operaciones seguras sobre GitHub.
4. **Slash Commands Especializados**:
   - `/goal`, `/schedule`, `/browser`, `/grill-me`, `/teamwork-preview`, `/learn`, `/boost`.

## Conexiones y Enlaces
- Conceptos: [[llm-wiki]], [[optimizacion-rendimiento-movil]]
- Entidades: [[nextjs]], [[obsidian]]
- Configuración: [[AGENTS.md]]
