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
    <header className={`fixed top-6 left-4 right-4 z-50 flex justify-center pointer-events-none`}>
      <div className="max-w-7xl w-full flex justify-center">
        <div className={`bg-white rounded-[40px] shadow-sm flex items-center justify-between px-8 py-4 w-full pointer-events-auto transition-all relative ${scrolled ? 'shadow-xl scale-[0.98]' : ''}`}>
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-black text-2xl tracking-tighter text-linktree-text">Monkey<span className="text-black">bio</span></span>
              <span className="w-5 h-5 bg-linktree-text rounded-sm rotate-45 mb-1 ml-0.5" />
            </Link>
            <nav className="hidden lg:flex items-center gap-2">
              {/* PRODUCTS WITH MEGA MENU */}
              <div className="group/menu relative">
                 <button className="text-sm font-bold text-gray-500 hover:text-black px-4 py-2 hover:bg-gray-100 rounded-xl transition-all flex items-center gap-1">
                   Products
                 </button>
                 <div className="absolute top-full left-0 pt-4 hidden group-hover/menu:block transition-all duration-500">
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.95, y: 10 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-gray-100 p-8 flex gap-8 w-[950px] overflow-hidden"
                   >
                     <div className="w-1/3 border-r border-gray-100 pr-4">
                        <ul className="space-y-1">
                          {['Link in bio + tools', 'Manage your social media', 'Grow and engage your audience', 'Monetize your following', 'Measure your success'].map((item, i) => (
                            <li key={item} className={`p-4 rounded-3xl flex items-center justify-between group/item cursor-pointer transition-all ${i === 2 ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
                              <span className="font-bold text-sm text-gray-700">{item}</span>
                              <i className="fi fi-rr-angle-right text-[10px] text-gray-400"></i>
                            </li>
                          ))}
                        </ul>
                     </div>
                     <div className="w-1/3">
                        <div className="space-y-8 p-4">
                           <div className="hover:translate-x-1 transition-transform cursor-pointer">
                              <h4 className="font-bold text-sm mb-2 text-linktree-text">Collect leads with contact forms</h4>
                              <p className="text-xs text-gray-400 font-medium leading-relaxed">Turn visitors into subscribers</p>
                           </div>
                           <div className="hover:translate-x-1 transition-transform cursor-pointer">
                              <h4 className="font-bold text-sm mb-2 text-linktree-text">Manage and activate your audience</h4>
                              <p className="text-xs text-gray-400 font-medium leading-relaxed">Organize, tag, and track contacts</p>
                           </div>
                           <div className="hover:translate-x-1 transition-transform cursor-pointer">
                              <h4 className="font-bold text-sm mb-2 text-linktree-text">Send contacts to email tools</h4>
                              <p className="text-xs text-gray-400 font-medium leading-relaxed">Sync with Mailchimp, Klaviyo, Kit & more</p>
                           </div>
                        </div>
                     </div>
                     <div className="w-1/3">
                        <div className="bg-gray-50 rounded-[32px] p-6 h-full border border-gray-100 shadow-sm group/promo">
                           <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Featured</p>
                           <div className="w-full aspect-video bg-gradient-to-br from-linktree-lime to-linktree-blue rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center p-6 shadow-xl group-hover/promo:scale-[1.02] transition-transform duration-700">
                             <div className="absolute inset-0 bg-black/10" />
                              <img src="https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=400&h=300&fit=crop" className="w-full h-full object-cover rounded-lg" />
                           </div>
                           <h4 className="font-bold text-sm mb-2 leading-tight text-linktree-text">Connect your email tools, activate your audience</h4>
                           <p className="text-xs text-gray-400 leading-relaxed font-medium">Send new contacts straight from Linktree to Mailchimp, Klaviyo, Kit and more.</p>
                        </div>
                     </div>
                   </motion.div>
                 </div>
              </div>

              <Link href="/templates" className="text-sm font-bold opacity-60 hover:opacity-100 hover:bg-white/10 px-4 py-2 rounded-xl transition-all">Templates</Link>
              <Link href="/marketplace" className="text-sm font-bold opacity-60 hover:opacity-100 hover:bg-white/10 px-4 py-2 rounded-xl transition-all">Marketplace</Link>
              
              {/* LEARN WITH MEGA MENU */}
              <div className="group/menu relative">
                 <button className="text-sm font-bold opacity-60 hover:opacity-100 px-4 py-2 hover:bg-white/10 rounded-xl transition-all flex items-center gap-1">
                   Learn
                 </button>
                 <div className="absolute top-full left-[-200px] pt-4 hidden group-hover/menu:block">
                   <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-gray-100 p-8 flex gap-8 w-[800px] overflow-hidden"
                   >
                     <div className="w-1/3 border-r border-gray-100 pr-4">
                        <ul className="space-y-1">
                          {['Resources', 'How to use Linktree'].map((item, i) => (
                            <li key={item} className={`p-4 rounded-3xl flex items-center justify-between group/item cursor-pointer transition-all ${i === 0 ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
                              <span className="font-bold text-sm text-gray-700">{item}</span>
                              <i className="fi fi-rr-angle-right text-[10px] text-gray-400"></i>
                            </li>
                          ))}
                        </ul>
                     </div>
                     <div className="w-1/3">
                        <div className="space-y-8 p-4">
                           <div className="hover:translate-x-1 transition-transform cursor-pointer">
                              <h4 className="font-bold text-sm mb-2 text-linktree-text">Read our blog</h4>
                              <p className="text-xs text-gray-400 font-medium">All the latest tips, tricks and growth strategies</p>
                           </div>
                           <div className="hover:translate-x-1 transition-transform cursor-pointer">
                              <h4 className="font-bold text-sm mb-2 text-linktree-text">Success Stories</h4>
                              <p className="text-xs text-gray-400 font-medium">Real people, real results on Linktree</p>
                           </div>
                        </div>
                     </div>
                     <div className="w-1/3">
                        <div className="bg-[#254F1A] rounded-[32px] p-6 h-full text-white shadow-xl">
                           <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-6">Learn with Linktree</p>
                           <div className="w-full aspect-[4/5] bg-white/10 rounded-2xl mb-6 flex overflow-hidden shadow-2xl">
                              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop" className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000" />
                           </div>
                           <h4 className="font-bold text-sm mb-2 leading-tight">Create & sell your own online Course</h4>
                           <p className="text-xs opacity-70 leading-relaxed font-medium">If you've got something to share, you've got something to sell. Easily create and share an online course that...</p>
                        </div>
                     </div>
                   </motion.div>
                 </div>
              </div>

              <Link href="/pricing" className="text-sm font-bold text-gray-500 hover:text-black px-4 py-2 hover:bg-gray-100 rounded-xl transition-all">Pricing</Link>
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
                <Link href="/login" className="text-sm font-bold text-gray-800 hover:text-black bg-gray-100 hover:bg-gray-200 px-6 py-4 rounded-full transition-colors">Log in</Link>
                <Link href="/signup" className="text-sm font-bold bg-[#1e2330] text-white hover:opacity-90 px-8 py-4 rounded-full transition-all shadow-md">Sign up free</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
