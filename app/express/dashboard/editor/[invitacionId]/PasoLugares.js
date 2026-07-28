'use client'
import { useState } from 'react'

export default function PasoLugares({ invitacion, onGuardar }) {
  const [form, setForm] = useState({
    ceremonia_lugar: invitacion.ceremonia_lugar || '',
    ceremonia_maps_url: invitacion.ceremonia_maps_url || '',
    ceremonia_hora: invitacion.ceremonia_hora || '',
    recepcion_lugar: invitacion.recepcion_lugar || '',
    recepcion_maps_url: invitacion.recepcion_maps_url || '',
    recepcion_hora: invitacion.recepcion_hora || '',
  })

  function set(campo, valor) {
    setForm({ ...form, [campo]: valor })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onGuardar(form)
  }

  return (
    <form onSubmit={handleSubmit} className="express-form-grid">
      <div className="express-field-full">
        <h3 className="express-subsection-title">Ceremonia religiosa</h3>
      </div>
      <div className="express-field express-field-full">
        <label>Nombre del lugar</label>
        <input value={form.ceremonia_lugar} onChange={(e) => set('ceremonia_lugar', e.target.value)} placeholder="Iglesia San Sebastián" />
      </div>
      <div className="express-field express-field-full">
        <label>Link de Google Maps</label>
        <input value={form.ceremonia_maps_url} onChange={(e) => set('ceremonia_maps_url', e.target.value)} placeholder="https://maps.google.com/..." />
      </div>
      <div className="express-field">
        <label>Hora</label>
        <input type="time" value={form.ceremonia_hora} onChange={(e) => set('ceremonia_hora', e.target.value)} />
      </div>

      <div className="express-field-full">
        <h3 className="express-subsection-title">Recepción social</h3>
      </div>
      <div className="express-field express-field-full">
        <label>Nombre del lugar</label>
        <input value={form.recepcion_lugar} onChange={(e) => set('recepcion_lugar', e.target.value)} placeholder="Salón de Eventos Paradise" />
      </div>
      <div className="express-field express-field-full">
        <label>Link de Google Maps</label>
        <input value={form.recepcion_maps_url} onChange={(e) => set('recepcion_maps_url', e.target.value)} placeholder="https://maps.google.com/..." />
      </div>
      <div className="express-field">
        <label>Hora</label>
        <input type="time" value={form.recepcion_hora} onChange={(e) => set('recepcion_hora', e.target.value)} />
      </div>

      <div className="express-field-full">
        <button type="submit" className="express-btn-primary">Guardar</button>
      </div>

      <style jsx global>{`
        .express-subsection-title { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: #333; margin: 0.5rem 0 0.2rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem; }
      `}</style>
    </form>
  )
}
