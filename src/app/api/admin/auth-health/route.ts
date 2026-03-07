import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    // fetch all users
    const { data, error } = await supabase.auth.admin.listUsers({ limit: 1000 })

    if (error) throw error
    // normalize the array safely
    const usersArray: any[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.users)
        ? data.users
        : []

    console.log("usersArray length:", usersArray.length)
        console.log("Normalized usersArray:", usersArray)


    let validSessionsCount = 0
    let staleSessionsCount = 0
    let expiringSoonCount = 0
    const userIds = new Set<string>()
    const now = Date.now()

    usersArray.forEach(user => {
      if (user.last_sign_in_at) {
        const lastSignIn = new Date(user.last_sign_in_at).getTime()
        const sessionAge = now - lastSignIn

        if (sessionAge < 30 * 60 * 1000) validSessionsCount += 1
        if (sessionAge > 30 * 60 * 1000) staleSessionsCount += 1
        if (sessionAge < 10 * 60 * 1000) expiringSoonCount += 1
      }
    })

    return Response.json({
      validSessions: validSessionsCount,
      uniqueUsers: userIds.size,
      staleSessions: staleSessionsCount,
      expiringSoon: expiringSoonCount,
      openSessions: usersArray.length,
   
    })

  } catch (err: any) {
    console.error("Supabase admin error:", err)
    return Response.json({ error: err.message || "Internal server error" }, { status: 500 })
  }
}