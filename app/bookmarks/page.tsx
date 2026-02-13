import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BookmarksList from './BookmarksList'
import AddBookmarkForm from './AddBookmarkForm'
import SignOutButton from './SignOutButton'

export const dynamic = 'force-dynamic'

export default async function BookmarksPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">My Bookmarks</h1>
                <p className="text-slate-400">{user.email}</p>
              </div>
            </div>
            <SignOutButton />
          </div>

          <AddBookmarkForm />
        </div>

        
        <BookmarksList initialBookmarks={bookmarks || []} userId={user.id} />
      </div>
    </div>
  )
}
