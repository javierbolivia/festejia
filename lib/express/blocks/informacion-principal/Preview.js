'use client'
import BlockPreviewShell from '../BlockPreviewShell'

export default function InformacionPrincipalPreview({ datos, activo, onClick }) {
  const d = datos || {}
  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="ip-preview">
        <p className="ip-fecha">{d.fecha_evento || 'Fecha del evento'}{d.hora_evento ? ` · ${d.hora_evento}` : ''}</p>
        <h2 className="ip-nombres">{d.nombre1 || 'Nombre 1'} &amp; {d.nombre2 || 'Nombre 2'}</h2>
        {(d.padres_novia || d.padres_novio) && (
          <p className="ip-padres">
            {d.padres_novia && <span>Hijos de {d.padres_novia}</span>}
            {d.padres_novia && d.padres_novio && <span> y de </span>}
            {d.padres_novio && <span>{d.padres_novio}</span>}
          </p>
        )}
      </div>
      <style jsx>{`
        .ip-preview { padding: 2.4rem 1.5rem; text-align: center; background: #fbf8f2; }
        .ip-fecha { font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: #b8860b; margin-bottom: 0.6rem; }
        .ip-nombres { font-family: 'Cormorant Garamond', serif; font-size: 1.9rem; color: #1a1a1a; margin-bottom: 0.5rem; }
        .ip-padres { font-size: 0.8rem; color: #777; }
      `}</style>
    </BlockPreviewShell>
  )
}
