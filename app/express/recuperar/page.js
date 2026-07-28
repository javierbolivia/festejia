'use client'
import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import ExpressAuthStyles from '../ExpressAuthStyles'

export default function ExpressRecuperar() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)

  async function handleRecuperar(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const redirectTo =
      typeof window !== 'undefined'
        ? `${window.location.origin}/express/restablecer`
        : undefined

    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })

    if (authError) {
      setError('No pudimos enviar el correo. Verifica que el email sea correcto.')
      setLoading(false)
      return
    }

    setEnviado(true)
    setLoading(false)
  }

  return (
    <div className="express-auth-page">
      <nav className="express-nav">
        <a href="/express" className="express-nav-logo">Feste<span>jia</span> <em>Express</em></a>
      </nav>

      <div className="express-auth-container">
        <div className="express-auth-card">
          <h1>Recuperar contraseña</h1>
          <p className="subtitle">Te enviaremos un enlace a tu correo para restablecerla.</p>

          {error && <div className="express-error">{error}</div>}

          {enviado ? (
            <div className="express-success">
              Revisa tu correo <strong>{email}</strong>. Te enviamos un enlace para
              crear una nueva contraseña.
            </div>
          ) : (
            <form onSubmit={handleRecuperar} className="express-form">
              <div className="express-field">
                <label>Correo electrónico</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" required />
              </div>
              <button type="submit" className="express-btn" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
              </button>
            </form>
          )}

          <p className="express-footer-link">
            <a href="/express/login">Volver a iniciar sesión</a>
          </p>
        </div>
      </div>
      <ExpressAuthStyles />
    </div>
  )
}
