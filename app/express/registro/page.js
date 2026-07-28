'use client'
import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { crearPerfilExpress } from '../../../lib/express/queries'
import ExpressAuthStyles from '../ExpressAuthStyles'

export default function ExpressRegistro() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState(false)

  async function handleRegistro(e) {
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

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre } },
    })

    if (authError) {
      setError(authError.message === 'User already registered'
        ? 'Ya existe una cuenta con este correo.'
        : 'No se pudo crear la cuenta. Intenta de nuevo.')
      setLoading(false)
      return
    }

    const userId = data?.user?.id
    if (userId) {
      await crearPerfilExpress(userId, email, nombre)
    }

    setOk(true)
    setLoading(false)
  }

  if (ok) {
    return (
      <div className="express-auth-page">
        <div className="express-auth-card">
          <h1>¡Cuenta creada!</h1>
          <p className="subtitle">
            Ya puedes iniciar sesión y comenzar a crear tu invitación.
          </p>
          <a href="/express/login" className="express-btn">Ir a iniciar sesión</a>
        </div>
        <ExpressAuthStyles />
      </div>
    )
  }

  return (
    <div className="express-auth-page">
      <nav className="express-nav">
        <a href="/express" className="express-nav-logo">Feste<span>jia</span> <em>Express</em></a>
      </nav>

      <div className="express-auth-container">
        <div className="express-auth-card">
          <h1>Crea tu invitación</h1>
          <p className="subtitle">Regístrate para diseñar tu invitación digital.</p>

          {error && <div className="express-error">{error}</div>}

          <form onSubmit={handleRegistro} className="express-form">
            <div className="express-field">
              <label>Nombre</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" required />
            </div>
            <div className="express-field">
              <label>Correo electrónico</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" required />
            </div>
            <div className="express-field">
              <label>Contraseña</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" required />
            </div>
            <div className="express-field">
              <label>Confirmar contraseña</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repite tu contraseña" required />
            </div>
            <button type="submit" className="express-btn" disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Crear mi cuenta'}
            </button>
          </form>

          <p className="express-footer-link">
            ¿Ya tienes cuenta? <a href="/express/login">Inicia sesión</a>
          </p>
        </div>
      </div>
      <ExpressAuthStyles />
    </div>
  )
}
