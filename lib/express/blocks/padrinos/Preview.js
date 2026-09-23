'use client'
import BlockPreviewShell from '../BlockPreviewShell'

export default function PadrinosPreview({ datos, activo, onClick }) {
  const d = datos || {}
  const nombres = Array.isArray(datos?.nombres) ? datos.nombres.filter(Boolean) : []
  const mostrarEjemplo = nombres.length === 0
  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="pd-preview">
        <h3>{d.titulo || 'Consejeros Matrimoniales'}</h3>
        {mostrarEjemplo ? (
          <ul><li>Raúl Tancara Huarachi</li><li>Mónica Laura Fuentes</li></ul>
        ) : (
          <ul>{nombres.map((n, i) => <li key={i}>{n}</li>)}</ul>
        )}
      </div>
      <style jsx>{`
        .pd-preview { padding: 1.8rem 1.5rem; background: white; text-align: center; }
        .pd-preview h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; margin-bottom: 0.8rem; }
        .pd-vacio { font-size: 0.8rem; color: #999; }
        .pd-preview ul { list-style: none; padding: 0; font-size: 0.85rem; color: #333; }
        .pd-preview li { padding: 0.2rem 0; }
      `}</style>
    </BlockPreviewShell>
  )
}
