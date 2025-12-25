import { createClient } from '@/lib/supabase/server'
import Header from '@/components/Header'
import CreatePostForm from '@/components/CreatePostForm'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function CreatePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="text-indigo-600 hover:text-indigo-500 font-medium">
            ← Back to posts
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Create a New Post</h1>
          <p className="text-gray-600 mt-2">Share your thoughts with the world</p>
        </div>
        
        <CreatePostForm user={user} />
      </main>
    </div>
  )
}
