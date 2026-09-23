'use client'
import { useState, useEffect } from 'react'
import { useVisibleInterval } from '../lib/useVisibleInterval'

/* 1. Responsive Design: cycles through phone -> tablet -> desktop */
export function ResponsiveVisual() {
  const [stage, setStage] = useState(0)
  // Corrección de auditoría (hallazgo 4.3): antes el setInterval corría
  // siempre, sin importar si esta sección estaba visible. Ahora se pausa
  // fuera del viewport (ver lib/useVisibleInterval.js).
  const ref = useVisibleInterval(() => setStage(s => (s + 1) % 3), 2200)
  return (
    <div className="fv-responsive" ref={ref}>
      <div className={`fv-device fv-phone-shape ${stage === 0 ? 'fv-active' : ''}`}></div>
      <div className={`fv-device fv-tablet-shape ${stage === 1 ? 'fv-active' : ''}`}></div>
      <div className={`fv-device fv-desktop-shape ${stage === 2 ? 'fv-active' : ''}`}></div>
    </div>
  )
}

/* 2. Guest personalization: cycles through names */
export function PersonalizationVisual() {
  const names = ['María Fernández', 'Carlos Rojas', 'Ana López', 'Diego Morales', 'Valentina Pérez']
  const [idx, setIdx] = useState(0)
  const ref = useVisibleInterval(() => setIdx(i => (i + 1) % names.length), 2000)
  return (
    <div className="fv-personalization" ref={ref}>
      <div className="fv-name-card">
        <span key={idx} className="fv-name-text">{names[idx]}</span>
      </div>
    </div>
  )
}

/* 3. Smart confirmation: check appears/disappears */
export function ConfirmationVisual() {
  const [checked, setChecked] = useState(true)
  const ref = useVisibleInterval(() => setChecked(c => !c), 1800)
  return (
    <div className="fv-confirmation" ref={ref}>
      <div className={`fv-check-circle ${checked ? 'fv-checked' : ''}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
    </div>
  )
}

/* 4. Premium animations: invitation card with shine sweep */
export function AnimationsVisual() {
  // Sin JS: el shine es una animación CSS pura (ver globals.css), por lo que
  // no necesita useVisibleInterval — no había timer de JS que pausar aquí.
  return (
    <div className="fv-animations">
      <div className="fv-invite-card">
        <div className="fv-invite-shine"></div>
        <div className="fv-invite-line"></div>
        <div className="fv-invite-line short"></div>
      </div>
    </div>
  )
}

/* 5. Interactive map: pin drops with bounce */
export function MapVisual() {
  const [dropped, setDropped] = useState(false)
  // Este caso hace dos cosas por tick (resetear y volver a activar la
  // animación de caída), por eso se mantiene la función `drop` propia en
  // vez de una única línea, pero sigue pasando por useVisibleInterval con
  // immediate:true para reproducir el comportamiento anterior (ejecutar de
  // inmediato al montar/volverse visible, no solo esperar el primer tick).
  const drop = () => {
    setDropped(false)
    setTimeout(() => setDropped(true), 100)
  }
  const ref = useVisibleInterval(drop, 3500, { immediate: true })
  return (
    <div className="fv-map" ref={ref}>
      <div className="fv-map-grid"></div>
      <svg className={`fv-pin ${dropped ? 'fv-pin-dropped' : ''}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
    </div>
  )
}

/* 6. Countdown: numbers tick down */
export function CountdownVisual() {
  const [num, setNum] = useState(12)
  const ref = useVisibleInterval(() => setNum(n => (n <= 1 ? 12 : n - 1)), 1200)
  return (
    <div className="fv-countdown" ref={ref}>
      <span key={num} className="fv-countdown-num">{num}</span>
    </div>
  )
}
