// lib/express/blocks/registry.js
//
// EL ÚNICO lugar del proyecto donde se "conoce" la lista completa de
// tipos de bloque disponibles. El motor del editor (EditorEngine.js)
// y el futuro renderizador público (/e/[slug]) solo llaman a
// obtenerBloque(tipo) — nunca importan un bloque por su nombre directo.
//
// Agregar un bloque nuevo en el futuro = crear su carpeta con
// schema.js + Editor.js + Preview.js y añadir una línea aquí.
// Ningún otro archivo del editor necesita cambiar.

import informacionPrincipalSchema from './informacion-principal/schema'
import InformacionPrincipalEditor from './informacion-principal/Editor'
import InformacionPrincipalPreview from './informacion-principal/Preview'

import portadaSchema from './portada/schema'
import PortadaEditor from './portada/Editor'
import PortadaPreview from './portada/Preview'

import cuentaRegresivaSchema from './cuenta-regresiva/schema'
import CuentaRegresivaEditor from './cuenta-regresiva/Editor'
import CuentaRegresivaPreview from './cuenta-regresiva/Preview'

import ceremoniaSchema from './ceremonia/schema'
import CeremoniaEditor from './ceremonia/Editor'
import CeremoniaPreview from './ceremonia/Preview'

import recepcionSchema from './recepcion/schema'
import RecepcionEditor from './recepcion/Editor'
import RecepcionPreview from './recepcion/Preview'

import itinerarioSchema from './itinerario/schema'
import ItinerarioEditor from './itinerario/Editor'
import ItinerarioPreview from './itinerario/Preview'

import padresSchema from './padres/schema'
import PadresEditor from './padres/Editor'
import PadresPreview from './padres/Preview'

import padrinosSchema from './padrinos/schema'
import PadrinosEditor from './padrinos/Editor'
import PadrinosPreview from './padrinos/Preview'

import historiaSchema from './historia/schema'
import HistoriaEditor from './historia/Editor'
import HistoriaPreview from './historia/Preview'

import galeriaSchema from './galeria/schema'
import GaleriaEditor from './galeria/Editor'
import GaleriaPreview from './galeria/Preview'

import musicaSchema from './musica/schema'
import MusicaEditor from './musica/Editor'
import MusicaPreview from './musica/Preview'

import dressCodeSchema from './dress-code/schema'
import DressCodeEditor from './dress-code/Editor'
import DressCodePreview from './dress-code/Preview'

import regalosSchema from './regalos/schema'
import RegalosEditor from './regalos/Editor'
import RegalosPreview from './regalos/Preview'

import soloAdultosSchema from './solo-adultos/schema'
import SoloAdultosEditor from './solo-adultos/Editor'
import SoloAdultosPreview from './solo-adultos/Preview'

import confirmacionSchema from './confirmacion/schema'
import ConfirmacionEditor from './confirmacion/Editor'
import ConfirmacionPreview from './confirmacion/Preview'

import redesSocialesSchema from './redes-sociales/schema'
import RedesSocialesEditor from './redes-sociales/Editor'
import RedesSocialesPreview from './redes-sociales/Preview'

import configuracionSchema from './configuracion/schema'
import ConfiguracionEditor from './configuracion/Editor'

export const BLOCK_REGISTRY = {
  'informacion-principal': { schema: informacionPrincipalSchema, Editor: InformacionPrincipalEditor, Preview: InformacionPrincipalPreview },
  portada: { schema: portadaSchema, Editor: PortadaEditor, Preview: PortadaPreview },
  'cuenta-regresiva': { schema: cuentaRegresivaSchema, Editor: CuentaRegresivaEditor, Preview: CuentaRegresivaPreview },
  ceremonia: { schema: ceremoniaSchema, Editor: CeremoniaEditor, Preview: CeremoniaPreview },
  recepcion: { schema: recepcionSchema, Editor: RecepcionEditor, Preview: RecepcionPreview },
  itinerario: { schema: itinerarioSchema, Editor: ItinerarioEditor, Preview: ItinerarioPreview },
  padres: { schema: padresSchema, Editor: PadresEditor, Preview: PadresPreview },
  padrinos: { schema: padrinosSchema, Editor: PadrinosEditor, Preview: PadrinosPreview },
  historia: { schema: historiaSchema, Editor: HistoriaEditor, Preview: HistoriaPreview },
  galeria: { schema: galeriaSchema, Editor: GaleriaEditor, Preview: GaleriaPreview },
  musica: { schema: musicaSchema, Editor: MusicaEditor, Preview: MusicaPreview },
  'dress-code': { schema: dressCodeSchema, Editor: DressCodeEditor, Preview: DressCodePreview },
  regalos: { schema: regalosSchema, Editor: RegalosEditor, Preview: RegalosPreview },
  'solo-adultos': { schema: soloAdultosSchema, Editor: SoloAdultosEditor, Preview: SoloAdultosPreview },
  confirmacion: { schema: confirmacionSchema, Editor: ConfirmacionEditor, Preview: ConfirmacionPreview },
  'redes-sociales': { schema: redesSocialesSchema, Editor: RedesSocialesEditor, Preview: RedesSocialesPreview },
  configuracion: { schema: configuracionSchema, Editor: ConfiguracionEditor, Preview: null },
}

export function obtenerBloque(tipo) {
  return BLOCK_REGISTRY[tipo] || null
}

export function listarTiposDeBloque() {
  return Object.keys(BLOCK_REGISTRY)
}
