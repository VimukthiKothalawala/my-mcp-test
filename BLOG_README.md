# Simple Blog Application

A minimalist blog application built with Next.js and Supabase featuring authentication, posts, likes, and comments.

## Features

- **Authentication**: Sign up and login with email/password
- **Posts**: Create blog posts with title and content
- **Likes**: Like/unlike posts (one like per user)
- **Comments**: Add comments to posts
- **Real-time Updates**: Automatic refresh after actions
- **Secure**: Row Level Security (RLS) policies on all tables

## Setup Instructions

### 1. Configure Environment Variables

You need to add your Supabase anonymous key to `.env.local`:

1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the "anon/public" key
4. Update `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://odpaunudpzdvyyhnqxhp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<paste_your_anon_key_here>
```

### 2. Database Setup

The database schema has already been created with these tables:
- `posts` - Blog posts with title, content, author info
- `likes` - Post likes with unique constraint per user/post
- `comments` - Comments on posts with author info

All tables have Row Level Security enabled with appropriate policies.

### 3. Run the Application

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Usage

### For Visitors (Not Logged In)
- View all blog posts
- See post likes and comments
- Cannot create posts, like, or comment

### For Authenticated Users
1. **Sign Up**: Click "Sign up" and create an account with name, email, and password
2. **Login**: Use your credentials to sign in
3. **Create Posts**: Fill out the form at the top of the homepage
4. **Like Posts**: Click the heart icon on any post
5. **Comment**: Click the comment icon to expand comments, then add your own

## Project Structure

```
app/
  ├── login/page.tsx          # Login page
  ├── signup/page.tsx         # Sign up page
  ├── page.tsx                # Homepage with posts
  └── layout.tsx              # Root layout

components/
  ├── Header.tsx              # Navigation with auth state
  ├── CreatePostForm.tsx      # Form to create new posts
  ├── PostsList.tsx           # Server component fetching posts
  ├── PostCard.tsx            # Individual post with likes/comments
  └── CommentsSection.tsx     # Comments list and form

lib/
  ├── supabase/
  │   ├── client.ts           # Browser client
  │   ├── server.ts           # Server client
  │   └── middleware.ts       # Auth middleware
  └── database.types.ts       # TypeScript types from Supabase
```

## Technologies

- **Next.js 15**: React framework with App Router
- **Supabase**: Backend as a Service (authentication + database)
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling

## Security Features

- Row Level Security on all tables
- Server-side authentication checks
- Secure cookie-based sessions
- Protected API routes

## Notes

- Posts are displayed in reverse chronological order (latest first)
- Each user can like a post only once
- Comments show the commenter's name and timestamp
- Session persists across page reloads via middleware
