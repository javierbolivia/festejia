// lib/express/blocks/BlockEditorForm.js
//
// Formulario genérico para UN bloque. Lee schema.campos y por cada uno
// delega en FieldRenderer. Ningún bloque escribe su propio <form>: esto
// es lo que permite agregar un bloque nuevo (o una plantilla nueva que
// reutiliza los mismos bloques) sin tocar el editor.
'use client'
import FieldRenderer from './FieldRenderer'

export default function BlockEditorForm({ schema, datos, onChange, onGenerarIA, generandoCampo, userId, invitacionId }) {
  const valores = datos || {}

  function set(key, value) {
    onChange({ ...valores, [key]: value })
  }

  const camposVisibles = schema.campos.filter((c) => {
    if (!c.mostrarSi) return true
    return valores[c.mostrarSi.campo] === c.mostrarSi.valor
  })

  return (
    <div className="bef-form">
      {camposVisibles.map((campo) => (
        <div key={campo.key} className={`bef-field ${campo.tipo === 'checkbox' ? 'bef-field-inline' : ''}`}>
          {campo.tipo !== 'checkbox' && (
            <label className="bef-label">
              {campo.label}
              {campo.requerido && <span className="bef-req">*</span>}
            </label>
          )}
          <FieldRenderer
            campo={campo}
            valor={valores[campo.key]}
            onChange={(v) => set(campo.key, v)}
            conIA={schema.iaCampos?.includes(campo.key)}
            generando={generandoCampo === campo.key}
            onGenerarIA={() => onGenerarIA(campo.key)}
            userId={userId}
            invitacionId={invitacionId}
            bloqueTipo={schema.tipo}
          />
        </div>
      ))}

      <style jsx>{`
        .bef-form { display: flex; flex-direction: column; gap: 1.1rem; }
        .bef-label { display: block; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: #888; margin-bottom: 0.4rem; }
        .bef-req { color: #c9a96e; margin-left: 3px; }
        .bef-field-inline { flex-direction: row; }
        .bef-field :global(input[type="text"]),
        .bef-field :global(input[type="date"]),
        .bef-field :global(input[type="time"]),
        .bef-field :global(input[type="url"]),
        .bef-field :global(textarea),
        .bef-field :global(select) {
          width: 100%;
          padding: 0.65rem 0.8rem;
          border: 1.5px solid #e5e5e5;
          border-radius: 8px;
          font-size: 0.85rem;
          font-family: 'Raleway', sans-serif;
          background: white;
        }
        .bef-field :global(textarea) { resize: vertical; min-height: 70px; }
        .bef-field :global(.fr-row) { display: flex; flex-direction: column; gap: 0.4rem; }
        .bef-field :global(.fr-btn-ia) {
          align-self: flex-start; background: none; border: 1px dashed #c9a96e; color: #c9a96e;
          padding: 0.35rem 0.7rem; border-radius: 6px; font-size: 0.72rem; cursor: pointer;
        }
        .bef-field :global(.fr-btn-ia:disabled) { opacity: 0.6; cursor: not-allowed; }
        .bef-field :global(.fr-checkbox) { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #333; cursor: pointer; }
        .bef-field :global(.fr-swatches) { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .bef-field :global(.fr-swatch) { width: 30px; height: 30px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; }
        .bef-field :global(.fr-swatch.selected) { border-color: #1a1a1a; transform: scale(1.12); }
        .bef-field :global(.fr-icon-options) { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .bef-field :global(.fr-icon-option) {
          display: flex; flex-direction: column; align-items: center; gap: 0.2rem;
          border: 1.5px solid #e5e5e5; background: white; border-radius: 10px; padding: 0.5rem 0.7rem;
          cursor: pointer; font-size: 0.65rem; color: #555;
        }
        .bef-field :global(.fr-icon-option.selected) { border-color: #c9a96e; background: #fbf6ec; }
        .bef-field :global(.fr-icon-emoji) { font-size: 1.3rem; }
        .bef-field :global(.fr-media) { display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
        .bef-field :global(.fr-media-preview) { width: 140px; height: 140px; object-fit: cover; border-radius: 10px; border: 1px solid #e5e5e5; }
        .bef-field :global(.fr-media-preview-sm) { width: 100px; height: 100px; }
        .bef-field :global(.fr-media-status) { font-size: 0.72rem; color: #666; }
        .bef-field :global(.fr-media-error) { font-size: 0.72rem; color: #c00; }
        .bef-field :global(.fr-galeria-grid) { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.8rem; }
        .bef-field :global(.fr-lista) { display: flex; flex-direction: column; gap: 0.5rem; }
        .bef-field :global(.fr-lista-row) { display: flex; gap: 0.5rem; align-items: center; }
        .bef-field :global(.fr-lista-items-row) { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
        .bef-field :global(.fr-lista-items-campo) { flex: 1; min-width: 100px; }
        .bef-field :global(.fr-add) { align-self: flex-start; background: none; border: 1.5px dashed #c9a96e; color: #c9a96e; padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.75rem; cursor: pointer; }
        .bef-field :global(.fr-remove) { background: none; border: none; color: #c00; cursor: pointer; font-size: 0.85rem; padding: 0.3rem; }
      `}</style>
    </div>
  )
}
