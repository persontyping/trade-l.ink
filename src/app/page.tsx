import Layout from "@/components/layout/layout";

export default function Home() {
  return (
    <Layout>
      <main className="min-h-screen flex items-center justify-center ">


          <div className="flex items-center justify-center py-20">
            <div className="atom-card p-10 text-center max-w-md w-full">

              <h1 className="text-4xl tracking-widest mb-4">Women Trades Directory</h1>

              <p className="text-lg mb-6 text-[var(--color-text-secondary)]">
                A community directory connecting skilled women tradespeople with the community.
              </p>

              <button className="btn-atom" >
                Join the Directory
              </button>

            </div>
          </div>
      </main>
    </Layout>
  );
}