import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xzkouttlxkdrugvflco.supabase.co'
const supabaseKey = 'sb_publishable_KMCbugyMkooIWQI31bFsEA_FB7d9UbK'

export const supabase = createClient(supabaseUrl, supabaseKey)
