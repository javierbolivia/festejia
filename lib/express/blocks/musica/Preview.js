'use client'
import BlockPreviewShell from '../BlockPreviewShell'

export default function MusicaPreview({ datos, activo, onClick }) {
  const d = datos || {}
  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="mu-preview">
        <span className="mu-icono">🎵</span>
        <p>{d.titulo_cancion || (d.archivo ? 'Canción cargada' : 'Sin música seleccionada')}</p>
      </div>
      <style jsx>{`
        .mu-preview { padding: 1.4rem 1.5rem; background: #fbf8f2; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.6rem; }
        .mu-icono { font-size: 1.2rem; }
        .mu-preview p { font-size: 0.85rem; color: #555; }
      `}</style>
    </BlockPreviewShell>
  )
}
