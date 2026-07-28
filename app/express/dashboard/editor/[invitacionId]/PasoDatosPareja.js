'use client'
import { useState } from 'react'

export default function PasoDatosPareja({ invitacion, onGuardar }) {
  const [form, setForm] = useState({
    nombre1: invitacion.nombre1 || '',
    nombre2: invitacion.nombre2 || '',
    fecha_evento: invitacion.fecha_evento || '',
    hora_evento: invitacion.hora_evento || '',
    padres_novia: invitacion.padres_novia || '',
    padres_novio: invitacion.padres_novio || '',
    padrinos: invitacion.padrinos || '',
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
      <div className="express-field">
        <label>Nombre de uno de los novios</label>
        <input value={form.nombre1} onChange={(e) => set('nombre1', e.target.value)} placeholder="Laura" />
      </div>
      <div className="express-field">
        <label>Nombre del otro novio</label>
        <input value={form.nombre2} onChange={(e) => set('nombre2', e.target.value)} placeholder="Carlos" />
      </div>
      <div className="express-field">
        <label>Fecha del evento</label>
        <input type="date" value={form.fecha_evento} onChange={(e) => set('fecha_evento', e.target.value)} />
      </div>
      <div className="express-field">
        <label>Hora del evento</label>
        <input type="time" value={form.hora_evento} onChange={(e) => set('hora_evento', e.target.value)} />
      </div>
      <div className="express-field express-field-full">
        <label>Padres de la novia</label>
        <input value={form.padres_novia} onChange={(e) => set('padres_novia', e.target.value)} placeholder="Nombre y Nombre" />
      </div>
      <div className="express-field express-field-full">
        <label>Padres del novio</label>
        <input value={form.padres_novio} onChange={(e) => set('padres_novio', e.target.value)} placeholder="Nombre y Nombre" />
      </div>
      <div className="express-field express-field-full">
        <label>Padrinos / Madrinas</label>
        <input value={form.padrinos} onChange={(e) => set('padrinos', e.target.value)} placeholder="Nombre y Nombre" />
      </div>
      <div className="express-field-full">
        <button type="submit" className="express-btn-primary">Guardar</button>
      </div>

      <style jsx global>{`
        .express-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
        .express-field-full { grid-column: 1 / -1; }
        .express-form-grid .express-field label { display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: #666; margin-bottom: 0.4rem; }
        .express-form-grid .express-field input,
        .express-form-grid .express-field textarea,
        .express-form-grid .express-field select { width: 100%; padding: 0.7rem; border: 1.5px solid #e0e0e0; border-radius: 8px; font-size: 0.85rem; font-family: 'Raleway', sans-serif; }
        @media (max-width: 600px) { .express-form-grid { grid-template-columns: 1fr; } }
      `}</style>
    </form>
  )
}
