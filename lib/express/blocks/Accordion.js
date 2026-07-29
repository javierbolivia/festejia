// lib/express/blocks/Accordion.js
//
// Acordeón genérico de UN bloque en el panel izquierdo. Muestra el
// nombre/icono del bloque en el header; al expandirse renderiza el
// Editor.js de ese bloque. No sabe qué bloque es — solo recibe schema+Editor.
'use client'

export default function Accordion({ schema, Editor, abierto, onToggle, datos, onChange, onGenerarIA, generandoCampo, userId, invitacionId }) {
  return (
    <div className={`acc-item ${abierto ? 'acc-abierto' : ''}`}>
      <button type="button" className="acc-header" onClick={onToggle}>
        <span className="acc-icono">{schema.icono}</span>
        <span className="acc-nombre">{schema.nombre}</span>
        <span className="acc-chevron">{abierto ? '−' : '+'}</span>
      </button>
      {abierto && (
        <div className="acc-body">
          <Editor
            datos={datos}
            onChange={onChange}
            onGenerarIA={onGenerarIA}
            generandoCampo={generandoCampo}
            userId={userId}
            invitacionId={invitacionId}
          />
        </div>
      )}
      <style jsx>{`
        .acc-item { background: white; border-radius: 10px; border: 1.5px solid #eee; overflow: hidden; }
        .acc-item.acc-abierto { border-color: #c9a96e; }
        .acc-header {
          width: 100%; display: flex; align-items: center; gap: 0.6rem;
          padding: 0.85rem 1rem; background: none; border: none; cursor: pointer;
          font-family: 'Raleway', sans-serif; font-size: 0.85rem; color: #1a1a1a; text-align: left;
        }
        .acc-icono { font-size: 1rem; }
        .acc-nombre { flex: 1; font-weight: 500; }
        .acc-chevron { color: #c9a96e; font-size: 1rem; }
        .acc-body { padding: 0 1.1rem 1.2rem; }
      `}</style>
    </div>
  )
}
