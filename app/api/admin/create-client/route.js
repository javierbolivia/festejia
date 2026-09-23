import { NextResponse } from 'next/server'
import { obtenerTokenDeRequest, crearClienteComoUsuario } from '../../../../lib/supabase-server'
import { crearClienteAdmin } from '../../../../lib/supabase-admin'

const PLANES = new Set(['plus', 'premium', 'exclusive'])
const TIPOS_EVENTO = new Set(['boda', 'quince', 'graduacion', 'bautizo', 'otro'])

async function verificarEsAdmin(token) {
  const supabaseAsUser = crearClienteComoUsuario(token)
  const { data: userData, error: userError } = await supabaseAsUser.auth.getUser()
  if (userError || !userData?.user) return false

  const { data: profile } = await supabaseAsUser
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single()

  return profile?.role === 'admin'
}

export async function POST(request) {
  let authUserId = null

  try {
    const token = obtenerTokenDeRequest(request)
    if (!token) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    if (!(await verificarEsAdmin(token))) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const body = await request.json()
    const usuario = String(body?.usuario || '').trim().toLowerCase()
    const password = String(body?.password || '')
    const nombre = String(body?.nombre || '').trim()
    const plan = String(body?.plan || 'plus')
    const nombreEvento = String(body?.nombre_evento || '').trim() || 'Mi Evento'
    const tipo = String(body?.tipo || 'boda')

    if (!/^[a-z0-9_-]{3,40}$/.test(usuario)) {
      return NextResponse.json({ error: 'El usuario debe tener entre 3 y 40 caracteres: letras, números, _ o -.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres.' }, { status: 400 })
    }
    if (!PLANES.has(plan) || !TIPOS_EVENTO.has(tipo)) {
      return NextResponse.json({ error: 'Plan o tipo de evento no válido.' }, { status: 400 })
    }

    const email = `${usuario}@festejia.local`
    const admin = crearClienteAdmin()
    const { data: authData, error: authError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })
    if (authError || !authData?.user?.id) {
      return NextResponse.json({ error: authError?.message || 'No se pudo crear el acceso del cliente.' }, { status: 409 })
    }
    authUserId = authData.user.id

    const { error: profileError } = await admin.from('profiles').upsert({
      id: authUserId,
      email,
      nombre: nombre || null,
      role: 'client',
      plan,
      activo: true,
    })
    if (profileError) throw profileError

    const { error: loginError } = await admin.from('clientes_login').insert({
      usuario,
      profile_id: authUserId,
      // Esta tabla heredada exige una columna password, pero el inicio de
      // sesión actual usa Supabase Auth. No se duplica ni guarda la clave
      // real en texto plano; queda una marca no autenticable.
      password: 'gestionada-por-supabase-auth',
    })
    if (loginError) throw loginError

    const { data: evento, error: eventError } = await admin.from('eventos').insert({
      user_id: authUserId,
      nombre_evento: nombreEvento,
      tipo,
    }).select('id, nombre_evento, tipo').single()
    if (eventError) throw eventError

    return NextResponse.json({
      ok: true,
      client: { id: authUserId, usuario, email, nombre, plan, evento },
    })
  } catch (error) {
    // No dejar datos parciales si un paso posterior a Auth falla. Borrar Auth
    // no borra automáticamente las tablas propias de la aplicación.
    if (authUserId) {
      try {
        const admin = crearClienteAdmin()
        const { data: partialEvents } = await admin.from('eventos').select('id').eq('user_id', authUserId)
        for (const event of partialEvents || []) {
          await admin.from('invitados').delete().eq('evento_id', event.id)
        }
        await admin.from('eventos').delete().eq('user_id', authUserId)
        await admin.from('clientes_login').delete().eq('profile_id', authUserId)
        await admin.from('profiles').delete().eq('id', authUserId)
        await admin.auth.admin.deleteUser(authUserId)
      } catch (_) {}
    }
    console.error('[api/admin/create-client] error:', error)
    return NextResponse.json({ error: error.message || 'No se pudo crear el cliente.' }, { status: 500 })
  }
}
