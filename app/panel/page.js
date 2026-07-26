'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Panel() {
  const [user, setUser] = useState(null)
  const [evento, setEvento] = useState(null)
  const [invitados, setInvitados] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('invitados')
  const [showForm, setShowForm] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [filter, setFilter] = useState('todos')
  const [search, setSearch] = useState('')
  const [newGuest, setNewGuest] = useState({ nombre_completo: '', num_pases: 1, mesa: '', permite_ninos: true })
  const [editingEvento, setEditingEvento] = useState(null)
  const [editingGuest, setEditingGuest] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => { checkUser() }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }
    setUser(user)

    const { data: prof } = await supabase.from('profiles').select('role,plan').eq('id', user.id).single()
    if (prof && prof.role === 'admin') { window.location.href = '/admin'; return }
    setProfile(prof)

    await loadEvento(user.id)
    setLoading(false)
  }

  async function loadEvento(userId) {
    const { data: eventos } = await supabase.from('eventos').select('*').eq('user_id', userId).limit(1)
    if (eventos && eventos.length > 0) {
      setEvento(eventos[0])
      setEditingEvento(eventos[0])
      await loadInvitados(eventos[0].id)
    } else {
      const { data: newEvento } = await supabase.from('eventos').insert([{ user_id: userId, nombre_evento: 'Mi Evento', tipo: 'boda' }]).select()
      if (newEvento && newEvento.length > 0) { setEvento(newEvento[0]); setEditingEvento(newEvento[0]) }
    }
  }

  async function loadInvitados(eventoId) {
    const { data } = await supabase.from('invitados').select('*').eq('evento_id', eventoId).order('created_at', { ascending: false })
    if (data) setInvitados(data)
  }

  async function addGuest(e) {
    e.preventDefault()
    if (!evento) return
    if (invitados.length >= getLimiteInvitados()) {
      alert('Has alcanzado el límite de invitados de tu plan (' + getLimiteInvitados() + '). Contacta a Festejia para actualizar tu plan.')
      return
    }
    const { data } = await supabase.from('invitados').insert([{ ...newGuest, evento_id: evento.id }]).select()
    if (data) {
      setInvitados([data[0], ...invitados])
      setNewGuest({ nombre_completo: '', num_pases: 1, mesa: '', permite_ninos: true })
      setShowForm(false)
    }
  }

  async function updateGuest(id, updates) {
    await supabase.from('invitados').update(updates).eq('id', id)
    setInvitados(invitados.map(g => g.id === id ? { ...g, ...updates } : g))
  }

  async function deleteGuest(id) {
    if (!confirm('¿Eliminar este invitado?')) return
    await supabase.from('invitados').delete().eq('id', id)
    setInvitados(invitados.filter(g => g.id !== id))
  }

  async function saveEditGuest(e) {
    e.preventDefault()
    if (!editingGuest) return
    await supabase.from('invitados').update({
      nombre_completo: editingGuest.nombre_completo,
      num_pases: editingGuest.num_pases,
      mesa: editingGuest.mesa
    }).eq('id', editingGuest.id)
    setInvitados(invitados.map(g => g.id === editingGuest.id ? { ...g, ...editingGuest } : g))
    setEditingGuest(null)
  }

  function getLimiteInvitados() {
    if (profile?.plan === 'exclusive') return 9999
    if (profile?.plan === 'premium') return 150
    return 50
  }

  function canUseFeature(feature) {
    const plan = profile?.plan || 'plus'
    if (feature === 'excel') return plan === 'premium' || plan === 'exclusive'
    if (feature === 'checkin') return plan === 'exclusive'
    if (feature === 'galeria') return plan === 'premium' || plan === 'exclusive'
    return true
  }

  async function saveEventConfig(e) {
    e.preventDefault()
    await supabase.from('eventos').update(editingEvento).eq('id', evento.id)
    setEvento(editingEvento)
    setShowConfig(false)
    alert('Configuración guardada')
  }

  function getInvitationLink(guest) {
    return `https://www.festejia.com/invitacion/${guest.id}`
  }

  function copyInvitation(guest) {
    const link = getInvitationLink(guest)
    const mensaje = evento?.mensaje_personalizado || 'Estás invitado a nuestra celebración. Confirma tu asistencia.'
    const text = `${mensaje}\n\n${link}`
    navigator.clipboard.writeText(text)
    alert('Link copiado al portapapeles')
  }

  function shareWhatsApp(guest) {
    const link = getInvitationLink(guest)
    const mensaje = evento?.mensaje_personalizado || 'Estás invitado a nuestra celebración. Confirma tu asistencia.'
    const text = encodeURIComponent(`${mensaje}\n\n${link}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  function exportExcel() {
    let csv = 'Nombre,Pases,Mesa,Estado,Enviada,Fecha Confirmación,Mensaje\n'
    invitados.forEach(g => {
      csv += `"${g.nombre_completo}",${g.num_pases},"${g.mesa || ''}","${g.estado}","${g.invitacion_enviada ? 'Sí' : 'No'}","${g.fecha_confirmacion || ''}","${g.mensaje_invitado || ''}"\n`
    })
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `invitados_${evento?.nombre_evento || 'evento'}.csv`
    a.click()
  }

  async function checkInGuest(id) {
    await updateGuest(id, { ingreso: true, fecha_ingreso: new Date().toISOString() })
  }

  async function checkOutGuest(id) {
    await updateGuest(id, { ingreso: false, fecha_salida: new Date().toISOString() })
  }

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (loading) return <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh',fontSize:'1rem',color:'#666'}}>Cargando...</div>

  const confirmed = invitados.filter(g => g.estado === 'confirmado').length
  const pending = invitados.filter(g => g.estado === 'pendiente').length
  const rejected = invitados.filter(g => g.estado === 'rechazado').length
  const totalPases = invitados.reduce((sum, g) => sum + g.num_pases, 0)
  const enviadas = invitados.filter(g => g.invitacion_enviada).length
  const ingresados = invitados.filter(g => g.ingreso).length
  const diasRestantes = evento?.fecha_evento ? Math.ceil((new Date(evento.fecha_evento) - new Date()) / (1000*60*60*24)) : null
  const porcentajeConfirmado = invitados.length > 0 ? Math.round((confirmed / invitados.length) * 100) : 0
  const mensajes = invitados.filter(g => g.mensaje_invitado).map(g => ({ nombre: g.nombre_completo, mensaje: g.mensaje_invitado, estado: g.estado }))

  const filteredInvitados = invitados.filter(g => {
    if (filter === 'confirmado' && g.estado !== 'confirmado') return false
    if (filter === 'pendiente' && g.estado !== 'pendiente') return false
    if (filter === 'rechazado' && g.estado !== 'rechazado') return false
    if (filter === 'enviada' && !g.invitacion_enviada) return false
    if (filter === 'no_enviada' && g.invitacion_enviada) return false
    if (search && !g.nombre_completo.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="panel-page">
      <header className="panel-header">
        <a href="/" className="panel-logo">Feste<span>jia</span></a>
        <div className="panel-header-right">
          <span>{user?.email}</span>
          <button onClick={logout}>Salir</button>
        </div>
      </header>

      <div className="panel-body">
        {/* EVENT CONFIG - Siempre visible */}
        <div className="event-card">
          <div className="event-card-top">
            <h2>{evento?.nombre_evento}</h2>
            <span className="event-type-badge">{evento?.tipo}</span>
          </div>

          <form onSubmit={saveEventConfig} className="config-form">
            <div className="config-grid">
              <div>
                <label>Nombre del Evento</label>
                <input value={editingEvento?.nombre_evento || ''} onChange={e => setEditingEvento({...editingEvento, nombre_evento: e.target.value})} />
              </div>
              <div>
                <label>Fecha del Evento</label>
                <input type="date" value={editingEvento?.fecha_evento?.split('T')[0] || ''} onChange={e => setEditingEvento({...editingEvento, fecha_evento: e.target.value})} />
              </div>
              <div>
                <label>Fecha Límite Confirmación</label>
                <input type="date" value={editingEvento?.fecha_limite_confirmacion?.split('T')[0] || ''} onChange={e => setEditingEvento({...editingEvento, fecha_limite_confirmacion: e.target.value})} />
              </div>
              <div style={{gridColumn: '1/-1'}}>
                <label>Mensaje Personalizado (se envía con el link)</label>
                <textarea rows="3" value={editingEvento?.mensaje_personalizado || ''} onChange={e => setEditingEvento({...editingEvento, mensaje_personalizado: e.target.value})} placeholder="Estás invitado a nuestra celebración..." />
              </div>
            </div>
            <div className="config-actions">
              <button type="submit" className="btn-save">Guardar Cambios</button>
            </div>
          </form>
        </div>

        {/* STATS */}
        {diasRestantes !== null && (
          <div className="countdown-bar">
            <span className="countdown-number">{diasRestantes > 0 ? diasRestantes : '¡Hoy!'}</span>
            <span className="countdown-label">{diasRestantes > 0 ? 'días para tu evento' : '¡Es el día de tu evento!'}</span>
          </div>
        )}

        <div className="progress-bar-container">
          <div className="progress-info">
            <span>Progreso de confirmaciones</span>
            <span>{porcentajeConfirmado}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: porcentajeConfirmado + '%'}}></div>
          </div>
          <div className="progress-detail">
            <span className="pg-green">{confirmed} confirmados</span>
            <span className="pg-yellow">{pending} pendientes</span>
            <span className="pg-red">{rejected} rechazados</span>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat"><strong>{invitados.length}</strong><span>Invitados</span></div>
          <div className="stat"><strong>{totalPases}</strong><span>Pases</span></div>
          <div className="stat green"><strong>{confirmed}</strong><span>Confirmados</span></div>
          <div className="stat yellow"><strong>{pending}</strong><span>Pendientes</span></div>
          <div className="stat red"><strong>{rejected}</strong><span>Rechazados</span></div>
          <div className="stat"><strong>{enviadas}</strong><span>Enviadas</span></div>
          <div className="stat blue"><strong>{ingresados}</strong><span>Ingresados</span></div>
        </div>

        {/* TABS */}
        <div className="panel-tabs">
          <button className={tab === 'invitados' ? 'active' : ''} onClick={() => setTab('invitados')}>📋 Invitados</button>
          <button className={tab === 'mensajes' ? 'active' : ''} onClick={() => setTab('mensajes')}>💬 Mensajes ({mensajes.length})</button>
          {canUseFeature('checkin') && <button className={tab === 'checkin' ? 'active' : ''} onClick={() => setTab('checkin')}>📱 Check-in</button>}
        </div>

        {/* INVITADOS TAB */}
        {tab === 'invitados' && (
          <>
            <div className="toolbar">
              <button className="btn-add" onClick={() => setShowForm(!showForm)}>+ Agregar Invitado ({invitados.length}/{getLimiteInvitados()})</button>
              {canUseFeature('excel') && <button className="btn-export" onClick={exportExcel}>📥 Exportar Excel</button>}
              <a href={getInvitationLink({nombre_completo:'Vista Previa', num_pases: 2, mesa: '', id: 'preview'})} target="_blank" className="btn-preview">👁️ Ver Invitación</a>
              <input className="search-input" placeholder="Buscar por nombre..." value={search} onChange={e => setSearch(e.target.value)} />
              <select className="filter-select" value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="todos">Todos</option>
                <option value="confirmado">Confirmados</option>
                <option value="pendiente">Pendientes</option>
                <option value="rechazado">Rechazados</option>
                <option value="enviada">Enviadas</option>
                <option value="no_enviada">No enviadas</option>
              </select>
            </div>

            {showForm && (
              <form onSubmit={addGuest} className="add-form">
                <input placeholder="Nombre completo" value={newGuest.nombre_completo} onChange={e => setNewGuest({...newGuest, nombre_completo: e.target.value})} required />
                <input type="number" placeholder="Pases" min="1" value={newGuest.num_pases} onChange={e => setNewGuest({...newGuest, num_pases: parseInt(e.target.value) || 1})} />
                <input placeholder="Mesa (opc)" value={newGuest.mesa} onChange={e => setNewGuest({...newGuest, mesa: e.target.value})} />
                <label className="check-label"><input type="checkbox" checked={newGuest.permite_ninos} onChange={e => setNewGuest({...newGuest, permite_ninos: e.target.checked})} /> Niños</label>
                <button type="submit" className="btn-save">Guardar</button>
              </form>
            )}

            <div className="table-wrap">
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
                  {filteredInvitados.map(g => (
                    <tr key={g.id}>
                      <td className="name-cell">{editingGuest?.id === g.id ? <input value={editingGuest.nombre_completo} onChange={e => setEditingGuest({...editingGuest, nombre_completo: e.target.value})} className="edit-input" /> : g.nombre_completo}</td>
                      <td>{editingGuest?.id === g.id ? <input type="number" min="1" value={editingGuest.num_pases} onChange={e => setEditingGuest({...editingGuest, num_pases: parseInt(e.target.value)||1})} className="edit-input-sm" /> : g.num_pases}</td>
                      <td>{editingGuest?.id === g.id ? <input value={editingGuest.mesa||''} onChange={e => setEditingGuest({...editingGuest, mesa: e.target.value})} className="edit-input-sm" /> : (g.mesa || '-')}</td>
                      <td><span className={`badge ${g.estado}`}>{g.estado}</span></td>
                      <td>
                        <button className={`sent-btn ${g.invitacion_enviada ? 'yes' : ''}`} onClick={() => updateGuest(g.id, { invitacion_enviada: !g.invitacion_enviada })}>
                          {g.invitacion_enviada ? '✓ Sí' : '○ No'}
                        </button>
                      </td>
                      <td className="actions-cell">
                        {editingGuest?.id === g.id ? (
                          <>
                            <button onClick={saveEditGuest} title="Guardar">💾</button>
                            <button onClick={() => setEditingGuest(null)} title="Cancelar">✖</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => setEditingGuest({...g})} title="Editar">✏️</button>
                            <button onClick={() => copyInvitation(g)} title="Copiar link">📋</button>
                            <button onClick={() => shareWhatsApp(g)} title="WhatsApp">💬</button>
                            <button onClick={() => deleteGuest(g.id)} title="Eliminar">🗑️</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredInvitados.length === 0 && <p className="empty">No hay invitados con ese filtro.</p>}
            </div>
          </>
        )}

        {/* MENSAJES TAB */}
        {tab === 'mensajes' && (
          <div className="mensajes-section">
            <h3>Mensajes de tus Invitados</h3>
            {mensajes.length === 0 && <p className="empty">Aún no hay mensajes. Cuando tus invitados confirmen, sus mensajes aparecerán aquí.</p>}
            <div className="mensajes-list">
              {mensajes.map((m, i) => (
                <div key={i} className={`mensaje-card ${m.estado}`}>
                  <div className="mensaje-header">
                    <strong>{m.nombre}</strong>
                    <span className={`badge ${m.estado}`}>{m.estado}</span>
                  </div>
                  <p className="mensaje-text">"{m.mensaje}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHECK-IN TAB */}
        {tab === 'checkin' && (
          <div className="checkin-section">
            <h3>Control de Ingreso</h3>
            <p className="checkin-info">Ingresados: {ingresados} / {confirmed} confirmados</p>
            <div className="checkin-list">
              {invitados.filter(g => g.estado === 'confirmado').map(g => (
                <div key={g.id} className={`checkin-card ${g.ingreso ? 'in' : ''}`}>
                  <div className="checkin-info-row">
                    <strong>{g.nombre_completo}</strong>
                    <span>{g.num_pases} pases — Mesa {g.mesa || '-'}</span>
                  </div>
                  <div className="checkin-actions">
                    {!g.ingreso ? (
                      <button className="btn-checkin" onClick={() => checkInGuest(g.id)}>✓ Registrar Ingreso</button>
                    ) : (
                      <span className="checkin-done">✓ Ingresó</span>
                    )}
                  </div>
                  {g.ingreso && g.fecha_ingreso && <span className="checkin-time">Ingresó: {new Date(g.fecha_ingreso).toLocaleTimeString('es-BO', {hour:'2-digit', minute:'2-digit'})}</span>}
                </div>
              ))}
              {invitados.filter(g => g.estado === 'confirmado').length === 0 && (
                <p className="empty">No hay invitados confirmados para check-in.</p>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .panel-page { min-height: 100vh; background: #f5f5f5; }
        .panel-header { background: #1a1a1a; padding: 0.8rem 2rem; display: flex; justify-content: space-between; align-items: center; }
        .panel-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; color: white; text-decoration: none; }
        .panel-logo span { color: #c9a96e; }
        .panel-header-right { display: flex; align-items: center; gap: 1rem; }
        .panel-header-right span { color: rgba(255,255,255,0.6); font-size: 0.8rem; }
        .panel-header-right button { background: none; border: 1px solid rgba(255,255,255,0.3); color: white; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.75rem; }
        .panel-body { max-width: 1100px; margin: 0 auto; padding: 1.5rem; }
        .event-card { background: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .event-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .event-card h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; }
        .event-type-badge { background: #f3e8fd; color: #7c3aed; padding: 0.3rem 0.8rem; border-radius: 12px; font-size: 0.7rem; font-weight: 600; text-transform: capitalize; }
        .config-form { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #eee; }
        .config-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .config-grid label { display: block; font-size: 0.7rem; font-weight: 600; color: #555; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.3rem; }
        .config-grid input, .config-grid select, .config-grid textarea { width: 100%; padding: 0.6rem; border: 1.5px solid #e0e0e0; border-radius: 6px; font-size: 0.85rem; font-family: inherit; }
        .config-grid textarea { resize: vertical; }
        .config-actions { display: flex; gap: 0.8rem; margin-top: 1rem; }
        .btn-save { background: #1a1a1a; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
        .btn-cancel { background: none; border: 1.5px solid #ddd; color: #666; padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
        .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.8rem; margin-bottom: 1.5rem; }
        .stat { background: white; border-radius: 10px; padding: 1rem; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .stat strong { display: block; font-size: 1.5rem; color: #1a1a1a; }
        .stat span { font-size: 0.65rem; color: #999; text-transform: uppercase; letter-spacing: 0.5px; }
        .stat.green strong { color: #22c55e; }
        .stat.yellow strong { color: #eab308; }
        .stat.red strong { color: #ef4444; }
        .stat.blue strong { color: #3b82f6; }
        .panel-tabs { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
        .panel-tabs button { background: white; border: 1.5px solid #e0e0e0; padding: 0.6rem 1.2rem; border-radius: 8px; cursor: pointer; font-size: 0.8rem; }
        .panel-tabs button.active { background: #1a1a1a; color: white; border-color: #1a1a1a; }
        .toolbar { display: flex; gap: 0.8rem; margin-bottom: 1rem; flex-wrap: wrap; align-items: center; }
        .btn-add { background: #c9a96e; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 500; }
        .btn-export { background: #22c55e; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
        .search-input { padding: 0.6rem; border: 1.5px solid #e0e0e0; border-radius: 6px; font-size: 0.8rem; min-width: 180px; }
        .filter-select { padding: 0.6rem; border: 1.5px solid #e0e0e0; border-radius: 6px; font-size: 0.8rem; }
        .add-form { background: white; border-radius: 10px; padding: 1rem; display: flex; gap: 0.8rem; margin-bottom: 1rem; flex-wrap: wrap; align-items: center; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .add-form input { padding: 0.6rem; border: 1.5px solid #e0e0e0; border-radius: 6px; font-size: 0.85rem; }
        .add-form input:first-child { flex: 2; min-width: 200px; }
        .check-label { font-size: 0.8rem; display: flex; align-items: center; gap: 0.3rem; }
        .table-wrap { background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .table-wrap table { width: 100%; border-collapse: collapse; }
        .table-wrap th { background: #fafafa; padding: 0.7rem 1rem; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; color: #999; text-align: left; }
        .table-wrap td { padding: 0.7rem 1rem; border-top: 1px solid #f5f5f5; font-size: 0.85rem; }
        .name-cell { font-weight: 500; }
        .badge { padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.7rem; font-weight: 500; text-transform: capitalize; }
        .badge.confirmado { background: #dcfce7; color: #166534; }
        .badge.pendiente { background: #fef9c3; color: #854d0e; }
        .badge.rechazado { background: #fee2e2; color: #991b1b; }
        .sent-btn { background: none; border: 1px solid #e0e0e0; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem; cursor: pointer; }
        .sent-btn.yes { background: #dcfce7; border-color: #22c55e; color: #166534; }
        .actions-cell { display: flex; gap: 0.2rem; }
        .actions-cell button { background: none; border: none; cursor: pointer; font-size: 0.9rem; padding: 0.2rem; }
        .empty { text-align: center; padding: 2rem; color: #999; font-size: 0.9rem; }
        .checkin-section h3 { font-size: 1.2rem; margin-bottom: 0.5rem; }
        .checkin-info { color: #666; font-size: 0.85rem; margin-bottom: 1.5rem; }
        .checkin-list { display: flex; flex-direction: column; gap: 0.8rem; }
        .checkin-card { background: white; border-radius: 10px; padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border-left: 4px solid #e0e0e0; }
        .checkin-card.in { border-left-color: #22c55e; background: #f0fdf4; }
        .checkin-info-row strong { display: block; font-size: 0.95rem; }
        .checkin-info-row span { font-size: 0.8rem; color: #666; }
        .btn-checkin { background: #22c55e; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
        .checkin-done { background: #dcfce7; color: #166534; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.75rem; font-weight: 500; }
        .checkin-time { font-size: 0.75rem; color: #22c55e; }
        .countdown-bar { background: linear-gradient(135deg, #1a1a1a, #333); color: white; border-radius: 12px; padding: 1.2rem 2rem; display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .countdown-number { font-size: 2.5rem; font-weight: 700; color: #c9a96e; font-family: 'Cormorant Garamond', serif; }
        .countdown-label { font-size: 0.9rem; color: rgba(255,255,255,0.8); }
        .progress-bar-container { background: white; border-radius: 12px; padding: 1.2rem 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .progress-info { display: flex; justify-content: space-between; font-size: 0.8rem; color: #666; margin-bottom: 0.5rem; }
        .progress-bar { height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #22c55e, #16a34a); border-radius: 4px; transition: width 0.5s; }
        .progress-detail { display: flex; gap: 1.5rem; margin-top: 0.5rem; font-size: 0.75rem; }
        .pg-green { color: #22c55e; }
        .pg-yellow { color: #eab308; }
        .pg-red { color: #ef4444; }
        .btn-preview { background: #6366f1; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; text-decoration: none; display: inline-block; }
        .edit-input { padding: 0.3rem; border: 1.5px solid #c9a96e; border-radius: 4px; font-size: 0.8rem; width: 100%; }
        .edit-input-sm { padding: 0.3rem; border: 1.5px solid #c9a96e; border-radius: 4px; font-size: 0.8rem; width: 60px; }
        .mensajes-section h3 { font-size: 1.2rem; margin-bottom: 1rem; }
        .mensajes-list { display: flex; flex-direction: column; gap: 0.8rem; }
        .mensaje-card { background: white; border-radius: 10px; padding: 1rem 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border-left: 4px solid #e0e0e0; }
        .mensaje-card.confirmado { border-left-color: #22c55e; }
        .mensaje-card.rechazado { border-left-color: #ef4444; }
        .mensaje-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem; }
        .mensaje-text { color: #555; font-style: italic; font-size: 0.85rem; margin: 0; }
        @media (max-width: 768px) {
          .panel-body { padding: 1rem; }
          .stats-row { grid-template-columns: repeat(3, 1fr); }
          .toolbar { flex-direction: column; align-items: stretch; }
          .add-form { flex-direction: column; }
          .config-grid { grid-template-columns: 1fr; }
          .event-card-top { flex-direction: column; gap: 1rem; }
        }
      `}</style>
    </div>
  )
}
