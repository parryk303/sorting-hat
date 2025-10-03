import { supabase } from "../lib/supabase"

export default async function signOut({ router }) {
    await supabase.auth.signOut()
    router.push('/')
}