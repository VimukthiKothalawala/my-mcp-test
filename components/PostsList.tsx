import { createClient } from '@/lib/supabase/server'
import PostCard from './PostCard'

export default async function PostsList({ user }: { user: any }) {
  const supabase = await createClient()
  
  // Fetch posts with likes count and comments count
  const { data: posts } = await supabase
    .from('posts')
    .select(`
      *,
      likes(count),
      comments(count)
    `)
    .order('created_at', { ascending: false })

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500">No posts yet. Be the first to create one!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} userId={user?.id} />
      ))}
    </div>
  )
}
