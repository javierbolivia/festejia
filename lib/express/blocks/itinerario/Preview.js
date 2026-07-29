'use client'
import BlockPreviewShell from '../BlockPreviewShell'

export default function ItinerarioPreview({ datos, activo, onClick }) {
  const items = Array.isArray(datos?.items) ? datos.items.filter((i) => i.hora || i.descripcion) : []
  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="it-preview">
        <h3>Itinerario</h3>
        {items.length === 0 && <p className="it-vacio">Agrega los momentos de tu evento</p>}
        <div className="it-lista">
          {items.map((item, i) => (
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
