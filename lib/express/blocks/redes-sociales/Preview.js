'use client'
import BlockPreviewShell from '../BlockPreviewShell'

export default function RedesSocialesPreview({ datos, activo, onClick }) {
  const d = datos || {}
  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="rs-preview">
        <span className="rs-icono">📱</span>
        <p className="rs-hashtag">{d.hashtag || '#TuHashtag'}</p>
        {d.instagram && <a href={d.instagram} target="_blank" rel="noopener noreferrer">Ver Instagram</a>}
      </div>
      <style jsx>{`
        .rs-preview { padding: 1.4rem 1.5rem; background: white; text-align: center; }
        .rs-icono { font-size: 1.3rem; }
        .rs-hashtag { font-size: 0.9rem; color: #c9a96e; font-weight: 600; margin-top: 0.3rem; }
        .rs-preview a { font-size: 0.75rem; color: #666; text-decoration: underline; }
      `}</style>
    </BlockPreviewShell>
  )
}
