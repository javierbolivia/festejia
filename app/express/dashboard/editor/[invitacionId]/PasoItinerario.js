'use client'
import { useState } from 'react'

export default function PasoItinerario({ invitacion, onGuardar }) {
  const [items, setItems] = useState(
    Array.isArray(invitacion.itinerario) && invitacion.itinerario.length > 0
      ? invitacion.itinerario
      : [{ hora: '', descripcion: '' }]
  )

  function actualizarItem(index, campo, valor) {
    const nuevos = [...items]
    nuevos[index] = { ...nuevos[index], [campo]: valor }
    setItems(nuevos)
  }

  function agregarItem() {
    setItems([...items, { hora: '', descripcion: '' }])
  }

  function quitarItem(index) {
    setItems(items.filter((_, i) => i !== index))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const itinerarioLimpio = items.filter((i) => i.hora || i.descripcion)
    onGuardar({ itinerario: itinerarioLimpio })
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="express-itinerario-help">
        Agrega los momentos importantes de tu evento con su hora aproximada.
      </p>

      <div className="express-itinerario-list">
        {items.map((item, index) => (
          <div key={index} className="express-itinerario-row">
            <input
              type="time"
              value={item.hora}
              onChange={(e) => actualizarItem(index, 'hora', e.target.value)}
              className="express-itinerario-hora"
            />
            <input
              type="text"
              value={item.descripcion}
              onChange={(e) => actualizarItem(index, 'descripcion', e.target.value)}
              placeholder="Ej: Ceremonia religiosa"
              className="express-itinerario-desc"
            />
            <button type="button" onClick={() => quitarItem(index)} className="express-itinerario-quitar">✕</button>
          </div>
        ))}
      </div>

      <button type="button" onClick={agregarItem} className="express-btn-secondary" style={{ marginTop: '0.8rem' }}>
        + Agregar momento
      </button>

      <div style={{ marginTop: '1.5rem' }}>
        <button type="submit" className="express-btn-primary">Guardar</button>
      </div>

      <style jsx global>{`
        .express-itinerario-help { color: #666; font-size: 0.85rem; margin-bottom: 1rem; }
        .express-itinerario-list { display: flex; flex-direction: column; gap: 0.6rem; }
        .express-itinerario-row { display: flex; gap: 0.6rem; align-items: center; }
        .express-itinerario-hora { width: 110px; padding: 0.6rem; border: 1.5px solid #e0e0e0; border-radius: 8px; font-size: 0.85rem; }
        .express-itinerario-desc { flex: 1; padding: 0.6rem; border: 1.5px solid #e0e0e0; border-radius: 8px; font-size: 0.85rem; }
        .express-itinerario-quitar { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1rem; padding: 0.4rem; }
      `}</style>
    </form>
  )
}
