# Notify Verse

Notify Verse is a modern, responsive announcement platform built with Next.js, Firebase, and TailwindCSS. The application allows users to sign in with Google authentication, post announcements, and view announcements from other users in a sleek, dark-themed interface.

![Notify Verse Screenshot](<img width="354" height="306" alt="Screenshot_2025-07-19_120306-removebg-preview" src="https://github.com/user-attachments/assets/d2b7e4bc-e14b-47a6-ad1b-55a6441e97dd" />
)

## Features

- **Google Authentication**: Secure user authentication using Firebase Auth
- **Real-time Updates**: Announcements appear immediately using Firebase Firestore
- **Responsive Design**: Optimized user experience across desktop, tablet, and mobile devices
- **Modern Dark Theme**: Elegant, eye-friendly dark mode interface
- **User-specific Actions**: Users can delete their own announcements
- **Character Limit**: 280-character limit for concise announcements

## Tech Stack

- **Frontend**: Next.js 15.4.1, React 19.1.0
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Styling**: TailwindCSS 4.0
- **Language**: TypeScript
- **Build Tool**: Turbopack

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/notify-verse.git
   cd notify-verse
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with your Firebase config:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google Authentication in the Authentication section
3. Create a Firestore database and set up the following security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /announcements/{announcement} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
                     request.resource.data.authorId == request.auth.uid &&
                     request.resource.data.content.size() <= 280;
      allow delete: if request.auth != null && 
                     resource.data.authorId == request.auth.uid;
    }
  }
}
```

## Project Structure

```
notify-verse/
├── app/
│   ├── auth/
│   │   └── login/
│   │       └── page.tsx      # Login page
│   ├── components/
│   │   ├── AnnouncementForm.tsx
│   │   ├── AnnouncementList.tsx
│   │   ├── AuthProvider.tsx
│   │   ├── Navbar.tsx
│   │   └── ThemeProvider.tsx
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard page
│   ├── lib/
│   │   └── firebase.ts       # Firebase configuration
│   ├── types/
│   │   └── index.ts          # TypeScript definitions
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Landing page
├── public/
│   └── ...                   # Static assets
├── .env.local                # Environment variables (not in repo)
├── next.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

## Deployment

This project can be deployed to Vercel with minimal configuration:

```bash
npm install -g vercel
vercel login
vercel
```

## License

This project is licensed under the MIT License.

---

Built with ❤️ by Arnav Kumar
