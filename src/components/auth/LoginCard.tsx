"use client";
import loginAction from "@/app/actions/login";
import { useState } from "react";
import sendLoginLink from "@/app/actions/sendPasswordReset";

async function handleSendLoginLink(email: string) {
  const formData = new FormData();
  formData.set("email", email);

  const res = await sendLoginLink(formData);

  if (res?.success) {
    alert(res.success);
  }

  if (res?.error) {
    alert(res.error);
  }
}

interface LoginCardProps {
  title?: string;
  signupUrl?: string;
  className?: string;
  onSuccessRedirect?: string;
}

export default function LoginCard({
  title = "Login",
  signupUrl = "/auth/signup",
  className = "",
  onSuccessRedirect = "/dashboard",
}: LoginCardProps) {

  const [modal, setModal] = useState<{ email: string } | null>(null);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    form?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  function validate(email: string, password: string) {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validationErrors = validate(email, password);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const res = await loginAction(formData);

    setLoading(false);

    if (res?.redirectTo) {
      window.location.href = res.redirectTo;
    } else if (res?.showModal) {
      setModal({ email: res.email });
    } else if (res?.error) {
      setErrors({ form: res.error });
    } else if (res?.success) {
      alert(res.success);
    }
  }

  return (
    <>
      <section className="flex flex-row items-start justify-center min-h-screen gap-4 p-4">

        <form
          onSubmit={handleSubmit}
          className={`atom-card shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-6 ${className}`}
        >

          <h1 className="text-2xl font-bold text-center">{title}</h1>

          {errors.form && (
            <div className="text-red-600 text-sm text-center">
              {errors.form}
            </div>
          )}

          <label className="flex flex-col">
            <span>Email</span>

            <input
              name="email"
              type="email"
              className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
            />

            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email}
              </span>
            )}
          </label>

          <label className="flex flex-col">
            <span>Password</span>

            <input
              name="password"
              type="password"
              className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
            />

            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                {errors.password}
              </span>
            )}
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Don&apos;t have an account?{" "}
            <a href={signupUrl} className="text-pink-600 hover:underline">
              Sign Up
            </a>
          </p>

        </form>

        {modal && (
          <div className="flex-1 h-full border border-pink-600 flex flex-col items-center justify-center rounded-lg z-50 mt-30 p-6 gap-4">

            <p className="text-center">
              Password login failed. You can receive a magic login link instead.
            </p>

            <button
              onClick={() => handleSendLoginLink(modal.email)}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Email me a login link
            </button>

          </div>
        )}

      </section>
    </>
  );
}