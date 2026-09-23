---
tipo: concepto
tags: [rendimiento, webp, compresion, canvas, imagenes, frontend, mobile]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-14-dashboard-editor-engine]]", "[[14_DASHBOARD_EXPRESS_Y_EDITOR_ENGINE|raw/documentos/festejia/14_DASHBOARD_EXPRESS_Y_EDITOR_ENGINE.md]]"]
---

# Pipeline de Compresión de Imágenes WebP en el Cliente

En aplicaciones móviles de eventos sociales, los usuarios suelen intentar subir fotografías tomadas directamente con sus teléfonos de última generación (archivos JPG/HEIC de entre 8 MB y 15 MB). Subir estas imágenes sin procesar provocaría fallos de red por límite de tiempo (*timeout*), saturación del bucket de almacenamiento y lentitud extrema en los teléfonos de los invitados.

Para resolver esto, [[festejia-express]] incorpora un **pipeline de compresión y redimensionamiento en el navegador** antes de emitir cualquier petición HTTP a Supabase Storage.

---

## 1. Funcionamiento del Algoritmo (`comprimirImagen`)

```mermaid
flowchart LR
    A["Foto Original (8-15 MB)"] --> B["FileReader API en memoria"]
    B --> C["HTML5 Canvas (Escala max 1200px)"]
    C --> D["Compresión nativa toBlob('image/webp', 0.85)"]
    D --> E["Archivo WebP Optimizado (150-250 KB)"]
    E --> F["Subida a Supabase Storage (express-media)"]
```

### Implementación en Código JavaScript:
```javascript
export async function comprimirImagen(file, maxWidth = 1200, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error('Fallo en la compresión'));
            const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/webp',
          quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}
```

---

## 2. Beneficios Medidos
1. **Reducción de Peso de hasta 95%**: Imágenes de 10 MB se reducen a ~180 KB.
2. **Carga Instantánea en Móviles**: El First Contentful Paint (FCP) de la galería de fotos cae de 8 segundos en redes 3G a menos de 400 milisegundos.
3. **Eficiencia en Costes de Almacenamiento**: Multiplica por 20 la cantidad de fotos que pueden almacenarse en el plan gratuito/base de Supabase Storage.

---

## Enlaces Relacionados
- [[optimizacion-rendimiento-movil]]
- [[los-17-bloques-express]]
- [[festejia-express]]
