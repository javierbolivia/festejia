---
tipo: concepto
tags: [festejia, componente, react, cuenta-regresiva, ui, frontend, tokens]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[los-17-bloques-express]]", "[[sistema-diseno-editorial]]"]
---

# Componente CuentaRegresiva: Reloj Emotivo de Alta Gama

El componente `components/CuentaRegresiva.jsx` es una pieza clave de la experiencia interactiva de [[festejia]], diseñada para generar anticipación y emoción ante el evento social. Construido en [[react]] 19 para [[nextjs]] 16, traduce el bloque temático `cuenta-regresiva` de [[los-17-bloques-express]] en un widget visual de alta fidelidad basado en el [[sistema-diseno-editorial]].

---

## 1. Características Técnicas y Arquitectura

- **Directiva de Cliente**: `'use client'` con montaje protegido (`montado`) para prevenir el error de *SSR Hydration Mismatch* entre el servidor y el navegador del cliente.
- **Precisión Temporal**: Actualización continua cada **1000 ms** (1 segundo) calculando días, horas, minutos y segundos restantes mediante timestamps absolutos (`Date.now()`).
- **Limpieza de Recursos**: Desconexión estricta de intervalos con `clearInterval(intervalId)` en el desmontaje del componente.
- **Formateo Numérico**: Relleno de dos dígitos con `padStart(2, '0')` para evitar oscilaciones en el ancho de las cajas durante el cambio de cifras.
- **Transición de Estado Festivo**: Al vencer el tiempo objetivo (`diferencia <= 0`), oculta automáticamente los dígitos y muestra una tarjeta de celebración con el mensaje festivo (`mensajeDiaEvento`, ej. *"¡Hoy es el gran día! ✨"*).

---

## 2. Aplicación de Tokens de Diseño Editorial

- **Oro Champagne Oficial**: `#d6b06a` con acento en `#caa052` aplicado como degradado metálico `linear-gradient(135deg, #d6b06a 0%, #caa052 100%)` sobre las cifras numéricas.
- **Fondo Marfil de Papel**: Degradado suave `#fffdf9` $\rightarrow$ `#fbfaf7` $\rightarrow$ `#f5f1e9` con textura de papel editorial y bordes sutiles en `rgba(214, 176, 106, 0.32)`.
- **Adornos de Autor**: Líneas divisorias horizontales tenues y rombo central de filigrana dorada (`◆`).
- **Tipografía**:
  - Títulos y cifras numéricas: `Cormorant Garamond` / `Playfair Display` serif de autor.
  - Etiquetas inferiores (*DÍAS, HORAS, MINUTOS, SEGUNDOS*): `Inter` sans-serif en mayúsculas con espaciado entre caracteres (`letter-spacing: 0.12em`).
- **Modo Bimodal**:
  - `variante="marfil"`: Estilo predeterminado luminoso para invitaciones clásicas y románticas.
  - `variante="oscuro"`: Fondo obsidiana `#11100f` con degradado perlado metálico para el Plan Imperial o eventos nocturnos de gala.

---

## 3. Ejemplo de Integración

```jsx
import CuentaRegresiva from '@/components/CuentaRegresiva'

export default function SeccionEvento() {
  return (
    <CuentaRegresiva
      fechaObjetivo="2026-11-28T19:00:00"
      titulo="Solo Faltan"
      subtitulo="Para vivir juntos este momento inolvidable"
      mensajeDiaEvento="¡Hoy es el gran día! ✨"
      mostrarSegundos={true}
      variante="marfil"
    />
  )
}
```

---

## Enlaces Relacionados
- [[los-17-bloques-express]]
- [[sistema-diseno-editorial]]
- [[invitacion-web-interactiva]]
- [[festejia-guia-desarrollo-web]]
