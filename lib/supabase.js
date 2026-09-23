import { createClient } from '@supabase/supabase-js'

// Corrección de auditoría (hallazgo 2.2): antes URL y anon key eran literales
// hardcodeados aquí y duplicados en app/admin/page.js y app/invitacion/[id]/page.js.
// Ahora se leen de variables de entorno (.env.local / Vercel), con el mismo
// valor de siempre como fallback para no romper ningún entorno que aún no
// tenga la variable configurada. Se exportan como constantes nombradas para
// que lib/supabase-server.js pueda construir un cliente autenticado como el
// usuario que hace la petición, sin duplicar estos valores en un tercer archivo.
export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xzkxutllxkdrugjvflco.supabase.co'
export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6a3h1dGxseGtkcnVnanZmbGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NTE0MTgsImV4cCI6MjEwMDUyNzQxOH0.s3icP7S33TEWVL77edSFe8svSgC2AqTQe3lB0WYDrXk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
