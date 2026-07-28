// Layout compartido del panel Express: sidebar + verificación de sesión.
// Reutilizado por /express/dashboard, /nueva, /editor/[id], /cuenta, /ayuda.
'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

export default function ExpressDashboardLayout({ children, activeTab }) {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = '/express/login'
        return
      }
      setUser(data.user)
      setChecking(false)
    })
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/express/login'
  }

  if (checking) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', color: '#666' }}>
        Cargando...
      </div>
    )
  }

  return (
    <div className="express-dash-page">
      <aside className="express-dash-sidebar">
        <div className="express-dash-logo">Feste<span>jia</span></div>
        <p className="express-dash-badge">EXPRESS</p>
        <nav className="express-dash-nav">
          <a href="/express/dashboard" className={activeTab === 'invitaciones' ? 'active' : ''}>📋 Mis Invitaciones</a>
          <a href="/express/dashboard/nueva" className={activeTab === 'nueva' ? 'active' : ''}>✨ Crear Invitación</a>
          <a href="/express/dashboard/cuenta" className={activeTab === 'cuenta' ? 'active' : ''}>👤 Mi Cuenta</a>
          <a href="/express/dashboard/ayuda" className={activeTab === 'ayuda' ? 'active' : ''}>❓ Ayuda</a>
        </nav>
        <button className="express-dash-logout" onClick={logout}>Cerrar sesión</button>
      </aside>

      <main className="express-dash-main">
        {children}
      </main>

      <style jsx global>{`
        .express-dash-page { display: flex; min-height: 100vh; background: #f5f5f5; font-family: 'Raleway', sans-serif; }
        .express-dash-sidebar { width: 230px; background: #1a1a1a; color: white; padding: 2rem 1.5rem; display: flex; flex-direction: column; position: fixed; height: 100vh; }
        .express-dash-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; }
        .express-dash-logo span { color: #c9a96e; }
        .express-dash-badge { font-size: 0.6rem; letter-spacing: 2px; color: #c9a96e; margin: 0.2rem 0 2rem; font-weight: 600; }
        .express-dash-nav { display: flex; flex-direction: column; gap: 0.3rem; flex: 1; }
        .express-dash-nav a { color: rgba(255,255,255,0.65); text-decoration: none; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.85rem; transition: all 0.2s; }
        .express-dash-nav a:hover, .express-dash-nav a.active { background: rgba(201,169,110,0.15); color: white; }
        .express-dash-logout { background: none; border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.65); padding: 0.6rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; margin-top: auto; }
        .express-dash-main { flex: 1; margin-left: 230px; padding: 2rem; }
        @media (max-width: 768px) {
          .express-dash-page { flex-direction: column; }
          .express-dash-sidebar { width: 100%; height: auto; position: relative; flex-direction: row; align-items: center; padding: 1rem; flex-wrap: wrap; }
          .express-dash-nav { flex-direction: row; flex-wrap: wrap; gap: 0.4rem; }
          .express-dash-badge { margin: 0 1rem; }
          .express-dash-logout { margin: 0 0 0 auto; }
          .express-dash-main { margin-left: 0; padding: 1.2rem; }
        }
      `}</style>
    </div>
  )
}
