'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Sidebar, { MAIN_TABS } from '@/components/dashboard/Sidebar'
import Preview from '@/components/dashboard/Preview'
import LinksSection from '@/components/dashboard/LinksSection'
import DesignSection from '@/components/dashboard/DesignSection'
import AudienceSection from '@/components/dashboard/AudienceSection'
import InsightsSection from '@/components/dashboard/InsightsSection'
import PlannerSection from '@/components/dashboard/PlannerSection'
import AutoReplySection from '@/components/dashboard/AutoReplySection'
import { motion, AnimatePresence } from 'framer-motion'

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // States for new UI
  const [activeMainTab, setActiveMainTab] = useState('monkeybio')
  const [activeSubTab, setActiveSubTab] = useState('links')
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  const [profile, setProfile] = useState<any>(null)
  const [links, setLinks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Real-time synchronization lock
  const isUpdatingRef = useRef(false)
  const lastUpdateRef = useRef<number>(0)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data } = await supabase.auth.getSession()
      const session = data?.session
      if (!session) {
        window.location.href = '/login'
        return
      }

      const { data: profileData, error: profileError } = await supabase
        .from('monkey_bio')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (profileData) {
        setProfile(profileData)
        setLinks(profileData.links || [])

        // Subscribe to real-time updates
        const channel = supabase
          .channel(`sync-${session.user.id}`)
          .on('postgres_changes', { 
            event: 'UPDATE', 
            schema: 'public', 
            table: 'monkey_bio',
            filter: `id=eq.${session.user.id}`
          }, (payload) => {
            const now = Date.now()
            if (!isUpdatingRef.current && (now - lastUpdateRef.current > 2000)) {
               setProfile(payload.new)
               if (payload.new.links) setLinks(payload.new.links)
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
    const newProfile = { ...profile, ...updates }
    setProfile(newProfile)
    if (updates.links) setLinks(updates.links)

    isUpdatingRef.current = true
    lastUpdateRef.current = Date.now()

    try {
       const { data } = await supabase.auth.getSession()
       const session = data?.session
       if (session) {
          await supabase.from('monkey_bio').update(updates).eq('id', session.user.id)
       }
    } catch (err) {
       console.error("Global update error:", err)
    } finally {
       setTimeout(() => { isUpdatingRef.current = false }, 1000)
    }
  }

  const renderSecondaryPanel = () => {
    switch (activeMainTab) {
      case 'user':
        return (
          <div className="flex flex-col h-full bg-white border-r border-gray-100 w-64 animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-gray-50 mb-4">
               <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-4">My Account</p>
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                     <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                     <p className="text-xs font-black text-secondary truncate">@{profile?.username}</p>
                     <p className="text-[8px] font-bold text-primary uppercase tracking-widest mt-0.5">Free Plan</p>
                  </div>
               </div>
            </div>
            <div className="flex-1 px-3 space-y-1">
               {[
                 { label: 'Create new monkeybio', action: () => window.location.href='/dashboard?action=create', icon: 'fi-rr-plus-small' },
                 { label: 'Account', action: () => setActiveSubTab('account'), icon: 'fi-rr-user' },
                 { label: 'Upgrade', action: () => window.location.href='/pricing', icon: 'fi-rr-bolt' },
                 { label: 'Ask a Question', action: () => {}, icon: 'fi-rr-comment-alt' },
                 { label: 'Help Topics', action: () => {}, icon: 'fi-rr-interrogation' },
                 { label: 'Share Feedback', action: () => {}, icon: 'fi-rr-smile' },
               ].map((item, i) => (
                 <button key={i} onClick={item.action} className="w-full text-left p-3 rounded-xl hover:bg-gray-50 flex items-center gap-3 transition-colors group">
                    <i className={`fi ${item.icon} text-gray-400 group-hover:text-primary transition-colors pt-0.5`}></i>
                    <span className="text-[10px] font-black uppercase text-gray-600 tracking-wider whitespace-nowrap">{item.label}</span>
                 </button>
               ))}
               <div className="h-px bg-gray-50 my-4 mx-3"></div>
               <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')} className="w-full text-left p-3 rounded-xl hover:bg-red-50 flex items-center gap-3 transition-colors group text-red-500">
                  <i className="fi fi-rr-exit pt-0.5 opacity-70"></i>
                  <span className="text-[10px] font-black uppercase tracking-wider whitespace-nowrap">Log Out</span>
               </button>
            </div>
          </div>
        )
      case 'monkeybio':
        return (
          <div className="flex flex-col h-full bg-white border-r border-gray-100 w-64 animate-in slide-in-from-left duration-300 overflow-hidden">
            <div className="p-8 pb-4">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mb-6">My MonkeyBio</p>
            </div>
            <div className="px-3 space-y-1">
               {[
                 { id: 'profile', label: 'Profile', icon: 'fi-rr-user' },
                 { id: 'themes', label: 'Themes', icon: 'fi-rr-palette' },
                 { id: 'buttons', label: 'Buttons', icon: 'fi-rr-apps-add' },
                 { id: 'font', label: 'Font', icon: 'fi-rr-text' },
                 { id: 'wallpaper', label: 'Wallpaper', icon: 'fi-rr-picture' },
               ].map((item) => (
                 <button 
                    key={item.id} 
                    onClick={() => {
                      setActiveSubTab(item.id)
                      setActiveMainTab('monkeybio')
                    }} 
                    className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all ${activeSubTab === item.id ? 'bg-primary text-white shadow-lg' : 'hover:bg-gray-50 text-gray-500 hover:translate-x-1'}`}
                 >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeSubTab === item.id ? 'bg-white/20' : 'bg-gray-50'}`}>
                      <i className={`fi ${item.icon} text-sm pt-1`}></i>
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                 </button>
               ))}
            </div>
            
            <div className="mt-auto p-6">
                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                   <p className="text-[8px] font-black text-primary uppercase tracking-[0.2em] mb-1">Editing Mode</p>
                   <p className="text-[11px] font-black text-secondary">@{profile?.username}</p>
                </div>
            </div>
          </div>
        )
      case 'tools':
        return (
          <div className="flex flex-col h-full bg-white border-r border-gray-100 w-64 animate-in slide-in-from-left duration-300">
            <div className="p-8 pb-4">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mb-4">Powerful Tools</p>
            </div>
            <div className="px-3 space-y-1">
               {[
                 { label: 'Social Planner', action: () => window.open('/dashboard/planner', '_blank'), icon: 'fi-rr-calendar' },
                 { label: 'Insta Auto-reply', action: () => setActiveSubTab('autoreply'), icon: 'fi-rr-comment-alt' },
                 { label: 'Link Shortener', action: () => setActiveSubTab('shortener'), icon: 'fi-rr-link' },
                 { label: 'Post Ideas', action: () => setActiveSubTab('ideas'), icon: 'fi-rr-bulb' },
               ].map((item, i) => (
                 <button key={i} onClick={item.action} className="w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all hover:bg-gray-50 text-gray-500">
                    <div className={`w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-primary`}><i className={`fi ${item.icon} text-sm pt-1`}></i></div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                 </button>
               ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderMainSection = () => {
    switch (activeSubTab) {
      case 'profile':
      case 'themes':
      case 'buttons':
      case 'font':
      case 'wallpaper':
        return <DesignSection profile={profile} setProfile={globalUpdateProfile} links={links} subSection={activeSubTab} />
      case 'audience':
        return <AudienceSection profile={profile} />
      case 'insights':
        return <InsightsSection profile={profile} />
      case 'autoreply':
        return <AutoReplySection profile={profile} />
      default:
        return (
          <div className="flex-1 flex items-center justify-center text-gray-300">
             <div className="text-center">
                <i className="fi fi-rr-rocket text-4xl mb-4 block"></i>
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Select a section to begin</p>
             </div>
          </div>
        )
    }
  }

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <i className="fi fi-rr-spinner animate-spin text-3xl text-primary"></i>
      </div>
    )
  }

  return (
    <div className={`h-[100dvh] flex overflow-hidden ${isDarkMode ? 'dark bg-zinc-950 text-white' : 'bg-white text-secondary'}`}>
      <Sidebar 
        userProfile={profile} 
        activeMainTab={activeMainTab} 
        onMainTabChange={(tab) => {
          setActiveMainTab(tab)
          if (tab === 'audience') setActiveSubTab('audience')
          if (tab === 'insights') setActiveSubTab('insights')
          if (tab === 'settings') setActiveSubTab('account')
        }} 
      />
      
      {renderSecondaryPanel()}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Strip */}
        <header className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white shrink-0 z-[100]">
           <div className="flex items-center gap-6">
              <div className="flex bg-gray-100 p-1 rounded-xl">
                 <button className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-secondary"><i className="fi fi-rr-smartphone text-sm"></i></button>
                 <button className="w-8 h-8 rounded-lg hover:bg-white/50 flex items-center justify-center text-gray-400"><i className="fi fi-rr-laptop text-sm"></i></button>
              </div>
              <div className="h-8 w-px bg-gray-100"></div>
              <div className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl flex items-center gap-3">
                 <span className="text-[10px] font-bold text-gray-400 select-none tracking-tight">monkey-bio.live/{profile?.username}</span>
                 <button className="text-primary hover:scale-110 transition-transform"><i className="fi fi-rr-copy text-[10px]"></i></button>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-50 rounded-xl p-1 gap-1">
                 <button className="p-2 hover:bg-white rounded-lg text-gray-400 transition-all"><i className="fi fi-rr-undo text-xs"></i></button>
                 <button className="p-2 hover:bg-white rounded-lg text-gray-400 transition-all"><i className="fi fi-rr-redo text-xs"></i></button>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                 <button onClick={() => setIsDarkMode(false)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${!isDarkMode ? 'bg-white shadow-sm text-yellow-500' : 'text-gray-400'}`}><i className="fi fi-rr-sun text-sm"></i></button>
                 <button onClick={() => setIsDarkMode(true)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isDarkMode ? 'bg-white shadow-sm text-indigo-500' : 'text-gray-400'}`}><i className="fi fi-rr-moon text-sm"></i></button>
              </div>
              <button className="p-2.5 rounded-xl border border-gray-100 text-gray-400 hover:text-primary transition-all"><i className="fi fi-rr-eye text-sm pt-0.5"></i></button>
              <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2">
                 Publish <i className="fi fi-rr-angle-small-down"></i>
              </button>
           </div>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-gray-50/50">
           {/* Middle Content - Centered Phone Mockup */}
           <div className="flex-1 overflow-hidden flex items-center justify-center p-4 md:p-8 relative">
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center bg-white/80 backdrop-blur rounded-full px-4 py-1.5 border border-gray-100 shadow-sm z-10 gap-4">
                 <button className="text-gray-400 hover:text-primary transition-colors text-xs font-black"><i className="fi fi-rr-minus"></i></button>
                 <span className="text-[10px] font-black text-secondary min-w-[30px] text-center">90%</span>
                 <button className="text-gray-400 hover:text-primary transition-colors text-xs font-black"><i className="fi fi-rr-plus"></i></button>
              </div>
              
              <div className="relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] rounded-[60px] transform scale-[0.85] sm:scale-95 lg:scale-100 transition-transform origin-center">
                 <Preview userProfile={profile} links={links} socialLinks={profile?.social_links} />
              </div>

              {/* Sidebar toggle for tablet as shown in UI */}
              <button className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-16 bg-gray-200 rounded-l-lg hidden md:flex items-center justify-center text-[8px] text-gray-500 hover:bg-primary hover:text-white transition-all">
                 <i className="fi fi-rr-angle-small-left"></i>
              </button>
           </div>

           {/* Right Configuration Panel - Responsive Width */}
           <div className="w-full lg:w-[400px] bg-white border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col shrink-0 overflow-hidden h-[400px] lg:h-full z-20">
              <div className="flex-1 overflow-y-auto no-scrollbar pb-24 lg:pb-0">
                 {renderMainSection()}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white text-primary">
        <i className="fi fi-rr-spinner animate-spin text-3xl"></i>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
