'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

// MEGA MENU DATA
const PRODUCTS_MENU = [
  { title: 'Link in bio + tools', icon: '🔗' },
  { title: 'Manage social media', icon: '📱' },
  { title: 'Grow your audience', icon: '👥' },
  { title: 'Monetize followers', icon: '💰' },
  { title: 'Measure success', icon: '📊' }
]

const LEARN_MENU = [
  { title: 'Resources', icon: '📰' },
  { title: 'How to use Linktree', icon: '💡' }
]

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user)
        supabase.from('monkey_bio').select('*').eq('id', session.user.id).single()
          .then(({ data }) => setProfile(data))
      }
      setLoading(false)
    })

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
    setActiveMenu(null)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled ? 'py-4 px-4 sm:px-12' : 'py-8 px-8 sm:px-20'}`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className={`max-w-[1400px] mx-auto relative transition-all duration-1000 ${scrolled ? 'bg-white/95 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.15)] rounded-[40px] px-8 py-4 border border-white' : 'bg-white/40 backdrop-blur-md rounded-[50px] px-10 py-5 border border-white/20'} flex items-center justify-between`}>
        <div className="flex items-center gap-12">
          <Link href="/" onMouseEnter={() => setActiveMenu(null)} className="flex items-center gap-2 group">
            <span className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-2xl bg-black text-linktree-lime shadow-xl group-hover:rotate-12 transition-all`}>M</span>
            <span className="font-black text-2xl sm:text-3xl tracking-tighter uppercase text-black">Monkey</span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onMouseEnter={() => setActiveMenu('products')}
              className={`text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 hover:bg-black/5 rounded-2xl transition-all ${activeMenu === 'products' ? 'text-black bg-black/5' : 'text-black/50'}`}
            >
              Products
            </button>
            <Link href="/templates" onMouseEnter={() => setActiveMenu(null)} className="text-[11px] font-black uppercase tracking-[0.2em] text-black/50 hover:text-black px-4 py-2">Templates</Link>
            <button 
              onMouseEnter={() => setActiveMenu('learn')}
              className={`text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 hover:bg-black/5 rounded-2xl transition-all ${activeMenu === 'learn' ? 'text-black bg-black/5' : 'text-black/50'}`}
            >
              Learn
            </button>
            <Link href="/pricing" onMouseEnter={() => setActiveMenu(null)} className="text-[11px] font-black uppercase tracking-[0.2em] text-black/50 hover:text-black px-4 py-2">Pricing</Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          {loading ? (
             <div className="w-12 h-12 bg-black/5 animate-pulse rounded-full" />
          ) : user ? (
             <div className="relative">
                <button 
                  onMouseEnter={() => setActiveMenu('user')}
                  onClick={() => setActiveMenu(prev => prev === 'user' ? null : 'user')} 
                  className="w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-lg"
                >
                  <img src={profile?.avatar_url || user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username || user.email}`} className="w-full h-full object-cover rounded-full" />
                </button>
             </div>
          ) : (
             <div className="flex items-center gap-4">
               <Link href="/login" onMouseEnter={() => setActiveMenu(null)} className="text-[11px] font-black uppercase tracking-widest px-8 py-5 rounded-[24px] text-black/60 hover:text-black">Login</Link>
               <Link href="/signup" onMouseEnter={() => setActiveMenu(null)} className="text-[11px] font-black uppercase tracking-widest px-10 py-5 bg-black text-white rounded-[24px] shadow-2xl">Join Free</Link>
             </div>
          )}
        </div>

        {/* MEGA MENU: MOVED INSIDE THE NAV CONTAINER FOR PERFECT CENTERING UNDER THE BAR */}
        <AnimatePresence>
          {activeMenu && activeMenu !== 'user' && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              className={`absolute ${scrolled ? 'top-[calc(100%+10px)]' : 'top-[calc(100%+15px)]'} left-0 right-0 bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-white overflow-hidden p-2 z-[60]`}
            >
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1.3fr] min-h-[450px]">
                {/* 3 COLUMN CONTENT MATCHING IMAGE LAYOUT */}
                <div className="flex flex-col p-8 border-r border-black/5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Navigation</h4>
                  {(activeMenu === 'products' ? PRODUCTS_MENU : LEARN_MENU).map((item, i) => (
                    <Link key={i} href="#" className="flex items-center gap-6 p-6 hover:bg-black/5 rounded-[30px] transition-all group">
                      <span className="text-3xl opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-transform">{item.icon}</span>
                      <h4 className="font-black text-sm text-black uppercase tracking-tight">{item.title}</h4>
                    </Link>
                  ))}
                </div>
                
                <div className="hidden md:flex flex-col p-10 border-r border-black/5 bg-gray-50/50">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-10">Solutions</h4>
                   <div className="space-y-12">
                     <div>
                       <h5 className="font-black text-sm mb-3 uppercase text-black">Insights</h5>
                       <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Master your audience with smart data.</p>
                     </div>
                     <div>
                       <h5 className="font-black text-sm mb-3 uppercase text-black">Growth</h5>
                       <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Tools to scale your creator journey.</p>
                     </div>
                   </div>
                </div>

                <div className="flex flex-col p-12">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Featured</h4>
                   <div className="w-full aspect-video bg-linktree-lime rounded-[32px] overflow-hidden shadow-2xl flex items-center justify-center">
                      <img src="/images/customize.png" className="w-[80%] h-[80%] object-contain" />
                   </div>
                   <h5 className="mt-8 text-xl font-black text-black uppercase tracking-tighter">New Era.</h5>
                   <p className="text-xs font-black text-gray-400 mt-4 uppercase tracking-widest">The original link in bio, evolved.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
