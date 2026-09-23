import { NextResponse } from 'next/server'
import { obtenerTokenDeRequest, crearClienteComoUsuario } from '../../../../lib/supabase-server'
import { crearClienteAdmin } from '../../../../lib/supabase-admin'

export async function GET(request) {
  const token = obtenerTokenDeRequest(request)
  if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabaseAsUser = crearClienteComoUsuario(token)
  const { data: userData, error: userError } = await supabaseAsUser.auth.getUser()
  if (userError || !userData?.user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { data: profile } = await supabaseAsUser
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .maybeSingle()
  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Solo administradores' }, { status: 403 })

  const { data, error } = await crearClienteAdmin().from('express_clientes').select('id')
  if (error) {
    console.error('No se pudieron leer los clientes Express:', error)
    return NextResponse.json({ error: 'No se pudieron cargar los clientes Express' }, { status: 500 })
  }
  return NextResponse.json({ ids: data.map((client) => client.id) })
}
