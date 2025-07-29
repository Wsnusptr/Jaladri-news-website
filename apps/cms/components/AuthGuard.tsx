
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (!session || (session.user as any)?.role !== 'ADMIN') {
      // Redirect to the main web app's login page
      // Assuming the web app is hosted at the root or a known path
      // You might need to adjust this URL based on your deployment
      router.push('web-sage-rho-41.vercel.app/login'); // Example: Redirect to web app's login
    }
  }, [session, status, router]);

  if (status === 'loading' || !session || (session.user as any)?.role !== 'ADMIN') {
    return <div>Loading or redirecting...</div>; // Or a more sophisticated loading spinner
  }

  return <>{children}</>;
}
