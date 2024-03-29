import { createClient } from "@supabase/supabase-js"

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''

if (!supabaseAnonKey) throw new Error('Supabase Anon key not found.')
if (!supabaseUrl) throw new Error('Supabase URL not found.')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)