import Layout from "@/components/layout/layout";

export default function SignupPage() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-1 max-w-md mx-auto px-6 py-10 w-full">
          <h1 className="text-2xl font-bold mb-2 text-center text-pink-600">
            Join the Directory
          </h1>

          <p className="text-gray-600 text-center mb-6">
            Create an account to list your trade services.
          </p>

          <form className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
            />

            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              Create Account
            </button>
          </form>
        </main>
      </div>
    </Layout>
  );
}