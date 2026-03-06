'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabase/browser";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleReset(e: SubmitEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password updated successfully!");
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl mb-4">Reset your password</h1>

      <form onSubmit={(e) => handleReset(e.nativeEvent)}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full"
        />

        <button className="btn-atom w-full">Update Password</button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}