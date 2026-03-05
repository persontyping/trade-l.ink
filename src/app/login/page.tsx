import Layout from "@/components/layout/layout";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen">
        <AuthForm />
      </div>
    </Layout>
  );
}