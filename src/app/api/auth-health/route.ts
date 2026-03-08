import { createClient, type User } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  try {
    // fetch all users
    const { data, error } = await supabase.auth.admin.listUsers()

    if (error) throw error

    // properly typed users array
    const usersArray: User[] = data?.users ?? []

    console.log("usersArray length:", usersArray.length)
    console.log("Normalized usersArray:", usersArray)

    let validSessionsCount = 0
    let staleSessionsCount = 0
    let expiringSoonCount = 0
    const userIds = new Set<string>()
    const now = Date.now()

usersArray.forEach((user: User) => {
  userIds.add(user.id)

  // handle users that never signed in
  if (!user.last_sign_in_at) {
    staleSessionsCount++
    return
  }

  const lastSignIn = new Date(user.last_sign_in_at).getTime()
  const sessionAge = now - lastSignIn

  if (sessionAge < 30 * 60 * 1000) validSessionsCount++
  if (sessionAge > 30 * 60 * 1000) staleSessionsCount++
  if (sessionAge < 10 * 60 * 1000) expiringSoonCount++
})

    return Response.json({
      validSessions: validSessionsCount,
      uniqueUsers: userIds.size,
      staleSessions: staleSessionsCount,
      expiringSoon: expiringSoonCount,
      openSessions: usersArray.length,
    })

  } catch (err: unknown) {
    console.error("Supabase admin error:", err)

    const message =
      err instanceof Error ? err.message : "Internal server error"

    return Response.json({ error: message }, { status: 500 })
  }
}