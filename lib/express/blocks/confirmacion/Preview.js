'use client'
import BlockPreviewShell from '../BlockPreviewShell'

export default function ConfirmacionPreview({ datos, activo, onClick }) {
  const d = datos || {}
  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="co-preview">
        <h3>{d.titulo || 'Confirma tu asistencia'}</h3>
        {d.fecha_limite && <p className="co-fecha">Antes del {d.fecha_limite}</p>}
        <button type="button" className="co-btn" disabled>Confirmar asistencia</button>
      </div>
      <style jsx>{`
        .co-preview { padding: 2rem 1.5rem; text-align: center; background: #1a1a1a; color: white; border-radius: 12px; }
        .co-preview h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; margin-bottom: 0.5rem; }
        .co-fecha { font-size: 0.75rem; color: rgba(255,255,255,0.6); margin-bottom: 1rem; }
        .co-btn { background: #c9a96e; color: #1a1a1a; border: none; padding: 0.6rem 1.4rem; border-radius: 999px; font-size: 0.78rem; cursor: default; }
      `}</style>
    </BlockPreviewShell>
  )
}
