import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AddBookmarkForm from './AddBookmarkForm'
import BookmarkList from './BookmarkList'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🔖</div>
              <h1 className="text-5xl font-display font-bold bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--accent))] bg-clip-text text-transparent">
                Linkvault
              </h1>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                className="px-4 py-2 text-sm border border-[rgb(var(--card-border))] rounded-lg hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-all"
              >
                Sign Out
              </button>
            </form>
          </div>
          <p className="text-[rgb(var(--muted))] ml-16">
            Welcome back, {user.email}
          </p>
        </header>

        {/* Add Bookmark Form */}
        <section className="mb-12 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h2 className="text-2xl font-display font-semibold mb-4">
            Add New Bookmark
          </h2>
          <AddBookmarkForm userId={user.id} />
        </section>

        {/* Bookmarks List */}
        <section className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl font-display font-semibold mb-4">
            Your Bookmarks
          </h2>
          <BookmarkList userId={user.id} />
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-[rgb(var(--muted))] animate-fade-in" style={{ animationDelay: '300ms' }}>
          <p>
            Built with Next.js, Supabase, and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  )
}
