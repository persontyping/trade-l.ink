// src/app/about/page.tsx
import Layout from "@/components/layout/zzz-layout";

export default function DirectoryPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Directory</h1>
        <p className=" mb-4">
          Welcome to the Women Trades Directory! Our mission is to connect skilled women tradespeople with the communities that need their services.
        </p>
        <p className="">
          We provide an easy-to-use directory where verified women tradespeople can showcase their skills and get discovered.
        </p>
      </div>
    </Layout>
  );
}