'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Panel() {
  const [user, setUser] = useState(null)
  const [evento, setEvento] = useState(null)
  const [invitados, setInvitados] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newGuest, setNewGuest] = useState({ nombre_completo: '', num_pases: 1, mesa: '', permite_ninos: true })

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/login'
      return
    }
    setUser(user)
    await loadEvento(user.id)
    setLoading(false)
  }

  async function loadEvento(userId) {
    const { data: eventos } = await supabase
      .from('eventos')
      .select('*')
      .eq('user_id', userId)
      .limit(1)

    if (eventos && eventos.length > 0) {
      setEvento(eventos[0])
      await loadInvitados(eventos[0].id)
    }
  }

  async function loadInvitados(eventoId) {
    const { data } = await supabase
      .from('invitados')
      .select('*')
      .eq('evento_id', eventoId)
      .order('created_at', { ascending: false })

    if (data) setInvitados(data)
  }

  async function addGuest(e) {
    e.preventDefault()
    if (!evento) return

    const { data, error } = await supabase
      .from('invitados')
      .insert([{ ...newGuest, evento_id: evento.id }])
      .select()

    if (data) {
      setInvitados([data[0], ...invitados])
      setNewGuest({ nombre_completo: '', num_pases: 1, mesa: '', permite_ninos: true })
      setShowForm(false)
    }
  }

  async function deleteGuest(id) {
    await supabase.from('invitados').delete().eq('id', id)
    setInvitados(invitados.filter(g => g.id !== id))
  }

  async function toggleEnviada(id, current) {
    await supabase.from('invitados').update({ invitacion_enviada: !current }).eq('id', id)
    setInvitados(invitados.map(g => g.id === id ? { ...g, invitacion_enviada: !current } : g))
  }

  function copyInvitation(guest) {
    const baseUrl = 'https://festejia.vercel.app/invitacion'
    const link = `${baseUrl}?n=${encodeURIComponent(guest.num_pases + ' pases')}&m=${encodeURIComponent(guest.nombre_completo)}`
    const mensaje = evento?.mensaje_personalizado || 'Estás invitado a nuestra celebración.'
    const text = `${mensaje}\n\n${link}`
    navigator.clipboard.writeText(text)
    alert('Invitación copiada al portapapeles')
  }

  function shareWhatsApp(guest) {
    const baseUrl = 'https://festejia.vercel.app/invitacion'
    const link = `${baseUrl}?n=${encodeURIComponent(guest.num_pases + ' pases')}&m=${encodeURIComponent(guest.nombre_completo)}`
    const mensaje = evento?.mensaje_personalizado || 'Estás invitado a nuestra celebración.'
    const text = encodeURIComponent(`${mensaje}\n\n${link}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (loading) return <div className="panel-loading">Cargando...</div>

  const confirmed = invitados.filter(g => g.estado === 'confirmado').length
  const pending = invitados.filter(g => g.estado === 'pendiente').length
  const rejected = invitados.filter(g => g.estado === 'rechazado').length
  const totalPases = invitados.reduce((sum, g) => sum + g.num_pases, 0)

  return (
    <div className="panel-page">
      {/* HEADER */}
      <header className="panel-header">
        <a href="/" className="nav-logo" style={{color: 'white'}}>Feste<span style={{color: '#c9a96e'}}>jia</span></a>
        <div className="panel-header-right">
          <span className="panel-user">{user?.email}</span>
          <button onClick={logout} className="panel-logout">Salir</button>
        </div>
      </header>

      <div className="panel-body">
        {/* EVENT INFO */}
        {evento && (
          <div className="panel-event-card">
            <h2>{evento.nombre_evento}</h2>
            <div className="event-details">
              <span>📅 {evento.fecha_evento ? new Date(evento.fecha_evento).toLocaleDateString('es') : 'Sin fecha'}</span>
              <span>📋 Tipo: {evento.tipo}</span>
            </div>
          </div>
        )}

        {/* STATS */}
        <div className="panel-stats">
          <div className="stat-card">
            <div className="stat-number">{invitados.length}</div>
            <div className="stat-label">Invitados</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalPases}</div>
            <div className="stat-label">Pases</div>
          </div>
          <div className="stat-card stat-green">
            <div className="stat-number">{confirmed}</div>
            <div className="stat-label">Confirmados</div>
          </div>
          <div className="stat-card stat-yellow">
            <div className="stat-number">{pending}</div>
            <div className="stat-label">Pendientes</div>
          </div>
          <div className="stat-card stat-red">
            <div className="stat-number">{rejected}</div>
            <div className="stat-label">Rechazados</div>
          </div>
        </div>

        {/* ADD GUEST BUTTON */}
        <div className="panel-actions">
          <button onClick={() => setShowForm(!showForm)} className="btn-add-guest">
            + Agregar Invitado
          </button>
        </div>

        {/* ADD GUEST FORM */}
        {showForm && (
          <form onSubmit={addGuest} className="add-guest-form">
            <input
              type="text"
              placeholder="Nombre completo"
              value={newGuest.nombre_completo}
              onChange={(e) => setNewGuest({...newGuest, nombre_completo: e.target.value})}
              required
            />
            <input
              type="number"
              placeholder="Pases"
              min="1"
              value={newGuest.num_pases}
              onChange={(e) => setNewGuest({...newGuest, num_pases: parseInt(e.target.value)})}
            />
            <input
              type="text"
              placeholder="Mesa (opcional)"
              value={newGuest.mesa}
              onChange={(e) => setNewGuest({...newGuest, mesa: e.target.value})}
            />
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={newGuest.permite_ninos}
                onChange={(e) => setNewGuest({...newGuest, permite_ninos: e.target.checked})}
              />
              Permite niños
            </label>
            <button type="submit" className="btn-save">Guardar</button>
          </form>
        )}

        {/* GUESTS TABLE */}
        <div className="guests-table">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Pases</th>
                <th>Mesa</th>
                <th>Estado</th>
                <th>Enviada</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {invitados.map(guest => (
                <tr key={guest.id}>
                  <td className="guest-name">{guest.nombre_completo}</td>
                  <td>{guest.num_pases}</td>
                  <td>{guest.mesa || '-'}</td>
                  <td>
                    <span className={`status-badge status-${guest.estado}`}>
                      {guest.estado}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleEnviada(guest.id, guest.invitacion_enviada)}
                      className={`sent-btn ${guest.invitacion_enviada ? 'sent' : ''}`}
                    >
                      {guest.invitacion_enviada ? '✓ Sí' : '○ No'}
                    </button>
                  </td>
                  <td className="actions-cell">
                    <button onClick={() => copyInvitation(guest)} title="Copiar link">📋</button>
                    <button onClick={() => shareWhatsApp(guest)} title="Enviar WhatsApp">💬</button>
                    <button onClick={() => deleteGuest(guest.id)} title="Eliminar">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {invitados.length === 0 && (
            <p className="no-guests">No hay invitados aún. Agrega el primero.</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .panel-page { min-height: 100vh; background: #f5f5f5; }
        .panel-header { background: #1a1a1a; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
        .panel-header-right { display: flex; align-items: center; gap: 1rem; }
        .panel-user { color: rgba(255,255,255,0.6); font-size: 0.8rem; }
        .panel-logout { background: none; border: 1px solid rgba(255,255,255,0.3); color: white; padding: 0.4rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.75rem; }
        .panel-body { max-width: 1100px; margin: 0 auto; padding: 2rem; }
        .panel-event-card { background: white; border-radius: 12px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .panel-event-card h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; margin-bottom: 0.5rem; }
        .event-details { display: flex; gap: 1.5rem; color: #6b6b6b; font-size: 0.85rem; }
        .panel-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
        .stat-card { background: white; border-radius: 12px; padding: 1.5rem; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .stat-number { font-size: 2rem; font-weight: 700; color: #1a1a1a; }
        .stat-label { font-size: 0.75rem; color: #6b6b6b; text-transform: uppercase; letter-spacing: 1px; margin-top: 0.3rem; }
        .stat-green .stat-number { color: #22c55e; }
        .stat-yellow .stat-number { color: #eab308; }
        .stat-red .stat-number { color: #ef4444; }
        .panel-actions { margin-bottom: 1.5rem; }
        .btn-add-guest { background: #c9a96e; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; font-size: 0.85rem; cursor: pointer; font-weight: 500; }
        .btn-add-guest:hover { background: #a07d4a; }
        .add-guest-form { background: white; border-radius: 12px; padding: 1.5rem; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05); align-items: center; }
        .add-guest-form input[type="text"], .add-guest-form input[type="number"] { padding: 0.7rem; border: 1.5px solid #e0e0e0; border-radius: 6px; font-size: 0.85rem; }
        .checkbox-label { font-size: 0.82rem; display: flex; align-items: center; gap: 0.5rem; }
        .btn-save { background: #1a1a1a; color: white; border: none; padding: 0.7rem 1.5rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
        .guests-table { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .guests-table table { width: 100%; border-collapse: collapse; }
        .guests-table th { background: #f9f9f9; padding: 0.8rem 1rem; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: #6b6b6b; text-align: left; }
        .guests-table td { padding: 0.8rem 1rem; border-top: 1px solid #f0f0f0; font-size: 0.85rem; }
        .guest-name { font-weight: 500; }
        .status-badge { padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.7rem; font-weight: 500; text-transform: uppercase; }
        .status-confirmado { background: #dcfce7; color: #166534; }
        .status-pendiente { background: #fef9c3; color: #854d0e; }
        .status-rechazado { background: #fee2e2; color: #991b1b; }
        .sent-btn { background: none; border: 1px solid #e0e0e0; padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.75rem; cursor: pointer; }
        .sent-btn.sent { background: #dcfce7; border-color: #22c55e; color: #166534; }
        .actions-cell { display: flex; gap: 0.3rem; }
        .actions-cell button { background: none; border: none; cursor: pointer; font-size: 1rem; padding: 0.2rem; }
        .no-guests { text-align: center; padding: 3rem; color: #6b6b6b; }
        .panel-loading { display: flex; justify-content: center; align-items: center; min-height: 100vh; font-size: 1.2rem; color: #6b6b6b; }
        @media (max-width: 768px) {
          .panel-body { padding: 1rem; }
          .add-guest-form { grid-template-columns: 1fr; }
          .guests-table { overflow-x: auto; }
          .panel-stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  )
}
