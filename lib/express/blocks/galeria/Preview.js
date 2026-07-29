'use client'
import BlockPreviewShell from '../BlockPreviewShell'

export default function GaleriaPreview({ datos, activo, onClick }) {
  const fotos = Array.isArray(datos?.fotos) ? datos.fotos.filter(Boolean) : []
  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="ga-preview">
        <h3>Galería</h3>
        {fotos.length === 0 && <p className="ga-vacio">Agrega fotografías</p>}
        <div className="ga-grid">
          {fotos.map((url, i) => <img key={i} src={url} alt="" />)}
        </div>
      </div>
      <style jsx>{`
        .ga-preview { padding: 1.8rem 1.5rem; background: white; }
        .ga-preview h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; text-align: center; margin-bottom: 1rem; }
        .ga-vacio { text-align: center; font-size: 0.8rem; color: #999; }
        .ga-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; max-width: 360px; margin: 0 auto; }
        .ga-grid img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; }
      `}</style>
    </BlockPreviewShell>
  )
}
