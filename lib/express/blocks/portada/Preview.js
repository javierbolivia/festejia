'use client'
import BlockPreviewShell from '../BlockPreviewShell'

export default function PortadaPreview({ datos, activo, onClick, estilo }) {
  const d = datos || {}
  return (
    <BlockPreviewShell activo={activo} onClick={onClick} className={`portada-preview-${estilo || 'clasico-dorado'}`}>
      <div className="portada-preview" style={d.imagen ? { backgroundImage: `url(${d.imagen})` } : {}}>
        <div className="portada-overlay">
          <h1 className="portada-titulo">{d.titulo || 'Nos casamos'}</h1>
          {d.subtitulo && <p className="portada-subtitulo">{d.subtitulo}</p>}
        </div>
      </div>
      <style jsx>{`
        .portada-preview {
          min-height: 320px; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #2d2d2d, #1a1a1a); background-size: cover; background-position: center;
          border-radius: 12px; position: relative;
        }
        .portada-overlay { text-align: center; color: white; padding: 1rem; text-shadow: 0 2px 12px rgba(0,0,0,0.5); }
        .portada-titulo { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; margin-bottom: 0.5rem; }
        .portada-subtitulo { font-size: 0.9rem; opacity: 0.85; }
      `}</style>
    </BlockPreviewShell>
  )
}
