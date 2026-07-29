'use client'
import { useEffect, useState } from 'react'
import BlockPreviewShell from '../BlockPreviewShell'

function calcularRestante(fechaEvento) {
  if (!fechaEvento) return null
  const diff = new Date(fechaEvento).getTime() - Date.now()
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0 }
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24))
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutos = Math.floor((diff / (1000 * 60)) % 60)
  return { dias, horas, minutos }
}

export default function CuentaRegresivaPreview({ datos, activo, onClick, invitacionCompleta }) {
  const d = datos || {}
  const fechaEvento = invitacionCompleta?.contenido?.['informacion-principal']?.fecha_evento
  const [restante, setRestante] = useState(() => calcularRestante(fechaEvento))

  useEffect(() => {
    setRestante(calcularRestante(fechaEvento))
    const id = setInterval(() => setRestante(calcularRestante(fechaEvento)), 60000)
    return () => clearInterval(id)
  }, [fechaEvento])

  return (
    <BlockPreviewShell activo={activo} onClick={onClick}>
      <div className="cr-preview">
        <p className="cr-titulo">{d.titulo || 'Falta muy poco'}</p>
        <div className="cr-numeros">
          <div><span>{restante?.dias ?? '--'}</span><small>Días</small></div>
          <div><span>{restante?.horas ?? '--'}</span><small>Horas</small></div>
          <div><span>{restante?.minutos ?? '--'}</span><small>Min</small></div>
        </div>
      </div>
      <style jsx>{`
        .cr-preview { padding: 1.8rem 1.5rem; text-align: center; background: white; }
        .cr-titulo { font-size: 0.8rem; color: #888; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.06em; }
        .cr-numeros { display: flex; justify-content: center; gap: 1.5rem; }
        .cr-numeros div { display: flex; flex-direction: column; align-items: center; }
        .cr-numeros span { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: #c9a96e; }
        .cr-numeros small { font-size: 0.62rem; color: #999; text-transform: uppercase; }
      `}</style>
    </BlockPreviewShell>
  )
}
