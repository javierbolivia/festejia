'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { listarInvitacionesDeUsuario, eliminarInvitacion } from '../../../lib/express/queries'
import ExpressDashboardLayout from './ExpressDashboardLayout'

const ESTADO_LABEL = {
  borrador: { texto: 'Borrador', color: '#999' },
  pendiente_pago: { texto: 'Pendiente de pago', color: '#eab308' },
  publicada: { texto: 'Publicada', color: '#22c55e' },
  expirada: { texto: 'Expirada', color: '#ef4444' },
}

export default function ExpressDashboardHome() {
  const [invitaciones, setInvitaciones] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { cargar() }, [])

  async function cargar() {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return
    const { data } = await listarInvitacionesDeUsuario(userData.user.id)
    setInvitaciones(data)
    setLoading(false)
  }

  async function handleEliminar(id, estado) {
    const mensaje = estado === 'publicada'
      ? '¿Eliminar esta invitación? Ya está publicada: al eliminarla, el enlace dejará de funcionar para tus invitados. Esta acción no se puede deshacer.'
      : '¿Eliminar esta invitación? Esta acción no se puede deshacer.'
    if (!confirm(mensaje)) return
    const { data: userData } = await supabase.auth.getUser()
    await eliminarInvitacion(id, userData.user.id)
    setInvitaciones(invitaciones.filter((i) => i.id !== id))
  }

  return (
    <ExpressDashboardLayout activeTab="invitaciones">
      <div className="express-page-header">
        <h1>Mis Invitaciones</h1>
        <a href="/express/dashboard/nueva" className="express-btn-primary">+ Nueva Invitación</a>
      </div>

      {loading ? (
        <p className="express-empty">Cargando...</p>
      ) : invitaciones.length === 0 ? (
        <div className="express-empty-state">
          <p>Aún no tienes ninguna invitación creada.</p>
          <a href="/express/dashboard/nueva" className="express-btn-primary">Crear mi primera invitación</a>
        </div>
      ) : (
        <div className="express-cards-grid">
          {invitaciones.map((inv) => {
            const estado = ESTADO_LABEL[inv.estado] || ESTADO_LABEL.borrador
            const nombre = [inv.nombre1, inv.nombre2].filter(Boolean).join(' & ') || 'Sin nombre aún'
            return (
              <div key={inv.id} className="express-inv-card">
                <div className="express-inv-card-top">
                  <h3>{nombre}</h3>
                  <span className="express-inv-badge" style={{ background: estado.color + '22', color: estado.color }}>
                    {estado.texto}
                  </span>
                </div>
                <p className="express-inv-meta">
                  Plantilla: {inv.plantilla} {inv.codigo_interno ? `· ${inv.codigo_interno}` : ''}
                </p>
                <div className="express-inv-actions">
                  <a href={`/express/dashboard/editor/${inv.id}`} className="express-btn-secondary">
                    {inv.estado === 'borrador' ? 'Continuar editando' : 'Ver / Editar'}
                  </a>
                  {inv.estado === 'publicada' && inv.slug && (
                    <a href={`/e/${inv.slug}`} target="_blank" rel="noopener noreferrer" className="express-btn-secondary">
                      Ver invitación
                    </a>
                  )}
                  <button onClick={() => handleEliminar(inv.id, inv.estado)} className="express-btn-danger">Eliminar</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <style jsx global>{`
        .express-page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
        .express-page-header h1 { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 400; }
        .express-btn-primary { background: #c9a96e; color: white; border: none; padding: 0.7rem 1.4rem; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .express-btn-secondary { background: white; border: 1.5px solid #e0e0e0; color: #333; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; text-decoration: none; }
        .express-btn-danger { background: none; border: 1.5px solid #fca5a5; color: #ef4444; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
        .express-empty, .express-empty-state { text-align: center; padding: 3rem; color: #999; }
        .express-empty-state { background: white; border-radius: 12px; }
        .express-empty-state .express-btn-primary { display: inline-block; margin-top: 1rem; }
        .express-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.2rem; }
        .express-inv-card { background: white; border-radius: 12px; padding: 1.3rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .express-inv-card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.4rem; }
        .express-inv-card-top h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; }
        .express-inv-badge { font-size: 0.65rem; padding: 0.25rem 0.6rem; border-radius: 10px; font-weight: 600; white-space: nowrap; }
        .express-inv-meta { font-size: 0.75rem; color: #999; margin-bottom: 1rem; }
        .express-inv-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
      `}</style>
    </ExpressDashboardLayout>
  )
}
