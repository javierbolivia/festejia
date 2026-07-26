// Helper para crear clientes sin problemas de auth
import { supabase } from "./supabase"

export async function crearClienteConIntento(usuario, password, nombre, plan, nombreEvento, tipo) {
  const email = usuario + '@festejia.local'
  
  // Intento 1: signUp normal
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { usuario, nombre } }
    })
    
    if (error) throw error
    const userId = authData.user?.id
    if (!userId) throw new Error('No user ID returned')
    
    // Crear perfil
    await supabase.from('profiles').insert({
      id: userId,
      email,
      nombre,
      role: 'client',
      plan
    })
    
    // Crear evento
    await supabase.from('eventos').insert({
      user_id: userId,
      nombre_evento: nombreEvento || 'Mi Evento',
      tipo
    })
    
    return { success: true, userId, usuario, password }
  } catch (err) {
    console.error('Error creating client:', err)
    throw err
  }
}
