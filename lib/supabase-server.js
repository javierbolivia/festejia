// lib/supabase-server.js
//
// Helper SERVER-ONLY para Route Handlers que necesitan verificar la sesión
// real del usuario que hace la petición (no el anon key "a secas").
//
// Por qué existe: lib/supabase.js exporta un cliente con la anon key, correcto
// para usarse desde el navegador donde el propio SDK gestiona la sesión vía
// cookies/localStorage. Pero un Route Handler no tiene esa sesión de forma
// automática — el navegador debe reenviar el access_token, y el servidor debe
// construir un cliente que lo use para que Row Level Security (RLS) evalúe
// auth.uid() correctamente en cada consulta.
//
// Uso típico en un route.js:
//   const token = obtenerTokenDeRequest(request)
//   if (!token) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
//   const supabaseAsUser = crearClienteComoUsuario(token)
//   const { data: { user } } = await supabaseAsUser.auth.getUser()
//   if (!user) return NextResponse.json({ error: 'Sesión inválida' }, { status: 401 })
//   // A partir de aquí, cualquier query de supabaseAsUser respeta RLS como ese user.
import { createClient } from '@supabase/supabase-js'
import { supabaseUrl, supabaseAnonKey } from './supabase'

/**
 * Extrae el JWT del header `Authorization: Bearer <token>` de un Request
 * de un Route Handler de Next.js (App Router).
 * @param {Request} request
 * @returns {string|null}
 */
export function obtenerTokenDeRequest(request) {
  const header = request.headers.get('authorization') || request.headers.get('Authorization')
  if (!header || !header.startsWith('Bearer ')) return null
  return header.slice('Bearer '.length).trim() || null
}

/**
 * Crea un cliente Supabase que actúa como el usuario dueño del `accessToken`
 * dado. Cualquier query hecha con este cliente pasa por RLS evaluando
 * auth.uid() = ese usuario, exactamente igual que si la hiciera el propio
 * navegador del usuario.
 * @param {string} accessToken
 */
export function crearClienteComoUsuario(accessToken) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
