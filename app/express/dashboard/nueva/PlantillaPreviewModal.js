// app/express/dashboard/nueva/PlantillaPreviewModal.js
//
// Antes de elegir una plantilla, el cliente solo veía una imagen estática
// (thumbnail). Este modal renderiza el diseño REAL usando los mismos
// componentes Preview.js que después usará el editor de bloques, con
// contenido vacío — por lo que cada Preview cae en su placeholder de
// ejemplo (texto real de la plantilla, ej. "Carlos & Carmen"), dando una
// vista fiel de cómo luce el diseño antes de comprometerse a elegirlo.
//
// No inventa un renderizador nuevo: reutiliza obtenerConfigPlantilla +
// obtenerBloque, igual que EditorEngine.js, así que si una plantilla
// cambia sus bloques este preview se actualiza solo.
'use client'
import { obtenerConfigPlantilla } from '../../../../lib/express/templates/registry'
import { obtenerBloque } from '../../../../lib/express/blocks/registry'

// Fecha de ejemplo a 45 días desde hoy, solo para que la Cuenta regresiva
// muestre números reales en vez de "--" en este preview de solo-lectura.
function fechaEjemploFutura() {
  const d = new Date()
  d.setDate(d.getDate() + 45)
  return d.toISOString().slice(0, 10)
}

const INVITACION_EJEMPLO = {
  contenido: {
    'informacion-principal': { fecha_evento: fechaEjemploFutura() },
  },
}

export default function PlantillaPreviewModal({ plantillaId, nombre, onClose, onElegir }) {
  const config = obtenerConfigPlantilla(plantillaId)
  const bloquesVisibles = config.bloques.filter((b) => b.tipo !== 'configuracion')

  return (
    <div className="ppm-overlay" onClick={onClose}>
      <div className="ppm-panel" onClick={(e) => e.stopPropagation()}>
        <div className="ppm-header">
          <h2>Diseño: {nombre}</h2>
          <button type="button" className="ppm-cerrar" onClick={onClose} aria-label="Cerrar previsualización">✕</button>
        </div>
        <p className="ppm-nota">
          Así se ve el diseño con contenido de ejemplo. Al elegirlo, reemplazas cada texto y foto con los datos de tu evento.
        </p>
        <div className="ppm-scroll">
          <div className="ppm-phone">
            {bloquesVisibles.map((entradaBloque) => {
              const definicion = obtenerBloque(entradaBloque.tipo)
              if (!definicion || !definicion.Preview) return null
              const Preview = definicion.Preview
              return (
                <Preview
                  key={entradaBloque.tipo}
                  datos={null}
                  estilo={entradaBloque.estilo}
                  activo={false}
                  onClick={() => {}}
                  invitacionCompleta={INVITACION_EJEMPLO}
                />
              )
            })}
          </div>
        </div>
        {onElegir && (
          <div className="ppm-footer">
            <button type="button" className="ppm-btn-elegir" onClick={onElegir}>
              Elegir esta plantilla
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .ppm-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 100;
          display: flex; align-items: center; justify-content: center; padding: 1.5rem;
        }
        .ppm-panel {
          background: #f0efec; border-radius: 16px; max-width: 480px; width: 100%;
          max-height: 90vh; display: flex; flex-direction: column; overflow: hidden;
        }
        .ppm-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem 1.4rem 0.4rem; background: #f0efec;
        }
        .ppm-header h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; color: #1a1a1a; }
        .ppm-cerrar {
          background: #1a1a1a; color: white; border: none; width: 30px; height: 30px;
          border-radius: 50%; cursor: pointer; font-size: 0.85rem; flex-shrink: 0;
        }
        .ppm-nota { font-size: 0.78rem; color: #777; padding: 0 1.4rem 1rem; }
        .ppm-scroll { overflow-y: auto; padding: 0 1.2rem 1.4rem; flex: 1; }
        .ppm-phone { display: flex; flex-direction: column; gap: 1rem; max-width: 400px; margin: 0 auto; }
        .ppm-footer { padding: 1rem 1.4rem; background: white; border-top: 1px solid #e5e5e5; }
        .ppm-btn-elegir {
          width: 100%; background: #1a1a1a; color: white; border: none; padding: 0.85rem;
          border-radius: 10px; font-size: 0.9rem; font-weight: 500; cursor: pointer;
        }
        .ppm-btn-elegir:hover { background: #c9a96e; color: #1a1a1a; }
      `}</style>
    </div>
  )
}
