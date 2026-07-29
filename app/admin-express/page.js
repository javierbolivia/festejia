'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import {
  listarPagosPendientes,
  listarTodasLasInvitaciones,
  publicarInvitacionAdmin,
  despublicarInvitacionAdmin,
  eliminarInvitacionAdmin,
} from '../../lib/express/queries'
import { confirmarPago, rechazarPago } from '../../lib/express/payments'

const ESTADO_LABEL = {
  borrador: { texto: 'Borrador', color: '#999' },
  pendiente_pago: { texto: 'Pendiente de pago', color: '#eab308' },
  publicada: { texto: 'Publicada', color: '#22c55e' },
  expirada: { texto: 'Expirada', color: '#ef4444' },
}

export default function AdminExpressPanel() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('pagos')
  const [pagosPendientes, setPagosPendientes] = useState([])
  const [invitaciones, setInvitaciones] = useState([])
  const [procesando, setProcesando] = useState(null)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => { checkAdmin() }, [])

  async function checkAdmin() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }

    const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (!prof || prof.role !== 'admin') { window.location.href = '/panel'; return }

    setUser(user)
    await cargarDatos()
    setLoading(false)
  }

  async function cargarDatos() {
    const [{ data: pagos }, { data: invs }] = await Promise.all([
      listarPagosPendientes(),
      listarTodasLasInvitaciones(),
    ])
    setPagosPendientes(pagos || [])
    setInvitaciones(invs || [])
  }

  async function handleConfirmarPago(pagoId) {
    setProcesando(pagoId)
    const { error } = await confirmarPago(pagoId, user.id)
    if (error) {
      setMensaje('Error al confirmar el pago: ' + error.message)
    } else {
      setMensaje('Pago confirmado.')
      await cargarDatos()
    }
    setProcesando(null)
    setTimeout(() => setMensaje(''), 3000)
  }

  async function handleRechazarPago(pagoId) {
    if (!confirm('¿Rechazar este pago? El cliente deberá volver a solicitarlo.')) return
    setProcesando(pagoId)
    await rechazarPago(pagoId, user.id)
    await cargarDatos()
    setProcesando(null)
  }

  async function handlePublicarManual(invitacionId) {
    if (!confirm('¿Publicar esta invitación sin registrar un pago (ej. cortesía)?')) return
    setProcesando(invitacionId)
    const { error } = await publicarInvitacionAdmin(invitacionId)
    if (error) setMensaje('Error al publicar: ' + error.message)
    else { setMensaje('Invitación publicada.'); await cargarDatos() }
    setProcesando(null)
    setTimeout(() => setMensaje(''), 3000)
  }

  async function handleDespublicar(invitacionId) {
    if (!confirm('¿Regresar esta invitación a borrador? Dejará de ser visible públicamente.')) return
    setProcesando(invitacionId)
    await despublicarInvitacionAdmin(invitacionId)
    await cargarDatos()
    setProcesando(null)
  }

  async function handleEliminar(invitacionId, nombre) {
    if (!confirm(`¿Eliminar permanentemente la invitación de "${nombre}"? Esta acción no se puede deshacer y borrará también su historial de pagos.`)) return
    setProcesando(invitacionId)
    const { error } = await eliminarInvitacionAdmin(invitacionId)
    if (error) setMensaje('Error al eliminar: ' + error.message)
    else { setMensaje('Invitación eliminada.'); await cargarDatos() }
    setProcesando(null)
    setTimeout(() => setMensaje(''), 3000)
  }

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (loading) return <div className="ax-loading">Cargando panel Express...</div>

  return (
    <div className="ax-page">
      <aside className="ax-sidebar">
        <div className="ax-logo">Feste<span>jia</span></div>
        <p className="ax-badge">ADMIN EXPRESS</p>
        <nav className="ax-nav">
          <button className={tab === 'pagos' ? 'active' : ''} onClick={() => setTab('pagos')}>
            💳 Pagos pendientes {pagosPendientes.length > 0 && <span className="ax-count">{pagosPendientes.length}</span>}
          </button>
          <button className={tab === 'invitaciones' ? 'active' : ''} onClick={() => setTab('invitaciones')}>
            📋 Todas las invitaciones
          </button>
        </nav>
        <a href="/admin" className="ax-link-premium">← Panel Premium</a>
        <button className="ax-logout" onClick={logout}>Cerrar sesión</button>
      </aside>

      <main className="ax-main">
        <header className="ax-header">
          <h1>{tab === 'pagos' ? 'Pagos pendientes de confirmación' : 'Todas las invitaciones Express'}</h1>
          <span className="ax-email">{user?.email}</span>
        </header>

        {mensaje && <div className="ax-mensaje">{mensaje}</div>}

        {tab === 'pagos' && (
          <div className="ax-content">
            {pagosPendientes.length === 0 ? (
              <p className="ax-empty">No hay pagos pendientes de confirmación.</p>
            ) : (
              <div className="ax-cards-grid">
                {pagosPendientes.map((pago) => {
                  const inv = pago.express_invitaciones
                  return (
                    <div key={pago.id} className="ax-card">
                      <div className="ax-card-top">
                        <h3>{[inv?.nombre1, inv?.nombre2].filter(Boolean).join(' & ') || 'Sin nombre'}</h3>
                        <span className="ax-tipo-badge">{pago.tipo === 'publicacion' ? 'Publicación' : 'Correcciones extra'}</span>
                      </div>
                      <p className="ax-meta">Código: {inv?.codigo_interno || '-'} · Plantilla: {inv?.plantilla || '-'}</p>
                      <p className="ax-monto">Bs. {pago.monto}</p>
                      <p className="ax-fecha">Solicitado: {new Date(pago.created_at).toLocaleString('es')}</p>
                      <div className="ax-actions">
                        <button className="ax-btn-confirm" disabled={procesando === pago.id} onClick={() => handleConfirmarPago(pago.id)}>
                          {procesando === pago.id ? 'Procesando...' : '✓ Confirmar pago'}
                        </button>
                        <button className="ax-btn-reject" disabled={procesando === pago.id} onClick={() => handleRechazarPago(pago.id)}>
                          ✕ Rechazar
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'invitaciones' && (
          <div className="ax-content">
            <div className="ax-table-wrap">
              <table className="ax-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Código</th>
                    <th>Plantilla</th>
                    <th>Estado</th>
                    <th>Correcciones</th>
                    <th>Slug</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {invitaciones.map((inv) => {
                    const estado = ESTADO_LABEL[inv.estado] || ESTADO_LABEL.borrador
                    return (
                      <tr key={inv.id}>
                        <td className="ax-nombre">{[inv.nombre1, inv.nombre2].filter(Boolean).join(' & ') || 'Sin nombre'}</td>
                        <td>{inv.codigo_interno || '-'}</td>
                        <td>{inv.plantilla}</td>
                        <td><span className="ax-status-dot" style={{ background: estado.color + '22', color: estado.color }}>{estado.texto}</span></td>
                        <td>{inv.correcciones_disponibles ?? '-'}</td>
                        <td>
                          {inv.slug ? <a href={`/e/${inv.slug}`} target="_blank" rel="noopener noreferrer">{inv.slug}</a> : '-'}
                        </td>
                        <td className="ax-row-actions">
                          <a className="ax-btn-sm ax-btn-sm-ghost" href={`/express/dashboard/editor/${inv.id}`} target="_blank" rel="noopener noreferrer">
                            Ver / Editar
                          </a>
                          {inv.estado !== 'publicada' && (
                            <button className="ax-btn-sm" disabled={procesando === inv.id} onClick={() => handlePublicarManual(inv.id)}>
                              Publicar
                            </button>
                          )}
                          {inv.estado === 'publicada' && (
                            <button className="ax-btn-sm ax-btn-sm-warn" disabled={procesando === inv.id} onClick={() => handleDespublicar(inv.id)}>
                              Despublicar
                            </button>
                          )}
                          <button
                            className="ax-btn-sm ax-btn-sm-danger"
                            disabled={procesando === inv.id}
                            onClick={() => handleEliminar(inv.id, [inv.nombre1, inv.nombre2].filter(Boolean).join(' & ') || inv.codigo_interno || 'sin nombre')}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {invitaciones.length === 0 && <p className="ax-empty">No hay invitaciones Express aún.</p>}
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .ax-loading { display: flex; justify-content: center; align-items: center; min-height: 100vh; color: #666; font-family: 'Raleway', sans-serif; }
        .ax-page { display: flex; min-height: 100vh; background: #f5f5f5; font-family: 'Raleway', sans-serif; }
        .ax-sidebar { width: 240px; background: #1a1a1a; color: white; padding: 2rem 1.5rem; display: flex; flex-direction: column; position: fixed; height: 100vh; }
        .ax-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; }
        .ax-logo span { color: #c9a96e; }
        .ax-badge { font-size: 0.62rem; letter-spacing: 2px; color: #c9a96e; margin: 0.2rem 0 2rem; font-weight: 600; }
        .ax-nav { display: flex; flex-direction: column; gap: 0.3rem; flex: 1; }
        .ax-nav button { background: none; border: none; color: rgba(255,255,255,0.65); text-align: left; padding: 0.8rem 1rem; border-radius: 8px; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 0.4rem; }
        .ax-nav button:hover, .ax-nav button.active { background: rgba(201,169,110,0.15); color: white; }
        .ax-count { background: #ef4444; color: white; font-size: 0.65rem; padding: 1px 7px; border-radius: 10px; margin-left: auto; }
        .ax-link-premium { color: rgba(255,255,255,0.4); font-size: 0.75rem; margin-top: 1rem; text-decoration: none; }
        .ax-link-premium:hover { color: #c9a96e; }
        .ax-logout { background: none; border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.65); padding: 0.6rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; margin-top: 0.8rem; }
        .ax-main { flex: 1; margin-left: 240px; padding: 2rem; }
        .ax-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .ax-header h1 { font-family: 'Cormorant Garamond', serif; font-size: 1.7rem; font-weight: 400; }
        .ax-email { color: #999; font-size: 0.8rem; }
        .ax-mensaje { background: #dcfce7; color: #166534; padding: 0.8rem 1.2rem; border-radius: 8px; margin-bottom: 1.2rem; font-size: 0.85rem; }
        .ax-empty { text-align: center; padding: 3rem; color: #999; background: white; border-radius: 12px; }
        .ax-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.2rem; }
        .ax-card { background: white; border-radius: 12px; padding: 1.3rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .ax-card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.4rem; }
        .ax-card-top h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; }
        .ax-tipo-badge { font-size: 0.62rem; background: #f0efec; color: #666; padding: 0.2rem 0.6rem; border-radius: 10px; white-space: nowrap; }
        .ax-meta { font-size: 0.75rem; color: #999; margin-bottom: 0.5rem; }
        .ax-monto { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; color: #c9a96e; margin-bottom: 0.3rem; }
        .ax-fecha { font-size: 0.7rem; color: #bbb; margin-bottom: 1rem; }
        .ax-actions { display: flex; gap: 0.5rem; }
        .ax-btn-confirm { flex: 1; background: #22c55e; color: white; border: none; padding: 0.6rem; border-radius: 6px; cursor: pointer; font-size: 0.78rem; }
        .ax-btn-confirm:disabled { opacity: 0.6; cursor: not-allowed; }
        .ax-btn-reject { background: none; border: 1.5px solid #fca5a5; color: #ef4444; padding: 0.6rem 0.8rem; border-radius: 6px; cursor: pointer; font-size: 0.78rem; }
        .ax-table-wrap { background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .ax-table { width: 100%; border-collapse: collapse; }
        .ax-table th { background: #fafafa; padding: 0.8rem 1rem; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.5px; color: #999; text-align: left; }
        .ax-table td { padding: 0.8rem 1rem; border-top: 1px solid #f5f5f5; font-size: 0.82rem; }
        .ax-nombre { font-weight: 500; }
        .ax-status-dot { font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 10px; white-space: nowrap; }
        .ax-row-actions { display: flex; gap: 0.4rem; }
        .ax-btn-sm { background: #1a1a1a; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 6px; cursor: pointer; font-size: 0.72rem; text-decoration: none; display: inline-block; }
        .ax-btn-sm:disabled { opacity: 0.5; cursor: not-allowed; }
        .ax-btn-sm-ghost { background: white; border: 1.5px solid #e0e0e0; color: #333; }
        .ax-btn-sm-warn { background: none; border: 1.5px solid #eab308; color: #b45309; }
        .ax-btn-sm-danger { background: none; border: 1.5px solid #fca5a5; color: #ef4444; }
        @media (max-width: 768px) {
          .ax-page { flex-direction: column; }
          .ax-sidebar { width: 100%; height: auto; position: relative; flex-direction: row; align-items: center; padding: 1rem; flex-wrap: wrap; }
          .ax-nav { flex-direction: row; flex-wrap: wrap; gap: 0.4rem; }
          .ax-badge { margin: 0 1rem; }
          .ax-link-premium, .ax-logout { margin: 0 0 0 auto; }
          .ax-main { margin-left: 0; padding: 1.2rem; }
        }
      `}</style>
    </div>
  )
}
