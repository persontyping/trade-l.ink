import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

await supabase.auth.signInWithOtp({
  email: "persontyping@pm.me",
  options: {
    emailRedirectTo: "http://localhost:3000/auth/callback",
  },
});