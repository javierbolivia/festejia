'use client'
import BlockPreviewShell from '../BlockPreviewShell'

export default function RecepcionPreview({ datos, activo, onClick }) {
  const d = datos || {}
  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="rec-preview">
        <span className="rec-icono">🥂</span>
        <h3>Recepción</h3>
        <p className="rec-lugar">{d.lugar || 'Nombre del lugar'}</p>
        {d.direccion && <p className="rec-direccion">{d.direccion}</p>}
        {d.hora && <p className="rec-hora">{d.hora} hrs</p>}
        {d.maps_url && <a href={d.maps_url} target="_blank" rel="noopener noreferrer" className="rec-maps">Ver en mapa</a>}
      </div>
      <style jsx>{`
        .rec-preview { padding: 1.8rem 1.5rem; text-align: center; background: #fbf8f2; }
        .rec-icono { font-size: 1.6rem; }
        .rec-preview h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; margin: 0.4rem 0; }
        .rec-lugar { font-size: 0.9rem; color: #333; font-weight: 500; }
        .rec-direccion, .rec-hora { font-size: 0.78rem; color: #888; }
        .rec-maps { display: inline-block; margin-top: 0.5rem; font-size: 0.75rem; color: #c9a96e; text-decoration: underline; }
      `}</style>
    </BlockPreviewShell>
  )
}
