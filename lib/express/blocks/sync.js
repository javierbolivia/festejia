// lib/express/blocks/sync.js
//
// El nuevo editor guarda TODO el contenido de diseño en una sola columna
// JSON (express_invitaciones.contenido). Pero varias partes del sistema
// que YA EXISTÍAN antes del editor de bloques siguen leyendo columnas
// fijas directas: el dashboard "Mis Invitaciones" (nombre1/nombre2), el
// validador de publicación (validarParaPublicar en validation.js), el
// mensaje de WhatsApp de pagos (payments.js) y el panel /admin-express.
//
// Para no tener que reescribir esos archivos, esta función deriva esas
// columnas "legacy" a partir del contenido de bloques cada vez que se
// guarda. Es la única pieza que "traduce" entre el mundo nuevo (bloques)
// y el mundo viejo (columnas fijas). Si en el futuro se quita esa
// dependencia en otros archivos, esta función se puede simplificar o
// eliminar sin afectar al editor.
export function derivarColumnasLegacy(contenido) {
  const c = contenido || {}
  const info = c['informacion-principal'] || {}
  const padres = c['padres'] || {}
  const portada = c['portada'] || {}
  const ceremonia = c['ceremonia'] || {}
  const recepcion = c['recepcion'] || {}
  const itinerario = c['itinerario'] || {}
  const dressCode = c['dress-code'] || {}
  const soloAdultos = c['solo-adultos'] || {}
  const regalos = c['regalos'] || {}
  const galeria = c['galeria'] || {}
  const musica = c['musica'] || {}
  const historia = c['historia'] || {}

  const columnas = {
    nombre1: info.nombre1 || null,
    nombre2: info.nombre2 || null,
    fecha_evento: info.fecha_evento || null,
    hora_evento: info.hora_evento || null,
    padres_novia: padres.padres_novia || info.padres_novia || null,
    padres_novio: padres.padres_novio || info.padres_novio || null,

    foto_portada_url: portada.imagen || null,

    ceremonia_lugar: ceremonia.lugar || null,
    ceremonia_maps_url: ceremonia.maps_url || null,
    ceremonia_hora: ceremonia.hora || null,
    recepcion_lugar: recepcion.lugar || null,
    recepcion_maps_url: recepcion.maps_url || null,
    recepcion_hora: recepcion.hora || null,

    itinerario: Array.isArray(itinerario.items) ? itinerario.items : [],

    dresscode: dressCode.texto || null,
    colores_sugeridos: dressCode.color_sugerido ? [dressCode.color_sugerido] : [],
    solo_adultos: !!soloAdultos.activo,

    mensaje_bienvenida: historia.texto || null,
    mensaje_regalos: regalos.mensaje || null,
    mensaje_dresscode: dressCode.texto || null,
    mensaje_solo_adultos: soloAdultos.mensaje || null,

    regalo_qr_url: regalos.qr_imagen || null,
    regalo_mesa_link: regalos.mesa_link || null,

    fotos_galeria: Array.isArray(galeria.fotos) ? galeria.fotos : [],
    musica_url: musica.archivo || null,
  }

  // Nunca sobrescribas con null algo que el propio bloque no tocó todavía;
  // el llamador hace merge con los valores actuales de la invitación.
  return columnas
}
