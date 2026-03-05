import { createSupabaseServerClient } from '@/lib/supabase/server'
import Login from '@/components/Login'

export default async function Home() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Supabase Test</h1>

      {session ? (
        <>
          <p>✅ Logged in as:</p>
          <pre>{JSON.stringify(session.user, null, 2)}</pre>
        </>
      ) : (
        <>
          <p>❌ Not logged in</p>
          <Login />
        </>
      )}
    </main>
  )
}