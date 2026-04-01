'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import PlannerSection from '@/components/dashboard/PlannerSection'

export default function DashboardPlanner() {
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

  if (loading) return null

  return (
    <div className="h-full">
      <PlannerSection profile={profile} />
    </div>
  )
}
