'use client'
import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import ExpressAuthStyles from '../ExpressAuthStyles'

export default function ExpressLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('Correo o contraseña incorrectos.')
      setLoading(false)
      return
    }

    window.location.href = '/express/dashboard'
  }

  return (
    <div className="express-auth-page">
      <nav className="express-nav">
        <a href="/express" className="express-nav-logo">Feste<span>jia</span> <em>Express</em></a>
      </nav>

      <div className="express-auth-container">
        <div className="express-auth-card">
          <h1>Ingresa a tu cuenta</h1>
          <p className="subtitle">Continúa creando tu invitación digital.</p>

          {error && <div className="express-error">{error}</div>}

          <form onSubmit={handleLogin} className="express-form">
            <div className="express-field">
              <label>Correo electrónico</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" required />
            </div>
            <div className="express-field">
              <label>Contraseña</label>
              <div className="express-password-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button type="button" className="express-eye" onClick={() => setShowPass(!showPass)}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <button type="submit" className="express-btn" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <p className="express-footer-link">
            <a href="/express/recuperar">¿Olvidaste tu contraseña?</a>
          </p>
          <p className="express-footer-link">
            ¿No tienes cuenta? <a href="/express/registro">Regístrate aquí</a>
          </p>
        </div>
      </div>
      <ExpressAuthStyles />
    </div>
  )
}
