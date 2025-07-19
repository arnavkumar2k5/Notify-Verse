'use client';

import { useAuth } from '../components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import AnnouncementForm from '../components/AnnouncementForm';
import AnnouncementList from '../components/AnnouncementList';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router, mounted]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 transition-colors p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-7 w-7 sm:h-8 sm:w-8 border-t-2 border-b-2 border-blue-400 mb-3 sm:mb-4"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-blue-400">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 transition-colors">
      <Navbar />
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-4xl">
        <div className="space-y-6 sm:space-y-8">
          <AnnouncementForm />
          <AnnouncementList />
        </div>
      </div>
    </div>
  );
}