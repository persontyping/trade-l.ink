import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from("auth.sessions") // <- schema included here
    .select("user_id, not_after, updated_at")

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  const sessions = data ?? []
  const now = Date.now()

  const valid = sessions.filter(s =>
    new Date(s.not_after).getTime() > now
  )

  const expiringSoon = valid.filter(s =>
    new Date(s.not_after).getTime() - now < 10 * 60 * 1000
  )

  const stale = valid.filter(s =>
    new Date(s.updated_at).getTime() < now - 30 * 60 * 1000
  )

  const users = new Set(valid.map(s => s.user_id))

  return Response.json({
    validSessions: valid.length,
    uniqueUsers: users.size,
    expiringSoon: expiringSoon.length,
    staleSessions: stale.length,
    sessionsPerUser: valid.length / Math.max(users.size, 1)
  })
}