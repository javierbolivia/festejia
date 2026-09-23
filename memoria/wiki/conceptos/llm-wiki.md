---
tipo: concepto
tags: [pkm, arquitectura, llm, obsidian]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[patron-llm-wiki]]"]
---

# LLM Wiki

## Definición
Un **LLM Wiki** es un patrón arquitectónico para bases de conocimiento personales (*Personal Knowledge Management*, PKM) donde un modelo de lenguaje actúa como mantenedor y compilador activo de una red estructurada de documentos Markdown, ubicada entre el usuario y sus fuentes crudas.

## Principios Fundamentales
1. **Compilación Acumulativa**: Las fuentes no se indexan para ser interpretadas solo en tiempo de consulta. Se sintetizan de inmediato en notas atómicas y se vinculan a entidades y temas existentes.
2. **Propiedad de Capa**:
   - El usuario es dueño de las fuentes crudas (`raw/`).
   - El LLM es dueño de la wiki (`wiki/`).
   - El esquema (`AGENTS.md`) define el contrato entre ambos.
3. **Mantenimiento sin Fricción**: El factor principal por el cual las wikis humanas fracasan es el coste del mantenimiento de enlaces cruzados y actualización de discrepancias. El LLM asume este rol de "teneduría de libros" (*bookkeeping*).

## Relaciones
- Contrasta con: [[rag-vs-compilacion]]
- Inspirado en: [[memex]]
- Implementado en: [[obsidian]]
- Mecanismo de control de calidad: [[mantenimiento-continuo-linting]]
- Guía de uso: [[guia-inicio-memoria-javier]]
