'use client';

import { useAuth } from '@/app/components/AuthProvider'; 
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && user) {
      router.push('/dashboard');
    }
  }, [user, router, mounted]);

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    }
  };

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 transition-colors p-4">
      
      <div className="relative w-full max-w-md px-6 sm:px-8 py-8 sm:py-10 bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl backdrop-blur-sm border border-gray-700 mx-auto">
        <div className="absolute top-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-blue-500 rounded-full opacity-10 blur-lg"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-600 rounded-full opacity-10 blur-lg"></div>
        
        <div className="text-center relative">
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-7 h-7 sm:w-8 sm:h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400">
            Notify Verse
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-400">
            Sign in to view and post announcements
          </p>
        </div>
        
        <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-300 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-colors text-sm">
              <p>{error}</p>
              <p className="text-xs mt-1">
                Please enable Google Authentication in Firebase Console
              </p>
            </div>
          )}
          
          <button
            onClick={handleGoogleSignIn}
            className="group relative w-full flex items-center justify-center gap-2 sm:gap-3 py-2.5 sm:py-3 px-3 sm:px-4 border border-transparent text-sm sm:text-base font-medium rounded-lg sm:rounded-xl text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-md hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
            Sign in with Google
          </button>
          
          <div className="pt-3 sm:pt-4 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}