'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import CommentsSection from './CommentsSection'

type Post = {
  id: string
  title: string
  content: string
  author_name: string
  created_at: string
  likes: { count: number }[]
  comments: { count: number }[]
}

export default function PostCard({ post, userId }: { post: Post; userId?: string }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes[0]?.count || 0)
  const [showComments, setShowComments] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    if (userId) {
      checkIfLiked()
    }
  }, [userId])

  const checkIfLiked = async () => {
    if (!userId) return

    const { data } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', post.id)
      .eq('user_id', userId)
      .single()

    setIsLiked(!!data)
  }

  const handleLike = async () => {
    if (!userId) {
      alert('Please login to like posts')
      return
    }

    if (isLiked) {
      // Unlike
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('post_id', post.id)
        .eq('user_id', userId)

      if (!error) {
        setIsLiked(false)
        setLikesCount(likesCount - 1)
      }
    } else {
      // Like
      const { error } = await supabase
        .from('likes')
        .insert({
          post_id: post.id,
          user_id: userId,
        })

      if (!error) {
        setIsLiked(true)
        setLikesCount(likesCount + 1)
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
        <div className="text-sm text-gray-500">
          By {post.author_name} • {new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
      
      <p className="text-gray-700 whitespace-pre-wrap mb-4">{post.content}</p>
      
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            isLiked
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span>{isLiked ? '❤️' : '🤍'}</span>
          <span className="font-medium">{likesCount}</span>
        </button>
        
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <span>💬</span>
          <span className="font-medium">{post.comments[0]?.count || 0}</span>
        </button>
      </div>
      
      {showComments && <CommentsSection postId={post.id} userId={userId} />}
    </div>
  )
}
