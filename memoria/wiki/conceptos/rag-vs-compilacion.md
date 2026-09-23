---
tipo: concepto
tags: [arquitectura, rag, compilacion, llm]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[patron-llm-wiki]]"]
---

# RAG vs. Compilación Persistente

## Comparación Fundamental

| Dimensión | RAG Tradicional (Retrieval-Augmented Gen) | Compilación Persistente ([[llm-wiki]]) |
| :--- | :--- | :--- |
| **Momento de Síntesis** | En tiempo de consulta (*query time*). | En tiempo de ingesta (*ingest time*) y evolutivo. |
| **Acumulación de Saber** | Nula. Cada pregunta redescubre los datos desde cero. | Compuesta. Cada fuente enriquece y conecta las notas previas. |
| **Relaciones Cruzadas** | Depende de la similitud semántica puntual de embeddings. | Explícitas mediante hipervínculos bidireccionales ([[index|wikilinks]]). |
| **Contradicciones** | El LLM debe notar inconsistencias en la ventana de contexto. | Detectadas, aisladas y documentadas explícitamente en las notas. |
| **Inspección Humana** | Difícil (vectores y bases de datos opacas). | Directa y visual mediante editores Markdown y grafos ([[obsidian]]). |

## Por qué importa
En preguntas complejas que involucran múltiples documentos leídos a lo largo de meses, el sistema RAG habitual a menudo omite conexiones no coincidentes a nivel de embedding léxico. Con la compilación persistente, las conexiones se establecen en el momento de la ingesta y se mantienen accesibles en todo momento.

## Conceptos Relacionados
- [[llm-wiki]]
- [[memex]]
- [[mantenimiento-continuo-linting]]
