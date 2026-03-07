import { type EmailOtpType } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';


export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token_hash = url.searchParams.get('token_hash');
  const type = (url.searchParams.get('type') ?? '') as EmailOtpType | '';
  const nextPath = url.searchParams.get('next') ?? '/account';









  export default function AuthCallback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (data.session) {
          router.push('/dashboard');
        } else {
          setError('No active session found.');
        }
      } catch (err: any) {
        setError(err.message || 'Login failed.');
      } finally {
        setLoading(false);
      }
    };

    handleLogin();
  }, [router]);

  if (loading) return <p>Logging in…</p>;
  if (error) return 
          <p className="text-red-500">Error: {error}</p>
;
  return null;
}