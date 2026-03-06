"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/browser'

export default function SignUpPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    confirm_email: '',
    bio: '',
    password: '',
    confirm_password: '',
  })

  const Rule = ({ ok, text }: { ok: boolean; text: string }) => (
    <div className={`text-sm ${ok ? 'text-green-600' : 'text-gray-500'}`}>
      {ok ? '✓' : '•'} {text}
    </div>
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // EMAIL VALIDATION
  const emailValid = /\S+@\S+\.\S+/.test(form.email)

  const emailsMatch =
    form.email !== '' &&
    form.confirm_email !== '' &&
    form.email === form.confirm_email

  // PASSWORD VALIDATION
  const passwordRules = {
    length: form.password.length >= 10,
    upper: /[A-Z]/.test(form.password),
    lower: /[a-z]/.test(form.password),
    number: /\d/.test(form.password),
    symbol: /[\W_]/.test(form.password),
  }

  const passwordStrong =
    passwordRules.length &&
    passwordRules.upper &&
    passwordRules.lower &&
    passwordRules.number &&
    passwordRules.symbol

  const passwordsMatch =
    form.password !== '' &&
    form.confirm_password !== '' &&
    form.password === form.confirm_password

  const formValid =
    emailValid &&
    emailsMatch &&
    passwordStrong &&
    passwordsMatch &&
    form.first_name &&
    form.last_name

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formValid) return

    setLoading(true)
    setServerError(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            first_name: form.first_name,
            last_name: form.last_name,
            phone: form.phone,
          },
        },
      })

      if (error) {
        setServerError(error.message)
        setLoading(false)
        return
      }

      const userId = data.user?.id

      if (!userId) {
        setServerError('User ID missing')
        setLoading(false)
        return
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone,
          bio: form.bio,
        })

      if (profileError) {
        setServerError(profileError.message)
        setLoading(false)
        return
      }

      router.push('/auth/login?success=Account created')
    } catch (err: any) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="member-profile min-h-screen flex items-center justify-center px-6">
      <div className="member-profile max-w-md w-full bg-white p-6 rounded shadow-md">

        <h1 className="member-profile text-2xl font-semibold mb-4">Create Account!</h1>

        <form className="member-profile-form space-y-4" onSubmit={handleSubmit}>

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
            className="border p-2 w-full rounded"
          />

          {!emailValid && form.email && (
            <p className="text-green-500 text-sm">Invalid email address</p>
          )}

          <input
            name="confirm_email"
            placeholder="Confirm Email"
            value={form.confirm_email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          {!emailsMatch && form.confirm_email && (
            <p className="text-pink-500 text-sm">Emails do not match</p>
          )}

          <textarea
            name="bio"
            placeholder="Short Bio"
            value={form.bio}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <div className="space-y-1">
            <Rule ok={passwordRules.length} text="At least 10 characters" />
            <Rule ok={passwordRules.upper} text="Uppercase letter" />
            <Rule ok={passwordRules.lower} text="Lowercase letter" />
            <Rule ok={passwordRules.number} text="Number" />
            <Rule ok={passwordRules.symbol} text="Symbol" />
          </div>

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={form.confirm_password}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          {!passwordsMatch && form.confirm_password && (
            <p className="text-red-500 text-sm">Passwords do not match</p>
          )}

          <button
            type="submit"
            disabled={!formValid || loading}
            className="btn-atom w-full disabled:opacity-50"
          >
            {loading ? 'Creating Account…' : 'Sign Up'}
          </button>

        </form>

        {serverError && (
          <p className="text-red-600 mt-4 text-sm">{serverError}</p>
        )}

      </div>
    </div>
  )
}