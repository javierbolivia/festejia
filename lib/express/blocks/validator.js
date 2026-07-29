// lib/express/blocks/validator.js
//
// Validador GENÉRICO de campos obligatorios. Recorre los bloques que la
// plantilla activa declara (config.bloques), lee de cada uno su schema
// (schema.campos.requerido) y compara contra el contenido guardado.
//
// Ningún bloque nuevo necesita tocar este archivo: basta con marcar
// requerido: true en su schema.js y automáticamente participa aquí.
import { obtenerBloque } from './registry'

function estaVacio(valor) {
  if (valor == null) return true
  if (typeof valor === 'string') return valor.trim() === ''
  if (Array.isArray(valor)) return valor.length === 0
  return false
}

export function validarBloques(config, contenido) {
  const errores = []
  const datosCompletos = contenido || {}

  for (const entradaBloque of config.bloques) {
    const definicion = obtenerBloque(entradaBloque.tipo)
    if (!definicion) continue
    const { schema } = definicion
    const datos = datosCompletos[entradaBloque.tipo] || {}

    for (const campo of schema.campos || []) {
      if (!campo.requerido) continue
      // Un campo condicional (mostrarSi) solo es obligatorio si está visible
      if (campo.mostrarSi && datos[campo.mostrarSi.campo] !== campo.mostrarSi.valor) continue

      if (estaVacio(datos[campo.key])) {
        errores.push(`${schema.nombre}: falta "${campo.label}"`)
      }
    }
  }

  return { valido: errores.length === 0, errores }
}
