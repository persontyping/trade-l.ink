import loginAction from "@/app/actions/login";

export default function LoginForm() {
  return (
    <form
      action={loginAction}
      className="atom-card shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-6"
    >
      <h1 className="text-2xl font-bold text-center">Login</h1>

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
        <a href="/auth/signup" className="text-pink-600 hover:underline">
          Sign Up
        </a>
      </p>
    </form>
  );
}