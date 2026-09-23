// lib/express/storage.js
//
// Manejo de subida y optimización de fotos y música para Festejia Express.
// Usa el bucket 'express-media' (creado en scripts/express-migration.sql).
// Reutiliza el cliente Supabase existente sin modificarlo.
//
// Corrección de auditoría (hallazgo 2.6): este archivo tenía 4 funciones
// específicas (subirFotoPortada, subirFotoGaleria, subirMusica,
// subirQrRegalo) escritas para el wizard multi-paso original, previo al
// editor de bloques. Verificado con grep en todo el proyecto: ninguna tenía
// callers fuera de su propia declaración — el único consumidor real hoy es
// subirArchivoBloque (usada por lib/express/blocks/FieldRenderer.js), que
// ya cubre el mismo caso de uso de forma genérica para cualquier bloque.
// Se eliminó código muerto sin quitar ninguna funcionalidad activa.

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
 * Subida GENÉRICA usada por el editor de bloques (lib/express/blocks/FieldRenderer.js).
 * Sirve para CUALQUIER bloque nuevo sin tener que escribir una función de
 * subida específica por cada uno.
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
