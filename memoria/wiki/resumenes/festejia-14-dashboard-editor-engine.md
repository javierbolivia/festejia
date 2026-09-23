---
tipo: resumen
tags: [festejia, frontend, webp, compresion, editor, react, express]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[14_DASHBOARD_EXPRESS_Y_EDITOR_ENGINE|raw/documentos/festejia/14_DASHBOARD_EXPRESS_Y_EDITOR_ENGINE.md]]"]
---

# Resumen de Fuente: Dashboard Express y Motor del Editor

- **Fuente cruda**: `raw/documentos/festejia/14_DASHBOARD_EXPRESS_Y_EDITOR_ENGINE.md`
- **Materia**: Pipeline de compresión de imágenes WebP en el navegador, jerarquía de componentes del editor y control de Drag & Drop.

## Tesis Central
Para evitar que las fotografías pesadas subidas por usuarios móviles colapsen el almacenamiento y degraden la carga de las invitaciones web, Festejia Express implementa un pipeline de compresión y redimensionamiento en el lado del cliente previo a la subida, garantizando archivos WebP optimizados de menos de 250 KB.

## Puntos Clave
1. **Pipeline de Compresión WebP en el Cliente (`comprimirImagen`)**:
   - Se ejecuta en el navegador antes de iniciar cualquier subida HTTP.
   - Lee el archivo con `FileReader`, crea un elemento `<canvas>` en memoria y redimensiona proporcionalmente a un ancho máximo de **1200 píxeles**.
   - Exporta con compresión nativa WebP: `canvas.toBlob(blob, 'image/webp', 0.85)`.
   - Reduce fotos de 10 MB a archivos ultra-ligeros de 150-250 KB, preservando nitidez en pantallas Retina y ahorrando cuota de almacenamiento.
2. **Jerarquía y Componentes del Editor (`EditorEngine.js`)**:
   - `SortableBlockItem.js`: Envoltura que implementa Drag & Drop nativo mediante eventos HTML5 (`dragstart`, `dragover`, `drop`).
   - `Accordion.js`: Control colapsable que permite desplegar el bloque activo y ocultar los demás para mantener una interfaz limpia en pantallas pequeñas.
   - `FieldRenderer.js`: Fábrica de controles que renderiza inputs según el tipo de dato del esquema (`text`, `textarea`, `date`, `time`, `color`, `image`, `toggle`).
   - `BlockPreviewShell.js`: Marco de previsualización que inyecta los estilos de la plantilla activa en un iframe o contenedor aislado.

## Conexiones y Enlaces
- Conceptos: [[pipeline-compresion-imagenes-webp]], [[los-17-bloques-express]], [[optimizacion-rendimiento-movil]]
- Entidades: [[festejia-express]], [[react]]
