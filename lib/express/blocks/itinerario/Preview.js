'use client'
import BlockPreviewShell from '../BlockPreviewShell'

const EJEMPLO_ITEMS = [
  { hora: '13:00', descripcion: 'Ceremonia Religiosa' },
  { hora: '16:00', descripcion: 'Recepción Social' },
  { hora: '17:00', descripcion: 'Felicitaciones y Regalos' },
  { hora: '18:00', descripcion: 'Una deliciosa Cena' },
  { hora: '19:00', descripcion: 'Partimos la torta' },
  { hora: '20:00', descripcion: 'Nos vamos a casa' },
]

export default function ItinerarioPreview({ datos, activo, onClick }) {
  const items = Array.isArray(datos?.items) ? datos.items.filter((i) => i.hora || i.descripcion) : []
  const mostrarEjemplo = items.length === 0
  const itemsAMostrar = mostrarEjemplo ? EJEMPLO_ITEMS : items
  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="it-preview">
        <h3>Cronograma</h3>
        {mostrarEjemplo && <p className="it-vacio">Ejemplo — agrega los momentos de tu evento</p>}
        <div className="it-lista">
          {itemsAMostrar.map((item, i) => (
            <div key={i} className="it-item">
              <span className="it-hora">{item.hora || '--:--'}</span>
              <span className="it-desc">{item.descripcion || '—'}</span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .it-preview { padding: 1.8rem 1.5rem; background: white; }
        .it-preview h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; text-align: center; margin-bottom: 1rem; }
        .it-vacio { text-align: center; font-size: 0.8rem; color: #999; }
        .it-lista { display: flex; flex-direction: column; gap: 0.6rem; max-width: 320px; margin: 0 auto; }
        .it-item { display: flex; gap: 0.8rem; font-size: 0.82rem; border-bottom: 1px dashed #eee; padding-bottom: 0.4rem; }
        .it-hora { color: #c9a96e; font-weight: 600; min-width: 50px; }
        .it-desc { color: #444; }
      `}</style>
    </BlockPreviewShell>
  )
}
