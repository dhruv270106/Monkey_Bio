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

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <header className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg rounded-full top-6' : 'bg-white rounded-full'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-linktree-text flex items-center justify-center text-linktree-lime font-black text-xl">M</span>
              <span className="font-black text-2xl tracking-tight text-linktree-text">Monkey</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="#" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Features</Link>
              <Link href="/pricing" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Pricing</Link>
              <Link href="#" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Discover</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {loading ? (
              <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 rounded-full border-2 border-linktree-lime overflow-hidden shadow-sm hover:scale-105 transition-all outline-none"
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
                      className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 z-[60]"
                    >
                      <div className="px-5 py-4 border-b border-gray-50 mb-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Signed in as</p>
                        <p className="text-sm font-black text-linktree-text truncate">{profile?.username || user.email}</p>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold text-gray-600 hover:bg-linktree-lime/20 hover:text-linktree-text transition-all"
                      >
                        <i className="fi fi-rr-apps"></i> Dashboard
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold text-gray-600 hover:bg-linktree-lime/20 hover:text-linktree-text transition-all"
                        >
                          <i className="fi fi-rr-shield-check"></i> Admin Panel
                        </Link>
                      )}

                      <div className="h-px bg-gray-50 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all text-left"
                      >
                        <i className="fi fi-rr-exit"></i> Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold text-gray-800 hover:text-black hidden sm:block bg-gray-100 hover:bg-gray-200 px-6 py-4 rounded-full transition-colors">Log in</Link>
                <Link href="/signup" className="text-sm font-bold bg-linktree-text text-white hover:opacity-90 px-8 py-4 rounded-full transition-all shadow-md transform hover:scale-[1.02]">Sign up free</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
