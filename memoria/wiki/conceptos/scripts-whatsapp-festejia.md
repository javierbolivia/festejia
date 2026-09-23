---
tipo: concepto
tags: [festejia, whatsapp, ventas, scripts, atencion, crm, conversion]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-operaciones-ventas]]", "[[06_OPERACIONES_Y_VENTAS|raw/documentos/festejia/06_OPERACIONES_Y_VENTAS.md]]"]
---

# Guiones y Plantillas Oficiales de WhatsApp Festejia

En la arquitectura de conversión de [[festejia]], cada llamada a la acción en la web construye automáticamente un enlace URL hacia [[whatsapp]] (`https://wa.me/[NUMERO]?text=[MENSAJE_ENCODED]`) con un texto contextual pre-redactado. Este documento registra la totalidad de las plantillas oficiales y sus variables dinámicas.

---

## 1. Plantilla desde el Formulario Web de Contacto
Se dispara al enviar el formulario general en la página principal (`/`):
```text
Hola Festejia! Mi nombre es [Nombre] desde [País] para mi evento de [Boda / 15 Años / Graduación / Bautizo] (interesado en el Plan [Clásico / Elegante / Imperial]).

Detalles: [Mensaje del cliente con fecha estimada, salón y cantidad de invitados]
Correo de contacto: [Email del cliente]
```

---

## 2. Plantilla desde el Modal de Catálogo (Diseño Específico)
Se dispara al hacer clic en el botón de cotización dentro de la vista previa de cualquiera de los 18 modelos del catálogo (`/bodas`, `/quince`, etc.):
```text
Hola Festejia! Me gustó el diseño '[Nombre del Diseño]' y quisiera cotizarlo para mi evento.
```
*Ejemplo real*:
`Hola Festejia! Me gustó el diseño 'Serenata' y quisiera cotizarlo para mi evento.`

---

## 3. Plantilla desde el Botón Flotante General
Se dispara desde el botón flotante persistente en la esquina inferior derecha de la web:
```text
Hola Festejia! Me interesa una invitación digital.
```

---

## 4. Plantillas Específicas por Páginas de Ocasión
Se disparan desde los botones de cotización rápida en las cabeceras temáticas:
- **Bodas (`/bodas`)**:
  ```text
  Hola Festejia! Me interesa una invitación de boda.
  ```
- **15 Años (`/quince`)**:
  ```text
  Hola Festejia! Me interesa una invitación de 15 años.
  ```
- **Graduaciones (`/graduaciones`)**:
  ```text
  Hola Festejia! Me interesa una invitación de graduación.
  ```
- **Bautizos y Baby Showers (`/bautizos`)**:
  ```text
  Hola Festejia! Me interesa una invitación de bautizo.
  ```

---

## 5. Plantilla de Comprobante de Pago — Festejia Express
Se dispara automáticamente desde el editor `/express/dashboard/editor/[id]` cuando el usuario pulsa *"Pagar y Publicar"*:
```text
Hola Festejia! Quiero realizar un pago del Plan Express.

Nombre: [Nombre del Cliente]
Correo: [Email del Cliente]
Plantilla: [Nombre de la Plantilla Elegida]
Código interno: [EXP-XXXX]
Concepto: Publicación de invitación
Monto: Bs. 200
```

---

## 6. Lógica de Construcción en Código (`lib/config.js`)
```javascript
export function waLink(mensaje) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "59170000000";
  return `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`;
}
```

---

## Enlaces Relacionados
- [[whatsapp]]
- [[festejia-operaciones-ventas]]
- [[festejia-manual-ventas-atencion]]
- [[festejia-especificacion-panel-admin]]
