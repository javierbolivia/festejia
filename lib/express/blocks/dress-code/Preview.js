'use client'
import BlockPreviewShell from '../BlockPreviewShell'

const EMOJIS = { formal: '🎩', elegante: '👗', casual: '👕', playa: '🏖️' }

export default function DressCodePreview({ datos, activo, onClick }) {
  const d = datos || {}
  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="dc-preview" style={d.color_sugerido ? { borderTop: `4px solid ${d.color_sugerido}` } : {}}>
        <span className="dc-icono">{EMOJIS[d.icono] || '👔'}</span>
        <h3>Dress Code</h3>
        <p>{d.texto || 'Formal - Elegante'}</p>
      </div>
      <style jsx>{`
        .dc-preview { padding: 1.8rem 1.5rem; background: white; text-align: center; border-radius: 12px; }
        .dc-icono { font-size: 1.6rem; }
        .dc-preview h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; margin: 0.4rem 0; }
        .dc-preview p { font-size: 0.85rem; color: #555; }
      `}</style>
    </BlockPreviewShell>
  )
}
