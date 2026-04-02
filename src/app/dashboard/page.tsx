'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Preview from '@/components/dashboard/Preview'
import LinksSection from '@/components/dashboard/LinksSection'
import DesignSection from '@/components/dashboard/DesignSection'
import AudienceSection from '@/components/dashboard/AudienceSection'
import InsightsSection from '@/components/dashboard/InsightsSection'
import AddLinkModal from '@/components/dashboard/AddLinkModal'
import { motion, AnimatePresence } from 'framer-motion'

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabFromQuery = searchParams.get('tab') || 'links'

  const [profile, setProfile] = useState<any>(null)
  const [links, setLinks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(tabFromQuery)
  const [showAddModal, setShowAddModal] = useState(false)
  
  // Handle action parameter
  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setShowAddModal(true)
      // Clean up URL so it doesn't reopen on refresh
      const newPath = window.location.pathname + (tabFromQuery ? `?tab=${tabFromQuery}` : '')
      window.history.replaceState({}, '', newPath)
    }
  }, [searchParams])
  
  // Real-time synchronization lock
  const isUpdatingRef = useRef(false)
  const lastUpdateRef = useRef<number>(0)

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab)
    router.replace(`/dashboard?tab=${newTab}`, { scroll: false })
  }

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
      } else {
        window.location.replace('/onboarding')
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
          const { error } = await supabase.from('monkey_bio').update(updates).eq('id', session.user.id)
          if (error) throw error
       }
    } catch (err) {
       console.error("Global update error:", err)
    } finally {
       setTimeout(() => { isUpdatingRef.current = false }, 1000)
    }
  }

  useEffect(() => {
    const tabFromQuery = searchParams.get('tab') || 'links'
    setActiveTab(tabFromQuery)
  }, [searchParams])

  if (loading || !profile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white h-full">
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
      default:
        return <LinksSection profile={profile} links={links} setLinks={setLinks} setProfile={globalUpdateProfile} refreshData={fetchData} />
    }
  }

  const tabs = [
    { id: 'links', label: 'Links', icon: 'fi-rr-link' },
    { id: 'design', label: 'Design', icon: 'fi-rr-palette' },
    { id: 'audience', label: 'Audience', icon: 'fi-rr-users' },
    { id: 'insights', label: 'Insights', icon: 'fi-rr-stats' },
  ]

  const handleQuickAdd = async (linkData: { title: string; url: string; platform: string }) => {
    const newLinks = [...links, { ...linkData, id: Date.now(), active: true, clicks: 0 }]
    setLinks(newLinks)
    await globalUpdateProfile({ links: newLinks })
    setShowAddModal(false)
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Local Navigation Tabs */}
      <div className="px-8 border-b border-gray-50 bg-white/80 backdrop-blur-md flex items-center justify-between shrink-0">
         <div className="flex items-center gap-8">
           {tabs.map((tab) => (
             <button 
               key={tab.id}
               onClick={() => handleTabChange(tab.id)}
               className={`py-5 text-[10px] font-black uppercase tracking-[0.2em] relative transition-colors ${activeTab === tab.id ? 'text-primary' : 'text-gray-400 hover:text-secondary'}`}
             >
                <div className="flex items-center gap-2">
                   <i className={`${tab.icon} text-sm pt-0.5`}></i>
                   {tab.label}
                </div>
                {activeTab === tab.id && (
                  <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
             </button>
           ))}
         </div>

         <button 
           onClick={() => setShowAddModal(true)}
           className="hidden md:flex items-center gap-2 px-6 py-2 bg-secondary text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
         >
            <i className="fi fi-rr-plus"></i> New Link
         </button>
      </div>

      <div className="flex-1 overflow-hidden min-w-0 bg-[#fcfcfc] relative">
         <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden">
            <div className="flex-1 overflow-y-auto no-scrollbar pb-24 md:pb-0">
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="h-full"
               >
                 {renderSection()}
               </motion.div>
            </div>
            
            {/* Unified Preview */}
            <div className={`${activeTab === 'design' ? 'flex' : 'hidden lg:flex'} w-full lg:w-[480px] h-[50dvh] lg:h-full shrink-0 border-l border-gray-100 bg-white`}>
               <Preview userProfile={profile} links={links} socialLinks={profile?.social_links} />
            </div>
         </div>
      </div>

      <AddLinkModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        onAdd={handleQuickAdd}
        linksCount={links.length}
      />
      
      {/* Mobile Sticky Tab Bar (Bottom of main area, but not viewport bottom) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-[170]">
         <div className="bg-secondary text-white rounded-full px-4 py-2 shadow-2xl flex items-center justify-around">
            {tabs.map(tab => (
               <button 
                key={tab.id} 
                onClick={() => handleTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 p-2 transition-all ${activeTab === tab.id ? 'text-primary' : 'text-white/40'}`}
               >
                  <i className={`${tab.icon} text-lg`}></i>
                  {/* <span className="text-[7px] font-black uppercase tracking-widest">{tab.label}</span> */}
               </button>
            ))}
         </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="h-full flex items-center justify-center bg-white">
        <i className="fi fi-rr-spinner animate-spin text-3xl text-primary"></i>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
