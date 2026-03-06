"use client";

import { useState } from "react";

function logClient(message: string, data?: any) {
  console.log(`[${new Date().toISOString()}] [LoginCard] ${message}`, data || "");
}

logClient("Sending action", { action, email, password: password ? "***" : undefined });
const res = await fetch("/auth/routes", { method: "POST", body: formData });
const data = await res.json();

logClient("Server response", data);

interface LoginCardProps {
  title?: string;
  signupUrl?: string;
  className?: string;
}

export default function LoginCard({
  title = "Login",
  signupUrl = "/auth/signup",
  className = "",
}: LoginCardProps) {
  const [modal, setModal] = useState<"magicLink" | "resetPassword" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleAction(action: string) {
    const formData = new FormData();
    formData.set("action", action);
    formData.set("email", email);
    if (password) formData.set("password", password);
    if (newPassword) formData.set("newPassword", newPassword);

    const res = await fetch("/auth/routes", { method: "POST", body: formData });
    const data = await res.json();

    if (data.redirectTo) {
      window.location.href = data.redirectTo;
    } else if (data.success) {
      setMessage(data.success);
    } else if (data.showModal) {
      setModal("magicLink");
    } else if (data.error) {
      setMessage(data.error);
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 ${className}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAction("loginPassword");
        }}
        className="atom-card shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-6"
      >
        <h1 className="text-2xl font-bold text-center">{title}</h1>

        <label className="flex flex-col">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </label>

        <label className="flex flex-col">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <button
          type="button"
          className="mt-2 text-sm text-pink-600 hover:underline"
          onClick={() => setModal("magicLink")}
        >
          Forgot password?
        </button>
      </form>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md flex flex-col gap-4">
            {modal === "magicLink" && (
              <>
                <h2 className="text-xl font-bold text-center">Send Magic Link</h2>
                <p className="text-sm text-gray-500 text-center">
                  A magic link will be sent to your email.
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                  onClick={() => handleAction("loginMagicLink")}
                >
                  Send Magic Link
                </button>
              </>
            )}

            {modal === "resetPassword" && (
              <>
                <h2 className="text-xl font-bold text-center">Reset Password</h2>
                <label className="flex flex-col">
                  <span>New Password</span>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                  />
                </label>
                <button
                  className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                  onClick={() => handleAction("updatePassword")}
                >
                  Update Password
                </button>
              </>
            )}

            {message && <p className="text-center text-sm mt-2">{message}</p>}

            <button
              className="mt-4 text-sm text-gray-500 hover:underline self-center"
              onClick={() => {
                setModal(null);
                setMessage(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}