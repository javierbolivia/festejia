/*
 * Prueba funcional de solo lectura para una cuenta Imperial.
 *
 * Requiere en el entorno:
 *   QA_IMPERIAL_EMAIL
 *   QA_IMPERIAL_PASSWORD
 *
 * Usa NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY de .env.local.
 * No crea, actualiza ni elimina datos.
 */
const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

function loadLocalEnv() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) return

  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (!match) continue
    const key = match[1].trim()
    const value = match[2].trim().replace(/^['"]|['"]$/g, '')
    if (!process.env[key]) process.env[key] = value
  }
}

async function main() {
  loadLocalEnv()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const email = process.env.QA_IMPERIAL_EMAIL
  const password = process.env.QA_IMPERIAL_PASSWORD

  if (!url || !anonKey || !email || !password) {
    throw new Error('Faltan NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, QA_IMPERIAL_EMAIL o QA_IMPERIAL_PASSWORD.')
  }

  const supabase = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  try {
    const { data: auth, error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError || !auth.user) throw authError || new Error('No se pudo iniciar sesión.')

    const userId = auth.user.id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, plan, activo')
      .eq('id', userId)
      .single()
    if (profileError) throw profileError

    const { data: events, error: eventsError } = await supabase
      .from('eventos')
      .select('id')
      .eq('user_id', userId)
      .limit(1)
    if (eventsError) throw eventsError

    const eventId = events?.[0]?.id
    if (!eventId) throw new Error('La cuenta Imperial no tiene un evento propio.')

    const { data: guests, error: guestsError } = await supabase
      .from('invitados')
      .select('estado, ingreso')
      .eq('evento_id', eventId)
    if (guestsError) throw guestsError

    const assertions = {
      clientImperial: profile?.role === 'client' && profile?.plan === 'exclusive' && profile?.activo === true,
      ownsEvent: events.length === 1,
      checkinHasConfirmedGuest: guests.some((guest) => guest.estado === 'confirmado' && !guest.ingreso),
      pendingGuestsRemainBlocked: guests.some((guest) => guest.estado === 'pendiente'),
    }

    const failed = Object.entries(assertions).filter(([, passed]) => !passed).map(([name]) => name)
    if (failed.length) throw new Error(`Fallaron las verificaciones: ${failed.join(', ')}`)

    console.log(`Prueba Imperial correcta: ${guests.length} invitados verificados.`)
  } finally {
    await supabase.auth.signOut()
  }
}

main().catch((error) => {
  console.error(`Prueba Imperial falló: ${error.message}`)
  process.exitCode = 1
})
