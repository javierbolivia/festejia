// lib/express/storage.js
//
// Manejo de subida y optimización de fotos y música para Festejia Express.
// Usa el bucket 'express-media' (creado en scripts/express-migration.sql).
// Reutiliza el cliente Supabase existente sin modificarlo.

import { supabase } from '../supabase'
import { validarArchivoFoto, validarArchivoMusica } from './validation'

const BUCKET = 'express-media'
const ANCHO_MAX_FOTO = 1200

/**
 * Comprime una imagen en el navegador antes de subirla:
 * - Redimensiona a máximo 1200px de ancho (mantiene proporción)
 * - Convierte a WebP con calidad 0.8
 * Devuelve un Blob listo para subir.
 */
export async function comprimirImagen(file) {
  const bitmap = await createImageBitmap(file)
  const escala = Math.min(1, ANCHO_MAX_FOTO / bitmap.width)
  const ancho = Math.round(bitmap.width * escala)
  const alto = Math.round(bitmap.height * escala)

  const canvas = document.createElement('canvas')
  canvas.width = ancho
  canvas.height = alto
  const ctx = canvas.getContext('2d')
  ctx.drawImage(bitmap, 0, 0, ancho, alto)

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, 'image/webp', 0.8)
  )
  return blob
}

/**
 * Sube la foto de portada de una invitación.
 * Ruta final: express-media/{userId}/{invitacionId}/portada.webp
 */
export async function subirFotoPortada(userId, invitacionId, file) {
  const validacion = validarArchivoFoto(file)
  if (!validacion.valido) return { url: null, error: new Error(validacion.error) }

  try {
    const blob = await comprimirImagen(file)
    const ruta = `${userId}/${invitacionId}/portada.webp`

    const { error: errorSubida } = await supabase.storage
      .from(BUCKET)
      .upload(ruta, blob, { contentType: 'image/webp', upsert: true })

    if (errorSubida) return { url: null, error: errorSubida }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(ruta)
    return { url: data.publicUrl, error: null }
  } catch (err) {
    return { url: null, error: err }
  }
}

/**
 * Sube una foto de galería (índice 0, 1 o 2).
 * Ruta final: express-media/{userId}/{invitacionId}/galeria-{indice}.webp
 */
export async function subirFotoGaleria(userId, invitacionId, file, indice) {
  const validacion = validarArchivoFoto(file)
  if (!validacion.valido) return { url: null, error: new Error(validacion.error) }

  try {
    const blob = await comprimirImagen(file)
    const ruta = `${userId}/${invitacionId}/galeria-${indice}.webp`

    const { error: errorSubida } = await supabase.storage
      .from(BUCKET)
      .upload(ruta, blob, { contentType: 'image/webp', upsert: true })

    if (errorSubida) return { url: null, error: errorSubida }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(ruta)
    return { url: data.publicUrl, error: null }
  } catch (err) {
    return { url: null, error: err }
  }
}

/**
 * Sube el archivo de música (MP3, sin comprimir en el navegador —
 * solo se valida tamaño y formato, la compresión de audio en cliente
 * no es práctica sin librerías pesadas).
 * Ruta final: express-media/{userId}/{invitacionId}/musica.mp3
 */
export async function subirMusica(userId, invitacionId, file) {
  const validacion = validarArchivoMusica(file)
  if (!validacion.valido) return { url: null, error: new Error(validacion.error) }

  try {
    const ruta = `${userId}/${invitacionId}/musica.mp3`

    const { error: errorSubida } = await supabase.storage
      .from(BUCKET)
      .upload(ruta, file, { contentType: 'audio/mpeg', upsert: true })

    if (errorSubida) return { url: null, error: errorSubida }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(ruta)
    return { url: data.publicUrl, error: null }
  } catch (err) {
    return { url: null, error: err }
  }
}

/**
 * Sube la imagen de QR bancario para la sección de regalos.
 * Ruta final: express-media/{userId}/{invitacionId}/regalo-qr.webp
 */
export async function subirQrRegalo(userId, invitacionId, file) {
  const validacion = validarArchivoFoto(file)
  if (!validacion.valido) return { url: null, error: new Error(validacion.error) }

  try {
    const blob = await comprimirImagen(file)
    const ruta = `${userId}/${invitacionId}/regalo-qr.webp`

    const { error: errorSubida } = await supabase.storage
      .from(BUCKET)
      .upload(ruta, blob, { contentType: 'image/webp', upsert: true })

    if (errorSubida) return { url: null, error: errorSubida }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(ruta)
    return { url: data.publicUrl, error: null }
  } catch (err) {
    return { url: null, error: err }
  }
}

/**
 * Subida GENÉRICA usada por el editor de bloques (lib/express/blocks/FieldRenderer.js).
 * A diferencia de las funciones específicas de arriba (que siguen usándose desde el
 * wizard anterior por compatibilidad), esta función sirve para CUALQUIER bloque nuevo
 * sin tener que escribir una función de subida por cada uno.
 *
 * Ruta final: express-media/{userId}/{invitacionId}/bloques/{bloqueTipo}-{campoKey}[-{indice}].ext
 */
export async function subirArchivoBloque(userId, invitacionId, bloqueTipo, campoKey, file, opts = {}) {
  const { audio = false, indice } = opts

  if (audio) {
    const validacion = validarArchivoMusica(file)
    if (!validacion.valido) return { url: null, error: new Error(validacion.error) }
    try {
      const sufijo = indice != null ? `-${indice}` : ''
      const ruta = `${userId}/${invitacionId}/bloques/${bloqueTipo}-${campoKey}${sufijo}.mp3`
      const { error: errorSubida } = await supabase.storage
        .from(BUCKET)
        .upload(ruta, file, { contentType: 'audio/mpeg', upsert: true })
      if (errorSubida) return { url: null, error: errorSubida }
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(ruta)
      return { url: data.publicUrl, error: null }
    } catch (err) {
      return { url: null, error: err }
    }
  }

  const validacion = validarArchivoFoto(file)
  if (!validacion.valido) return { url: null, error: new Error(validacion.error) }

  try {
    const blob = await comprimirImagen(file)
    const sufijo = indice != null ? `-${indice}` : ''
    const ruta = `${userId}/${invitacionId}/bloques/${bloqueTipo}-${campoKey}${sufijo}.webp`
    const { error: errorSubida } = await supabase.storage
      .from(BUCKET)
      .upload(ruta, blob, { contentType: 'image/webp', upsert: true })
    if (errorSubida) return { url: null, error: errorSubida }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(ruta)
    return { url: data.publicUrl, error: null }
  } catch (err) {
    return { url: null, error: err }
  }
}
