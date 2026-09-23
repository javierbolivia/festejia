// lib/supabase-admin.js
//
// Cliente SERVER-ONLY con la Service Role Key de Supabase. Este cliente
// IGNORA Row Level Security y puede hacer operaciones administrativas de
// Auth (crear/borrar usuarios) que la anon key nunca puede hacer.
//
// NUNCA importar este archivo desde un componente 'use client' ni desde
// cualquier código que se ejecute en el navegador: la Service Role Key
// otorga acceso total a la base de datos, sin restricciones de RLS.
// Solo debe usarse dentro de Route Handlers (app/api/**/route.js).
//
// Corrección de auditoría (hallazgo 1.3): antes app/admin/page.js intentaba
// llamar a /auth/v1/admin/users/{id} directamente desde el navegador usando
// la anon key. Ese endpoint de administración de Supabase Auth SIEMPRE
// requiere la service_role key — con la anon key responde 401/403 en
// silencio (el código anterior descartaba el error con `.catch(() => {})`),
// así que el usuario de Auth nunca se borraba realmente, aunque el resto
// de sus datos (profile, eventos, invitados) sí. Este archivo centraliza el
// único lugar donde la service role key se usa.
import { createClient } from '@supabase/supabase-js'
import { supabaseUrl } from './supabase'

let cliente = null

/**
 * Devuelve un cliente Supabase con privilegios de administrador (Service
 * Role Key). Lanza un error explícito si la variable de entorno no está
 * configurada, en vez de fallar en silencio como hacía el código anterior.
 */
export function crearClienteAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY no está configurada. Agrégala en .env.local ' +
      '(desarrollo) y en Vercel -> Project Settings -> Environment Variables (producción).'
    )
  }
  if (!cliente) {
    cliente = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  }
  return cliente
}
