---
tipo: concepto
tags: [tecnologia, qr, control-acceso, seguridad, recepcion]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-sistemas-tecnologia]]"]
---

# Check-in QR

## Definición
El **Check-in QR** es un mecanismo de control de acceso digital para recepciones de eventos sociales, mediante el cual el personal de puerta escanea un código QR único presentado en el teléfono del invitado para validar su entrada en tiempo real.

## Funcionamiento Operativo
1. **Generación**: El código QR se genera dinámicamente en la interfaz de la [[invitacion-web-interactiva]] únicamente tras la confirmación satisfactoria en el [[sistema-rsvp-inteligente]].
2. **Escaneo**: La persona a cargo del acceso ingresa a la ruta `/checkin` desde un smartphone o tablet sin necesidad de descargar lectores externos.
3. **Validación Instantánea**:
   - Muestra: Nombre de familia, cantidad de personas autorizadas y número de mesa asignada.
   - Estado: Cambia el ticket a "Ingresado" en la base de datos central.
4. **Prevención de Fraude**: Si el mismo código se presenta por segunda vez, la pantalla emite una alerta indicando que el ticket ya fue utilizado previamente con su hora exacta de registro.

## Ventajas para los Organizadores
- Erradica las listas impresas en papel y las filas lentas en la puerta del salón.
- Proporciona seguridad a los anfitriones de que solo ingresan las personas invitadas.

## Enlaces Relacionados
- [[sistema-rsvp-inteligente]]
- [[festejia-sistemas-tecnologia]]
- [[festejia]]
