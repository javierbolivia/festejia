'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import ExpressAuthStyles from '../ExpressAuthStyles'

export default function ExpressRestablecer() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState(false)
  const [sesionLista, setSesionLista] = useState(false)

  useEffect(() => {
    // Supabase intercambia el token del link de correo por una sesión
    // temporal automáticamente al cargar esta página (detectSessionInUrl).
    supabase.auth.getSession().then(({ data }) => {
      setSesionLista(!!data.session)
    })
  }, [])

  async function handleRestablecer(e) {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)
    const { error: authError } = await supabase.auth.updateUser({ password })

    if (authError) {
      setError('No se pudo actualizar la contraseña. El enlace puede haber expirado.')
      setLoading(false)
      return
    }

    setOk(true)
    setLoading(false)
  }

  return (
    <div className="express-auth-page">
      <nav className="express-nav">
        <a href="/express" className="express-nav-logo">Feste<span>jia</span> <em>Express</em></a>
      </nav>

      <div className="express-auth-container">
        <div className="express-auth-card">
          <h1>Nueva contraseña</h1>
          <p className="subtitle">Define una nueva contraseña para tu cuenta.</p>

          {error && <div className="express-error">{error}</div>}

          {ok ? (
            <div className="express-success">
              Tu contraseña fue actualizada correctamente.
              <div style={{ marginTop: '1rem' }}>
                <a href="/express/login" className="express-btn">Iniciar sesión</a>
              </div>
            </div>
          ) : !sesionLista ? (
            <div className="express-error">
              Este enlace no es válido o ya expiró. Solicita uno nuevo desde
              la página de recuperación.
            </div>
          ) : (
            <form onSubmit={handleRestablecer} className="express-form">
              <div className="express-field">
                <label>Nueva contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" required />
              </div>
              <div className="express-field">
                <label>Confirmar nueva contraseña</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repite tu contraseña" required />
              </div>
              <button type="submit" className="express-btn" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar nueva contraseña'}
              </button>
            </form>
          )}
        </div>
      </div>
      <ExpressAuthStyles />
    </div>
  )
}
