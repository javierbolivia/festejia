// lib/express/validation.js
// Reglas de validación para el módulo Express.
// No depende de Supabase ni de React: funciones puras, fáciles de testear.

export const PLANTILLAS_EXPRESS = [
  'plantilla-a',
  'plantilla-b',
  'plantilla-c',
  'plantilla-d',
  'plantilla-e',
]

export const MAX_FOTOS_GALERIA = 3
export const MAX_TAMANO_FOTO_MB = 5
export const MAX_TAMANO_MUSICA_MB = 5
export const CORRECCIONES_INICIALES = 2
export const CORRECCIONES_POR_PAGO_EXTRA = 2
export const PRECIO_PUBLICACION_BOB = 200
export const PRECIO_CORRECCION_EXTRA_BOB = 30

/**
 * Genera un slug URL-friendly a partir de los nombres de la pareja.
 * Ej: "Laura", "Carlos" -> "laura-y-carlos"
 */
export function generarSlug(nombre1, nombre2) {
  const limpiar = (s) =>
    (s || '')
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // quita tildes
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

  const base = [limpiar(nombre1), limpiar(nombre2)].filter(Boolean).join('-y-')
  return base || 'invitacion'
}

/**
 * Genera un código interno corto para identificar la invitación
 * en mensajes de WhatsApp. Ej: EXP-A3F9
 */
export function generarCodigoInterno() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return `EXP-${code}`
}

/**
 * Valida que la invitación tenga los campos mínimos necesarios
 * antes de permitir solicitar publicación.
 * Devuelve { valido: boolean, errores: string[] }
 */
export function validarParaPublicar(invitacion) {
  const errores = []

  if (!invitacion?.nombre1?.trim()) errores.push('Falta el nombre de uno de los novios')
  if (!invitacion?.nombre2?.trim()) errores.push('Falta el nombre del otro novio')
  if (!invitacion?.fecha_evento) errores.push('Falta la fecha del evento')
  if (!invitacion?.ceremonia_lugar?.trim() && !invitacion?.recepcion_lugar?.trim()) {
    errores.push('Debes indicar al menos un lugar (ceremonia o recepción)')
  }
  if (!invitacion?.foto_portada_url) errores.push('Falta subir la foto de portada')
  if (!invitacion?.plantilla || !PLANTILLAS_EXPRESS.includes(invitacion.plantilla)) {
    errores.push('Debes elegir una plantilla válida')
  }

  return { valido: errores.length === 0, errores }
}

/**
 * Valida un archivo de foto antes de subirlo.
 */
export function validarArchivoFoto(file) {
  if (!file) return { valido: false, error: 'No se seleccionó ningún archivo' }
  const tiposValidos = ['image/jpeg', 'image/png', 'image/webp']
  if (!tiposValidos.includes(file.type)) {
    return { valido: false, error: 'Formato no válido. Usa JPG, PNG o WebP.' }
  }
  const maxBytes = MAX_TAMANO_FOTO_MB * 1024 * 1024
  if (file.size > maxBytes) {
    return { valido: false, error: `La foto no debe superar ${MAX_TAMANO_FOTO_MB}MB.` }
  }
  return { valido: true, error: null }
}

/**
 * Valida un archivo de música antes de subirlo.
 */
export function validarArchivoMusica(file) {
  if (!file) return { valido: false, error: 'No se seleccionó ningún archivo' }
  if (file.type !== 'audio/mpeg' && !file.name?.toLowerCase().endsWith('.mp3')) {
    return { valido: false, error: 'Solo se acepta formato MP3.' }
  }
  const maxBytes = MAX_TAMANO_MUSICA_MB * 1024 * 1024
  if (file.size > maxBytes) {
    return { valido: false, error: `El archivo de música no debe superar ${MAX_TAMANO_MUSICA_MB}MB.` }
  }
  return { valido: true, error: null }
}

/**
 * Verifica si la invitación aún tiene correcciones disponibles.
 */
export function tieneCorreccionesDisponibles(invitacion) {
  return (invitacion?.correcciones_disponibles || 0) > 0
}
