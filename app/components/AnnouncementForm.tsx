'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthProvider';

export default function AnnouncementForm() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'announcements'), {
        content: content.trim(),
        authorName: user.displayName || 'Anonymous',
        authorId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setContent('');
    } catch (error) {
      console.error('Error adding announcement:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl transition-colors border border-gray-700 backdrop-blur-sm">
      <div className="absolute top-0 right-0 w-14 h-14 sm:w-16 sm:h-16 bg-blue-500 rounded-full opacity-10 blur-lg"></div>
      
      <h2 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 mb-3 sm:mb-4">Post New Announcement</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's your announcement?"
        className="w-full p-3 sm:p-4 border border-gray-600 rounded-lg sm:rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-gray-100 placeholder-gray-400 transition-colors shadow-inner"
        rows={3}
        maxLength={280}
      />
      <div className="flex flex-wrap justify-between items-center gap-2 mt-3 sm:mt-4">
        <span className="text-xs sm:text-sm text-gray-400">
          {content.length}
        </span>
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg sm:rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );
}