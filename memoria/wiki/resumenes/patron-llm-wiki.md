---
tipo: resumen
tags: [arquitectura, pkm, llm, obsidian, conocimiento-persistente]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[patron-llm-wiki|raw/documentos/patron-llm-wiki.md]]"]
---

# Resumen de Fuente: El Patrón LLM Wiki

- **Fuente cruda**: `raw/documentos/patron-llm-wiki.md`
- **Tema central**: Construcción de bases de conocimiento personales que acumulan y componen sabiduría mediante agentes LLM.

## Tesis Central
Frente al paradigma de RAG (donde el LLM redescubre fragmentos desde cero en cada consulta y nada se acumula), el patrón **LLM Wiki** propone que el agente mantenga de forma incremental una wiki interconectada de archivos Markdown. El conocimiento se compila una sola vez y se mantiene al día, convirtiendo la base de conocimiento en un artefacto vivo y acumulativo.

## Ideas Clave
1. **La metáfora de desarrollo**:
   - Obsidian es el entorno de desarrollo (IDE).
   - El agente LLM es el programador/mantenedor.
   - La wiki es la base de código (*codebase*).
   - El usuario es el arquitecto/curador que hace preguntas y dirige.
2. **Las Tres Capas**:
   - *Fuentes Crudas (`raw/`)*: Inmutables. La verdad de origen.
   - *La Wiki (`wiki/`)*: Propiedad exclusiva del LLM. Se actualiza con cada fuente.
   - *El Esquema (`AGENTS.md`)*: Reglas de compilación y convenciones que transforman al LLM en un mantenedor disciplinado.
3. **Flujos Principales**:
   - **Ingesta**: Leer la fuente, resumir, propagar a conceptos y entidades, actualizar índice y log.
   - **Consulta**: Responder apoyándose en la wiki y archivar respuestas de alto valor en `wiki/sintesis/`.
   - **Linting**: Detección periódica de contradicciones, páginas huérfanas y vacíos de información.
4. **Relación Histórica**:
   - Realización práctica del concepto de [[memex]] de [[vannevar-bush]] (1945), resolviendo el cuello de botella histórico: el alto coste humano del mantenimiento de enlaces cruzados.

## Conceptos y Entidades Derivados
- Conceptos: [[llm-wiki]], [[rag-vs-compilacion]], [[memex]], [[mantenimiento-continuo-linting]]
- Entidades: [[obsidian]], [[vannevar-bush]]
- Síntesis: [[guia-inicio-memoria-javier]]
