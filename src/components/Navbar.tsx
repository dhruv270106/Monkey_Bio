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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
    setIsMenuOpen(false)
  }

  const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin'

  return (
    <>
      <header className={`fixed top-4 md:top-6 left-4 right-4 z-50 flex justify-center pointer-events-none`}>
        <div className="max-w-7xl w-full flex justify-center">
          <div className={`bg-white rounded-[32px] md:rounded-[40px] shadow-sm flex items-center justify-between px-6 md:px-8 py-3 md:py-4 w-full pointer-events-auto transition-all relative ${scrolled ? 'shadow-xl scale-[0.98]' : ''}`}>
            
            <div className="flex items-center gap-10">
              <Link href="/" className="flex items-center gap-2">
                <span className="font-black text-xl md:text-2xl tracking-tighter text-linktree-text">Monkey<span className="text-black">bio</span></span>
                <span className="w-4 h-4 md:w-5 md:h-5 bg-linktree-text rounded-sm rotate-45 mb-1 ml-0.5" />
              </Link>
              
              {/* DESKTOP NAV */}
              <nav className="hidden lg:flex items-center gap-2">
                <Link href="/templates" className="text-sm font-bold opacity-60 hover:opacity-100 hover:bg-gray-100 px-4 py-2 rounded-xl transition-all">Templates</Link>
                <Link href="/marketplace" className="text-sm font-bold opacity-60 hover:opacity-100 hover:bg-gray-100 px-4 py-2 rounded-xl transition-all">Marketplace</Link>
                <Link href="/pricing" className="text-sm font-bold text-gray-500 hover:text-black px-4 py-2 hover:bg-gray-100 rounded-xl transition-all">Pricing</Link>
              </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {/* MOBILE HAMBURGER - TO THE LEFT OF USER ICON */}
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden flex flex-col gap-1.5 p-3 hover:bg-gray-100 rounded-2xl transition-all outline-none"
              >
                <div className="w-6 h-0.5 bg-black rounded-full" />
                <div className="w-6 h-0.5 bg-black rounded-full opacity-70" />
                <div className="w-6 h-0.5 bg-black rounded-full opacity-40" />
              </button>

              {loading ? (
                <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-10 h-10 rounded-full border-2 border-linktree-lime overflow-hidden shadow-sm transition-all outline-none"
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
                        <Link href="/dashboard" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">Dashboard</Link>
                        {isAdmin && <Link href="/admin" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">Admin Panel</Link>}
                        <div className="h-px bg-gray-50 my-1"></div>
                        <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all">Log out</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link href="/login" className="text-sm font-bold text-gray-800 hover:text-black bg-gray-100 hover:bg-gray-200 px-6 py-4 rounded-full transition-colors">Log in</Link>
                  <Link href="/signup" className="text-sm font-bold bg-[#1e2330] text-white hover:opacity-90 px-8 py-4 rounded-full transition-all shadow-md">Sign up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-4 right-4 bottom-4 w-[min(90%,400px)] bg-white rounded-[40px] z-[110] shadow-2xl flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-black text-2xl tracking-tighter">Monkeybio.</span>
                <button onClick={() => setIsMenuOpen(false)} className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:scale-110 transition-all font-black text-xl">✕</button>
              </div>

              <div className="flex flex-col gap-8 flex-1">
                 <Link onClick={() => setIsMenuOpen(false)} href="/" className="text-4xl font-black uppercase tracking-tighter hover:text-linktree-purple">Home</Link>
                 <Link onClick={() => setIsMenuOpen(false)} href="/templates" className="text-4xl font-black uppercase tracking-tighter hover:text-linktree-purple">Templates</Link>
                 <Link onClick={() => setIsMenuOpen(false)} href="/marketplace" className="text-4xl font-black uppercase tracking-tighter hover:text-linktree-purple">Marketplace</Link>
                 <Link onClick={() => setIsMenuOpen(false)} href="/pricing" className="text-4xl font-black uppercase tracking-tighter hover:text-linktree-purple">Pricing</Link>
              </div>

              {!user && (
                <div className="flex flex-col gap-4 pt-10 border-t border-gray-100">
                  <Link onClick={() => setIsMenuOpen(false)} href="/login" className="w-full py-6 bg-gray-100 rounded-[24px] text-center font-black text-xl">Log In</Link>
                  <Link onClick={() => setIsMenuOpen(false)} href="/signup" className="w-full py-6 bg-linktree-purple text-white rounded-[24px] text-center font-black text-xl">Sign Up Free</Link>
                </div>
              )}

              {user && (
                <div className="flex flex-col gap-4 pt-10 border-t border-gray-100">
                  <Link onClick={() => setIsMenuOpen(false)} href="/dashboard" className="w-full py-6 bg-gray-100 rounded-[24px] text-center font-black text-xl">Dashboard</Link>
                  <button onClick={handleLogout} className="w-full py-6 bg-red-50 text-red-500 rounded-[24px] text-center font-black text-xl">Log Out</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
