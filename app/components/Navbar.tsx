'use client';

import { useAuth } from './AuthProvider';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 dark:bg-blue-800 text-white py-3 px-3 sm:p-4 transition-colors shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-lg sm:text-xl font-bold">Notify Verse</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {user && (
            <>
              <span className="hidden sm:inline text-white/90 text-sm sm:text-base">Welcome, {user.displayName}</span>
              <button 
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-sm sm:text-base transition-all shadow hover:shadow-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}