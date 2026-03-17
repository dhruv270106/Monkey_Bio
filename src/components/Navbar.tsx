'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUser(session.user)
        const { data: profileData } = await supabase
          .from('monkey_bio')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profileData) {
          setProfile(profileData)
        }
      }
      setLoading(false)
    }

    fetchUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user)
        // Re-fetch profile on auth change
        supabase.from('monkey_bio').select('*').eq('id', session.user.id).single()
          .then(({ data }) => setProfile(data))
      } else {
        setUser(null)
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    setShowDropdown(false)
  }

  const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-secondary font-bold text-xl">M</span>
              <span className="font-bold text-xl tracking-tight text-secondary">Monkey</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <div className="relative group">
                <Link href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors flex items-center gap-1 py-4">
                  Features <i className="fi fi-rr-angle-small-down pt-1 text-[10px]"></i>
                </Link>
                <div className="absolute top-[80%] left-0 bg-white shadow-xl rounded-xl border border-gray-100 w-64 pt-2 pb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Link Pages</Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Analytics</Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg">Appearance</Link>
                </div>
              </div>
              <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Pricing</Link>
              <Link href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Discover</Link>
              <Link href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Blog</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {loading ? (
              <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden shadow-sm hover:scale-105 transition-all"
                >
                  <img
                    src={profile?.avatar_url || user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username || user.email}&background=random`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-[60]"
                    >
                      <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Signed in as</p>
                        <p className="text-sm font-bold text-secondary truncate">{profile?.username || user.email}</p>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-primary/10 hover:text-secondary transition-all"
                      >
                        <i className="fi fi-rr-apps"></i> Dashboard
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-primary/10 hover:text-secondary transition-all"
                        >
                          <i className="fi fi-rr-shield-check"></i> Admin Panel
                        </Link>
                      )}

                      <div className="h-px bg-gray-50 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all text-left"
                      >
                        <i className="fi fi-rr-exit"></i> Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold text-gray-800 hover:text-black hidden sm:block bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-full transition-colors">Log in</Link>
                <Link href="/signup" className="text-sm font-semibold bg-secondary text-white hover:bg-gray-800 px-6 py-3 rounded-full transition-all shadow-md transform hover:scale-105">Sign up free</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
