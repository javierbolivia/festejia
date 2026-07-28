'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../../../lib/supabase'
import { obtenerPerfilExpress } from '../../../../lib/express/queries'
import ExpressDashboardLayout from '../ExpressDashboardLayout'

export default function ExpressMiCuenta() {
  const [perfil, setPerfil] = useState(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { cargar() }, [])

  async function cargar() {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return
    setEmail(userData.user.email)
    const { data } = await obtenerPerfilExpress(userData.user.id)
    setPerfil(data)
    setLoading(false)
  }

  async function cambiarPassword() {
    const nueva = window.prompt('Escribe tu nueva contraseña (mínimo 6 caracteres):')
    if (!nueva) return
    if (nueva.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    const { error } = await supabase.auth.updateUser({ password: nueva })
    if (error) {
      alert('No se pudo actualizar la contraseña.')
    } else {
      alert('Contraseña actualizada correctamente.')
    }
  }

  if (loading) return <ExpressDashboardLayout activeTab="cuenta"><p className="express-empty">Cargando...</p></ExpressDashboardLayout>

  return (
    <ExpressDashboardLayout activeTab="cuenta">
      <div className="express-page-header">
        <h1>Mi Cuenta</h1>
      </div>

      <div className="express-cuenta-card">
        <div className="express-cuenta-field">
          <label>Nombre</label>
          <p>{perfil?.nombre || '-'}</p>
        </div>
        <div className="express-cuenta-field">
          <label>Correo electrónico</label>
          <p>{email}</p>
        </div>
        <button className="express-btn-secondary" onClick={cambiarPassword}>Cambiar contraseña</button>
      </div>

      <style jsx global>{`
        .express-cuenta-card { background: white; border-radius: 12px; padding: 1.8rem; max-width: 420px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .express-cuenta-field { margin-bottom: 1.2rem; }
        .express-cuenta-field label { display: block; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; color: #999; margin-bottom: 0.3rem; }
        .express-cuenta-field p { font-size: 0.95rem; color: #333; }
      `}</style>
    </ExpressDashboardLayout>
  )
}
