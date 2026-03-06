import AuthForm from "@/components/auth/AuthForm";
import CardC from "@/components/layout/Card-c";

export default function LoginPage() {
  return (

    <section className="flex flex-row items-start justify-center min-h-screen gap-4 p-4">
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-4 rounded shadow">
        <CardC />
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-50 p-4 rounded shadow">
        <AuthForm />
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-100 p-4 rounded shadow">
        <CardC />
      </div>
    </section>

  );
}