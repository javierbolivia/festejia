---
tipo: entidad
tags: [software, saas, self-service, festejia, ia, nextjs, automatizacion]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-sistemas-tecnologia]]", "[[festejia-planes-precios]]", "[[08_ARQUITECTURA_TECNICA|raw/documentos/festejia/08_ARQUITECTURA_TECNICA.md]]"]
---

# Festejia Express (Plataforma SaaS Self-Service con IA)

## Definición
**Festejia Express** es la vertiente de autoservicio (*self-service* SaaS) dentro del ecosistema de [[festejia]], concebida para que los usuarios puedan diseñar, editar, previsualizar y publicar su propia [[invitacion-web-interactiva]] de forma autónoma en cuestión de minutos, con asistencia de inteligencia artificial y sin depender de tiempos de diseño manual.

---

## 1. Mapa Completo de Rutas del Módulo Express

| Ruta | Función en la Aplicación | Acceso |
|---|---|:---:|
| `/express` | Landing comercial dedicada con presentación de funciones y tarifa base (Bs. 200). | Público |
| `/express/registro` | Registro rápido con correo electrónico y contraseña. | Público |
| `/express/login` | Inicio de sesión específico para usuarios de Express. | Público |
| `/express/dashboard` | Panel principal que lista las invitaciones creadas por el cliente y su estado (`Borrador`, `Pendiente de Pago`, `Publicada`). | Usuario Autenticado |
| `/express/dashboard/nueva` | Wizard secuencial de 3 pasos: selección de tipo de evento, fecha y plantilla base. | Usuario Autenticado |
| `/express/dashboard/editor/[id]` | **Editor visual en tiempo real con vista previa móvil sincronizada**. | Usuario Autenticado |
| `/express/dashboard/cuenta` | Configuración de perfil, cambio de contraseña y datos de facturación. | Usuario Autenticado |
| `/express/dashboard/ayuda` | Base de soporte rápido y enlace directo de asistencia por WhatsApp. | Usuario Autenticado |

---

## 2. Capacidades y Alcance del Editor (`/editor/[id]`)
El editor interactivo permite manipular los siguientes elementos en vivo:
1. **Datos Principales**: Nombres de los festejados/pareja, fecha del evento, horarios de ceremonia y recepción.
2. **Ubicación**: Nombre del salón y URL de Google Maps para botón interactivo.
3. **Galería**: Carga y recorte de hasta 4 fotografías en alta resolución.
4. **Música de Fondo**: Selector de pistas instrumentales o carga de archivo de audio personalizado.
5. **Itinerario**: Línea de tiempo editable (Recepción, Cena, Vals, Fiesta).
6. **Código de Vestimenta**: Selector de etiquetas (Formal, Cocktail, Guayabera, etc.) con paleta sugerida.
7. **Mesa de Regalos**: Cuenta bancaria con subida de imagen de código QR simple para transferencias de regalos.
8. **Condiciones de Servicio**: Incluye 2 correcciones post-publicación y vigencia activa hasta el día del evento.

---

## 3. Asistente de Textos con IA (`/api/express/generate-text`)
Microservicio interno que asiste al cliente bloqueado ante la "hoja en blanco":
- **Parámetros de Entrada**:
  ```json
  {
    "eventType": "boda | quince | graduacion | bautizo",
    "tone": "emotivo | clasico | divertido | poetico",
    "names": "Sofía & Lucas",
    "keyDetails": "Nos conocimos en la universidad hace 7 años"
  }
  ```
- **Salida**: Genera 3 opciones de frases introductorias, dedicatorias y votos para insertar con un clic en la invitación.

---

## 4. Circuito de Cobro y Activación (`lib/express/payments.js`)
Para evitar el abandono de carrito por pasarelas complejas o cobros de comisiones internacionales:
1. Al pulsar *"Publicar"*, el sistema genera una orden con código interno único: `EXP-[A-Z0-9]{4}` (ej. `EXP-4821`).
2. Se abre automáticamente [[whatsapp]] mediante el guion preconfigurado en [[scripts-whatsapp-festejia]]:
   ```text
   Hola Festejia! Quiero realizar un pago del Plan Express.
   Nombre: Juan Pérez
   Correo: juan@gmail.com
   Plantilla: Aurora
   Código interno: EXP-4821
   Concepto: Publicación de invitación
   Monto: Bs. 200
   ```
3. El administrador verifica el comprobante en `/admin-express` ([[festejia-especificacion-panel-admin]]) y presiona `Aprobar`, pasando la invitación a estado `publicada` de forma instantánea.

---

## Enlaces Relacionados
- [[festejia]]
- [[modelo-comercial-festejia]]
- [[scripts-whatsapp-festejia]]
- [[festejia-especificacion-panel-admin]]
- [[festejia-especificacion-panel-cliente]]
