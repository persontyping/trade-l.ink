'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'

export async function logout() {
  const cookieStore = await cookies()

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      }
    )

    // 1️⃣ Get current user session
    const { data: { session } } = await supabase.auth.getSession()
    const userId = session?.user?.id

    // 2️⃣ Delete user-specific artifacts in your DB (optional)
    if (userId) {
      // Example: delete all rows for this user in a 'user_data' table
      await supabase.from('user_data').delete().eq('user_id', userId)
    }

    // 3️⃣ Sign out from Supabase
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.warn('Supabase logout error:', error.message)
    }

    // 4️⃣ Optionally clear any extra cookies manually
    cookieStore.getAll().forEach((c) => cookieStore.delete(c.name))

  } catch (err) {
    console.error('Unexpected logout failure:', err)
  }

  // 5️⃣ Redirect immediately to home page
  redirect('/')
}