export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Announcement {
  id: string;
  content: string;
  authorName: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnnouncementInput {
  content: string;
}