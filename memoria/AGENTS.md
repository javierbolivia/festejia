# AGENTS.md — Protocolo y Esquema del LLM Wiki para "memoria JAVIER"

Este archivo define las directrices y reglas operativas para cualquier agente LLM (Antigravity, Claude Code, Codex, etc.) que actúe como mantenedor y curador de esta base de conocimiento.

---

## 1. Filosofía Central

> **"Obsidian es el IDE; el LLM es el programador; la wiki es la base de código."**

- **Compilación persistente vs. RAG tradicional**: En lugar de buscar fragmentos dispersos en cada consulta, el conocimiento se sintetiza, se conecta y se actualiza continuamente en archivos Markdown estructurados.
- **División de roles**:
  - **Javier (Usuario)**: Aporta fuentes crudas, formula preguntas, define el rumbo de investigación y explora las notas y el grafo.
  - **El Agente (LLM)**: Ejecuta el trabajo minucioso de lectura, resumen, extracción de entidades y conceptos, enlaces bidireccionales, resolución de contradicciones y mantenimiento de índices y logs.

---

## 2. Estructura de Directorios

```
memoria JAVIER/
├── AGENTS.md                  # Este documento: reglas operativas para el LLM
├── index.md                   # Catálogo de contenido de la wiki (MOC)
├── log.md                     # Registro cronológico inmutable de operaciones
│
├── raw/                       # FUENTES CRUDAS (Inmutables; sólo lectura para el LLM)
│   ├── articulos/             # Recortes web, posts de blogs, hilos
│   ├── documentos/            # Libros, papers, informes, transcripciones
│   ├── notas/                 # Reflexiones personales, notas de reuniones, diarios
│   └── assets/                # Imágenes y adjuntos locales
│
└── wiki/                      # LA WIKI (Mantenida exclusivamente por el LLM)
    ├── conceptos/             # Ideas abstractas, teorías, marcos de trabajo, principios
    ├── entidades/             # Personas, organizaciones, herramientas, proyectos, software
    ├── resumenes/             # Fichas de lectura detalladas de cada fuente en raw/
    └── sintesis/              # Respuestas complejas, comparativas, ensayos temáticos
```

---

## 3. Convenciones de Notas y Markdown

### Formato de Enlaces
- Utilizar siempre la sintaxis de Obsidian: `[[Nombre-Nota]]` o `[[Nombre-Nota|Texto a mostrar]]`.
- Nombrar los archivos en minúsculas separadas por guiones o en nombres concisos y legibles (kebab-case o título natural en minúsculas).
- Los enlaces deben ser precisos y apuntar al nombre exacto de la nota sin la extensión `.md`.

### Frontmatter YAML Obligatorio
Cada archivo dentro de `wiki/` debe incluir cabecera YAML:

```yaml
---
tipo: concepto | entidad | resumen | sintesis
tags: [tema1, tema2]
creado: YYYY-MM-DD
actualizado: YYYY-MM-DD
fuentes: ["[[resumen-fuente]]"]
---
```

### Estructura de Páginas según Tipo

#### Concepto (`wiki/conceptos/`):
- Definición clara y concisa.
- Principios y componentes clave.
- Relaciones con otros conceptos (`[[Concepto Relacionado]]`).
- Evolución o debates en torno al concepto.
- Referencias a fuentes primarias.

#### Entidad (`wiki/entidades/`):
- Quién o qué es (persona, software, proyecto, organización).
- Rol o relevancia en el contexto de la base de conocimiento.
- Proyectos o conceptos asociados.
- Fuentes asociadas.

#### Resumen de Fuente (`wiki/resumenes/`):
- Metadatos de origen (autor, fecha original, enlace o ruta en `raw/`).
- Tesis central / idea clave en 2-3 frases.
- Puntos principales estructurados.
- Nuevos conceptos y entidades introducidos (con enlaces).
- Implicaciones o conexiones con notas existentes.

#### Síntesis (`wiki/sintesis/`):
- Comparativas, marcos integradores, ensayos temáticos o respuestas extensas a preguntas del usuario.
- Enlaces densos a todas las notas de conceptos y entidades relevantes.

---

## 4. Protocolos Operativos

### Protocolo A: Ingesta (`Ingest`)
Cuando el usuario solicita procesar una o varias fuentes de `raw/`:
1. **Lectura profunda**: Analizar la fuente cruda respetando su inmutabilidad.
2. **Generar resumen**: Crear `wiki/resumenes/[nombre-fuente].md`.
3. **Extraer/Actualizar Conceptos**:
   - Si un concepto mencionado ya existe en `wiki/conceptos/`, actualizar su contenido enriqueciéndolo con la nueva perspectiva y citando la fuente.
   - Si es nuevo, crear `wiki/conceptos/[nuevo-concepto].md`.
4. **Extraer/Actualizar Entidades**:
   - Crear o enriquecer notas en `wiki/entidades/`.
5. **Detección de discrepancias**: Si la nueva fuente contradice o matiza una nota previa, explicitarlo en ambas notas.
6. **Actualizar `index.md`**: Añadir la nueva fuente y conceptos/entidades en su sección correspondiente con un resumen de una línea.
7. **Registrar en `log.md`**: Añadir entrada con el formato `## [YYYY-MM-DD] ingest | Título de la fuente`.

### Protocolo B: Consulta (`Query`)
Cuando el usuario hace una pregunta sobre la base de conocimiento:
1. Consultar primero `index.md` para identificar qué notas de `wiki/` son relevantes.
2. Leer las notas clave de `wiki/` y, sólo si es indispensable, profundizar en las fuentes de `raw/`.
3. Ofrecer una respuesta sintetizada con citas enlazadas tipo `[[nota]]`.
4. **Compilar valor nuevo**: Si la consulta produce un análisis comparativo, síntesis o conexión no trivial, proponer o crear directamente una nota en `wiki/sintesis/` para que el esfuerzo de pensamiento quede acumulado.
5. Registrar la consulta en `log.md` si generó nueva síntesis.

### Protocolo C: Mantenimiento y Salud (`Lint`)
De forma periódica o a petición del usuario:
1. Buscar páginas huérfanas (sin enlaces entrantes ni salientes significativos).
2. Localizar términos o ideas frecuentes que aún no tienen nota propia (enlaces rotos o no creados).
3. Identificar afirmaciones contradictorias o desactualizadas entre fuentes.
4. Proponer al usuario nuevas preguntas de investigación o temas en los que convendría incorporar fuentes.
5. Registrar el resultado del chequeo en `log.md`.

---

## 5. Regla de Oro
> Nunca re-derivar desde cero lo que ya ha sido destilado. Si algo valioso surge en una interacción, debe quedar registrado en la wiki.
