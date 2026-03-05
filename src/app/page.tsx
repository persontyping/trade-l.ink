import Layout from "@/components/layout/layout";

export default function Home() {
  return (
    <Layout>
      <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-xl p-10 max-w-lg w-full text-center">
          <h1 className="text-4xl font-extrabold text-pink-600">
            Women Trades Directory
          </h1>

          <p className="mt-4 text-gray-700 text-lg">
            A community directory connecting skilled women tradespeople with the community.
          </p>

          <a
            href="/signup"
            className="mt-6 inline-block px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors"
          >
            Join the Directory
          </a>
        </div>
      </main>
    </Layout>
  );
}