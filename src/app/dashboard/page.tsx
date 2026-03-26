'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import Preview from '@/components/dashboard/Preview'
import LinksSection from '@/components/dashboard/LinksSection'
import DesignSection from '@/components/dashboard/DesignSection'
import AudienceSection from '@/components/dashboard/AudienceSection'
import InsightsSection from '@/components/dashboard/InsightsSection'
import PlannerSection from '@/components/dashboard/PlannerSection'
import AutoReplySection from '@/components/dashboard/AutoReplySection'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_GROUPS = [
  {
    id: 'linktree',
    label: 'My Linktree',
    icon: 'fi-rr-link',
    items: [
      { id: 'links', label: 'Links', icon: 'fi-rr-link', color: 'text-purple-500' },
      { id: 'design', label: 'Design', icon: 'fi-rr-palette', color: 'text-pink-500' },
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'fi-rr-stats',
    items: [
      { id: 'audience', label: 'Audience', icon: 'fi-rr-users', color: 'text-orange-500' },
      { id: 'insights', label: 'Insights', icon: 'fi-rr-stats', color: 'text-cyan-500' },
    ]
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: 'fi-rr-apps',
    items: [
      { id: 'planner', label: 'Social planner', icon: 'fi-rr-calendar', color: 'text-blue-500' },
      { id: 'autoreply', label: 'Auto-reply', icon: 'fi-rr-comment-alt', color: 'text-primary' },
    ]
  }
]

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabFromQuery = searchParams.get('tab') || 'links'

  const [profile, setProfile] = useState<any>(null)
  const [links, setLinks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(tabFromQuery)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  
  // Real-time synchronization lock
  const isUpdatingRef = useRef(false)
  const lastUpdateRef = useRef<number>(0)
  
  const bottomNavRef = useRef<HTMLDivElement>(null)

  // Close group menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bottomNavRef.current && !bottomNavRef.current.contains(event.target as Node)) {
        setOpenGroup(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab)
    setIsSidebarOpen(false)
    setOpenGroup(null)
    router.replace(`/dashboard?tab=${newTab}`, { scroll: false })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/login'
        return
      }

      const { data: profileData } = await supabase
        .from('monkey_bio')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (profileData) {
        if (!profileData.onboarding_completed) {
          window.location.href = '/onboarding'
          return
        }
        setProfile(profileData)
        setLinks(profileData.links || [])

        // Subscribe to real-time updates for THIS profile
        const channel = supabase
          .channel(`sync-${session.user.id}`)
          .on('postgres_changes', { 
            event: 'UPDATE', 
            schema: 'public', 
            table: 'monkey_bio',
            filter: `id=eq.${session.user.id}`
          }, (payload) => {
            // ONLY update if we are NOT currently pushed an update ourselves 
            // OR if the update is significantly newer than our last push
            const now = Date.now()
            if (!isUpdatingRef.current && (now - lastUpdateRef.current > 2000)) {
               console.log('Real-time sync applied:', payload.new)
               setProfile(payload.new)
               if (payload.new.links) setLinks(payload.new.links)
            } else {
               console.log('Real-time sync ignored (local changes pending)')
            }
          })
          .subscribe()

        return () => {
          supabase.removeChannel(channel)
        }
      }
    } catch (e) {
      console.error("Dashboard error:", e)
    } finally {
      setLoading(false)
    }
  }

  const globalUpdateProfile = async (updates: any) => {
    if (!profile) return
    
    // 1. Update local state immediately
    const newProfile = { ...profile, ...updates }
    setProfile(newProfile)
    if (updates.links) setLinks(updates.links)

    // 2. Set the lock
    isUpdatingRef.current = true
    lastUpdateRef.current = Date.now()

    // 3. Commit to DB
    try {
       const { data: { session } } = await supabase.auth.getSession()
       if (session) {
          const { error } = await supabase.from('monkey_bio').update(updates).eq('id', session.user.id)
          if (error) throw error
       }
    } catch (err) {
       console.error("Global update error:", err)
    } finally {
       // Release lock after a short delay to allow DB state to stabilize
       setTimeout(() => {
          isUpdatingRef.current = false
       }, 1000)
    }
  }

  useEffect(() => {
    const tabFromQuery = searchParams.get('tab') || 'links'
    setActiveTab(tabFromQuery)
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <i className="fi fi-rr-spinner animate-spin text-3xl text-primary"></i>
      </div>
    )
  }

  const renderSection = () => {
    switch (activeTab) {
      case 'links':
        return <LinksSection profile={profile} links={links} setLinks={setLinks} setProfile={globalUpdateProfile} refreshData={fetchData} />
      case 'design':
        return <DesignSection profile={profile} setProfile={globalUpdateProfile} links={links} onBack={() => handleTabChange('links')} />
      case 'audience':
        return <AudienceSection profile={profile} />
      case 'insights':
        return <InsightsSection profile={profile} />
      case 'planner':
        return <PlannerSection profile={profile} />
      case 'autoreply':
        return <AutoReplySection profile={profile} />
      default:
        return <LinksSection profile={profile} links={links} setLinks={setLinks} setProfile={globalUpdateProfile} refreshData={fetchData} />
    }
  }

  return (
    <div className="h-[100dvh] bg-white flex flex-col overflow-hidden">
      {/* Top Banner */}
      <div className="bg-[#1e293b] text-white py-2 px-4 md:px-8 flex justify-center items-center gap-4 text-xs md:text-sm font-semibold shrink-0 z-[160]">
          <span className="truncate text-center">Unlock more tools to grow your audience faster.</span>
          <button className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 px-3 py-1 rounded-full flex items-center gap-2 transition-all shrink-0">
              <i className="fi fi-rr-bolt text-xs"></i> <span>Claim week</span>
          </button>
      </div>

      {/* Mobile Top Header - HIDE IF IN DESIGN TAB */}
      {!activeTab?.includes('design') && (
        <div className="flex md:hidden items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-[36px] z-[150]">
            <div className="flex items-center gap-3">
               <button onClick={() => setIsSidebarOpen(true)} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-secondary border border-gray-100"><i className="fi fi-rr-menu-burger text-lg"></i></button>
               <p className="font-extrabold text-xs md:text-sm uppercase tracking-[0.2em] text-secondary">{activeTab}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/10 overflow-hidden border border-primary/20">
               <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-full h-full object-cover" />
            </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar userProfile={profile} activeTab={activeTab} onTabChange={handleTabChange} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 overflow-hidden min-w-0 bg-white">
          <div className="w-full h-full flex flex-col overflow-hidden">
            {renderSection()}
          </div>
        </main>

        {/* REFINED MOBILE BOTTOM NAVIGATION - CATEGORY BASED POPUP */}
        <div ref={bottomNavRef} className="fixed bottom-0 left-0 right-0 z-[160] md:hidden">
           {/* POPUP MENU */}
           <AnimatePresence>
             {openGroup && (
               <motion.div 
                 initial={{ opacity: 0, y: 50, scale: 0.9 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: 20, scale: 0.9 }}
                 transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                 className="absolute bottom-[90%] left-6 right-6 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-2 z-[200] flex flex-col gap-1"
               >
                  <p className="text-[9px] font-extrabold uppercase text-gray-400 tracking-[0.3em] px-4 py-3 border-b border-gray-50">
                    {NAV_GROUPS.find(g => g.id === openGroup)?.label || 'Menu'} tools
                  </p>
                  {NAV_GROUPS.find(g => g.id === openGroup)?.items?.map(item => (
                    <button 
                      key={item.id} 
                      onClick={() => handleTabChange(item.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 text-gray-500'}`}
                    >
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeTab === item.id ? 'bg-primary text-white' : 'bg-gray-50'}`}>
                          <i className={`fi ${item.icon} text-lg`}></i>
                       </div>
                       <span className="font-extrabold text-xs uppercase tracking-widest">{item.label}</span>
                       {activeTab === item.id && <i className="fi fi-rr-check text-xs ml-auto"></i>}
                    </button>
                  ))}
               </motion.div>
             )}
           </AnimatePresence>

           {/* MAIN BOTTOM BAR - HIDE IF IN DESIGN TAB */}
           {!activeTab?.includes('design') && (
            <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 flex items-center justify-around py-4 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] relative z-[160]">
                {NAV_GROUPS.map(group => {
                  const isItemInGroupActive = group.items.some(i => i.id === activeTab)
                  const isGroupOpen = openGroup === group.id

                  return (
                    <button
                      key={group.id}
                      onClick={() => setOpenGroup(isGroupOpen ? null : group.id)}
                      className={`flex flex-col items-center gap-1.5 transition-all relative ${isItemInGroupActive ? 'text-primary' : 'text-gray-300'}`}
                    >
                      <div className={`w-14 h-12 rounded-[22px] flex items-center justify-center transition-all ${isItemInGroupActive ? 'bg-primary/10' : ''}`}>
                        <i className={`fi ${group.icon} text-xl md:text-2xl`}></i>
                      </div>
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.2em]">{group.label}</span>
                      {isItemInGroupActive && !isGroupOpen && (
                        <motion.div layoutId="active-dot" className="absolute -top-1 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_#502274]" />
                      )}
                    </button>
                  )
                })}
            </div>
           )}
        </div>

        <Preview userProfile={profile} links={links} socialLinks={profile?.social_links} />
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <i className="fi fi-rr-spinner animate-spin text-3xl text-primary"></i>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
