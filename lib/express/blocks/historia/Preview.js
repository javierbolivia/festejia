'use client'
import BlockPreviewShell from '../BlockPreviewShell'

export default function HistoriaPreview({ datos, activo, onClick }) {
  const d = datos || {}
  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="hi-preview">
        <h3>{d.titulo || 'Nuestra historia'}</h3>
        <p>{d.texto || 'Cuéntanos cómo se conocieron...'}</p>
      </div>
      <style jsx>{`
        .hi-preview { padding: 1.8rem 1.5rem; background: #fbf8f2; text-align: center; }
        .hi-preview h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; margin-bottom: 0.6rem; }
        .hi-preview p { font-size: 0.85rem; color: #555; max-width: 420px; margin: 0 auto; line-height: 1.6; }
      `}</style>
    </BlockPreviewShell>
  )
}
