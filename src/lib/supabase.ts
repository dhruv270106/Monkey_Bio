import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://esngrodyozljdjkfcocp.supabase.co'
const supabaseKey = 'sb_publishable_6DOFYKjxL3o2U1rs5Gd4cw_SitIaPwy'

export const supabase = createClient(supabaseUrl, supabaseKey)
