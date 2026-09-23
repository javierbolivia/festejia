// lib/config.js
//
// Configuración de negocio centralizada. Primer caso de uso: el número de
// WhatsApp de contacto, que antes estaba hardcodeado como literal repetido
// en 11 ubicaciones distintas del proyecto (auditoría, hallazgo 2.3):
// app/bautizos, app/bodas, app/graduaciones, app/quince, app/login,
// app/page.js (x4), app/express/dashboard/ayuda, y lib/express/payments.js.
//
// Cambiar el número real del negocio ahora es editar UNA sola constante
// (o, mejor aún, la variable de entorno) en vez de hacer grep manual por
// 11 archivos y arriesgarse a dejar alguno desactualizado.
export const WHATSAPP_NUMERO =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59100000000'

/**
 * Construye un link de wa.me con el mensaje ya codificado, listo para usar
 * en un href. Evita repetir `encodeURIComponent` y la URL base en cada sitio.
 * @param {string} mensaje - texto plano, sin codificar.
 */
export function waLink(mensaje) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`
}
