// app/api/admin/delete-user/route.js
//
// Route Handler server-only. Elimina por completo a un cliente Premium:
// sus invitados, sus eventos, su fila en clientes_login, su profile, y
// finalmente su usuario real en Supabase Auth.
//
// Corrección de auditoría (hallazgos 1.3 y 2.2): antes app/admin/page.js
// hacía este borrado de Auth con un fetch directo desde el navegador usando
// la anon key (que no tiene permiso para esa operación, así que fallaba
// siempre en silencio) y con las credenciales de Supabase hardcodeadas en
// el propio archivo del panel. Ahora:
//   - La operación se ejecuta en el servidor con la Service Role Key
//     (lib/supabase-admin.js), que sí puede borrar usuarios de Auth.
//   - El caller debe demostrar sesión válida Y rol admin antes de que se
//     ejecute nada (ver verificarEsAdmin más abajo).
import { NextResponse } from 'next/server'
import { obtenerTokenDeRequest, crearClienteComoUsuario } from '../../../../lib/supabase-server'
import { crearClienteAdmin } from '../../../../lib/supabase-admin'

/**
 * Verifica que el token recibido pertenezca a un usuario con profiles.role = 'admin'.
 * Usa un cliente autenticado como ese usuario (RLS real), igual que ya hace
 * app/admin/page.js en el navegador — este endpoint replica esa misma
 * verificación en el servidor antes de conceder ninguna operación destructiva.
 */
async function verificarEsAdmin(token) {
  const supabaseAsUser = crearClienteComoUsuario(token)
  const { data: userData, error: userError } = await supabaseAsUser.auth.getUser()
  if (userError || !userData?.user) return { esAdmin: false, user: null }

  const { data: profile } = await supabaseAsUser
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single()

  return { esAdmin: profile?.role === 'admin', user: userData.user }
}

export async function POST(request) {
  try {
    const token = obtenerTokenDeRequest(request)
    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { esAdmin } = await verificarEsAdmin(token)
    if (!esAdmin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const body = await request.json()
    const { clientId } = body || {}
    if (!clientId) {
      return NextResponse.json({ error: 'Falta clientId' }, { status: 400 })
    }

    const admin = crearClienteAdmin()

    // 1. Borrar invitados de todos los eventos del cliente.
    const { data: evts } = await admin.from('eventos').select('id').eq('user_id', clientId)
    if (evts?.length) {
      for (const evt of evts) {
        await admin.from('invitados').delete().eq('evento_id', evt.id)
      }
      await admin.from('eventos').delete().eq('user_id', clientId)
    }

    // 2. Borrar credenciales legacy y perfil.
    await admin.from('clientes_login').delete().eq('profile_id', clientId)
    await admin.from('profiles').delete().eq('id', clientId)

    // 3. Borrar el usuario real de Supabase Auth (esto es lo que antes
    // fallaba en silencio con la anon key desde el navegador).
    const { error: errAuthDelete } = await admin.auth.admin.deleteUser(clientId)
    if (errAuthDelete) {
      // Los datos de la app ya se borraron; se informa igual el fallo de Auth
      // para que quede visible en vez de desaparecer silenciosamente.
      return NextResponse.json(
        { warning: 'Datos del cliente eliminados, pero no se pudo borrar el usuario de Auth: ' + errAuthDelete.message },
        { status: 207 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/admin/delete-user] error:', err)
    return NextResponse.json({ error: err.message || 'No se pudo eliminar el cliente' }, { status: 500 })
  }
}
