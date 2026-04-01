'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/login')
        return
      }

      const { data: profileData } = await supabase
        .from('monkey_bio')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (profileData) {
        setProfile(profileData)
      } else {
        router.replace('/onboarding')
      }
    } catch (e) {
      console.error("Layout fetch error:", e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <i className="fi fi-rr-spinner animate-spin text-3xl text-primary"></i>
      </div>
    )
  }

  const topNavItems = [
    { label: 'Home', href: '/dashboard', icon: 'fi-rr-home' },
    { label: 'Create', href: '/dashboard?action=create', icon: 'fi-rr-plus' },
    { label: 'Calendar', href: '/dashboard/planner', icon: 'fi-rr-calendar' },
    { label: 'Media', href: '/dashboard/media', icon: 'fi-rr-picture' },
    { label: 'History', href: '/dashboard/history', icon: 'fi-rr-time-past' },
    { label: 'Settings', href: '/dashboard/account', icon: 'fi-rr-settings' },
  ]

  return (
    <div className="h-[100dvh] bg-white flex flex-col overflow-hidden">
      {/* Top Banner */}
      <div className="bg-[#1e293b] text-white py-2 px-4 md:px-8 flex justify-center items-center gap-4 text-xs font-semibold shrink-0 z-[160]">
          <span className="truncate text-center">Unlock more tools to grow your audience faster.</span>
          <button className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 px-3 py-1 rounded-full flex items-center gap-2 transition-all shrink-0">
              <i className="fi fi-rr-bolt text-xs"></i> <span>Upgrade Now</span>
          </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          userProfile={profile} 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-white">
          {/* Top Header */}
          <header className="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0 bg-white z-[150]">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="md:hidden w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-secondary border border-gray-100"
              >
                <i className="fi fi-rr-menu-burger text-lg"></i>
              </button>
              
              <nav className="hidden md:flex items-center gap-6">
                {topNavItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary ${pathname === item.href ? 'text-primary' : 'text-gray-400'}`}
                  >
                    <i className={`${item.icon} text-sm pt-0.5`}></i>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
               {/* Search / Notifications */}
               <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                  <i className="fi fi-rr-search text-sm"></i>
               </button>
               <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-colors relative">
                  <i className="fi fi-rr-bell text-sm"></i>
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
               </button>
               <div className="h-8 w-[1px] bg-gray-100 mx-2 hidden sm:block"></div>
               <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                     <p className="text-[10px] font-black text-secondary leading-none">{profile?.username || 'User'}</p>
                     <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Free Plan</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden border border-primary/20">
                     <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-full h-full object-cover" />
                  </div>
               </div>
            </div>
          </header>

          <main className="flex-1 overflow-hidden relative">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
