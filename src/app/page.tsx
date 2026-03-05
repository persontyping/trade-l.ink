import Layout from '@/components/layout/layout';
import AtomCard from '@/components/Card';

export default function HomePage() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <Layout>
      <main className="min-h-screen flex items-center justify-center">
        <div className="p-8 flex flex-col items-center gap-8">
          <h1 className="text-3xl font-bold">Home Page</h1>
          <h1 className="text-3xl font-bold">Home Page</h1>
          <h1 className="text-3xl font-bold">Home Page</h1>
          <h1 className="text-3xl font-bold">Home Page</h1>
          <h1 className="text-3xl font-bold">Home Page</h1>
          <h1 className="text-3xl font-bold">Home Page</h1>

        </div>
      </main>
    </Layout>
  );
}