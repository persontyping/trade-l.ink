import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  const { data, error } = await supabase
    .from("sessions")
    .select("user_id, not_after", { schema: "auth" })
    .gt("not_after", new Date().toISOString())

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  const validSessions = data.length
  const uniqueUsers = new Set(data.map(s => s.user_id)).size

  return Response.json({
    validSessions,
    uniqueUsers
  })
}