'use client'

import { useState, useEffect, Suspense } from 'react'
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

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabFromQuery = searchParams.get('tab') || 'links'

  const [profile, setProfile] = useState<any>(null)
  const [links, setLinks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(tabFromQuery) // 'links', 'design', 'audience', 'insights', 'planner', 'autoreply'
  const [hasDesignChanges, setHasDesignChanges] = useState(false)

  // Sync state with URL
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab)
    router.replace(`/dashboard?tab=${newTab}`, { scroll: false })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
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
    }
    setLoading(false)
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
        return <LinksSection profile={profile} links={links} setLinks={setLinks} setProfile={setProfile} refreshData={fetchData} />
      case 'design':
        return <DesignSection profile={profile} setProfile={setProfile} hasChanges={hasDesignChanges} setHasChanges={setHasDesignChanges} />
      case 'audience':
        return <AudienceSection profile={profile} />
      case 'insights':
        return <InsightsSection profile={profile} />
      case 'planner':
        return <PlannerSection profile={profile} />
      case 'autoreply':
        return <AutoReplySection profile={profile} />
      default:
        return <LinksSection profile={profile} links={links} setLinks={setLinks} setProfile={setProfile} refreshData={fetchData} />
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Banner */}
      <div className="bg-[#1e293b] text-white py-2 px-8 flex justify-center items-center gap-4 text-sm font-medium sticky top-0 z-[100]">
          <span>Unlock more tools to grow your audience faster.</span>
          <button className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 px-3 py-1 rounded-full flex items-center gap-2 transition-all">
              <i className="fi fi-rr-bolt text-[10px]"></i> Claim free week
          </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          userProfile={profile} 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col bg-white overflow-hidden">
          {renderSection()}
        </main>

        {/* Real-time Preview */}
        <Preview 
          userProfile={profile} 
          links={links} 
          socialLinks={profile?.social_links} 
        />
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
