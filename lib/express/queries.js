// lib/express/queries.js
// Todas las consultas a las tablas express_* pasan por aquí.
// Reutiliza el cliente Supabase existente (lib/supabase.js) sin modificarlo.

import { supabase } from '../supabase'
import { derivarColumnasLegacy } from './blocks/sync'

// ------------------------------------------------------------
// express_clientes
// ------------------------------------------------------------

export async function crearPerfilExpress(userId, email, nombre) {
  return supabase.from('express_clientes').insert({
    id: userId,
    email,
    nombre: nombre || null,
  })
}

export async function obtenerPerfilExpress(userId) {
  const { data, error } = await supabase
    .from('express_clientes')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

// ------------------------------------------------------------
// express_invitaciones
// ------------------------------------------------------------

export async function listarInvitacionesDeUsuario(userId) {
  const { data, error } = await supabase
    .from('express_invitaciones')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data: data || [], error }
}

export async function obtenerInvitacionPorId(id, userId) {
  const { data, error } = await supabase
    .from('express_invitaciones')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()
  return { data, error }
}

export async function obtenerInvitacionPublicaPorSlug(slug) {
  const { data, error } = await supabase
    .from('express_invitaciones')
    .select('*')
    .eq('slug', slug)
    .eq('estado', 'publicada')
    .single()
  return { data, error }
}

export async function crearInvitacionBorrador(userId, plantilla, codigoInterno) {
  const { data, error } = await supabase
    .from('express_invitaciones')
    .insert({
      user_id: userId,
      plantilla,
      codigo_interno: codigoInterno,
      estado: 'borrador',
    })
    .select()
    .single()
  return { data, error }
}

export async function actualizarInvitacion(id, userId, campos) {
  const { data, error } = await supabase
    .from('express_invitaciones')
    .update(campos)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()
  return { data, error }
}

/**
 * Guarda el contenido de UN bloque del editor tipo Canva dentro de la
 * columna JSON `contenido`, y sincroniza automáticamente las columnas
 * legacy (nombre1, ceremonia_lugar, dresscode, etc.) para que el
 * dashboard, el validador de publicación y los mensajes de WhatsApp
 * sigan funcionando sin cambios.
 */
export async function guardarBloque(id, userId, tipoBloque, datosBloque) {
  const { data: actual, error: errActual } = await supabase
    .from('express_invitaciones')
    .select('contenido')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (errActual) return { data: null, error: errActual }

  const contenidoActualizado = { ...(actual?.contenido || {}), [tipoBloque]: datosBloque }
  const columnasLegacy = derivarColumnasLegacy(contenidoActualizado)

  const { data, error } = await supabase
    .from('express_invitaciones')
    .update({ contenido: contenidoActualizado, ...columnasLegacy })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  return { data, error }
}

/**
 * Guarda el orden elegido por el usuario para los bloques reordenables.
 */
export async function guardarOrdenBloques(id, userId, orden) {
  const { data, error } = await supabase
    .from('express_invitaciones')
    .update({ orden })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()
  return { data, error }
}

/**
 * Intenta actualizar una invitación con un slug candidato. Si la base de
 * datos rechaza el slug por ya estar en uso (restricción unique, código
 * Postgres 23505), reintenta automáticamente con un sufijo aleatorio nuevo.
 *
 * A propósito NO se hace un SELECT previo para "verificar si ya existe":
 * bajo RLS (seguridad a nivel de fila), esa verificación puede no ver filas
 * de otros usuarios y reportar falsamente que el slug está libre. Intentar
 * escribir directamente y reintentar ante colisión es la única forma
 * confiable de garantizar unicidad real, sin importar qué filas sea capaz
 * de ver quien ejecuta la consulta.
 */
async function actualizarConSlugUnico(filtroQuery, slugBase, camposAdicionales, maxIntentos = 6) {
  let candidato = slugBase
  for (let intento = 0; intento < maxIntentos; intento++) {
    const { data, error } = await filtroQuery({ slug: candidato, ...camposAdicionales })
    if (!error) return { data, error: null }

    const esColisionDeSlug = error.code === '23505' || /duplicate key value/i.test(error.message || '')
    if (!esColisionDeSlug) return { data: null, error }

    candidato = `${slugBase}-${Math.floor(Math.random() * 100000)}`
  }
  return { data: null, error: new Error('No se pudo generar un slug único después de varios intentos.') }
}

export async function fijarSlugSiDisponible(id, userId, slugBase) {
  return actualizarConSlugUnico(
    (campos) =>
      supabase.from('express_invitaciones').update(campos).eq('id', id).eq('user_id', userId).select().single(),
    slugBase,
    {}
  )
}

export async function marcarPendientePago(id, userId) {
  const { data, error } = await supabase
    .from('express_invitaciones')
    .update({ estado: 'pendiente_pago' })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()
  return { data, error }
}

export async function eliminarInvitacion(id, userId) {
  return supabase.from('express_invitaciones').delete().eq('id', id).eq('user_id', userId)
}

// ------------------------------------------------------------
// Correcciones post-publicación
// ------------------------------------------------------------

export async function registrarCorreccion(invitacionId, userId, campoModificado, valorAnterior, valorNuevo) {
  // 1. Descuenta 1 corrección disponible y suma 1 a usadas
  const { data: inv, error: errInv } = await supabase
    .from('express_invitaciones')
    .select('correcciones_disponibles, correcciones_usadas')
    .eq('id', invitacionId)
    .eq('user_id', userId)
    .single()

  if (errInv || !inv) return { data: null, error: errInv || new Error('Invitación no encontrada') }
  if (inv.correcciones_disponibles <= 0) {
    return { data: null, error: new Error('Sin correcciones disponibles') }
  }

  const { data, error } = await supabase
    .from('express_invitaciones')
    .update({
      correcciones_disponibles: inv.correcciones_disponibles - 1,
      correcciones_usadas: inv.correcciones_usadas + 1,
    })
    .eq('id', invitacionId)
    .eq('user_id', userId)
    .select()
    .single()

  if (!error) {
    // 2. Deja registro en el log de auditoría (no bloqueante)
    await supabase.from('express_correcciones_log').insert({
      invitacion_id: invitacionId,
      campo_modificado: campoModificado,
      valor_anterior: valorAnterior != null ? String(valorAnterior) : null,
      valor_nuevo: valorNuevo != null ? String(valorNuevo) : null,
    })
  }

  return { data, error }
}

// ------------------------------------------------------------
// express_pagos
// ------------------------------------------------------------

export async function crearSolicitudPago(invitacionId, tipo, monto, metodo = 'whatsapp_manual') {
  const { data, error } = await supabase
    .from('express_pagos')
    .insert({
      invitacion_id: invitacionId,
      tipo,
      monto,
      metodo,
      estado: 'pendiente',
    })
    .select()
    .single()
  return { data, error }
}

export async function listarPagosDeInvitacion(invitacionId) {
  const { data, error } = await supabase
    .from('express_pagos')
    .select('*')
    .eq('invitacion_id', invitacionId)
    .order('created_at', { ascending: false })
  return { data: data || [], error }
}

// ------------------------------------------------------------
// Panel /admin-express (uso exclusivo del administrador)
// ------------------------------------------------------------

export async function listarPagosPendientes() {
  const { data, error } = await supabase
    .from('express_pagos')
    .select('*, express_invitaciones(nombre1, nombre2, codigo_interno, slug, plantilla, estado)')
    .eq('estado', 'pendiente')
    .order('created_at', { ascending: true })
  return { data: data || [], error }
}

export async function listarTodasLasInvitaciones() {
  const { data, error } = await supabase
    .from('express_invitaciones')
    .select('*')
    .order('created_at', { ascending: false })
  return { data: data || [], error }
}

/**
 * Confirma un pago y, si es de tipo 'publicacion', publica la invitación
 * automáticamente calculando su fecha de expiración (fecha_evento + 1 día).
 * Si es 'correcciones_extra', suma correcciones disponibles.
 */
export async function confirmarPagoAdmin(pagoId, adminUserId) {
  const { data: pago, error: errPago } = await supabase
    .from('express_pagos')
    .select('*, express_invitaciones(id, fecha_evento, correcciones_disponibles)')
    .eq('id', pagoId)
    .single()

  if (errPago || !pago) return { data: null, error: errPago || new Error('Pago no encontrado') }

  const { error: errUpdatePago } = await supabase
    .from('express_pagos')
    .update({
      estado: 'confirmado',
      confirmado_por: adminUserId,
      confirmado_at: new Date().toISOString(),
    })
    .eq('id', pagoId)

  if (errUpdatePago) return { data: null, error: errUpdatePago }

  const invitacion = pago.express_invitaciones
  if (!invitacion) return { data: pago, error: null }

  if (pago.tipo === 'publicacion') {
    const fechaEvento = invitacion.fecha_evento ? new Date(invitacion.fecha_evento) : null
    let fechaExpiracion = null
    if (fechaEvento) {
      fechaEvento.setDate(fechaEvento.getDate() + 1)
      fechaExpiracion = fechaEvento.toISOString().split('T')[0]
    }

    await supabase
      .from('express_invitaciones')
      .update({
        estado: 'publicada',
        fecha_publicacion: new Date().toISOString(),
        fecha_expiracion: fechaExpiracion,
      })
      .eq('id', invitacion.id)
  } else if (pago.tipo === 'correcciones_extra') {
    await supabase
      .from('express_invitaciones')
      .update({
        correcciones_disponibles: (invitacion.correcciones_disponibles || 0) + 2,
      })
      .eq('id', invitacion.id)
  }

  return { data: pago, error: null }
}

export async function rechazarPagoAdmin(pagoId, adminUserId) {
  return supabase
    .from('express_pagos')
    .update({
      estado: 'rechazado',
      confirmado_por: adminUserId,
      confirmado_at: new Date().toISOString(),
    })
    .eq('id', pagoId)
}

/**
 * Publica una invitación manualmente desde /admin-express, sin pasar por
 * el flujo de pago (ej. cortesías, pruebas, o pagos coordinados fuera del
 * sistema). Fija slug único si no lo tiene, calcula fecha_expiracion.
 */
export async function publicarInvitacionAdmin(invitacionId) {
  const { data: inv, error: errInv } = await supabase
    .from('express_invitaciones')
    .select('id, slug, nombre1, nombre2, codigo_interno, fecha_evento')
    .eq('id', invitacionId)
    .single()

  if (errInv || !inv) return { data: null, error: errInv || new Error('Invitación no encontrada') }

  let fechaExpiracion = null
  if (inv.fecha_evento) {
    const fecha = new Date(inv.fecha_evento)
    fecha.setDate(fecha.getDate() + 1)
    fechaExpiracion = fecha.toISOString().split('T')[0]
  }

  const camposAdicionales = {
    estado: 'publicada',
    fecha_publicacion: new Date().toISOString(),
    fecha_expiracion: fechaExpiracion,
  }

  // Si ya tiene slug, se mantiene tal cual (no se regenera al publicar).
  if (inv.slug) {
    const { data, error } = await supabase
      .from('express_invitaciones')
      .update(camposAdicionales)
      .eq('id', invitacionId)
      .select()
      .single()
    return { data, error }
  }

  // Sin nombres capturados aún: se usa el código interno (siempre único,
  // generado al crear la invitación) en vez de un valor genérico fijo como
  // "invitacion", que colisionaría entre distintos borradores sin nombre.
  const nombreBase = [inv.nombre1, inv.nombre2].filter(Boolean).join('-y-')
    .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  const slugBase = nombreBase || (inv.codigo_interno ? inv.codigo_interno.toLowerCase() : `inv-${invitacionId.slice(0, 8)}`)

  return actualizarConSlugUnico(
    (campos) =>
      supabase.from('express_invitaciones').update({ ...campos, ...camposAdicionales }).eq('id', invitacionId).select().single(),
    slugBase,
    {}
  )
}

/**
 * Regresa una invitación publicada a borrador (ej. si se publicó por error).
 */
export async function despublicarInvitacionAdmin(invitacionId) {
  const { data, error } = await supabase
    .from('express_invitaciones')
    .update({ estado: 'borrador', fecha_publicacion: null, fecha_expiracion: null })
    .eq('id', invitacionId)
    .select()
    .single()
  return { data, error }
}
