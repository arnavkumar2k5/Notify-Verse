'use client';

import { useAuth } from './components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/auth/login');
      }
    }
  }, [user, loading, router, mounted]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="animate-pulse text-center">
        <div className="w-16 h-16 mx-auto border-4 border-t-blue-600 border-b-blue-600 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mb-4"></div>
        <p className="text-blue-600 dark:text-blue-400 font-medium">Redirecting...</p>
      </div>
    </div>
  );
}