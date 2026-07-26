'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Si tiene @, es el admin o un email real. Si no, agregar @festejia.local
    const email = usuario.includes('@') ? usuario : usuario + '@festejia.local'

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (authError) {
      setError('Usuario o contraseña incorrectos')
      setLoading(false)
      return
    }

    // Detectar rol y plan para redirigir
    const { data: prof } = await supabase.from('profiles').select('role,plan').eq('id', data.user.id).single()
    if (prof?.role === 'admin') {
      window.location.href = '/admin'
    } else if (prof?.plan === 'exclusive') {
      window.location.href = '/panel'
    } else {
      window.location.href = '/gestor'
    }
  }

  return (
    <div className="login-page">
      <nav className="navbar">
        <a href="/" className="nav-logo">Feste<span>jia</span></a>
      </nav>

      <div className="login-container">
        <div className="login-card">
          <h1>Panel del Anfitrión</h1>
          <p className="login-subtitle">Ingresa con tus credenciales</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Usuario</label>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="tu_usuario"
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <div style={{position: 'relative'}}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem'}}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <p className="login-footer">
            ¿No tienes cuenta? <a href="https://wa.me/59100000000?text=Hola Festejia! Necesito acceso al panel." target="_blank" rel="noopener noreferrer">Contáctanos</a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
        }
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 70px);
          padding: 2rem;
        }
        .login-card {
          background: white;
          border-radius: 16px;
          padding: 3rem;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .login-card h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 400;
          text-align: center;
          margin-bottom: 0.3rem;
          color: #1a1a1a;
        }
        .login-subtitle {
          text-align: center;
          color: #6b6b6b;
          font-size: 0.85rem;
          margin-bottom: 2rem;
        }
        .login-error {
          background: #fee;
          color: #c00;
          padding: 0.8rem;
          border-radius: 8px;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          text-align: center;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .form-group label {
          display: block;
          font-size: 0.8rem;
          font-weight: 500;
          color: #333;
          margin-bottom: 0.4rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .form-group input {
          width: 100%;
          padding: 0.9rem 1rem;
          border: 1.5px solid #e0e0e0;
          border-radius: 8px;
          font-size: 0.9rem;
          font-family: 'Raleway', sans-serif;
          transition: border-color 0.3s;
        }
        .form-group input:focus {
          outline: none;
          border-color: #c9a96e;
        }
        .login-btn {
          background: #1a1a1a;
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s;
          font-family: 'Raleway', sans-serif;
          letter-spacing: 0.5px;
          margin-top: 0.5rem;
        }
        .login-btn:hover {
          background: #c9a96e;
        }
        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .login-footer {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.82rem;
          color: #6b6b6b;
        }
        .login-footer a {
          color: #c9a96e;
          text-decoration: none;
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}
