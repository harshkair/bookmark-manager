'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AddBookmarkForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      new URL(url)
    } catch {
      setError('Please enter a valid URL')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase.from('bookmarks').insert({
      title,
      url,
      user_id: userId,
    })

    if (insertError) {
      setError(insertError.message)
    } else {
      setTitle('')
      setUrl('')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="glass-effect rounded-xl p-8 space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Bookmark Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My Favorite Article"
          required
          className="w-full px-4 py-3 bg-[rgb(var(--card))] border border-[rgb(var(--card-border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium mb-2">
          URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-3 bg-[rgb(var(--card))] border border-[rgb(var(--card-border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent transition-all"
        />
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-[rgb(var(--background))] font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 glow"
      >
        {loading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Bookmark
          </>
        )}
      </button>
    </form>
  )
}
