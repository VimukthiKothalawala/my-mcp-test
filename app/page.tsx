import { createClient } from '@/lib/supabase/server'
import PostsList from '@/components/PostsList'
import Header from '@/components/Header'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Simple Blog</h1>
            <p className="text-gray-600">Share your thoughts with the world</p>
          </div>
          {user && (
            <Link
              href="/create"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
            >
              + New Post
            </Link>
          )}
        </div>
        
        <div className="mt-8">
          <PostsList user={user} />
        </div>
      </main>
    </div>
  )
}

