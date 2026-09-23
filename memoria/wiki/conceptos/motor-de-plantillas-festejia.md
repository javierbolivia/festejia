---
tipo: concepto
tags: [festejia, plantillas, frontend, diseno, opengraph, runtime, bespoke, express]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-12-plantillas-sistema-publico]]", "[[12_PLANTILLAS_Y_SISTEMA_PUBLICO|raw/documentos/festejia/12_PLANTILLAS_Y_SISTEMA_PUBLICO.md]]"]
---

# Motor de Plantillas y Runtime Público de Festejia

El **motor de plantillas** de [[festejia]] gestiona la presentación visual de las invitaciones digitales tanto para el canal de alta costura (**Planes Bespoke**) como para el servicio de autoservicio (**Festejia Express**), coordinando la inyección de estilos, animaciones y metadatos sociales.

---

## 1. Plantillas Bespoke (Planes Clásico, Elegante, Imperial)

Operan en la ruta pública `/invitacion/[id]` y se asocian a los eventos creados por el administrador:

| Identificador | Nombre Artístico | Efecto Especial de Apertura | Características Técnicas |
|---|---|---|---|
| `plantilla1` | **Sobre con Lacre Virtual** | Animación interactiva en CSS 3D donde el invitado "rompe" el sello de cera digital para abrir la solapa de la carta. | Paleta en oro champagne y marfil. Partículas sutiles de brillo y música orquestal sincronizada. |
| `plantilla2` | **Mármol & Oro** | Efecto de desvanecimiento suave (*fade-in*) con bordes dorados brillantes (*shimmer*). | Fondo con textura de mármol blanco editorial, tipografía Cormorant Garamond y espaciado generoso. |

---

## 2. Las 5 Plantillas Oficiales de Festejia Express

Operan en la ruta pública `/e/[slug]` o `/express/invitacion/[id]`, adaptando los [[los-17-bloques-express]]:

| Código | Nombre | Atmósfera Visual | Paleta Predominante | Recomendada para: |
|:---:|---|---|---|---|
| `plantilla-a` | **Mármol** | Sobria, minimalista y refinada | Blanco mármol, gris cálido y acentos oro (`#d6b06a`) | Bodas civiles, aniversarios y recepciones modernas. |
| `plantilla-b` | **Clásica** | Papelería nupcial tradicional | Marfil suave (`#fffaf0`) y dorado champagne | Bodas religiosas tradicionales y galas familiares. |
| `plantilla-c` | **Romance** | Emotiva, cálida y delicada | Rosa palo (`#d4b8c4`), vino suave y acentos caligráficos | Quinceañeras románticas y bodas íntimas. |
| `plantilla-d` | **Jardín** | Fresca, botánica y orgánica | Verde salvia (`#c8d8c0`), eucalipto y blanco lirio | Bodas de día, eventos al aire libre y bautizos. |
| `plantilla-e` | **Moderna** | Vanguardista, audaz y contemporánea | Contrastes oscuros, tipografía sans-serif limpia y bordes rectos | Graduaciones universitarias y fiestas juveniles. |

---

## 3. Runtime Público y Generación Dinámica de OpenGraph
Para que la invitación genere una tarjeta atractiva al compartirse en WhatsApp, Instagram o Facebook, el servidor ejecuta la función `generateMetadata()` en tiempo de compilación/solicitud:
```javascript
export async function generateMetadata({ params }) {
  const { id } = await params;
  const evento = await obtenerDatosEvento(id);
  return {
    title: `${evento.titulo} | Festejia`,
    description: `Estás cordialmente invitado a nuestra celebración el ${evento.fecha_formateada}.`,
    openGraph: {
      title: evento.titulo,
      description: evento.subtitulo,
      images: [evento.imagen_portada_url || '/og-default.jpg'],
      url: `https://www.festejia.com/invitacion/${id}`,
    },
    twitter: {
      card: 'summary_large_image',
    }
  };
}
```

---

## Enlaces Relacionados
- [[los-17-bloques-express]]
- [[sistema-diseno-editorial]]
- [[catalogo-colecciones-modelos]]
- [[festejia-guia-desarrollo-web]]
