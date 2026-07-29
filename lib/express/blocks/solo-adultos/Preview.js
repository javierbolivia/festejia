'use client'
import BlockPreviewShell from '../BlockPreviewShell'

export default function SoloAdultosPreview({ datos, activo, onClick }) {
  const d = datos || {}
  if (!d.activo) {
    return (
      <BlockPreviewShell activo={activo} onClick={onClick}>
        <div className="sa-preview sa-inactivo">
          <p>Evento apto para todas las edades</p>
        </div>
        <style jsx>{`.sa-preview { padding: 1.2rem 1.5rem; text-align: center; background: white; } .sa-preview p { font-size: 0.8rem; color: #999; }`}</style>
      </BlockPreviewShell>
    )
  }
  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="sa-preview">
        <span className="sa-icono">🔞</span>
        <p>{d.mensaje || 'Este evento es solo para adultos.'}</p>
      </div>
      <style jsx>{`
        .sa-preview { padding: 1.5rem; text-align: center; background: #fbf8f2; }
        .sa-icono { font-size: 1.4rem; }
        .sa-preview p { font-size: 0.85rem; color: #555; margin-top: 0.4rem; }
      `}</style>
    </BlockPreviewShell>
  )
}
