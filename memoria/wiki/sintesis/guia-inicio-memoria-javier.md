---
tipo: sintesis
tags: [guia, onboarding, workflow, memoria-javier]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[patron-llm-wiki]]", "[[AGENTS.md]]"]
---

# Guía de Inicio: Cómo Trabajar con tu LLM Wiki en "memoria JAVIER"

Bienvenido a tu sistema de memoria persistente personal. Esta guía resume cómo interactuar con el agente en tu día a día mientras disfrutas de [[obsidian]].

---

## El Ritmo de Trabajo Habitual

```
    Tú                                     El Agente LLM
 ┌──────────────────────┐                 ┌──────────────────────┐
 │ Deja archivo en raw/ │ ──────────────> │ Lee y analiza fuente │
 └──────────────────────┘                 └──────────┬───────────┘
                                                     │
                                                     ▼
 ┌──────────────────────┐                 ┌──────────────────────┐
 │ Observa el Grafo y   │ <────────────── │ Crea resumen, notas  │
 │ lee notas en Obsidian│                 │ y actualiza índice   │
 └──────────────────────┘                 └──────────────────────┘
```

---

## 1. Añadir Nuevas Fuentes (Ingesta)
1. Coloca cualquier archivo en la carpeta correspondiente de `raw/`:
   - `raw/articulos/` (artículos web, newsletters, clips de Obsidian Web Clipper).
   - `raw/documentos/` (PDFs, transcripciones de conferencias o podcasts, papers).
   - `raw/notas/` (apuntes rápidos tuyos, notas de reuniones, reflexiones).
2. Dile al agente:
   > *"He añadido un nuevo documento en `raw/documentos/mi-tema.pdf`. Por favor, realiza la ingesta."*
3. El agente:
   - Leerá el contenido.
   - Creará su resumen en `wiki/resumenes/`.
   - Extraerá o actualizará las notas en `wiki/conceptos/` y `wiki/entidades/`.
   - Registrará la operación en `index.md` y `log.md`.

---

## 2. Hacer Consultas y Explorar
1. Puedes hacer preguntas complejas que involucren todo lo acumulado:
   > *"¿Qué contradicciones o puntos en común existen entre el autor X y la teoría Y que leímos el mes pasado?"*
2. Si la respuesta aporta una perspectiva nueva o valiosa, puedes pedirle (o el agente lo sugerirá):
   > *"Guarda esta comparativa en la wiki."*
   Y quedará archivada en `wiki/sintesis/`.

---

## 3. Salud y Mantenimiento (Linting)
Cada cierto tiempo, pídele al agente:
> *"Haz un lint / chequeo de salud de la wiki."*

El agente revisará:
- Páginas huérfanas en el grafo.
- Conceptos mencionados que aún no tienen página creada.
- Inconsistencias o preguntas abiertas que podrías investigar.

---

## Enlaces Fundamentales
- [[index|Catálogo Completo (index.md)]]
- [[log|Historial de Actividades (log.md)]]
- [[AGENTS.md|Esquema Técnico de Agentes]]
- Concepto central: [[llm-wiki]]
- Diferencia con RAG: [[rag-vs-compilacion]]
