---
tipo: entidad
tags: [software, herramientas, pkm, markdown]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[patron-llm-wiki]]"]
---

# Obsidian

## Descripción
**Obsidian** es una aplicación de gestión de conocimiento personal basada en archivos locales Markdown con soporte nativo de enlaces bidireccionales (wikilinks), grafos interactivos y plugins extensibles.

## Rol en la Arquitectura LLM Wiki
En la metáfora de este sistema:
- **Obsidian es el IDE** donde el usuario visualiza, lee y navega el conocimiento.
- Proporciona la **Vista de Grafo** (*Graph View*), permitiendo ver qué notas actúan como concentradores (*hubs*) y cuáles están aisladas.
- Al operar sobre archivos planos en disco, permite que herramientas externas y agentes LLM lean y escriban directamente sin bases de datos propietarias.

## Plugins y Herramientas Recomendadas
- **Obsidian Web Clipper**: Extensión de navegador para enviar artículos limpios a `raw/articulos/`.
- **Dataview**: Para ejecutar consultas dinámicas sobre el frontmatter YAML de la wiki.
- **Marp**: Para transformar notas de síntesis en presentaciones de diapositivas directamente en Markdown.

## Enlaces Relacionados
- [[llm-wiki]]
- [[memex]]
