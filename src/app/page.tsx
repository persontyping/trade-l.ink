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
          <h1 className="text-3xl font-bold">My Cards</h1>

          <AtomCard
            title="Card 1"
            imageSrc="/images/sample1.png" // must point to a valid file in /public/images/
            buttonText="Click Me"
          />

          <AtomCard
            title="Card 2"
            imageSrc="/images/sample2.png"
          />
        </div>
      </main>
    </Layout>
  );
}