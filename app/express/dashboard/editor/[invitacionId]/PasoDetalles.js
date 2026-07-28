'use client'
import { useState } from 'react'

const COLORES_PALETA = ['#2d4a3e', '#b8860b', '#8b6f47', '#c9a96e', '#4a6e5c', '#f5e6d0', '#354A68', '#876E44']

export default function PasoDetalles({ invitacion, onGuardar }) {
  const [form, setForm] = useState({
    dresscode: invitacion.dresscode || '',
    colores_sugeridos: Array.isArray(invitacion.colores_sugeridos) ? invitacion.colores_sugeridos : [],
    solo_adultos: !!invitacion.solo_adultos,
    mensaje_bienvenida: invitacion.mensaje_bienvenida || '',
    mensaje_regalos: invitacion.mensaje_regalos || '',
    mensaje_dresscode: invitacion.mensaje_dresscode || '',
    mensaje_solo_adultos: invitacion.mensaje_solo_adultos || '',
    regalo_mesa_link: invitacion.regalo_mesa_link || '',
  })
  const [generandoIA, setGenerandoIA] = useState(false)

  function set(campo, valor) {
    setForm({ ...form, [campo]: valor })
  }

  function toggleColor(color) {
    const actuales = form.colores_sugeridos
    const nuevos = actuales.includes(color)
      ? actuales.filter((c) => c !== color)
      : [...actuales, color]
    set('colores_sugeridos', nuevos)
  }

  async function generarConIA(tipo, campoDestino) {
    setGenerandoIA(true)
    try {
      const res = await fetch('/api/express/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo,
          invitacionId: invitacion.id,
          nombre1: invitacion.nombre1,
          nombre2: invitacion.nombre2,
        }),
      })
      const json = await res.json()
      if (json?.texto) {
        set(campoDestino, json.texto)
      }
    } catch (e) {
      // Si la IA falla, el cliente simplemente escribe el texto a mano.
    }
    setGenerandoIA(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onGuardar(form)
  }

  return (
    <form onSubmit={handleSubmit} className="express-form-grid">
      <div className="express-field express-field-full">
        <label>Código de vestimenta</label>
        <input value={form.dresscode} onChange={(e) => set('dresscode', e.target.value)} placeholder="Formal - Elegante" />
      </div>

      <div className="express-field-full">
        <label className="express-mini-label">Colores sugeridos</label>
        <div className="express-color-swatches">
          {COLORES_PALETA.map((color) => (
            <button
              type="button"
              key={color}
              className={`express-swatch ${form.colores_sugeridos.includes(color) ? 'selected' : ''}`}
              style={{ background: color }}
              onClick={() => toggleColor(color)}
            />
          ))}
        </div>
      </div>

      <div className="express-field-full">
        <label className="express-checkbox-label">
          <input
            type="checkbox"
            checked={form.solo_adultos}
            onChange={(e) => set('solo_adultos', e.target.checked)}
          />
          Evento solo para adultos
        </label>
      </div>

      <div className="express-field express-field-full">
        <label>Mensaje de bienvenida</label>
        <textarea
          rows="3"
          value={form.mensaje_bienvenida}
          onChange={(e) => set('mensaje_bienvenida', e.target.value)}
          placeholder="Nuestro gran día se aproxima..."
        />
        <button type="button" className="express-btn-ia" disabled={generandoIA} onClick={() => generarConIA('bienvenida', 'mensaje_bienvenida')}>
          {generandoIA ? 'Generando...' : '✨ Generar con IA'}
        </button>
      </div>

      <div className="express-field express-field-full">
        <label>Mensaje de dress code</label>
        <textarea
          rows="2"
          value={form.mensaje_dresscode}
          onChange={(e) => set('mensaje_dresscode', e.target.value)}
        />
        <button type="button" className="express-btn-ia" disabled={generandoIA} onClick={() => generarConIA('dresscode', 'mensaje_dresscode')}>
          {generandoIA ? 'Generando...' : '✨ Generar con IA'}
        </button>
      </div>

      {form.solo_adultos && (
        <div className="express-field express-field-full">
          <label>Mensaje solo adultos</label>
          <textarea
            rows="2"
            value={form.mensaje_solo_adultos}
            onChange={(e) => set('mensaje_solo_adultos', e.target.value)}
          />
          <button type="button" className="express-btn-ia" disabled={generandoIA} onClick={() => generarConIA('solo_adultos', 'mensaje_solo_adultos')}>
            {generandoIA ? 'Generando...' : '✨ Generar con IA'}
          </button>
        </div>
      )}

      <div className="express-field express-field-full">
        <label>Mensaje de regalos</label>
        <textarea
          rows="2"
          value={form.mensaje_regalos}
          onChange={(e) => set('mensaje_regalos', e.target.value)}
        />
        <button type="button" className="express-btn-ia" disabled={generandoIA} onClick={() => generarConIA('regalos', 'mensaje_regalos')}>
          {generandoIA ? 'Generando...' : '✨ Generar con IA'}
        </button>
      </div>

      <div className="express-field express-field-full">
        <label>Link de mesa de regalos (opcional)</label>
        <input value={form.regalo_mesa_link} onChange={(e) => set('regalo_mesa_link', e.target.value)} placeholder="https://..." />
      </div>

      <div className="express-field-full">
        <button type="submit" className="express-btn-primary">Guardar</button>
      </div>

      <style jsx global>{`
        .express-mini-label { display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: #666; margin-bottom: 0.5rem; }
        .express-color-swatches { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        .express-swatch { width: 34px; height: 34px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; }
        .express-swatch.selected { border-color: #1a1a1a; transform: scale(1.1); }
        .express-checkbox-label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #333; cursor: pointer; }
        .express-btn-ia { background: none; border: 1px dashed #c9a96e; color: #c9a96e; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.75rem; cursor: pointer; margin-top: 0.5rem; }
        .express-btn-ia:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>
    </form>
  )
}
