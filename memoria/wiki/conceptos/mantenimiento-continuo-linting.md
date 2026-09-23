---
tipo: concepto
tags: [calidad, mantenimiento, linting, consistencia]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[patron-llm-wiki]]"]
---

# Mantenimiento Continuo (Linting) de la Wiki

## Definición
El **Linting** en una [[llm-wiki]] es la auditoría periódica de salud de la base de conocimiento realizada por el agente, análoga al análisis estático en desarrollo de software.

## Aspectos que Audita
1. **Páginas Huérfanas**: Notas creadas que no tienen enlaces entrantes desde ningún concepto, síntesis ni índice.
2. **Entidades o Conceptos Emergentes**: Términos mencionados recurrentemente en resúmenes que justifican la creación de una nota propia atómica.
3. **Contradicciones Epistémicas**: Afirmaciones de fuentes antiguas que han sido desmentidas o matizadas por fuentes más recientes.
4. **Brechas de Información**: Preguntas que surgen de la síntesis pero que carecen de fuentes en `raw/` para responderse, sugiriendo nuevas búsquedas al usuario.

## Frecuencia Recomendada
- Tras cada tanda de 5-10 ingestas de fuentes.
- Antes de iniciar una síntesis de gran calado.

## Enlaces
- Protocolo formalizado en: [[AGENTS.md|Esquema de Agentes]]
- Aplicación práctica: [[llm-wiki]]
