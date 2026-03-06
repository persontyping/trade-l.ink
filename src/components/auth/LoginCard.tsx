"use client";
import loginAction from "@/app/actions/login";
import { useState } from "react";
import sendLoginLink from "@/app/actions/sendPasswordReset";

async function handleSendLoginLink(email: string) {
  const formData = new FormData();
  formData.set("email", email);

  const res = await sendLoginLink(formData);

  if (res?.success) {
    //alert(res.success);
  }

  if (res?.error) {
    //alert(res.error);
  }
}

interface LoginCardProps {
  title?: string;
  signupUrl?: string;
  className?: string;
  onSuccessRedirect?: string; // optional override
}

export default function LoginCard({
  title = "Login",
  signupUrl = "/auth/signup",
  className = "",
  onSuccessRedirect = "/dashboard",
}: LoginCardProps) {
  const [modal, setModal] = useState<{ email: string } | null>(null);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await loginAction(formData);

    // Redirect if login successful
    if (res.redirectTo) {
      window.location.href = res.redirectTo;
    }
    // Show modal if password login failed
    else if (res.showModal) {
      setModal({ email: res.email });
    }
    else if (res.error) {
      alert(res.error);
    }
    else if (res.success) {
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

          <label className="flex flex-col">
            <span>Email</span>
            <input
              name="email"
              type="email"
              required
              className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </label>

          <label className="flex flex-col">
            <span>Password</span>
            <input
              name="password"
              type="password"
              required
              className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </label>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Log In
          </button>

          <p className="text-sm text-gray-500 text-center">
            Don&apos;t have an account?{" "}
            <a href={signupUrl} className="text-pink-600 hover:underline">
              Sign Up
            </a>
          </p>
        </form>

        {modal && (
          <div className="flex-1 h-full border border-pink-600 flex rounded-lg z-50 mt-30">
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