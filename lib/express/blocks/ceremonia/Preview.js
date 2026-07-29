'use client'
import BlockPreviewShell from '../BlockPreviewShell'

export default function CeremoniaPreview({ datos, activo, onClick }) {
  const d = datos || {}
  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="cer-preview">
        <span className="cer-icono">💍</span>
        <h3>Ceremonia</h3>
        <p className="cer-lugar">{d.lugar || 'Nombre del lugar'}</p>
        {d.direccion && <p className="cer-direccion">{d.direccion}</p>}
        {d.hora && <p className="cer-hora">{d.hora} hrs</p>}
        {d.maps_url && <a href={d.maps_url} target="_blank" rel="noopener noreferrer" className="cer-maps">Ver en mapa</a>}
      </div>
      <style jsx>{`
        .cer-preview { padding: 1.8rem 1.5rem; text-align: center; background: white; }
        .cer-icono { font-size: 1.6rem; }
        .cer-preview h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; margin: 0.4rem 0; }
        .cer-lugar { font-size: 0.9rem; color: #333; font-weight: 500; }
        .cer-direccion, .cer-hora { font-size: 0.78rem; color: #888; }
        .cer-maps { display: inline-block; margin-top: 0.5rem; font-size: 0.75rem; color: #c9a96e; text-decoration: underline; }
      `}</style>
    </BlockPreviewShell>
  )
}
