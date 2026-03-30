'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'

// REVERTED NAVIGATION DATA
const PRODUCTS_MENU = [
  {
    id: 'link-in-bio',
    title: 'Link in bio + tools',
    icon: 'fi-rr-link',
    href: '/products/link-in-bio',
    subOptions: [
      { title: 'Link in bio', desc: 'Customize your Monkey Bio', href: '/products/link-in-bio' },
      { title: 'Link shortener', desc: 'Create trackable, shareable short links', href: '/products/link-shortener' },
      { title: 'QR code generator', desc: 'Turn links into scannable QR codes', href: '/products/qr-generator' },
      { title: 'Canva Background Editor', desc: 'Import your custom designs from Canva', href: '/products/canva-editor' },
    ],
    featured: {
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop',
      title: 'Join 70M+ using Monkey Bio as their link in bio',
      desc: 'One link to share everything you create, curate, and sell across all your socials.'
    }
  },
  {
    id: 'manage-social',
    title: 'Manage your social media',
    icon: 'fi-rr-share-square',
    href: '/products/social-media',
    subOptions: [
      { title: 'Schedule and auto-post', desc: 'Hands-free, hassle-free social media planning', href: '/products/scheduler' },
      { title: 'Instagram auto reply', desc: 'Automated replies and DMs triggered by comments', href: '/products/auto-reply' },
      { title: 'AI content generator', desc: 'Instant AI-powered post ideas and captions', href: '/products/ai-generator' },
      { title: 'Hashtag generator', desc: 'Trending hashtag suggestions for better reach', href: '/products/hashtag-generator' },
    ],
    featured: {
      image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=600&auto=format&fit=crop',
      title: 'Boost sales with Instagram Auto-reply',
      desc: 'Instantly reply to comments, send traffic to your offers, and turn engagement into sales.'
    }
  },
  {
    id: 'grow-audience',
    title: 'Grow and engage your audience',
    icon: 'fi-rr-users',
    href: '/products/grow-audience',
    subOptions: [
      { title: 'Collect leads', desc: 'Turn visitors into subscribers', href: '/products/lead-capture' },
      { title: 'Manage audience', desc: 'Organize, tag, and track contacts', href: '/products/audience-manager' },
      { title: 'Send to email tools', desc: 'Sync with Mailchimp, Klaviyo, Kit & more', href: '/products/email-integration' },
    ],
    featured: {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
      title: 'Connect your email tools, activate your audience',
      desc: 'Send new contacts straight from Monkey Bio to Mailchimp, Klaviyo, and more.'
    }
  },
  {
    id: 'measure-success',
    title: 'Measure your success',
    icon: 'fi-rr-stats',
    href: '/products/analytics',
    subOptions: [
      { title: 'Social + link analytics', desc: 'Track clicks, engagement and audience insights', href: '/products/analytics' },
    ],
    featured: {
      image: '/navbar/analytics.png',
      title: 'Analyze your performance',
      desc: 'Get deep insights into your audience engagement and link performance with advanced analytics.'
    }
  }
]

const LEARN_MENU = [
  {
    id: 'resources',
    title: 'Resources',
    icon: 'fi-rr-apps',
    href: '/blog',
    subOptions: [
      { title: 'Read our blog', desc: 'All the latest tips, tricks and growth strategies', href: '/blog' },
      { title: 'Success Stories', desc: 'Real people, real results on Monkey Bio', href: '/success-stories' },
    ],
    featured: {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
      title: 'Learn with Monkey Bio',
      desc: 'Create & sell your own online Course. If you\'ve got something to share, you\'ve got something to sell.'
    }
  },
  {
    id: 'how-to',
    title: 'How to use Monkey Bio',
    icon: 'fi-rr-interrogation',
    href: '/help',
    subOptions: [
      { title: 'Monkey Bio Help Centre', desc: 'Get answers, guides and support', href: '/help' },
    ],
    featured: {
      image: '/navbar/support.png',
      title: 'Get Help & Support',
      desc: 'Everything you need to know about setting up and growing your presence with our detailed guides.'
    }
  }
]

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeProductTab, setActiveProductTab] = useState(PRODUCTS_MENU[0].id)
  const [activeLearnTab, setActiveLearnTab] = useState(LEARN_MENU[0].id)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const HIDDEN_PATHS = ['/dashboard', '/admin', '/login', '/signup', '/onboarding', '/auth']
  if (HIDDEN_PATHS.some(path => pathname?.startsWith(path))) {
    return null
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      // Use getUser() instead of getSession() to verify the user actually exists in the DB
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (user && !error) {
        setUser(user)
        setLoading(false)
        const { data: profileData } = await supabase.from('monkey_bio').select('*').eq('id', user.id).single()
        if (profileData) setProfile(profileData)
      } else {
        // Clear stale local sessions if the user was deleted in the DB
        if (error) await supabase.auth.signOut()
        setUser(null)
        setProfile(null)
        setLoading(false)
      }
    }

    fetchUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setUser(session.user)
        // Try to get profile if not already there
        const { data } = await supabase.from('monkey_bio').select('*').eq('id', session.user.id).single()
        if (data) setProfile(data)
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

  const currentProduct = PRODUCTS_MENU.find(p => p.id === activeProductTab) || PRODUCTS_MENU[0]
  const currentLearn = LEARN_MENU.find(l => l.id === activeLearnTab) || LEARN_MENU[0]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-700 ${scrolled ? 'py-2 px-2 sm:py-4 sm:px-12' : 'py-6 px-6 sm:py-8 sm:px-20'}`}
      onMouseLeave={() => !isMobileMenuOpen && setActiveMenu(null)}
    >
      <div className={`max-w-[1400px] mx-auto relative transition-all duration-1000 ${scrolled || isMobileMenuOpen ? 'bg-white/95 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.15)] rounded-full px-4 md:px-8 py-3.5 border border-white' : 'bg-white/40 backdrop-blur-md rounded-[50px] px-6 md:px-10 py-5 border border-white/20'} flex items-center justify-between`}>

        {/* LOGO (LEFT) */}
        <div className="flex items-center gap-6 md:gap-12">
          <Link href="/" onMouseEnter={() => setActiveMenu(null)} className="flex items-center gap-1.5 md:gap-2 group">
            <span className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center font-extrabold text-xl md:text-2xl bg-black text-linktree-lime shadow-xl group-hover:rotate-12 transition-all shrink-0`}>M</span>
            <span className="font-extrabold text-lg md:text-3xl tracking-tighter uppercase text-black">Monkey</span>
          </Link>

          {/* DESKTOP NAV (HIDDEN ON MOBILE) */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/about" onMouseEnter={() => setActiveMenu(null)} className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-black/50 hover:text-black px-4 py-2">About</Link>
            <button onMouseEnter={() => setActiveMenu('products')} className={`text-[11px] font-extrabold uppercase tracking-[0.2em] px-4 py-2 hover:bg-black/5 rounded-2xl transition-all ${activeMenu === 'products' ? 'text-black bg-black/5' : 'text-black/50'}`}>Products</button>
            <Link href="/templates" onMouseEnter={() => setActiveMenu(null)} className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-black/50 hover:text-black px-4 py-2">Templates</Link>
            <button onMouseEnter={() => setActiveMenu('learn')} className={`text-[11px] font-extrabold uppercase tracking-[0.2em] px-4 py-2 hover:bg-black/5 rounded-2xl transition-all ${activeMenu === 'learn' ? 'text-black bg-black/5' : 'text-black/50'}`}>Learn</button>
            <Link href="/pricing" onMouseEnter={() => setActiveMenu(null)} className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-black/50 hover:text-black px-4 py-2">Pricing</Link>
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
                        <p className="text-[10px] font-extrabold text-gray-400 pb-1 uppercase tracking-[0.2em]">Signed in as</p>
                        <p className="text-sm font-extrabold text-black truncate">{profile?.username || user.email}</p>
                      </div>

                      <div className="p-1 space-y-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-extrabold uppercase tracking-widest text-black/60 hover:bg-gray-50 hover:text-black transition-all"
                        >
                          <i className="fi fi-rr-apps text-base"></i>
                          Dashboard
                        </Link>

                        {profile?.role?.toLowerCase() === 'admin' && (
                          <Link
                            href="/admin"
                            onClick={() => setActiveMenu(null)}
                            className="flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-extrabold uppercase tracking-widest text-[#9c27b0] bg-purple-50 hover:bg-purple-100 transition-all"
                          >
                            <i className="fi fi-ss-shield-check text-base"></i>
                            Admin Panel
                          </Link>
                        )}

                        <div className="h-px bg-gray-50 my-2 mx-4" />

                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-extrabold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
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
                <Link href="/login" className="hidden lg:block text-[11px] font-extrabold uppercase tracking-widest px-8 py-5 rounded-[24px] text-black/60 hover:text-black">Login</Link>
                <Link href="/signup" className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-widest px-6 py-3.5 md:px-10 md:py-5 bg-black text-[#D2E823] rounded-full md:rounded-[24px] shadow-2xl hover:scale-105 transition-all text-center">Join Free</Link>
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP MEGA MENU */}
        <AnimatePresence>
          {activeMenu && activeMenu !== 'user' && !isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.98 }}
              className={`hidden lg:block absolute ${scrolled ? 'top-[calc(100%+10px)]' : 'top-[calc(100%+15px)]'} left-0 right-0 bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-gray-50 overflow-hidden p-2 z-[60]`}
            >
              {activeMenu === 'products' ? (
                <div className="grid grid-cols-[320px_1fr_400px] min-h-[450px]">
                  {/* Left Column: Categories */}
                  <div className="flex flex-col p-4 border-r border-gray-50 bg-gray-50/10">
                    {PRODUCTS_MENU.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        onMouseEnter={() => setActiveProductTab(item.id)}
                        className={`flex items-center justify-between p-5 rounded-3xl transition-all text-left ${activeProductTab === item.id ? 'bg-white shadow-xl text-black' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        <div className="flex items-center gap-4">
                          <i className={`fi ${item.icon} text-lg`}></i>
                          <span className="font-semibold text-sm uppercase tracking-tight">{item.title}</span>
                        </div>
                        <i className="fi fi-rr-angle-small-right text-lg opacity-40"></i>
                      </Link>
                    ))}
                  </div>

                  {/* Middle Column: Sub-options */}
                  <div className="flex flex-col p-8 bg-white overflow-y-auto no-scrollbar">
                    <div className="grid grid-cols-1 gap-4">
                      {currentProduct.subOptions.map((opt, i) => (
                        <Link
                          key={i}
                          href={opt.href}
                          onClick={() => setActiveMenu(null)}
                          className="p-6 rounded-[32px] hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100"
                        >
                          <h4 className="font-bold text-secondary text-[15px] mb-1 group-hover:text-primary">{opt.title}</h4>
                          <p className="text-xs font-medium text-gray-400">{opt.desc}</p>
                        </Link>
                      ))}
                    </div>
                    {activeProductTab === 'link-in-bio' && (
                      <div className="mt-12 pt-12 border-t border-gray-50">
                        <p className="text-[10px] font-black uppercase text-gray-300 tracking-[0.4em] mb-6">Integrations</p>
                        <div className="flex gap-6">
                          {['instagram', 'tiktok', 'linkedin', 'twitter'].map(p => (
                            <div key={p} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                              <i className={`fi fi-brands-${p} text-xl text-black`}></i>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Featured */}
                  <div className="p-8 pb-12 border-l border-gray-50 bg-gray-50/5 flex flex-col justify-start">
                    <div className="bg-gray-50 rounded-[40px] overflow-hidden p-6 flex flex-col gap-6">
                      <div className="aspect-[1.5/1] rounded-[30px] overflow-hidden shadow-2xl relative">
                        <img src={currentProduct.featured.image} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <div className="space-y-3 px-2">
                        <h5 className="font-bold text-base text-secondary tracking-tight leading-tight">{currentProduct.featured.title}</h5>
                        <p className="text-[11px] font-medium text-gray-500 leading-relaxed">{currentProduct.featured.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-[320px_1fr_400px] min-h-[400px]">
                  {/* Left Column: Categories */}
                  <div className="flex flex-col p-4 border-r border-gray-50 bg-gray-50/10">
                    {LEARN_MENU.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        onMouseEnter={() => setActiveLearnTab(item.id)}
                        className={`flex items-center justify-between p-5 rounded-3xl transition-all text-left ${activeLearnTab === item.id ? 'bg-white shadow-xl text-black' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        <div className="flex items-center gap-4">
                          <i className={`fi ${item.icon} text-lg`}></i>
                          <span className="font-semibold text-sm tracking-tight">{item.title}</span>
                        </div>
                        <i className="fi fi-rr-angle-small-right text-lg opacity-40"></i>
                      </Link>
                    ))}
                  </div>

                  {/* Middle Column: Sub-options */}
                  <div className="flex flex-col p-8 bg-white overflow-y-auto no-scrollbar">
                    <div className="grid grid-cols-1 gap-4">
                      {currentLearn.subOptions.map((opt, i) => (
                        <Link
                          key={i}
                          href={opt.href}
                          onClick={() => setActiveMenu(null)}
                          className="p-6 rounded-[32px] hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100"
                        >
                          <h4 className="font-bold text-secondary text-[15px] mb-1 group-hover:text-primary">{opt.title}</h4>
                          <p className="text-xs font-medium text-gray-400">{opt.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Featured */}
                  <div className="p-8 pb-12 border-l border-gray-50 bg-gray-50/5 flex flex-col justify-start">
                    <div className="bg-gray-50 rounded-[40px] overflow-hidden p-6 flex flex-col gap-6">
                      <div className="aspect-[1.5/1] rounded-[30px] overflow-hidden shadow-2xl relative">
                        <img src={currentLearn.featured.image} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <div className="space-y-3 px-2">
                        <h5 className="font-bold text-base text-secondary tracking-tight leading-tight">{currentLearn.featured.title}</h5>
                        <p className="text-[11px] font-medium text-gray-500 leading-relaxed">{currentLearn.featured.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                <Link href="/about" onClick={() => { setIsMobileMenuOpen(false); setActiveMenu(null); }} className="px-6 py-5 text-[15px] font-extrabold uppercase tracking-widest text-black/60 hover:text-black border-b border-black/5">About</Link>
                {/* PRODUCTS */}
                <div className="border-b border-black/5 mb-1">
                  <button onClick={() => setExpandedSection(expandedSection === 'products' ? null : 'products')} className="w-full flex items-center justify-between px-6 py-5 text-[15px] font-extrabold uppercase tracking-widest text-black/60 hover:text-black">
                    Products <span className="text-black/30">{expandedSection === 'products' ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {expandedSection === 'products' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-gray-50/70 rounded-[24px] mx-1 mb-3">
                        <div className="p-4 space-y-4">
                          {PRODUCTS_MENU.map((group, i) => (
                            <div key={i} className="space-y-2">
                              <p className="px-4 text-[9px] font-black uppercase text-gray-400 tracking-[0.2em]">{group.title}</p>
                              <div className="grid grid-cols-1 gap-1">
                                {group.subOptions.map((opt, j) => (
                                  <Link key={j} href={opt.href} onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest text-black/50 hover:bg-linktree-lime hover:text-black transition-all">
                                    {opt.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
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
                            <Link key={i} href="#" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-4 rounded-xl text-[10px] font-extrabold uppercase tracking-widest text-black/50 hover:bg-linktree-lime hover:text-black">{item.title}</Link>
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
