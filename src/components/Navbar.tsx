'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

// REVERTED NAVIGATION DATA
const PRODUCTS_MENU = [
  { title: 'Link in bio + tools', href: '#' },
  { title: 'Manage social media', href: '#' },
  { title: 'Grow your audience', href: '#' },
  { title: 'Monetize followers', href: '#' },
  { title: 'Measure success', href: '#' }
]

const LEARN_MENU = [
  { title: 'Resources', href: '#' },
  { title: 'How to use Linktree', href: '#' },
  { title: 'Social Good', href: '/social-good' }
]

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
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
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUser(session.user)
        const { data } = await supabase.from('monkey_bio').select('*').eq('id', session.user.id).single()
        setProfile(data)
      }
      setLoading(false)
    }

    fetchUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setUser(session.user)
        const { data } = await supabase.from('monkey_bio').select('*').eq('id', session.user.id).single()
        setProfile(data)
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
    setIsMobileMenuOpen(false)
    setActiveMenu(null)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-700 ${scrolled ? 'py-2 px-2 sm:py-4 sm:px-12' : 'py-6 px-6 sm:py-8 sm:px-20'}`}
      onMouseLeave={() => !isMobileMenuOpen && setActiveMenu(null)}
    >
      <div className={`max-w-[1400px] mx-auto relative transition-all duration-1000 ${scrolled || isMobileMenuOpen ? 'bg-white/95 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.15)] rounded-full px-4 md:px-8 py-3.5 border border-white' : 'bg-white/40 backdrop-blur-md rounded-[50px] px-6 md:px-10 py-5 border border-white/20'} flex items-center justify-between`}>
        
        {/* LOGO (LEFT) */}
        <div className="flex items-center gap-6 md:gap-12">
          <Link href="/" onMouseEnter={() => setActiveMenu(null)} className="flex items-center gap-1.5 md:gap-2 group">
            <span className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-xl md:text-2xl bg-black text-linktree-lime shadow-xl group-hover:rotate-12 transition-all shrink-0`}>M</span>
            <span className="font-black text-lg md:text-3xl tracking-tighter uppercase text-black">Monkey</span>
          </Link>
          
          {/* DESKTOP NAV (HIDDEN ON MOBILE) */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/about" onMouseEnter={() => setActiveMenu(null)} className="text-[11px] font-black uppercase tracking-[0.2em] text-black/50 hover:text-black px-4 py-2">About</Link>
            <button onMouseEnter={() => setActiveMenu('products')} className={`text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 hover:bg-black/5 rounded-2xl transition-all ${activeMenu === 'products' ? 'text-black bg-black/5' : 'text-black/50'}`}>Products</button>
            <Link href="/templates" onMouseEnter={() => setActiveMenu(null)} className="text-[11px] font-black uppercase tracking-[0.2em] text-black/50 hover:text-black px-4 py-2">Templates</Link>
            <button onMouseEnter={() => setActiveMenu('learn')} className={`text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 hover:bg-black/5 rounded-2xl transition-all ${activeMenu === 'learn' ? 'text-black bg-black/5' : 'text-black/50'}`}>Learn</button>
            <Link href="/pricing" onMouseEnter={() => setActiveMenu(null)} className="text-[11px] font-black uppercase tracking-[0.2em] text-black/50 hover:text-black px-4 py-2">Pricing</Link>
          </nav>
        </div>

        {/* MOBILE CENTER: HAMBURGER BUTTON */}
        <div className="lg:hidden absolute left-1/2 -translate-x-1/2">
          <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none bg-black rounded-full shadow-2xl active:scale-90 transition-transform"
            >
              <motion.span animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 10 : 0, width: isMobileMenuOpen ? '20px' : '20px' }} transition={{ type: 'spring', damping: 15 }} className="w-5 h-[2px] bg-linktree-lime rounded-full" />
              <motion.span animate={{ opacity: isMobileMenuOpen ? 0 : 1, x: isMobileMenuOpen ? 20 : 0 }} className="w-5 h-[2px] bg-linktree-lime rounded-full" />
              <motion.span animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -10 : 0, width: isMobileMenuOpen ? '20px' : '20px' }} transition={{ type: 'spring', damping: 15 }} className="w-5 h-[2px] bg-linktree-lime rounded-full" />
          </button>
        </div>

        {/* DESKTOP & MOBILE RIGHT ACTIONS (SIGN UP / PROFILE) */}
        <div className="flex items-center gap-2 md:gap-6">
          <div className="flex items-center gap-4">
            {loading ? <div className="w-10 h-10 bg-black/5 animate-pulse rounded-full" /> : user ? (
              <div className="relative">
                <button 
                  onMouseEnter={() => setActiveMenu('user')}
                  onClick={() => setActiveMenu(prev => prev === 'user' ? null : 'user')}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-black overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:scale-110 active:scale-95 transition-all bg-white flex items-center justify-center"
                >
                  {profile?.avatar_url || user.user_metadata?.avatar_url ? (
                    <img 
                      src={profile?.avatar_url || user.user_metadata?.avatar_url} 
                      className="w-full h-full object-cover" 
                      alt="Profile"
                    />
                  ) : (
                    <i className="fi fi-ss-user text-xl text-black"></i>
                  )}
                </button>
                {/* USER DROPDOWN (DESKTOP & MOBILE) */}
                <AnimatePresence>
                  {activeMenu === 'user' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.95 }} 
                      animate={{ opacity: 1, y: 0, scale: 1 }} 
                      exit={{ opacity: 0, y: 15, scale: 0.95 }} 
                      className="absolute right-0 mt-4 w-60 bg-white rounded-[32px] shadow-[0_30px_90px_rgba(0,0,0,0.2)] border border-gray-100 p-2 z-[110]"
                    >
                       <div className="px-6 py-5 border-b border-gray-50 mb-1">
                          <p className="text-[10px] font-black text-gray-400 pb-1 uppercase tracking-[0.2em]">Signed in as</p>
                          <p className="text-sm font-black text-black truncate">{profile?.username || user.email}</p>
                       </div>
                       
                       <div className="p-1 space-y-1">
                          <Link 
                            href="/dashboard" 
                            onClick={() => setActiveMenu(null)} 
                            className="flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-black/60 hover:bg-gray-50 hover:text-black transition-all"
                          >
                            <i className="fi fi-rr-apps text-base"></i>
                            Dashboard
                          </Link>

                          {profile?.role?.toLowerCase() === 'admin' && (
                            <Link 
                              href="/admin" 
                              onClick={() => setActiveMenu(null)} 
                              className="flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#9c27b0] bg-purple-50 hover:bg-purple-100 transition-all"
                            >
                               <i className="fi fi-ss-shield-check text-base"></i>
                               Admin Panel
                            </Link>
                          )}

                          <div className="h-px bg-gray-50 my-2 mx-4" />
                          
                          <button 
                            onClick={handleLogout} 
                            className="w-full text-left flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
                          >
                             <i className="fi fi-rr-exit text-base"></i>
                             Log out
                          </button>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3 md:gap-4">
                <Link href="/login" className="hidden lg:block text-[11px] font-black uppercase tracking-widest px-8 py-5 rounded-[24px] text-black/60 hover:text-black">Login</Link>
                <Link href="/signup" className="text-[10px] md:text-[11px] font-black uppercase tracking-widest px-6 py-3.5 md:px-10 md:py-5 bg-black text-[#D2E823] rounded-full md:rounded-[24px] shadow-2xl hover:scale-105 transition-all text-center">Join Free</Link>
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP MEGA MENU */}
        <AnimatePresence>
          {activeMenu && activeMenu !== 'user' && !isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.98 }}
              className={`hidden lg:block absolute ${scrolled ? 'top-[calc(100%+10px)]' : 'top-[calc(100%+15px)]'} left-0 right-0 bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-white overflow-hidden p-2 z-[60]`}
            >
              <div className="grid md:grid-cols-[1.5fr_1fr_1.3fr] min-h-[450px]">
                <div className="flex flex-col p-8 border-r border-black/5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Navigation</h4>
                  {(activeMenu === 'products' ? PRODUCTS_MENU : LEARN_MENU).map((item, i) => (
                    <Link key={i} href="#" className="flex items-center gap-6 p-6 hover:bg-black/5 rounded-[30px] transition-all group">
                      <span className="text-3xl opacity-60">✨</span>
                      <h4 className="font-black text-sm text-black uppercase tracking-tight">{item.title}</h4>
                    </Link>
                  ))}
                </div>
                <div className="hidden md:flex flex-col p-10 border-r border-black/5">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-10">Solutions</h4>
                   <div className="space-y-12">
                     <div>
                       <h5 className="font-black text-sm mb-3 uppercase text-black">Insights</h5>
                       <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Master your audience with smart data.</p>
                     </div>
                   </div>
                </div>
                <div className="flex flex-col p-12 text-center items-center justify-center">
                   <div className="w-full aspect-square bg-linktree-lime rounded-[32px] overflow-hidden shadow-2xl flex items-center justify-center">
                      <img src="/images/customize.png" className="w-[80%] h-[80%] object-contain" />
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MOBILE FULL-WIDTH MENU (DROPDOWN) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className={`fixed ${scrolled ? 'top-16' : 'top-24'} left-0 right-0 z-[90] lg:hidden w-full px-4 max-h-[85vh]`}
          >
            <div className="bg-white rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.2)] border border-white p-3 mt-4">
               <nav className="flex flex-col gap-1 overflow-y-auto max-h-[70vh] overscroll-contain touch-pan-y pb-20">
                 <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-5 text-[15px] font-extrabold uppercase tracking-widest text-black/60 hover:text-black border-b border-black/5">About</Link>
                 {/* PRODUCTS */}
                 <div className="border-b border-black/5 mb-1">
                    <button onClick={() => setExpandedSection(expandedSection === 'products' ? null : 'products')} className="w-full flex items-center justify-between px-6 py-5 text-[15px] font-extrabold uppercase tracking-widest text-black/60 hover:text-black">
                      Products <span className="text-black/30">{expandedSection === 'products' ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence>
                       {expandedSection === 'products' && (
                         <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-gray-50/70 rounded-[24px] mx-1 mb-3">
                           <div className="p-4 space-y-1">
                             {PRODUCTS_MENU.map((item, i) => (
                                <Link key={i} href="#" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-black/50 hover:bg-linktree-lime hover:text-black">{item.title}</Link>
                             ))}
                          </div>
                         </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
                 <Link href="/templates" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-5 text-[15px] font-extrabold uppercase tracking-widest text-black/40 hover:text-black border-b border-black/5">Templates</Link>
                 {/* LEARN */}
                 <div className="border-b border-black/5 mb-1">
                    <button onClick={() => setExpandedSection(expandedSection === 'learn' ? null : 'learn')} className="w-full flex items-center justify-between px-6 py-5 text-[15px] font-extrabold uppercase tracking-widest text-black/60 hover:text-black">
                      Learn <span className="text-black/30">{expandedSection === 'learn' ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence>
                       {expandedSection === 'learn' && (
                         <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-gray-50/70 rounded-[24px] mx-1 mb-3">
                           <div className="p-4 space-y-1">
                             {LEARN_MENU.map((item, i) => (
                                <Link key={i} href="#" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-black/50 hover:bg-linktree-lime hover:text-black">{item.title}</Link>
                             ))}
                          </div>
                         </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
                 <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-5 text-[15px] font-extrabold uppercase tracking-widest text-black/40 hover:text-black">Pricing</Link>
               </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
