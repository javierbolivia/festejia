'use client'
import { useState, useEffect, useRef } from 'react'

const NAMES = [
  'María González', 'Carlos Pérez', 'Andrea López', 'Daniel Rojas',
  'Sofía Martínez', 'Fernando Castro', 'Valentina Herrera', 'Diego Morales',
  'Camila Vargas', 'Sebastián Ruiz', 'Isabella Mendoza', 'Alejandro Torres',
  'Lucía Ramírez', 'Mateo Flores', 'Gabriela Silva', 'Nicolás Ortiz'
]

const ACTIVITIES = [
  { type: 'confirm', template: (name) => `${name} confirmó asistencia` },
  { type: 'confirm', template: (name) => `${name} aceptó la invitación` },
  { type: 'guests', template: (name) => `${name} agregó 2 acompañantes` },
  { type: 'qr', template: () => `Ticket QR enviado` },
  { type: 'confirm', template: (name) => `${name} confirmó +1 invitado` },
  { type: 'table', template: () => `Mesa 12 completada` },
  { type: 'vip', template: () => `Invitado VIP confirmado` },
  { type: 'scan', template: (name) => `${name} escaneó su QR` },
]

export default function LiveDashboard() {
  const [confirmed, setConfirmed] = useState(127)
  const [pending, setPending] = useState(34)
  const [declined, setDeclined] = useState(8)
  const [feed, setFeed] = useState([])
  const [qrFlash, setQrFlash] = useState(false)
  const [notification, setNotification] = useState(null)
  const tickRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      tickRef.current++
      const nameIdx = Math.floor(Math.random() * NAMES.length)
      const name = NAMES[nameIdx]
      const actIdx = Math.floor(Math.random() * ACTIVITIES.length)
      const activity = ACTIVITIES[actIdx]

      // Update counters
      if (activity.type === 'confirm' || activity.type === 'guests' || activity.type === 'vip') {
        setConfirmed(c => c + 1)
        setPending(p => Math.max(0, p - 1))
      } else if (activity.type === 'scan' || activity.type === 'qr') {
        // QR flash
        setQrFlash(true)
        setTimeout(() => setQrFlash(false), 1500)
      } else if (activity.type === 'table') {
        setConfirmed(c => c + 1)
      }

      // Add to feed
      const msg = activity.template(name)
      setFeed(prev => [{ id: Date.now(), msg, type: activity.type }, ...prev].slice(0, 4))

      // Notification every 3 ticks
      if (tickRef.current % 3 === 0) {
        const notifs = ['Nuevo invitado confirmado', 'Mesa actualizada', 'Nuevo pase generado', 'Código QR enviado']
        setNotification(notifs[Math.floor(Math.random() * notifs.length)])
        setTimeout(() => setNotification(null), 2500)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="live-dashboard">
      {/* Window chrome */}
      <div className="dash-window">
        <div className="dash-chrome">
          <div className="dash-dots">
            <span className="dot-red"></span>
            <span className="dot-yellow"></span>
            <span className="dot-green"></span>
          </div>
          <div className="dash-status">
            <span className="status-dot"></span>
            <span className="status-text">Sistema Online</span>
          </div>
        </div>

        {/* Notification */}
        <div className={`dash-notification ${notification ? 'show' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
          <span>{notification}</span>
        </div>

        {/* Stats */}
        <div className="dash-stats-row">
          <div className="dash-card dash-confirmed">
            <span className="dash-card-num">{confirmed}</span>
            <span className="dash-card-label">Confirmados</span>
            <div className="dash-card-bar"><div className="dash-bar-fill confirmed-bar" style={{width: `${Math.min(100, (confirmed / (confirmed + pending + declined)) * 100)}%`}}></div></div>
          </div>
          <div className="dash-card dash-pending-card">
            <span className="dash-card-num">{pending}</span>
            <span className="dash-card-label">Pendientes</span>
            <div className="dash-card-bar"><div className="dash-bar-fill pending-bar" style={{width: `${Math.min(100, (pending / (confirmed + pending + declined)) * 100)}%`}}></div></div>
          </div>
          <div className="dash-card dash-declined-card">
            <span className="dash-card-num">{declined}</span>
            <span className="dash-card-label">No asisten</span>
            <div className="dash-card-bar"><div className="dash-bar-fill declined-bar" style={{width: `${Math.min(100, (declined / (confirmed + pending + declined)) * 100)}%`}}></div></div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="dash-feed">
          <div className="dash-feed-header">
            <span>Actividad reciente</span>
            {qrFlash && <span className="qr-badge">✓ Acceso permitido</span>}
          </div>
          <div className="dash-feed-list">
            {feed.map((item) => (
              <div className="feed-item" key={item.id}>
                <span className={`feed-dot ${item.type === 'confirm' || item.type === 'guests' || item.type === 'vip' ? 'green' : item.type === 'scan' || item.type === 'qr' ? 'blue' : 'gold'}`}></span>
                <span className="feed-msg">{item.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
