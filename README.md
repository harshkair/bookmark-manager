# Bookmark Manager

A modern, real-time bookmark manager built with Next.js 15, Supabase, and Tailwind CSS. Features Google OAuth authentication and live updates across multiple tabs/devices.

## Features

- 🔐 **Google OAuth Authentication** - Secure sign-in with Google (no email/password)
- 📱 **Real-time Sync** - Bookmarks update instantly across all open tabs and devices
- 🔒 **Private Bookmarks** - Each user's bookmarks are completely private
- ⚡ **Fast & Modern** - Built with Next.js 15 App Router and Tailwind CSS
- 🎨 **Beautiful UI** - Gradient design with smooth animations and transitions
- 🗑️ **Easy Management** - Add and delete bookmarks with a clean interface

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Database, Realtime)
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ installed
- A Supabase account
- A Google Cloud Console project for OAuth

## Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd bookmark-manager
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned

3. **Create the bookmarks table:**
   - Go to SQL Editor in your Supabase dashboard
   - Run this SQL:

```sql
-- Create bookmarks table
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own bookmarks"
  ON bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookmarks"
  ON bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;
```

4. **Get your Supabase credentials:**
   - Go to Project Settings > API
   - Copy your `Project URL` and `anon/public` key

### 3. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Configure OAuth consent screen if not done already
6. For Application type, select "Web application"
7. Add authorized redirect URIs:
   - For development: `http://localhost:3000/auth/callback`
   - For production: `https://your-domain.vercel.app/auth/callback`
8. Copy your Client ID and Client Secret

9. **Configure in Supabase:**
   - Go to Authentication > Providers in Supabase
   - Enable Google provider
   - Paste your Google Client ID and Client Secret
   - Save

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Option 1: Deploy from GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

### Post-Deployment

1. **Update Google OAuth redirect URI:**
   - Go to Google Cloud Console > Credentials
   - Edit your OAuth client
   - Add your Vercel URL to authorized redirect URIs:
     `https://your-app.vercel.app/auth/callback`

2. **Update Supabase redirect URLs:**
   - Go to Supabase > Authentication > URL Configuration
   - Add your Vercel URL to "Site URL" and "Redirect URLs"

## Testing Real-time Sync

1. Open your deployed app in two different browser tabs
2. Sign in with Google
3. Add a bookmark in one tab
4. Watch it appear instantly in the other tab!

## Database Schema

```sql
bookmarks (
  id UUID PRIMARY KEY,
  user_id UUID (references auth.users),
  url TEXT,
  title TEXT,
  created_at TIMESTAMP
)
```

## Security Features

- Row Level Security (RLS) ensures users can only access their own bookmarks
- Google OAuth for secure authentication
- Environment variables for sensitive data
- Automatic session management with Supabase

## Project Structure

```
bookmark-manager/
├── app/
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts          # OAuth callback handler
│   ├── bookmarks/
│   │   ├── page.tsx               # Bookmarks page
│   │   ├── AddBookmarkForm.tsx    # Add bookmark form
│   │   ├── BookmarksList.tsx      # Real-time bookmarks list
│   │   └── SignOutButton.tsx      # Sign out button
│   ├── components/
│   │   └── SignInButton.tsx       # Google sign-in button
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing page
├── lib/
│   └── supabase/
│       ├── client.ts
│       └── server.ts
├── middleware.ts
└── package.json
```

## Troubleshooting

### OAuth redirect mismatch
- Ensure your Google OAuth redirect URI matches exactly with your deployment URL
- Check both development and production URLs are added

### Bookmarks not appearing
- Check browser console for errors
- Verify RLS policies are correctly set up in Supabase
- Ensure Realtime is enabled for the bookmarks table

### Real-time not working
- Verify `ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;` was run
- Check that the user is authenticated
- Open browser dev tools and check for WebSocket connection

## License

MIT
