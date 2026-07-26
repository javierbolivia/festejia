'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function GestorLite() {
  const [user, setUser] = useState(null)
  const [evento, setEvento] = useState(null)
  const [invitados, setInvitados] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPases, setNewPases] = useState(1)

  useEffect(() => { checkUser() }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }
    setUser(user)

    const { data: prof } = await supabase.from('profiles').select('role,plan').eq('id', user.id).single()
    if (prof && prof.role === 'admin') { window.location.href = '/admin'; return }
    if (prof && prof.plan === 'exclusive') { window.location.href = '/panel'; return }

    const { data: eventos } = await supabase.from('eventos').select('*').eq('user_id', user.id).limit(1)
    if (eventos && eventos.length > 0) {
      setEvento(eventos[0])
      const { data: invs } = await supabase.from('invitados').select('*').eq('evento_id', eventos[0].id).order('created_at', { ascending: false })
      if (invs) setInvitados(invs)
    }
    setLoading(false)
  }

  async function addGuest(e) {
    e.preventDefault()
    if (!evento || !newName.trim()) return
    const { data } = await supabase.from('invitados').insert([{ nombre_completo: newName, num_pases: newPases, evento_id: evento.id }]).select()
    if (data) {
      setInvitados([data[0], ...invitados])
      setNewName('')
      setNewPases(1)
      setShowForm(false)
    }
  }

  async function deleteGuest(id) {
    if (!confirm('¿Eliminar?')) return
    await supabase.from('invitados').delete().eq('id', id)
    setInvitados(invitados.filter(g => g.id !== id))
  }

  function getLink(guest) {
    return `https://festejia.vercel.app/plantilla1/?m=${encodeURIComponent(guest.nombre_completo)}&n=${encodeURIComponent(guest.num_pases + ' pases')}&id=${guest.id}`
  }

  function copyLink(guest) {
    const msg = evento?.mensaje_personalizado || 'Estás invitado a nuestra celebración. Confirma tu asistencia.'
    navigator.clipboard.writeText(msg + '\n\n' + getLink(guest))
    alert('Link copiado')
  }

  function sendWhatsApp(guest) {
    const msg = evento?.mensaje_personalizado || 'Estás invitado a nuestra celebración. Confirma tu asistencia.'
    const text = encodeURIComponent(msg + '\n\n' + getLink(guest))
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (loading) return <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh',color:'#666'}}>Cargando...</div>

  const confirmados = invitados.filter(g => g.estado === 'confirmado').length
  const pendientes = invitados.filter(g => g.estado === 'pendiente').length

  return (
    <div className="gestor-page">
      <header className="gestor-header">
        <a href="/" className="gestor-logo">Feste<span>jia</span></a>
        <div className="gestor-right">
          <span>{user?.email?.replace('@festejia.local', '')}</span>
          <button onClick={logout}>Salir</button>
        </div>
      </header>

      <div className="gestor-body">
        <div className="gestor-title">
          <h1>{evento?.nombre_evento || 'Mi Evento'}</h1>
          <p>{confirmados} confirmados · {pendientes} pendientes · {invitados.length} total</p>
        </div>

        <div className="gestor-actions">
          <button className="btn-add" onClick={() => setShowForm(!showForm)}>+ Agregar Invitado</button>
        </div>

        {showForm && (
          <form onSubmit={addGuest} className="add-form">
            <input placeholder="Nombre completo" value={newName} onChange={e => setNewName(e.target.value)} required />
            <input type="number" min="1" value={newPases} onChange={e => setNewPases(parseInt(e.target.value) || 1)} style={{width:'70px'}} />
            <button type="submit">Guardar</button>
          </form>
        )}

        <div className="gestor-table">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Pases</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {invitados.map(g => (
                <tr key={g.id}>
                  <td className="name">{g.nombre_completo}</td>
                  <td>{g.num_pases}</td>
                  <td><span className={`estado ${g.estado}`}>{g.estado}</span></td>
                  <td className="actions">
                    <button onClick={() => copyLink(g)} title="Copiar link">📋</button>
                    <button onClick={() => sendWhatsApp(g)} title="Enviar WhatsApp">💬</button>
                    <button onClick={() => deleteGuest(g.id)} title="Eliminar">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {invitados.length === 0 && <p className="empty">Agrega tu primer invitado</p>}
        </div>
      </div>

      <style jsx>{`
        .gestor-page { min-height: 100vh; background: #fafafa; font-family: 'Raleway', sans-serif; }
        .gestor-header { background: #1a1a1a; padding: 0.8rem 1.5rem; display: flex; justify-content: space-between; align-items: center; }
        .gestor-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; color: white; text-decoration: none; }
        .gestor-logo span { color: #c9a96e; }
        .gestor-right { display: flex; align-items: center; gap: 1rem; }
        .gestor-right span { color: rgba(255,255,255,0.6); font-size: 0.8rem; }
        .gestor-right button { background: none; border: 1px solid rgba(255,255,255,0.3); color: white; padding: 0.3rem 0.7rem; border-radius: 4px; cursor: pointer; font-size: 0.7rem; }
        .gestor-body { max-width: 700px; margin: 0 auto; padding: 2rem 1rem; }
        .gestor-title h1 { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; margin-bottom: 0.3rem; }
        .gestor-title p { color: #666; font-size: 0.85rem; margin-bottom: 1.5rem; }
        .gestor-actions { margin-bottom: 1rem; }
        .btn-add { background: #c9a96e; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
        .add-form { display: flex; gap: 0.5rem; margin-bottom: 1rem; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }
        .add-form input { padding: 0.5rem; border: 1.5px solid #e0e0e0; border-radius: 6px; font-size: 0.85rem; flex: 1; }
        .add-form button { background: #1a1a1a; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
        .gestor-table { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }
        .gestor-table table { width: 100%; border-collapse: collapse; }
        .gestor-table th { background: #f5f5f5; padding: 0.7rem 1rem; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; color: #999; text-align: left; }
        .gestor-table td { padding: 0.7rem 1rem; border-top: 1px solid #f0f0f0; font-size: 0.85rem; }
        .name { font-weight: 500; }
        .estado { padding: 0.2rem 0.5rem; border-radius: 8px; font-size: 0.7rem; text-transform: capitalize; }
        .estado.confirmado { background: #dcfce7; color: #166534; }
        .estado.pendiente { background: #fef9c3; color: #854d0e; }
        .estado.rechazado { background: #fee2e2; color: #991b1b; }
        .actions { display: flex; gap: 0.3rem; }
        .actions button { background: none; border: none; cursor: pointer; font-size: 1rem; }
        .empty { text-align: center; padding: 2rem; color: #999; font-size: 0.85rem; }
        @media (max-width: 600px) {
          .add-form { flex-direction: column; }
        }
      `}</style>
    </div>
  )
}
