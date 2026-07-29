// lib/express/blocks/BlockPreviewShell.js
//
// Envoltorio visual compartido por TODOS los Preview.js de bloques.
// Da el borde de "seleccionado" cuando el bloque está activo en el panel
// y el hover "✎ Editar" que abre el bloque al hacer click. Ningún bloque
// duplica este CSS ni esta lógica de click.
'use client'

export default function BlockPreviewShell({ activo, onClick, className, children }) {
  return (
    <section
      className={`bp-shell ${activo ? 'bp-shell-activo' : ''} ${className || ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.() }}
    >
      {children}
      <style jsx>{`
        .bp-shell {
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 14px;
          transition: border-color 0.2s, box-shadow 0.2s;
          position: relative;
          outline: none;
        }
        .bp-shell:hover { box-shadow: 0 0 0 1px rgba(201,169,110,0.4); }
        .bp-shell-activo { border-color: #c9a96e; }
        .bp-shell::after {
          content: '✎ Editar';
          position: absolute;
          top: 10px;
          right: 10px;
          background: #1a1a1a;
          color: #c9a96e;
          font-size: 0.6rem;
          padding: 4px 10px;
          border-radius: 999px;
          letter-spacing: 0.05em;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .bp-shell:hover::after { opacity: 1; }
      `}</style>
    </section>
  )
}
