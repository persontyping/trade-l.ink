"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/browser"

interface EditProfileProps {
  userId: string
}

export default function EditMemberProfile({ userId }: EditProfileProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    bio: "",
  })

  useEffect(() => {
    // Fetch current profile
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name,last_name,phone,bio")
        .eq("id", userId)
        .single()

      if (error) {
        console.error("Error fetching profile:", error.message)
        setServerError(error.message)
        return
      }

      // fetch email separately
      const { data: userData, error: userError } = await supabase.auth.getUserById(userId)
      if (userError) console.error("Error fetching user email:", userError.message)

      setForm({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        phone: data.phone || "",
        bio: data.bio || "",
        email: userData?.user?.email || "",
      })
    }

    fetchProfile()
  }, [userId])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setServerError(null)

    try {
      // Update email if changed
      if (form.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: form.email,
        })
        if (emailError) throw emailError
      }

      // Update profile table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone,
          bio: form.bio,
        })
        .eq("id", userId)

      if (profileError) throw profileError

      router.push("/dashboard")
    } catch (err: any) {
      console.error("Update failed:", err)
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />

          <input
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />

          <textarea
            name="bio"
            placeholder="Short Bio"
            value={form.bio}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-atom w-full disabled:opacity-50"
          >
            {loading ? "Updating…" : "Update Profile"}
          </button>
        </form>

        {serverError && (
          <p className="text-red-600 mt-4 text-sm">{serverError}</p>
        )}
      </div>
    </div>
  )
}