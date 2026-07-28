'use client'
import { useState, useEffect } from 'react'

/* 1. Responsive Design: cycles through phone -> tablet -> desktop */
export function ResponsiveVisual() {
  const [stage, setStage] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setStage(s => (s + 1) % 3), 2200)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="fv-responsive">
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
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % names.length), 2000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="fv-personalization">
      <div className="fv-name-card">
        <span key={idx} className="fv-name-text">{names[idx]}</span>
      </div>
    </div>
  )
}

/* 3. Smart confirmation: check appears/disappears */
export function ConfirmationVisual() {
  const [checked, setChecked] = useState(true)
  useEffect(() => {
    const t = setInterval(() => setChecked(c => !c), 1800)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="fv-confirmation">
      <div className={`fv-check-circle ${checked ? 'fv-checked' : ''}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
    </div>
  )
}

/* 4. Premium animations: invitation card with shine sweep */
export function AnimationsVisual() {
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
  useEffect(() => {
    const drop = () => {
      setDropped(false)
      setTimeout(() => setDropped(true), 100)
    }
    drop()
    const t = setInterval(drop, 3500)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="fv-map">
      <div className="fv-map-grid"></div>
      <svg className={`fv-pin ${dropped ? 'fv-pin-dropped' : ''}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
    </div>
  )
}

/* 6. Countdown: numbers tick down */
export function CountdownVisual() {
  const [num, setNum] = useState(12)
  useEffect(() => {
    const t = setInterval(() => setNum(n => (n <= 1 ? 12 : n - 1)), 1200)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="fv-countdown">
      <span key={num} className="fv-countdown-num">{num}</span>
    </div>
  )
}
