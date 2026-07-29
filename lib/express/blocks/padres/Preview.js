'use client'
import BlockPreviewShell from '../BlockPreviewShell'

export default function PadresPreview({ datos, activo, onClick }) {
  const d = datos || {}
  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="pa-preview">
        <h3>Padres</h3>
        <div className="pa-cols">
          <div><p className="pa-etiqueta">De la novia</p><p>{d.padres_novia || '—'}</p></div>
          <div><p className="pa-etiqueta">Del novio</p><p>{d.padres_novio || '—'}</p></div>
        </div>
        {d.mensaje && <p className="pa-mensaje">{d.mensaje}</p>}
      </div>
      <style jsx>{`
        .pa-preview { padding: 1.8rem 1.5rem; background: #fbf8f2; text-align: center; }
        .pa-preview h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; margin-bottom: 1rem; }
        .pa-cols { display: flex; justify-content: center; gap: 2.5rem; margin-bottom: 0.8rem; }
        .pa-etiqueta { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.06em; color: #b8860b; margin-bottom: 0.2rem; }
        .pa-cols p:last-child { font-size: 0.85rem; color: #333; }
        .pa-mensaje { font-size: 0.8rem; color: #777; font-style: italic; }
      `}</style>
    </BlockPreviewShell>
  )
}
