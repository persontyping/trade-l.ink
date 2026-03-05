import { createSupabaseServerClient } from '@/lib/supabase/server'
import Login from '@/components/Login'

export default async function Home() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg">
        <h1 className="text-3xl font-bold text-pink-600">
          Women Trades Directory
        </h1>

        <p className="mt-4 text-gray-600">
          A community directory for women in trades.
        </p>

        <button className="mt-6 px-5 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
          Join the Directory
        </button>
      </div>
    </main>
  )
}