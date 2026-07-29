'use client'
import BlockPreviewShell from '../BlockPreviewShell'

export default function RegalosPreview({ datos, activo, onClick }) {
  const d = datos || {}
  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="rg-preview">
        <span className="rg-icono">🎁</span>
        <h3>Regalos</h3>
        <p>{d.mensaje || 'Tu presencia es nuestro mejor regalo.'}</p>
        {d.qr_imagen && <img src={d.qr_imagen} alt="QR" className="rg-qr" />}
        {d.mesa_link && <a href={d.mesa_link} target="_blank" rel="noopener noreferrer" className="rg-link">Mesa de regalos</a>}
      </div>
      <style jsx>{`
        .rg-preview { padding: 1.8rem 1.5rem; background: #fbf8f2; text-align: center; }
        .rg-icono { font-size: 1.6rem; }
        .rg-preview h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; margin: 0.4rem 0; }
        .rg-preview p { font-size: 0.85rem; color: #555; max-width: 380px; margin: 0 auto 0.6rem; }
        .rg-qr { width: 100px; height: 100px; object-fit: cover; border-radius: 8px; margin: 0.5rem auto; }
        .rg-link { font-size: 0.78rem; color: #c9a96e; text-decoration: underline; }
      `}</style>
    </BlockPreviewShell>
  )
}
