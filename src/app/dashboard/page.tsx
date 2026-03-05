// src/app/dashboard/page.tsx
import Layout from "@/components/layout/layout";
import { getUserFromSupabase } from "@/lib/supabase/server";

// ✅ Make the function async
export default async function Dashboard() {
    const user = await getUserFromSupabase();

    return (
        <Layout>
            <div className="min-h-screen flex flex-col bg-gray-50">


                <main className="flex-1 max-w-6xl mx-auto px-6 py-10">
                    <h1 className="text-2xl font-bold mb-4">
                        Welcome, {user?.email || 'User'}!
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Cards */}
                    </div>
                </main>

            </div>
        </Layout>);
}