// lib/express/payments.js
//
// Capa de abstracción de pagos para Festejia Express.
//
// Objetivo: que el resto del sistema (editor, dashboard, admin) solo conozca
// estas funciones por su nombre, sin saber CÓMO se procesa el pago por dentro.
// Hoy el método real es "whatsapp_manual". Cuando se integre Libélula, solo
// se edita el interior de estas funciones — nadie más en el proyecto cambia.

import { crearSolicitudPago, confirmarPagoAdmin, rechazarPagoAdmin } from './queries'
import { PRECIO_PUBLICACION_BOB, PRECIO_CORRECCION_EXTRA_BOB } from './validation'

const WHATSAPP_NUMERO = '59100000000' // TODO: reemplazar por el número real de Festejia

/**
 * Construye el mensaje de WhatsApp pre-armado con los datos requeridos:
 * nombre, correo, plantilla elegida, código interno, "Plan Express".
 */
function construirMensajeWhatsApp({ nombreCliente, email, plantilla, codigoInterno, concepto, monto }) {
  const lineas = [
    'Hola Festejia! Quiero realizar un pago del Plan Express.',
    '',
    `Nombre: ${nombreCliente || '-'}`,
    `Correo: ${email || '-'}`,
    `Plantilla: ${plantilla || '-'}`,
    `Código interno: ${codigoInterno || '-'}`,
    `Concepto: ${concepto}`,
    `Monto: Bs. ${monto}`,
  ]
  return encodeURIComponent(lineas.join('\n'))
}

function abrirWhatsApp(mensajeCodificado) {
  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensajeCodificado}`
  if (typeof window !== 'undefined') {
    window.open(url, '_blank')
  }
  return url
}

/**
 * Se llama cuando el cliente presiona "Publicar" en el editor.
 * 1. Crea el registro en express_pagos (estado='pendiente').
 * 2. Genera y abre el link de WhatsApp con el mensaje pre-armado.
 *
 * Cuando se integre Libélula, este es el único lugar que cambia:
 * en vez de abrir WhatsApp, se generaría un link de pago o checkout
 * de Libélula y se redirigiría ahí. El resto del sistema seguiría
 * llamando a esta misma función sin enterarse del cambio.
 */
export async function iniciarPagoPublicacion({ invitacionId, nombreCliente, email, plantilla, codigoInterno }) {
  const { data: pago, error } = await crearSolicitudPago(invitacionId, 'publicacion', PRECIO_PUBLICACION_BOB)
  if (error) return { data: null, error }

  const mensaje = construirMensajeWhatsApp({
    nombreCliente,
    email,
    plantilla,
    codigoInterno,
    concepto: 'Publicación de invitación',
    monto: PRECIO_PUBLICACION_BOB,
  })
  const whatsappUrl = abrirWhatsApp(mensaje)

  return { data: { pago, whatsappUrl }, error: null }
}

/**
 * Se llama cuando el cliente ya usó sus correcciones gratuitas y quiere
 * comprar 2 correcciones adicionales.
 */
export async function iniciarPagoCorreccionExtra({ invitacionId, nombreCliente, email, plantilla, codigoInterno }) {
  const { data: pago, error } = await crearSolicitudPago(invitacionId, 'correcciones_extra', PRECIO_CORRECCION_EXTRA_BOB)
  if (error) return { data: null, error }

  const mensaje = construirMensajeWhatsApp({
    nombreCliente,
    email,
    plantilla,
    codigoInterno,
    concepto: 'Correcciones adicionales',
    monto: PRECIO_CORRECCION_EXTRA_BOB,
  })
  const whatsappUrl = abrirWhatsApp(mensaje)

  return { data: { pago, whatsappUrl }, error: null }
}

/**
 * Usado desde /admin-express para confirmar un pago manualmente.
 * Publica la invitación automáticamente si el pago era de tipo 'publicacion'.
 */
export async function confirmarPago(pagoId, adminUserId) {
  return confirmarPagoAdmin(pagoId, adminUserId)
}

/**
 * Usado desde /admin-express si el pago reportado no es válido.
 */
export async function rechazarPago(pagoId, adminUserId) {
  return rechazarPagoAdmin(pagoId, adminUserId)
}
