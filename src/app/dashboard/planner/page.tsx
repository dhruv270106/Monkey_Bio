'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/Sidebar'
import PlannerSection from '@/components/dashboard/PlannerSection'

export default function DashboardPlanner() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data } = await supabase.from('monkey_bio').select('*').eq('id', session.user.id).single()
        setProfile(data)
      }
      setLoading(false)
    }
    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-primary">
        <i className="fi fi-rr-spinner animate-spin text-3xl"></i>
      </div>
    )
  }

  return (
    <div className="h-[100dvh] flex flex-col lg:flex-row overflow-hidden bg-[#fafafa]">
      <Sidebar 
        userProfile={profile} 
        activeMainTab="tools" 
        onMainTabChange={(tab) => {
          if (tab === 'monkeybio') router.push('/dashboard')
          else if (tab === 'audience') router.push('/dashboard/audience')
          else if (tab === 'insights') router.push('/dashboard/insights')
          else if (tab === 'tools') router.push('/dashboard/tools')
          else if (tab === 'user') router.push('/dashboard?tab=user')
          else if (tab === 'settings') router.push('/dashboard?tab=account')
        }} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        <PlannerSection profile={profile} />
      </div>
    </div>
  )
}
