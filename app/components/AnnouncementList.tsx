'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthProvider';
import { Announcement } from '../types';

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, 'announcements'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const announcementsData: Announcement[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        announcementsData.push({
          id: doc.id,
          content: data.content,
          authorName: data.authorName,
          authorId: data.authorId,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        });
      });
      setAnnouncements(announcementsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const deleteAnnouncement = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'announcements', id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="inline-block animate-spin rounded-full h-7 w-7 sm:h-8 sm:w-8 border-t-2 border-b-2 border-blue-400 mb-3 sm:mb-4"></div>
        <h2 className="text-lg sm:text-xl font-medium text-blue-400">Loading announcements...</h2>
      </div>
    );
  }

  return (
    <div>
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className="bg-gray-800 rounded-lg shadow p-3 sm:p-4 mb-3 sm:mb-4 border border-gray-700"
        >
          <div className="flex flex-wrap items-center justify-between mb-2 gap-1">
            <div className="font-semibold text-gray-100 text-sm sm:text-base">
              {announcement.authorName}
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <div className="text-xs text-gray-400">
                {announcement.createdAt.toLocaleString()}
              </div>
              {user && user.uid === announcement.authorId && (
                <button
                  onClick={() => deleteAnnouncement(announcement.id)}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
          <div className="text-gray-300 text-sm sm:text-base whitespace-pre-line break-words max-w-full overflow-x-auto" style={{wordBreak: 'break-word'}}>
            {announcement.content}
          </div>
        </div>
      ))}
    </div>
  );
}