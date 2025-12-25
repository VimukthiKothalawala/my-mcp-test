'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Comment = {
  id: string
  content: string
  commenter_name: string
  created_at: string
}

export default function CommentsSection({ postId, userId }: { postId: string; userId?: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    if (data) {
      setComments(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userId) {
      alert('Please login to comment')
      return
    }

    if (!newComment.trim()) return

    setLoading(true)

    const { data: userData } = await supabase.auth.getUser()
    const commenterName = userData.user?.user_metadata.name || userData.user?.email || 'Anonymous'

    const { error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        user_id: userId,
        commenter_name: commenterName,
        content: newComment,
      })

    if (!error) {
      setNewComment('')
      await fetchComments()
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>
      
      {userId && (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={3}
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      )}
      
      {!userId && (
        <p className="text-gray-500 mb-6 italic">Please login to add comments</p>
      )}
      
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{comment.commenter_name}</span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
