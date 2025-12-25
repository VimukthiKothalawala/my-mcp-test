'use client'

import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Header({ user }: { user: User | null }) {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Simple Blog
        </Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="text-sm text-gray-600">
                {user.user_metadata.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
