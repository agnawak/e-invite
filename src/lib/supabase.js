import { createClient } from '@supabase/supabase-js'

// Supply your values in a .env file or your hosting environment as:
// VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
// Example (.env):
// VITE_SUPABASE_URL=https://your-project.supabase.co
// VITE_SUPABASE_ANON_KEY=your-anon-key

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
