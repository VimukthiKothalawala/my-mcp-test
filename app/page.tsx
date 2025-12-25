import { createClient } from '@/lib/supabase/server'
import PostsList from '@/components/PostsList'
import Header from '@/components/Header'
import CreatePostForm from '@/components/CreatePostForm'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Simple Blog</h1>
          <p className="text-gray-600">Share your thoughts with the world</p>
        </div>
        
        {user && <CreatePostForm user={user} />}
        
        <div className="mt-8">
          <PostsList user={user} />
        </div>
      </main>
    </div>
  )
}

