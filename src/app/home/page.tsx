'use client';
import LoginCard from "@/components/auth/LoginCard";
console.log(`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`);

export default function HomePage() {
  return (

    <div className="min-h-screen flex items-center justify-center">
<LoginCard/>
      <div className="atom-card p-8 flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold">Home Page</h1>
      </div>

      <div className="atom-card p-8 flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold">Home Page</h1>
      </div>

      <div className="b-card">
        <div className="b-card p-8 flex flex-col items-center gap-8">
          <h1 className="text-3xl font-bold">Home Page</h1>
        </div>
        <div className="b-card p-8 flex flex-col items-center gap-8">
          <h1 className="text-3xl font-bold">Home Page</h1>
        </div>
      </div>
    </div>
  );
}