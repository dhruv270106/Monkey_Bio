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
import { PLATFORMS } from '@/data/platforms'
import AddLinkModal from '@/components/dashboard/AddLinkModal'

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // States for new UI
  const [activeMainTab, setActiveMainTab] = useState('monkeybio')
  const [activeSubTab, setActiveSubTab] = useState('profile')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [zoom, setZoom] = useState(90)
  
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

  const handleAddNewLink = async (linkData: any) => {
    if (links.length >= 30) {
      alert('Maximum 30 items allowed!')
      return
    }
    const newLinks = [linkData, ...links]
    await globalUpdateProfile({ links: newLinks })
  }

  const renderSecondaryPanel = () => {
    switch (activeMainTab) {
      case 'user':
        return (
          <div className="flex flex-col h-full bg-white border-r border-gray-100 w-64 animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-gray-50 mb-4">
               <p className="text-[10px] font-medium uppercase text-gray-400 tracking-[0.2em] mb-4">My Account</p>
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                     <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                     <p className="text-xs font-medium text-secondary truncate">@{profile?.username}</p>
                     <p className="text-[8px] font-medium text-primary uppercase tracking-widest mt-0.5">Free Plan</p>
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
                    <span className="text-[10px] font-medium uppercase text-gray-600 tracking-wider whitespace-nowrap">{item.label}</span>
                 </button>
               ))}
               <div className="h-px bg-gray-50 my-4 mx-3"></div>
               <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')} className="w-full text-left p-3 rounded-xl hover:bg-red-50 flex items-center gap-3 transition-colors group text-red-400 hover:text-red-500">
                  <i className="fi fi-rr-exit pt-0.5 opacity-70"></i>
                  <span className="text-[10px] font-medium uppercase tracking-wider whitespace-nowrap">Log Out</span>
               </button>
            </div>
          </div>
        )
      case 'monkeybio':
        return (
          <div className="flex flex-col h-full bg-white border-r border-gray-100 w-64 animate-in slide-in-from-left duration-300 overflow-hidden">
            <div className="p-8 pb-4 flex items-center justify-between">
                <p className="text-[10px] font-medium uppercase text-gray-400 tracking-[0.3em]">My MonkeyBio</p>
            </div>
            
            <div className="flex-1 flex flex-col min-h-0">
               {/* Primary Navigation */}
               <div className="px-3 space-y-1 mb-8">
                  {[
                    { id: 'profile', label: 'Profile', icon: 'fi-rr-user' },
                    { id: 'avatar', label: 'Avatar', icon: 'fi-rr-user-robot' },
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
                       <span className="text-[11px] font-medium uppercase tracking-widest">{item.label}</span>
                    </button>
                  ))}
               </div>

               {/* Add Social Link / Details Section */}
               <div className="mt-auto px-4 pb-6 space-y-4">
                  <div className="bg-gray-50/50 rounded-[32px] border border-gray-100 p-5 space-y-4 shadow-sm">
                     <div className="flex items-center justify-between px-1">
                        <div className="flex flex-col">
                           <h4 className="text-[10px] font-medium uppercase text-gray-600 tracking-widest group-hover:text-primary transition-colors">Social Media</h4>
                           <span className="text-[8px] font-medium text-gray-400 uppercase tracking-widest mt-0.5">Quick Links</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <button 
                             onClick={() => setActiveSubTab('profile')}
                             className="w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-all shadow-sm"
                             title="Details"
                           >
                              <i className="fi fi-rr-settings-sliders text-[10px]"></i>
                           </button>
                           <button 
                             onClick={() => setIsAddModalOpen(true)}
                             className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-primary/20"
                             title="Add Asset"
                           >
                              <i className="fi fi-rr-plus text-[10px]"></i>
                           </button>
                        </div>
                     </div>
                     
                     <div className="max-h-[160px] overflow-y-auto no-scrollbar space-y-2 pr-1">
                        {Object.entries(profile?.social_links || {}).map(([platform, url]: [string, any], i) => (
                           url && (
                              <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                key={platform} 
                                className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-gray-50 group hover:border-primary/20 transition-all"
                              >
                                 <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gray-50 group-hover:bg-primary/5 group-hover:text-primary transition-all overflow-hidden shrink-0">
                                    <i className={`fi ${PLATFORMS[platform]?.icon || 'fi-rr-link'} text-xs`}></i>
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <input 
                                      type="text" 
                                      value={url} 
                                      onChange={(e) => {
                                         const newSocial = { ...profile.social_links, [platform]: e.target.value }
                                         globalUpdateProfile({ social_links: newSocial })
                                      }}
                                      className="w-full bg-transparent text-[9px] font-medium text-secondary outline-none truncate placeholder:text-gray-300"
                                      placeholder={`${platform} link...`}
                                    />
                                    <p className="text-[7px] font-medium uppercase text-gray-300 tracking-widest truncate leading-none mt-0.5">{platform}</p>
                                 </div>
                                 <button 
                                   onClick={() => {
                                      const newSocial = { ...profile.social_links, [platform]: '' }
                                      globalUpdateProfile({ social_links: newSocial })
                                   }} 
                                   className="w-6 h-6 rounded-lg bg-red-50 text-red-200 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white flex items-center justify-center"
                                 >
                                    <i className="fi fi-rr-trash text-[10px]"></i>
                                 </button>
                              </motion.div>
                           )
                        ))}
                        {(!profile?.social_links || Object.values(profile.social_links).every(v => !v)) && (
                           <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-2xl group-hover:border-primary/20 transition-colors">
                              <p className="text-[8px] font-medium text-gray-300 uppercase tracking-widest group-hover:text-primary/40 transition-colors">No Links Added</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )
      case 'tools':
        return (
          <div className="flex flex-col h-full bg-white border-r border-gray-100 w-64 animate-in slide-in-from-left duration-300">
            <div className="p-8 pb-4">
                <p className="text-[10px] font-medium uppercase text-gray-400 tracking-[0.3em] mb-4">Powerful Tools</p>
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
                    <span className="text-[10px] font-medium uppercase tracking-widest">{item.label}</span>
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
      case 'avatar':
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
                <p className="text-[10px] font-medium uppercase tracking-[0.2em]">Select a section to begin</p>
             </div>
          </div>
        )
    }
  }

  const handleSocialSelect = (platform: string) => {
    const newSocial = { ...profile.social_links, [platform]: '' }
    globalUpdateProfile({ social_links: newSocial })
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
          if (tab === 'audience') {
            router.push('/dashboard/audience')
            return
          }
          if (tab === 'insights') {
            router.push('/dashboard/insights')
            return
          }
          if (tab === 'tools') {
            router.push('/dashboard/tools')
            return
          }
          setActiveMainTab(tab)
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
                 <span className="text-[10px] font-medium text-gray-400 select-none tracking-tight">monkey-bio.live/{profile?.username}</span>
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
           </div>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-white">
           {/* Middle Content - Centered Phone Mockup with Design Canvas */}
           <div className="flex-1 overflow-hidden flex items-center justify-center p-4 md:p-8 relative bg-[radial-gradient(#f1f1f1_1px,transparent_1px)] [background-size:24px_24px]">
              
              {/* Zoom Controls at Bottom */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center bg-white border border-gray-100 rounded-2xl p-1 gap-1 z-50 shadow-xl">
                 <button 
                   onClick={() => setZoom(prev => Math.max(50, prev - 10))}
                   className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-50 rounded-xl transition-all font-medium"
                 >
                    <i className="fi fi-rr-minus text-xs"></i>
                 </button>
                 <div className="px-3 min-w-[60px] text-center border-x border-gray-100">
                    <span className="text-[10px] font-medium text-secondary tracking-widest uppercase">{zoom}%</span>
                 </div>
                 <button 
                    onClick={() => setZoom(prev => Math.min(150, prev + 10))}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-50 rounded-xl transition-all font-medium"
                 >
                    <i className="fi fi-rr-plus text-xs"></i>
                 </button>
              </div>
              
              <motion.div 
                animate={{ scale: zoom / 100 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-[60px] bg-white"
              >
                 <Preview userProfile={profile} links={links} socialLinks={profile?.social_links} />
              </motion.div>

              {/* Reset Zoom Button */}
              <button 
                 onClick={() => setZoom(90)}
                 title="Reset Zoom"
                 className="absolute right-8 bottom-8 w-10 h-10 bg-white border border-gray-100 text-gray-400 hover:text-primary flex items-center justify-center rounded-xl shadow-xl transition-all active:scale-95"
              >
                  <i className="fi fi-rr-refresh text-xs"></i>
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
      
      <AddLinkModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddNewLink}
        linksCount={links.length}
      />
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

