'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { revalidatePath } from 'next/cache'

export async function logout() {

  const cookieStore = await cookies()

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
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

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.warn('Supabase logout error:', error.message)
    }

  } catch (err) {
    console.error('Unexpected logout failure:', err)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}