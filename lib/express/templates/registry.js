// lib/express/templates/registry.js
//
// EL ÚNICO lugar donde se listan las plantillas disponibles. Agregar una
// plantilla nueva en el futuro = crear su archivo plantilla-x.js y añadir
// una línea aquí. El editor (EditorEngine.js) solo llama a
// obtenerConfigPlantilla(id) — nunca conoce los ids de plantilla de antemano.

import plantillaA from './plantilla-a'
import plantillaB from './plantilla-b'
import plantillaC from './plantilla-c'
import plantillaD from './plantilla-d'
import plantillaE from './plantilla-e'

export const TEMPLATE_REGISTRY = {
  'plantilla-a': plantillaA,
  'plantilla-b': plantillaB,
  'plantilla-c': plantillaC,
  'plantilla-d': plantillaD,
  'plantilla-e': plantillaE,
}

export function obtenerConfigPlantilla(id) {
  return TEMPLATE_REGISTRY[id] || plantillaA
}
