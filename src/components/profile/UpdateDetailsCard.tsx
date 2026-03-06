"use client";
import { useState } from "react";
import updateDetailsAction from "@/app/actions/profile";

export default function UpdateDetailsCard() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.set("newPassword", password);

    const res = await updateDetailsAction(formData);

    if (res?.success) setMessage(res.success);
    if (res?.error) setMessage(res.error);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="atom-card shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-6"
    >
      <h1 className="text-2xl font-bold text-center">Set New Password</h1>

      <label className="flex flex-col">
        <span>New Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
        />
      </label>

      <label className="flex flex-col">
        <span>Confirm Password</span>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
        />
      </label>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
      >
        Update Password
      </button>

      {message && (
        <p className="text-center text-sm mt-2 text-gray-600">{message}</p>
      )}
    </form>
  );
}