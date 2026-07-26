'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminPanel() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('dashboard')
  const [clients, setClients] = useState([])
  const [eventos, setEventos] = useState([])
  const [allInvitados, setAllInvitados] = useState([])
  const [showCreateClient, setShowCreateClient] = useState(false)
  const [newClient, setNewClient] = useState({ usuario: '', password: '', nombre: '', plan: 'plus', nombre_evento: '', tipo: 'boda' })

  useEffect(() => { checkAdmin() }, [])

  async function checkAdmin() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }
    setUser(user)

    const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (!prof || prof.role !== 'admin') { window.location.href = '/panel'; return }
    setProfile(prof)

    await loadData()
    setLoading(false)
  }

  async function loadData() {
    const { data: profs } = await supabase.from('profiles').select('*').eq('role', 'client').order('created_at', { ascending: false })
    setClients(profs || [])

    const { data: evts } = await supabase.from('eventos').select('*').order('created_at', { ascending: false })
    setEventos(evts || [])

    const { data: invs } = await supabase.from('invitados').select('*').order('created_at', { ascending: false })
    setAllInvitados(invs || [])
  }

  async function createClient(e) {
    e.preventDefault()
    
    try {
      // 1. Crear perfil directamente (sin Auth)
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: crypto.randomUUID(),
          email: newClient.usuario + '@festejia.local',
          nombre: newClient.nombre,
          role: 'client',
          plan: newClient.plan
        })
        .select()
        .single()

      if (profileError) { alert('Error perfil: ' + profileError.message); return }

      // 2. Guardar credenciales en clientes_login
      const { error: loginError } = await supabase
        .from('clientes_login')
        .insert({
          usuario: newClient.usuario,
          password: newClient.password,
          profile_id: profileData.id
        })

      if (loginError) { alert('Error login: ' + loginError.message); return }

      // 3. Crear evento
      await supabase.from('eventos').insert({
        user_id: profileData.id,
        nombre_evento: newClient.nombre_evento || 'Mi Evento',
        tipo: newClient.tipo
      })

      alert('✓ Cliente creado\n\nUsuario: ' + newClient.usuario + '\nContraseña: ' + newClient.password)
      setNewClient({ usuario: '', password: '', nombre: '', plan: 'plus', nombre_evento: '', tipo: 'boda' })
      setShowCreateClient(false)
      await loadData()
    } catch(err) {
      alert('Error: ' + err.message)
    }
  }

  async function toggleClientActive(clientId, current) {
    await supabase.from('profiles').update({ activo: !current }).eq('id', clientId)
    setClients(clients.map(c => c.id === clientId ? { ...c, activo: !current } : c))
  }

  async function deleteClient(clientId) {
    if (!confirm('¿Eliminar este cliente y todos sus datos?')) return
    await supabase.from('profiles').delete().eq('id', clientId)
    await loadData()
  }

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (loading) return <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh',fontSize:'1.2rem',color:'#666'}}>Cargando panel admin...</div>

  const totalConfirmados = allInvitados.filter(i => i.estado === 'confirmado').length
  const totalPendientes = allInvitados.filter(i => i.estado === 'pendiente').length
  const totalRechazados = allInvitados.filter(i => i.estado === 'rechazado').length
  const totalPases = allInvitados.reduce((s, i) => s + (i.num_pases || 0), 0)

  return (
    <div className="admin-page">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">Feste<span>jia</span></div>
        <p className="sidebar-role">ADMINISTRADOR</p>
        <nav className="sidebar-nav">
          <button className={tab === 'dashboard' ? 'active' : ''} onClick={() => setTab('dashboard')}>📊 Dashboard</button>
          <button className={tab === 'clients' ? 'active' : ''} onClick={() => setTab('clients')}>👥 Clientes</button>
          <button className={tab === 'events' ? 'active' : ''} onClick={() => setTab('events')}>📅 Eventos</button>
          <button className={tab === 'guests' ? 'active' : ''} onClick={() => setTab('guests')}>📋 Invitados</button>
        </nav>
        <button className="sidebar-logout" onClick={logout}>Cerrar Sesión</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>{tab === 'dashboard' ? 'Dashboard' : tab === 'clients' ? 'Clientes' : tab === 'events' ? 'Eventos' : 'Todos los Invitados'}</h1>
          <span className="admin-email">{user?.email}</span>
        </header>

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div className="admin-content">
            <div className="stats-grid">
              <div className="stat-card primary"><div className="stat-number">{clients.length}</div><div className="stat-label">Clientes</div></div>
              <div className="stat-card"><div className="stat-number">{eventos.length}</div><div className="stat-label">Eventos</div></div>
              <div className="stat-card"><div className="stat-number">{allInvitados.length}</div><div className="stat-label">Invitados Total</div></div>
              <div className="stat-card"><div className="stat-number">{totalPases}</div><div className="stat-label">Pases Total</div></div>
              <div className="stat-card green"><div className="stat-number">{totalConfirmados}</div><div className="stat-label">Confirmados</div></div>
              <div className="stat-card yellow"><div className="stat-number">{totalPendientes}</div><div className="stat-label">Pendientes</div></div>
              <div className="stat-card red"><div className="stat-number">{totalRechazados}</div><div className="stat-label">Rechazados</div></div>
              <div className="stat-card"><div className="stat-number">{clients.filter(c => c.activo).length}</div><div className="stat-label">Activos</div></div>
            </div>
            <div className="recent-section">
              <h3>Últimos Clientes</h3>
              {clients.slice(0, 5).map(c => (
                <div key={c.id} className="recent-item">
                  <span>{c.nombre || c.email}</span>
                  <span className={`plan-badge ${c.plan}`}>{c.plan}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CLIENTS TAB */}
        {tab === 'clients' && (
          <div className="admin-content">
            <button className="btn-create" onClick={() => setShowCreateClient(!showCreateClient)}>+ Crear Nuevo Cliente</button>

            {showCreateClient && (
              <form onSubmit={createClient} className="create-form">
                <h3>Nuevo Cliente</h3>
                <div className="form-grid">
                  <div>
                    <label>Usuario</label>
                    <input type="text" value={newClient.usuario} onChange={e => setNewClient({...newClient, usuario: e.target.value})} required placeholder="maria_juan" />
                  </div>
                  <div>
                    <label>Contraseña</label>
                    <input type="text" value={newClient.password} onChange={e => setNewClient({...newClient, password: e.target.value})} required placeholder="Boda2024!" />
                  </div>
                  <div>
                    <label>Nombre</label>
                    <input type="text" value={newClient.nombre} onChange={e => setNewClient({...newClient, nombre: e.target.value})} placeholder="María & Juan" />
                  </div>
                  <div>
                    <label>Plan</label>
                    <select value={newClient.plan} onChange={e => setNewClient({...newClient, plan: e.target.value})}>
                      <option value="plus">Plus ($45)</option>
                      <option value="premium">Premium ($90)</option>
                      <option value="exclusive">Exclusive ($150)</option>
                    </select>
                  </div>
                  <div>
                    <label>Nombre del Evento</label>
                    <input type="text" value={newClient.nombre_evento} onChange={e => setNewClient({...newClient, nombre_evento: e.target.value})} placeholder="Boda María & Juan" />
                  </div>
                  <div>
                    <label>Tipo de Evento</label>
                    <select value={newClient.tipo} onChange={e => setNewClient({...newClient, tipo: e.target.value})}>
                      <option value="boda">Boda</option>
                      <option value="quince">15 Años</option>
                      <option value="graduacion">Graduación</option>
                      <option value="bautizo">Bautizo</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-save">Crear Cliente</button>
                  <button type="button" className="btn-cancel" onClick={() => setShowCreateClient(false)}>Cancelar</button>
                </div>
              </form>
            )}

            <div className="clients-table">
              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Usuario</th>
                    <th>Plan</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map(client => (
                    <tr key={client.id}>
                      <td className="client-name">{client.nombre || '-'}</td>
                      <td>{client.email?.replace('@festejia.local', '') || '-'}</td>
                      <td><span className={`plan-badge ${client.plan}`}>{client.plan}</span></td>
                      <td>
                        <span className={`status-dot ${client.activo ? 'active' : 'inactive'}`}>
                          {client.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>{new Date(client.created_at).toLocaleDateString('es')}</td>
                      <td className="actions">
                        <button onClick={() => toggleClientActive(client.id, client.activo)} title={client.activo ? 'Desactivar' : 'Activar'}>
                          {client.activo ? '⏸️' : '▶️'}
                        </button>
                        <button onClick={() => deleteClient(client.id)} title="Eliminar">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {clients.length === 0 && <p className="empty">No hay clientes aún. Crea el primero.</p>}
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {tab === 'events' && (
          <div className="admin-content">
            <div className="events-grid">
              {eventos.map(evt => {
                const evtInvitados = allInvitados.filter(i => i.evento_id === evt.id)
                const evtConfirmados = evtInvitados.filter(i => i.estado === 'confirmado').length
                return (
                  <div key={evt.id} className="event-card">
                    <h3>{evt.nombre_evento}</h3>
                    <p className="event-type">{evt.tipo}</p>
                    <p className="event-date">{evt.fecha_evento ? new Date(evt.fecha_evento).toLocaleDateString('es') : 'Sin fecha'}</p>
                    <div className="event-stats">
                      <span>{evtInvitados.length} invitados</span>
                      <span>{evtConfirmados} confirmados</span>
                    </div>
                    <p className="event-plantilla">Plantilla: {evt.plantilla || 'plantilla1'}</p>
                  </div>
                )
              })}
              {eventos.length === 0 && <p className="empty">No hay eventos aún.</p>}
            </div>
          </div>
        )}

        {/* ALL GUESTS TAB */}
        {tab === 'guests' && (
          <div className="admin-content">
            <p className="guests-count">Total: {allInvitados.length} invitados en todos los eventos</p>
            <div className="guests-table">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Pases</th>
                    <th>Mesa</th>
                    <th>Estado</th>
                    <th>Evento</th>
                  </tr>
                </thead>
                <tbody>
                  {allInvitados.map(inv => {
                    const evt = eventos.find(e => e.id === inv.evento_id)
                    return (
                      <tr key={inv.id}>
                        <td className="client-name">{inv.nombre_completo}</td>
                        <td>{inv.num_pases}</td>
                        <td>{inv.mesa || '-'}</td>
                        <td><span className={`status-badge-sm ${inv.estado}`}>{inv.estado}</span></td>
                        <td>{evt?.nombre_evento || '-'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .admin-page { display: flex; min-height: 100vh; background: #f5f5f5; }
        .admin-sidebar { width: 240px; background: #1a1a1a; color: white; padding: 2rem 1.5rem; display: flex; flex-direction: column; position: fixed; height: 100vh; }
        .sidebar-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin-bottom: 0.3rem; }
        .sidebar-logo span { color: #c9a96e; }
        .sidebar-role { font-size: 0.65rem; color: #c9a96e; letter-spacing: 2px; margin-bottom: 2.5rem; font-weight: 600; }
        .sidebar-nav { display: flex; flex-direction: column; gap: 0.3rem; flex: 1; }
        .sidebar-nav button { background: none; border: none; color: rgba(255,255,255,0.6); text-align: left; padding: 0.8rem 1rem; border-radius: 8px; cursor: pointer; font-size: 0.85rem; transition: all 0.2s; }
        .sidebar-nav button:hover, .sidebar-nav button.active { background: rgba(201,169,110,0.15); color: white; }
        .sidebar-logout { background: none; border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.6); padding: 0.6rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; margin-top: auto; }
        .admin-main { flex: 1; margin-left: 240px; padding: 2rem; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .admin-header h1 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 400; }
        .admin-email { color: #999; font-size: 0.8rem; }
        .admin-content { }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        .stat-card { background: white; border-radius: 12px; padding: 1.5rem; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .stat-card.primary { border-left: 4px solid #c9a96e; }
        .stat-card.green { border-left: 4px solid #22c55e; }
        .stat-card.yellow { border-left: 4px solid #eab308; }
        .stat-card.red { border-left: 4px solid #ef4444; }
        .stat-number { font-size: 2rem; font-weight: 700; color: #1a1a1a; }
        .stat-label { font-size: 0.7rem; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-top: 0.3rem; }
        .recent-section { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .recent-section h3 { font-size: 1rem; margin-bottom: 1rem; color: #333; }
        .recent-item { display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0; border-bottom: 1px solid #f0f0f0; font-size: 0.85rem; }
        .plan-badge { padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .plan-badge.plus { background: #e8f0fe; color: #1a73e8; }
        .plan-badge.premium { background: #fef3e0; color: #e65100; }
        .plan-badge.exclusive { background: #f3e8fd; color: #7c3aed; }
        .btn-create { background: #c9a96e; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 500; margin-bottom: 1.5rem; }
        .btn-create:hover { background: #a07d4a; }
        .create-form { background: white; border-radius: 12px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .create-form h3 { margin-bottom: 1.5rem; font-size: 1.1rem; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-grid label { display: block; font-size: 0.75rem; font-weight: 600; color: #555; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.3rem; }
        .form-grid input, .form-grid select { width: 100%; padding: 0.7rem; border: 1.5px solid #e0e0e0; border-radius: 6px; font-size: 0.85rem; }
        .form-grid input:focus, .form-grid select:focus { border-color: #c9a96e; outline: none; }
        .form-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }
        .btn-save { background: #1a1a1a; color: white; border: none; padding: 0.7rem 1.5rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
        .btn-cancel { background: none; border: 1.5px solid #ddd; color: #666; padding: 0.7rem 1.5rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
        .clients-table, .guests-table { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .clients-table table, .guests-table table { width: 100%; border-collapse: collapse; }
        .clients-table th, .guests-table th { background: #fafafa; padding: 0.8rem 1rem; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; color: #999; text-align: left; }
        .clients-table td, .guests-table td { padding: 0.8rem 1rem; border-top: 1px solid #f5f5f5; font-size: 0.85rem; }
        .client-name { font-weight: 500; }
        .status-dot { font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 10px; }
        .status-dot.active { background: #dcfce7; color: #166534; }
        .status-dot.inactive { background: #fee2e2; color: #991b1b; }
        .status-badge-sm { font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 10px; text-transform: capitalize; }
        .status-badge-sm.confirmado { background: #dcfce7; color: #166534; }
        .status-badge-sm.pendiente { background: #fef9c3; color: #854d0e; }
        .status-badge-sm.rechazado { background: #fee2e2; color: #991b1b; }
        .actions { display: flex; gap: 0.3rem; }
        .actions button { background: none; border: none; cursor: pointer; font-size: 1rem; }
        .empty { text-align: center; padding: 3rem; color: #999; font-size: 0.9rem; }
        .events-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .event-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .event-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; margin-bottom: 0.3rem; }
        .event-type { color: #c9a96e; font-size: 0.8rem; text-transform: capitalize; }
        .event-date { color: #999; font-size: 0.8rem; margin: 0.5rem 0; }
        .event-stats { display: flex; gap: 1rem; font-size: 0.8rem; color: #666; margin: 0.5rem 0; }
        .event-plantilla { font-size: 0.75rem; color: #999; margin-top: 0.5rem; }
        .guests-count { color: #666; font-size: 0.9rem; margin-bottom: 1rem; }
        @media (max-width: 768px) {
          .admin-page { flex-direction: column; }
          .admin-sidebar { width: 100%; height: auto; position: relative; flex-direction: row; padding: 1rem; align-items: center; }
          .sidebar-nav { flex-direction: row; gap: 0.5rem; }
          .sidebar-role { margin-bottom: 0; margin-left: 1rem; }
          .sidebar-logout { margin-top: 0; margin-left: auto; }
          .admin-main { margin-left: 0; }
          .form-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  )
}
